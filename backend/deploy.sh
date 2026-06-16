#!/usr/bin/env bash
# 斯俪 Slique 体态 AI 后端 · 一键部署脚本
# 在全新的 Ubuntu 22.04 服务器上以 root 运行：
#   bash <(curl -fsSL https://raw.githubusercontent.com/definemcnab-ship-it/lia-ku/claude/optimistic-maxwell-mArMz/backend/deploy.sh)
# 或：把本仓库 clone 下来后 cd backend && bash deploy.sh

set -euo pipefail

# ── 配置（已与小程序 config.js 对齐，无需修改）──
DOMAIN="api.slique.cn"
API_KEY="c1d5bcaabe4f6c3238be522803ff4388"
REPO="https://github.com/definemcnab-ship-it/lia-ku.git"
BRANCH="claude/optimistic-maxwell-mArMz"

echo "==> [1/6] 安装基础工具与 Docker ..."
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq git curl ca-certificates >/dev/null
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi
systemctl enable --now docker

echo "==> [2/6] 拉取代码 ..."
rm -rf /opt/slique
git clone --depth 1 -b "$BRANCH" "$REPO" /opt/slique
cd /opt/slique/backend

echo "==> [3/6] 构建镜像（首次约 3-5 分钟）..."
docker build -t slique-posture .

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

cat > /etc/caddy/Caddyfile <<CADDY
$DOMAIN {
    reverse_proxy localhost:8000
}
CADDY
systemctl restart caddy

echo "==> [6/6] 等待证书签发并自检 ..."
sleep 8
echo "本地健康检查："
curl -s http://localhost:8000/health || echo "(本地 8000 未响应，检查 docker logs slique)"
echo ""
echo "HTTPS 健康检查："
curl -s "https://$DOMAIN/health" || echo "(HTTPS 未通：确认域名已解析到本机、防火墙放通 80/443)"
echo ""
echo "==================================================="
echo "部署完成。访问 https://$DOMAIN/health 应返回 {\"ok\":true}"
echo "查看日志： docker logs -f slique"
echo "==================================================="
