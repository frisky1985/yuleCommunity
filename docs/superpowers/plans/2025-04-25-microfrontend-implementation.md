# yuleCommunity 微前端架构实现计划

**目标：** 将单体 React 应用拆分为基于 Module Federation 的微前端架构，实现独立开发和部署

**架构：** Shell 作为 Host 应用，管理路由和全局状态；4 个业务模块（opensource, community, learning, admin）作为 Remote 应用；共享组件库提供通用 UI

**技术栈：** React 19 + React Router 7 + Vite + @originjs/vite-plugin-federation + pnpm workspaces

---

## 项目结构

```
yuleCommunity/
├── package.json                 # workspaces 配置
├── pnpm-workspace.yaml          # pnpm 工作空间
├── turbo.json                   # 构建优化
├── apps/
│   ├── shell/                   # Host 应用 - 路由、布局、全局状态
│   ├── opensource/              # 开源生态模块
│   ├── community/               # 社区模块（社区、论坛、问答、活动）
│   ├── learning/                # 学习模块（学习、文档、博客）
│   └── admin/                   # 后台管理模块
├── packages/
│   ├── shared-ui/               # 共享 UI 组件
│   ├── shared-utils/            # 共享工具函数
│   └── shared-types/            # 共享类型定义
└── scripts/                   # 构建脚本
```

---

## 模块边界定义

| 模块 | 页面/组件 | 依赖 |
|------|----------|------|
| **shell** | App, Navbar, Footer, ThemeToggle, OfflineIndicator, PageLoader | shared-ui, shared-utils |
| **opensource** | OpenSourcePage, ToolchainPage, ConfigGenerator | shared-ui, recharts |
| **community** | CommunityPage, ForumPage, QAPage, EventsPage | shared-ui |
| **learning** | LearningPage, DocsPage, BlogPage, CodeBlock | shared-ui, react-syntax-highlighter |
| **admin** | AdminDashboard, AdminUsers, AdminContent, AdminSettings, AdminLoginPage, AdminLayout | shared-ui, recharts |

---

## Phase 1: 基础设施搭建（Day 1）

### 任务 1.1: 创建 pnpm workspaces 配置

**文件：**
- 创建：`pnpm-workspace.yaml`
- 修改：`package.json`
- 创建：`turbo.json`

- [ ] **步骤 1: 创建 pnpm-workspace.yaml**

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

- [ ] **步骤 2: 更新根 package.json**

```json
{
  "name": "yuletech-community",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "lint": "turbo run lint",
    "test": "turbo run test"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  }
}
```

