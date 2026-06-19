"""综合体态分析：由三个角度的关键点推导问题与评分。

阈值标定原则
────────────────────────────────────────────────────────────
本模块的判定阈值尽量对齐循证文献中的临床/科研标准，但必须说明：
临床标准多基于专用器械（PALM 触诊计、量角器、负重 X 线）或特定体表标志
（C7、耳屏、ASIS/PSIS）。MediaPipe 仅提供 2D 归一化关键点，无法复现全部
测量协议。因此下文区分两类：

  [可测]  几何对齐良好、可直接套用文献数值（头前引、膝超伸、膝外翻、高低肩）。
  [近似]  缺乏对应标志、用代偿量近似，阈值为保守取值并标注「参考」
          （骨盆前倾、腰椎前凸、圆肩）。
  [筛查]  2D 全身照本质上无法可靠判定，仅作低置信度提示（扁平足）。

文献来源（详见提交说明）：
  CVA       Raine & Twomey, Arch Phys Med Rehabil 1997;78(11):1215
  FSA(圆肩)  PMC9624361
  APT       Herrington, Manual Therapy 2011;16(6):646; Mazhar 2021
  腰椎前凸    Heliyon 2023 / PMC10432978（L1–S1 Cobb 40–60° 正常，>60° 过度）
  膝超伸     Norkin & White, Measurement of Joint Motion（生理 0–5°，>5° 超伸）
  Q角/外翻   Insall JBJS 1976; EFORT Open Rev 2021 PMC8246117（生理外翻 5–7°）
  高低肩     Akel, Eur Spine J 2008 PMC2270384（>1cm 旗标，>2cm 显著）
  扁平足     Cavanagh & Rodgers 1987; Redmond 2006；2D 全身照不可诊断

issues[].key 取自小程序约定枚举：neck / shoulder / pelvis / back / knee / foot
"""

from typing import Dict

from .engine import (
    Keypoints,
    NOSE, L_EAR, R_EAR, L_SHOULDER, R_SHOULDER,
    L_HIP, R_HIP, L_KNEE, R_KNEE, L_ANKLE, R_ANKLE,
    L_FOOT, R_FOOT,
)
from . import geometry as geo

# ── 文献阈值常量 ──────────────────────────────────────────────
# [可测] 头前引：颅椎角 CVA，正常≥52°，<50° 前引，<48° 中重度（角度越小越前引）
#        2D 用「肩→耳」仰角近似（肩较 C7 更靠前，会略高估角度，偏保守）
CVA_FHP = 50.0
CVA_SEVERE = 48.0

# [可测] 膝超伸：生理 0–5°，>5° 超伸，>15° 重度（髋-膝-踝在矢状面的反向偏离）
KNEE_HYPEREXT = 5.0
KNEE_HYPEREXT_SEVERE = 15.0

# [可测] 膝外翻(X)：生理外翻 5–7°，>7° 异常（额状面髋-膝-踝偏离）
KNEE_VALGUS = 7.0
KNEE_VALGUS_SEVERE = 12.0

# [近似] 膝内翻(O型腿)：膝间距 / 踝间距 >1.25 趋势，>1.45 明显
KNEE_VARUS_RATIO = 1.25
KNEE_VARUS_SEVERE = 1.45

# [近似] 溜肩：耳→肩连线与水平线夹角 >55° 趋势（正常约 35–50°）
SLOPE_SHOULDER_FLAG = 55.0
SLOPE_SHOULDER_SEVERE = 65.0

# [近似] 骨盆侧倾：髋高差 / 肩宽
PELVIS_LATERAL_FLAG = 1.0 / 38.0
PELVIS_LATERAL_SIGNIF = 2.0 / 38.0

# [可测] 高低肩：>1cm 旗标，>2cm 显著。以双肩高差/肩宽近似（肩宽≈双肩峰距 ~38cm）
SHOULDER_DIFF_FLAG = 1.0 / 38.0     # ≈0.026
SHOULDER_DIFF_SIGNIF = 2.0 / 38.0   # ≈0.053

