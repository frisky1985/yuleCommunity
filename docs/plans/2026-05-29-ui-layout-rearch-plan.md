# 商业化布局重构 实施计划

> **用于 Hermes：** 使用 subagent-driven-development 技能逐任务实施。

**目标：** 重构 yuleCommunity 导航和 DevHub 页面布局，提升商业化专业感和移动端体验。

**版本：** v1.6.0（导航重构）+ v1.7.0（布局统一+响应式）

**技术栈：** React 19, TailwindCSS, framer-motion, lucide-react, HashRouter

---

## Phase 1: 导航栏重构（基础依赖，先行执行）

### Task 1: 创建 MoreDropdown 组件

**Files：** Create `src/components/MoreDropdown.tsx`

桌面端「更多 ▼」下拉菜单，分组展示次级导航项：
```tsx
// 分组结构
const moreGroups = [
  { label: '开发工具', items: [
    { label: 'ASR配置', to: '/yuleasr', icon: Settings },
    { label: '工具链', to: '/toolchain', icon: Wrench },
  ]},
  { label: '资源中心', items: [
    { label: '文档中心', to: '/docs', icon: FileText },
    { label: '问答', to: '/qa', icon: HelpCircle },
    { label: '技术博客', to: '/blog', icon: BookOpen },
  ]},
  ...
];
```

交互行为：
- 点击「更多」显示/隐藏
- 点击外部关闭
- Escape 关闭
- 每个 item 可点击跳转
- 带图标+文字

### Task 2: 创建 MobileDrawer 组件

**Files：** Create `src/components/MobileDrawer.tsx`

右侧滑入面板（`fixed inset-0 z-50`），包含全部导航项：
- framer-motion 入场动画（`x: '100%' → 0`）
- 顶部搜索框
- 全部分类导航项（带图标）
- 底部用户信息/登录
- 遮罩层点击关闭
- 移动端专用（`md:hidden`）

### Task 3: 创建 BottomTabBar 组件

**Files：** Create `src/components/BottomTabBar.tsx`

固定在底部的 Tab Bar：
```tsx
const tabs = [
  { label: '首页', icon: Home, to: '/' },
  { label: '开发', icon: Code2, to: '/autosar' },
  { label: '开源', icon: Github, to: '/opensource' },
  { label: '社区', icon: Users, to: '/community' },
  { label: '我的', icon: User, to: '/profile' },
];
```

特征：
- `fixed bottom-0 inset-x-0` 固定底部
- `pb-safe` 适配 iPhone 底部安全区（env(safe-area-inset-bottom)）
- 选中态高亮（`text-primary` + 填充图标）
- 仅移动端显示（`md:hidden`）

### Task 4: 重构 Navbar

**Files：** Modify `src/components/Navbar.tsx`

变更：
- 导航项从 12 项精简为 5 项：开发者中心、开源代码、学习、论坛、更多 ▼
- 添加「更多 ▼」按钮引用 MoreDropdown
- 右侧添加「免费加入」CTA 按钮（渐变背景）
- 已登录显示头像（简化为首字母）
- 移动端只显示 Logo + 搜索 + 汉堡菜单图标（引用 MobileDrawer）
- 桌面端 `hidden md:flex`，移动端 `md:hidden`

### Task 5: 调整 App.tsx 布局

**Files：** Modify `src/App.tsx`

- 在 main 内容下方添加 `<BottomTabBar />`
- 确保 `pb-16` 防止底部 Tab Bar 遮挡内容

### Task 6: Index.css 底部安全区

**Files：** Modify `src/index.css`

```css
/* 底部安全区适配 */
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* 底部 Tab Bar 高度预留 */
@media (max-width: 767px) {
  main {
    padding-bottom: 4rem;
  }
}
```

---

## Phase 2: DevHub 布局统一

### Task 7: 创建 DevHubLayout

**Files：** Create `src/components/autosar/DevHubLayout.tsx`

```tsx
interface DevHubLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  backTo?: string;
}
```

统一结构：Header（返回+标题+面包屑）+ Children（内容）+ 统一间距

### Task 8: 更新 DevHub 子页面

**Files：** Modify `src/pages/autosar/DevHubPage.tsx`, `SpecBrowserPage.tsx`, `SpecComparePage.tsx`, `SandboxPage.tsx`, `RegistryPage.tsx`

- 替换各自独立的 Header 为 DevHubLayout
- 统一 `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- 移除冗余的边框样式

---

## Phase 3: Spec 浏览器移动端优化

### Task 9: 创建 SpecSheetNav

**Files：** Create `src/components/autosar/SpecSheetNav.tsx`

底部 Sheet 面板（替代两个 select）：
- framer-motion 滑动动画
- 拖动把手关闭
- 树形选择器（复用现有 SpecTreeNav 逻辑）
- 保留搜索功能

### Task 10: 集成到 SpecBrowserPage

**Files：** Modify `src/pages/autosar/SpecBrowserPage.tsx`

- 替换移动端的两个 `<select>` 为 SpecSheetNav
- 通过 state 控制 Sheet 的展开/关闭

---

## Phase 4: Sandbox 响应式

### Task 11: Sandbox 移动端 Tab 切换

**Files：** Modify `src/pages/autosar/SandboxPage.tsx`

- 移动端：编辑器在上，可视化在下
- 添加 Tab 切换按钮（CAN Bus / GPIO / Interrupts）
- 桌面端保持并排不变

---

## 提交策略

```
Phase 1:
  git add MoreDropdown.tsx MobileDrawer.tsx BottomTabBar.tsx Navbar.tsx App.tsx index.css
  git commit -m "feat(ui): restructure navbar with mega menu, mobile drawer, bottom tab bar"

Phase 2:
  git add DevHubLayout.tsx [page files]
  git commit -m "feat(ui): add unified DevHubLayout for sub-pages"

Phase 3:
  git add SpecSheetNav.tsx SpecBrowserPage.tsx
  git commit -m "feat(ui): add mobile sheet navigation for spec browser"

Phase 4:
  git add SandboxPage.tsx
  git commit -m "feat(ui): responsive sandbox with mobile tab switching"
```

## 验证

各 Phase 后运行：
```bash
npx tsc -b --noEmit 2>&1 | head -10
npx vitest run 2>&1 | tail -5
```

构建验证：
```bash
npx vite build 2>&1 | tail -5
```
