# Phase 5 优化计划 - 管理后台 + 用户系统

## 1. 背景调整

### 1.1 范围调整
- ✅ **管理后台**: 完整开发 (2周)
- ✅ **用户系统**: 收藏/积分数据云端化 (1周)
- ❌ **yuleASR Web 化**: 取消 - 作为基础软件项目展示

### 1.2 重点目标
1. 运营人员可通过后台管理用户和监控系统
2. 用户收藏/积分从 localStorage 迁移到服务器
3. 支撑未来用户增长和数据分析

---

## 2. 阶段一：管理后台框架 (Week 1)

### Task 1.1: Admin 基础路由与布局
**预估**: 4小时
**依赖**: 无

**工作内容**:
```
src/
└── admin/
    ├── App.tsx              # Admin 根组件
    ├── routes.tsx           # 后台路由
    ├── components/
    │   ├── Layout.tsx       # 布局组件
    │   ├── Sidebar.tsx      # 侧边栏导航
    │   ├── Header.tsx       # 顶部栏
    │   ├── StatCard.tsx     # 统计卡片
    │   └── DataTable.tsx    # 通用数据表
    ├── pages/
    │   └── Dashboard.tsx    # 仪表盘
    └── stores/
        └── adminStore.ts    # 状态管理
```

**路由设计**:
```typescript
/admin             → 重定向 /admin/dashboard
/admin/login       → 登录页
/admin/dashboard   → 仪表盘
/admin/users       → 用户管理
/admin/builds      → 构建监控
/admin/content     → 内容管理
/admin/settings    → 系统设置
```

**验收标准**:
- [ ] `/admin` 路径访问正常
- [ ] 响应式布局 (桌面端侧边栏 + 移动端底部栏)
- [ ] 暗黑模式自适应
- [ ] 菜单折叠/展开

---

### Task 1.2: 管理员认证系统
**预估**: 3小时
**依赖**: Task 1.1

**工作内容**:
- AdminLogin 页面
- JWT Token 管理（access + refresh）
- 路由守卫 (ProtectedRoute)
- Token 过期自动跳转

**后端需要**:
```javascript
// yuleCommunity-cloud 添加
POST   /api/admin/login
POST   /api/admin/refresh
POST   /api/admin/logout
GET    /api/admin/me
```

**验收标准**:
- [ ] 登录成功获取 token
- [ ] 未登录访问 /admin/dashboard 重定向到 /admin/login
- [ ] Token 过期后自动登出
- [ ] 多标签页同步登录状态

---

### Task 1.3: 仪表盘页面
**预估**: 3小时
**依赖**: Task 1.2

**功能**:
- 统计卡片组件 (4个核心指标)
- 构建趋势图 (近7天)
- 最近用户/构建列表

**统计数据**:
```typescript
interface DashboardStats {
  users: { total: number; today: number; active: number };
  builds: { total: number; today: number; successRate: number };
  articles: { total: number; pending: number };
  storage: { used: number; total: number };
}
```

**后端需要**:
```javascript
GET /api/admin/stats/overview
GET /api/admin/stats/trends?days=7
GET /api/admin/stats/recent-users?limit=5
GET /api/admin/stats/recent-builds?limit=5
```

**验收标准**:
- [ ] 4 个统计卡片正确显示
- [ ] 趋势图支持交互
- [ ] 列表数据实时更新

---

## 3. 阶段二：用户管理 (Week 1-2)

### Task 2.1: 用户列表页面
**预估**: 4小时
**依赖**: Task 1.3

**功能**:
- 表格列表 (ID, 用户名, 邮箱, 角色, 状态, 注册时间)
- 分页 (20/50/100 每页)
- 搜索 (用户名/邮箱模糊搜索)
- 筛选 (角色、状态)
- 排序 (时间、用户名)

**批量操作**:
- 批量选中复选框
- 批量启用/禁用
- 批量删除（软删除）

**后端需要**:
```javascript
GET    /api/admin/users?page&limit&search&role&status&sort
PUT    /api/admin/users/:id/status  // 启用/禁用
DELETE /api/admin/users/:id         // 软删除
POST   /api/admin/users/batch       // 批量操作
```