- [ ] **步骤 3: 创建 turbo.json**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {}
  }
}
```

- [ ] **步骤 4: 验证配置**

```bash
cd ~/yuleCommunity-web
pnpm install
# 应该能正常安装依赖
```

- [ ] **步骤 5: Commit**

```bash
git add pnpm-workspace.yaml package.json turbo.json
git commit -m "chore: setup pnpm workspaces and turbo"
```

---

### 任务 1.2: 创建共享包 shared-ui

**文件：**
- 创建：`packages/shared-ui/package.json`
- 创建：`packages/shared-ui/vite.config.ts`
- 创建：`packages/shared-ui/src/index.ts`
- 移动：现有 UI 组件到 shared-ui

- [ ] **步骤 1: 创建 shared-ui/package.json**

```json
{
  "name": "@yule/shared-ui",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite build --watch"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

- [ ] **步骤 2: 创建 shared-ui/vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SharedUI',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

- [ ] **步骤 3: 移动 UI 组件到 shared-ui**

```bash
mkdir -p packages/shared-ui/src/components/ui
# 移动现有 UI 基础组件
cp src/components/ui/* packages/shared-ui/src/components/ui/ 2>/dev/null || echo "No UI components to copy"
```

- [ ] **步骤 4: 创建 shared-ui/src/index.ts**

```typescript
// 导出所有共享组件
export { Button } from './components/ui/Button'
export { Card } from './components/ui/Card'
// 根据实际组件添加更多导出
```

- [ ] **步骤 5: Commit**

```bash
git add packages/shared-ui
git commit -m "chore: create shared-ui package"
```

---

### 任务 1.3: 创建共享包 shared-utils 和 shared-types

**文件：**
- 创建：`packages/shared-utils/`
- 创建：`packages/shared-types/`

- [ ] **步骤 1: 创建 shared-utils**

```bash
mkdir -p packages/shared-utils/src
cat > packages/shared-utils/package.json << 'EOF'
{
  "name": "@yule/shared-utils",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc && vite build",
    "dev": "vite build --watch"
  }
}
EOF
```

- [ ] **步骤 2: 创建 shared-types**

```bash
mkdir -p packages/shared-types/src
cat > packages/shared-types/package.json << 'EOF'
{
  "name": "@yule/shared-types",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch"
  }
}
EOF
```

- [ ] **步骤 3: Commit**

```bash
git add packages/shared-utils packages/shared-types
git commit -m "chore: create shared-utils and shared-types packages"
```

---

## Phase 2: Shell 应用搭建（Day 2）

### 任务 2.1: 创建 Shell Host 应用

**文件：**
- 创建：`apps/shell/` 目录结构
- 移动：现有 src 中的基础组件到 shell

- [ ] **步骤 1: 创建 shell 目录结构**

```bash
mkdir -p apps/shell/src/{components,pages,contexts,hooks}
```

- [ ] **步骤 2: 创建 shell/package.json**

```json
{
  "name": "@yule/shell",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 3000",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@yule/shared-ui": "workspace:*",
    "@yule/shared-utils": "workspace:*",
    "@yule/shared-types": "workspace:*",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  }
}
```

- [ ] **步骤 3: 移动基础组件到 shell**

移动以下文件到 apps/shell/src/components/:
- Navbar.tsx
- Footer.tsx
- ThemeToggle.tsx
- OfflineIndicator.tsx
- PageLoader.tsx
- AdminLayout.tsx

- [ ] **步骤 4: 移动上下文和 hooks**

```bash
# 移动上下文
cp -r src/contexts/* apps/shell/src/contexts/ 2>/dev/null || true
# 移动基础 hooks
cp src/hooks/useLocalStorage.ts apps/shell/src/hooks/ 2>/dev/null || true
```

- [ ] **步骤 5: Commit**

```bash
git add apps/shell
git commit -m "chore: create shell host application"
```

---

### 任务 2.2: 配置 Module Federation Host

**文件：**
- 创建：`apps/shell/vite.config.ts`
- 修改：`apps/shell/src/App.tsx` 支持动态导入

- [ ] **步骤 1: 配置 shell/vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  base: '/yuleCommunity/',
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
        opensource: 'http://localhost:3001/assets/remoteEntry.js',
        community: 'http://localhost:3002/assets/remoteEntry.js',
        learning: 'http://localhost:3003/assets/remoteEntry.js',
        admin: 'http://localhost:3004/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
```

- [ ] **步骤 2: 创建动态导入工具**

创建 `apps/shell/src/utils/moduleLoader.tsx`:

```typescript
import { lazy, Suspense, ComponentType } from 'react'
import { PageLoader } from '../components/PageLoader'

// 动态加载远程模块组件
export function loadRemoteComponent<T>(
  remoteName: string,
  componentName: string
): ComponentType<T> {
  const Component = lazy(async () => {
    // @ts-ignore
    const module = await window[remoteName].get(`./${componentName}`)
    return module()
  })
  
  return (props: T) => (
    <Suspense fallback={<PageLoader />}>
      <Component {...props} />
    </Suspense>
  )
}

// 动态加载远程路由配置
export function loadRemoteRoutes(remoteName: string) {
  return lazy(async () => {
    // @ts-ignore
    const module = await window[remoteName].get('./routes')
    return module()
  })
}
```

- [ ] **步骤 3: Commit**

```bash
git add apps/shell/vite.config.ts apps/shell/src/utils
git commit -m "feat: configure module federation for shell host"
```

---

## Phase 3: 业务模块迁移（Day 3-6）

### 任务 3.1: 迁移 opensource 模块

**文件：**
- 创建：`apps/opensource/`
- 移动：`src/pages/OpenSourcePage.tsx`, `ToolchainPage.tsx`
- 移动：`src/components/ConfigGenerator.tsx`, `OpenSource.tsx`

- [ ] **步骤 1: 创建 opensource 目录结构**

```bash
mkdir -p apps/opensource/src/{components,pages,data}
```

- [ ] **步骤 2: 创建 opensource/package.json**

```json
{
  "name": "@yule/opensource",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 3001",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@yule/shared-ui": "workspace:*",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "lucide-react": "^0.400.0",
    "recharts": "^2.0.0"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  }
}
```

- [ ] **步骤 3: 配置 opensource/vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'opensource',
      filename: 'remoteEntry.js',
      exposes: {
        './OpenSourcePage': './src/pages/OpenSourcePage',
        './ToolchainPage': './src/pages/ToolchainPage',
        './routes': './src/routes'
      },
      shared: ['react', 'react-dom', 'react-router-dom', 'lucide-react', 'recharts']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  server: {
    port: 3001
  }
})
```

