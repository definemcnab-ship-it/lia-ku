"""单角度照片校验：判断是否为合格的「单人全身 + 指定角度」照片。"""

from .engine import (
    Keypoints,
    NOSE, L_EAR, R_EAR, L_SHOULDER, R_SHOULDER,
    L_HIP, R_HIP, L_ANKLE, R_ANKLE,
)
from . import geometry as geo

# 画质阈值（可按实际样本调优）
MIN_BRIGHTNESS = 50      # 平均亮度下限
MAX_BRIGHTNESS = 245     # 过曝上限
MIN_BLUR = 60.0          # 拉普拉斯方差下限（越小越糊）


def _classify_angle(kp: Keypoints) -> str:
    """根据肩宽 / 人脸推断角度：front / side / back。"""
    sw = geo.shoulder_width(kp)
    th = geo.torso_height(kp)
    # 侧面：双肩在水平方向几乎重叠 → 肩宽相对躯干很小
    if th > 0 and sw / th < 0.45:
        return "side"
    # 正面 vs 背面：有正脸 → 正面；无脸但有躯干 → 背面
    if kp.face_count >= 1 and kp.visible(NOSE, 0.6):
        return "front"
    return "back"


def validate(kp: Keypoints, angle: str) -> dict:
    """返回 {pass, reason}。"""
    # 1. 画质
    if kp.brightness < MIN_BRIGHTNESS:
        return {"pass": False, "reason": "光线不足，请在明亮处重新拍摄"}
    if kp.brightness > MAX_BRIGHTNESS:
        return {"pass": False, "reason": "画面过曝，请避免强光直射后重拍"}
    if kp.blur < MIN_BLUR:
        return {"pass": False, "reason": "图像模糊，请保持稳定后重拍"}

    # 2. 是否检测到人体
    if not kp.has_pose:
        return {"pass": False, "reason": "未检测到人体，请确保全身入镜"}

    # 3. 多人检测（正/侧面靠人脸数；拼图常含多张脸）
    if kp.face_count >= 2:
        return {"pass": False, "reason": "画面中检测到多个人物，请单人拍摄"}

    # 4. 全身完整入镜（头部 + 双踝关键点需可见）
    head_ok = kp.visible(NOSE, 0.4) or kp.visible(L_EAR, 0.4) or kp.visible(R_EAR, 0.4)
    ankle_ok = kp.visible(L_ANKLE, 0.3) and kp.visible(R_ANKLE, 0.3)
    if not head_ok or not ankle_ok:
        return {"pass": False, "reason": "全身未完全入镜，请后退调整距离（头顶到脚踝）"}

    # 5. 角度匹配
    detected = _classify_angle(kp)
    label = {"front": "正面", "side": "侧面", "back": "背面"}
    if detected != angle:
        return {
            "pass": False,
            "reason": f"当前疑似{label.get(detected, '其他')}照，请按要求拍摄{label.get(angle, '')}",
        }

    return {"pass": True, "reason": ""}
