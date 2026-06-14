"""fileId → 关键点 的临时存储（带 TTL）。

validate 时把检测出的关键点缓存，analyze 时按 fileId 取回，
避免重复上传与重复推理。生产可替换为 Redis。
"""

import time
import uuid
import threading

_TTL = 1800  # 30 分钟
_lock = threading.Lock()
_store = {}  # fileId -> (timestamp, Keypoints)


def put(kp) -> str:
    file_id = "f_" + uuid.uuid4().hex[:16]
    with _lock:
        _store[file_id] = (time.time(), kp)
    return file_id


def get(file_id):
    with _lock:
        item = _store.get(file_id)
    if not item:
        return None
    ts, kp = item
    if time.time() - ts > _TTL:
        with _lock:
            _store.pop(file_id, None)
        return None
    return kp


def cleanup():
    now = time.time()
    with _lock:
        expired = [k for k, (ts, _) in _store.items() if now - ts > _TTL]
        for k in expired:
            _store.pop(k, None)
