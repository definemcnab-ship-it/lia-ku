"""综合体态分析：由三个角度的关键点推导问题与评分。

issues[].key 必须取自小程序约定的枚举：
neck / shoulder / pelvis / back / knee / foot
"""

from typing import Dict

from .engine import (
    Keypoints,
    NOSE, L_EAR, R_EAR, L_SHOULDER, R_SHOULDER,
    L_HIP, R_HIP, L_KNEE, R_KNEE, L_ANKLE, R_ANKLE,
)
from . import geometry as geo


def _pick_side_ear_shoulder(kp: Keypoints):
    """侧面照取可见度更高的一侧耳/肩/髋/膝/踝。"""
    use_left = kp.visible(L_SHOULDER, 0.3) and (kp.lm(L_SHOULDER).visibility >=
               (kp.lm(R_SHOULDER).visibility if kp.lm(R_SHOULDER) else 0))
    if use_left:
        return L_EAR, L_SHOULDER, L_HIP, L_KNEE, L_ANKLE
    return R_EAR, R_SHOULDER, R_HIP, R_KNEE, R_ANKLE


def _analyze_side(kp: Keypoints, issues: list):
    ear_i, sh_i, hip_i, knee_i, ank_i = _pick_side_ear_shoulder(kp)
    ear, sh = kp.lm(ear_i), kp.lm(sh_i)
    hip, knee, ank = kp.lm(hip_i), kp.lm(knee_i), kp.lm(ank_i)
    th = geo.torso_height(kp) or 1.0
    penalty = 0

    # 头前引：耳相对肩的水平前移，按躯干高归一化
    if ear and sh:
        fwd = abs(ear.x - sh.x) / th
        if fwd > 0.18:
            issues.append({
                "key": "neck",
                "issue": "颈线前移，头前引趋势",
                "detail": "深颈屈肌激活不足，上斜方肌代偿过度",
            })
            penalty += 10 if fwd > 0.28 else 6

    # 骨盆前倾：肩-髋-膝夹角偏离直立
    if sh and hip and knee:
        trunk_thigh = geo.angle(sh.x, sh.y, hip.x, hip.y, knee.x, knee.y)
        if trunk_thigh < 168:
            issues.append({
                "key": "pelvis",
                "issue": "骨盆轻微前倾",
                "detail": "髂腰肌缩短，臀大肌激活不足",
            })
            penalty += 9 if trunk_thigh < 158 else 5

    # 膝超伸：髋-膝-踝夹角过直（>183°视为反弓，用 180 附近判断 + 膝在连线后方）
    if hip and knee and ank:
        knee_ang = geo.angle(hip.x, hip.y, knee.x, knee.y, ank.x, ank.y)
        if knee_ang > 181:
            issues.append({
                "key": "knee",
                "issue": "膝关节存在超伸趋势",
                "detail": "VMO 与腘绳肌离心控制不足",
            })
            penalty += 7
    return penalty


def _analyze_front_back(kp: Keypoints, issues: list, seen_keys: set):
    ls, rs = kp.lm(L_SHOULDER), kp.lm(R_SHOULDER)
    lh, rh = kp.lm(L_HIP), kp.lm(R_HIP)
    lk, rk = kp.lm(L_KNEE), kp.lm(R_KNEE)
    la, ra = kp.lm(L_ANKLE), kp.lm(R_ANKLE)
    th = geo.torso_height(kp) or 1.0
    penalty = 0

    # 肩高不对称 → 归入 back（脊柱/肩带）
    if ls and rs and "back" not in seen_keys:
        diff = abs(ls.y - rs.y) / th
        if diff > 0.06:
            issues.append({
                "key": "back",
                "issue": "双肩高低不对称",
                "detail": "脊柱两侧肌力失衡，存在代偿性侧倾",
            })
            penalty += 6
            seen_keys.add("back")

    # 圆肩：肩相对髋的前/内扣，从正面用肩宽收窄近似（含胸时肩端内收）
    if ls and rs and lh and rh and "shoulder" not in seen_keys:
        sw = geo.shoulder_width(kp)
        hw = abs(lh.x - rh.x)
        if hw > 0 and sw / hw < 1.15:
            issues.append({
                "key": "shoulder",
                "issue": "双肩含胸内扣趋势",
                "detail": "胸小肌紧张，中下斜方肌偏弱",
            })
            penalty += 6
            seen_keys.add("shoulder")

    # 膝内扣（X 型）：膝中点相对髋-踝连线内移
    if lk and rk and lh and rh and la and ra and "knee" not in seen_keys:
        knee_gap = abs(lk.x - rk.x)
        ankle_gap = abs(la.x - ra.x)
        if ankle_gap > 0 and knee_gap / ankle_gap < 0.6:
            issues.append({
                "key": "knee",
                "issue": "膝关节内扣趋势",
                "detail": "臀中肌无力，足踝稳定性不足",
            })
            penalty += 6
            seen_keys.add("knee")
    return penalty


def analyze(kps: Dict[str, Keypoints]) -> dict:
    """kps: {'front':Keypoints, 'side':Keypoints, 'back':Keypoints}"""
    issues = []
    seen = set()
    penalty = 0

    side = kps.get("side")
    if side and side.has_pose:
        penalty += _analyze_side(side, issues)
        seen.update(i["key"] for i in issues)

    front = kps.get("front")
    if front and front.has_pose:
        penalty += _analyze_front_back(front, issues, seen)

    back = kps.get("back")
    if back and back.has_pose:
        penalty += _analyze_front_back(back, issues, seen)

    # 去重（同 key 只保留首个，按侧面优先已先加入）
    uniq = []
    used = set()
    for it in issues:
        if it["key"] in used:
            continue
        used.add(it["key"])
        uniq.append(it)

    score = max(40, min(100, 100 - penalty))
    return {"score": score, "issues": uniq[:4]}
