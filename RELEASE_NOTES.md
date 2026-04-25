# YuleTech Community v0.6.0

## 概述

v0.6.0 将首页四个生态板块卡片的内容区域改为横向无限滚动的界面预览，使用纯 CSS 绘制的模拟截图替代文字数据，视觉表现力更强。

## 新增功能

### 横向滚动界面预览
- **ImageMarquee 组件** - 纯 CSS 实现的横向无限滚动，支持鼠标悬停暂停
- **开源代码平台** - 代码编辑器、GitHub 仓库卡片、四层架构分层图
- **开发工具链** - BSW Configurator 配置界面、编译终端日志、Trace 调试器波形
- **学习成长平台** - 视频播放器、课程进度列表、技术文档页面
- **硬件开发板** - PCB 电路板模拟图、GPIO 引脚图、开发板规格参数表

### 技术特点
- 所有预览界面完全使用 HTML/CSS 绘制，无需任何外部图片资源
- 自适应深色/浅色主题
- 各卡片独立滚动速度，形成错落有致的视觉效果

## 修复

- 同 v0.5.0

## 部署

已部署至 GitHub Pages：https://frisky1985.github.io/yuleCommunity/

---

# YuleTech Community v0.5.0

## 概述

v0.5.0 大幅增强首页"一站式汽车基础软件 开发生态"板块的展示内容，四个核心平台卡片从单一的标题+描述变为包含丰富数据预览的信息面板。

## 新增内容

### 开源代码平台卡片
- GitHub Stars/Forks 实时统计预览
- MCAL/ECUAL/Service/RTE+ASW 四层架构完成度可视化
- 热门模块标签（Mcu、Can、CanIf、PduR、Rte）

### 开发工具链卡片
- 4 个核心工具预览：BSW Configurator、RTE Generator、Build Scripts、Trace Debugger
- 支持芯片平台标签（i.MX8M Mini、RH850、AURIX TC3xx、S32K3）

### 学习成长平台卡片
- 3 条学习路径预览：AutoSAR 入门、MCAL 驱动开发、通信栈实战
- 资源统计：42 视频 / 68 文章 / 15 项目

### 硬件开发板卡片
- 2 款开发板规格预览（YuleTech i.MX8M / YuleTech RH850）
- 3 大芯片厂商平台标签（NXP、Renesas、Infineon）

## 修复

- 同 v0.4.0

## 部署

已部署至 GitHub Pages：https://frisky1985.github.io/yuleCommunity/

---

# YuleTech Community v0.4.0

## 概述

v0.4.0 集成 GitHub API，开源代码页的 Stars/Forks 等数据现在可以动态从 GitHub 实时拉取，替代了原有的静态假数据。

## 新增功能

### GitHub API 集成
- **实时 Stars/Forks 统计** - 开源代码页的总 Stars 和总 Forks 自动从 GitHub API 同步
- **模块仓库自动匹配** - 根据模块名称自动匹配 GitHub 仓库（支持多种命名规则）
- **直达仓库链接** - 匹配成功的模块卡片右上角显示外部链接，一键跳转到对应 GitHub 仓库
- **数据缓存机制** - 使用 sessionStorage 缓存 API 结果（5分钟 TTL），减少请求次数
- **优雅降级** - API 调用失败或超限时自动回退到静态数据，不影响页面展示
- **手动刷新** - 提供刷新按钮，可手动触发数据重新同步

## 修复

- 同 v0.3.0

## 部署

已部署至 GitHub Pages：https://frisky1985.github.io/yuleCommunity/

---

# YuleTech Community v0.3.0

## 概述

v0.3.0 新增模块详情页功能，为 32 个 AutoSAR BSW 模块提供独立的详细介绍页面，显著提升开源代码页的信息深度和可访问性。

## 新增功能