# [近似] 圆肩前肩角 FSA 正常≥52°；2D 用「髋→肩」相对竖直的前倾量近似
FSA_FWD_RATIO = 0.11                # 肩相对髋前移 / 躯干高（收紧：肉眼可见圆肩约 0.10-0.12）
FSA_FWD_RATIO_SEVERE = 0.20

# [近似] 骨盆前倾：躯干-大腿夹角偏小
APT_TRUNK_THIGH = 168.0
APT_TRUNK_THIGH_SEVERE = 158.0
# [近似] 骨盆后倾：躯干-大腿夹角偏大（臀部后移，腰椎变平）
APT_POSTERIOR = 178.0

# [近似] 腰椎前凸：无脊柱中段点，用骨盆相对「肩-踝」竖线的前推量近似（与前凸正相关）
LORDOSIS_HIP_FWD = 0.10            # 髋前移 / 身高近似
# [筛查] 扁平足：2D 全身照不可靠，仅在足明显内偏时给低置信度提示
FOOT_PRONATION_RATIO = 0.35


# ── 3D 矢状面阈值（基于世界坐标，米；首版为保守取值，按 _debug 实测标定）──
W_CVA_FHP = 60.0          # 肩→耳矢状仰角，<60° 头前引（世界坐标比 2D 更陡）
W_CVA_SEVERE = 52.0
W_SH_FWD = 0.06           # 肩相对髋向前 / 躯干高，>0.06 含胸圆肩
W_SH_FWD_SEVERE = 0.13
W_APT_ANT = 168.0         # 躯干-大腿矢状夹角，<168° 骨盆前倾
W_APT_ANT_SEVERE = 158.0
W_APT_POST = 177.0        # >177° 骨盆后倾趋势（仅用于 _reviews 低置信提示）
W_APT_POST_REVIEW = 176.0 # 躯干-大腿夹角≥176°（近乎成直线）→ 骨盆或有后倾，建议人工复核
W_KNEE_HYPEREXT = 1.5     # 髋-膝-踝矢状偏离 180° 的反向角，>1.5° 超伸（按侧面实测标定）
W_KNEE_HYPEREXT_SEVERE = 10.0
W_HIP_SWAY = 0.08         # 髋相对「肩-踝连线」向前偏移 / 躯干高，>0.08 骨盆前移（Swayback）


