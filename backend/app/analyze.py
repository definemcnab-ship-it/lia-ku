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

# [可测] 高低肩：>1cm 旗标，>2cm 显著。以双肩高差/肩宽近似（肩宽≈双肩峰距 ~38cm）
SHOULDER_DIFF_FLAG = 1.0 / 38.0     # ≈0.026
SHOULDER_DIFF_SIGNIF = 2.0 / 38.0   # ≈0.053

# [近似] 圆肩前肩角 FSA 正常≥52°；2D 用「髋→肩」相对竖直的前倾量近似
FSA_FWD_RATIO = 0.18                # 肩相对髋前移 / 躯干高
FSA_FWD_RATIO_SEVERE = 0.28

# [近似] 骨盆前倾：无 ASIS/PSIS，用肩-髋-膝躯干-大腿夹角偏离直立近似
APT_TRUNK_THIGH = 168.0
APT_TRUNK_THIGH_SEVERE = 158.0

# [近似] 腰椎前凸：无脊柱中段点，用骨盆相对「肩-踝」竖线的前推量近似（与前凸正相关）
LORDOSIS_HIP_FWD = 0.10            # 髋前移 / 身高近似
# [筛查] 扁平足：2D 全身照不可靠，仅在足明显内偏时给低置信度提示
FOOT_PRONATION_RATIO = 0.35


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
                "detail": "深颈屈肌激活不足，上斜方肌代偿过度",
            })
            penalty += 12 if cva < CVA_SEVERE else 7

    # [近似] 圆肩：肩相对髋向前方偏移（按躯干高归一化）
    if sh and hip:
        fwd = (sh.x - hip.x) * face / th
        if fwd > FSA_FWD_RATIO:
            issues.append({
                "key": "shoulder",
                "issue": "双肩含胸内扣趋势",
                "detail": "胸小肌紧张，中下斜方肌偏弱",
            })
            penalty += 9 if fwd > FSA_FWD_RATIO_SEVERE else 6

    # [近似] 骨盆前倾：躯干-大腿夹角偏离直立
    if sh and hip and knee:
        trunk_thigh = geo.angle(sh.x, sh.y, hip.x, hip.y, knee.x, knee.y)
        if trunk_thigh < APT_TRUNK_THIGH:
            issues.append({
                "key": "pelvis",
                "issue": "骨盆轻微前倾",
                "detail": "髂腰肌缩短，臀大肌激活不足",
            })
            penalty += 9 if trunk_thigh < APT_TRUNK_THIGH_SEVERE else 5

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

    # [可测] 膝超伸：髋-膝-踝矢状面反向偏离 >5°
    if hip and knee and ank:
        knee_ang = geo.angle(hip.x, hip.y, knee.x, knee.y, ank.x, ank.y)
        deficit = 180.0 - knee_ang
        # 膝在「髋-踝连线」后方（远离朝向）才算超伸，排除正常屈膝
        off = geo.signed_offset(knee.x, knee.y, hip.x, hip.y, ank.x, ank.y)
        knee_back = (off * face) < 0
        if knee_back and deficit > KNEE_HYPEREXT:
            issues.append({
                "key": "knee",
                "issue": "膝关节存在超伸趋势",
                "detail": "VMO 与腘绳肌离心控制不足",
            })
            penalty += 8 if deficit > KNEE_HYPEREXT_SEVERE else 5
    return penalty


def _analyze_front(kp: Keypoints, issues: list, seen: set):
    ls, rs = kp.lm(L_SHOULDER), kp.lm(R_SHOULDER)
    lh, rh = kp.lm(L_HIP), kp.lm(R_HIP)
    lk, rk = kp.lm(L_KNEE), kp.lm(R_KNEE)
    la, ra = kp.lm(L_ANKLE), kp.lm(R_ANKLE)
    lf, rf = kp.lm(L_FOOT), kp.lm(R_FOOT)
    sw = geo.shoulder_width(kp) or 1.0
    penalty = 0

    # [可测] 高低肩：双肩高差 / 肩宽，对齐 1cm 旗标 / 2cm 显著
    if ls and rs and "shoulder" not in seen:
        diff = abs(ls.y - rs.y) / sw
        if diff > SHOULDER_DIFF_FLAG:
            issues.append({
                "key": "shoulder",
                "issue": "双肩高低不对称",
                "detail": "肩带两侧肌力失衡，存在代偿性侧倾",
            })
            penalty += 6 if diff > SHOULDER_DIFF_SIGNIF else 4
            seen.add("shoulder")

    # [可测] 膝外翻(X 型)：额状面 髋-膝-踝 偏离，生理 5–7°，>7° 异常
    if lh and rh and lk and rk and la and ra and "knee" not in seen:
        ang_l = 180.0 - geo.angle(lh.x, lh.y, lk.x, lk.y, la.x, la.y)
        ang_r = 180.0 - geo.angle(rh.x, rh.y, rk.x, rk.y, ra.x, ra.y)
        valgus = (ang_l + ang_r) / 2
        # 膝间距明显小于踝间距 → 确认是内扣(X)而非外翻(O)
        knee_gap = abs(lk.x - rk.x)
        ankle_gap = abs(la.x - ra.x)
        x_shape = ankle_gap > 0 and knee_gap < ankle_gap
        if x_shape and valgus > KNEE_VALGUS:
            issues.append({
                "key": "knee",
                "issue": "膝关节内扣趋势",
                "detail": "臀中肌无力，足踝稳定性不足",
            })
            penalty += 7 if valgus > KNEE_VALGUS_SEVERE else 5
            seen.add("knee")

    # [筛查] 扁平足：2D 全身照不可诊断，仅在足明显外展/内偏时低置信度提示
    if la and ra and lf and rf and "foot" not in seen:
        # 足尖外展量：踝→足尖向外水平分量 / 踝间距，作为旋前粗略征象
        ankle_gap = abs(la.x - ra.x) or 1.0
        splay_l = (la.x - lf.x) / ankle_gap   # 左足尖偏外为正
        splay_r = (rf.x - ra.x) / ankle_gap
        if (splay_l + splay_r) / 2 > FOOT_PRONATION_RATIO:
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
    seen = set()
    penalty = 0

    # 侧面承担矢状面判断（头前引/圆肩/骨盆/腰椎/膝超伸），优先处理
    side = kps.get("side")
    if side and side.has_pose:
        penalty += _analyze_side(side, issues)
        seen.update(i["key"] for i in issues)

    # 正面承担额状面判断（高低肩/膝内扣/足）
    front = kps.get("front")
    if front and front.has_pose:
        penalty += _analyze_front(front, issues, seen)

    # 背面作正面的补充（同 key 不重复）
    back = kps.get("back")
    if back and back.has_pose:
        penalty += _analyze_front(back, issues, seen)

    # 同 key 去重，保留首个（侧面优先）
    uniq, used = [], set()
    for it in issues:
        if it["key"] in used:
            continue
        used.add(it["key"])
        uniq.append(it)

    score = max(40, min(100, 100 - penalty))
    return {"score": score, "issues": uniq[:5]}