### 模块详情页
- **32 个模块独立详情页** - 每个模块拥有独立的 URL（如 `/opensource/Mcu`），支持直接分享链接
- **模块概述** - 详细介绍模块的定位、功能和实现特点
- **功能特性列表** - 清晰展示模块支持的核心能力
- **API 参考表** - 列出核心函数的签名、参数和说明
- **配置参数** - 展示关键配置项及其默认值
- **代码示例** - 提供可直接运行的 C 语言示例代码
- **依赖关系** - 显示模块依赖的上层/下层模块
- **更新日志** - 展示版本迭代历史和变更内容

### 交互优化
- 开源代码页卡片点击即可进入详情页
- 卡片悬停时显示箭头提示，增强可点击感知
- 详情页支持面包屑返回导航

## 修复

- 同 v0.2.0

## 部署

已部署至 GitHub Pages：https://frisky1985.github.io/yuleCommunity/

---

# YuleTech Community v0.2.0

## 概述

v0.2.0 是一个稳定性修复版本，主要解决页面显示异常、构建故障和路由边界情况，提升多端访问体验。

## 修复内容

### 页面显示与导航
- **修复导航栏响应式断点** - 修复 768px-1024px 屏幕宽度下导航菜单和汉堡按钮同时隐藏导致的"导航消失"问题
- **添加 404 兜底页面** - 为未知路由添加友好的 404 提示页面，避免访问不存在的路径时显示空白

### 性能与稳定性
- **移除双重 Service Worker 注册** - 消除 `main.tsx` 手动注册与 vite-plugin-pwa 自动注入之间的冲突，避免缓存异常和加载问题
- **修复 GitHub Actions 构建失败** - 将 Vite 从 8.x 降级至 7.x，解决与 `vite-plugin-pwa@1.2.0` 的 peer dependency 冲突导致的 `npm ci` 失败

## 部署

已部署至 GitHub Pages：https://frisky1985.github.io/yuleCommunity/

---

# YuleTech Community v0.1.0

## 概述

YuleTech 社区网站首个正式版本发布！这是一个面向汽车基础软件（AutoSAR BSW）工程师的技术社区平台，提供开源代码、学习资源、工具链和社区互动功能。

## 主要功能

### 核心页面
- **首页** - 社区品牌展示、核心功能入口、开源项目概览、用户证言
- **开源代码** - 展示 32+ AutoSAR BSW 模块，覆盖 MCAL、ECUAL、Service、RTE 层
- **工具链** - 开发工具链介绍与下载
- **学习成长** - 系统化学习路径、视频课程、实战项目
- **技术博客** - 技术文章发布与浏览，支持代码语法高亮
- **文档中心** - 项目文档与规范
- **论坛** - 技术讨论与话题互动
- **问答** - 工程师互助问答平台
- **活动** - 线上线下技术活动发布与报名
- **开发板** - 硬件开发板展示与介绍
- **下载中心** - 资源文件分类下载
- **个人中心** - 用户资料、积分等级、消息通知

### 管理后台
- 管理员仪表盘，包含数据可视化图表
- 用户管理、内容管理、系统设置
- 社区统计数据实时展示

### 技术特性
- **PWA 支持** - 可离线访问，支持安装为桌面应用
- **SEO 优化** - 完整的 meta 标签、Open Graph、Twitter Cards
- **深色/浅色主题** - 一键切换，跟随系统偏好
- **全局搜索** - 快速检索全站内容
- **代码高亮** - 技术博客与问答中的代码块语法高亮
- **路由懒加载** - 首屏加载优化，代码按需分割
- **响应式设计** - 适配桌面、平板、手机多端访问

## 技术栈

- React 19 + TypeScript
- Vite 7 + Tailwind CSS
- shadcn/ui 组件库
- Recharts 数据可视化
- React Router 7
- PWA (Vite Plugin PWA)

## 部署

已部署至 GitHub Pages：https://frisky1985.github.io/yuleCommunity/

## 后续计划

查看 [ROADMAP.md](./ROADMAP.md) 了解未来版本规划。
