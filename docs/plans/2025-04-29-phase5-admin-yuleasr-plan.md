# Phase 5: 管理后台 + yuleASR 集成实施计划

## 1. 概述

### 1.1 目标
- 构建完整的 Admin 管理后台
- 实现 yuleASR Web 配置编辑器集成

### 1.2 技术栈
- 前端: React + TypeScript + Vite + shadcn/ui
- 后端: Node.js + Express + MongoDB + Redis (复用 yuleCommunity-cloud)
- 集成: yuleASR CLI/Core

### 1.3 里程碑
| 阶段 | 内容 | 工期 | 产出 |
|------|------|------|------|
| Phase 5A | 管理后台框架 + 用户管理 | 2周 | Admin Dashboard v1.0 |
| Phase 5B | 构建监控 + 系统统计 | 1周 | Admin Dashboard v1.1 |
| Phase 5C | yuleASR 项目/配置管理 | 2周 | yuleASR Web v1.0 |
| Phase 5D | 配置编辑器 + 构建集成 | 3周 | yuleASR Web v1.1 |

---

## 2. Phase 5A: 管理后台框架 (Week 1-2)

### 2.1 Task A1: 管理后台基础框架
**预估**: 4小时
**依赖**: 无

**工作内容**:
```
src/admin/
├── App.tsx              # Admin 根组件
├── routes.tsx           # 后台路由配置
├── components/
│   ├── Layout.tsx       # 侧边栏布局
│   ├── Header.tsx       # 顶部导航
│   ├── Sidebar.tsx      # 侧边栏菜单
│   ├── StatCard.tsx     # 统计卡片
│   └── DataTable.tsx    # 数据表格
└── stores/
    └── adminStore.ts    # 全局状态
```

**验收标准**:
- [ ] `/admin` 路由可访问
- [ ] 左侧菜单 + 顶部导航布局
- [ ] 暗黑模式支持
- [ ] 响应式布局

---

### 2.2 Task A2: 管理员认证系统
**预估**: 3小时
**依赖**: A1

**工作内容**:
- 创建 AdminLogin 页面
- JWT Token 管理
- 路由守卫
- 权限检查 (RBAC)

**后端 API**:
```typescript
POST /api/admin/login
GET /api/admin/me
POST /api/admin/logout
```

**验收标准**:
- [ ] 登录/登出功能正常
- [ ] Token 自动刷新
- [ ] 未登录重定向到登录页
- [ ] 权限不足显示 403

---

### 2.3 Task A3: 用户管理模块
**预估**: 5小时
**依赖**: A2

**工作内容**:
```
src/admin/pages/Users/
├── List.tsx    # 用户列表
└── Detail.tsx  # 用户详情
```

**功能**:
- 用户列表 (分页、搜索、筛选)
- 用户详情 (基本信息、构建历史、收藏)
- 批量操作 (启用/禁用/删除)
- 角色管理

**后端 API**:
```typescript
GET /api/admin/users?page&limit&search
GET /api/admin/users/:id
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
POST /api/admin/users/:id/ban
```

**验收标准**:
- [ ] 列表支持分页 (20/50/100)
- [ ] 搜索支持用户名/邮箱
- [ ] 详情页显示完整信息
- [ ] 批量操作成功反馈

---

### 2.4 Task A4: 仪表盘首页
**预估**: 3小时
**依赖**: A3

**工作内容**:
- 统计卡片 (用户总数/今日新增/构建数/文章数)
- 构建趋势图 (近7天)
- 最近注册用户列表
- 最近构建任务状态

**后端 API**:
```typescript
GET /api/admin/stats/overview
GET /api/admin/stats/build-trend?days=7
GET /api/admin/stats/recent-users
GET /api/admin/stats/recent-builds
```

**验收标准**:
- [ ] 统计数据实时更新
- [ ] 图表可交互
- [ ] 快捷操作入口

---

## 3. Phase 5B: 构建监控 (Week 3)

### 3.1 Task B1: 构建任务管理
**预估**: 4小时
**依赖**: A1

**工作内容**:
```
src/admin/pages/BuildJobs/
├── List.tsx    # 构建列表
└── Detail.tsx  # 构建详情
```

**功能**:
- 构建任务列表 (实时状态)
- 构建详情 (日志、产物)
- 重新构建/取消
- WebSocket 实时更新

**验收标准**:
- [ ] 状态实时刷新
- [ ] 日志实时推送
- [ ] 产物可下载

---

### 3.2 Task B2: 系统监控
**预估**: 3小时
**依赖**: B1

**工作内容**:
- 系统资源监控 (CPU/内存/存储)
- 构建队列状态
- 错误日志查看
- 告警配置

**验收标准**:
- [ ] 资源使用率图表
- [ ] 异常告警通知

---

## 4. Phase 5C: yuleASR 项目 (Week 4-5)

### 4.1 Task C1: yuleASR 路由与布局
**预估**: 2小时
**依赖**: 无

**工作内容**:
```
src/pages/yuleasr/
├── Projects/
│   ├── List.tsx
│   └── Create.tsx
├── Editor/
│   └── Index.tsx
└── Build/
    └── Console.tsx
```

**验收标准**:
- [ ] `/yuleasr` 路由可访问
- [ ] 独立布局 (非 admin 布局)

---

### 4.2 Task C2: 项目管理 CRUD
**预估**: 4小时
**依赖**: C1

**工作内容**:
- 项目列表页面
- 创建项目表单
- 项目详情/设置
- 删除确认

