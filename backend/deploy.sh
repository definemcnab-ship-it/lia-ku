#!/usr/bin/env bash
# 斯俪 Slique 体态 AI 后端 · 一键部署脚本（国内服务器优化版）
# 在全新的 Ubuntu 22.04 服务器上以 root / sudo 运行：
#   curl -fsSL https://raw.githubusercontent.com/definemcnab-ship-it/lia-ku/claude/optimistic-maxwell-mArMz/backend/deploy.sh -o deploy.sh
#   sudo bash deploy.sh

set -euo pipefail

# ── 配置 ──
DOMAIN="api.slique.cn"
# 密钥不写在脚本里（本仓库公开，写死等于泄露）。优先取环境变量
# POSTURE_API_KEY；未提供则复用服务器上次生成的密钥；都没有则自动生成。
KEY_FILE="/etc/slique/api_key"
if [ -n "${POSTURE_API_KEY:-}" ]; then
  API_KEY="$POSTURE_API_KEY"
elif [ -s "$KEY_FILE" ]; then
  API_KEY="$(cat "$KEY_FILE")"
else
  API_KEY="$(head -c16 /dev/urandom | od -An -tx1 | tr -d ' \n')"
fi
mkdir -p /etc/slique && printf '%s' "$API_KEY" > "$KEY_FILE" && chmod 600 "$KEY_FILE"
REPO="https://github.com/definemcnab-ship-it/lia-ku.git"
BRANCH="claude/optimistic-maxwell-mArMz"
# 国内 pip / docker 镜像
PIP_INDEX="https://pypi.tuna.tsinghua.edu.cn/simple"

echo "==> [1/6] 安装基础工具与 Docker（系统源）..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git curl ca-certificates docker.io >/dev/null
systemctl enable --now docker

echo "==> [1.5] 配置 Docker 国内镜像加速 ..."
mkdir -p /etc/docker
cat > /etc/docker/daemon.json <<'DJSON'
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://dockerproxy.com",
    "https://docker.1panel.live",
    "https://hub.rat.dev"
  ]
}
DJSON
systemctl restart docker
sleep 3

echo "==> [2/6] 拉取代码 ..."
rm -rf /opt/slique
git clone --depth 1 -b "$BRANCH" "$REPO" /opt/slique
cd /opt/slique/backend

echo "==> [3/6] 构建镜像（首次约 3-8 分钟，走清华 pip 源）..."
docker build --build-arg PIP_INDEX="$PIP_INDEX" -t slique-posture .

echo "==> [4/6] 启动容器 ..."
docker rm -f slique >/dev/null 2>&1 || true
docker run -d --restart=always -p 127.0.0.1:8000:8000 \
  -e POSTURE_API_KEY="$API_KEY" \
  --name slique slique-posture

echo "==> [5/6] 安装 Caddy（自动签发 HTTPS 证书）..."
if ! command -v caddy >/dev/null 2>&1; then
  apt-get install -y -qq debian-keyring debian-archive-keyring apt-transport-https >/dev/null
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null
  apt-get update -qq
  apt-get install -y -qq caddy >/dev/null
fi

# 同时监听 443（标准）与 8443（小程序 config.js 使用的端口），
# 两个端口都反代到后端，避免端口不一致导致小程序连不上。
cat > /etc/caddy/Caddyfile <<CADDY
$DOMAIN {
    reverse_proxy localhost:8000
}
$DOMAIN:8443 {
    reverse_proxy localhost:8000
}
CADDY
systemctl restart caddy

echo "==> [6/6] 等待证书签发并自检 ..."
sleep 10
echo "本地健康检查："
curl -s http://localhost:8000/health || echo "(本地 8000 未响应，检查 docker logs slique)"
echo ""
echo "HTTPS 健康检查："
curl -s "https://$DOMAIN/health" || echo "(HTTPS 未通：确认域名已解析、防火墙放通 80/443)"
echo ""
echo "==================================================="
echo "部署完成。访问 https://$DOMAIN/health 应返回 {\"ok\":true}"
echo "查看日志： docker logs -f slique"
echo ""
echo "★ 本次生效的 API 密钥（请填入小程序 miniprogram/config.secret.js）："
echo ""
echo "    module.exports = { apiKey: '$API_KEY' }"
echo ""
echo "  密钥已保存在 $KEY_FILE，重复部署会自动复用。"
echo "==================================================="
