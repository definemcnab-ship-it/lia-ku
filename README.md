# 飞书每日班表推送

每天定时从**飞书多维表格**读取当天的排班，整理成一张消息卡片，推送到**飞书群机器人**。

- 数据源：[班表多维表格](https://zi7a2ydffgl.feishu.cn/base/MZn6bicQ0aLTios6HWacdm20nZg?table=tblooJsiNzeJ5dLj&view=vewlpCe4Y8)
- 表格结构：一行一天（`日期`、`星期`），其余为各岗位列（如 `早班课程顾问`、`早班教练`、`晚班教练` …）
- 推送通道：飞书群自定义机器人 Webhook
- 调度：GitHub Actions 定时任务（`.github/workflows/daily-schedule.yml`）

> 仓库里原有的 `index.html`（待办事项）与本功能无关，保持不变。

## 工作原理

1. 用自建应用的 `app_id` / `app_secret` 换取 `tenant_access_token`；
2. 分页读取多维表格全部记录；
3. 按目标时区（默认 `Asia/Shanghai`）筛选出「今天」那一行；
4. 把各岗位列拼成 lark_md 卡片；
5. POST 到群机器人 Webhook（若开启签名校验则附带签名）。

## 准备工作

### 1. 创建自建应用（用于读取多维表格）

1. 进入[飞书开放平台开发者后台](https://open.feishu.cn/app) → 创建「企业自建应用」；
2. 在「凭证与基础信息」拿到 **App ID** 和 **App Secret**；
3. 在「权限管理」开通多维表格读取权限：`bitable:app:readonly`（或 `bitable:record:read`）；
4. 发布应用版本，并确保该应用对这张多维表格有访问权限
   （在多维表格右上角「···」→「更多」→ 添加应用为协作者，或把表格所在文档授权给应用）。

### 2. 添加群自定义机器人（用于推送）

1. 在目标群里：群设置 → 群机器人 → 添加机器人 → **自定义机器人**；
2. 复制 **Webhook 地址**；
3. （推荐）开启「签名校验」，复制密钥，对应 `FEISHU_WEBHOOK_SECRET`。

## 本地调试

```bash
cp .env.example .env       # 填入你的凭证
npm run dry-run            # 只打印卡片内容，不真正推送
npm run push               # 真正推送一次（会调用 Webhook）
```

`dry-run` 用于确认字段映射是否正确。如果卡片里某些列没显示或列名不对，
调整 `.env` 里的 `FEISHU_DATE_FIELD` / `FEISHU_WEEKDAY_FIELD` / `FEISHU_ROLE_FIELDS` 即可。

## 部署到 GitHub Actions

在仓库 **Settings → Secrets and variables → Actions** 中配置：

**Secrets（必填）**

| 名称 | 说明 |
| --- | --- |
| `FEISHU_APP_ID` | 自建应用 App ID |
| `FEISHU_APP_SECRET` | 自建应用 App Secret |
| `FEISHU_WEBHOOK_URL` | 群机器人 Webhook 地址 |
| `FEISHU_WEBHOOK_SECRET` | 机器人签名密钥（未开启签名可不填） |

**Variables（可选，覆盖默认值）**

`FEISHU_APP_TOKEN`、`FEISHU_TABLE_ID`、`FEISHU_VIEW_ID`、`FEISHU_DATE_FIELD`、
`FEISHU_WEEKDAY_FIELD`、`FEISHU_ROLE_FIELDS`、`FEISHU_TIMEZONE`、`FEISHU_PUSH_WHEN_EMPTY`。

配置完成后可在 **Actions → 每日班表推送 → Run workflow** 手动触发一次验证。

### 修改推送时间

编辑 `.github/workflows/daily-schedule.yml` 里的 `cron`。注意 **GitHub 用 UTC**：

- 北京时间 08:00 → `0 0 * * *`
- 北京时间 09:30 → `30 1 * * *`

## 配置项一览

见 [`.env.example`](./.env.example)。其中 `FEISHU_ROLE_FIELDS` 留空时会**自动**
展示除「日期 / 星期」外的所有非空列，因此表格新增岗位列也能自动带上；如只想展示
固定几列，再显式列出即可。
