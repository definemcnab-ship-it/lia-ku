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
FOLLOWUPS_FILE = DATA_DIR / "followups.json"
SERVER_PORT = 18765
SERVER_SCRIPT = DATA_DIR / "_server.py"

MILESTONES = {
    1:  "课后回访", 5:  "体测", 10: "第一轮案例",
    15: "第二轮体测", 20: "第二轮案例",
    25: "第三轮体测", 30: "第三轮案例",
}

# ============================================================
#  "教练的会员列表"里不作为归属教练的名字
#  这些是会籍/管理等角色，不带私教。她们名下的会员会自动改归到
#  "最近上课的真实教练"。以后要增删，直接改这个列表即可。
# ============================================================
EXCLUDED_COACHES = {
    "莉娅", "林超群", "维尼", "肖湘蓉", "姣姣", "丽丽", "子希",
}
# 归一化排除名单（去掉英文/空格），用于匹配"莉娅Lia"这类"中文名+英文名"的写法
_EXCLUDED_COACHES_NORM = {
    re.sub(r"[A-Za-z\s]+", "", x).strip() for x in EXCLUDED_COACHES
}


def _is_excluded_coach(coach):
    """教练名是否在排除名单里。忽略中文名后缀的英文（莉娅Lia→按'莉娅'匹配）。"""
    if not coach:
        return False
    if coach in EXCLUDED_COACHES:
        return True
    core = re.sub(r"[A-Za-z\s]+", "", coach).strip()
    return bool(core) and core in _EXCLUDED_COACHES_NORM

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
def _wait_for_network(page, url, max_attempts=6, per_timeout=30000, gap=10000):
    """等待网络就绪再开跑。

    定时任务在 Mac 刚唤醒时触发，此时 WiFi 常还没连稳，若直接抓数据会拿到
    残缺结果（部分接口失败、推送不全）。这里反复尝试打开页面，直到成功或
    次数用尽，给网络最多约 (max_attempts × (per_timeout+gap)) 的恢复时间。
    """
    for attempt in range(max_attempts):
        try:
            page.goto(url, wait_until="networkidle", timeout=per_timeout)
            if attempt > 0:
                print(f"  ✅ 网络已就绪（第{attempt + 1}次尝试成功）")
            return True
        except Exception as e:
            print(f"  ⏳ 等待网络就绪（第{attempt + 1}/{max_attempts}次）: {str(e)[:60]}")
            if attempt < max_attempts - 1:
                page.wait_for_timeout(gap)
    print("  ⚠️ 网络多次未就绪，仍尝试继续（结果可能不完整）")
    return False


def ensure_login(page):
    url = f"{BASE_URL}/home/manage/course/reservations"
    # 先等网络真正连通，避免刚唤醒时半连接状态下抓到残缺数据
    _wait_for_network(page, url)
    page.wait_for_timeout(5000)

    if "login" in page.url.lower():
        print("\n" + "=" * 50)
        print("  请在弹出的浏览器窗口中登录 forzadata.cn")
        print("  登录成功后程序将自动继续...")
        print("=" * 50 + "\n")
        try:
            page.wait_for_url("**/home/manage/**", timeout=300000)
        except PwTimeout:
            raise RuntimeError("登录超时：登录状态可能已过期，请手动运行 assistant.py 重新登录")
        page.wait_for_timeout(5000)

    if "login" in page.url.lower():
        print("仍需登录，请重新登录...")
        try:
            page.wait_for_url("**/home/manage/**", timeout=300000)
        except PwTimeout:
            raise RuntimeError("登录超时：登录状态可能已过期，请手动运行 assistant.py 重新登录")
        page.wait_for_timeout(5000)

    page.context.storage_state(path=str(AUTH_FILE))
    print("登录状态已保存\n")
    return True


# ============================================================
#  数据获取（通过API拦截 + fetch调用）
# ============================================================
def _safe_goto(page, url, wait_until="domcontentloaded", timeout=60000,
               retries=2, settle=3000):
    """带重试的页面导航：偶发网络超时（如定时任务触发时Mac刚唤醒、网络还没就绪）
    不应让整次运行失败。超时后自动多试几次，仍失败才抛出。"""
    last_err = None
    for attempt in range(retries + 1):
        try:
            page.goto(url, wait_until=wait_until, timeout=timeout)
            return True
        except Exception as e:
            last_err = e
            print(f"  ⚠️ 页面加载超时/失败（第{attempt + 1}/{retries + 1}次）: {str(e)[:80]}")
            if attempt < retries:
                page.wait_for_timeout(settle * (attempt + 1))  # 递增等待后重试
    raise last_err


