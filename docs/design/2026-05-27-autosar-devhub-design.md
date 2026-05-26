# AutoSAR DevHub 设计文档

## 1. 概述

将 yuleCommunity 升级为 **AutoSAR 开发者中心（AutoSAR DevHub）**，三位一体整合规范参考、在线编译与仿真、模块生态仓库，并与 yuleASR Configurator 打通。

---

## 2. 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                     yuleCommunity（AutoSAR DevHub）          │
│                                                             │
│  ┌──────────────────┐  ┌──────────────┐  ┌────────────────┐│
│  │   规范引擎 (A)    │  │ 在线编译 (B) │  │  模块仓库 (C)  ││
│  │  ┌──────────────┐│  │┌────────────┐│  │┌──────────────┐││
│  │  │ 规范浏览器    ││  ││ Monaco    ││  ││ 模块目录      │││
│  │  │ 版本对比      ││  ││ + WASM    ││  ││ 发布/导入     │││
│  │  │ API 搜索     ││  ││ 运行时可视化││  ││ 兼容性矩阵   │││
│  │  └──────┬───────┘│  │└─────┬──────┘│  │└──────┬───────┘││
│  └─────────┼────────┘  └──────┼───────┘  └───────┼────────┘│
│            │                  │                   │         │
│            └──────────────────┼───────────────────┘         │
│                               ▼                             │
│                    yuleASR Configurator                     │
│                  (通过 /yuleasr/* 路由集成)                   │
└─────────────────────────────────────────────────────────────┘
```

### 2.1 路由设计

| 路径 | 功能 | Phase |
|------|------|-------|
| `/autosar` | AutoSAR DevHub 首页（导航到各子模块） | P1 |
| `/autosar/spec` | 规范引擎主页（层级浏览） | P1 |
| `/autosar/spec/:module` | 模块级规范页（如 Can、Dio） | P1 |
| `/autosar/spec/:module/:api` | API 详情页 | P1 |
| `/autosar/spec/compare` | 版本对比视图 | P1 |
| `/autosar/sandbox` | 在线编译+仿真沙盒 | P2 |
| `/autosar/sandbox/:exampleId` | 加载预设示例 | P2 |
| `/autosar/registry` | 模块仓库主页 | P3 |
| `/autosar/registry/:moduleId` | 模块详情（含导入按钮） | P3 |
| `/autosar/registry/publish` | 发布新模块 | P3 |

### 2.2 组件架构

```
src/
├── pages/
│   ├── autosar/
│   │   ├── DevHubPage.tsx           # AutoSAR DevHub 首页
│   │   ├── SpecBrowserPage.tsx      # 规范引擎页
│   │   ├── SpecModulePage.tsx       # 模块级规范
│   │   ├── SpecApiDetailPage.tsx    # API 详情
│   │   ├── SpecComparePage.tsx      # 版本对比
│   │   ├── SandboxPage.tsx          # 在线编译+仿真
│   │   └── RegistryPage.tsx         # 模块仓库
│   │   └── RegistryDetailPage.tsx   # 仓库模块详情
│   │   └── RegistryPublishPage.tsx  # 发布模块
├── components/
│   ├── autosar/
│   │   ├── SpecTreeNav.tsx          # 规范层级树导航
│   │   ├── ApiCard.tsx              # API 卡片（签名、参数、示例）
│   │   ├── SpecVersionCompare.tsx   # 版本对比表格
│   │   ├── CanBusPanel.tsx          # CAN 总线可视化面板
│   │   ├── GpioWaveform.tsx         # GPIO 波形图
│   │   ├── InterruptTimeline.tsx    # 中断时序图
│   │   ├── CompileOutput.tsx        # 编译输出面板
│   │   ├── ModuleCard.tsx           # 仓库模块卡片
│   │   ├── CompatibilityMatrix.tsx  # 兼容性矩阵
│   │   ├── ImportToConfigurator.tsx # 一键导入按钮
│   │   └── RegistrySearch.tsx       # 仓库搜索+筛选
├── data/
│   ├── autosar/
│   │   ├── spec-index.ts            # 规范索引（所有模块和 API 列表）
│   │   ├── can-spec.ts              # Can 模块规范数据
│   │   ├── dio-spec.ts              # Dio 模块规范数据
│   │   ├── port-spec.ts             # Port 模块规范数据
│   │   ├── spi-spec.ts              # Spi 模块规范数据
│   │   ├── mcu-spec.ts              # Mcu 模块规范数据
│   │   ├── ... (每个模块一个数据文件)
│   │   ├── registry-samples.ts      # 模块仓库示例数据
│   │   └── spec-versions.ts         # 版本元数据
│   ├── autosar-headers/
│   │   ├── Can.h                    # AutoSAR 标准头文件（虚拟）
│   │   ├── Dio.h
│   │   ├── Port.h
│   │   └── ...
│   └── sandbox-examples.ts          # 沙盒预设示例
├── hooks/
│   ├── autosar/
│   │   ├── useSpecSearch.ts         # 规范搜索 hook
│   │   ├── useSpecVersion.ts        # 版本切换 hook
│   │   ├── useSandbox.ts            # 沙盒状态管理
│   │   ├── useWasmCompiler.ts       # WASM 编译 hook
│   │   ├── useCanSimulation.ts      # CAN 总线仿真逻辑
│   │   ├── useGpioSimulation.ts     # GPIO 波形仿真逻辑
│   │   └── useRegistry.ts           # 模块仓库 hook
└── lib/
    └── autosar/
        ├── spec-parser.ts           # 规范数据解析工具
        ├── version-diff.ts          # 版本差异计算
        └── compat-matrix.ts         # 兼容性矩阵计算
```

---

## 3. Phase 1：规范引擎（Spec Engine）

### 3.1 功能规格

#### 3.1.1 规范浏览器

- **层级导航**：左侧树形面板，按分类展开：
  ```
  AutoSAR 4.4
  ├── MCAL
  │   ├── Can
  │   │   ├── Can_Init
  │   │   ├── Can_Write
  │   │   ├── Can_Read
  │   │   ├── Can_SetBaudrate
  │   │   └── ...
  │   ├── Dio
  │   ├── Port
  │   ├── Spi
  │   ├── Mcu
  │   └── ...
  ├── ECUAL
  │   ├── Com
  │   ├── PduR
  │   ├── CanIf
  │   └── ...
  ├── Service
  │   ├── NvM
  │   ├── MemIf
  │   ├── EcuM
  │   └── ...
  └── RTE + ASW
  ```
- **选择节点** → 右侧显示内容
- **搜索**：Cmd+K 全局模糊搜索 API、模块、参数

#### 3.1.2 API 详情卡片

每个 API 显示：

| 字段 | 说明 | 示例 |
|------|------|------|
| 函数签名 | 完整声明 | `Std_ReturnType Can_Init(const Can_ConfigType* Config)` |
| 参数列表 | 每个参数的名称/类型/方向/说明 | Config: [in] 配置结构体指针 |
| 返回值 | 返回值类型和可能值 | E_OK / E_NOT_OK |
| 所属模块 | 模块名 | Can |
| 所属层 | MCAL/ECUAL/Service/RTE | MCAL |
| 规范版本 | 引用版本 | AUTOSAR 4.4 |
| 代码示例 | 可展开的代码示例 | ... |
| 配置参数 | 关联的 yuleASR 配置参数（链接） | CanGeneral, CanConfigSet |
| 关联 API | see also 列表 | Can_Write, Can_Read |

#### 3.1.3 版本对比

- 选择 2-3 个版本并排对比
- 差异高亮（新增/修改/删除）
- 支持整个模块对比或单个 API 对比

#### 3.1.4 与 yuleASR 联动

- API 详情中的"配置参数"字段 → 链接到 `/yuleasr/editor/:configId/:moduleId`
- 从 yuleASR 配置器也可跳转到对应 API 的规范页

### 3.2 数据结构

```typescript
// spec-index.ts
interface AutosarLayer {
  id: string;           // 'MCAL' | 'ECUAL' | 'Service' | 'RTE_ASW'
  name: string;         // 'MCAL'
  modules: AutosarModule[];
}

interface AutosarModule {
  id: string;           // 'Can'
  name: string;         // 'Can'
  description: string;
  versionIntroduced: string;  // 首次引入版本
  apis: AutosarApi[];
}

interface AutosarApi {
  id: string;           // 'Can_Init'
  name: string;         // 'Can_Init'
  signature: string;    // 完整函数声明
  brief: string;        // 一句话说明
  description: string;  // 详细说明
  params: AutosarParam[];
  returnType: string;
  returnDescription: string;
  moduleId: string;
  layerId: string;
  version: string;       // 规范版本
  example: string;       // Markdown 代码块
  exampleDescription?: string;
  seeAlso: string[];     // [ 'Can_Write', 'Can_Read' ]
  configParams?: ConfigParamRef[];
  timing?: string;       // 执行时间说明
  status: 'standard' | 'optional' | 'deprecated';
}

interface AutosarParam {
  name: string;
  type: string;
  direction: 'in' | 'out' | 'inout';
  description: string;
  range?: string;       // 参数取值范围
}

interface ConfigParamRef {
  paramName: string;     // 配置参数名
  configModule: string;  // 对应配置模块
  path: string;          // 完整路径
}

interface AutosarVersion {
  id: string;            // '4.4' | '4.6' | 'R21-11'
  label: string;         // 'AUTOSAR 4.4'
  releaseDate: string;
  status: 'active' | 'legacy' | 'deprecated';
}
```

### 3.3 初始数据范围

Phase 1 首批覆盖模块（约 15 个关键 BSW 模块，每个 5-20 个 API）：

| 层 | 模块 | API 数量 |
|----|------|---------|
| MCAL | Can | 15+ |
| MCAL | Dio | 10+ |
| MCAL | Port | 12+ |
| MCAL | Spi | 18+ |
| MCAL | Mcu | 10+ |
| MCAL | Adc | 14+ |
| MCAL | Pwm | 10+ |
| MCAL | Lin | 12+ |
| ECUAL | Com | 12+ |
| ECUAL | PduR | 8+ |
| ECUAL | CanIf | 10+ |
| Service | NvM | 12+ |
| Service | EcuM | 8+ |
| Service | BswM | 8+ |
| RTE | Rte | 10+ |

总计约 **170+ API 条目**。

### 3.4 关键技术点

- **SEO**：每个 API 有独立 URL + react-helmet-async meta
- **搜索**：基于 Fuse.js 或本地索引进行模糊搜索
- **导航**：使用 URL 参数 `?version=4.4` 保持版本状态
- **响应式**：左侧树在移动端折叠为选择器

---

## 4. Phase 2：在线编译与仿真（Sandbox + Simulation）

### 4.1 功能规格

#### 4.1.1 代码编辑器

- 基于现有 CodeSandbox 组件（Monaco Editor）升级
- 新增：**编译引擎选择**（模拟模式 / TCC WASM 模式）
- 新增：**AutoSAR 头文件自动包含**（在后台拼接标准头文件）

#### 4.1.2 编译引擎

| 模式 | 原理 | 能力 | 依赖 |
|------|------|------|------|
| 模拟 | 字符串匹配+预设输出 | 仅限预设示例 | 无 |
| TCC WASM | TinyCC 编译为 WASM | 真实编译运行 | tcc.wasm (~2MB) |

**TCC WASM 方案：**
- 使用 [tcc-wasm](https://github.com/skeeto/tcc-wasm) 或自编译 TinyCC → WASM
- 浏览器端加载 tcc.wasm，编译用户 C 代码
- 编译后的代码在 WASM 运行时中执行
- 捕获 stdout/stderr 输出到结果面板
- 执行时限 5 秒，内存 128MB 限制

#### 4.1.3 AutoSAR 头文件库

提供虚拟头文件（函数签名 stub），使 AutoSAR 代码可被编译而不依赖实际硬件：

```c
// Std_ReturnType Can_Init(const Can_ConfigType* Config)
// 虚拟实现，返回模拟结果
Std_ReturnType Can_Init(const Can_ConfigType* Config) {
    // 记录初始化到模拟状态
    can_sim_state.initialized = true;
    can_sim_state.config = Config;
    // 触发 CAN 总线初始化事件
    sim_emit_event("Can_Init", Config->CanController);
    return E_OK;
}
```

支持的头文件列表：

| 头文件 | 层 | 虚拟 API 数 |
|--------|----|------------|
| `Can.h` | MCAL | 15 |
| `Dio.h` | MCAL | 10 |
| `Port.h` | MCAL | 12 |
| `Spi.h` | MCAL | 18 |
| `Mcu.h` | MCAL | 10 |
| `Adc.h` | MCAL | 14 |
| `Pwm.h` | MCAL | 10 |
| `PduR.h` | ECUAL | 8 |
| `CanIf.h` | ECUAL | 10 |
| `Com.h` | ECUAL | 12 |
| `NvM.h` | Service | 12 |
| `EcuM.h` | Service | 8 |
| `Rte.h` | RTE | 10+ |

#### 4.1.4 运行时可视化

**CAN 总线面板：**
- 模拟 CAN 控制器（CAN0 / CAN1）
- 显示发送/接收的 CAN 消息帧（ID、DLC、数据、时间戳）
- 实时更新（基于 setTimeout/requestAnimationFrame 模拟）
- 支持过滤（按 ID、方向）

**GPIO 波形图：**
- 基于 Canvas/SVG 的时序波形显示
- 跟踪多个引脚状态变化
- 时间缩放到纳秒级

**中断时序图：**
- 显示中断触发→ISR 执行→返回的时间线
- 支持嵌套中断显示

#### 4.1.5 预设示例库

20+ 场景示例，从 Phase 1 规范引擎关联：

| 示例 | 模块 | 说明 |
|------|------|------|
| CAN 初始化 | Can | 展示 CAN 控制器初始化流程 |
| CAN 消息发送 | Can | 发送标准帧和扩展帧 |
| CAN 消息接收（中断） | Can | 中断方式接收 CAN 消息 |
| DIO 端口读写 | Dio | 读取/写入 GPIO 端口 |
| DIO 引脚中断 | Dio | 配置引脚中断 |
| SPI 主从通信 | Spi | SPI 同步/异步传输 |
| ADC 转换 | Adc | ADC 连续/单次转换 |
| PWM 输出 | Pwm | PWM 占空比设置 |
| NvM 数据存储 | NvM | NVRAM 读写操作 |
| COM 信号收发 | Com | 信号级通信 |
| PduR 路由 | PduR | PDU 路由配置 |
| EcuM 状态管理 | EcuM | ECU 启动/关闭流程 |

#### 4.1.6 沙盒与规范引擎联动

- 规范引擎 API 详情页 → "运行示例" 按钮 → 跳转到沙盒并自动填入代码
- 沙盒示例 → "查看规范" 按钮 → 跳转到对应 API 详情

### 4.2 关键技术点

- **WASM 编译**：主线程加载 tcc.wasm，编译在 Web Worker 进行
- **可视化模拟**：基于 Canvas 绘制波形，setInterval 模拟总线时间
- **头文件库**：编译时在用户代码前拼接虚拟头文件实现
- **状态隔离**：每次编译运行有独立模拟状态空间

---

## 5. Phase 3：模块生态仓库（Module Registry）

### 5.1 功能规格

#### 5.1.1 模块目录浏览

- 与 OpenSource 页类似但聚焦于可配置的 BSW 模块模板
- 筛选维度：层（MCAL/ECUAL/Service/RTE）、MCU 类型、OS、版本
- 排序：最新、最热、评分最高
- 每个模块显示：名称、层、描述、版本、评分、下载量、兼容性标签

#### 5.1.2 模块发布

- 用户上传 `.yuleasr.json` 配置文件（或 JSON 文本粘贴）
- 自动解析：提取模块名、版本、依赖、参数
- 填写元信息：描述、标签、MCU 兼容性、OS 兼容性
- 可选：关联 GitHub 仓库链接
- 发布后进入审核状态（管理员审核后方可公开）

#### 5.1.3 一键导入 yuleASR Configurator

- 模块详情页 → "导入配置器" 按钮
- 已登录：直接跳转到 yuleASR 编辑器并加载模块配置
- 未登录：提示登录后跳转
- 导入参数映射：仓库模块参数 → Configurator 参数编辑器

#### 5.1.4 兼容性矩阵

- MCU 类型：S32K1xx, S32K3xx, i.MX8M Mini, TDA4, R-Car, TC3xx, RH850
- OS 类型：AutoSAR OS, FreeRTOS, Linux
- Compiler：GCC, IAR, ARMCC, Green Hills
- 每个条目显示：已验证 / 兼容 / 未知 / 不兼容

#### 5.1.5 社区互动

- 评分（1-5 星）
- 评论（Markdown）
- 下载统计
- 版本历史（SemVer）
- 报告问题按钮

### 5.2 数据结构

```typescript
interface RegistryModule {
  id: string;
  name: string;
  version: string;         // SemVer
  layer: 'MCAL' | 'ECUAL' | 'Service' | 'RTE_ASW';
  description: string;
  tags: string[];
  author: {
    id: string;
    name: string;
  };
  configData: string;      // .yuleasr.json 内容
  compatibility: {
    mcu: string[];         // ['S32K144', 'i.MX8M Mini']
    os: string[];          // ['AutoSAR OS', 'FreeRTOS']
    compiler: string[];    // ['GCC', 'IAR']
  };
  dependencies: string[];  // 依赖的其他模块
  stats: {
    downloads: number;
    rating: number;        // 1-5
    ratingCount: number;
  };
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  createdAt: string;
  updatedAt: string;
  githubUrl?: string;      // 关联的 GitHub 仓库
}
```

### 5.3 数据存储

Phase 3 初期使用静态数据 + localStorage 存储用户操作。
后续可接入后端 API。

---

## 6. 页面 UI 布局

### 6.1 AutoSAR DevHub 首页

```
┌─────────────────────────────────────────────────────────┐
│ [Hero] AutoSAR 开发者中心                                 │
│        一站式规范查询、在线调试、模块管理                    │
├──────────┬──────────────┬────────────────────────────────┤
│ 规范引擎  │  在线编译     │  模块仓库                      │
│ 170+ API │  浏览器端编译 │  社区共建模块模板              │
│ 15 模块   │  运行时可视化  │  一键导入配置器               │
│ 版本对比  │  预设示例库   │  兼容性矩阵                   │
├──────────┴──────────────┴────────────────────────────────┤
│ [快捷入口]                                                │
│  搜索 API → [____]   |   打开沙盒 → [开始编码]           │
│  浏览模块仓库 → [探索]   |   发布模块 → [开始发布]       │
├─────────────────────────────────────────────────────────┤
│ [统计概览]                                                │
│ 规范 API: 170+ | 示例代码: 20+ | 仓库模块: N 个          │
└─────────────────────────────────────────────────────────┘
```

### 6.2 规范引擎页

```
┌──────┬────────────────────────────────────────────────────┐
│ 层级  │  API 详情区域                                      │
│ 导航  │                                                    │
│      │  ┌───────────────────────────────────────────────┐ │
│ MCAL │  │ Can_Init                                      │ │
│ ├Can  │  │ Std_ReturnType Can_Init(const Can_ConfigType*)│ │
│ │Init │  │                                               │ │
│ │Write│  │ 参数:                                         │ │
│ │Read │  │  Config [in] CAN 配置结构体指针               │ │
│ │Set- │  │                                               │ │
│ │Baud │  │ 返回值: E_OK / E_NOT_OK                      │ │
│ ├Dio  │  │                                               │ │
│ ├Port │  │ 📄 代码示例 [展开]                             │ │
│ ├Spi  │  │ 🔗 配置参数: CanGeneral, CanConfigSet         │ │
│ │     │  │ 👁 关联: Can_Write, Can_Read, Can_SetBaudrate │ │
│ │     │  └───────────────────────────────────────────────┘ │
│ │     │                                                    │
│ │     │  🔄 版本: [4.4 ▼]  对比: [添加版本...]            │
│ └     └────────────────────────────────────────────────────┘
```

### 6.3 在线编译+仿真页

```
┌──────────────────────────────────────┬───────────────────┐
│  Monaco Editor                       │ 编译输出           │
│                                      │ ┌───────────────┐ │
│  #include "Can.h"                    │ │ > Build OK    │ │
│                                      │ │ CAN0 Init OK  │ │
│  void main() {                       │ │ TX: ID=123 .. │ │
│    Can_Init(&cfg);                   │ └───────────────┘ │
│    Can_Write(0, &pdu);               │                   │
│  }                                   │ 运行时可视化       │
│                                      │ ┌───────────────┐ │
│                                      │ │ CAN 总线面板    │ │
│                                      │ │ ───────────── │ │
│                                      │ │ ID  DATA       │ │
│                                      │ │ 123 01 02 ..   │ │
│                                      │ │ 456 A0 B1 ..   │ │
│                                      │ └───────────────┘ │
├──────────────────────────────────────┴───────────────────┤
│ 示例: [CAN 初始化█] [DIO 读写] [SPI 通信] ...  [编译运行]│
└──────────────────────────────────────────────────────────┘
```

---

## 7. 测试策略

### 7.1 Phase 1 规范引擎
- 每个数据文件单元测试（API 条目完整性）
- 搜索功能测试（模糊匹配、空结果）
- 导航响应式测试（桌面树/移动选择器）

### 7.2 Phase 2 在线编译
- 编译引擎回退测试（WASM 不可用时降级到模拟模式）
- 每个示例代码可编译成功
- 可视化组件渲染测试

### 7.3 Phase 3 模块仓库
- 发布流程测试（表单验证、JSON 解析）
- 一键导入流程测试（登录状态、路由跳转）
- 兼容性矩阵筛选测试

---

## 8. 风险评估

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| WASM 编译体积过大 | 加载慢 | 懒加载 tcc.wasm，先显示模拟模式 |
| 浏览器兼容性 | 部分用户无法使用 WASM | 提供模拟模式降级 |
| 规范数据质量低 | 用户不信任 | 每批数据经代码审查 + 引用 AUTOSAR 标准文档 |
| 仓库模块质量参差 | 低质量内容充斥 | 审核流程 + 社区评分机制 |
| 与 yuleASR 集成断裂 | 导入失败 | 提前定义好导入接口契约 |

---

## 9. 发布里程碑

| 版本 | 内容 | 预计日期 |
|------|------|---------|
| v1.5.0 | Phase 1：规范引擎（15 模块，170+ API） | 2 周 |
| v1.6.0 | Phase 2：在线编译与仿真（TCC WASM + 可视化） | 3 周 |
| v1.7.0 | Phase 3：模块生态仓库 | 2 周 |
| v2.0.0 | 三合一打通 + 集成测试 + 正式发布 | 1 周 |
