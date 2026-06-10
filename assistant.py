#!/usr/bin/env python3
"""
智能助理 - 健身工作室每日提醒系统
=====================================
用法:
  python3 assistant.py          首次使用，弹窗登录
  python3 assistant.py --cron   定时任务模式（静默执行）
"""

import sys
import json
import subprocess
import re
from datetime import date, datetime
from pathlib import Path
from dataclasses import dataclass, field

from playwright.sync_api import sync_playwright, TimeoutError as PwTimeout

BASE_URL = "https://forzadata.cn"
CENTER_ID = "7513"
DATA_DIR = Path(__file__).parent / "data"
AUTH_FILE = DATA_DIR / "auth.json"
REPORT_DIR = DATA_DIR / "reports"
REPORT_DIR.mkdir(parents=True, exist_ok=True)

MILESTONES = {
    1:  "课后回访", 5:  "体测", 10: "第一轮案例",
    15: "第二轮体测", 20: "第二轮案例",
    25: "第三轮体测", 30: "第三轮案例",
}

# ============================================================
#  飞书推送配置
#  填入飞书机器人 webhook 地址，可填多个（发给多人/多群）
#  留空列表则不推送
# ============================================================
FEISHU_WEBHOOKS = [
    "https://open.feishu.cn/open-apis/bot/v2/hook/3d9c504d-e3da-430b-9c00-5c5d54309749",
]


# ============================================================
#  登录处理
# ============================================================
def ensure_login(page):
    url = f"{BASE_URL}/home/manage/course/reservations"
    try:
        page.goto(url, wait_until="networkidle", timeout=60000)
    except Exception:
        pass
    page.wait_for_timeout(5000)

    if "login" in page.url.lower():
        print("\n" + "=" * 50)
        print("  请在弹出的浏览器窗口中登录 forzadata.cn")
        print("  登录成功后程序将自动继续...")
        print("=" * 50 + "\n")
        try:
            page.wait_for_url("**/home/manage/**", timeout=300000)
        except PwTimeout:
            print("登录超时")
            sys.exit(1)
        page.wait_for_timeout(5000)

    if "login" in page.url.lower():
        print("仍需登录，请重新登录...")
        try:
            page.wait_for_url("**/home/manage/**", timeout=300000)
        except PwTimeout:
            print("登录超时")
            sys.exit(1)
        page.wait_for_timeout(5000)

    page.context.storage_state(path=str(AUTH_FILE))
    print("登录状态已保存\n")
    return True


# ============================================================
#  数据获取（通过API拦截 + fetch调用）
# ============================================================
def api_post(page, path, body="{}"):
    """通过page.evaluate发POST请求"""
    result = page.evaluate(f"""
        async () => {{
            const r = await fetch('{BASE_URL}{path}', {{
                method: 'POST',
                headers: {{'Content-Type': 'application/json', 'Accept': 'application/json'}},
                body: '{body}'
            }});
            return await r.json();
        }}
    """)
    return result


def fetch_all_members(page):
    """获取全部会员数据（分页POST），不过滤以保证新会员判断准确"""
    all_members = []
    page_size = 200
    page_num = 0
    total = None

    while True:
        path = f"/api/membership/cardMember/{CENTER_ID}/list/v3/{page_num}/{page_size}"
        try:
            data = api_post(page, path)
            d = data.get("data", {})
            if total is None:
                total = d.get("totalCount", 0)
            members = d.get("data", [])
            all_members.extend(members)
            if len(all_members) >= total:
                break
            page_num += 1
        except Exception as e:
            print(f"  获取会员数据出错 (page {page_num}): {e}")
            break

    print(f"  获取到 {len(all_members)} 张会员卡")

    # 诊断：打印第一个会员的所有字段，了解卡相关字段
    if all_members:
        first = all_members[0]
        print(f"  [诊断] 第一个会员卡的所有字段: {list(first.keys())}")
        for key in ["cardStatus", "endDate", "status", "cardTypeName", "cardName",
                     "displayName", "startDate", "expireDate", "validityStatus", "state"]:
            if key in first:
                print(f"    {key} = {first[key]}")

    return all_members


def fetch_all_trainees(page):
    """获取全部私教会员数据（单次大页面）"""
    path = f"/api/membership/{CENTER_ID}/loadPrivateCourseDepositList/0/2000"
    try:
        data = api_post(page, path)
        d = data.get("data", {})
        trainees = d.get("data", [])
        print(f"  获取到 {len(trainees)} 条私教记录")
        return trainees
    except Exception as e:
        print(f"  获取私教数据出错: {e}")
        return []


