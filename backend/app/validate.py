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
    """根据身体关键点推断角度：front / side / back。

    - 侧面：双肩水平方向几乎重叠 → 肩宽相对躯干很小。
    - 正/背面：用「左右肩的 x 坐标顺序」判定，不依赖人脸——
      MediaPipe 关键点按人体解剖学左右标注，面对镜头时本人左肩(11)
      位于画面右侧(x 更大)，背对时左右调换。脸部信息仅作辅助投票，
      因此口罩、低头、遮挡均不影响正反面判断。
    """
    sw = geo.shoulder_width(kp)
    th = geo.torso_height(kp)
    if th > 0 and sw / th < 0.45:
        return "side"

    ls, rs = kp.lm(L_SHOULDER), kp.lm(R_SHOULDER)
    if ls and rs and abs(ls.x - rs.x) > 0.02:
        # 身体投票：本人左肩在画面右侧 → 正面
        body_front = ls.x > rs.x
    else:
        body_front = None

    # 脸部辅助投票（有正脸且鼻子清晰 → 倾向正面）
    face_front = kp.face_count >= 1 and kp.visible(NOSE, 0.6)

    if body_front is None:
        # 身体信号不足时退回人脸
        return "front" if face_front else "back"
    # 身体信号为主；与人脸一致时更可信，不一致时仍信身体
    return "front" if body_front else "back"


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
