# 管理后台系统设计文档

## 1. 概述

### 1.1 目标
为 yuleCommunity 平台构建管理后台，支持运营人员管理用户、监控构建任务、查看系统数据。

### 1.2 范围
- **Phase 1**: 基础管理后台框架 + 用户管理
- **Phase 2**: 构建任务监控 + 系统统计
- **Phase 3**: 内容管理（博客、文档审核）

### 1.3 技术选型
| 组件 | 选型 | 理由 |
|------|------|------|
| 前端框架 | React + Vite | 与主站技术栈一致 |
| UI 组件库 | shadcn/ui + Tailwind | 已有的设计系统 |
| 状态管理 | Zustand | 轻量，适合后台 |
| 数据获取 | TanStack Query | 缓存、分页、实时更新 |
| 图表 | Recharts | 已有依赖 |
| 路由 | React Router | 与主站一致 |

## 2. 架构设计

### 2.1 部署方式
```
独立部署方案（推荐）:
/admin 路径 → 独立构建包 → 独立部署

或

内嵌方案:
主站 /admin/* 路由 → 懒加载 Admin 模块 → 统一构建
```

**决策**: 采用内嵌方案，通过 `/admin` 路由访问，但代码分离（懒加载）

### 2.2 目录结构
```
src/
├── admin/                    # 管理后台模块
│   ├── App.tsx              # Admin 根组件
│   ├── routes.tsx           # 后台路由配置
│   ├── components/          # 后台专用组件
│   │   ├── Layout.tsx       # 侧边栏布局
│   │   ├── Header.tsx       # 顶部导航
│   │   ├── StatCard.tsx     # 统计卡片
│   │   ├── DataTable.tsx    # 数据表格
│   │   └── Sidebar.tsx      # 侧边栏菜单
│   ├── pages/               # 后台页面
│   │   ├── Dashboard.tsx    # 仪表盘
│   │   ├── Users/           # 用户管理
│   │   │   ├── List.tsx
│   │   │   └── Detail.tsx
│   │   ├── BuildJobs/       # 构建任务
│   │   │   ├── List.tsx
│   │   │   └── Detail.tsx
│   │   ├── Content/         # 内容管理
│   │   └── Settings/        # 系统设置
│   ├── hooks/               # 后台专用 hooks
│   │   ├── useAdminAuth.ts
│   │   └── useStats.ts
│   └── stores/              # 状态管理
│       └── adminStore.ts
```

## 3. 页面设计

### 3.1 登录页
- 简单的账号密码登录
- 支持"记住我"
- 登录后跳转到仪表盘

### 3.2 布局
```
┌─────────────────────────────────────────────┐
│  Logo                    通知   头像  退出    │  Header (64px)
├──────────┬──────────────────────────────────┤
│          │                                   │
│  仪表盘   │                                   │
│  用户管理 │         内容区域                    │
│  构建任务 │         (动态路由)                  │
│  内容管理 │                                   │
│  系统设置 │                                   │
│          │                                   │
└──────────┴──────────────────────────────────┘
   Sidebar    Main Content
   (240px)    (calc(100% - 240px))
```

### 3.3 仪表盘
**组件**:
- 统计卡片（用户数、今日构建数、文章数、在线人数）
- 构建趋势图（近7天）
- 最近注册用户列表
- 最近构建任务状态

### 3.4 用户管理
**列表页**:
- 表格：ID、用户名、邮箱、角色、状态、注册时间、操作
- 搜索：用户名/邮箱
- 筛选：角色、状态
- 分页：每页 20/50/100
- 批量操作：启用/禁用/删除

**详情页**:
- 基本信息编辑
- 构建历史
- 收藏列表（只读）
- 积分记录

### 3.5 构建任务监控
**列表页**:
- 实时状态更新（WebSocket）
- 表格：任务ID、用户、项目、状态、平台、耗时、操作
- 筛选：状态、平台、日期范围
- 操作：查看日志、重新构建、取消

**详情页**:
- 任务基本信息
- 实时日志（WebSocket 流）
- 构建产物下载
- 错误分析

## 4. API 设计

### 4.1 认证
```typescript
POST /api/admin/login
Request: { username: string, password: string }
Response: { token: string, user: AdminUser }

POST /api/admin/logout
Headers: Authorization: Bearer {token}
Response: { success: boolean }

GET /api/admin/me
Headers: Authorization: Bearer {token}
Response: { user: AdminUser }
```

### 4.2 用户管理
```typescript
GET /api/admin/users?page=1&limit=20&search=&role=&status=
Response: { users: User[], total: number, page: number }

GET /api/admin/users/:id
Response: { user: UserDetail }

PUT /api/admin/users/:id
Request: Partial<User>
Response: { user: User }

DELETE /api/admin/users/:id
Response: { success: boolean }

POST /api/admin/users/:id/ban
Request: { reason: string, duration: number }
Response: { success: boolean }
```

### 4.3 构建任务
```typescript
GET /api/admin/build-jobs?page=1&limit=20&status=&platform=
Response: { jobs: BuildJob[], total: number }

GET /api/admin/build-jobs/:id
Response: { job: BuildJobDetail }

POST /api/admin/build-jobs/:id/retry
Response: { job: BuildJob }

DELETE /api/admin/build-jobs/:id/cancel
Response: { success: boolean }

GET /api/admin/build-jobs/:id/logs
Response: Stream (SSE/WebSocket)
```

### 4.4 统计数据
```typescript
GET /api/admin/stats/overview
Response: {
  users: { total: number, today: number, active: number },
  builds: { total: number, today: number, success: number },
  articles: { total: number, pending: number },
  storage: { used: number, total: number }
}

GET /api/admin/stats/build-trend?days=7
Response: { dates: string[], counts: number[] }
```

## 5. 权限设计

### 5.1 角色定义
| 角色 | 权限 |
|------|------|
| super_admin | 所有权限 |
| admin | 用户管理、内容管理、查看统计 |
| operator | 构建任务管理、查看统计 |
| viewer | 只读访问 |

### 5.2 权限控制
- 路由级别：未登录跳登录页，无权限显示403
- 组件级别：无权限隐藏操作按钮
- API级别：后端统一鉴权

## 6. 状态管理

```typescript
// adminStore.ts
interface AdminState {
  // 认证
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  
  // 全局状态
  sidebarCollapsed: boolean;
  notifications: Notification[];
  
  // 方法
  login: (credentials) => Promise<void>;
  logout: () => void;
  fetchCurrentUser: () => Promise<void>;
  toggleSidebar: () => void;
}
```

## 7. 组件规格

### 7.1 DataTable 组件
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
  };
  selection?: {
    selectedKeys: string[];
    onChange: (keys: string[]) => void;
  };
  actions?: (record: T) => ReactNode;
}
```

### 7.2 StatCard 组件
```typescript
interface StatCardProps {
  title: string;
  value: number | string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  icon: ReactNode;
  color: string;
}
```

## 8. 待决策事项

1. **是否独立部署**：内嵌 vs 独立域名
2. **认证方式**：简单账号密码 vs SSO
3. **实时数据轮询间隔**：30s vs WebSocket
4. **数据导出**：是否需要导出 Excel 功能

## 9. 验收标准

- [ ] 登录/登出功能正常
- [ ] 仪表盘数据准确
- [ ] 用户列表支持搜索、筛选、分页
- [ ] 构建任务实时监控
- [ ] 权限控制生效
- [ ] 响应式布局（支持移动端查看）
