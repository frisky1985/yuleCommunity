# yuleCommunity 微前端架构重构设计文档

**Date:** 2025-04-25  
**Author:** OpenClaw Agent  
**Status:** 待审批  
**Version:** 1.0

---

## 1. 背景与动机

### 当前现状
- 单体应用，36个组件，708KB源码
- 主 chunk 661KB (gzip 187KB)·，首屏加载时间约 3s
- 四大功能模块耦合：开源生态、学习系统、Cloud IDE、企业功能
- 零测试覆盖，缺少架构文档

### 为什么需要微前端
1. **团队并行开发**: 四大模块可独立开发部署
2. **独立发布**: 企业功能可灰度发布，不影响开源模块
3. **技术栈演进**: 各模块可独立升级 React 版本
4. **性能优化**: 按需加载，首屏加载时间目标 < 1.5s

---

## 2. 目标

### 2.1 技术目标
- [ ] 将单体应用拆分为 5 个独立子应用（Shell + 4个业务模块）
- [ ] 首屏加载时间从 3s 降至 1.5s 以内
- [ ] 建立共享组件库和工具函数库
- [ ] 实现独立构建和部署流水线

### 2.2 业务目标
- [ ] 保持现有功能完全兼容
- [ ] 无感切换（用户不感知技术变化）
- [ ] 支持独立部署各业务模块

---

## 3. 架构设计

### 3.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                   yuleCommunity Shell                    │
│   (导航、路由、主题、用户状态、错误边界处理)        │
├─────────────────────────────────────────────────────────────┤
│  Module Federation Host                                  │
└─────────────────────────────────────────────────────────────┘
                           │
          ┌─────────────────┼─────────────────┼──────────────────┼───────────────────┐
          ▼                 ▼                    ▼                   ▼
┌─────────────────┐   ┌─────────────────┐   ┌──────────────────┐   ┌───────────────────┐
│ opensrc       │   │ learning        │   │ ide               │   │ enterprise        │
│ ─────────────  │   │ ─────────────  │   │ ─────────────   │   │ ────────────── │
│ ModuleList    │   │ LearningPage    │   │ CloudIDE          │   │ TeamWorkspace     │
│ ModuleDetail  │   │ PathDetail      │   │ MonacoEditor      │   │ SSOSettings       │
│ DependencyView│   │ MyLearning      │   │ FileExplorer      │   │ PrivateRegistry   │
│ ToolchainView │   │ Achievement     │   │ Terminal          │   │ AnalyticsDashboard│
│               │   │                 │   │ BuildPanel        │   │                   │
│ ~180KB        │   │ ~150KB          │   │ ~250KB (Monaco)   │   │ ~200KB            │
└─────────────────┘   └─────────────────┘   └──────────────────┘   └───────────────────┘
│  Module Federation Remote                                │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 技术选型

| 技术 | 选择 | 理由 |
|------|------|------|
| 微前端方案 | **Webpack Module Federation** | 成熟、React生态兼容好、支持共享依赖 |
| 构建工具 | **Vite + @originjs/vite-plugin-federation** | 保持 Vite 快速构建，兼容 MF |
| 包管理器 | **pnpm workspaces** | 高效的依赖共享和管理 |
| 共享依赖 | **React 19**, **React Router 7**, **Tailwind CSS** | 单例模式，避免重复加载 |

### 3.3 目录结构

```
yuleCommunity/
├── package.json                 # 根级配置，workspaces 定义
├── pnpm-workspace.yaml          # pnpm 工作空间配置
├── turbo.json                   # 构建优化
├── apps/
│   ├── shell/                   # 主应用（Host）
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   ├── App.tsx      # 路由和动态导入
│   │   │   ├── bootstrap.tsx
│   │   │   └── main.tsx
│   │   └── package.json
│   ├── opensrc/                 # 开源生态模块
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   ├── index.tsx    # 模块导出
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   └── ...
│   │   └── package.json
│   ├── learning/                # 学习认证模块
│   │   └── ...
│   ├── ide/                     # Cloud IDE 模块
│   │   └── ...
│   └── enterprise/              # 企业功能模块
│       └── ...
├── packages/
│   ├── shared-ui/               # 共享 UI 组件库
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   ├── Card/
│   │   │   │   ├── Modal/
│   │   │   │   ├── Table/
│   │   │   │   └── ...
│   │   │   └── index.ts
│   │   └── package.json
│   ├── shared-utils/            # 共享工具函数
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   ├── helpers/
│   │   │   └── constants/
│   │   └── package.json
│   └── shared-types/            # 共享类型定义
│       ├── src/
│       │   ├── ide.ts
│       │   ├── learning.ts
│       │   ├── ai.ts
│       │   └── index.ts
│       └── package.json
└── docs/
    └── architecture/
        └── module-boundaries.md   # 模块边界定义
```

---

## 4. 模块界面定义

### 4.1 Shell 导出

```typescript
// shared-ui 导出
export { Button, Card, Modal, Table, Badge } from './components';
export { useTheme, useToast, useAuth } from './hooks';
export { ThemeProvider } from './providers';

// shared-utils 导出
export { cn, formatDate, debounce } from './helpers';
export { useLocalStorage, useMediaQuery } from './hooks';

// shared-types 导出
export type { IDEFileNode, TeamMember, LearningPath } from './types';
```

### 4.2 业务模块导出

每个模块需要导出 `index.tsx`，定义自己的路由配置：

