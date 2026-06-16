"""几何计算辅助：基于关键点坐标推导角度与偏移。

坐标系约定：MediaPipe 归一化坐标，x 向右、y 向下，范围 0..1。
"""

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


def elevation_deg(ax, ay, bx, by) -> float:
    """线段 a→b 相对水平线的「仰角」，0..90。

    用于近似临床的颅椎角(CVA)/前肩角(FSA)等「与水平线夹角」类测量：
    a 取下方参考点（如肩 / C7 近似），b 取上方点（如耳 / 肩峰）。
    仰角越大越竖直，越小越水平（越前引 / 越含胸）。
    """
    run = abs(bx - ax)
    rise = abs(ay - by)            # y 向下，用绝对竖直高差
    return math.degrees(math.atan2(rise, run))


def signed_offset(px, py, ax, ay, bx, by) -> float:
    """点 p 到直线 a→b 的带符号垂直偏移（叉积）。

    符号表示 p 在直线哪一侧，用于判断膝相对「髋-踝连线」前/后（超伸）
    或内/外（内扣/外翻）。数值未归一化，仅用于取符号与相对大小。
    """
    vx, vy = bx - ax, by - ay
    return vx * (py - ay) - vy * (px - ax)


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
