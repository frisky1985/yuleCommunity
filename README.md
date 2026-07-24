# YuleTech 开源技术社区

> [yuletech](https://github.com/frisky1985/yuleCommunity) — 国内领先的 AutoSAR BSW 开源社区 SPA

[![Build](https://github.com/frisky1985/yuleCommunity/actions/workflows/deploy.yml/badge.svg)](https://github.com/frisky1985/yuleCommunity/actions)
[![Version](https://img.shields.io/github/v/release/frisky1985/yuleCommunity?color=%230B3D91&label=version)](https://github.com/frisky1985/yuleCommunity/releases/tag/master-v2.2.0)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 网站简介

面向 **AutoSAR BSW 开发者**、汽车电子工程师、芯片厂商和高校研究人员的技术社区平台。提供开源代码、工具链、学习资源和硬件开发板，打造工程师的合作伙伴生态。

🌐 **在线地址**: https://frisky1985.github.io/yuleCommunity/

## 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | React 19 + TypeScript 6 |
| **构建** | Vite 7 + SWC |
| **样式** | Tailwind CSS 4 + shadcn/ui |
| **路由** | React Router v7 (BrowserRouter) |
| **状态** | Zustand |
| **图标** | Lucide React |
| **PWA** | vite-plugin-pwa (generateSW, 96 条预缓存) |
| **部署** | GitHub Actions → GitHub Pages |
| **监控** | ErrorBoundary + window.onerror 错误捕获 |

## 核心功能

| 模块 | 说明 |
|:-----|:-----|
| 🏠 首页 | AutoSAR BSW 品牌展示、数据统计 |
| 📖 开源项目 | BSW 四层架构（MCAL/ECUAL/Service/RTE）模块浏览 |
| 🔬 模块对比 | 雷达图对比模块性能指标 |
| 📝 技术博客 | 10+ 篇 AutoSAR 技术文章，Markdown 渲染 |
| 🛠 配置器 | [yuleASR 配置器](https://github.com/frisky1985/yuleASR-Configurator)（通过 iframe 嵌入）|
| 💬 社区论坛 | 技术问答、经验分享 |
| 🎓 学习路径 | 结构化学习路线 |
| 📊 GitHub 看板 | 仓库统计、贡献者、Star 趋势 |
| 🔑 SSO 单点登录 | SaaS 集成管理 |
| 🖥 管理后台 | 内容管理、用户管理、数据分析 |

## 优化亮点

- **性能**: 代码分割 + 懒加载，WebP 图片，95 分+ Lighthouse
- **安全**: sessionStorage 认证、safeGet/safeSet 工具、DOMPurify 内容净化
- **PWA**: 离线支持、Service Worker、96 条预缓存
- **SEO**: BrowserRouter、语义化 HTML、OG Meta、sitemap.xml
- **可访问性**: ARIA 标签、键盘导航、语义化结构
- **错误韧性**: ErrorBoundary 包裹所有路由、全局错误监控、Toast 通知

## 快速开始

```bash
# 安装
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览
npm run preview

# 测试
npm run test
```

## 项目结构

```
yulecommunity/
├── public/
│   ├── images/           # WebP + PNG 图片
│   ├── 404.html          # SPA 回退（GitHub Pages 深链支持）
│   └── offline.html      # PWA 离线页面
├── src/
│   ├── admin/            # 管理后台（懒加载）
│   ├── components/       # 共享组件（Navbar, Footer, ErrorBoundary, Toast...）
│   ├── contexts/         # React 上下文（ThemeContext）
│   ├── data/             # 静态数据（模块数据、博客文章）
│   ├── hooks/            # 自定义 Hooks（useAuth, useModuleCompare...）
│   ├── lib/              # 工具函数（cn, safeGet, errorMonitor...）
│   ├── pages/            # 页面组件（全部懒加载）
│   └── services/         # API 服务（GitHub, User, Blog...）
├── dist/                 # 生产构建产物
├── .github/workflows/    # CI/CD 部署流水线
└── vite.config.ts        # Vite + PWA 配置
```

## 版本历史

| 版本 | 日期 | 亮点 |
|:-----|:-----|:-----|
| master-v2.2.0 | 2026-07 | 全方位优化（BrowserRouter、安全、PWA、错误韧性） |
| v2.1.0 | 2026-07 | 主题修复、统一 GitHub API、代码分割 |
| v2.0.0 | 2026-06 | 管理后台、SSO、学习路径、论坛 |
| v1.5.0 | 2026-05 | 首个公开版本 |

## 致谢

- 基于予乐科技 MBA 论文《YL 汽车软件公司商业模式优化研究》第 5.3 章构想
- 感谢所有社区贡献者和评审专家的反馈

## 许可证

MIT © 上海予乐电子科技有限公司