def _safe_reload(page, wait_until="networkidle", timeout=60000):
    """容错的页面刷新：刷新失败不致命（首次导航可能已拦截到数据），仅告警。"""
    try:
        page.reload(wait_until=wait_until, timeout=timeout)
        return True
    except Exception as e:
        print(f"  ⚠️ 页面刷新失败（忽略，继续用已获取数据）: {str(e)[:80]}")
        return False


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
                total = d.get("totalCount", 0) or 0
            members = d.get("data", []) or []
            all_members.extend(members)
            # 停止条件（任一满足即停，防止 totalCount 偏大时无限翻页卡死）：
            if not members:
                break                              # 本页无数据，没有下一页了
            if total and len(all_members) >= total:
                break                              # 已取满声明的总数
            if len(members) < page_size:
                break                              # 本页不满一页，是最后一页
            page_num += 1
            if page_num > 1000:                    # 硬上限，绝不无限循环
                print("  ⚠️ 会员分页超过安全上限(1000页)，停止翻页")
                break
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

    # 诊断：打印一张"艾莉卡"权益点卡的全部字段，找出剩余金额(元)的字段名
    for m in all_members:
        cn = (m.get("cardName", "") or "") + (m.get("cardTypeName", "") or "")
        if "艾莉卡" in cn:
            print(f"  [诊断-权益点] 艾莉卡卡种 displayName={m.get('displayName','')} 全部字段:")
            for k, v in m.items():
                print(f"      {k} = {v}")
            break

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
    # 带时间戳的URL避免浏览器缓存（带重试，缓解偶发网络超时）
    _safe_goto(page, f"{BASE_URL}/home/manage/course/reservations?_t={_ts}",
               wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(2000)
    # 二次reload确保AngularJS获取最新API数据（刷新失败不致命）
    _safe_reload(page, wait_until="networkidle")
    page.wait_for_timeout(6000)

    if "login" in page.url.lower():
        page.remove_listener("response", on_response)
        return courses_data, api_urls

    print(f"  获取到 {len(courses_data['group'])} 节团体课, "
          f"{len(courses_data['private'])} 节私教课")
    page.remove_listener("response", on_response)
    return courses_data, api_urls


def fetch_week_courses(page, api_urls=None):
    """获取本周一到周日的全部课程。

    改用与 fetch_month_courses 相同的可靠方式：导航页面到本周日期范围并拦截
    接口响应（AngularJS 会据页面参数发起正确的接口请求）。旧方式靠改写接口
    URL 里的日期参数，但本站接口 URL 不含日期参数，一直替换失败、白跑刷屏。
    api_urls 参数保留仅为兼容旧调用，不再使用。
    """
    import time as _time
    from datetime import date as dt_date, timedelta

    today = dt_date.today()
    monday = today - timedelta(days=today.weekday())
    sunday = monday + timedelta(days=6)
    ws, we = monday.isoformat(), sunday.isoformat()
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
        page_url = (f"{BASE_URL}/home/manage/course/reservations"
                    f"?startDate={ws}&endDate={we}&_t={_ts}")
        _safe_goto(page, page_url, wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(1500)
        _safe_reload(page, wait_until="networkidle")
        page.wait_for_timeout(4000)
    except Exception as e:
        print(f"  ⚠️ 整周课程获取失败: {str(e)[:80]}")
    finally:
        page.remove_listener("response", on_response)

    # 去重
    def _dedup(lst):
        seen, out = set(), []
        for c in lst:
            k = f"{c.get('date')}_{c.get('startTime')}_{c.get('trainerName')}_{c.get('courseName')}"
            if k not in seen:
                seen.add(k)
                out.append(c)
        return out

    unique_group = _dedup(week_data["group"])
    unique_private = _dedup(week_data["private"])
    print(f"  本周总计: {len(unique_group)} 节团体课, {len(unique_private)} 节私教课 ({ws}~{we})")
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
            _safe_goto(page, page_url, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(1500)
            _safe_reload(page, wait_until="networkidle")
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


def fetch_upcoming_courses(page, weeks=2):
    """抓取从今天起未来 N 周的课程，用于查找会员下一节已约未上的课"""
    import time as _time
    from datetime import date as dt_date, timedelta

    today = dt_date.today()
    ranges = []
    for i in range(weeks):
        ws = today + timedelta(days=i * 7)
        we = ws + timedelta(days=6)
        ranges.append((ws.isoformat(), we.isoformat()))

    print(f"  未来约课需抓取 {len(ranges)} 段: "
          f"{' | '.join(f'{ws}~{we}' for ws, we in ranges)}")

    all_group = []
    all_private = []

    for idx, (ws, we) in enumerate(ranges):
        _ts = int(_time.time())
        seg = {"group": [], "private": []}

        def on_response(response):
            url = response.url
            if "reserved_instances" in url:
                try:
                    data = response.json()
                    if "isWebPage=true" in url:
                        seg["group"] = data.get("data", [])
                    elif "isTraining" not in url and "isWebPage" not in url:
                        seg["private"] = data.get("data", [])
                except Exception:
                    pass

        page.on("response", on_response)
        try:
            page_url = f"{BASE_URL}/home/manage/course/reservations?startDate={ws}&endDate={we}&_t={_ts}"
            _safe_goto(page, page_url, wait_until="domcontentloaded", timeout=60000)
            page.wait_for_timeout(1500)
            _safe_reload(page, wait_until="networkidle")
            page.wait_for_timeout(4000)
            if "login" in page.url.lower():
                page.remove_listener("response", on_response)
                break
            print(f"  未来第{idx+1}段 ({ws}~{we}): 团体{len(seg['group'])}节 私教{len(seg['private'])}节")
            all_group.extend(seg["group"])
            all_private.extend(seg["private"])
        except Exception as e:
            print(f"  ⚠️ 未来第{idx+1}段 ({ws}~{we}) 失败: {e}")
        finally:
            page.remove_listener("response", on_response)

    return {"group": all_group, "private": all_private}


def get_tomorrow_trials(upcoming_courses, member_lookup, pt_used=None):
    """从未来课程中提取明天的体验课新会员列表，逻辑与今日新会员一致：
    小班：体验课 + (签到=0 或 备注含"二次体验")
    私教：体验课 + (私教节数≤1 或 备注含"二次体验")
    """
    from datetime import date as _d, timedelta
    tomorrow = (_d.today() + timedelta(days=1)).isoformat()
    pt_used = pt_used or {}
    seen = set()

    trials = []
    for key, type_label in [("group", "小班"), ("private", "私教")]:
        for c in upcoming_courses.get(key, []):
            if c.get("date") != tomorrow:
                continue
            if c.get("status") == -1:  # 已取消的课程跳过
                continue
            course_name = c.get("courseName", "")
            trainer = c.get("trainerName", "")
            start_time = c.get("startTime", "")
            end_time = c.get("endTime", "")
            time_slot = f"{start_time}-{end_time}"
            trainee_names = parse_trainee_names(c.get("traineeNames", ""))
            course_remark = _get_remark(c)

            for tname in trainee_names:
                if not tname or tname in seen:
                    continue
                member = member_lookup.get(tname, {})
                total_checkins = member.get("checkInUsedCount", 0) or 0
                card_name = member.get("cardName", "")
                has_trial = member.get("has_trial_card", False)
                is_second = "二次体验" in course_remark

                # 判断是否体验课：课程名含"体验"或小班卡名含"体验"（首次）或备注含"二次体验"
                is_trial = ("体验" in course_name) or ("二次体验" in course_remark)
                if key == "group" and ("体验" in card_name) and total_checkins <= 0:
                    is_trial = True
                if not is_trial:
                    continue

                seen.add(tname)
                trials.append({
                    "name": tname,
                    "type": type_label,
                    "course": course_name,
                    "time": time_slot,
                    "trainer": trainer,
                    "consultant": member.get("sellerName", ""),
                    "remark": course_remark,
                })

    # 按时间排序
    trials.sort(key=lambda x: x.get("time", ""))
    return trials


def build_next_booking_lookup(upcoming_courses):
    """构建 会员名 -> 下一节已约未上课程 (date, time, courseName, trainer, 类型) 的查找表。
    取日期>=今天中最早的一节。"""
    from datetime import date as dt_date
    today_iso = dt_date.today().isoformat()
    bookings = {}  # name -> list of (date, startTime, courseName, trainer, type)
    for key, type_label in [("group", "小班"), ("private", "私教")]:
        for c in upcoming_courses.get(key, []):
            if c.get("status") == -1:  # 已取消的课程跳过
                continue
            cdate = c.get("date", "")
            if not cdate or cdate < today_iso:
                continue
            stime = c.get("startTime", "")
            cname = c.get("courseName", "")
            trainer = c.get("trainerName", "")
            for tname in parse_trainee_names(c.get("traineeNames", "")):
                if not tname:
                    continue
                bookings.setdefault(tname, []).append(
                    (cdate, stime, cname, trainer, type_label))
    # 每人取最早的一节
    lookup = {}
    for name, lst in bookings.items():
        lst.sort(key=lambda x: (x[0], x[1]))
        d, st, cn, tr, tp = lst[0]
        lookup[name] = {
            "date": d, "time": st, "course": cn,
            "trainer": tr, "type": tp,
        }
    return lookup


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
    low_group_points: list = field(default_factory=list)
    low_group_expiry: list = field(default_factory=list)  # 小班权益点卡有效期不足15天
    milestones: list = field(default_factory=list)
    coaches: dict = field(default_factory=dict)
    monthly_new_members: list = field(default_factory=list)
    coach_members: dict = field(default_factory=dict)  # 教练 -> 其名下私教会员列表

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
            "low_group_expiry": len(self.low_group_expiry),
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


def _clean(v):
    """把 None 或字符串 'None' 都转成空字符串"""
    if v is None or str(v) == "None":
        return ""
    return str(v)


def _ts_to_date(raw):
    """把 API 返回的到期时间安全转成 date。
    支持毫秒/秒时间戳（int/float/数字字符串）和 'YYYY-MM-DD' 字符串；
    无法解析或无到期时间时返回 None。"""
    if raw is None:
        return None
    if isinstance(raw, str):
        s = raw.strip()
        if not s:
            return None
        m = re.match(r"^(\d{4})-(\d{2})-(\d{2})", s)
        if m:
            try:
                return date(int(m.group(1)), int(m.group(2)), int(m.group(3)))
            except ValueError:
                return None
        try:
            raw = float(s)
        except ValueError:
            return None
    if not isinstance(raw, (int, float)) or raw <= 0:
        return None
    # 毫秒时间戳转秒
    if raw > 100000000000:
        raw = raw / 1000
    try:
        return datetime.fromtimestamp(raw).date()
    except (ValueError, OSError, OverflowError):
        return None


def build_coach_member_list(trainees, private_dated_courses, member_lookup):
    """按教练归集私教会员列表（不含纯体验会员）。

    归属规则：优先按"最近上课的教练"——取该会员最近一节【已上过的、非体验】私教课
    的教练（只看今天及以前，不含未来还没上的约课，避免被将来的约课带偏）；
    若已上过的课里找不到，再退一步看未来约课；仍没有则按签课记录里"上课最多"的教练。
    只纳入有【正式（非体验）私教课包】且【剩余节数 > 0】的会员。
    """
    from collections import Counter

    today_iso = date.today().isoformat()

    # 1) 最近上课教练：遍历带日期的私教课，取每个会员"最近一节已上过的非体验课"。
    #    过去/今天的课与未来的约课分开记，优先用已上过的，未来约课只作次选。
    latest_past = {}    # name -> (date, startTime, coach)  今天及以前（已上过）
    latest_future = {}  # name -> (date, startTime, coach)  今天以后（还没上）
    for c in private_dated_courses:
        if c.get("status") == -1:  # 已取消跳过
            continue
        cn = c.get("courseName", "") or ""
        if "体验" in cn:           # 不含体验课
            continue
        coach = (c.get("trainerName", "") or "").strip()
        if not coach or _is_excluded_coach(coach):  # 跳过非归属教练（会籍/管理）
            continue
        d = c.get("date", "") or ""
        if not d:
            continue
        st = c.get("startTime", "") or ""
        bucket = latest_past if d <= today_iso else latest_future
        for name in parse_trainee_names(c.get("traineeNames", "")):
            if not name:
                continue
            cur = bucket.get(name)
            if cur is None or (d, st) > (cur[0], cur[1]):
                bucket[name] = (d, st, coach)

    # 2) 真实私教会员集合 + 剩余节数 + 备用"上课最多"教练（排除纯体验课包）
    real_members = set()
    remain_total = {}   # name -> 剩余总节数
    fallback = {}       # name -> Counter(coach -> 已上节数)
    for t in trainees:
        name = t.get("traineeName", "")
        if not name:
            continue
        cn = t.get("courseName", "") or ""
        if "体验" in cn:           # 跳过体验课包
            continue
        real_members.add(name)
        remain_total[name] = remain_total.get(name, 0) + (t.get("remainCount", 0) or 0)
        used = max(0, (t.get("buyCount", 0) or 0) - (t.get("remainCount", 0) or 0))
        for coach in (t.get("courseTrainers", "") or "").split("/"):
            coach = coach.strip()
            if coach and not _is_excluded_coach(coach):  # 跳过非归属教练
                fallback.setdefault(name, Counter())[coach] += used

    # 3) 归集：教练 -> 会员
    coach_members = {}
    for name in real_members:
        # 剔除剩余 0 节的会员（课已上完，不算教练当前在带的会员）
        if remain_total.get(name, 0) <= 0:
            continue
        # 优先：最近一节【已上过】的课 → 次选：未来约课 → 兜底：上课最多
        if name in latest_past:
            coach = latest_past[name][2]
            last_date = latest_past[name][0]
        elif name in latest_future:
            coach = latest_future[name][2]
            last_date = latest_future[name][0]
        elif fallback.get(name):
            coach = fallback[name].most_common(1)[0][0]
            last_date = ""
        else:
            continue  # 没有任何教练线索，跳过
        m = member_lookup.get(name, {})
        coach_members.setdefault(coach, []).append({
            "name": name,
            "phone": m.get("memberPhone", ""),
            "consultant": m.get("sellerName", ""),
            "remaining": remain_total.get(name, 0),
            "last_class": last_date,
        })
    # 每位教练内部按剩余节数从少到多排（快用完的排前面，方便盯续课）
    for coach in coach_members:
        coach_members[coach].sort(key=lambda x: (x.get("remaining", 0), x.get("name", "")))
    return coach_members


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
                "memberPhone": _clean(m.get("memberPhone")),
                "sellerName": _clean(m.get("sellerName")),
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
        # 保留有值的手机号和会籍顾问（过滤 None）
        if _clean(m.get("memberPhone")) and not lookup[name]["memberPhone"]:
            lookup[name]["memberPhone"] = _clean(m.get("memberPhone"))
        if _clean(m.get("sellerName")) and not lookup[name]["sellerName"]:
            lookup[name]["sellerName"] = _clean(m.get("sellerName"))
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

    # endDate: 0/空 表示无过期时间（永久有效）；无法解析时也视为有效
    end_dt = _ts_to_date(end_date)
    if end_dt is not None and end_dt < date.today():
        return False

    return True


def _collect_today_courses(sources, key, today):
    """把多个来源里"今天"的课程合并去重，并合并同一节课在不同来源里的学员名。

    抓取"今日课程"依赖页面默认周视图的一次拦截，若某节课是刚约上的
    （如刚在13点约课后马上跑推送），这一次拦截可能没覆盖到。因此把
    fetch_week/month/upcoming 等独立按日期重新拉取的来源里"今天"的课
    也并进来，取学员名的并集，最大限度避免漏掉新约的学员。
    """
    by_id = {}
    order = []
    for src in sources:
        if not isinstance(src, dict):
            continue
        for c in src.get(key, []):
            if c.get("date") != today:
                continue
            cid = (c.get("date"), c.get("startTime"), c.get("endTime"),
                   c.get("trainerName"), c.get("courseName"))
            if cid not in by_id:
                by_id[cid] = dict(c)
                order.append(cid)
            else:
                # 同一节课，合并学员名（并集）。取消状态以首个来源（页面实时快照）为准，
                # 不因其他来源的过期数据误判为取消，避免漏掉正常课的学员
                existing = by_id[cid]
                names = set(parse_trainee_names(existing.get("traineeNames", ""))) | \
                        set(parse_trainee_names(c.get("traineeNames", "")))
                existing["traineeNames"] = "、".join(names)
    return [by_id[cid] for cid in order]


def apply_rules(courses, members, trainees, week_courses=None, month_courses=None,
                next_booking=None, upcoming_courses=None):
    """应用5大提醒规则。week_courses用于整周教练空闲，month_courses用于月度新会员"""
    report = DailyReport(date=today_str())
    today = today_str()
    next_booking = next_booking or {}
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

    # 合并所有来源里"今天"的课程（拦截的周视图 + 按日期重新拉取的周/月/未来），
    # 避免刚约上的课因单次拦截未覆盖而漏掉学员
    _today_sources = [courses, week_courses, month_courses, upcoming_courses]
    merged_today_group = _collect_today_courses(_today_sources, "group", today)
    merged_today_private = _collect_today_courses(_today_sources, "private", today)
    _base_group = len([c for c in courses.get("group", []) if c.get("date") == today])
    _base_private = len([c for c in courses.get("private", []) if c.get("date") == today])
    print(f"\n  [诊断] 今日课程合并: 团体 {_base_group}→{len(merged_today_group)} 节, "
          f"私教 {_base_private}→{len(merged_today_private)} 节（多来源合并后）")

    # 诊断：检查课程学员名匹配情况
    print("\n  [诊断] 名字匹配检查:")
    today_all_trainees = set()
    for c in merged_today_group + merged_today_private:
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

    # 收集今日所有课程及其学员（排除已取消的课程）
    def _is_course_cancelled(course):
        """判断课程是否已取消（status=-1 表示已取消）"""
        return course.get("status") == -1

    # 过滤已取消
    all_today_group = [c for c in merged_today_group if not _is_course_cancelled(c)]
    all_today_private = [c for c in merged_today_private if not _is_course_cancelled(c)]

    # 诊断：检查课程数据中的取消相关字段
    _cancelled_found = False
    for c in courses["group"] + courses["private"]:
        for f in ("status", "courseStatus", "state", "reserveStatus", "isCancel", "cancelled"):
            val = c.get(f)
            if val is not None and val != "" and val != 0 and val is not False:
                if not _cancelled_found:
                    print(f"\n  [诊断] 课程状态字段样例:")
                    _cancelled_found = True
                print(f"    {c.get('courseName','')[:15]} {c.get('date','')} {f}={val}")

    # 构建教练→今日课程映射
    coach_courses = {}

    # ---- 规则1: 新会员（首次约课）----
    # 新会员定义：用体验课首次约课（total_checkins=0），或备注注明"二次体验"
    print("\n  [诊断] 新会员判断（首次约课/二次体验）:")
    seen_new = set()  # 去重：一个会员只算一次新会员
    seen_second = set()  # 去重：一个会员只算一次第2节课

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

            # 小班新会员：课程名含"体验"或卡名含"体验"（首次）或备注含"二次体验"
            # 注意：小班体验课的课程名往往不含"体验"（如"核心床L1"），只能靠体验卡识别。
            # 签到门槛放宽到 <=1，避免"当天已签到导致签到数变1"的首次体验会员被漏掉。
            is_trial = ("体验" in course_name) or ("二次体验" in course_remark)
            is_first_trial = ("体验" in card_name) and total_checkins <= 1
            is_trial = is_trial or is_first_trial
            is_second = "二次体验" in course_remark

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

            if is_trial and tname not in seen_new:
                status.insert(0, "✅ 新会员")
                seen_new.add(tname)
                report.new_small_group.append({
                    "name": tname, "phone": phone,
                    "course": course_name, "time": time_slot,
                    "coach": trainer, "card": card_name,
                    "consultant": consultant,
                    "remark": course_remark,
                })
            elif not is_trial:
                status.insert(0, "⏭ 非体验课")
                # 第2节课检测（非体验课且签到=1）
                if total_checkins == 1 and member.get("has_valid_card") and tname not in seen_second:
                    seen_second.add(tname)
                    report.second_class.append({
                        "name": tname, "phone": phone,
                        "course": course_name, "time": time_slot,
                        "coach": trainer, "consultant": consultant,
                    })
                    status[0] = "📌 第2节"
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

            # 私教新会员：课程名含"体验"或备注含"二次体验"即纳入
            is_second = "二次体验" in course_remark
            is_trial = ("体验" in course_name) or is_second
            remark_hint = f" 备注={course_remark[:20]}" if course_remark else ""
            if is_trial and tname not in seen_new:
                seen_new.add(tname)
                report.new_personal.append({
                    "name": tname, "phone": phone,
                    "course": course_name, "time": time_slot,
                    "coach": trainer, "consultant": consultant,
                    "remark": course_remark,
                })
                print(f"    ✅ [新会员-私教] {tname} 课程={course_name}{remark_hint}")
            elif not is_trial:
                print(f"    ⏭  [非体验课-私教] {tname} 课程={course_name}{remark_hint}")

    # ---- 规则3: 私教课时不足（剩余2-4节，且未购买新课包）----
    # 同一学员可能有多个课包，按学员聚合剩余课时后再判断，避免重复提醒

    # 检测已续课学员：有 ≥2 个不同的正式课包名称（排除体验课/赠课）→ 已购买新产品
    def _is_formal_course(cn):
        """正式课包：非体验、非赠课"""
        return cn and "体验" not in cn and "赠课" not in cn

    trainee_packages = {}  # name -> set of formal courseName
    for t in trainees:
        tname = t.get("traineeName", "")
        if not tname:
            continue
        cn = t.get("courseName", "") or ""
        if _is_formal_course(cn):
            if tname not in trainee_packages:
                trainee_packages[tname] = set()
            trainee_packages[tname].add(cn)

    renewed_trainees = set()
    # 注意：循环变量不能叫 courses，否则会覆盖函数参数，导致规则5数据源出错
    for tname, pkg_names in trainee_packages.items():
        if len(pkg_names) >= 2:
            renewed_trainees.add(tname)

    if renewed_trainees:
        print(f"\n  [已续课] 以下学员有多个正式课包，已续课，不做课时不足提醒:")
        for n in sorted(renewed_trainees):
            print(f"    {n}: {', '.join(trainee_packages[n])}")

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
        if 1 < total_remain < 5:  # 剩余 2-4 节
            # 已续课（购买了新产品）的学员不推送课时不足
            if tname in renewed_trainees:
                print(f"  [课时不足-跳过] {tname} 已续课（剩余{total_remain}节），跳过提醒")
                continue
            member = member_lookup.get(tname, {})
            if member.get("has_valid_card"):
                t = low_sessions_detail[tname]
                nb = next_booking.get(tname, {})
                report.low_sessions.append({
                    "name": tname,
                    "phone": _clean(t.get("phone")),
                    "remaining": total_remain,
                    "course": t.get("courseName", ""),
                    "trainer": t.get("courseTrainers", ""),
                    "consultant": _clean(member.get("sellerName")),
                    "next_booking": f"{nb.get('date','')} {nb.get('time','')}".strip() if nb else "",
                })

    # ---- 规则3b: 小班课权益点不足（剩余2-5元，且未购买新权益点卡）----
    # 权益点卡 unit=="元"，remain 即剩余元数；仅统计有效卡
    # 只筛选 2025艾莉卡 / 2025艾莉卡max / 2025艾莉卡plus 三种权益点卡

    # 先检测已购买新权益点卡的会员：有 ≥2 个不同的权益点卡名（排除体验/赠送包）
    member_cards = {}  # name -> set of cardName
    for m in members:
        if (m.get("unit") or "") != "元":
            continue
        if not _is_card_valid(m):
            continue
        cn = m.get("cardName", "") or ""
        if not cn or "赠送包" in cn or "体验" in cn:
            continue
        gname = m.get("displayName", "")
        if not gname:
            continue
        if gname not in member_cards:
            member_cards[gname] = set()
        member_cards[gname].add(cn)

    renewed_members = set()
    for gname, cards in member_cards.items():
        if len(cards) >= 2:
            renewed_members.add(gname)

    if renewed_members:
        print(f"\n  [小班已续卡] 以下会员有多张正式权益点卡，不做权益点不足提醒:")
        for n in sorted(renewed_members):
            print(f"    {n}: {', '.join(member_cards[n])}")

    for m in members:
        if (m.get("unit") or "") != "元":
            continue
        if not _is_card_valid(m):
            continue
        card_nm = m.get("cardName", "") or ""
        if "赠送包" in card_nm or "体验" in card_nm:
            continue
        remain = m.get("remain", 0) or 0
        if 1 < remain <= 5:  # 剩余 2-5 元
            gname = m.get("displayName", "")
            # 已购买新权益点卡的会员不推送
            if gname in renewed_members:
                print(f"  [权益点不足-跳过] {gname} 有多张权益点卡（剩余{remain}元），跳过提醒")
                continue
            nb = next_booking.get(gname, {})
            report.low_group_points.append({
                "name": gname,
                "phone": _clean(m.get("memberPhone")),
                "remaining": remain,
                "card": m.get("cardName", ""),
                "consultant": _clean(m.get("sellerNames")) or _clean(m.get("sellerName")),
                "next_booking": f"{nb.get('date','')} {nb.get('time','')}".strip() if nb else "",
            })
    print(f"\n  [小班权益点不足] 剩余2-5元: {len(report.low_group_points)} 人")

    # 按下次约课时间从近到远排序（无约课的排最后）
    report.low_sessions.sort(key=lambda x: x.get("next_booking") or "9999")
    report.low_group_points.sort(key=lambda x: x.get("next_booking") or "9999")

    # ---- 规则3c: 艾莉卡/可可/艾萌 权益点卡有效期不足15天 ----
    # 独立新规则，不影响规则3b
    # 如果会员已有同系列卡剩余 > 15 天（已续课），则剔除

    # 小班卡种（推送范围）
    SMALL_GROUP_CARDS = [
        "2025艾莉卡plus", "2025艾莉卡max", "2025艾莉卡",
        "艾莉尊享无限卡",
    ]
    # 全部卡种（用于检测已续课，包含私教卡）
    ALL_CARD_TYPES = SMALL_GROUP_CARDS + [
        "2025可可卡pro", "2025可可卡max", "2025可可卡",
        "2025艾萌卡pro", "2025艾萌卡max", "2025艾萌卡",
    ]

    def _match_any(cn, types):
        for t in types:
            if t in cn:
                return True
        return False

    # 第一遍：检测已续课会员（所有卡种中任意卡剩余 > 15 天）
    renewed_ailika = set()
    for m in members:
        if not _is_card_valid(m):
            continue
        cn = m.get("cardName", "") or ""
        if not _match_any(cn, ALL_CARD_TYPES):
            continue
        expiry_date = _ts_to_date(m.get("expireDate")) or _ts_to_date(m.get("endDate"))
        if expiry_date is None:
            continue
        days_left = (expiry_date - date.today()).days
        if days_left > 15:
            renewed_ailika.add(m.get("displayName", ""))

    if renewed_ailika:
        print(f"\n  [艾莉卡已续课] {len(renewed_ailika)} 人已续课（含私教），不做过期提醒")

    # 第二遍：只筛选小班卡中有效期不足15天的
    for m in members:
        if not _is_card_valid(m):
            continue
        cn = m.get("cardName", "") or ""
        if not _match_any(cn, SMALL_GROUP_CARDS):
            continue
        gname = m.get("displayName", "")
        if gname in renewed_ailika:
            continue
        expiry_date = _ts_to_date(m.get("expireDate")) or _ts_to_date(m.get("endDate"))
        if expiry_date is None:
            continue
        days_left = (expiry_date - date.today()).days
        if 0 < days_left <= 15:
            nb = next_booking.get(gname, {})
            report.low_group_expiry.append({
                "name": gname,
                "phone": _clean(m.get("memberPhone")),
                "card": m.get("cardName", ""),
                "days_left": days_left,
                "end_date": expiry_date.isoformat(),
                "consultant": _clean(m.get("sellerNames")) or _clean(m.get("sellerName")),
                "next_booking": f"{nb.get('date','')} {nb.get('time','')}".strip() if nb else "",
            })
    print(f"  [艾莉卡过期] 有效期≤15天: {len(report.low_group_expiry)} 人")
    # 按剩余天数从少到多排序
    report.low_group_expiry.sort(key=lambda x: x.get("days_left", 999))

    # ---- 规则4: 会员里程碑（仅私教课会员）----
    # 收集今日私教学员名
    today_pt_trainees = set()
    for c in all_today_private:
        for n in parse_trainee_names(c.get("traineeNames", "")):
            today_pt_trainees.add(n)

    # 构建 学员→教练 查找表（多教练时取上课次数最多的）
    from collections import Counter as _Counter
    trainee_coach_count = {}  # name -> Counter of coach appearances
    for t in trainees:
        tn = t.get("traineeName", "")
        if not tn:
            continue
        coaches = (t.get("courseTrainers", "") or "").split("/")
        used = max(0, (t.get("buyCount", 0) or 0) - (t.get("remainCount", 0) or 0))
        if tn not in trainee_coach_count:
            trainee_coach_count[tn] = _Counter()
        for c in coaches:
            c = c.strip()
            if c:
                trainee_coach_count[tn][c] += used
    trainee_coach = {}
    for tn, counter in trainee_coach_count.items():
        if counter:
            trainee_coach[tn] = counter.most_common(1)[0][0]

    # 仅使用有私教记录的会员，用私教节数判断里程碑
    for name, pt_sessions in pt_used.items():
        if pt_sessions <= 0:
            continue
        member = member_lookup.get(name, {})
        if not member.get("has_valid_card"):
            continue
        phone = member.get("memberPhone", "")
        consultant = member.get("sellerName", "")
        if consultant == "肖湘蓉":
            consultant = "林潇"
        coach = trainee_coach.get(name, "")

        for ms, action in MILESTONES.items():
            if ms == 1:
                continue  # 第1节课后回访不需要提醒
            if pt_sessions == ms:
                # 精确命中里程碑
                if not any(x["name"] == name and x["milestone"] == ms
                          for x in report.milestones):
                    report.milestones.append({
                        "name": name, "phone": phone,
                        "sessions": pt_sessions,
                        "milestone": ms, "action": action,
                        "consultant": consultant,
                        "coach": coach,
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
                        "coach": coach,
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
    if not isinstance(courses, dict):
        print(f"  ⚠️ [BUG] courses 类型异常: {type(courses).__name__}，回退到 week_courses")
        source_courses = week_courses if isinstance(week_courses, dict) else {"group": [], "private": []}
    else:
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

    # ---- 规则7: 教练的会员列表（私教，不含体验，按最近约课教练归属）----
    _priv_dated = []
    for src in (courses, week_courses, month_courses, upcoming_courses):
        if isinstance(src, dict):
            _priv_dated.extend(src.get("private", []))
    report.coach_members = build_coach_member_list(trainees, _priv_dated, member_lookup)
    _cm_total = sum(len(v) for v in report.coach_members.values())
    print(f"\n  [教练会员列表] {len(report.coach_members)} 位教练，共 {_cm_total} 名私教会员")

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

    # 过滤掉明显老会员：已购5节以上非体验课 或 出勤超过10次
    # （这些成员虽然上了体验课，但显然是已有大量历史的老会员）
    filtered_monthly = []
    for m in monthly.values():
        details = pt_detail.get(m["name"], [])
        real_details = [d for d in details if "体验" not in (d.get("courseName") or "")]
        real_buy_total = sum(d["buyCount"] for d in real_details)
        checkins = m.get("total_checkins", 0)
        if real_buy_total >= 5 or checkins > 10:
            print(f"  [本月新会员] 过滤老会员: {m['name']} (正式购课{real_buy_total}节, 出勤{checkins}次)")
            continue
        filtered_monthly.append(m)

    report.monthly_new_members = sorted(filtered_monthly, key=lambda x: x["first_date"])
    converted = sum(1 for m in report.monthly_new_members if m.get("has_pt_course"))
    print(f"  [本月新会员] 总计 {len(report.monthly_new_members)} 人, "
          f"已转化 {converted} 人, 未转化 {len(report.monthly_new_members) - converted} 人")

# ============================================================
#  飞书推送
# ============================================================
def send_feishu(report, tomorrow_trials=None):
    """向所有配置的飞书 webhook 推送今日新会员 + 昨日体验课 + 明日体验课 + 课时不足摘要"""
    if not FEISHU_WEBHOOKS:
        return

    from datetime import date as _d, timedelta
    today = report.date
    yesterday = (_d.today() - timedelta(days=1)).isoformat()
    tomorrow = (_d.today() + timedelta(days=1)).isoformat()

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
        nb = m.get("next_booking", "")
        nb_str = f"  下次约课:{nb}" if nb else "  下次约课:无"
        low_lines.append(
            f"  {m['name']}  剩余{m['remaining']}节  {m.get('course','')}  "
            f"教练:{m.get('trainer','')}  会籍:{m.get('consultant','')}{nb_str}"
        )

    # ── 小班课权益点不足（剩余2-5元）──
    group_lines = []
    for m in report.low_group_points:
        nb = m.get("next_booking", "")
        nb_str = f"  下次约课:{nb}" if nb else "  下次约课:无"
        group_lines.append(
            f"  {m['name']}  剩余{m['remaining']}元  {m.get('card','')}  "
            f"会籍:{m.get('consultant','')}{nb_str}"
        )

    # ── 小班权益点卡有效期不足15天 ──
    expiry_lines = []
    for m in report.low_group_expiry:
        nb = m.get("next_booking", "")
        nb_str = f"  下次约课:{nb}" if nb else "  下次约课:无"
        expiry_lines.append(
            f"  {m['name']}  剩余{m.get('days_left',0)}天到期  {m.get('card','')}  "
            f"会籍:{m.get('consultant','')}{nb_str}"
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

    # ── 明日体验课（隔天推送）──
    tomorrow_lines = []
    if tomorrow_trials:
        for m in tomorrow_trials:
            tomorrow_lines.append(
                f"  【{m.get('type','')}】{m['name']}  {m.get('course','')}  "
                f"{m.get('time','')}  教练:{m.get('trainer','')}  "
                f"会籍:{m.get('consultant','')}"
            )

    if tomorrow_lines:
        parts.append(f"\n📅 明日体验课（{len(tomorrow_lines)}人）")
        parts.extend(tomorrow_lines)
    else:
        parts.append(f"\n📅 明日体验课：0人")

    if low_lines:
        parts.append(f"\n⚠️ 私教课时不足（{len(low_lines)}人）")
        parts.extend(low_lines)

    if group_lines:
        parts.append(f"\n⚠️ 小班课权益点不足（{len(group_lines)}人）")
        parts.extend(group_lines)

    if expiry_lines:
        parts.append(f"\n⏰ 小班权益点卡即将过期（{len(expiry_lines)}人）")
        parts.extend(expiry_lines)

    _feishu_send_text("\n".join(parts))


def _feishu_send_text(text):
    """向所有配置的飞书 webhook 发送一条纯文本消息"""
    payload_str = json.dumps({
        "msg_type": "text",
        "content": {"text": text}
    }, ensure_ascii=False)
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
        info += f' | 下次约课:{m.get("next_booking") or "无"}'
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

    # 小班课权益点不足并入"课时不足"区
    for m in report.low_group_points:
        info = f'小班权益点 剩余{m["remaining"]}元 | {m.get("card","")}'
        if m.get("consultant"):
            info += f' 会籍:{m["consultant"]}'
        info += f' | 下次约课:{m.get("next_booking") or "无"}'
        sections_data["low_sessions"].append({
            "id": f"lg_{m['name']}",
            "name": m["name"],
            "phone": m.get("phone", ""),
            "info": info,
            "label": f'剩{m["remaining"]}元',
            "coach": "",
            "consultant": m.get("consultant", ""),
            "course": m.get("card", ""),
        })

    # 小班权益点卡有效期不足并入"课时不足"区
    for m in report.low_group_expiry:
        info = f'小班权益点 {m.get("card","")}  {m.get("days_left",0)}天后到期'
        if m.get("consultant"):
            info += f' 会籍:{m["consultant"]}'
        info += f' | 下次约课:{m.get("next_booking") or "无"}'
        sections_data["low_sessions"].append({
            "id": f"lx_{m['name']}",
            "name": m["name"],
            "phone": m.get("phone", ""),
            "info": info,
            "label": f'{m.get("days_left",0)}天到期',
            "coach": "",
            "consultant": m.get("consultant", ""),
            "course": m.get("card", ""),
        })

    for m in report.milestones:
        info = f'第{m["sessions"]}节→第{m["milestone"]}节 ({m["action"]})'
        if m.get("coach"):
            info += f' 教练:{m["coach"]}'
        if m.get("consultant"):
            info += f' 会籍:{m["consultant"]}'
        sections_data["milestones"].append({
            "id": f"ms_{m['name']}_{m['milestone']}",
            "name": m["name"],
            "phone": m.get("phone", ""),
            "info": info,
            "label": m["action"],
            "coach": m.get("coach", ""),
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

    # 教练的会员列表：按教练分组，预渲染为可折叠区块（供 CSV 导出也放入 sections_data）
    sections_data["coach_members"] = []
    coach_members_html = ""
    _cm_total = sum(len(v) for v in report.coach_members.values())
    for _idx, coach in enumerate(sorted(report.coach_members.keys())):
        members = report.coach_members[coach]
        member_rows = ""
        for m in members:
            phone = f"  {m['phone']}" if m.get("phone") else ""
            consultant = f"  会籍:{m['consultant']}" if m.get("consultant") else ""
            last_cls = f"  最近上课:{m['last_class']}" if m.get("last_class") else ""
            member_rows += (
                f'<div class="r"><div class="top">'
                f'<span class="n">{m["name"]}</span>'
                f'<span class="i">剩余{m.get("remaining",0)}节{last_cls}{phone}{consultant}</span>'
                f'</div></div>'
            )
            sections_data["coach_members"].append({
                "id": f"cm_{coach}_{m['name']}",
                "name": m["name"],
                "phone": m.get("phone", ""),
                "info": f'教练:{coach} 剩余{m.get("remaining",0)}节{last_cls}',
                "label": f'剩{m.get("remaining",0)}节',
                "coach": coach,
                "consultant": m.get("consultant", ""),
                "course": "",
                "time": m.get("last_class", ""),
            })
        if not member_rows:
            member_rows = '<div style="padding:10px;color:#999;text-align:center">暂无会员</div>'
        _sec_id = f"cm_{_idx}"
        coach_members_html += f"""<div class="sec" id="{_sec_id}" style="margin-bottom:4px">
        <div class="sh" onclick="toggleSec('{_sec_id}')" style="font-size:13px"><span>{coach}（{len(members)}人）</span><span style="display:flex;gap:8px;align-items:center"><span class="arrow">&#9660;</span></span></div>
        <div class="rows" id="rows_{_sec_id}">{member_rows}</div>
        </div>"""
    if not coach_members_html:
        coach_members_html = '<div style="padding:20px;color:#999;text-align:center">暂无数据</div>'

    sections_json = json.dumps(sections_data, ensure_ascii=False)

    # 从磁盘加载跟进记录（解决 file:// 协议下 localStorage 不可靠的问题）
    embedded_followups = {}
    if FOLLOWUPS_FILE.exists():
        try:
            all_followups = json.loads(FOLLOWUPS_FILE.read_text(encoding="utf-8"))
            embedded_followups = all_followups.get(report_date, {})
        except Exception:
            pass
    embedded_followups_json = json.dumps(embedded_followups, ensure_ascii=False)

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
    <a href="#sec7"><span class="dot" style="background:#14b8a6"></span><span>教练会员</span></a>
  </nav>
  <div style="padding:12px 16px;border-top:1px solid #333">
    <div style="font-size:11px;color:#888;margin-bottom:4px">选择日期</div>
    <select id="datePicker" onchange="navToDate(this.value)" style="width:100%;padding:6px;background:#2a2a40;color:#ccc;border:1px solid #444;border-radius:4px;font-size:12px;outline:none">
    </select>
  </div>
  <div class="export-area">
    <button onclick="saveFollowupsToDisk()" title="下载跟进记录到本地磁盘，下次打开自动恢复" style="background:#f59e0b;color:#000">💾 保存跟进到磁盘</button>
    <button onclick="exportCSV()" title="导出CSV文件">导出 CSV</button>
    <button onclick="exportMonthlyNewCSV()" title="单独导出本月新会员" style="background:#10b981">导出本月新会员</button>
    <button class="sec-btn" onclick="exportJSON()" title="导出含跟进记录">导出 JSON</button>
    <span id="disk_save_hint" style="font-size:10px;color:#10b981;display:block;text-align:center;margin-top:6px"></span>
    <span style="font-size:10px;color:#777;display:block;text-align:center">跟进自动保存 · 亦可手动下载备份</span>
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
    <span onclick="scrollToSec('sec7')">教练会员 {_cm_total}人</span>
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

<div class="sec collapsed" id="sec7">
  <div class="sh" onclick="toggleSec('sec7')"><span>七、教练的会员列表（私教·按最近约课教练归属）</span><span style="display:flex;gap:8px;align-items:center"><span class="badge c4">{_cm_total}人</span><span class="arrow">&#9660;</span></span></div>
  <div class="rows" id="rows_sec7">
    {coach_members_html}
  </div>
</div>

<div class="footer">智能助理自动生成 · 跟进记录自动保存至浏览器本地存储</div>
</div>

<script>
const DATA = {sections_json};
const REPORT_DATE = '{report_date}';
const STORAGE_KEY = 'assistant_followup_' + REPORT_DATE;
const EMBEDDED_FOLLOWUPS = {embedded_followups_json};
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
    const fromLS = localStorage.getItem(STORAGE_KEY);
    if (fromLS) return JSON.parse(fromLS);
    // localStorage 为空时回退到磁盘嵌入数据（解决 file:// 协议下 localStorage 不可靠的问题）
    if (Object.keys(EMBEDDED_FOLLOWUPS).length > 0) return JSON.parse(JSON.stringify(EMBEDDED_FOLLOWUPS));
    return {{}};
  }} catch(e) {{ return {{}}; }}
}}

const SERVER_URL = 'http://127.0.0.1:{SERVER_PORT}';

function saveFollowups(data) {{
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // 自动同步到磁盘（通过本地 HTTP 服务器）
  autoSaveToDisk();
}}

// 自动保存跟进记录到磁盘
let _autoSaveTimer = null;
function autoSaveToDisk() {{
  if (_autoSaveTimer) clearTimeout(_autoSaveTimer);
  _autoSaveTimer = setTimeout(function() {{
    const merged = loadFollowups();
    // 合并嵌入式数据
    const all = JSON.parse(JSON.stringify(EMBEDDED_FOLLOWUPS));
    Object.keys(merged).forEach(function(k) {{ all[k] = merged[k]; }});
    fetch(SERVER_URL + '/save_followups', {{
      method: 'POST',
      headers: {{'Content-Type': 'application/json'}},
      body: JSON.stringify(all)
    }}).then(function(r) {{ return r.json(); }})
      .then(function(resp) {{
        if (resp && resp.ok) {{
          const hint = document.getElementById('disk_save_hint');
          if (hint) {{ hint.textContent = '✅ 已自动保存到磁盘'; hint.style.color = '#10b981';
            setTimeout(function() {{ hint.textContent = ''; }}, 2000); }}
        }}
      }})
      .catch(function() {{}}); // 服务器不可用时静默失败
  }}, 800); // 800ms 防抖
}}

// 手动保存跟进记录到磁盘（下载文件作为 fallback）
function saveFollowupsToDisk() {{
  const current = loadFollowups();
  const merged = JSON.parse(JSON.stringify(EMBEDDED_FOLLOWUPS));
  Object.keys(current).forEach(function(k) {{ merged[k] = current[k]; }});
  const blob = new Blob([JSON.stringify(merged, null, 2)], {{type:'application/json'}});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'followups.json';
  a.click();
  URL.revokeObjectURL(url);
  alert('已下载 followups.json！\\n请将文件保存到 data/followups.json，下次打开页面即可恢复跟进记录。');
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
    monthly_converted:'本月新会员·已转化', monthly_unconverted:'本月新会员·未转化',
    coach_members:'教练的会员列表'
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
const secIds = ['sec1','sec2','sec3','sec4','sec5','sec6','sec7'];
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


def _ensure_server_script():
    """写入微型 HTTP 服务器脚本，用于本地 serve 报告和保存跟进记录"""
    SERVER_SCRIPT.write_text('''#!/usr/bin/env python3
"""微型 HTTP 服务器 - serve 报告 + 自动保存跟进记录到磁盘"""
import http.server, json, os, sys
from pathlib import Path

PORT = 18765
PROJECT_DIR = Path(__file__).parent.parent
DATA_DIR = PROJECT_DIR / "data"
REPORT_DIR = DATA_DIR / "reports"
FOLLOWUPS_FILE = DATA_DIR / "followups.json"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_DIR), **kwargs)

    def do_POST(self):
        if self.path == "/save_followups":
            try:
                length = int(self.headers.get("Content-Length", 0))
                data = json.loads(self.rfile.read(length))
                FOLLOWUPS_FILE.parent.mkdir(parents=True, exist_ok=True)
                FOLLOWUPS_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"ok": True}).encode())
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"ok": False, "error": str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == "__main__":
    httpd = http.server.HTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Assistant server ready: http://127.0.0.1:{PORT}")
    sys.stdout.flush()
    httpd.serve_forever()
''', encoding="utf-8")


def _server_ready():
    """检查本地 HTTP 服务器是否在运行"""
    import urllib.request
    try:
        req = urllib.request.Request(f"http://127.0.0.1:{SERVER_PORT}/")
        urllib.request.urlopen(req, timeout=2)
        return True
    except Exception:
        return False


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
        "low_group_points": report.low_group_points,
        "low_group_expiry": report.low_group_expiry,
        "milestones": report.milestones,
        "coaches": {k: {"weekday": v["weekday"], "trainers": v["trainers"]}
                    for k, v in report.coaches.items()},
        "monthly_new_members": report.monthly_new_members,
        "coach_members": report.coach_members,
    }, ensure_ascii=False, indent=2), encoding="utf-8")

    import webbrowser
    from urllib.parse import quote
    # 优先通过本地 HTTP 服务器打开（支持自动保存跟进记录到磁盘）
    if _server_ready():
        rel = str(fp.relative_to(DATA_DIR.parent))
        # URL 编码中文路径，避免浏览器编码不一致导致 404
        rel_encoded = quote(rel, safe='/')
        url = f"http://127.0.0.1:{SERVER_PORT}/{rel_encoded}"
        webbrowser.open(url)
    else:
        webbrowser.open(f"file://{fp}")
    return fp


# ============================================================
#  单个会员诊断（--who 姓名）
# ============================================================
def inspect_member(name, show_browser=False):
    """把一个会员的底细全部打出来：会员卡、私教课包、私教课记录、程序算出的归属。
    用于核对"剩余节数"和"归属教练"到底是从哪条数据来的。"""
    print(f"===== 会员诊断: {name} =====\n")
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=not show_browser)
        storage_state = str(AUTH_FILE) if AUTH_FILE.exists() else None
        context = browser.new_context(storage_state=storage_state, no_viewport=True)
        context.set_default_timeout(60000)
        try:
            page = context.new_page()
            ensure_login(page)

            print("抓取数据中（约1-3分钟）...\n")
            courses, api_urls = fetch_courses(page)
            month_courses = fetch_month_courses(page)
            upcoming_courses = fetch_upcoming_courses(page, weeks=2)
            members = fetch_all_members(page)
            trainees = fetch_all_trainees(page)

            # ---- 1) 会员卡 ----
            print(f"\n---- 1) 会员卡（displayName == {name}）----")
            cards = [m for m in members if (m.get("displayName") or "") == name]
            print(f"共 {len(cards)} 张")
            member_ids = set()
            for m in cards:
                member_ids.add(m.get("memberId"))
                print(f"  memberId={m.get('memberId')} 卡={m.get('cardName')} "
                      f"状态={m.get('statusStr')}({m.get('status')}) unit={m.get('unit')} "
                      f"remain={m.get('remain')} buyCount={m.get('buyCount')} "
                      f"手机={m.get('memberPhone')} 会籍={m.get('sellerName')}")
            if len(member_ids) > 1:
                print(f"  ⚠️ 同名『{name}』对应 {len(member_ids)} 个不同 memberId: {member_ids}")
                print(f"     → 这会让不同的人被合并统计（剩余节数相加、教练混在一起）！")

            # ---- 2) 私教课包 ----
            print(f"\n---- 2) 私教课包（traineeName == {name}）----")
            tlist = [t for t in trainees if (t.get("traineeName") or "") == name]
            print(f"共 {len(tlist)} 条")
            if tlist:
                print("  [第一条的全部字段（看有没有能区分同名的ID）]")
                for k, v in tlist[0].items():
                    print(f"    {k} = {v}")
            cur_total = 0
            for t in tlist:
                cn = t.get("courseName") or ""
                rc = t.get("remainCount") or 0
                marks = []
                if "体验" in cn:
                    marks.append("体验课包·当前不计入")
                if "赠课" in cn or "赠送" in cn:
                    marks.append("赠课·当前【计入】")
                if "体验" not in cn:
                    cur_total += rc
                mk = ("  << " + " / ".join(marks)) if marks else ""
                print(f"  课包={cn} 教练={t.get('courseTrainers')} "
                      f"购={t.get('buyCount')} 剩={rc}{mk}")
            print(f"  → 当前口径合计剩余 = {cur_total} 节")

            # ---- 3) 私教课记录 ----
            print(f"\n---- 3) 私教课记录（学员含 {name}）----")
            priv = []
            for src in (courses, month_courses, upcoming_courses):
                if isinstance(src, dict):
                    priv.extend(src.get("private", []))
            rows = set()
            for c in priv:
                if name in parse_trainee_names(c.get("traineeNames", "")):
                    rows.add((c.get("date", ""), c.get("startTime", ""),
                              c.get("trainerName", ""), c.get("courseName", ""),
                              c.get("status")))
            today_iso = date.today().isoformat()
            for d, st, tr, cn, stt in sorted(rows):
                when = "已上/今天" if d and d <= today_iso else "未来约课"
                trial = "  (体验课·不参与归属)" if "体验" in (cn or "") else ""
                excl = "  (该教练在排除名单)" if _is_excluded_coach(tr) else ""
                print(f"  {d} {st} 教练={tr} 课程={cn} status={stt} [{when}]{trial}{excl}")
            print(f"  共 {len(rows)} 节")

            # ---- 4) 程序算出的归属 ----
            print(f"\n---- 4) 程序算出的归属 ----")
            ml = build_member_lookup(members)
            cm = build_coach_member_list(trainees, priv, ml)
            hit = False
            for coach, ms in cm.items():
                for m in ms:
                    if m["name"] == name:
                        print(f"  归属教练 = {coach} | 剩余 = {m['remaining']} 节 "
                              f"| 最近上课 = {m.get('last_class') or '无'}")
                        hit = True
            if not hit:
                print("  该会员未出现在教练会员列表中")
            print("\n===== 诊断结束 =====")
        except Exception as e:
            print(f"\n诊断出错: {e}")
            import traceback
            traceback.print_exc()
        finally:
            browser.close()


# ============================================================
#  主流程
# ============================================================
def run(show_browser=True, push_feishu=False):
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

            # 获取未来两周课程，用于查找会员下一节已约未上的课
            upcoming_courses = fetch_upcoming_courses(page, weeks=2)
            next_booking = build_next_booking_lookup(upcoming_courses)
            print(f"  [下次约课] 已建立 {len(next_booking)} 名会员的下次约课索引")

            # 2. 获取全部会员数据
            print("[2/5] 获取会员数据...")
            members = fetch_all_members(page)

            # 3. 获取全部私教数据
            print("[3/5] 获取私教数据...")
            trainees = fetch_all_trainees(page)

            # 4. 应用规则（传入整周课程、整月课程、下次约课）
            print("[4/5] 应用提醒规则...")
            report = apply_rules(courses, members, trainees, week_courses, month_courses,
                                 next_booking=next_booking, upcoming_courses=upcoming_courses)

            # 5. 生成报告
            print("[5/5] 生成报告...")
            filepath = save_and_open(report)

            # 6. 飞书推送（仅定时任务模式）
            if push_feishu and FEISHU_WEBHOOKS:
                print("\n[推送] 发送飞书通知...")
                # 提取明日体验课用于隔天推送（逻辑与今日新会员一致）
                member_lookup_fs = build_member_lookup(members)
                # 构建私教已用节数，用于判断私教新会员
                pt_used_fs = {}
                for t in trainees:
                    tn = t.get("traineeName", "")
                    if not tn:
                        continue
                    buy = t.get("buyCount", 0) or 0
                    remain = t.get("remainCount", 0) or 0
                    used = max(0, buy - remain)
                    pt_used_fs[tn] = pt_used_fs.get(tn, 0) + used
                tomorrow_trials = get_tomorrow_trials(upcoming_courses, member_lookup_fs, pt_used_fs)
                print(f"  明日体验课: {len(tomorrow_trials)} 人")
                send_feishu(report, tomorrow_trials=tomorrow_trials)

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
            print(f"  七、权益点卡即将过期(≤15天): {s['low_group_expiry']}人")
            print(f"\n报告已保存: {filepath}")

            return report

        except Exception as e:
            print(f"\n出错: {e}")
            import traceback
            traceback.print_exc()
            # 定时任务模式下推送错误到飞书，避免"推送悄悄失败"没人知道
            if push_feishu and FEISHU_WEBHOOKS:
                try:
                    _feishu_send_text(
                        f"❌ {today_str()} 每日提醒生成失败\n"
                        f"错误: {e}\n"
                        f"请查看 data/cron.log 或手动运行 assistant.py 排查"
                    )
                except Exception:
                    pass
        finally:
            browser.close()


if __name__ == "__main__":
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--cron", action="store_true", help="后台模式")
    p.add_argument("--no-browser", action="store_true", help="不显示浏览器")
    p.add_argument("--who", metavar="姓名",
                   help="诊断单个会员：打印其会员卡/私教课包/课程记录/归属结果")
    args = p.parse_args()

    if args.who:
        inspect_member(args.who, show_browser=False)
    elif args.cron:
        try:
            subprocess.run(["osascript", "-e",
                'display notification "正在生成每日提醒..." with title "智能助理"'],
                timeout=5)
        except Exception:
            pass
        report = run(show_browser=False, push_feishu=True)
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
        
