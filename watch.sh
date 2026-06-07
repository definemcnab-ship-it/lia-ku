#!/bin/bash

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "👀 监听远程更新中：$PROJECT_DIR"
echo "   按 Ctrl+C 停止"
echo ""

while true; do
  git -C "$PROJECT_DIR" fetch --quiet origin claude/optimistic-maxwell-mArMz 2>/dev/null
  LOCAL=$(git -C "$PROJECT_DIR" rev-parse HEAD)
  REMOTE=$(git -C "$PROJECT_DIR" rev-parse origin/claude/optimistic-maxwell-mArMz)
  if [ "$LOCAL" != "$REMOTE" ]; then
    echo "🔄 $(date '+%H:%M:%S') 检测到更新，正在拉取..."
    git -C "$PROJECT_DIR" pull --quiet origin claude/optimistic-maxwell-mArMz
    echo "✅ 已同步，微信开发者工具将自动刷新"
  fi
  sleep 8
done