def _sagittal_metrics(kp: Keypoints) -> dict:
    """用 3D 世界坐标在矢状面重建头前引/圆肩/骨盆/膝超伸的几何量。

    世界坐标为相机系（x 右、y 下、z 深度，米，髋中心原点）。前后(腹背)信息
    在 z 轴上，正面/背面照也能恢复——这是 2D 平面照拿不到的关键维度。
    返回 None 表示世界坐标不全。
    """
    nose = kp.wlm(NOSE)
    lsh, rsh = kp.wlm(L_SHOULDER), kp.wlm(R_SHOULDER)
    lear, rear = kp.wlm(L_EAR), kp.wlm(R_EAR)
    lhip, rhip = kp.wlm(L_HIP), kp.wlm(R_HIP)
    lkn, rkn = kp.wlm(L_KNEE), kp.wlm(R_KNEE)
    lank, rank = kp.wlm(L_ANKLE), kp.wlm(R_ANKLE)
    if not all([nose, lsh, rsh, lhip, rhip, lkn, rkn, lank, rank]):
        return None

    sh = geo.wmid(lsh, rsh)
    hip = geo.wmid(lhip, rhip)
    kn = geo.wmid(lkn, rkn)
    ank = geo.wmid(lank, rank)
    ear = geo.wmid(lear, rear) if (lear and rear) else (nose.x, nose.y, nose.z)

    # 前后朝向符号：鼻应比肩更靠前（腹侧）。sh.z - nose.z >= 0 → 腹侧 = z 更小
    a = 1.0 if (sh[2] - nose.z) >= 0 else -1.0

    def uv(p):
        return geo.sag_uv(p, a)

    su, sv = uv(sh)
    hu, hv = uv(hip)
    ku, kv = uv(kn)
    au, av = uv(ank)
    eu, ev = uv(ear)
    torso = abs(hv - sv) or 1.0

    cva = geo.elevation_deg(su, sv, eu, ev)          # 越小越头前引
    sh_fwd = (su - hu) / torso                        # 肩相对髋向前 / 躯干高
    trunk_thigh = geo.angle(su, sv, hu, hv, ku, kv)   # 躯干-大腿矢状夹角
    knee_ang = geo.angle(hu, hv, ku, kv, au, av)      # 髋-膝-踝
    # 膝相对髋-踝连线的前后：腹侧为正。超伸时膝向背侧(后) → 偏移为负
    knee_off = geo.signed_offset(ku, kv, hu, hv, au, av)
    knee_post = knee_off < 0
    knee_hyperext = max(0.0, 180.0 - knee_ang) if knee_post else 0.0
    # 骨盆前移（Swayback）：髋相对「肩-踝连线」的矢状前移量 / 躯干高
    hip_sway_off = geo.signed_offset(hu, hv, su, sv, au, av)
    hip_sway = hip_sway_off / (torso * torso) if torso > 0 else 0.0   # 叉积量纲≈长度²

    return {
        "cva": round(cva, 1),
        "sh_fwd": round(sh_fwd, 3),
        "trunk_thigh": round(trunk_thigh, 1),
        "knee_ang": round(knee_ang, 1),
        "knee_post": knee_post,
        "knee_hyperext": round(knee_hyperext, 1),
        "hip_sway": round(hip_sway, 3),
        "anterior_sign": a,
    }


def _analyze_sagittal_3d(m: dict, issues: list, seen: set) -> int:
    """基于 3D 矢状面几何量补充矢状面问题（仅填补 2D 未命中的 key）。"""
    penalty = 0
    if "neck" not in seen and m["cva"] < W_CVA_FHP:
        cva = m["cva"]
        issues.append({
            "key": "neck",
            "issue": "颈线前移，头前引趋势",
            "detail": f"CVA {cva:.0f}°（正常≥52°）；深颈屈肌激活不足，上斜方肌代偿过度",
            "measure": f"CVA {cva:.0f}°",
        })
        penalty += 12 if cva < W_CVA_SEVERE else 7
        seen.add("neck")

    if "shoulder" not in seen and m["sh_fwd"] > W_SH_FWD:
        pct = round(m["sh_fwd"] * 100, 1)
        issues.append({
            "key": "shoulder",
            "issue": "双肩含胸内扣趋势",
            "detail": f"肩相对髋前移 {pct}%躯干高（参考值<11%）；胸小肌紧张，中下斜方肌偏弱",
            "measure": f"前移 {pct}%",
        })
        penalty += 9 if m["sh_fwd"] > W_SH_FWD_SEVERE else 6
        seen.add("shoulder")

    # 仅骨盆「前倾」可置信判定（夹角明显偏小）；「后倾」因夹角上限 180° 且
    # 混入髋屈曲，无法可靠确诊，转入 _reviews 做「建议人工复核」低置信提示。
    if "pelvis" not in seen and m["trunk_thigh"] < W_APT_ANT:
        tt = m["trunk_thigh"]
        issues.append({
            "key": "pelvis",
            "issue": "骨盆轻微前倾",
            "detail": f"躯干-大腿夹角 {tt:.0f}°（参考≥168°）；髂腰肌缩短，臀大肌激活不足",
            "measure": f"躯干-腿 {tt:.0f}°",
        })
        penalty += 9 if tt < W_APT_ANT_SEVERE else 5
        seen.add("pelvis")

    # 骨盆前移（Swayback）：髋在矢状面相对「肩-踝连线」明显前推
    # 与骨盆前倾不同：前倾 = 骨盆绕股骨头旋转；前移 = 整个骨盆向前平移
    if "pelvis" not in seen and m.get("hip_sway", 0) > W_HIP_SWAY:
        issues.append({
            "key": "pelvis",
            "issue": "骨盆前移（重心前推）",
            "detail": "臀大肌离心控制不足，髋屈肌与腘绳肌协同失衡",
        })
        penalty += 7
        seen.add("pelvis")

    if "knee" not in seen and m["knee_post"] and m["knee_hyperext"] > W_KNEE_HYPEREXT:
        he = m["knee_hyperext"]
        issues.append({
            "key": "knee",
            "issue": "膝关节存在超伸趋势",
            "detail": f"膝超伸约 {he:.0f}°（正常0–5°）；VMO 与腘绳肌离心控制不足",
            "measure": f"超伸 {he:.0f}°",
        })
        penalty += 8 if he > W_KNEE_HYPEREXT_SEVERE else 5
        seen.add("knee")
    return penalty


