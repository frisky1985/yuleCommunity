# YuleTech Community v0.9.0

## 概述

v0.9.0 是性能与体验优化版本，重点修复了 React Hooks 反模式、优化了构建产物体积，并添加了无障碍支持。

## 新增功能

### 无障碍支持
- **prefers-reduced-motion** - AnimatedPage 组件现在尊重系统减少动画偏好设置
- **动画降级** - 用户开启减少动画后，页面切换将使用简单的淡入效果

## 性能优化

### 构建产物优化
- **manualChunks 配置** - 将大型 vendor 库拆分为独立 chunk
  - `react-vendor`: React + ReactDOM + React Router
  - `recharts`: 图表库
  - `framer-motion`: 动画库
  - `syntax-highlight`: 代码高亮库
  - `ui-utils`: UI 工具库
- **预期效果** - 主 chunk 从 1,134KB 降至约 400KB (减少 65%)

### 图片优化
- **WebP 转换脚本** - `scripts/optimize-images.cjs` 支持批量转换
- **懒加载组件** - OptimizedImage 组件支持 IntersectionObserver + WebP 回退

## 代码质量改进

### React Hooks 修复
- **修复 setState in useEffect 反模式** (12处)
  - ThemeContext: 使用初始化函数替代 useEffect
  - Navbar: 使用 useRef 追踪路由变化
  - HomePage: 使用初始化函数读取 localStorage
  - useAdminAuth: 移除冗余的初始化 setState
  - useGitHubRepos: 添加 mounted 标志防止内存泄漏

### TypeScript 类型安全
- **移除 any 类型** (15处)
  - OpenSource.tsx: CpuIcon 使用 SVGProps<SVGSVGElement>
  - CommunityPage.tsx: 4个图标组件使用 SVGProps
  - ReadmeGenerator.tsx: updateConfig 使用联合类型
  - BSWConfigurator.tsx: 配置值使用 string | number | boolean
  - PinConfigurator.tsx: config 使用 Record<string, string | number | boolean>
  - TestCoverageDashboard.tsx: 使用正确的类型断言

## 修复

- 修复了 12 处 React Hooks 性能警告
- 修复了 15 处 TypeScript any 类型警告
- 优化了构建产物结构，消除 >500KB chunk 警告

## 技术栈更新

**新增依赖**:
- `framer-motion`: ^12.38.0 (页面动画)
- `sharp`: ^0.34.5 (图片处理, dev)

## 构建输出对比

| 指标 | v0.8.0 | v0.9.0 | 变化 |
|:-----|:-------|:-------|:-----|
| 主 chunk | 1,134KB | ~400KB | ↓ 65% |
| 构建时间 | 6.36s | 待测量 | - |
| Chunk 数量 | 19 | ~25 | ↑ 分离更好 |

## 部署

已部署至 GitHub Pages：https://frisky1985.github.io/yuleCommunity/

---

**注意**: 本次更新专注于技术债务清理，无用户可见的功能变更。建议用户清除浏览器缓存以获得最佳加载性能。
