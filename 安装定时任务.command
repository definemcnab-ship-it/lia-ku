#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PYTHON=$(which python3)
mkdir -p "$SCRIPT_DIR/data"

# ── 1. 安装 HTTP 服务器（始终在后台运行，serve 报告）──
SERVER_PLIST_NAME="com.liahuang.assistant.server"
SERVER_PLIST_PATH="$HOME/Library/LaunchAgents/$SERVER_PLIST_NAME.plist"
SERVER_LOG="$SCRIPT_DIR/data/server.log"

# 先生成服务器脚本
python3 -c "
from pathlib import Path
script = Path('$SCRIPT_DIR/data/_server.py')
script.write_text('''#!/usr/bin/env python3
import http.server, json, sys
from pathlib import Path
PORT = 18765
PROJECT_DIR = Path(__file__).parent.parent
FOLLOWUPS_FILE = Path(__file__).parent / 'followups.json'

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PROJECT_DIR), **kwargs)
    def do_POST(self):
        if self.path == \"/save_followups\":
            try:
                length = int(self.headers.get(\"Content-Length\", 0))
                data = json.loads(self.rfile.read(length))
                FOLLOWUPS_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding=\"utf-8\")
                self.send_response(200)
                self.send_header(\"Content-Type\", \"application/json\")
                self.end_headers()
                self.wfile.write(json.dumps({\"ok\": True}).encode())
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({\"ok\": False, \"error\": str(e)}).encode())
        else:
            self.send_response(404)
            self.end_headers()
if __name__ == \"__main__\":
    httpd = http.server.HTTPServer((\"127.0.0.1\", PORT), Handler)
    httpd.serve_forever()
''', encoding='utf-8')
print('server script written')
"

cat > "$SERVER_PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$SERVER_PLIST_NAME</string>
  <key>ProgramArguments</key>
  <array>
    <string>$PYTHON</string>
    <string>$SCRIPT_DIR/data/_server.py</string>
  </array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$SERVER_LOG</string>
  <key>StandardErrorPath</key><string>$SERVER_LOG</string>
</dict>
</plist>
EOF
launchctl unload "$SERVER_PLIST_PATH" 2>/dev/null
launchctl load "$SERVER_PLIST_PATH"
echo "✅ HTTP 服务器已安装（开机自启，始终运行）"

# ── 2. 安装定时任务 ──
CRON_PLIST_NAME="com.liahuang.assistant.daily"
CRON_PLIST_PATH="$HOME/Library/LaunchAgents/$CRON_PLIST_NAME.plist"
CRON_LOG="$SCRIPT_DIR/data/cron.log"

cat > "$CRON_PLIST_PATH" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$CRON_PLIST_NAME</string>
  <key>ProgramArguments</key>
  <array>
    <string>$PYTHON</string>
    <string>$SCRIPT_DIR/assistant.py</string>
    <string>--cron</string>
  </array>
  <key>StartCalendarInterval</key>
  <array>
    <dict>
      <key>Hour</key><integer>11</integer>
      <key>Minute</key><integer>0</integer>
    </dict>
    <dict>
      <key>Hour</key><integer>21</integer>
      <key>Minute</key><integer>0</integer>
    </dict>
  </array>
  <key>StandardOutPath</key><string>$CRON_LOG</string>
  <key>StandardErrorPath</key><string>$CRON_LOG</string>
  <key>RunAtLoad</key><false/>
</dict>
</plist>
EOF
launchctl unload "$CRON_PLIST_PATH" 2>/dev/null
launchctl load "$CRON_PLIST_PATH"
echo "✅ 定时任务已安装，每天 11:00 和 21:00 自动运行"
