FROM python:3.11-slim

# MediaPipe / OpenCV 运行所需系统库
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv

COPY requirements.txt .
# 国内构建可传入 pip 镜像源：--build-arg PIP_INDEX=https://pypi.tuna.tsinghua.edu.cn/simple
ARG PIP_INDEX=https://pypi.org/simple
RUN pip install --no-cache-dir -i "$PIP_INDEX" -r requirements.txt

COPY app ./app

EXPOSE 8000
# 生产建议用多 worker；MediaPipe 单次推理较重，按 CPU 核数调整
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]