**验收标准**:
- [ ] 表格支持 1000+ 行不卡顿
- [ ] 搜索响应 < 300ms
- [ ] 批量操作成功提示

---

### Task 2.2: 用户详情页面
**预估**: 3小时
**依赖**: Task 2.1

**功能**:
- 基本信息编辑
- 角色管理
- 构建历史列表
- 收藏列表 (只读)
- 积分记录

**页面结构**:
```
用户详情 - 张三
┌────────────────────────────────────┐
│ 头像  用户名  编辑资料                 │
│       邮箱: xxx@example.com                       │
│       状态: 正常                                │
├────────────────────────────────────┤
│  基本信息  |  构建历史  |  收藏  |  积分       │
└────────────────────────────────────┘
```

**后端需要**:
```javascript
GET /api/admin/users/:id
PUT /api/admin/users/:id
GET /api/admin/users/:id/builds
GET /api/admin/users/:id/bookmarks
GET /api/admin/users/:id/points
```

**验收标准**:
- [ ] Tab 切换保留状态
- [ ] 构建/收藏列表支持分页
- [ ] 编辑保存成功提示

---

### Task 2.3: 权限系统 RBAC
**预估**: 2小时
**依赖**: Task 2.2

**角色定义**:
```typescript
const ROLES = {
  super_admin: { label: '超级管理员', permissions: ['*'] },
  admin: { label: '管理员', permissions: ['users.*', 'content.*', 'stats.view'] },
  operator: { label: '运营', permissions: ['builds.*', 'stats.view', 'users.view'] },
  viewer: { label: '查看者', permissions: ['users.view', 'stats.view', 'builds.view'] },
};
```

**权限控制层级**:
1. 路由层面：无权限跳转 403
2. 菜单层面：无权限隐藏入口
3. 按钮层面：无权限禁用按钮
4. API 层面：后端统一鉴权

**验收标准**:
- [ ] 不同角色看到不同菜单
- [ ] 无权限操作显示 403
- [ ] 后端接口鉴权生效

---

## 4. 阶段三：构建监控 (Week 2)

### Task 3.1: 构建任务列表
**预估**: 3小时
**依赖**: Task 1.3

**功能**:
- 构建任务表格
- 状态实时刷新 (WebSocket 或轮询)
- 重新构建/取消操作
- 筛选（状态、平台、日期）

**状态颜色**:
```typescript
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  running: 'bg-blue-100 text-blue-800 animate-pulse',
  success: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
};
```

**后端需要**:
```javascript
GET    /api/admin/builds?page&limit&status&platform
POST   /api/admin/builds/:id/retry
DELETE /api/admin/builds/:id/cancel
```

**验收标准**:
- [ ] 状态变化实时反馈 (< 3s延迟)
- [ ] 平台/状态筛选正确
- [ ] 重新构建成功

---

### Task 3.2: 构建详情与日志
**预估**: 3小时
**依赖**: Task 3.1

**功能**:
- 构建详情面板
- 实时日志流 (SSE/WebSocket)
- 日志高亮 (ERROR/WARNING/SUCCESS)
- 产物下载

**日志组件特性**:
- 自动滚动到底部
- 日志级别过滤
- 搜索关键词
- 一键复制

**后端需要**:
```javascript
GET /api/admin/builds/:id
WS  /ws/builds/:id/logs  // 或 SSE
GET /api/admin/builds/:id/download
```

**验收标准**:
- [ ] 日志实时推送
- [ ] 错误红色高亮
- [ ] 大日志文件 (数 MB) 流式加载

---

## 5. 阶段四：用户系统云端化 (Week 2-3)

### Task 4.1: 收藏/积分数据模型
**预估**: 2小时
**依赖**: 无

**后端 MongoDB Schema**:
```javascript
// 收藏模型
db.bookmarks: {
  userId: ObjectId,
  articleId: String,
  article: {
    title: String,
    slug: String,
    description: String,
    category: String,
    author: { id: String, name: String }
  },
  bookmarkedAt: Date
}

// 积分模型
db.user_points: {
  userId: ObjectId,
  total: Number,
  history: [{
    action: String,
    points: Number,
    description: String,
    createdAt: Date
  }]
}
```

**后端需要**:
```javascript
GET    /api/user/bookmarks
POST   /api/user/bookmarks
DELETE /api/user/bookmarks/:id
GET    /api/user/points
GET    /api/user/points/history
```

