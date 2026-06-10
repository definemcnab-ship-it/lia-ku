#!/bin/bash
PLIST_NAME="com.liahuang.assistant.daily"
PLIST_PATH="$HOME/Library/LaunchAgents/$PLIST_NAME.plist"

launchctl unload "$PLIST_PATH" 2>/dev/null
rm -f "$PLIST_PATH"

echo ""
echo "=================================================="
echo "  ✅ 定时任务已卸载"
echo "=================================================="
echo ""
echo "按任意键关闭..."
read -n 1
