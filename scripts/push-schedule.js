#!/usr/bin/env node
// 每日班表推送：从飞书多维表格读取今天的排班，推送到飞书群机器人 Webhook。
//
// 运行方式：
//   node scripts/push-schedule.js            # 正常推送
//   node scripts/push-schedule.js --dry-run  # 只在控制台打印卡片内容，不推送
//
// 所有配置通过环境变量提供，见 .env.example / README.md。

import crypto from 'node:crypto';

// ---------------------------------------------------------------------------
// 配置
// ---------------------------------------------------------------------------

const cfg = {
  // 飞书自建应用凭证（用于读取多维表格）
  appId: env('FEISHU_APP_ID', { required: true }),
  appSecret: env('FEISHU_APP_SECRET', { required: true }),

  // 群机器人 Webhook（用于推送消息）
  webhookUrl: env('FEISHU_WEBHOOK_URL', { required: true }),
  webhookSecret: env('FEISHU_WEBHOOK_SECRET'), // 机器人开启「签名校验」时填写，否则留空

  // 多维表格定位（默认值取自任务给出的表格 URL，可用环境变量覆盖）
  appToken: env('FEISHU_APP_TOKEN', { default: 'MZn6bicQ0aLTios6HWacdm20nZg' }),
  tableId: env('FEISHU_TABLE_ID', { default: 'tblooJsiNzeJ5dLj' }),
  viewId: env('FEISHU_VIEW_ID'), // 留空表示读取全部记录后自行按日期筛选

  // 字段名（与表格中的列名完全一致）
  dateField: env('FEISHU_DATE_FIELD', { default: '日期' }),
  weekdayField: env('FEISHU_WEEKDAY_FIELD', { default: '星期' }),
  // 要展示的角色列，逗号分隔；留空则自动展示除日期/星期外的所有非空列。
  roleFields: env('FEISHU_ROLE_FIELDS', { default: '' })
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),

  // 时区与开放平台域名
  timezone: env('FEISHU_TIMEZONE', { default: 'Asia/Shanghai' }),
  baseUrl: env('FEISHU_BASE_URL', { default: 'https://open.feishu.cn' }),

  // 当天没有排班时是否仍然推送一条提示
  pushWhenEmpty: env('FEISHU_PUSH_WHEN_EMPTY', { default: 'true' }) !== 'false',
};

const DRY_RUN = process.argv.includes('--dry-run') || process.env.DRY_RUN === '1';

const WEEKDAY_CN = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

// ---------------------------------------------------------------------------
// 主流程
// ---------------------------------------------------------------------------

async function main() {
  const today = formatDateInTz(new Date(), cfg.timezone); // YYYY-MM-DD
  console.log(`[班表推送] 目标日期：${today}（${cfg.timezone}）`);

  const token = await getTenantAccessToken();
  const records = await fetchAllRecords(token);
  console.log(`[班表推送] 共读取 ${records.length} 条记录`);

  const todays = records.filter((r) => recordDate(r.fields[cfg.dateField]) === today);
  console.log(`[班表推送] 命中今日记录 ${todays.length} 条`);

  if (todays.length === 0 && !cfg.pushWhenEmpty) {
    console.log('[班表推送] 今日无排班且已关闭空推送，跳过。');
    return;
  }

  const card = buildCard(today, todays);

  if (DRY_RUN) {
    console.log('[班表推送] --dry-run，仅打印卡片：');
    console.log(JSON.stringify(card, null, 2));
    return;
  }

  await sendWebhook(card);
  console.log('[班表推送] 推送成功 ✅');
}

// ---------------------------------------------------------------------------
// 飞书：获取 tenant_access_token
// ---------------------------------------------------------------------------

