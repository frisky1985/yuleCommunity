# yuleASR 集成设计文档

## 1. 概述

### 1.1 目标
将 yuleASR（AutoSAR 配置工具）能力集成到 yuleCommunity 平台，提供 Web 端的可视化配置编辑、云端构建、配置管理一体化体验。

### 1.2 背景
yuleASR 目前可能是：
- 桌面端工具（待确认）
- 配置文件格式（.arxml/.json/.xdm）
- 代码生成器

### 1.3 集成愿景
```
用户流程：
登录 → 创建项目 → 可视化配置 AutoSAR 模块 → 云端构建 → 下载产物
              ↓
         配置版本管理、分享、复用
```

## 2. 架构方案

### 2.1 方案对比

| 方案 | 描述 | 优点 | 缺点 | 推荐度 |
|------|------|------|------|--------|
| A. 完全 Web 化 | 重写 yuleASR 为 Web 应用 | 体验统一、易维护 | 工作量大、周期长 | ⭐⭐ |
| B. 配置编辑器 | Web 只做配置编辑，后端调用 yuleASR CLI | 复用核心逻辑 | 需要服务器资源 | ⭐⭐⭐⭐ |
| C. 文件上传 | 用户上传 yuleASR 生成的配置文件 | 实现简单 | 体验差、门槛高 | ⭐⭐ |

**推荐方案 B**: Web 配置编辑器 + yuleASR CLI 后端调用

### 2.2 系统架构
```
┌────────────────────────────────────────────────────────────┐
│                    Web 前端 (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ 项目列表      │  │ 配置编辑器    │  │ 构建控制台    │     │
│  │              │  │              │  │              │     │
│  │ - 新建项目    │  │ - 模块树      │  │ - 构建按钮    │     │
│  │ - 导入配置    │  │ - 参数表单    │  │ - 实时日志    │     │
│  │ - 版本历史    │  │ - 可视化编辑  │  │ - 产物下载    │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└────────────────────────┬───────────────────────────────────┘
                         │ HTTP / WebSocket
┌────────────────────────▼───────────────────────────────────┐
│                 API Gateway (Express)                       │
│                    - 认证/授权                               │
│                    - 路由转发                                │
└────────────────────────┬───────────────────────────────────┘
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
┌────────────────┐ ┌──────────┐ ┌────────────────┐
│   配置服务      │ │ 构建服务  │ │   文件服务      │
│ (Config Svc)   │ │(Build Svc)│ │  (File Svc)    │
│                │ │           │ │                │
│ - 配置CRUD     │ │ - 任务队列 │ │ - 上传/下载    │
│ - 版本管理     │ │ - Docker  │ │ - 存储管理     │
│ - 参数校验     │ │ - yuleASR │ │                │
└────────┬───────┘ └─────┬─────┘ └────────────────┘
         │               │
         ▼               ▼
┌────────────────────────────────────┐
│         yuleASR CLI / Core          │
│  - 配置文件解析 (ARXML/XDM/JSON)    │
│  - 参数校验                          │
│  - 代码生成                          │
│  - 依赖分析                          │
└────────────────────────────────────┘
```

## 3. 配置编辑器设计

### 3.1 核心概念

**项目 (Project)**: 
- 一个 AutoSAR 配置集合
- 包含多个模块配置（CanIf, PduR, Com, etc.）
- 关联目标平台（S32K, TC3xx, etc.）

**模块 (Module)**:
- AutoSAR 标准模块（BSW 层各模块）
- 每个模块有自己的配置参数

**配置版本 (Version)**:
- 每次保存生成一个版本
- 支持回滚、对比

### 3.2 编辑器界面

```
┌────────────────────────────────────────────────────────────┐
│ 项目: MyProject                    保存   构建   更多...     │
├──────────┬─────────────────────────────────────────────────┤
│          │                                                  │
│ 模块树    │           配置编辑区域                            │
│          │                                                  │
│ ▼ CanIf  │  ┌──────────────────────────────────────────┐   │
│   ├ 通用  │  │ CanIfGeneral                             │   │
│   ├ 控制器│  │ ┌──────────────────────────────────────┐ │   │
│   └ PDU   │  │ │ CanDevErrorDetect    [✓] 启用        │ │   │
│          │  │ │ CanVersionInfoApi    [✓] 启用        │ │   │
│ ▶ PduR   │  │ │ CanIndex               [text input]    │ │   │
│          │  │ └──────────────────────────────────────┘ │   │
│ ▶ Com    │  │                                           │   │
│          │  │  CanIfCtrlCfg                             │   │
│ ▶ Dcm    │  │  [表格编辑...]                            │   │
│          │  │                                           │   │
│          │  └───────────────────────────────────────────┘   │
└──────────┴─────────────────────────────────────────────────┘
   Sidebar                    Main Editor
   (280px)                    (flex)
```

