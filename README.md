# 斯俪 Slique — 女性体态调整 App 可点原型

基于产品方案《斯俪 Slique》(`.md`) 与 Stitch 设计稿（Vitality & Grace 设计系统）落地的
**React + Vite** 可点原型。

## 运行

```bash
npm install
npm run dev      # 启动后访问 http://localhost:5173
npm run build    # 生产构建
```

## 页面（底部 Tab 可切换）

| 路由 | 页面 | 来源 |
|------|------|------|
| `/login` | 启动 / 登录页 | 1:1 还原设计稿 `_1` |
| `/home` | 首页（体态分 + 今日计划 + 功能卡片） | 1:1 还原设计稿 `slique_1` |
| `/scan` | AI 体态扫描（AR 取景对位，3 张照片流程） | 还原设计稿 `ai_1` |
| `/report` | 斯俪体态健康报告（总分 + 5 项测量 + 分享） | 方案 §5 评分模型 |
| `/training` | 矫正训练 + 七大体态分类动作库 | 方案 §2.1 / §4 |
| `/progress` | 进步追踪（趋势曲线 + 前后对比 + 打卡日历） | 方案 §2.1 |
| `/profile` | 我的（经期适配 / 推送 / 账号与隐私合规） | 方案 §6 / §11 / §12 |

## 修复的 Bug（来自 Stitch 设计稿）

还原时发现并修复了设计稿的两类真实 bug：

1. **导航全部失效** —— 所有页面的 `href` / `onclick` 使用了未被解析的模板占位符
   `{{DATA:SCREEN:SCREEN_XX}}`（如 `slique_1` 有 15 处、`_1` 有 6 处）。点击只会跳到字面量
   URL，导航完全不可用。已全部替换为 React Router 真实路由，使原型真正可点。
2. **重复的 `<link>` 标签** —— `_1`、`ai_1`、`ai_2` 三个页面的 `<head>` 中，
   Material Symbols 字体 `<link>` 被声明了两次。还原时已去重（统一在 `index.html` 声明一次）。

## 设计系统（Vitality & Grace）

| 角色 | 色值 |
|------|------|
| Primary（赭石 / 珊瑚） | `#9b4430` / `#e67e66` |
| 背景（暖奶油白） | `#fcf9f8` |
| 辅色（柔金 / 沙） | `#fed65b` |
| 字体 | Be Vietnam Pro（标题）/ Plus Jakarta Sans（正文） |

设计令牌（颜色 / 圆角 / 间距 / 字体）已配置在 `index.html` 的 Tailwind config 中，
与设计稿 `DESIGN.md` 完全一致。

## 技术栈

- React 18 + React Router (HashRouter)
- Vite 5
- Tailwind CSS（CDN，沿用设计稿方案）+ Material Symbols 图标