---

### Task 4.2: 前端收藏组件改造
**预估**: 3小时
**依赖**: Task 4.1

**改造内容**:
- `useBookmarks` hook 增加 API 调用
- 未登录用户使用 localStorage
- 登录用户同步到服务器
- 登录后合并本地和云端收藏

**同步策略**:
```typescript
// 登录后合并
const mergeBookmarks = (local: Bookmark[], remote: Bookmark[]) => {
  const merged = [...remote];
  local.forEach(localItem => {
    if (!remote.find(r => r.articleId === localItem.articleId)) {
      merged.push(localItem);
      // 后台添加
      api.addBookmark(localItem);
    }
  });
  return merged;
};
```

**验收标准**:
- [ ] 未登录 localStorage 正常
- [ ] 登录后收藏同步
- [ ] 多端同步一致

---

### Task 4.3: 积分系统完善
**预估**: 2小时
**依赖**: Task 4.2

**积分规则**:
```typescript
const POINTS_RULES = {
  'article.read': { points: 1, dailyLimit: 10 },
  'article.like': { points: 2, dailyLimit: 20 },
  'article.bookmark': { points: 3, dailyLimit: 10 },
  'comment.post': { points: 5, dailyLimit: 10 },
  'build.success': { points: 10, dailyLimit: 5 },
  'pr.merged': { points: 50 },
  'article.published': { points: 100 },
};
```

**功能**:
- 积分变动记录
- 每日限额控制
- 积分排行榜

**验收标准**:
- [ ] 积分正确计算
- [ ] 每日限额生效
- [ ] 排行榜更新及时

---

## 6. 技术实现细节

### 6.1 Admin 路由集成

**主站 App.tsx 修改**:
```typescript
// 懒加载 Admin 模块
const AdminApp = lazy(() => import('./admin/App'));

<Route path="/admin/*" element={
  <Suspense fallback={<AdminLoading />}>
    <AdminApp />
  </Suspense>
} />
```

### 6.2 后端扩展

**复用 yuleCommunity-cloud**:
```
yuleCommunity-cloud/
├── routes/
│   ├── admin/
│   │   ├── auth.js      # 登录/鉴权
│   │   ├── users.js     # 用户管理
│   │   ├── builds.js    # 构建监控
│   │   └── stats.js     # 统计数据
│   └── user/
│       ├── bookmarks.js # 用户收藏
│       └── points.js    # 用户积分
├── middleware/
│   └── adminAuth.js     # 管理员鉴权
└── models/
    ├── AdminUser.js
    ├── Bookmark.js
    └── UserPoints.js
```

### 6.3 环境配置

```bash
# .env (yuleCommunity-web)
VITE_API_BASE_URL=https://api.yulecommunity.com
VITE_ADMIN_API_URL=https://api.yulecommunity.com/admin

# .env (yuleCommunity-cloud)
ADMIN_JWT_SECRET=admin_secret_key_here
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 7. 总体验收标准

### 管理后台
- [ ] 管理员可登录并看到仪表盘
- [ ] 用户列表支持搜索、筛选、批量操作
- [ ] 用户详情可查看构建/收藏/积分
- [ ] 构建监控实时刷新
- [ ] 构建日志可实时查看

### 用户系统
- [ ] 登录用户收藏持久化到服务器
- [ ] 未登录用户使用 localStorage
- [ ] 登录后自动合并数据
- [ ] 积分系统正确计算每日限额

---

## 8. 时间表

| 周 | 任务 | 产出 |
|-----|------|------|
| Week 1 | Task 1.1-1.3, 2.1 | Admin 框架 + 仪表盘 + 用户列表 |
| Week 2 | Task 2.2-2.3, 3.1-3.2, 4.1-4.3 | 完整后台 + 用户系统 |
| Week 3 | 测试优化 | 上线验收 |

---

## 9. 立即开始？

是否立即开始 Phase 5 开发？

**可立即执行**:
- Task 1.1: Admin 基础路由与布局 (4小时)
- Task 4.1: 收藏/积分数据模型 (2小时)

**需要先做**:
- yuleCommunity-cloud 后端扩展 (我可以同时处理)
