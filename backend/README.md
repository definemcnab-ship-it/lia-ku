# 斯俪 Slique · 体态 AI 分析后端

基于 **FastAPI + MediaPipe** 的体态检测服务，实现小程序所需的两个接口
（契约见 `../docs/体态AI后端接口规格.md`）：

- `POST /posture/validate` — 单角度照片校验（单人 / 全身 / 角度 / 画质）
- `POST /posture/analyze` — 三角度综合分析（评分 + 体态问题）

识别引擎封装在 `app/engine.py`，可整体替换为百度/商汤等第三方 API 而不动业务层。

---

## 一、本地运行

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt

# 可选：设置鉴权密钥（不设则不校验）
export POSTURE_API_KEY=your-secret-key

uvicorn app.main:app --host 0.0.0.0 --port 8000
```

健康检查：`curl http://localhost:8000/health` → `{"ok":true}`

测试校验接口：
```bash
curl -X POST http://localhost:8000/posture/validate \
  -H "Authorization: Bearer your-secret-key" \
  -F "angle=front" -F "file=@/path/to/front.jpg"
```

---

## 二、Docker 部署

```bash
cd backend
docker build -t slique-posture .
docker run -d -p 8000:8000 -e POSTURE_API_KEY=your-secret-key slique-posture
```

部署到任意云服务器后，**必须配置 HTTPS**（微信小程序只允许 https）。
可用 Nginx / Caddy 反代加证书，例如 Caddy 一行搞定：

```
api.your-domain.com {
    reverse_proxy localhost:8000
}
```

---

## 三、与小程序对接（部署完成后）

1. 编辑 `miniprogram/config.js`：
   ```js
   const POSTURE_API = {
     enabled: true,
     baseUrl: 'https://api.your-domain.com',
     apiKey:  'your-secret-key',
     timeout: 15000,
   }
   ```
2. 微信公众平台 → 开发 → 开发管理 → 服务器域名，把 `https://api.your-domain.com`
   同时加入 **request 合法域名** 和 **uploadFile 合法域名**。

完成后小程序自动改走真实识别。

---

## 四、识别逻辑说明

| 检查 | 实现 |
|------|------|
| 多人 | MediaPipe 人脸检测，≥2 张脸判定多人（可拦截拼图/合影） |
| 全身 | 鼻/耳 + 双踝关键点可见性 |
| 角度 | 肩宽/躯干比（侧面肩部重叠）+ 正脸有无（区分正/背） |
| 画质 | OpenCV 平均亮度 + 拉普拉斯方差（糊/暗/过曝） |
| 头前引 | 侧面：耳-肩水平偏移 / 躯干高 |
| 骨盆前倾 | 侧面：肩-髋-膝夹角 |
| 膝超伸/内扣 | 侧面髋-膝-踝夹角 / 正面膝踝间距比 |
| 肩高不对称 | 正背面双肩 y 差 |
| 圆肩 | 肩宽/髋宽比收窄 |

> 阈值集中在 `app/validate.py` 与 `app/analyze.py` 顶部常量，
> 建议用真实样本标定后微调。

## 五、替换识别引擎

要改用第三方人体分析 API：重写 `app/engine.py` 的 `detect()`，
保证返回相同的 `Keypoints` 结构（关键点归一化坐标 + 可见度 + 人脸数 + 画质），
`validate.py` / `analyze.py` 无需改动。