### 3.3 配置参数类型

```typescript
// 支持的参数类型
interface ParamConfig {
  name: string;
  type: 'boolean' | 'integer' | 'float' | 'string' | 'enum' | 'reference' | 'array';
  label: string;
  description: string;
  defaultValue?: any;
  constraints?: {
    min?: number;
    max?: number;
    pattern?: string;
    options?: { value: string; label: string }[];
    required?: boolean;
  };
}

// 模块配置定义
interface ModuleConfig {
  name: string;
  version: string;
  params: ParamConfig[];
  containers?: ContainerConfig[];  // 嵌套容器
}
```

## 4. 数据模型

### 4.1 项目模型
```typescript
interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  targetPlatform: 'S32K' | 'TC3xx' | 'RH850' | 'i.MX8';
  compiler: 'gcc-arm' | 'iar' | 'ghs';
  status: 'active' | 'archived' | 'deleted';
  currentVersion: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### 4.2 配置版本模型
```typescript
interface ConfigVersion {
  id: string;
  projectId: string;
  version: number;
  config: {
    // 完整的 AutoSAR 配置
    modules: {
      [moduleName: string]: ModuleConfigData;
    };
    // 如: { CanIf: { ... }, PduR: { ... } }
  };
  comment: string;
  createdBy: string;
  createdAt: Date;
}
```

### 4.3 模块配置数据
```typescript
interface ModuleConfigData {
  // 通用配置
  general?: {
    [paramName: string]: any;
  };
  // 容器配置（如控制器配置、PDU配置等）
  containers?: {
    [containerName: string]: ContainerItem[];
  };
}

interface ContainerItem {
  id: string;
  name: string;
  params: { [key: string]: any };
}
```

## 5. API 设计

### 5.1 项目管理
```typescript
// 创建项目
POST /api/projects
Request: {
  name: string;
  description: string;
  targetPlatform: string;
  compiler: string;
}
Response: { project: Project }

// 获取项目列表
GET /api/projects?page=1&limit=10
Response: { projects: Project[], total: number }

// 获取项目详情
GET /api/projects/:id
Response: { project: Project, currentConfig: ConfigVersion }

// 更新项目
PUT /api/projects/:id
Request: Partial<Project>
Response: { project: Project }

// 删除项目
DELETE /api/projects/:id
Response: { success: boolean }
```

### 5.2 配置管理
```typescript
// 获取配置
GET /api/projects/:id/config?version=1
Response: { config: ConfigVersion }

// 保存配置（创建新版本）
POST /api/projects/:id/config
Request: {
  config: object;
  comment: string;
}
Response: { version: ConfigVersion }

// 获取版本历史
GET /api/projects/:id/versions
Response: { versions: ConfigVersion[] }

// 回滚到指定版本
POST /api/projects/:id/rollback
Request: { version: number }
Response: { success: boolean }

// 对比两个版本
GET /api/projects/:id/diff?from=1&to=2
Response: { diff: ConfigDiff }
```

### 5.3 构建
```typescript
// 创建构建任务
POST /api/projects/:id/build
Request: {
  version?: number;  // 默认当前版本
  options?: {
    cleanBuild?: boolean;
    verbose?: boolean;
  };
}
Response: { job: BuildJob }

// 获取构建任务详情
GET /api/builds/:jobId
Response: { job: BuildJob }

// 获取构建日志（WebSocket）
WS /ws/builds/:jobId/logs

// 下载构建产物
GET /api/builds/:jobId/download
Response: File stream
```

### 5.4 yuleASR 元数据
```typescript
// 获取支持的模块列表
GET /api/yuleasr/modules
Response: { modules: ModuleConfig[] }

// 获取模块配置定义
GET /api/yuleasr/modules/:name/schema
Response: { schema: ModuleConfig }

