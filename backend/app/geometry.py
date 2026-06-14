"""几何计算辅助：基于关键点坐标推导角度与偏移。"""

import math
from typing import Optional

from .engine import Keypoints, Landmark


def _mid(a: Landmark, b: Landmark):
    return ((a.x + b.x) / 2, (a.y + b.y) / 2)


def angle(ax, ay, bx, by, cx, cy) -> float:
    """点 b 处的夹角（a-b-c），返回角度 0..180。"""
    v1 = (ax - bx, ay - by)
    v2 = (cx - bx, cy - by)
    dot = v1[0] * v2[0] + v1[1] * v2[1]
    n1 = math.hypot(*v1)
    n2 = math.hypot(*v2)
    if n1 == 0 or n2 == 0:
        return 180.0
    cos = max(-1.0, min(1.0, dot / (n1 * n2)))
    return math.degrees(math.acos(cos))


def torso_height(kp: Keypoints) -> float:
    """肩到髋的垂直距离（归一化），用于归一化其他偏移量。"""
    ls, rs = kp.lm(11), kp.lm(12)
    lh, rh = kp.lm(23), kp.lm(24)
    if not all([ls, rs, lh, rh]):
        return 0.0
    _, sy = _mid(ls, rs)
    _, hy = _mid(lh, rh)
    return abs(hy - sy)


def shoulder_width(kp: Keypoints) -> float:
    ls, rs = kp.lm(11), kp.lm(12)
    if not (ls and rs):
        return 0.0
    return math.hypot(ls.x - rs.x, ls.y - rs.y)
