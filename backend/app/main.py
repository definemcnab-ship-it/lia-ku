"""斯俪 Slique 体态 AI 分析后端。

接口契约见 docs/体态AI后端接口规格.md：
  POST /posture/validate  单角度校验
  POST /posture/analyze   三角度综合分析
"""

import os

from fastapi import FastAPI, UploadFile, File, Form, Header, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from . import engine, validate as validator, analyze as analyzer, store

API_KEY = os.environ.get("POSTURE_API_KEY", "")  # 留空则不校验
MAX_BYTES = 10 * 1024 * 1024

app = FastAPI(title="Slique Posture API", version="1.0")


def _check_auth(authorization: str):
    if not API_KEY:
        return
    expected = "Bearer " + API_KEY
    if authorization != expected:
        raise HTTPException(status_code=401, detail="invalid api key")


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/posture/validate")
async def posture_validate(
    file: UploadFile = File(...),
    angle: str = Form(...),
    authorization: str = Header(default=""),
):
    _check_auth(authorization)
    if angle not in ("front", "side", "back"):
        raise HTTPException(status_code=400, detail="angle must be front/side/back")

    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="empty file")
    if len(data) > MAX_BYTES:
        raise HTTPException(status_code=413, detail="file too large")

    kp = engine.detect(data)
    result = validator.validate(kp, angle)
    if result["pass"]:
        result["fileId"] = store.put(kp)
        store.cleanup()
    return JSONResponse(result)


class AnalyzeBody(BaseModel):
    fileIds: dict  # {front, side, back}


@app.post("/posture/analyze")
def posture_analyze(body: AnalyzeBody, authorization: str = Header(default="")):
    _check_auth(authorization)
    kps = {}
    for angle in ("front", "side", "back"):
        fid = body.fileIds.get(angle)
        if not fid:
            raise HTTPException(status_code=400, detail=f"missing fileId for {angle}")
        kp = store.get(fid)
        if kp is None:
            raise HTTPException(status_code=400, detail=f"fileId expired for {angle}, please re-upload")
        kps[angle] = kp

    return JSONResponse(analyzer.analyze(kps))