// 验证配置
POST /api/yuleasr/validate
Request: { config: object }
Response: { valid: boolean; errors?: ValidationError[] }
```

## 6. 前端组件设计

### 6.1 页面结构
```
src/pages/yuleasr/
├── Projects/           # 项目管理
│   ├── List.tsx       # 项目列表
│   ├── Create.tsx     # 创建项目
│   └── Detail.tsx     # 项目详情
├── Editor/            # 配置编辑器
│   ├── Index.tsx      # 编辑器主页面
│   ├── Sidebar.tsx    # 模块树侧边栏
│   ├── ParamForm.tsx  # 参数表单
│   └── Toolbar.tsx    # 工具栏
└── Build/             # 构建控制台
    ├── Console.tsx    # 构建控制台
    └── History.tsx    # 构建历史
```

### 6.2 核心组件

#### ConfigEditor 编辑器
```typescript
interface ConfigEditorProps {
  projectId: string;
  initialConfig?: ConfigVersion;
  onSave: (config: object, comment: string) => Promise<void>;
  onBuild: () => void;
}
```

#### ModuleTree 模块树
```typescript
interface ModuleTreeProps {
  modules: ModuleConfig[];
  selectedModule: string;
  onSelect: (moduleName: string) => void;
  onToggle: (moduleName: string, expanded: boolean) => void;
}
```

#### ParamField 参数字段
```typescript
interface ParamFieldProps {
  param: ParamConfig;
  value: any;
  onChange: (value: any) => void;
  error?: string;
}
```

## 7. yuleASR 集成点

### 7.1 配置文件格式
需要确认 yuleASR 支持/输出的格式：
- ARXML（AutoSAR 标准格式）
- XDM（Vector DaVinci 格式）
- JSON（自定义格式）
- ECUC（EB tresos 格式）

### 7.2 后端集成方案
```
Option 1: CLI 调用
  Node.js → spawn('yuleasr-cli', ['generate', '--config', ...])

Option 2: 库调用
  Node.js → require('yuleasr-core') → generate(config)

Option 3: 服务调用
  Node.js → HTTP POST yuleasr-service:8080/generate
```

**推荐 Option 1 或 2**，取决于 yuleASR 的实现形式。

### 7.3 构建流程
```
1. 用户点击"构建"
2. 前端发送 POST /api/projects/:id/build
3. 后端:
   a. 保存当前配置到临时文件
   b. 调用 yuleASR 生成代码
   c. 调用编译器编译
   d. 收集产物
4. WebSocket 推送日志
5. 返回构建结果和下载链接
```

## 8. 与现有系统集成

### 8.1 与用户系统打通
- 项目归属到用户
- 用户只能看到自己的项目（admin 除外）
- 收藏的项目快速导入

### 8.2 与构建服务打通
- 复用 yuleCommunity-cloud 的构建能力
- 共享 Docker 构建环境
- 统一任务队列管理

### 8.3 与文档系统打通
- 配置参数链接到文档说明
- 模块帮助文档内嵌

## 9. 待确认事项

### 9.1 yuleASR 现状确认
- [ ] yuleASR 当前形态（桌面/Web/CLI/库）
- [ ] 支持的配置文件格式
- [ ] 支持的模块范围
- [ ] 是否已有代码生成能力

### 9.2 技术决策
- [ ] 配置存储格式（JSON vs ARXML）
- [ ] 是否需要导入/导出第三方工具配置
- [ ] 构建环境需求（Docker 镜像大小限制）

## 10. 开发计划

### Phase 1: 基础框架 (2周)
- [ ] 项目 CRUD 接口
- [ ] 项目列表/创建页面
- [ ] 基础配置编辑器框架

### Phase 2: 配置编辑器 (3周)
- [ ] 模块树组件
- [ ] 参数表单组件（各类型）
- [ ] 配置保存/版本历史
- [ ] 配置验证

### Phase 3: yuleASR 集成 (2周)
- [ ] 后端 yuleASR 调用
- [ ] 代码生成
- [ ] 构建集成

### Phase 4: 优化 (1周)
- [ ] 导入/导出
- [ ] 配置模板
- [ ] 性能优化

## 11. 验收标准

- [ ] 可以创建、编辑、删除项目
- [ ] 可以可视化编辑至少 3 个 AutoSAR 模块
- [ ] 配置可以保存版本并回滚
- [ ] 可以一键构建并下载产物
- [ ] 构建日志实时可见
- [ ] 配置验证能发现常见错误