**数据模型**:
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  targetPlatform: string;
  compiler: string;
  status: 'active' | 'archived';
  currentVersion: number;
}
```

**后端 API**:
```typescript
POST /api/projects
GET /api/projects
GET /api/projects/:id
PUT /api/projects/:id
DELETE /api/projects/:id
```

**验收标准**:
- [ ] 项目 CRUD 完整
- [ ] 平台/编译器选择器
- [ ] 版本历史入口

---

### 4.3 Task C3: 配置版本管理
**预估**: 3小时
**依赖**: C2

**工作内容**:
- 版本历史列表
- 版本对比
- 回滚确认

**后端 API**:
```typescript
GET /api/projects/:id/versions
GET /api/projects/:id/diff?from=&to=
POST /api/projects/:id/rollback
```

**验收标准**:
- [ ] 版本列表显示时间/作者/备注
- [ ] 差异高亮显示
- [ ] 回滚确认对话框

---

## 5. Phase 5D: 配置编辑器 (Week 6-8)

### 5.1 Task D1: 模块树组件
**预估**: 3小时
**依赖**: C1

**工作内容**:
- 模块树展示
- 展开/折叠
- 选中状态
- 模块状态指示 (已配置/未配置)

**验收标准**:
- [ ] 树形结构正确
- [ ] 平滑动画
- [ ] 搜索过滤

---

### 5.2 Task D2: 参数表单组件
**预估**: 5小时
**依赖**: D1

**工作内容**:
参数类型支持:
- boolean: Switch
- integer/float: NumberInput
- string: TextInput
- enum: Select
- reference: 选择器
- array: 动态表格

**验收标准**:
- [ ] 各类型渲染正确
- [ ] 校验规则生效
- [ ] 帮助提示

---

### 5.3 Task D3: 配置编辑器主页面
**预估**: 4小时
**依赖**: D2

**工作内容**:
- 左侧模块树
- 右侧参数表单
- 工具栏 (保存/构建/撤销)
- 自动保存草稿

**验收标准**:
- [ ] 切换模块保留未保存修改
- [ ] 保存成功反馈
- [ ] 表单校验错误提示

---

### 5.4 Task D4: yuleASR 后端集成
**预估**: 6小时
**依赖**: D3

**工作内容**:
- 配置验证 API
- 代码生成调用
- 构建集成
- 产物管理

**后端实现**:
```typescript
// 配置验证
POST /api/yuleasr/validate

// 代码生成
POST /api/projects/:id/generate

// 构建
POST /api/projects/:id/build
WS /ws/builds/:id/logs
```

**验收标准**:
- [ ] 配置验证准确
- [ ] 代码生成成功
- [ ] 构建日志实时推送
- [ ] 产物可下载

---

## 6. 技术细节

### 6.1 后端扩展

**已有基础**: yuleCommunity-cloud
**需添加**:
```
yuleCommunity-cloud/
├── routes/
│   ├── admin.js         # 管理后台 API
│   └── yuleasr.js       # yuleASR API
├── models/
│   ├── AdminUser.js     # 管理员模型
│   ├── Project.js       # yuleASR 项目
│   └── ConfigVersion.js # 配置版本
└── services/
    ├── yuleasrService.js  # yuleASR 调用
    └── adminService.js    # 管理逻辑
```

### 6.2 数据库集合

```javascript
// Admin 用户
db.admin_users: {
  username: String,
  password: String,  // hashed
  role: String,      // super_admin/admin/operator/viewer
  lastLogin: Date,
  createdAt: Date
}

// yuleASR 项目
db.projects: {
  name: String,
  description: String,
  ownerId: ObjectId,
  targetPlatform: String,
  compiler: String,
  status: String,
  currentVersion: Number,
  createdAt: Date,
  updatedAt: Date
}

// 配置版本
db.config_versions: {
  projectId: ObjectId,
  version: Number,
  config: Object,
  comment: String,
  createdBy: ObjectId,
  createdAt: Date
}
```

### 6.3 环境变量

```bash
# 新增
ADMIN_JWT_SECRET=admin_secret_key
YULEASR_CLI_PATH=/usr/local/bin/yuleasr
YULEASR_WORKSPACE=/data/yuleasr
```

---

## 7. 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| yuleASR 接口不明确 | 中 | 高 | Phase 5C 前确认接口 |
| 配置编辑器复杂度高 | 中 | 中 | 先做 MVP，逐步迭代 |
| 构建环境不稳定 | 低 | 高 | 完善错误处理和重试 |
| 性能问题 (大配置) | 中 | 中 | 分页/懒加载/JSON 压缩 |

---

## 8. 验收总览

### 8.1 管理后台
- [ ] 管理员可登录后台
- [ ] 用户管理完整 CRUD
- [ ] 构建任务实时监控
- [ ] 仪表盘数据准确

### 8.2 yuleASR 集成
- [ ] 用户可创建 AutoSAR 项目
- [ ] 可配置至少 5 个模块
- [ ] 配置可保存版本
- [ ] 一键构建并下载产物
- [ ] 构建日志实时可见

---

## 9. 下一步行动

**老板需要确认**:
1. yuleASR 当前状态（已有代码/仅规划？）
2. 优先级：先做完整 Admin 还是并行？
3. 是否需要我立即开始 Phase 5A 开发？

**我可以立即开始**:
- Task A1: 管理后台框架 (4小时)
- Task C1: yuleASR 路由布局 (2小时)