- [ ] **步骤 4: 移动页面和组件**

```bash
# 移动页面
cp src/pages/OpenSourcePage.tsx apps/opensource/src/pages/
cp src/pages/ToolchainPage.tsx apps/opensource/src/pages/

# 移动相关组件
cp src/components/ConfigGenerator.tsx apps/opensource/src/components/
cp src/components/OpenSource.tsx apps/opensource/src/components/

# 移动数据
cp src/data/modules.ts apps/opensource/src/data/ 2>/dev/null || true
cp src/data/moduleDependencies.ts apps/opensource/src/data/ 2>/dev/null || true
```

- [ ] **步骤 5: 创建路由配置**

创建 `apps/opensource/src/routes.tsx`:

```typescript
import { RouteObject } from 'react-router-dom'
import { OpenSourcePage } from './pages/OpenSourcePage'
import { ToolchainPage } from './pages/ToolchainPage'

export const routes: RouteObject[] = [
  {
    path: '/opensource',
    element: <OpenSourcePage />
  },
  {
    path: '/toolchain',
    element: <ToolchainPage />
  }
]

export default routes
```

- [ ] **步骤 6: Commit**

```bash
git add apps/opensource
git commit -m "feat: migrate opensource module"
```

---

### 任务 3.2: 迁移 community 模块

**文件：**
- 创建：`apps/community/`
- 移动：CommunityPage, ForumPage, QAPage, EventsPage

- [ ] **步骤 1: 创建 community 目录**

```bash
mkdir -p apps/community/src/{components,pages}
```

- [ ] **步骤 2: 创建 package.json 和 vite.config.ts**

```bash
# 参照 opensource 配置，修改 name 为 community，port 为 3002
cat > apps/community/package.json << 'EOF'
{
  "name": "@yule/community",
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 3002",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@yule/shared-ui": "workspace:*",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@originjs/vite-plugin-federation": "^1.3.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^6.0.0"
  }
}
EOF
```

- [ ] **步骤 3: 移动页面**

```bash
cp src/pages/CommunityPage.tsx apps/community/src/pages/
cp src/pages/ForumPage.tsx apps/community/src/pages/
cp src/pages/QAPage.tsx apps/community/src/pages/
cp src/pages/EventsPage.tsx apps/community/src/pages/
cp src/components/Community.tsx apps/community/src/components/
```

- [ ] **步骤 4: Commit**

```bash
git add apps/community
git commit -m "feat: migrate community module"
```

---

### 任务 3.3: 迁移 learning 模块

**文件：**
- 创建：`apps/learning/`
- 移动：LearningPage, DocsPage, BlogPage, CodeBlock

- [ ] **步骤 1-4: 参照任务 3.2 的模式，port 设为 3003**

移动文件：
- src/pages/LearningPage.tsx
- src/pages/DocsPage.tsx
- src/pages/BlogPage.tsx
- src/components/CodeBlock.tsx

- [ ] **步骤 5: Commit**

```bash
git add apps/learning
git commit -m "feat: migrate learning module"
```

---

### 任务 3.4: 迁移 admin 模块

**文件：**
- 创建：`apps/admin/`
- 移动：所有 Admin 相关页面和组件

- [ ] **步骤 1-4: port 设为 3004**