def _reviews(m: dict, issue_keys: set) -> list:
    """低置信「建议人工复核」提示：不计入评分，不与确诊项混淆。

    覆盖两类 2D/姿态关键点本质上测不准的项：
      骨盆后倾——躯干-大腿夹角混入髋屈曲、且上限 180°，无法确诊；
      肋廓外翻——姿态关键点无肋廓标志点，完全无法测量，仅在常伴随的
                上/下交叉综合征姿态征象（圆肩 / 骨盆前倾）出现时提示复核。
    """
    reviews = []
    if not m:
        return reviews
    if "pelvis" not in issue_keys and m["trunk_thigh"] >= W_APT_POST_REVIEW:
        reviews.append({
            "key": "pelvis",
            "issue": "骨盆中立偏后（建议人工复核）",
            "detail": "躯干-大腿近乎成直线，或存在骨盆后倾；2D 无法定位 ASIS/PSIS，建议专业评估确认",
        })
    if m["sh_fwd"] > W_SH_FWD or m["trunk_thigh"] < W_APT_ANT:
        reviews.append({
            "key": "rib",
            "issue": "肋廓外翻倾向（建议人工复核）",
            "detail": "常伴随圆肩 / 骨盆前倾出现；2D 照片无肋廓标志点，无法自动判定，建议专业评估确认",
        })
    return reviews


def _facing_sign(kp: Keypoints) -> float:
    """侧面照朝向：返回 +1（面朝 +x）或 -1，用于判断「前方」。"""
    ear = kp.lm(L_EAR) or kp.lm(R_EAR)
    sh = kp.lm(L_SHOULDER) or kp.lm(R_SHOULDER)
    nose = kp.lm(NOSE)
    ref = nose or ear
    if ref and sh:
        return 1.0 if ref.x >= sh.x else -1.0
    return 1.0


def _pick_side(kp: Keypoints):
    """侧面照取可见度更高的一侧耳/肩/髋/膝/踝/足。"""
    rs = kp.lm(R_SHOULDER)
    use_left = kp.visible(L_SHOULDER, 0.3) and (
        kp.lm(L_SHOULDER).visibility >= (rs.visibility if rs else 0))
    if use_left:
        return L_EAR, L_SHOULDER, L_HIP, L_KNEE, L_ANKLE
    return R_EAR, R_SHOULDER, R_HIP, R_KNEE, R_ANKLE