```typescript
// apps/opensrc/src/index.tsx
export const routes = [
  { path: '/', element: ModuleList },
  { path: '/:layer/:module', element: ModuleDetail },
  { path: '/dependency-graph', element: ModuleDependencyView },
];

export const menu = {
  id: 'opensrc',
  label: '开源生态',
  icon: Package,
  path: '/',
};

export const permissions = ['module:read', 'module:download'];
```

---

## 5. 数据流

### 5.1 用户状态共享

```typescript
// 全局状态由 Shell 管理
interface GlobalState {
  user: User | null;
  theme: 'light' | 'dark' | 'system';
  locale: 'zh' | 'en';
  // 通过 React Context 传递
}

// 业务状态由各模块自己管理
// 使用 消息通讯 或 全局事件 跨模块通信
```

### 5.2 模块间通信

```typescript
// 方案 1: 自定义事件
customEventBus.emit('module:installed', { moduleId, version });

// 方案 2: 共享 React Context (通过 Shell 投递)
<SharedContext.Provider value={sharedState}>
  <RemoteModule />
</SharedContext.Provider>

// 方案 3: 路由参数
navigate('/ide', { state: { filePath: '/workspace/project/main.c' } });
```

---

## 6. 构建与部署

### 6.1 构建流水线

```bash
# 本地开发 - 启动所有服务
pnpm dev              # 使用 turborepo 并行启动

# 单独开发某模块
cd apps/opensrc
pnpm dev              # 只启动本模块

# 生产构建
pnpm build            # 构建所有模块
pnpm build:opensrc    # 只构建 opensrc 模块

# 测试
pnpm test             # 运行所有测试
```

### 6.2 部署策略

```yaml
# GitHub Actions 工作流
name: Deploy

on:
  push:
    branches: [main]

jobs:
  detect-changes:
    # 检测哪些模块有变更
    outputs:
      shell: ${{ steps.changes.outputs.shell }}
      opensrc: ${{ steps.changes.outputs.opensrc }}
      # ...

  deploy-shell:
    needs: detect-changes
    if: needs.detect-changes.outputs.shell == 'true'
    # 部署主应用

  deploy-opensrc:
    needs: detect-changes
    if: needs.detect-changes.outputs.opensrc == 'true'
    # 只部署 opensrc 模块
```

---

## 7. 测试策略

### 7.1 测试金字塔

```
       /\
      /  \
     / E2E\      (Playwright - 关键流程)
    /------\
   /Integration\  (组件交互测试)
  /--------------\
 /  Unit Tests    \ (Vitest - 组件逻辑)
/------------------
```

### 7.2 测试分布

| 类型 | 覆盖模块 | 责任人 |
|------|----------|---------|
| 单元测试 | shared-ui, shared-utils | 各模块维护者 |
| 组件测试 | 所有组件 | 各模块维护者 |
| 集成测试 | 模块间交互 | Shell 团队 |
| E2E | 关键用户路径 | QA 团队 |

---

## 8. 迁移计划

### 阶段 1: 基础设施（Day 1-2）
- [ ] 创建 pnpm workspaces 结构
- [ ] 配置 Turbo 和 Vite Federation
- [ ] 创建 shared-前缀的三个共享包
- [ ] 初始化 Shell 主应用

### 阶段 2: 模块拆分（Day 3-5）
- [ ] 将 opensrc 移至 apps/opensrc
- [ ] 将 learning 移至 apps/learning
- [ ] 将 ide 移至 apps/ide
- [ ] 将 enterprise 移至 apps/enterprise
- [ ] 抽取通用组件到 shared-ui

### 阶段 3: 整合测试（Day 6-7）
- [ ] 配置 Module Federation
- [ ] 测试动态导入
- [ ] 测试共享依赖
- [ ] 测试构建与部署

### 阶段 4: 优化（Day 8-10）
- [ ] 性能测试与优化
- [ ] 补充测试用例
- [ ] 更新文档
- [ ] 集成到 CI/CD

---

## 9. 风险与应对

| 风险 | 概率 | 影响 | 应对措施 |
|------|------|------|---------|
| 构建失败 | 中 | 高 | 分阶段迁移，保持原仓库可用 |
| 依赖冲突 | 中 | 中 | 严格的依赖版本管理 |
| 性能回退 | 低 | 高 | 性能基准测试，严格的门禁 |
| 工期延误 | 中 | 中 | 分阶段交付，MVP 优先 |

---

## 10. 验收标准

### 10.1 功能验收
- [ ] 所有现有功能正常工作
- [ ] 各模块可独立构建
- [ ] 动态导入无错误
- [ ] 共享依赖没有重复加载

### 10.2 性能验收
- [ ] 首屏加载 < 1.5s
- [ ] 交互响应 < 100ms
- [ ] 模块切换 < 500ms

### 10.3 代码质量验收
- [ ] 测试覆盖率 > 60%
- [ ] TypeScript 类型检查通过
- [ ] ESLint 无错误

---

## 11. 附录

### 11.1 相关文档
- [Module Federation 官方文档](https://webpack.js.org/concepts/module-federation/)
- [Vite Federation Plugin](https://github.com/originjs/vite-plugin-federation)
- [pnpm Workspaces](https://pnpm.io/workspaces)

### 11.2 术语表
| 术语 | 解释 |
|------|------|
| Module Federation | Webpack 5+ 的微前端架构方案 |
| Host | 主应用，负责动态加载远程模块 |
| Remote | 远程模块，可被 Host 动态导入 |
| Workspace | pnpm 的多包管理功能 |
| Shared Dependencies | 多模块共享的依赖库 |