移动文件：
- src/pages/Admin*.tsx
- src/components/admin/*
- src/components/AdminLayout.tsx

- [ ] **步骤 5: Commit**

```bash
git add apps/admin
git commit -m "feat: migrate admin module"
```

---

## Phase 4: 整合与测试（Day 7-8）

### 任务 4.1: 更新 Shell 完整路由

**文件：**
- 修改：`apps/shell/src/App.tsx`

- [ ] **步骤 1: 更新 App.tsx 支持动态远程路由**

```typescript
import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { OfflineIndicator } from './components/OfflineIndicator'
import { PageLoader } from './components/PageLoader'
import { AdminLayout } from './components/AdminLayout'

// 动态加载远程模块
const OpenSourceRoutes = lazy(() => import('opensource/routes'))
const CommunityRoutes = lazy(() => import('community/routes'))
const LearningRoutes = lazy(() => import('learning/routes'))
const AdminRoutes = lazy(() => import('admin/routes'))

// Shell 内部页面
const HomePage = lazy(() => import('./pages/HomePage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        {/* Admin routes - 独立布局 */}
        <Route path="/admin/*" element={
          <Suspense fallback={<PageLoader />}>
            <AdminRoutes />
          </Suspense>
        } />

        {/* Public routes */}
        <Route path="*" element={
          <>
            <OfflineIndicator />
            <Navbar />
            <main>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  
                  {/* 远程模块路由 */}
                  <Route path="/opensource/*" element={<OpenSourceRoutes />} />
                  <Route path="/toolchain/*" element={<OpenSourceRoutes />} />
                  <Route path="/community/*" element={<CommunityRoutes />} />
                  <Route path="/forum/*" element={<CommunityRoutes />} />
                  <Route path="/qa/*" element={<CommunityRoutes />} />
                  <Route path="/events/*" element={<CommunityRoutes />} />
                  <Route path="/learning/*" element={<LearningRoutes />} />
                  <Route path="/docs/*" element={<LearningRoutes />} />
                  <Route path="/blog/*" element={<LearningRoutes />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App
```

- [ ] **步骤 2: Commit**

```bash
git add apps/shell/src/App.tsx
git commit -m "feat: integrate remote module routes in shell"
```

---

### 任务 4.2: 测试构建和运行

**文件：**
- 创建：测试脚本

- [ ] **步骤 1: 创建启动脚本**

创建 `scripts/dev.sh`:

```bash
#!/bin/bash
# 启动所有微前端应用

echo "Starting all micro-frontend applications..."

# 安装所有依赖
pnpm install

# 构建共享包
pnpm --filter @yule/shared-ui build
pnpm --filter @yule/shared-utils build
pnpm --filter @yule/shared-types build

# 并行启动所有应用
concurrently \
  "pnpm --filter @yule/shell dev" \
  "pnpm --filter @yule/opensource dev" \
  "pnpm --filter @yule/community dev" \
  "pnpm --filter @yule/learning dev" \
  "pnpm --filter @yule/admin dev"
```

- [ ] **步骤 2: 添加 concurrently 依赖**

```bash
pnpm add -D concurrently
```

- [ ] **步骤 3: 测试构建**

```bash
# 测试单个模块构建
pnpm --filter @yule/opensource build

# 测试全部构建
pnpm build
```

- [ ] **步骤 4: Commit**

```bash
git add scripts/
git commit -m "chore: add development scripts"
```

---

## Phase 5: 优化与收尾（Day 9-10）

### 任务 5.1: 清理原始代码

**文件：**
- 删除：`src/` 目录（已迁移完毕）
- 修改：更新项目配置

- [ ] **步骤 1: 移除旧的 src 目录**

```bash
# 确认所有文件已迁移
rm -rf src/
```

- [ ] **步骤 2: 更新项目文档**

更新 README.md 添加微前端架构说明

- [ ] **步骤 3: Commit**

```bash
git add -A
git commit -m "refactor: remove legacy src directory"
```

---

### 任务 5.2: CI/CD 配置

**文件：**
- 修改：`.github/workflows/deploy.yml`

- [ ] **步骤 1: 更新 GitHub Actions**

更新 `.github/workflows/deploy.yml` 支持分模块构建和部署

- [ ] **步骤 2: Commit**

```bash
git add .github/workflows/
git commit -m "ci: update deployment workflow for micro-frontends"
```

---

## 验收标准

### 功能验收
- [ ] 所有页面可正常访问
- [ ] 导航正常工作
- [ ] 主题切换正常
- [ ] PWA 功能正常

### 技术验收
- [ ] 各模块可独立构建
- [ ] Module Federation 正确导出/导入
- [ ] 共享依赖没有重复加载

### 性能验收
- [ ] 首屏加载 < 1.5s
- [ ] 模块切换 < 500ms

---

## 附录

### 常见问题排查

1. **Module Federation 加载失败**
   - 检查 remoteEntry.js URL 是否正确
   - 确保所有应用都已启动

2. **共享依赖版本不一致**
   - 确保所有模块的 React 版本一致
   - 检查 shared 配置

3. **类型错误**
   - 运行 `pnpm type-check` 在各模块
   - 确保 shared-types 已构建