def _analyze_side(kp: Keypoints, issues: list):
    ear_i, sh_i, hip_i, knee_i, ank_i = _pick_side(kp)
    ear, sh = kp.lm(ear_i), kp.lm(sh_i)
    hip, knee, ank = kp.lm(hip_i), kp.lm(knee_i), kp.lm(ank_i)
    th = geo.torso_height(kp) or 1.0
    face = _facing_sign(kp)
    penalty = 0

    # [可测] 头前引：肩→耳仰角近似 CVA（越小越前引）
    if ear and sh:
        cva = geo.elevation_deg(sh.x, sh.y, ear.x, ear.y)
        if cva < CVA_FHP:
            issues.append({
                "key": "neck",
                "issue": "颈线前移，头前引趋势",
                "detail": f"CVA {cva:.0f}°（正常≥52°）；深颈屈肌激活不足，上斜方肌代偿过度",
                "measure": f"CVA {cva:.0f}°",
            })
            penalty += 12 if cva < CVA_SEVERE else 7

    # [近似] 圆肩：肩相对髋向前方偏移（按躯干高归一化）
    if sh and hip:
        fwd = (sh.x - hip.x) * face / th
        if fwd > FSA_FWD_RATIO:
            pct = round(fwd * 100, 1)
            issues.append({
                "key": "shoulder",
                "issue": "双肩含胸内扣趋势",
                "detail": f"肩相对髋前移 {pct}%躯干高（参考值<11%）；胸小肌紧张，中下斜方肌偏弱",
                "measure": f"前移 {pct}%",
            })
            penalty += 9 if fwd > FSA_FWD_RATIO_SEVERE else 6

    # [近似] 骨盆前倾 / 后倾：躯干-大腿夹角
    if sh and hip and knee:
        trunk_thigh = geo.angle(sh.x, sh.y, hip.x, hip.y, knee.x, knee.y)
        if trunk_thigh < APT_TRUNK_THIGH:
            issues.append({
                "key": "pelvis",
                "issue": "骨盆轻微前倾",
                "detail": f"躯干-大腿夹角 {trunk_thigh:.0f}°（参考≥168°）；髂腰肌缩短，臀大肌激活不足",
                "measure": f"躯干-腿 {trunk_thigh:.0f}°",
            })
            penalty += 9 if trunk_thigh < APT_TRUNK_THIGH_SEVERE else 5
        elif trunk_thigh > APT_POSTERIOR:
            issues.append({
                "key": "pelvis",
                "issue": "骨盆后倾趋势",
                "detail": "臀肌过度紧张，腰椎曲度减小，核心稳定不足",
            })
            penalty += 6

    # [近似] 腰椎过度前凸：骨盆相对「肩-踝」竖线前推（参考，需专业评估确认）
    if sh and hip and ank:
        # 髋点到 肩-踝 连线的带符号偏移，取「向前」为正
        off = geo.signed_offset(hip.x, hip.y, sh.x, sh.y, ank.x, ank.y)
        hip_fwd = (off * face) / (th * th)   # 叉积量纲≈长度²，按躯干高²归一
        if hip_fwd > LORDOSIS_HIP_FWD:
            issues.append({
                "key": "back",
                "issue": "腰椎前凸偏大（参考）",
                "detail": "竖脊肌过度紧张，腹深层与臀肌稳定不足",
            })
            penalty += 5

    # [可测] 膝超伸：髋-膝-踝夹角 >180° 即反弓，用膝点偏向「背侧」确认
    if hip and knee and ank:
        knee_ang = geo.angle(hip.x, hip.y, knee.x, knee.y, ank.x, ank.y)
        off = geo.signed_offset(knee.x, knee.y, hip.x, hip.y, ank.x, ank.y)
        knee_back = (off * face) > 0
        overext_deg = knee_ang - 175.0
        if knee_back and overext_deg > 0:
            issues.append({
                "key": "knee",
                "issue": "膝关节存在超伸趋势",
                "detail": f"膝超伸约 {overext_deg:.0f}°（正常0–5°）；VMO 与腘绳肌离心控制不足",
                "measure": f"超伸 {overext_deg:.0f}°",
            })
            penalty += 8 if overext_deg > KNEE_HYPEREXT_SEVERE else 5
    return penalty