async function getTenantAccessToken() {
  const res = await fetch(`${cfg.baseUrl}/open-apis/auth/v3/tenant_access_token/internal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ app_id: cfg.appId, app_secret: cfg.appSecret }),
  });
  const data = await res.json();
  if (data.code !== 0) {
    throw new Error(`获取 tenant_access_token 失败：code=${data.code} msg=${data.msg}`);
  }
  return data.tenant_access_token;
}

// ---------------------------------------------------------------------------
// 飞书：分页读取多维表格记录
// ---------------------------------------------------------------------------

async function fetchAllRecords(token) {
  const records = [];
  let pageToken = '';
  do {
    const url = new URL(
      `${cfg.baseUrl}/open-apis/bitable/v1/apps/${cfg.appToken}/tables/${cfg.tableId}/records`
    );
    url.searchParams.set('page_size', '500');
    if (cfg.viewId) url.searchParams.set('view_id', cfg.viewId);
    if (pageToken) url.searchParams.set('page_token', pageToken);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.code !== 0) {
      throw new Error(`读取多维表格失败：code=${data.code} msg=${data.msg}`);
    }
    records.push(...(data.data?.items ?? []));
    pageToken = data.data?.has_more ? data.data.page_token : '';
  } while (pageToken);
  return records;
}

// ---------------------------------------------------------------------------
// 构造消息卡片
// ---------------------------------------------------------------------------

function buildCard(today, rows) {
  const weekday = WEEKDAY_CN[tzDate(new Date(), cfg.timezone).getUTCDay()];
  const title = `📅 今日班表 · ${today} ${weekday}`;

  let content;
  if (rows.length === 0) {
    content = '今日暂无排班记录。';
  } else {
    content = rows.map((row) => formatRow(row.fields)).join('\n\n---\n\n');
  }

  return {
    msg_type: 'interactive',
    card: {
      config: { wide_screen_mode: true },
      header: {
        template: 'blue',
        title: { tag: 'plain_text', content: title },
      },
      elements: [{ tag: 'div', text: { tag: 'lark_md', content } }],
    },
  };
}

function formatRow(fields) {
  // 决定要展示哪些列
  const skip = new Set([cfg.dateField]);
  let cols = cfg.roleFields;
  if (cols.length === 0) {
    // 自动模式：展示除日期/星期外的所有非空列
    skip.add(cfg.weekdayField);
    cols = Object.keys(fields).filter((k) => !skip.has(k));
  }

  const lines = [];
  for (const col of cols) {
    const text = fieldToText(fields[col]);
    if (text) lines.push(`**${col}**：${text}`);
  }
  return lines.length ? lines.join('\n') : '（本日各岗位均未填写）';
}

// ---------------------------------------------------------------------------
// 飞书：推送到群机器人 Webhook
// ---------------------------------------------------------------------------

async function sendWebhook(card) {
  const body = { ...card };
  if (cfg.webhookSecret) {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    body.timestamp = timestamp;
    body.sign = genSign(timestamp, cfg.webhookSecret);
  }

  const res = await fetch(cfg.webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  // 群机器人成功时返回 code:0 或 StatusCode:0
  const ok = data.code === 0 || data.StatusCode === 0 || data.StatusMessage === 'success';
  if (!ok) {
    throw new Error(`Webhook 推送失败：${JSON.stringify(data)}`);
  }
}

function genSign(timestamp, secret) {
  // 飞书自定义机器人签名：以「timestamp\nsecret」为 key 对空串做 HmacSHA256，再 base64
  const stringToSign = `${timestamp}\n${secret}`;
  return crypto.createHmac('sha256', stringToSign).update('').digest('base64');
}

// ---------------------------------------------------------------------------
// 工具函数
// ---------------------------------------------------------------------------

function env(name, { required = false, default: dft } = {}) {
  const v = process.env[name];
  if (v === undefined || v === '') {
    if (required) {
      console.error(`[班表推送] 缺少必需的环境变量：${name}`);
      process.exit(1);
    }
    return dft ?? '';
  }
  return v;
}

// 把任意单元格值转成可读文本
function fieldToText(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    return value
      .map((el) => {
        if (el === null || el === undefined) return '';
        if (typeof el === 'string') return el;
        if (typeof el === 'object') return el.name ?? el.text ?? el.en_name ?? '';
        return String(el);
      })
      .filter(Boolean)
      .join('、');
  }
  if (typeof value === 'object') {
    return value.name ?? value.text ?? value.value ?? '';
  }
  return String(value);
}

// 把日期字段（毫秒时间戳 / 字符串）归一化成目标时区的 YYYY-MM-DD
function recordDate(value) {
  if (value === null || value === undefined || value === '') return '';
  let ts;
  if (typeof value === 'number') {
    ts = value;
  } else if (Array.isArray(value) && value.length) {
    return recordDate(value[0]);
  } else if (typeof value === 'object') {
    return recordDate(value.value ?? value.text ?? '');
  } else {
    const s = String(value).trim();
    const m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
    if (m) {
      return `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`;
    }
    ts = Date.parse(s);
    if (Number.isNaN(ts)) return '';
  }
  return formatDateInTz(new Date(ts), cfg.timezone);
}

// 目标时区下的 YYYY-MM-DD
function formatDateInTz(date, tz) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

// 返回一个「UTC 字段等于目标时区本地值」的 Date，便于取星期
function tzDate(date, tz) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const get = (t) => Number(parts.find((p) => p.type === t).value);
  return new Date(Date.UTC(get('year'), get('month') - 1, get('day')));
}

main().catch((err) => {
  console.error('[班表推送] 失败：', err.message);
  process.exit(1);
});
