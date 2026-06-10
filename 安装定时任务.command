#!/bin/bash
# 安装每日定时推送任务
# 默认每天 09:00 自动运行，修改下方 HOUR/MINUTE 可调整时间

HOUR=11
MINUTE=0

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PLIST_NAME="com.liahuang.assistant.daily"
PLIST_PATH="$HOME/Library/LaunchAgents/$PLIST_NAME.plist"
LOG_PATH="$SCRIPT_DIR/data/cron.log"
PYTHON=$(which python3)

mkdir -p "$SCRIPT_DIR/data"

cat > "$PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$PLIST_NAME</string>

  <key>ProgramArguments</key>
  <array>
    <string>$PYTHON</string>
    <string>$SCRIPT_DIR/assistant.py</string>
    <string>--cron</string>
  </array>

  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key>
    <integer>$HOUR</integer>
    <key>Minute</key>
    <integer>$MINUTE</integer>
  </dict>

  <key>StandardOutPath</key>
  <string>$LOG_PATH</string>
  <key>StandardErrorPath</key>
  <string>$LOG_PATH</string>

  <key>RunAtLoad</key>
  <false/>
</dict>
</plist>
EOF

# 卸载旧任务（如有）再重新加载
launchctl unload "$PLIST_PATH" 2>/dev/null
launchctl load "$PLIST_PATH"

echo ""
echo "=================================================="
echo "  ✅ 定时任务已安装"
echo "  ⏰ 每天 $HOUR 时 $MINUTE 分自动运行"
echo "  📄 日志文件: $LOG_PATH"
echo "  📁 脚本目录: $SCRIPT_DIR"
echo ""
echo "  如需修改时间，用文本编辑器打开本文件"
echo "  修改 HOUR 和 MINUTE 后重新双击运行即可"
echo "=================================================="
echo ""
echo "按任意键关闭..."
read -n 1