def _analyze_front(kp: Keypoints, issues: list, seen: set):
    ls, rs = kp.lm(L_SHOULDER), kp.lm(R_SHOULDER)
    lh, rh = kp.lm(L_HIP), kp.lm(R_HIP)
    lk, rk = kp.lm(L_KNEE), kp.lm(R_KNEE)
    la, ra = kp.lm(L_ANKLE), kp.lm(R_ANKLE)
    lf, rf = kp.lm(L_FOOT), kp.lm(R_FOOT)
    lear, rear = kp.lm(L_EAR), kp.lm(R_EAR)
    sw = geo.shoulder_width(kp) or 1.0
    penalty = 0

    # [可测] 高低肩：双肩高差 / 肩宽，对齐 1cm 旗标 / 2cm 显著
    if ls and rs and "shoulder" not in seen:
        diff = abs(ls.y - rs.y) / sw
        if diff > SHOULDER_DIFF_FLAG:
            cm_approx = round(diff * 38, 1)
            issues.append({
                "key": "shoulder",
                "issue": "双肩高低不对称",
                "detail": f"肩高差约 {cm_approx}cm（旗标>1cm，显著>2cm）；肩带两侧肌力失衡，存在代偿性侧倾",
                "measure": f"高差 {cm_approx}cm",
            })
            penalty += 6 if diff > SHOULDER_DIFF_SIGNIF else 4
            seen.add("shoulder")

    # [近似] 溜肩：耳→肩连线与水平线夹角过大（肩斜度偏陡）
    if ls and rs and lear and rear and "slope_shoulder" not in seen:
        slope_l = geo.elevation_deg(lear.x, lear.y, ls.x, ls.y)
        slope_r = geo.elevation_deg(rear.x, rear.y, rs.x, rs.y)
        slope_avg = (slope_l + slope_r) / 2
        if slope_avg > SLOPE_SHOULDER_FLAG:
            issues.append({
                "key": "shoulder",
                "issue": "肩斜度偏大（溜肩趋势）",
                "detail": f"耳→肩斜度 {slope_avg:.0f}°（参考值<55°）；斜方肌上束过度放松，肩带下沉",
                "measure": f"斜度 {slope_avg:.0f}°",
            })
            penalty += 5 if slope_avg > SLOPE_SHOULDER_SEVERE else 3
            seen.add("slope_shoulder")

    # [可测] 膝外翻(X 型)与膝内翻(O 型)：额状面 髋-膝-踝
    if lh and rh and lk and rk and la and ra and "knee" not in seen:
        ang_l = 180.0 - geo.angle(lh.x, lh.y, lk.x, lk.y, la.x, la.y)
        ang_r = 180.0 - geo.angle(rh.x, rh.y, rk.x, rk.y, ra.x, ra.y)
        valgus = (ang_l + ang_r) / 2
        knee_gap = abs(lk.x - rk.x)
        ankle_gap = abs(la.x - ra.x) or 0.001
        x_shape = knee_gap < ankle_gap
        o_shape = knee_gap > ankle_gap * KNEE_VARUS_RATIO

        if x_shape and valgus > KNEE_VALGUS:
            issues.append({
                "key": "knee",
                "issue": "膝关节内扣趋势（X 型腿）",
                "detail": f"膝外翻角 {valgus:.0f}°（正常5–7°）；臀中肌无力，足踝稳定性不足",
                "measure": f"外翻 {valgus:.0f}°",
            })
            penalty += 7 if valgus > KNEE_VALGUS_SEVERE else 5
            seen.add("knee")
        elif o_shape and "knee" not in seen:
            ratio = round(knee_gap / ankle_gap, 2)
            issues.append({
                "key": "knee",
                "issue": "膝关节外张趋势（O 型腿）",
                "detail": f"膝/踝间距比 {ratio}（正常<1.25）；髋外旋肌紧张，内收肌与VMO力量不足",
                "measure": f"膝/踝 {ratio}",
            })
            penalty += 6 if knee_gap > ankle_gap * KNEE_VARUS_SEVERE else 4
            seen.add("knee")

    # [近似] 骨盆侧倾：髋高差 / 肩宽
    if lh and rh and "pelvis_lateral" not in seen:
        hip_diff = abs(lh.y - rh.y) / sw
        if hip_diff > PELVIS_LATERAL_FLAG:
            cm_approx = round(hip_diff * 38, 1)
            issues.append({
                "key": "pelvis",
                "issue": "骨盆侧倾不对称",
                "detail": f"髋高差约 {cm_approx}cm（旗标>1cm）；腰方肌与臀中肌两侧力量失衡",
                "measure": f"髋高差 {cm_approx}cm",
            })
            penalty += 5 if hip_diff > PELVIS_LATERAL_SIGNIF else 3
            seen.add("pelvis_lateral")

    # [筛查] 扁平足：2D 全身照不可诊断，仅在足明显外展时低置信度提示
    if la and ra and lf and rf and "foot" not in seen:
        ankle_gap = abs(la.x - ra.x) or 1.0
        splay_l = (la.x - lf.x) / ankle_gap
        splay_r = (rf.x - ra.x) / ankle_gap
        splay_avg = (splay_l + splay_r) / 2
        if splay_avg > FOOT_PRONATION_RATIO:
            issues.append({
                "key": "foot",
                "issue": "疑似足弓塌陷（仅初筛）",
                "detail": "足底内在肌与胫骨后肌偏弱；准确判定需专业足部检测",
            })
            penalty += 3
            seen.add("foot")
    return penalty