def fetch_courses(page):
    """通过拦截API响应获取课程数据（单日）"""
    courses_data = {"group": [], "private": []}
    api_urls = {"group": None, "private": None}

    def on_response(response):
        url = response.url
        if "reserved_instances" in url:
            try:
                data = response.json()
                if "isWebPage=true" in url:
                    courses_data["group"] = data.get("data", [])
                    api_urls["group"] = url
                elif "isTraining" not in url and "isWebPage" not in url:
                    courses_data["private"] = data.get("data", [])
                    api_urls["private"] = url
            except Exception:
                pass

    page.on("response", on_response)

    import time as _time
    _ts = int(_time.time())
    # 带时间戳的URL避免浏览器缓存
    page.goto(f"{BASE_URL}/home/manage/course/reservations?_t={_ts}",
              wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(2000)
    # 二次reload确保AngularJS获取最新API数据
    page.reload(wait_until="networkidle")
    page.wait_for_timeout(6000)

    if "login" in page.url.lower():
        page.remove_listener("response", on_response)
        return courses_data, api_urls

    print(f"  获取到 {len(courses_data['group'])} 节团体课, "
          f"{len(courses_data['private'])} 节私教课")
    page.remove_listener("response", on_response)
    return courses_data, api_urls


def fetch_week_courses(page, api_urls):
    """获取本周一到周日的全部课程"""
    import re
    import time as _time
    from datetime import date as dt_date, timedelta
    _ts = int(_time.time())

    today = dt_date.today()
    monday = today - timedelta(days=today.weekday())
    week_dates = [(monday + timedelta(days=i)).isoformat() for i in range(7)]

    all_group = []
    all_private = []

    print(f"  [调试] 团体课API: {api_urls.get('group', 'N/A')}")
    print(f"  [调试] 私教课API: {api_urls.get('private', 'N/A')}")

    for day_date in week_dates:
        print(f"  获取 {day_date} 课程...")

        for key in ["group", "private"]:
            base_url = api_urls.get(key)
            if not base_url:
                continue

            # 尝试多种日期参数模式
            new_url = base_url
            # 模式1: startDate=YYYY-MM-DD&endDate=YYYY-MM-DD (周视图)
            new_url = re.sub(r'startDate=\d{4}-\d{2}-\d{2}', f'startDate={day_date}', new_url)
            new_url = re.sub(r'endDate=\d{4}-\d{2}-\d{2}', f'endDate={day_date}', new_url)
            # 模式2: date=YYYY-MM-DD
            if new_url == base_url:
                new_url = re.sub(r'date=\d{4}-\d{2}-\d{2}', f'date={day_date}', base_url)

            if new_url == base_url:
                print(f"    ⚠️ 未能替换日期参数，跳过 {key}")
                continue

            try:
                result = page.evaluate(f"""
                    async () => {{
                        const r = await fetch('{new_url}&_t={_ts}', {{
                            method: 'GET',
                            headers: {{'Accept': 'application/json', 'Cache-Control': 'no-cache', 'Pragma': 'no-cache'}}
                        }});
                        const data = await r.json();
                        return data;
                    }}
                """)
                data = result.get("data", []) if isinstance(result, dict) else []
                if key == "group":
                    all_group.extend(data)
                else:
                    all_private.extend(data)
            except Exception as e:
                print(f"    {key} API调用失败: {e}")

    # 诊断：每天获取了多少课程
    day_stats = {}
    for c in all_group + all_private:
        d = c.get("date", "")
        day_stats[d] = day_stats.get(d, 0) + 1
    for d in week_dates:
        cnt = day_stats.get(d, 0)
        if cnt > 0:
            print(f"    {d}: {cnt} 节")
    missing = [d for d in week_dates if d not in day_stats]
    if missing:
        print(f"  ⚠️ 以下日期无API数据: {missing}")

    # 如果API方式获取失败，回退到仅用今日数据（已通过拦截获取）
    if not all_group and not all_private:
        print("  ⚠️ 本周API调用未获取到数据，回退到仅今日数据")

    # 去重
    seen_group = set()
    unique_group = []
    for c in all_group:
        key = f"{c.get('date')}_{c.get('startTime')}_{c.get('trainerName')}_{c.get('courseName')}"
        if key not in seen_group:
            seen_group.add(key)
            unique_group.append(c)

    seen_private = set()
    unique_private = []
    for c in all_private:
        key = f"{c.get('date')}_{c.get('startTime')}_{c.get('trainerName')}_{c.get('courseName')}"
        if key not in seen_private:
            seen_private.add(key)
            unique_private.append(c)

    print(f"  本周总计: {len(unique_group)} 节团体课, {len(unique_private)} 节私教课")
    return {"group": unique_group, "private": unique_private}


def fetch_month_courses(page):
    """按周导航页面，获取本月1号到今天的所有课程"""
    import time as _time
    from datetime import date as dt_date, timedelta

    today = dt_date.today()
    month_start = today.replace(day=1)

    # 计算本月包含的所有周（周一到周日）
    # 从本月1号所在周的周一开始
    first_monday = month_start - timedelta(days=month_start.weekday())
    weeks = []
    cursor = first_monday
    while cursor <= today:
        sunday = cursor + timedelta(days=6)
        week_start = max(cursor, month_start).isoformat()
        week_end = min(sunday, today).isoformat()
        weeks.append((week_start, week_end))
        cursor += timedelta(days=7)

    print(f"  本月需抓取 {len(weeks)} 周: "
          f"{' | '.join(f'{ws}~{we}' for ws, we in weeks)}")

    all_group = []
    all_private = []

    for week_idx, (ws, we) in enumerate(weeks):
        _ts = int(_time.time())
        week_data = {"group": [], "private": []}

        def on_response(response):
            url = response.url
            if "reserved_instances" in url:
                try:
                    data = response.json()
                    if "isWebPage=true" in url:
                        week_data["group"] = data.get("data", [])
                    elif "isTraining" not in url and "isWebPage" not in url:
                        week_data["private"] = data.get("data", [])
                except Exception:
                    pass

        page.on("response", on_response)

        try:
            page_url = f"{BASE_URL}/home/manage/course/reservations?startDate={ws}&endDate={we}&_t={_ts}"
            page.goto(page_url, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(1500)
            page.reload(wait_until="networkidle")
            page.wait_for_timeout(4000)

            if "login" in page.url.lower():
                print(f"  ⚠️ 第{week_idx+1}周 ({ws}~{we}) 需重新登录")
                page.remove_listener("response", on_response)
                break

            g_count = len(week_data["group"])
            p_count = len(week_data["private"])
            print(f"  第{week_idx+1}周 ({ws}~{we}): 团体{g_count}节 私教{p_count}节")
            all_group.extend(week_data["group"])
            all_private.extend(week_data["private"])
        except Exception as e:
            print(f"  ⚠️ 第{week_idx+1}周 ({ws}~{we}) 失败: {e}")
        finally:
            page.remove_listener("response", on_response)

    # 去重
    seen_g = set()
    unique_group = []
    for c in all_group:
        k = f"{c.get('date')}_{c.get('startTime')}_{c.get('trainerName')}_{c.get('courseName')}"
        if k not in seen_g:
            seen_g.add(k)
            unique_group.append(c)

    seen_p = set()
    unique_private = []
    for c in all_private:
        k = f"{c.get('date')}_{c.get('startTime')}_{c.get('trainerName')}_{c.get('courseName')}"
        if k not in seen_p:
            seen_p.add(k)
            unique_private.append(c)

    print(f"  本月总计: {len(unique_group)} 节团体课, {len(unique_private)} 节私教课")
    return {"group": unique_group, "private": unique_private}


# ============================================================
#  规则引擎
# ============================================================
@dataclass
class DailyReport:
    date: str
    new_small_group: list = field(default_factory=list)
    new_personal: list = field(default_factory=list)
    second_class: list = field(default_factory=list)
    low_sessions: list = field(default_factory=list)
    milestones: list = field(default_factory=list)
    coaches: dict = field(default_factory=dict)
    monthly_new_members: list = field(default_factory=list)

    def summary(self):
        # 统计所有日期中出现的唯一教练数
        all_trainers = set()
        for day_data in self.coaches.values():
            all_trainers.update(day_data.get("trainers", {}).keys())
        return {
            "new_small_group": len(self.new_small_group),
            "new_personal": len(self.new_personal),
            "second_class": len(self.second_class),
            "low_sessions": len(self.low_sessions),
            "milestones": len(self.milestones),
            "coaches": len(all_trainers),
            "monthly_new": len(self.monthly_new_members),
        }


def today_str():
    return date.today().isoformat()


def parse_trainee_names(names_str):
    """解析traineeNames字段 - 可能是逗号、顿号分隔的名字"""
    if not names_str:
        return []
    names = re.split(r"[、,，\s]+", names_str.strip())
    return [n for n in names if n]


def _get_remark(course):
    """从课程数据中获取备注文本（尝试多种常见字段名）"""
    for field in ("remark", "remarks", "note", "notes", "memo", "comment", "description"):
        val = course.get(field, "")
        if val:
            return str(val)
    return ""


def is_trial_course(course_name, card_name=None, has_trial_card=False, remark=None):
    """判断是否为体验课（含二次体验备注）。
    私教：课程名含 常规私教体验 / 特色私教体验 / 体验
    小班：课程名不含体验时，检查卡名或 has_trial_card
    备注：含"二次体验"均视为体验课
    """
    # 备注含"二次体验"——优先判断，无论课程名/卡名如何
    if remark and "二次体验" in remark:
        return True
    if not course_name:
        return False
    # 课程名含"体验"（覆盖私教体验、小班体验等各种命名）
    if "体验" in course_name:
        return True
    # 小班体验课：卡名含"体验"
    if card_name and "体验" in card_name:
        return True
    if has_trial_card:
        return True
    return False


def build_member_lookup(members):
    """构建会员名→聚合数据的查找表（同一会员多张卡累加签到次数）"""
    lookup = {}
    for m in members:
        name = m.get("displayName", "")
        if not name:
            continue
        checkins = m.get("checkInUsedCount", 0) or 0

        # 判断当前卡是否在有效期内
        card_valid = _is_card_valid(m)

        if name not in lookup:
            lookup[name] = {
                "checkInUsedCount": 0,
                "memberPhone": m.get("memberPhone", ""),
                "sellerName": m.get("sellerName", ""),
                "cardName": m.get("cardName", ""),
                "cardTypeName": m.get("cardTypeName", ""),
                "lastCheckInTime": m.get("lastCheckInTime", 0) or 0,
                "has_valid_card": False,
                "has_trial_card": False,
            }
        # 累加所有卡的签到次数
        lookup[name]["checkInUsedCount"] += checkins
        # 只要有一张卡在有效期内，该会员就有有效卡
        if card_valid:
            lookup[name]["has_valid_card"] = True
        # 只要有一张卡含"体验"（cardName 或 cardTypeName），该会员就有体验卡
        card_name = m.get("cardName", "") or ""
        card_type = m.get("cardTypeName", "") or ""
        if "体验" in card_name or "体验" in card_type:
            lookup[name]["has_trial_card"] = True
        # 保留有值的手机号和会籍顾问
        if m.get("memberPhone") and not lookup[name]["memberPhone"]:
            lookup[name]["memberPhone"] = m.get("memberPhone")
        if m.get("sellerName") and not lookup[name]["sellerName"]:
            lookup[name]["sellerName"] = m.get("sellerName")
        if card_name and not lookup[name]["cardName"]:
            lookup[name]["cardName"] = card_name
        if card_type and not lookup[name]["cardTypeName"]:
            lookup[name]["cardTypeName"] = card_type
        # 保留最近的签到时间
        lt = m.get("lastCheckInTime", 0) or 0
        if lt > lookup[name]["lastCheckInTime"]:
            lookup[name]["lastCheckInTime"] = lt
    return lookup


def _is_card_valid(member_card):
    """判断单张会员卡是否在有效期内。
    返回 True/False。逻辑：cardStatus 为生效状态 且 endDate 未过期。
    """
    card_status = member_card.get("cardStatus", "")
    end_date = member_card.get("endDate", 0) or 0
    status = member_card.get("status", "")

    # cardStatus 为明确的过期状态 → 无效
    if card_status in ("已过期", "作废", "已停用", "已退卡", "冻结"):
        return False

    # endDate: 0 表示无过期时间（永久有效）
    if end_date == 0:
        return True

    # endDate 可能是毫秒时间戳
    if isinstance(end_date, (int, float)) and end_date > 1000000000:
        from datetime import date as _dt_date
        end_dt = _dt_date.fromtimestamp(end_date / 1000)
        if end_dt < _dt_date.today():
            return False

    return True


def apply_rules(courses, members, trainees, week_courses=None, month_courses=None):
    """应用5大提醒规则。week_courses用于整周教练空闲，month_courses用于月度新会员"""
    report = DailyReport(date=today_str())
    today = today_str()
    member_lookup = build_member_lookup(members)

    # 诊断：有效卡统计
    valid_count = sum(1 for v in member_lookup.values() if v.get("has_valid_card"))
    expired_count = len(member_lookup) - valid_count
    print(f"\n  [诊断] 会员卡有效期: {valid_count}/{len(member_lookup)} 有效, "
          f"{expired_count} 过期/无效")

    # 构建私教签到次数字典：统计每个会员已上过的私教节数
    pt_used = {}
    for t in trainees:
        name = t.get("traineeName", "")
        if not name:
            continue
        buy = t.get("buyCount", 0) or 0
        remain = t.get("remainCount", 0) or 0
        used = max(0, buy - remain)
        if name not in pt_used:
            pt_used[name] = 0
        pt_used[name] += used

    # 诊断：检查课程学员名匹配情况
    print("\n  [诊断] 名字匹配检查:")
    today_all_trainees = set()
    for c in courses["group"] + courses["private"]:
        if c.get("date") == today:
            for n in parse_trainee_names(c.get("traineeNames", "")):
                today_all_trainees.add(n)
    in_members = sum(1 for n in today_all_trainees if n in member_lookup)
    in_pt = sum(1 for n in today_all_trainees if n in pt_used)
    print(f"  今日上课学员共 {len(today_all_trainees)} 人")
    print(f"  在会员库中匹配: {in_members}/{len(today_all_trainees)}")
    print(f"  在私教库中匹配: {in_pt}/{len(today_all_trainees)}")
    not_in_members = [n for n in today_all_trainees if n not in member_lookup]
    if not_in_members:
        print(f"  ⚠️ 未在会员库中找到: {not_in_members}")

    # 收集今日所有课程及其学员
    all_today_group = [c for c in courses["group"] if c.get("date") == today]
    all_today_private = [c for c in courses["private"] if c.get("date") == today]

    # 构建教练→今日课程映射
    coach_courses = {}

    # ---- 规则1: 新会员（首次约课）----
    # 新会员定义：用体验课首次约课（total_checkins=0），或备注注明"二次体验"
    print("\n  [诊断] 新会员判断（首次约课/二次体验）:")
    seen_new = set()  # 去重：一个会员只算一次新会员

    # 1a: 小班课新会员
    for course in all_today_group:
        course_name = course.get("courseName", "")
        trainer = course.get("trainerName", "")
        start_time = course.get("startTime", "")
        end_time = course.get("endTime", "")
        time_slot = f"{start_time}-{end_time}"
        trainee_names = parse_trainee_names(course.get("traineeNames", ""))
        course_remark = _get_remark(course)

        if trainer:
            if trainer not in coach_courses:
                coach_courses[trainer] = []
            coach_courses[trainer].append((start_time, end_time, course_name, "团体课"))

        for tname in trainee_names:
            member = member_lookup.get(tname, {})
            total_checkins = member.get("checkInUsedCount", 0) or 0
            phone = member.get("memberPhone", "")
            card_name = member.get("cardName", "")
            consultant = member.get("sellerName", "")
            has_trial = member.get("has_trial_card", False)
            in_lookup = tname in member_lookup

            # 小班新会员：体验课 + (首次=签到0 或 备注含"二次体验")
            is_trial = is_trial_course(course_name, card_name, has_trial, remark=course_remark)
            is_second = "二次体验" in course_remark
            is_new_member = (total_checkins <= 0) or is_second

            # 完整诊断
            status = []
            if not in_lookup:
                status.append("未在会员库")
            status.append(f"签到={total_checkins}")
            status.append(f"体验={'是' if is_trial else '否'}(课程={'是' if '体验' in course_name else '否'} 卡={'是' if '体验' in card_name else '否'} has_trial_card={'是' if has_trial else '否'} 备注二次体验={'是' if is_second else '否'})")
            if course_remark:
                status.append(f"备注={course_remark[:20]}")
            if tname in seen_new:
                status.append("已在seen_new(已作为其他类型新会员)")

            if is_new_member and is_trial and tname not in seen_new:
                status.insert(0, "✅ 新会员")
                seen_new.add(tname)
                report.new_small_group.append({
                    "name": tname, "phone": phone,
                    "course": course_name, "time": time_slot,
                    "coach": trainer, "card": card_name,
                    "consultant": consultant,
                    "remark": course_remark,
                })
            elif not is_new_member and is_trial:
                status.insert(0, "⏭ 非首次(签到>0且无二次体验备注)")
            elif is_new_member and not is_trial:
                status.insert(0, "⏭ 非体验课")
            elif total_checkins == 1:
                status.insert(0, "📌 第2节")
                if member.get("has_valid_card") and tname not in seen_new:
                    report.second_class.append({
                        "name": tname, "phone": phone,
                        "course": course_name, "time": time_slot,
                        "coach": trainer, "consultant": consultant,
                    })
            else:
                status.insert(0, "⏭ 跳过")
            print(f"    {status[0]} {tname} {'|'.join(status[1:])}")

    # 1b: 私教课新会员
    for course in all_today_private:
        trainer = course.get("trainerName", "")
        start_time = course.get("startTime", "")
        end_time = course.get("endTime", "")
        time_slot = f"{start_time}-{end_time}"
        course_name = course.get("courseName", "")
        trainee_names = parse_trainee_names(course.get("traineeNames", ""))
        course_remark = _get_remark(course)

        if trainer:
            if trainer not in coach_courses:
                coach_courses[trainer] = []
            coach_courses[trainer].append((start_time, end_time, course_name, "私教课"))

        for tname in trainee_names:
            member = member_lookup.get(tname, {})
            pt_sessions = pt_used.get(tname, 0)
            total_checkins = member.get("checkInUsedCount", 0) or 0
            phone = member.get("memberPhone", "")
            consultant = member.get("sellerName", "")

            # 私教新会员：体验课 + (首次上私教 pt_sessions<=1 或 备注含"二次体验")
            # 用私教节数而非总签到数，避免遗漏已有小班记录但首次上私教体验的会员
            is_second = "二次体验" in course_remark
            is_new = (pt_sessions <= 1) or is_second
            is_trial = is_trial_course(course_name, remark=course_remark)
            remark_hint = f" 备注={course_remark[:20]}" if course_remark else ""
            if is_new and is_trial and tname not in seen_new:
                seen_new.add(tname)
                report.new_personal.append({
                    "name": tname, "phone": phone,
                    "course": course_name, "time": time_slot,
                    "coach": trainer, "consultant": consultant,
                    "remark": course_remark,
                })
                print(f"    ✅ [新会员-私教] {tname} 总签到={total_checkins} 二次体验={is_second}{remark_hint}")
            elif is_new and not is_trial:
                print(f"    ⏭  [非体验课-私教] {tname} 课程={course_name}{remark_hint}")
            elif not is_new:
                print(f"    ⏭  [非首次-私教] {tname} 总签到={total_checkins} 私教节数={pt_sessions}{remark_hint}")

    # ---- 规则3: 私教课时不足（低于5节）----
    # 同一学员可能有多个课包，按学员聚合剩余课时后再判断，避免重复提醒
    low_sessions_agg = {}  # name -> 剩余总节数
    low_sessions_detail = {}  # name -> 课程/教练信息
    for t in trainees:
        tname = t.get("traineeName", "")
        if not tname:
            continue
        remain = t.get("remainCount", 0) or 0
        if remain <= 0:
            continue
        low_sessions_agg[tname] = low_sessions_agg.get(tname, 0) + remain
        if tname not in low_sessions_detail:
            low_sessions_detail[tname] = t

    for tname, total_remain in low_sessions_agg.items():
        if 1 < total_remain < 5:
            member = member_lookup.get(tname, {})
            if member.get("has_valid_card"):
                t = low_sessions_detail[tname]
                report.low_sessions.append({
                    "name": tname,
                    "phone": t.get("phone", ""),
                    "remaining": total_remain,
                    "course": t.get("courseName", ""),
                    "trainer": t.get("courseTrainers", ""),
                    "consultant": member.get("sellerName", ""),
                })

    # ---- 规则4: 会员里程碑（仅私教课会员）----
    # 收集今日私教学员名
    today_pt_trainees = set()
    for c in all_today_private:
        for n in parse_trainee_names(c.get("traineeNames", "")):
            today_pt_trainees.add(n)

    # 仅使用有私教记录的会员，用私教节数判断里程碑
    for name, pt_sessions in pt_used.items():
        if pt_sessions <= 0:
            continue
        member = member_lookup.get(name, {})
        if not member.get("has_valid_card"):
            continue
        phone = member.get("memberPhone", "")
        consultant = member.get("sellerName", "")

        for ms, action in MILESTONES.items():
            if pt_sessions == ms:
                # 精确命中里程碑
                if not any(x["name"] == name and x["milestone"] == ms
                          for x in report.milestones):
                    report.milestones.append({
                        "name": name, "phone": phone,
                        "sessions": pt_sessions,
                        "milestone": ms, "action": action,
                        "consultant": consultant,
                    })
                break
            # 即将到达里程碑（1-2节内）：仅提醒今日有私教课的学员
            elif name in today_pt_trainees and 0 < ms - pt_sessions <= 2:
                if not any(x["name"] == name and x["milestone"] == ms
                          for x in report.milestones):
                    report.milestones.append({
                        "name": name, "phone": phone,
                        "sessions": pt_sessions,
                        "milestone": ms, "action": action,
                        "consultant": consultant,
                    })
                break  # 只提醒最近的里程碑

    # ---- 规则5: 教练空闲时间（整周）----
    from datetime import date as dt_date, timedelta
    from collections import defaultdict

    today_dt = dt_date.today()
    monday = today_dt - timedelta(days=today_dt.weekday())
    WEEKDAY_NAMES = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]

    # 使用 courses（页面初始加载拦截的完整周数据，最可靠）
    # week_courses 的逐天API调用可能因API无视日期参数而返回错误数据
    source_courses = courses

    # 诊断：对比 courses 和 week_courses 的差异
    src_dates = set()
    for c in source_courses.get("group", []) + source_courses.get("private", []):
        src_dates.add(c.get("date", ""))
    wk_dates = set()
    if week_courses:
        for c in week_courses.get("group", []) + week_courses.get("private", []):
            wk_dates.add(c.get("date", ""))
    print(f"\n  [诊断] 教练空闲数据源: courses 覆盖 {len(src_dates)} 天, "
          f"week_courses 覆盖 {len(wk_dates)} 天")

    # 按日期和教练整理课程
    # week_coaches[date][trainer] = [(start, end, course_name, type), ...]
    week_coaches = defaultdict(lambda: defaultdict(list))
    for c in source_courses.get("group", []):
        trainer = c.get("trainerName", "")
        if not trainer:
            continue
        d = c.get("date", "")
        week_coaches[d][trainer].append(
            (c.get("startTime", ""), c.get("endTime", ""),
             c.get("courseName", ""), "团体课"))
    for c in source_courses.get("private", []):
        trainer = c.get("trainerName", "")
        if not trainer:
            continue
        d = c.get("date", "")
        week_coaches[d][trainer].append(
            (c.get("startTime", ""), c.get("endTime", ""),
             c.get("courseName", ""), "私教课"))

    # 为本周一到周日计算教练空闲
    for i in range(7):
        day_dt = monday + timedelta(days=i)
        day_str = day_dt.isoformat()
        weekday = WEEKDAY_NAMES[i]
        day_coaches = week_coaches.get(day_str, {})

        day_trainers = {}
        all_trainers = set()
        # 收集本周所有出现的教练名（至少出现过的）
        for d, trainers in week_coaches.items():
            all_trainers.update(trainers.keys())

        # 为当天有课或本周有课的教练计算空闲
        relevant_trainers = set(day_coaches.keys()) | all_trainers
        # 但只为当天有课或本周至少出现过一次的教练展示
        for trainer in sorted(relevant_trainers):
            slots = day_coaches.get(trainer, [])
            busy = [(s, e) for s, e, _, _ in slots]
            busy.sort()

            free_slots = []
            cur = "09:00"
            for bs, be in busy:
                if cur < bs:
                    free_slots.append(f"{cur}-{bs}")
                cur = max(cur, be)
            if cur < "21:00":
                free_slots.append(f"{cur}-21:00")

            day_trainers[trainer] = {
                "busy": [f"{s}-{e}" for s, e, _, _ in slots],
                "courses": [f"{s}-{e} {cn}" for s, e, cn, _ in slots],
                "free": free_slots,
            }

        if day_trainers:
            report.coaches[day_str] = {
                "weekday": weekday,
                "trainers": day_trainers,
            }

    # ---- 规则6: 本月新会员汇总（含转化信息）----
    _enrich_monthly_new_members(report, member_lookup, pt_used, trainees, month_courses)

    return report


def _enrich_monthly_new_members(report, member_lookup, pt_used, trainees, month_courses=None):
    """从API获取的本月全部课程中提取体验课新会员，并附加转化/购课/出勤信息"""
    import calendar
    today = date.today()
    month_start = today.replace(day=1)
    today_str = report.date

    # 构建私教课程详情查找表（按学员名）
    pt_detail = {}
    for t in trainees:
        name = t.get("traineeName", "")
        if not name:
            continue
        if name not in pt_detail:
            pt_detail[name] = []
        pt_detail[name].append({
            "courseName": t.get("courseName", ""),
            "trainers": t.get("courseTrainers", ""),
            "buyCount": t.get("buyCount", 0) or 0,
            "remainCount": t.get("remainCount", 0) or 0,
        })

    monthly = {}  # name -> entry
    api_days = set()
    trial_group_count = 0
    trial_private_count = 0

    # 1) 从API月度课程数据中提取体验课学员
    if month_courses:
        month_group_total = len(month_courses.get("group", []))
        month_private_total = len(month_courses.get("private", []))
        print(f"  [月度] API返回: 团体{month_group_total}节 私教{month_private_total}节")
        for key, type_label in [("group", "小班"), ("private", "私教")]:
            for c in month_courses.get(key, []):
                course_name = c.get("courseName", "")
                course_date = c.get("date", "")
                trainer = c.get("trainerName", "")
                trainees_in_course = parse_trainee_names(c.get("traineeNames", ""))

                course_remark = _get_remark(c)
                # 判断是否为体验课学员
                for tname in trainees_in_course:
                    if not tname:
                        continue
                    member = member_lookup.get(tname, {})
                    card_name = member.get("cardName", "")

                    # 私教和小班均统一检查：课程名/卡名/备注"二次体验"
                    # 注意：月度筛选不使用 has_trial_card，避免老会员历史体验卡误判
                    if key == "private":
                        is_trial = is_trial_course(course_name, remark=course_remark)
                    else:
                        is_trial = is_trial_course(course_name, card_name, remark=course_remark)

                    if not is_trial:
                        continue
                    if key == "group":
                        trial_group_count += 1
                    else:
                        trial_private_count += 1
                    api_days.add(course_date)
                    if tname not in monthly:
                        monthly[tname] = {
                            "name": tname,
                            "phone": "",
                            "type": type_label,
                            "first_date": course_date,
                            "first_course": course_name,
                            "first_coach": trainer,
                            "consultant": "",
                            "remark": course_remark,
                        }
                    else:
                        # 如果更早的日期，更新为首课信息
                        if course_date < monthly[tname]["first_date"]:
                            monthly[tname]["first_date"] = course_date
                            monthly[tname]["first_course"] = course_name
                            monthly[tname]["first_coach"] = trainer
                            monthly[tname]["type"] = type_label
                            if course_remark:
                                monthly[tname]["remark"] = course_remark

    api_count = len(monthly)
    if api_days:
        print(f"  [本月新会员] API获取 {min(api_days)} ~ {max(api_days)}，"
              f"体验课学员 {api_count} 人（团体{trial_group_count}节 私教{trial_private_count}节）")
    else:
        print(f"  [本月新会员] API月度数据为空，回退到报告文件+今日数据")

    # 2) 也合并今日报告中的新会员（处理API未覆盖或首课判断差异的情况）
    for entry in report.new_small_group + report.new_personal:
        name = entry.get("name", "")
        if name and name not in monthly:
            etype = "小班" if entry in report.new_small_group else "私教"
            monthly[name] = {
                "name": name,
                "phone": entry.get("phone", ""),
                "type": etype,
                "first_date": today_str,
                "first_course": entry.get("course", ""),
                "first_coach": entry.get("coach", ""),
                "consultant": entry.get("consultant", ""),
            }

    # 3) 用当前 member_lookup / pt_used / pt_detail 丰富信息
    for name, entry in monthly.items():
        member = member_lookup.get(name, {})
        entry["total_checkins"] = member.get("checkInUsedCount", 0) or 0
        entry["has_valid_card"] = member.get("has_valid_card", False)
        # 手机号与会籍顾问
        if not entry.get("phone"):
            entry["phone"] = member.get("memberPhone", "")
        if not entry.get("consultant"):
            entry["consultant"] = member.get("sellerName", "")

        # 私教转化信息
        sessions = pt_used.get(name, 0)
        details = pt_detail.get(name, [])
        entry["pt_sessions_used"] = sessions

        # 汇总已购私教课程信息（全部，含体验）
        pt_buy_total = sum(d["buyCount"] for d in details)
        pt_remain_total = sum(d["remainCount"] for d in details)
        entry["pt_buy_total"] = pt_buy_total
        entry["pt_remain_total"] = pt_remain_total

        # 转化判断：只统计非体验课的正式购买（体验课本身不算转化）
        real_details = [d for d in details if "体验" not in (d.get("courseName") or "")]
        real_buy_total = sum(d["buyCount"] for d in real_details)
        real_remain_total = sum(d["remainCount"] for d in real_details)
        entry["has_pt_course"] = real_buy_total > 0

        # 私教课程名和教练（合并去重）
        pt_courses = list(set(d["courseName"] for d in details if d["courseName"]))
        pt_trainers = list(set(
            t.strip() for d in details for t in d["trainers"].split("/") if t.strip()
        ))
        entry["pt_course_names"] = " / ".join(pt_courses)
        entry["pt_trainers"] = " / ".join(pt_trainers)

        # 转化状态文字
        if real_buy_total > 0:
            if real_remain_total > 0:
                entry["conversion"] = f"已转化（购{real_buy_total}节/剩{real_remain_total}节）"
            else:
                entry["conversion"] = f"已转化（已用完{real_buy_total}节）"
        else:
            entry["conversion"] = "未转化"

    report.monthly_new_members = sorted(monthly.values(), key=lambda x: x["first_date"])
    converted = sum(1 for m in report.monthly_new_members if m.get("has_pt_course"))
    print(f"  [本月新会员] 总计 {len(report.monthly_new_members)} 人, "
          f"已转化 {converted} 人, 未转化 {len(report.monthly_new_members) - converted} 人")

# ============================================================
#  飞书推送
# ============================================================
def send_feishu(report):
    """向所有配置的飞书 webhook 推送今日新会员 + 昨日体验课 + 课时不足摘要"""
    if not FEISHU_WEBHOOKS:
        return

    from datetime import date as _d, timedelta
    today = report.date
    yesterday = (_d.today() - timedelta(days=1)).isoformat()

    # ── 今日新会员 ──
    new_lines = []
    for m in report.new_small_group:
        new_lines.append(
            f"  【小班】{m['name']}  {m.get('time','')}  教练:{m.get('coach','')}  "
            f"会籍:{m.get('consultant','')}"
        )
    for m in report.new_personal:
        new_lines.append(
            f"  【私教】{m['name']}  {m.get('time','')}  教练:{m.get('coach','')}  "
            f"会籍:{m.get('consultant','')}"
        )

    # ── 昨日体验课（从本月新会员中筛选首课日期=昨天的）──
    yesterday_lines = []
    for m in report.monthly_new_members:
        if m.get("first_date") == yesterday:
            yesterday_lines.append(
                f"  【{m.get('type','')}】{m['name']}  {m.get('first_course','')}  "
                f"教练:{m.get('first_coach','')}  会籍:{m.get('consultant','')}  "
                f"{m.get('conversion','')}"
            )

    # ── 课时不足 ──
    low_lines = []
    for m in report.low_sessions:
        low_lines.append(
            f"  {m['name']}  剩余{m['remaining']}节  {m.get('course','')}  "
            f"教练:{m.get('trainer','')}  会籍:{m.get('consultant','')}"
        )

    parts = [f"📅 {today} 每日提醒"]

    if new_lines:
        parts.append(f"\n🆕 今日新会员（{len(new_lines)}人）")
        parts.extend(new_lines)
    else:
        parts.append("\n🆕 今日新会员：0人")

    if yesterday_lines:
        parts.append(f"\n📋 昨日体验课（{len(yesterday_lines)}人）")
        parts.extend(yesterday_lines)
    else:
        parts.append(f"\n📋 昨日体验课：0人")

    if low_lines:
        parts.append(f"\n⚠️ 私教课时不足（{len(low_lines)}人）")
        parts.extend(low_lines)

    text = "\n".join(parts)
    payload = json.dumps({
        "msg_type": "text",
        "content": {"text": text}
    }, ensure_ascii=False).encode("utf-8")

    payload_str = payload.decode("utf-8")
    for url in FEISHU_WEBHOOKS:
        try:
            result = subprocess.run(
                ["curl", "-s", "-k", "-X", "POST", url,
                 "-H", "Content-Type: application/json; charset=utf-8",
                 "--data-raw", payload_str],
                capture_output=True, text=True, timeout=15
            )
            resp = json.loads(result.stdout)
            if resp.get("code") == 0:
                print(f"  ✅ 飞书推送成功: {url[:50]}...")
            else:
                print(f"  ⚠️ 飞书推送返回异常: {resp}")
        except Exception as e:
            print(f"  ❌ 飞书推送失败 ({url[:50]}...): {e}")


# ============================================================
#  HTML 报告
# ============================================================
def _escape_js(s):
    return s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")


def generate_html(report):
    import calendar
    _today = date.today()
    t = _today.strftime("%Y年%m月%d日")
    s = report.summary()
    report_date = report.date
    # 本月日期范围
    _, _last_day = calendar.monthrange(_today.year, _today.month)
    _month_label = f"{_today.month}月 ({_today.month}/1-{_today.month}/{_last_day})"

    # 扫描已有报告，构建日期列表供导航
    existing_dates = []
    for f in sorted(REPORT_DIR.glob("每日提醒_*.html")):
        d = f.stem.replace("每日提醒_", "")
        if d not in existing_dates:
            existing_dates.append(d)
    available_dates_json = json.dumps(existing_dates, ensure_ascii=False)

    # 构建数据JSON，供JS使用
    sections_data = {
        "new_members": [],
        "second_class": [],
        "low_sessions": [],
        "milestones": [],
        "coaches": [],
        "monthly_converted": [],    # 本月新会员·已转化
        "monthly_unconverted": [],  # 本月新会员·未转化
    }

    for m in report.new_small_group:
        info = f'{m.get("course","")} | {m.get("time","")} 教练:{m.get("coach","")}'
        if m.get("consultant"):
            info += f' 会籍:{m["consultant"]}'
        sections_data["new_members"].append({
            "id": f"sg_{m['name']}",
            "name": m["name"],
            "phone": m.get("phone", ""),
            "info": info,
            "label": "小班新会员",
            "coach": m.get("coach", ""),
            "consultant": m.get("consultant", ""),
            "course": m.get("course", ""),
            "time": m.get("time", ""),
        })
    for m in report.new_personal:
        info = f'私教 | {m.get("course","")} {m.get("time","")} 教练:{m.get("coach","")}'
        if m.get("consultant"):
            info += f' 会籍:{m["consultant"]}'
        sections_data["new_members"].append({
            "id": f"pt_{m['name']}",
            "name": m["name"],
            "phone": m.get("phone", ""),
            "info": info,
            "label": "私教新会员",
            "coach": m.get("coach", ""),
            "consultant": m.get("consultant", ""),
            "course": m.get("course", ""),
            "time": m.get("time", ""),
        })

    for m in report.second_class:
        info = f'{m.get("course","")} | {m.get("time","")} 教练:{m.get("coach","")}'
        if m.get("consultant"):
            info += f' 会籍:{m["consultant"]}'
        sections_data["second_class"].append({
            "id": f"sc_{m['name']}",
            "name": m["name"],
            "phone": m.get("phone", ""),
            "info": info,
            "label": "第2节",
            "coach": m.get("coach", ""),
            "consultant": m.get("consultant", ""),
            "course": m.get("course", ""),
            "time": m.get("time", ""),
        })

    for m in report.low_sessions:
        info = f'剩余{m["remaining"]}节 | {m.get("course","")} 教练:{m.get("trainer","")}'
        if m.get("consultant"):
            info += f' 会籍:{m["consultant"]}'
        sections_data["low_sessions"].append({
            "id": f"ls_{m['name']}",
            "name": m["name"],
            "phone": m.get("phone", ""),
            "info": info,
            "label": f'剩{m["remaining"]}节',
            "coach": m.get("trainer", ""),
            "consultant": m.get("consultant", ""),
            "course": m.get("course", ""),
        })

    for m in report.milestones:
        info = f'第{m["sessions"]}节→第{m["milestone"]}节 ({m["action"]})'
        if m.get("consultant"):
            info += f' 会籍:{m["consultant"]}'
        sections_data["milestones"].append({
            "id": f"ms_{m['name']}_{m['milestone']}",
            "name": m["name"],
            "phone": m.get("phone", ""),
            "info": info,
            "label": m["action"],
            "coach": "",
            "consultant": m.get("consultant", ""),
            "course": m["action"],
        })

    for m in report.monthly_new_members:
        # 构建信息行：类型 | 首课日期 | 首课课程 | 教练 | 会籍 | 出勤 | 转化状态
        info_parts = [f"{m.get('type','')} | 首课:{m.get('first_date','')}"]
        if m.get("first_course"):
            info_parts.append(m["first_course"])
        if m.get("first_coach"):
            info_parts.append(f"教练:{m['first_coach']}")
        if m.get("consultant"):
            info_parts.append(f"会籍:{m['consultant']}")
        conv = m.get("conversion", "")
        checkins = m.get("total_checkins", 0)
        pt_used_num = m.get("pt_sessions_used", 0)
        info_parts.append(f"出勤{checkins}次 | 私教{pt_used_num}节")
        if conv:
            info_parts.append(conv)
        info = " | ".join(info_parts)

        entry = {
            "id": f"mn_{m['name']}",
            "name": m["name"],
            "phone": m.get("phone", ""),
            "info": info,
            "label": f"{m.get('type','')} {conv}",
            "coach": m.get("first_coach", ""),
            "consultant": m.get("consultant", ""),
            "course": m.get("first_course", ""),
            "time": m.get("first_date", ""),
        }
        # 按转化状态分组
        if m.get("has_pt_course") or (m.get("pt_buy_total", 0) > 0):
            sections_data["monthly_converted"].append(entry)
        else:
            sections_data["monthly_unconverted"].append(entry)

    # 教练数据加入 sections_data 供 CSV 导出
    for day_str in sorted(report.coaches.keys()):
        day_data = report.coaches[day_str]
        for trainer_name, data in day_data.get("trainers", {}).items():
            sections_data["coaches"].append({
                "id": f"co_{day_str}_{trainer_name}",
                "name": trainer_name,
                "phone": "",
                "info": f'{day_str} {day_data.get("weekday","")} | 忙:{" ".join(data.get("busy",[]))} | 闲:{" ".join(data.get("free",[]))}',
                "label": day_str,
                "coach": trainer_name,
                "consultant": "",
                "course": "",
                "time": "",
            })

    # 教练空闲按日期分组，直接生成HTML
    coaches_day_html = ""
    for day_str in sorted(report.coaches.keys()):
        day_data = report.coaches[day_str]
        weekday = day_data.get("weekday", "")
        trainer_rows = ""
        for trainer_name, data in day_data.get("trainers", {}).items():
            free_slots = " | ".join(data["free"]) if data["free"] else "无空闲"
            busy_slots = " | ".join(data.get("courses", [])) if data.get("courses") else "无课程"
            trainer_rows += f"""<div class="r">
            <div class="top"><span class="n">{trainer_name}</span><span class="i">🔴 忙碌: {busy_slots}</span></div>
            <div class="top" style="margin-top:2px"><span></span><span class="i" style="color:#10b981">🟢 空闲: {free_slots}</span></div>
            </div>"""
        if not trainer_rows:
            trainer_rows = '<div style="padding:10px;color:#999;text-align:center">当天无课程安排</div>'
        coaches_day_html += f"""<div class="sec" style="margin-bottom:4px">
        <div class="sh" onclick="toggleSec('co_{day_str}')" style="font-size:13px"><span>{day_str} {weekday}</span><span style="display:flex;gap:8px;align-items:center"><span class="arrow">&#9660;</span></span></div>
        <div class="rows" id="rows_co_{day_str}">{trainer_rows}</div>
        </div>"""

    sections_json = json.dumps(sections_data, ensure_ascii=False)

    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>每日提醒 - {t}</title>
<style>
* {{box-sizing:border-box;margin:0;padding:0}}
body {{font-family:-apple-system,'PingFang SC',sans-serif;background:#f0f2f5;color:#333;display:flex;min-height:100vh}}
/* 侧边栏 */
.sidebar {{width:200px;background:#1e1e2f;color:#ccc;padding:20px 0;position:fixed;top:0;left:0;bottom:0;z-index:100;display:flex;flex-direction:column}}
.sidebar h3 {{color:#fff;padding:0 16px 16px;font-size:15px;border-bottom:1px solid #333}}
.sidebar nav {{flex:1;overflow-y:auto;padding:8px 0}}
.sidebar nav a {{display:flex;align-items:center;gap:8px;padding:10px 16px;color:#aaa;text-decoration:none;font-size:13px;transition:all .2s;border-left:3px solid transparent}}
.sidebar nav a:hover,.sidebar nav a.active {{background:#2a2a40;color:#fff;border-left-color:#667eea}}
.sidebar nav a .dot {{width:8px;height:8px;border-radius:50%;flex-shrink:0}}
.sidebar nav a .dot.d1 {{background:#3b82f6}}
.sidebar nav a .dot.d2 {{background:#8b5cf6}}
.sidebar nav a .dot.d3 {{background:#ef4444}}
.sidebar nav a .dot.d4 {{background:#f59e0b}}
.sidebar nav a .dot.d5 {{background:#10b981}}
.sidebar nav a .dot.d6 {{background:#ec4899}}
.sidebar .export-area {{padding:12px 16px;border-top:1px solid #333}}
.sidebar .export-area button {{width:100%;padding:8px;background:#667eea;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;margin-bottom:4px}}
.sidebar .export-area button:hover {{background:#5a6fd6}}
.sidebar .export-area button.sec-btn {{background:#444;margin-top:4px}}
.sidebar .export-area button.sec-btn:hover {{background:#555}}
/* 主区域 */
.main {{margin-left:200px;flex:1;padding:24px 32px}}
.header {{background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:24px 32px;border-radius:12px;margin-bottom:24px}}
.header h1 {{font-size:20px;margin-bottom:6px}}
.header .date {{opacity:.85;font-size:13px;margin-bottom:14px}}
.stats {{display:flex;gap:12px;flex-wrap:wrap}}
.stats span {{background:rgba(255,255,255,.18);padding:5px 14px;border-radius:16px;font-size:12px;cursor:pointer;transition:background .2s}}
.stats span:hover {{background:rgba(255,255,255,.3)}}
/* 卡片区 */
.sec {{background:#fff;border-radius:10px;margin-bottom:16px;box-shadow:0 1px 3px rgba(0,0,0,.05);overflow:hidden}}
.sec .sh {{padding:14px 20px;font-weight:600;font-size:14px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;user-select:none}}
.sec .sh:hover {{background:#fafafa}}
.sec .sh .arrow {{transition:transform .2s;font-size:12px;color:#999}}
.sec.collapsed .sh .arrow {{transform:rotate(-90deg)}}
.sec.collapsed .rows {{display:none}}
.badge {{font-size:11px;padding:3px 10px;border-radius:10px;font-weight:500}}
.badge.c1 {{background:#dbeafe;color:#1e40af}}
.badge.c2 {{background:#fee2e2;color:#991b1b}}
.badge.c3 {{background:#fef3c7;color:#92400e}}
.badge.c4 {{background:#d1fae5;color:#065f46}}
.badge.c5 {{background:#e0e7ff;color:#3730a3}}
.rows {{border-top:1px solid #f0f0f0}}
.r {{border-bottom:1px solid #f8f8f8;padding:10px 20px;font-size:13px}}
.r:last-child {{border-bottom:none}}
.r .top {{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}}
.r .top .n {{font-weight:500}}
.r .top .i {{color:#6b7280;font-size:12px}}
.lb {{font-size:10px;padding:2px 7px;border-radius:3px;margin-left:6px;white-space:nowrap}}
.lb.nw {{background:#dbeafe;color:#1e40af}}
.lb.dg {{background:#fee2e2;color:#991b1b}}
.lb.ac {{background:#ede9fe;color:#5b21b6;font-weight:600}}
.lb.cl {{background:#d1fae5;color:#065f46}}
/* 跟进区域 */
.follow {{display:flex;align-items:center;gap:8px;flex-wrap:wrap}}
.follow select,.follow input {{font-size:11px;padding:4px 8px;border:1px solid #ddd;border-radius:4px;outline:none}}
.follow select:focus,.follow input:focus {{border-color:#667eea}}
.follow input {{flex:1;min-width:120px}}
.follow .status {{font-size:11px;padding:3px 8px;border-radius:3px;font-weight:500;white-space:nowrap}}
.follow .status.pending {{background:#f3f4f6;color:#6b7280}}
.follow .status.doing {{background:#fef3c7;color:#92400e}}
.follow .status.done {{background:#d1fae5;color:#065f46}}
.follow .save-hint {{font-size:10px;color:#10b981;opacity:0;transition:opacity .3s}}
.follow .save-hint.show {{opacity:1}}
.footer {{text-align:center;padding:20px;color:#999;font-size:11px}}
/* 子区块（本月新会员已/未转化） */
.subsec {{border-top:1px solid #f0f0f0}}
.subsh {{padding:10px 20px;font-size:13px;font-weight:500;display:flex;justify-content:space-between;align-items:center;cursor:pointer;background:#fafafa;user-select:none}}
.subsh:hover {{background:#f3f4f6}}
.subsec.collapsed .sub-arrow {{transform:rotate(-90deg)}}
.subsec.collapsed .subrows {{display:none}}
.subrows .r {{padding-left:28px}}
@media (max-width:768px) {{
  .sidebar {{width:50px;padding:12px 0}}
  .sidebar h3,.sidebar nav a span:not(.dot),.sidebar .export-area span {{display:none}}
  .sidebar nav a {{justify-content:center;padding:10px}}
  .sidebar .export-area button {{font-size:10px;padding:6px}}
  .main {{margin-left:50px;padding:16px}}
}}
</style>
</head>
<body>
<div class="sidebar">
  <h3>导航</h3>
  <nav>
    <a href="#sec1"><span class="dot d1"></span><span>新会员</span></a>
    <a href="#sec2"><span class="dot d2"></span><span>第2节课</span></a>
    <a href="#sec3"><span class="dot d3"></span><span>课时不足</span></a>
    <a href="#sec4"><span class="dot d4"></span><span>里程碑</span></a>
    <a href="#sec5"><span class="dot d5"></span><span>教练空闲</span></a>
    <a href="#sec6"><span class="dot d6"></span><span>本月新会员</span></a>
  </nav>
  <div style="padding:12px 16px;border-top:1px solid #333">
    <div style="font-size:11px;color:#888;margin-bottom:4px">选择日期</div>
    <select id="datePicker" onchange="navToDate(this.value)" style="width:100%;padding:6px;background:#2a2a40;color:#ccc;border:1px solid #444;border-radius:4px;font-size:12px;outline:none">
    </select>
  </div>
  <div class="export-area">
    <button onclick="exportCSV()" title="导出CSV文件">导出 CSV</button>
    <button onclick="exportMonthlyNewCSV()" title="单独导出本月新会员" style="background:#10b981">导出本月新会员</button>
    <button class="sec-btn" onclick="exportJSON()" title="导出含跟进记录">导出 JSON</button>
    <span style="font-size:10px;color:#777;display:block;text-align:center;margin-top:6px">跟进自动保存</span>
  </div>
</div>
<div class="main">
<div class="header" id="top">
  <h1>每日提醒报告</h1>
  <div class="date">{t} · {datetime.now().strftime('%H:%M')}</div>
  <div class="stats">
    <span onclick="scrollToSec('sec1')">新会员 {s['new_small_group'] + s['new_personal']}人</span>
    <span onclick="scrollToSec('sec2')">第2节课 {s['second_class']}人</span>
    <span onclick="scrollToSec('sec3')">课时不足 {s['low_sessions']}人</span>
    <span onclick="scrollToSec('sec4')">里程碑 {s['milestones']}人</span>
    <span onclick="scrollToSec('sec5')">教练空闲 {s['coaches']}位</span>
    <span onclick="scrollToSec('sec6')">本月新会员 {len(sections_data['monthly_converted']) + len(sections_data['monthly_unconverted'])}人（转化{len(sections_data['monthly_converted'])} 未转化{len(sections_data['monthly_unconverted'])}）</span>
  </div>
</div>

<div class="sec collapsed" id="sec1">
  <div class="sh" onclick="toggleSec('sec1')"><span>一、今日新会员</span><span style="display:flex;gap:8px;align-items:center"><span class="badge c1">{len(sections_data['new_members'])}条</span><span class="arrow">&#9660;</span></span></div>
  <div class="rows" id="rows_sec1"></div>
</div>

<div class="sec" id="sec2">
  <div class="sh" onclick="toggleSec('sec2')"><span>二、今日第2节小班课会员</span><span style="display:flex;gap:8px;align-items:center"><span class="badge c5">{len(sections_data['second_class'])}条</span><span class="arrow">&#9660;</span></span></div>
  <div class="rows" id="rows_sec2"></div>
</div>

<div class="sec collapsed" id="sec3">
  <div class="sh" onclick="toggleSec('sec3')"><span>三、课时不足提醒（低于5节）</span><span style="display:flex;gap:8px;align-items:center"><span class="badge c2">{len(sections_data['low_sessions'])}条</span><span class="arrow">&#9660;</span></span></div>
  <div class="rows" id="rows_sec3"></div>
</div>

<div class="sec collapsed" id="sec4">
  <div class="sh" onclick="toggleSec('sec4')"><span>四、会员里程碑节点</span><span style="display:flex;gap:8px;align-items:center"><span class="badge c3">{len(sections_data['milestones'])}条</span><span class="arrow">&#9660;</span></span></div>
  <div class="rows" id="rows_sec4"></div>
</div>

<div class="sec" id="sec5">
  <div class="sh" onclick="toggleSec('sec5')"><span>五、教练空闲时间（周一至周日）</span><span style="display:flex;gap:8px;align-items:center"><span class="arrow">&#9660;</span></span></div>
  <div class="rows" id="rows_sec5">
    {coaches_day_html}
  </div>
</div>

<div class="sec collapsed" id="sec6">
  <div class="sh" onclick="toggleSec('sec6')">
    <span>六、{_month_label}新会员</span>
    <span style="display:flex;gap:8px;align-items:center">
      <span class="badge c4">共{len(sections_data['monthly_converted']) + len(sections_data['monthly_unconverted'])}人</span>
      <span class="arrow">&#9660;</span>
    </span>
  </div>
  <div class="rows" id="rows_sec6">
    <div class="subsec" id="subsec6a">
      <div class="subsh" onclick="toggleSubsec('subsec6a')">
        <span>✅ 已转化</span>
        <span style="display:flex;gap:8px;align-items:center">
          <span class="badge c4">{len(sections_data['monthly_converted'])}人</span>
          <span class="arrow sub-arrow">&#9660;</span>
        </span>
      </div>
      <div class="subrows" id="subrows_subsec6a"></div>
    </div>
    <div class="subsec" id="subsec6b">
      <div class="subsh" onclick="toggleSubsec('subsec6b')">
        <span>⏳ 未转化</span>
        <span style="display:flex;gap:8px;align-items:center">
          <span class="badge c2">{len(sections_data['monthly_unconverted'])}人</span>
          <span class="arrow sub-arrow">&#9660;</span>
        </span>
      </div>
      <div class="subrows" id="subrows_subsec6b"></div>
    </div>
  </div>
</div>

<div class="footer">智能助理自动生成 · 跟进记录自动保存至浏览器本地存储</div>
</div>

<script>
const DATA = {sections_json};
const REPORT_DATE = '{report_date}';
const STORAGE_KEY = 'assistant_followup_' + REPORT_DATE;
const AVAILABLE_DATES = {available_dates_json};

// 初始化日期选择器
function initDatePicker() {{
  const sel = document.getElementById('datePicker');
  AVAILABLE_DATES.forEach(function(d) {{
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    if (d === REPORT_DATE) opt.selected = true;
    sel.appendChild(opt);
  }});
}}

// 导航到指定日期的报告
function navToDate(d) {{
  if (d === REPORT_DATE) return;
  window.location.href = '每日提醒_' + d + '.html';
}}

// 加载已保存的跟进记录
function loadFollowups() {{
  try {{
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{{}}');
  }} catch(e) {{ return {{}}; }}
}}

function saveFollowups(data) {{
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}}

// 构建行HTML
function buildRow(item, cls, secKey) {{
  const followups = loadFollowups();
  const f = followups[item.id] || {{}};
  const status = f.status || '';
  const note = f.note || '';
  const statusText = {{pending:'待跟进', doing:'跟进中', done:'已完成'}}[status] || '';
  const statusCls = status || '';

  let labelCls = 'nw';
  if (cls === 'c2') labelCls = 'dg';
  else if (cls === 'c3') labelCls = 'ac';
  else if (cls === 'c4') labelCls = 'cl';

  return `<div class="r" id="row_${{item.id}}">
    <div class="top">
      <span class="n">${{item.name}}<span class="lb ${{labelCls}}">${{item.label}}</span></span>
      <span class="i">${{item.info}}${{item.phone ? ' | '+item.phone : ''}}</span>
    </div>
    <div class="follow">
      <select id="sel_${{item.id}}">
        <option value="">-- 跟进状态 --</option>
        <option value="pending" ${{status==='pending'?'selected':''}}>待跟进</option>
        <option value="doing" ${{status==='doing'?'selected':''}}>跟进中</option>
        <option value="done" ${{status==='done'?'selected':''}}>已完成</option>
      </select>
      <input type="text" id="note_${{item.id}}" placeholder="跟进备注..." value="${{note.replace(/'/g, '&#39;').replace(/"/g, '&quot;')}}">
	      <button onclick="saveFollow('${{item.id}}')" style="font-size:11px;padding:4px 10px;background:#667eea;color:#fff;border:none;border-radius:4px;cursor:pointer">保存</button>
      ${{statusText ? '<span class="status '+statusCls+'" id="badge_'+item.id+'">'+statusText+'</span>' : '<span class="status" id="badge_'+item.id+'" style="display:none"></span>'}}
      <span class="save-hint" id="hint_${{item.id}}">已保存</span>
    </div>
  </div>`;
}}

// 子区块折叠
function toggleSubsec(id) {{
  document.getElementById(id).classList.toggle('collapsed');
}}

// 渲染所有区域
function renderAll() {{
  const secMap = {{
    sec1: {{key:'new_members', cls:'c1'}},
    sec2: {{key:'second_class', cls:'c5'}},
    sec3: {{key:'low_sessions', cls:'c2'}},
    sec4: {{key:'milestones', cls:'c3'}},
  }};
  Object.entries(secMap).forEach(([secId, cfg]) => {{
    const rowsEl = document.getElementById('rows_'+secId);
    const items = DATA[cfg.key] || [];
    if (items.length === 0) {{
      rowsEl.innerHTML = '<div style="padding:20px;color:#999;text-align:center">暂无数据</div>';
    }} else {{
      rowsEl.innerHTML = items.map(function(item) {{ return buildRow(item, cfg.cls, cfg.key); }}).join('');
    }}
  }});

  // sec6：本月新会员分已转化/未转化两个子区块
  const subMap = {{
    subsec6a: {{key:'monthly_converted', cls:'c4'}},
    subsec6b: {{key:'monthly_unconverted', cls:'c2'}},
  }};
  Object.entries(subMap).forEach(([subId, cfg]) => {{
    const rowsEl = document.getElementById('subrows_'+subId);
    const items = DATA[cfg.key] || [];
    if (items.length === 0) {{
      rowsEl.innerHTML = '<div style="padding:16px 28px;color:#999;font-size:13px">暂无数据</div>';
    }} else {{
      rowsEl.innerHTML = items.map(function(item) {{ return buildRow(item, cfg.cls, cfg.key); }}).join('');
    }}
  }});

  // sec5 (教练空闲) 已预渲染为按天分组，无需JS动态构建
}}

// 保存跟进状态（从DOM读取值）
function saveFollow(id) {{
  const followups = loadFollowups();
  if (!followups[id]) followups[id] = {{}};
  
  const sel = document.getElementById('sel_'+id);
  const noteInput = document.getElementById('note_'+id);
  const status = sel ? sel.value : '';
  const note = noteInput ? noteInput.value : '';
  
  followups[id].status = status;
  followups[id].note = note;
  followups[id].updated = new Date().toISOString();
  saveFollowups(followups);

  // 更新状态标签
  const badge = document.getElementById('badge_'+id);
  if (badge) {{
    const texts = {{pending:'待跟进', doing:'跟进中', done:'已完成'}};
    badge.textContent = texts[status] || '';
    badge.className = 'status ' + (status || '');
    if (!status) {{
      badge.style.display = 'none';
    }} else {{
      badge.style.display = '';
    }}
  }}

  // 显示保存提示
  const hint = document.getElementById('hint_'+id);
  if (hint) {{
    hint.classList.add('show');
    setTimeout(function() {{ hint.classList.remove('show'); }}, 1500);
  }}
}}

// 切换折叠
function toggleSec(id) {{
  document.getElementById(id).classList.toggle('collapsed');
}}

// 滚动到区域
function scrollToSec(id) {{
  const el = document.getElementById(id);
  if (el.classList.contains('collapsed')) el.classList.remove('collapsed');
  el.scrollIntoView({{behavior:'smooth', block:'start'}});
  // 高亮动画
  el.style.boxShadow = '0 0 0 3px #667eea';
  setTimeout(function() {{ el.style.boxShadow = ''; }}, 1500);
}}

// 导出CSV
function exportCSV() {{
  const followups = loadFollowups();
  const statusText = {{pending:'待跟进', doing:'跟进中', done:'已完成'}};
  let csv = '\\uFEFF类别,姓名,电话,课程,时间,教练,会籍顾问,标签,跟进状态,跟进备注\\n';
  const secNames = {{
    new_members:'今日新会员', second_class:'第2节小班课',
    low_sessions:'课时不足', milestones:'里程碑', coaches:'教练空闲',
    monthly_converted:'本月新会员·已转化', monthly_unconverted:'本月新会员·未转化'
  }};
  Object.entries(secNames).forEach(function(kv) {{
    const key = kv[0], secName = kv[1];
    (DATA[key] || []).forEach(function(item) {{
      const f = followups[item.id] || {{}};
      csv += '"' + secName + '","' + item.name + '","' + (item.phone||'') + '","' +
        (item.course||'') + '","' + (item.time||'') + '","' + (item.coach||'') + '","' +
        (item.consultant||'') + '","' + item.label + '","' + (statusText[f.status]||'') +
        '","' + (f.note||'') + '"\\n';
    }});
  }});
  const blob = new Blob([csv], {{type:'text/csv;charset=utf-8'}});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = '每日提醒_' + REPORT_DATE + '.csv';
  a.click(); URL.revokeObjectURL(url);
}}

// 导出JSON（含跟进记录）
function exportJSON() {{
  const followups = loadFollowups();
  const exportData = {{date: REPORT_DATE, data: DATA, followups: followups}};
  const blob = new Blob([JSON.stringify(exportData, null, 2)], {{type:'application/json'}});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = '每日提醒_' + REPORT_DATE + '_完整.json';
  a.click(); URL.revokeObjectURL(url);
}}

// 单独导出本月新会员CSV（已转化+未转化合并，含转化分组列）
function exportMonthlyNewCSV() {{
  const followups = loadFollowups();
  const statusText = {{pending:'待跟进', doing:'跟进中', done:'已完成'}};
  let csv = '\\uFEFF姓名,电话,类型,转化分组,首课日期,首课课程,教练,会籍顾问,转化状态,出勤次数,私教节数,跟进状态,跟进备注\\n';
  const allItems = (DATA['monthly_converted'] || []).map(function(i) {{ return {{...i, _group:'已转化'}}; }})
    .concat((DATA['monthly_unconverted'] || []).map(function(i) {{ return {{...i, _group:'未转化'}}; }}));
  allItems.forEach(function(item) {{
    const f = followups[item.id] || {{}};
    const infoMatch = item.info.match(/出勤(\\d+)次.*?私教(\\d+)节/);
    const checkins = infoMatch ? infoMatch[1] : '';
    const pt = infoMatch ? infoMatch[2] : '';
    const typeStr = item.label.split(' ')[0] || '';
    csv += '"' + (item.name||'') + '","' + (item.phone||'') + '","' +
      typeStr + '","' + item._group + '","' + (item.time||'') + '","' +
      (item.course||'') + '","' + (item.coach||'') + '","' +
      (item.consultant||'') + '","' + (item.label||'') + '","' +
      checkins + '","' + pt + '","' +
      (statusText[f.status]||'') + '","' + (f.note||'') + '"\\n';
  }});
  const blob = new Blob([csv], {{type:'text/csv;charset=utf-8'}});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const yearMonth = REPORT_DATE.slice(0,7);
  a.href = url; a.download = yearMonth + '_本月新会员.csv';
  a.click(); URL.revokeObjectURL(url);
}}

// 导航高亮
const navLinks = document.querySelectorAll('.sidebar nav a');
const secIds = ['sec1','sec2','sec3','sec4','sec5','sec6'];
window.addEventListener('scroll', function() {{
  let current = '';
  secIds.forEach(function(id) {{
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < 200) current = id;
  }});
  navLinks.forEach(function(a) {{
    a.classList.toggle('active', a.getAttribute('href') === '#'+current);
  }});
}});

// 初始化
initDatePicker();
renderAll();
</script>
</body></html>"""


def save_and_open(report):
    html = generate_html(report)
    fp = REPORT_DIR / f"每日提醒_{report.date}.html"
    fp.write_text(html, encoding="utf-8")

    # 保存JSON
    jp = REPORT_DIR / f"每日提醒_{report.date}.json"
    jp.write_text(json.dumps({
        "date": report.date,
        "summary": report.summary(),
        "new_small_group": report.new_small_group,
        "new_personal": report.new_personal,
        "second_class": report.second_class,
        "low_sessions": report.low_sessions,
        "milestones": report.milestones,
        "coaches": {k: {"weekday": v["weekday"], "trainers": v["trainers"]}
                    for k, v in report.coaches.items()},
        "monthly_new_members": report.monthly_new_members,
    }, ensure_ascii=False, indent=2), encoding="utf-8")

    import webbrowser
    webbrowser.open(f"file://{fp}")
    return fp


# ============================================================
#  主流程
# ============================================================
def run(show_browser=True):
    print("智能助理启动中...")

    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            headless=not show_browser,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--disable-cache",
                "--disable-application-cache",
            ],
        )

        storage_state = str(AUTH_FILE) if AUTH_FILE.exists() else None
        if storage_state:
            print("加载已保存的登录状态...")

        context = browser.new_context(
            storage_state=storage_state,
            viewport={"width": 1400, "height": 900},
            no_viewport=True,
        )
        # 禁用缓存以确保获取最新数据
        context.set_default_timeout(60000)

        try:
            page = context.new_page()
            ensure_login(page)

            print("开始获取数据...\n")

            # 1. 获取课程数据（含学员名）
            print("[1/5] 获取课程数据...")
            courses, api_urls = fetch_courses(page)
            today = today_str()

            # 诊断：courses 覆盖了哪些日期
            src_dates = set()
            for c in courses["group"] + courses["private"]:
                src_dates.add(c.get("date", ""))
            if src_dates:
                print(f"  [诊断] fetch_courses 覆盖日期: {min(src_dates)} ~ {max(src_dates)} ({len(src_dates)} 天)")
            today_group = [c for c in courses["group"] if c.get("date") == today]
            today_private = [c for c in courses["private"] if c.get("date") == today]
            print(f"  今日团体课: {len(today_group)} 节, 私教课: {len(today_private)} 节")

            # 尝试获取整周课程用于教练空闲计算
            week_courses = fetch_week_courses(page, api_urls)
            # 如果周数据获取失败，用 courses（页面拦截的完整周数据）作为回退
            total_week = len(week_courses.get("group", [])) + len(week_courses.get("private", []))
            if total_week == 0:
                print("  周数据获取失败，使用页面拦截数据作为回退")
                week_courses = {"group": list(courses["group"]),
                                "private": list(courses["private"])}

            # 获取本月全部课程用于月度新会员统计（按周导航页面抓取）
            month_courses = fetch_month_courses(page)
            total_month = len(month_courses.get("group", [])) + len(month_courses.get("private", []))
            if total_month == 0:
                print("  月数据获取失败，使用页面拦截数据作为回退")
                month_courses = {"group": list(courses["group"]),
                                 "private": list(courses["private"])}

            # 2. 获取全部会员数据
            print("[2/5] 获取会员数据...")
            members = fetch_all_members(page)

            # 3. 获取全部私教数据
            print("[3/5] 获取私教数据...")
            trainees = fetch_all_trainees(page)

            # 4. 应用规则（传入整周课程、整月课程）
            print("[4/5] 应用提醒规则...")
            report = apply_rules(courses, members, trainees, week_courses, month_courses)

            # 5. 生成报告
            print("[5/5] 生成报告...")
            filepath = save_and_open(report)

            # 6. 飞书推送
            if FEISHU_WEBHOOKS:
                print("\n[推送] 发送飞书通知...")
                send_feishu(report)

            s = report.summary()
            print("\n" + "=" * 50)
            print(f"  {date.today()} 每日提醒报告")
            print("=" * 50)
            print(f"  一、今日新会员: 小班课{s['new_small_group']}人 私教{s['new_personal']}人")
            print(f"  二、第2节小班课: {s['second_class']}人")
            print(f"  三、课时不足(<5节): {s['low_sessions']}人")
            print(f"  四、里程碑节点: {s['milestones']}人")
            print(f"  五、教练空闲时间: {s['coaches']}位")
            print(f"  六、本月新会员: {s['monthly_new']}人")
            print(f"\n报告已保存: {filepath}")

            return report

        except Exception as e:
            print(f"\n出错: {e}")
            import traceback
            traceback.print_exc()
        finally:
            browser.close()


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--cron", action="store_true", help="后台模式")
    p.add_argument("--no-browser", action="store_true", help="不显示浏览器")
    args = p.parse_args()

    if args.cron:
        try:
            subprocess.run(["osascript", "-e",
                'display notification "正在生成每日提醒..." with title "智能助理"'],
                timeout=5)
        except Exception:
            pass
        report = run(show_browser=False)
        if report:
            s = report.summary()
            total = (s["new_small_group"] + s["new_personal"] +
                    s["second_class"] + s["low_sessions"] + s["milestones"])
            try:
                subprocess.run(["osascript", "-e",
                    f'display notification "共{total}条提醒" with title "智能助理" sound name "Glass"'],
                    timeout=5)
            except Exception:
                pass
    else:
        run(show_browser=not args.no_browser)
        
