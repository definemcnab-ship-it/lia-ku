"""人体关键点检测引擎（MediaPipe 实现）。

本模块是「识别能力」的唯一封装层。若将来要替换为百度 / 商汤等第三方 API，
只需保持 detect() 返回相同的 Keypoints 结构，其余业务代码无需改动。
"""

import threading
from dataclasses import dataclass, field
from typing import Optional

import cv2
import numpy as np
import mediapipe as mp

mp_pose = mp.solutions.pose
mp_face = mp.solutions.face_detection

# MediaPipe Pose 关键点索引
NOSE = 0
L_EYE, R_EYE = 2, 5
L_EAR, R_EAR = 7, 8
L_SHOULDER, R_SHOULDER = 11, 12
L_HIP, R_HIP = 23, 24
L_KNEE, R_KNEE = 25, 26
L_ANKLE, R_ANKLE = 27, 28
L_FOOT, R_FOOT = 31, 32


@dataclass
class Landmark:
    x: float          # 归一化 0..1（相对图宽）
    y: float          # 归一化 0..1（相对图高）
    z: float
    visibility: float


@dataclass
class Keypoints:
    has_pose: bool
    landmarks: list = field(default_factory=list)  # 33 个 Landmark（2D 归一化），无则空
    world: list = field(default_factory=list)      # 33 个 Landmark（3D 世界坐标，米，髋中心原点）
    face_count: int = 0
    brightness: float = 0.0   # 0..255 平均亮度
    blur: float = 0.0         # 拉普拉斯方差，越小越糊
    width: int = 0
    height: int = 0

    def lm(self, idx: int) -> Optional[Landmark]:
        if not self.landmarks or idx >= len(self.landmarks):
            return None
        return self.landmarks[idx]

    def wlm(self, idx: int) -> Optional[Landmark]:
        """3D 世界坐标关键点（米，髋中心原点；x 右、y 下、z 深度）。"""
        if not self.world or idx >= len(self.world):
            return None
        return self.world[idx]

    def visible(self, idx: int, thr: float = 0.5) -> bool:
        lm = self.lm(idx)
        return lm is not None and lm.visibility >= thr


def _decode(image_bytes: bytes) -> Optional[np.ndarray]:
    arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    return img


# ── 模型单例 ──
# MediaPipe 模型加载较慢；每次请求都重建会导致严重超时。
# 这里在进程内只加载一次并复用。注意：MediaPipe 图实例**不是线程安全**的，
# FastAPI 同步端点在线程池并发执行，必须用锁串行化推理。
# model_complexity=1 在精度与速度间平衡，2 核机器上单图推理 ~1-2s。
_pose = mp_pose.Pose(static_image_mode=True, model_complexity=1,
                     min_detection_confidence=0.5)
_face = mp_face.FaceDetection(model_selection=1, min_detection_confidence=0.6)
_infer_lock = threading.Lock()


def warmup():
    """启动时预热：用一张空白图跑一次推理，触发模型加载。"""
    blank = np.zeros((256, 256, 3), dtype=np.uint8)
    with _infer_lock:
        _pose.process(blank)
        _face.process(blank)


_MAX_SIDE = 1024  # 推理前将长边缩放到此尺寸，手机大图提速数倍且不损精度


def detect(image_bytes: bytes) -> Keypoints:
    """对一张图片做人体关键点 + 人脸 + 画质检测。"""
    img = _decode(image_bytes)
    if img is None:
        return Keypoints(has_pose=False)

    # 缩放大图（关键点为归一化坐标，缩放不影响后续几何计算）
    h0, w0 = img.shape[:2]
    scale = _MAX_SIDE / max(h0, w0)
    if scale < 1.0:
        img = cv2.resize(img, (int(w0 * scale), int(h0 * scale)),
                         interpolation=cv2.INTER_AREA)

    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    brightness = float(gray.mean())
    blur = float(cv2.Laplacian(gray, cv2.CV_64F).var())
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # 人脸数量（用于判断多人 / 正背面）+ 人体关键点。
    # MediaPipe 图实例非线程安全，推理段加锁串行化。
    with _infer_lock:
        fres = _face.process(rgb)
        pres = _pose.process(rgb)
    face_count = 0
    if fres.detections:
        face_count = len(fres.detections)

    # 人体关键点（2D 归一化 + 3D 世界坐标）
    landmarks = []
    world = []
    has_pose = False
    if pres.pose_landmarks:
        has_pose = True
        for p in pres.pose_landmarks.landmark:
            landmarks.append(Landmark(p.x, p.y, p.z, p.visibility))
    if pres.pose_world_landmarks:
        for p in pres.pose_world_landmarks.landmark:
            world.append(Landmark(p.x, p.y, p.z, p.visibility))

    return Keypoints(
        has_pose=has_pose,
        landmarks=landmarks,
        world=world,
        face_count=face_count,
        brightness=brightness,
        blur=blur,
        width=w,
        height=h,
    )