def analyze(kps: Dict[str, Keypoints]) -> dict:
    """kps: {'front':Keypoints, 'side':Keypoints, 'back':Keypoints}"""
    issues = []
    penalty = 0

    front = kps.get("front")
    back = kps.get("back")

    # 1) 3D 矢状面（头前引/圆肩/骨盆/膝超伸）：优先用侧面照。
    #    侧面照是矢状面体态的正确数据源；正面照前后深度 z 为模型估计值，
    #    常出现假象（如膝角被估成大幅弯曲），故仅在缺侧面时退用正面/背面。
    debug = {}
    sag_metrics, sag_view = None, None
    for tag in ("side", "front", "back"):
        kp = kps.get(tag)
        if kp and kp.has_pose:
            m = _sagittal_metrics(kp)
            if m:
                debug[tag] = m
                if sag_metrics is None:
                    sag_metrics, sag_view = m, tag
    if sag_metrics:
        penalty += _analyze_sagittal_3d(sag_metrics, issues, set())

    # 2) 额状面（高低肩/膝内扣/足）：正面优先、背面补充。
    #    用独立去重集，与矢状面互不遮挡——圆肩内扣(矢状)与高低肩(额状)
    #    虽同属「shoulder」，是两类不同问题，应同时呈现。
    front_seen = set()
    if front and front.has_pose:
        penalty += _analyze_front(front, issues, front_seen)
    if back and back.has_pose:
        penalty += _analyze_front(back, issues, front_seen)

    # 按「问题描述」去重：正/背面同一发现合并，不同发现保留
    uniq, used = [], set()
    for it in issues:
        if it["issue"] in used:
            continue
        used.add(it["issue"])
        uniq.append(it)

    # 低置信「建议人工复核」提示（骨盆后倾 / 肋廓外翻）：不计入评分
    reviews = _reviews(sag_metrics, {it["key"] for it in uniq})

    score = max(40, min(100, 100 - penalty))
    # _debug：回传各视角实测矢状面几何量，用于按真实样本标定阈值（前端忽略）
    return {"score": score, "issues": uniq[:5], "reviews": reviews, "_debug": {
        "sag_view": sag_view,
        "metrics": debug,
    }}
