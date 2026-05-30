# 斯俪 Slique — 女性体态矫正 App 高保真原型

> 科学训练，优雅体态。

基于产品方案《斯俪 Slique》(`.md`) 与 Stitch 设计稿（Vitality & Grace 设计系统）落地的
**React + Vite** 高保真可交互原型。覆盖完整用户主线，数据本地持久化，含动画过渡、
错误处理、无障碍与加载态——一个可直接演示、可本地调试的前端成品。

---

## 快速开始

```bash
npm install
npm run dev      # 开发服务器，访问 http://localhost:5173
npm run build    # 生产构建，产物在 dist/
npm run preview  # 预览生产构建
```

> 需要 Node 18+。开发服务器支持热更新；用 Chrome DevTools 的设备模拟（Ctrl+Shift+M）
> 选 iPhone 尺寸可看真实手机效果（390×844）。

---

## 核心用户旅程

```
登录 → 引导(4步) → AI扫描(3张照片) → AI分析 → 体态报告
                                                    ↓
首页 ◄──────────────────────────────── 开始矫正训练
 ↓                                                  ↓
进步追踪 ◄───────────────────────── 训练播放器(完成→记录打卡)
```

## 页面一览

| 路由 | 页面 | 来源 |
|------|------|------|
| `/login` | 启动 / 登录页 | 设计稿 `_1` |
| `/onboarding` | 首次引导（价值介绍 + 场景器械选择） | 方案 §2.2 |
| `/home` | 首页（体态分 + 今日计划 + 功能卡片） | 设计稿 `slique_1` |
| `/scan` | AI 体态扫描（取景对位 → 扫描光束 → 分析加载） | 设计稿 `ai_1` |
| `/report` | 斯俪体态健康报告（总分 + 5 项测量 + 分享卡） | 方案 §5 |
| `/training` | 矫正训练 + 七大体态分类动作库 | 方案 §2.1 / §4 |
| `/player` | 训练播放器（计时 / 计数 / 组间休息 / 呼吸引导） | 方案 §2.1 |
| `/progress` | 进步追踪（分数曲线 / 5维对比 / 打卡日历） | 方案 §2.1 |
| `/diet` | 饮食建议（体态×营养对照 + 三餐记录） | 方案 §8 |
| `/profile` | 我的（体态分 / 周期 / 账号与隐私合规） | 方案 §6 / §11 / §12 |
| `/cycle` | 经期周期适配详情（四阶段训练策略） | 方案 §6 |

---

## 已实现的产品能力

### 数据持久化（localStorage，无需后端）
- 训练打卡、连续天数、本月训练次数——完成训练后**刷新仍保留**
- 经期设置（开关 / 周期长度 / 经期天数）、引导期场景器械偏好、当日三餐记录
- 进步追踪日历按当月真实排布并动态点亮；无记录时显示空状态引导
- 「我的 → 清除本地数据」二次确认后可一键重置
- 实现见 `src/lib/store.js`（基于 `useSyncExternalStore` 的轻量响应式 store）

### 动画与微交互
- 路由切换淡入上滑、引导分步滑入、训练阶段切换过渡
- 首页得分环描边动画、报告/进度条形图增长动画
- AI 扫描光束往复、语音指示脉冲、骨架屏微光

### 健壮性与无障碍
- `ErrorBoundary` 捕获渲染异常，降级到友好页而非白屏
- 图标按钮全量 `aria-label`、`role="switch"`、`aria-live`、`:focus-visible` 焦点环
- 尊重 `prefers-reduced-motion`（系统减弱动效时自动关闭动画）
- Report 加载骨架屏（`aria-busy`）

---

## 还原时修复的 Bug（来自 Stitch 设计稿）

1. **导航全部失效** —— 设计稿所有 `href`/`onclick` 使用了未解析的模板占位符
   `{{DATA:SCREEN:SCREEN_XX}}`（`slique_1` 15 处、`_1` 6 处等）。已全部替换为
   React Router 真实路由。
2. **重复的 `<link>` 标签** —— `_1`、`ai_1`、`ai_2` 的 `<head>` 中字体 link 声明两次，已去重。
3. **CDN 在受限网络下被拦截（403）** —— 设计稿用运行时 Tailwind CDN + Material Symbols 字体图标，
   在沙箱/弱网下样式全裸、图标显示为文字。已改为**构建时编译 Tailwind** +
   **内嵌 SVG 图标**（`src/components/Icon.jsx`），彻底离线可用。

---

## 设计系统（Vitality & Grace）

| 角色 | 色值 |
|------|------|
| Primary（赭石 / 珊瑚） | `#9b4430` / `#e67e66` |
| 背景（暖奶油白） | `#fcf9f8` |
| 辅色（柔金 / 薄荷 / 薰衣草） | `#fed65b` / `#E0F2F1` / `#F3E5F5` |
| 字体 | Be Vietnam Pro（标题）/ Plus Jakarta Sans（正文） |

设计令牌（颜色 / 圆角 / 间距 / 字体 / 动画）配置于 `tailwind.config.js`，与设计稿 `DESIGN.md` 一致。

---

## 技术栈

- **React 18** + **React Router 6**（HashRouter，便于静态托管）
- **Vite 5** 构建
- **Tailwind CSS 3**（构建时编译）+ PostCSS + Autoprefixer
- 内嵌 **SVG 图标**（无 CDN 依赖）
- 状态：`useSyncExternalStore` + `localStorage`

## 项目结构

```
src/
├── main.jsx                 # 入口（ErrorBoundary + HashRouter）
├── App.jsx                  # 路由表
├── index.css                # Tailwind 指令 + 动画 + a11y 样式
├── lib/
│   └── store.js             # localStorage 持久化状态层
├── components/
│   ├── PhoneFrame.jsx       # 设备外壳 + 路由切换动画
│   ├── TabBar.jsx           # 底部导航
│   ├── Icon.jsx             # 内嵌 SVG 图标库
│   ├── Skeleton.jsx         # 骨架屏
│   └── ErrorBoundary.jsx    # 渲染异常兜底
└── screens/                 # 11 个页面
```

---

## 边界说明

这是**前端高保真原型**，数据存于浏览器本地。要成为面向真实用户的产品，还需：
- 后端：用户账号系统、云端数据同步
- AI：真实的姿态识别模型（当前为模拟分析流程）

这些超出前端范围，需要服务端与算法能力支撑。
