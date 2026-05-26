# Phase 1: AutoSAR 规范引擎 实施计划

> **用于 Hermes：** 使用 subagent-driven-development 技能逐任务实现此计划。

**目标：** 在 yuleCommunity 中构建 AutoSAR 规范引擎（Spec Engine），提供层级导航、API 详情浏览、版本对比和全局搜索功能。

**架构：** 从现有 `src/data/modules.ts` 提取和丰富 AutoSAR 规范数据，创建独立的数据层 `src/data/autosar/`。页面使用 `src/pages/autosar/` 目录，组件使用 `src/components/autosar/` 目录。遵循已有 React + TypeScript + TailwindCSS + framer-motion 模式。

**覆盖范围：** 首批 15 个 BSW 模块，170+ API 条目。支持 AUTOSAR 4.4 / 4.6 / R21-11 版本对比。

**Tech Stack：** React 19, TypeScript 6, TailwindCSS, framer-motion, react-router-dom, lucide-react, react-helmet-async, Fuse.js（模糊搜索）

---

## Task 1: 创建规范数据基础设施

**Objective：** 建立 AutoSAR 规范数据的类型定义和索引结构

**Files：**
- Create: `src/data/autosar/types.ts`
- Create: `src/data/autosar/spec-index.ts`

**Step 1: 创建类型定义文件**

```typescript
// src/data/autosar/types.ts

export interface AutosarVersion {
  id: string;
  label: string;
  releaseDate: string;
  status: 'active' | 'legacy' | 'deprecated';
}

export interface AutosarParam {
  name: string;
  type: string;
  direction: 'in' | 'out' | 'inout';
  description: string;
  range?: string;
}

export interface ConfigParamRef {
  paramName: string;
  configModule: string;
  path: string;
}

export interface AutosarApi {
  id: string;
  name: string;
  signature: string;
  brief: string;
  description: string;
  params: AutosarParam[];
  returnType: string;
  returnDescription: string;
  moduleId: string;
  layerId: AutosarLayerId;
  version: string;
  example: string;
  exampleDescription?: string;
  seeAlso: string[];
  configParams?: ConfigParamRef[];
  timing?: string;
  status: 'standard' | 'optional' | 'deprecated';
}

export type AutosarLayerId = 'MCAL' | 'ECUAL' | 'Service' | 'RTE_ASW';

export interface AutosarModule {
  id: string;
  name: string;
  layer: AutosarLayerId;
  description: string;
  versionIntroduced: string;
  apiCount: number;
  apis: AutosarApi[];
}

export interface AutosarLayer {
  id: AutosarLayerId;
  name: string;
  modules: AutosarModule[];
}

export interface SpecIndex {
  versions: AutosarVersion[];
  layers: AutosarLayer[];
}
```

**Step 2: 创建规范索引和版本元数据**

```typescript
// src/data/autosar/spec-index.ts

import { AutosarVersion, AutosarLayer, SpecIndex } from './types';

export const SPEC_VERSIONS: AutosarVersion[] = [
  { id: '4.4', label: 'AUTOSAR 4.4', releaseDate: '2020-12', status: 'active' },
  { id: '4.6', label: 'AUTOSAR 4.6', releaseDate: '2022-06', status: 'active' },
  { id: 'R21-11', label: 'AUTOSAR R21-11', releaseDate: '2023-11', status: 'active' },
];

// 模块索引（不含 API 详情，只含元数据），用于快速导航
export const MODULE_INDEX: { id: string; name: string; layer: string; apiCount: number }[] = [
  // MCAL
  { id: 'Can', name: 'Can', layer: 'MCAL', apiCount: 15 },
  { id: 'Dio', name: 'Dio', layer: 'MCAL', apiCount: 10 },
  { id: 'Port', name: 'Port', layer: 'MCAL', apiCount: 12 },
  { id: 'Spi', name: 'Spi', layer: 'MCAL', apiCount: 18 },
  { id: 'Mcu', name: 'Mcu', layer: 'MCAL', apiCount: 8 },
  { id: 'Adc', name: 'Adc', layer: 'MCAL', apiCount: 14 },
  { id: 'Pwm', name: 'Pwm', layer: 'MCAL', apiCount: 10 },
  { id: 'Lin', name: 'Lin', layer: 'MCAL', apiCount: 12 },
  // ECUAL
  { id: 'Com', name: 'Com', layer: 'ECUAL', apiCount: 12 },
  { id: 'PduR', name: 'PduR', layer: 'ECUAL', apiCount: 8 },
  { id: 'CanIf', name: 'CanIf', layer: 'ECUAL', apiCount: 10 },
  // Service
  { id: 'NvM', name: 'NvM', layer: 'Service', apiCount: 12 },
  { id: 'EcuM', name: 'EcuM', layer: 'Service', apiCount: 8 },
  { id: 'BswM', name: 'BswM', layer: 'Service', apiCount: 8 },
  // RTE
  { id: 'Rte', name: 'Rte', layer: 'RTE_ASW', apiCount: 10 },
];

// 层分类元数据
export const LAYERS: { id: string; name: string; description: string; color: string }[] = [
  { id: 'MCAL', name: 'MCAL', description: '微控制器驱动层 - 直接操作硬件寄存器', color: 'blue' },
  { id: 'ECUAL', name: 'ECUAL', description: 'ECU 抽象层 - 硬件无关的封装接口', color: 'cyan' },
  { id: 'Service', name: 'Service', description: '服务层 - 系统级服务与管理', color: 'teal' },
  { id: 'RTE_ASW', name: 'RTE + ASW', description: '运行时环境与应用层', color: 'emerald' },
];

// 获取所有 API 的扁平列表（用于搜索索引）
export function getAllApiIndex(): { id: string; name: string; moduleId: string; layerId: string; brief: string }[] {
  const all: { id: string; name: string; moduleId: string; layerId: string; brief: string }[] = [];
  // 从各模块数据文件中收集
  // 因为是用 import 动态加载，此处先导出空列表，由各数据文件注册
  return all;
}
```

**Step 3: 安装 Fuse.js（搜索用）**

```bash
npm install fuse.js
```

**验证：** 运行 `npx tsc --noEmit`，类型定义无误

---

## Task 2: 提取现有模块数据并创建 Can 模块规范

**Objective：** 从 `src/data/modules.ts` 提取 Can 模块数据，转换为 `AutosarApi[]` 格式，作为第一个规范数据文件

**Files：**
- Create: `src/data/autosar/can-spec.ts`

**Step 1: 创建 Can 规范数据**

从 `src/data/modules.ts` 中 Can 模块的现有数据提取并丰富：

```typescript
// src/data/autosar/can-spec.ts

import { AutosarApi } from './types';

export const CAN_APIS: AutosarApi[] = [
  {
    id: 'Can_Init',
    name: 'Can_Init',
    signature: 'Std_ReturnType Can_Init(const Can_ConfigType* Config)',
    brief: '初始化 CAN 控制器和所有相关配置',
    description: '该函数初始化 CAN 控制器模块，包括 CAN 控制器的选择、波特率、唤醒方式、接收 ID 过滤规则等。必须在任何其他 CAN 操作之前调用。',
    params: [
      { name: 'Config', type: 'const Can_ConfigType*', direction: 'in', description: 'CAN 配置结构体指针，包含控制器和硬件对象配置' },
    ],
    returnType: 'Std_ReturnType',
    returnDescription: 'E_OK: 初始化成功；E_NOT_OK: 初始化失败',
    moduleId: 'Can',
    layerId: 'MCAL',
    version: '4.4',
    example: `/* Can_Init 示例 */
#include "Can.h"

const Can_ConfigType CanConfig = {
    .CanController = {
        .CanControllerId = 0,
        .CanControllerBaudrate = 500000,
        .CanControllerWakeupSource = CAN_WAKEUP_SOURCE_INTERNAL
    }
};

void Can_InitExample(void) {
    Std_ReturnType ret = Can_Init(&CanConfig);
    if (ret == E_OK) {
        /* CAN 初始化成功 */
    }
}`,
    exampleDescription: '初始化一个波特率为 500kbps 的 CAN 控制器',
    seeAlso: ['Can_Write', 'Can_Read', 'Can_SetBaudrate'],
    configParams: [
      { paramName: 'CanGeneral', configModule: 'Can', path: 'Can/CanGeneral' },
      { paramName: 'CanConfigSet', configModule: 'Can', path: 'Can/CanConfigSet' },
    ],
    status: 'standard',
  },
  {
    id: 'Can_Write',
    name: 'Can_Write',
    signature: 'Std_ReturnType Can_Write(Can_HwHandleType Hth, const Can_PduType* PduInfo)',
    brief: '发送 CAN 消息到总线',
    description: '将给定的 CAN 消息（包含 ID、DLC、数据）发送到指定硬件句柄对应的 CAN 控制器。支持标准帧和扩展帧格式。',
    params: [
      { name: 'Hth', type: 'Can_HwHandleType', direction: 'in', description: 'CAN 硬件发送句柄，指定发送控制器' },
      { name: 'PduInfo', type: 'const Can_PduType*', direction: 'in', description: 'CAN 消息结构体，包含 ID、长度、数据载荷' },
    ],
    returnType: 'Std_ReturnType',
    returnDescription: 'E_OK: 发送请求已提交；E_NOT_OK: 发送失败',
    moduleId: 'Can',
    layerId: 'MCAL',
    version: '4.4',
    example: `/* Can_Write 发送标准帧示例 */
#include "Can.h"

void Can_WriteExample(void) {
    uint8 data[8] = {0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08};
    Can_PduType pdu = {
        .id = 0x123,           /* 标准帧 ID */
        .length = 8,            /* 数据长度 */
        .sdu = data,            /* 数据指针 */
        .swPduHandle = NULL     /* 软件句柄 */
    };
    
    Can_Write(CAN_HTH_0, &pdu);
}`,
    exampleDescription: '发送一个 8 字节的标准帧 CAN 消息',
    seeAlso: ['Can_Init', 'Can_Read', 'Can_WriteSync'],
    status: 'standard',
  },
  {
    id: 'Can_Read',
    name: 'Can_Read',
    signature: 'void Can_Read(Can_HwHandleType Hrh, Can_PduType* PduInfo)',
    brief: '读取接收到的 CAN 消息',
    description: '从接收缓冲器中读取已接收的 CAN 消息内容。通常从中断服务程序或轮询任务中调用。',
    params: [
      { name: 'Hrh', type: 'Can_HwHandleType', direction: 'in', description: 'CAN 硬件接收句柄' },
      { name: 'PduInfo', type: 'Can_PduType*', direction: 'out', description: '输出缓冲区，存放接收到的 CAN 消息' },
    ],
    returnType: 'void',
    returnDescription: '无返回值，数据通过 PduInfo 指针返回',
    moduleId: 'Can',
    layerId: 'MCAL',
    version: '4.4',
    example: `/* Can_Read 中断方式接收示例 */
#include "Can.h"

void Can_IrqHandler(void) {
    Can_PduType receivedPdu;
    
    /* 从接收句柄读取消息 */
    Can_Read(CAN_HRH_0, &receivedPdu);
    
    /* 处理接收到的 CAN 消息 */
    if (receivedPdu.id == 0x123) {
        /* 匹配 ID，处理数据 */
    }
}`,
    seeAlso: ['Can_Init', 'Can_Write', 'Can_SetBaudrate', 'Can_ReadSync'],
    status: 'standard',
  },
  {
    id: 'Can_SetBaudrate',
    name: 'Can_SetBaudrate',
    signature: 'Std_ReturnType Can_SetBaudrate(Can_HwHandleType Hth, uint16 BaudRateConfigID)',
    brief: '动态设置 CAN 控制器波特率',
    description: '在运行时动态改变指定 CAN 控制器的通信波特率。波特率配置 ID 必须在配置阶段预定义。',
    params: [
      { name: 'Hth', type: 'Can_HwHandleType', direction: 'in', description: 'CAN 硬件句柄' },
      { name: 'BaudRateConfigID', type: 'uint16', direction: 'in', description: '波特率配置标识符，引用预定义的波特率配置' },
    ],
    returnType: 'Std_ReturnType',
    returnDescription: 'E_OK: 波特率设置成功；E_NOT_OK: 设置失败或无效 ID',
    moduleId: 'Can',
    layerId: 'MCAL',
    version: '4.4',
    example: `/* Can_SetBaudrate 切换波特率示例 */
#include "Can.h"

void Can_SwitchBaudrate(void) {
    /* 切换到 250kbps */
    Std_ReturnType ret = Can_SetBaudrate(CAN_HTH_0, CAN_BAUDRATE_250KBPS);
    if (ret != E_OK) {
        /* 波特率切换失败处理 */
    }
}`,
    seeAlso: ['Can_Init', 'Can_GetBaudrate'],
    status: 'optional',
    timing: '执行时间取决于硬件 PLL 重新锁定时间',
  },
  {
    id: 'Can_GetVersionInfo',
    name: 'Can_GetVersionInfo',
    signature: 'void Can_GetVersionInfo(Std_VersionInfoType* VersionInfo)',
    brief: '获取 CAN 驱动模块版本信息',
    description: '返回 CAN 驱动模块的厂商、版本号、模块 ID 等版本信息。',
    params: [
      { name: 'VersionInfo', type: 'Std_VersionInfoType*', direction: 'out', description: '版本信息输出结构体' },
    ],
    returnType: 'void',
    returnDescription: '无返回值，版本信息通过 VersionInfo 指针返回',
    moduleId: 'Can',
    layerId: 'MCAL',
    version: '4.4',
    example: `/* Can_GetVersionInfo 示例 */
#include "Can.h"

void Can_PrintVersion(void) {
    Std_VersionInfoType ver;
    Can_GetVersionInfo(&ver);
    /* ver.vendorID, ver.moduleID, ver.sw_major_version ... */
}`,
    seeAlso: [],
    status: 'standard',
  },
  {
    id: 'Can_CheckWakeup',
    name: 'Can_CheckWakeup',
    signature: 'Std_ReturnType Can_CheckWakeup(EcuM_WakeupSourceType WakeupSource)',
    brief: '检查 CAN 是否检测到唤醒事件',
    description: '检查 CAN 控制器在当前唤醒源下是否检测到总线活动。用于 EcuM 的唤醒验证流程。',
    params: [
      { name: 'WakeupSource', type: 'EcuM_WakeupSourceType', direction: 'in', description: '唤醒源类型' },
    ],
    returnType: 'Std_ReturnType',
    returnDescription: 'E_OK: 检测到唤醒；E_NOT_OK: 未检测到唤醒',
    moduleId: 'Can',
    layerId: 'MCAL',
    version: '4.4',
    seeAlso: ['EcuM_CheckWakeup'],
    status: 'standard',
  },
  // 继续添加 Can_WriteSync, Can_ReadSync, Can_MainFunction_Write, Can_MainFunction_Read 等...
];
```

**Step 2: 验证 Can 数据完整性**

确保每个 API 对象所有必需字段完整，特别是：
- 参数有 direction
- seeAlso 不引用不存在的 API
- 示例代码语法合理

**验证：** 运行 `npx tsc --noEmit`

---

## Task 3: 创建其余模块规范数据文件（Dio, Port, Mcu, Spi）

**Objective：** 从现有 `modules.ts` 提取 Dio、Port、Mcu、Spi 四个模块数据

**Files：**
- Create: `src/data/autosar/dio-spec.ts`
- Create: `src/data/autosar/port-spec.ts`
- Create: `src/data/autosar/mcu-spec.ts`
- Create: `src/data/autosar/spi-spec.ts`

**Step 1-4: 依次创建每个模块的数据文件**（每个文件约 5-15 个 API）

**模式参考**（与 Task 2 的 Can 文件相同）：

```typescript
// dio-spec.ts
export const DIO_APIS: AutosarApi[] = [
  {
    id: 'Dio_ReadChannel',
    name: 'Dio_ReadChannel',
    signature: 'Dio_LevelType Dio_ReadChannel(Dio_ChannelType ChannelId)',
    brief: '读取指定 DIO 通道的电平状态',
    description: '...',
    params: [ ... ],
    returnType: 'Dio_LevelType',
    returnDescription: 'STD_HIGH 或 STD_LOW',
    moduleId: 'Dio',
    layerId: 'MCAL',
    version: '4.4',
    example: `...`,
    seeAlso: ['Dio_WriteChannel', 'Dio_FlipChannel'],
    status: 'standard',
  },
  // ...
];
```

**验证：** `npx tsc --noEmit` 通过

---

## Task 4: 创建规范数据加载器和搜索索引

**Objective：** 汇总各模块规范数据，提供搜索索引

**Files：**
- Modify: `src/data/autosar/spec-index.ts`（添加加载器和搜索索引）
- Create: `src/hooks/autosar/useSpecSearch.ts`

**Step 1: 更新 spec-index.ts 添加数据加载函数**

```typescript
// 在 spec-index.ts 末尾添加

export interface ApiIndexEntry {
  id: string;
  name: string;
  signature: string;
  moduleId: string;
  layerId: string;
  brief: string;
}

// 搜索索引构建
export function buildSearchIndex(): ApiIndexEntry[] {
  const index: ApiIndexEntry[] = [];
  // 导入各模块数据（实际使用动态 import 或集中收集）
  return index;
}
```

**Step 2: 创建 useSpecSearch hook**

```typescript
// src/hooks/autosar/useSpecSearch.ts

import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { ApiIndexEntry } from '../../data/autosar/spec-index';

export function useSpecSearch(apiIndex: ApiIndexEntry[]) {
  const [query, setQuery] = useState('');
  
  const fuse = useMemo(() => new Fuse(apiIndex, {
    keys: [
      { name: 'name', weight: 0.5 },
      { name: 'brief', weight: 0.3 },
      { name: 'moduleId', weight: 0.15 },
      { name: 'signature', weight: 0.05 },
    ],
    threshold: 0.4,
    includeScore: true,
  }), [apiIndex]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return fuse.search(query).map(r => r.item);
  }, [query, fuse]);

  return { query, setQuery, results };
}
```

**验证：** `npx tsc --noEmit`

---

## Task 5: 创建 SpecTreeNav 树形导航组件

**Objective：** 左侧层级树导航，按 MCAL/ECUAL/Service/RTE_ASW 分层展示

**Files：**
- Create: `src/components/autosar/SpecTreeNav.tsx`

**Step 1: 实现 SpecTreeNav 组件**

```
┌─────────────────────────────┐
│ 🔍 [搜索 API...]            │
│                             │
│ ▼ MCAL (8)                  │
│   ├─ Can (15)               │
│   │  ├ Can_Init              │
│   │  ├ Can_Write             │
│   │  └ ...                   │
│   ├─ Dio (10)               │
│   ├─ Port (12)              │
│   ├─ Spi (18)               │
│   └─ ...                    │
│ ▼ ECUAL (3)                 │
│ ▼ Service (3)               │
│ ▼ RTE + ASW (1)             │
└─────────────────────────────┘
```

关键实现要点：
- 使用 framer-motion AnimatePresence 实现展开/折叠动画
- 层和模块可折叠（默认展开第一层）
- 选中项高亮（通过 URL 参数同步）
- 响应式：桌面端显示完整树，移动端显示为选择器 `<select>`
- 每个 API 项显示小圆点指示图标

```typescript
// SpecTreeNav.tsx 结构
interface SpecTreeNavProps {
  layers: AutosarLayer[];
  selectedApi: string | null;
  onSelectApi: (apiId: string) => void;
}
```

**Step 2: 创建骨架屏加载状态**

```typescript
// 在组件内部
function TreeSkeleton() { /* 3-4 行灰色脉冲动画块 */ }
```

**验证：** 组件渲染无运行时错误

---

## Task 6: 创建 ApiCard API 详情卡片组件

**Objective：** 展示 API 的完整信息（签名、参数、返回值、示例代码、关联等）

**Files：**
- Create: `src/components/autosar/ApiCard.tsx`

**Step 1: 实现 ApiCard 组件**

```
┌─────────────────────────────────────────────────┐
│ Can_Init                                        │
│ MCAL · Can · AUTOSAR 4.4                        │
├─────────────────────────────────────────────────┤
│ 初始化 CAN 控制器和所有相关配置                    │
│                                                 │
│ 📋 函数签名                                      │
│ ┌─────────────────────────────────────────────┐ │
│ │ Std_ReturnType Can_Init(                   │ │
│ │   const Can_ConfigType* Config              │ │
│ │ )                                           │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ 📝 参数                                         │
│ ┌──────────┬────────┬──────────┬────────────────┐│
│ │ 参数名    │ 类型    │ 方向      │ 说明           ││
│ ├──────────┼────────┼──────────┼────────────────┤│
│ │ Config   │ Can_.. │ in       │ 配置结构体指针  ││
│ └──────────┴────────┴──────────┴────────────────┘│
│                                                 │
│ 🔄 返回值: Std_ReturnType                        │
│ E_OK — 初始化成功 ｜ E_NOT_OK — 初始化失败        │
│                                                 │
│ 📄 代码示例 [展开/折叠]                          │
│ ┌─────────────────────────────────────────────┐ │
│ │ #include "Can.h"                            │ │
│ │ ...                                         │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ 🔗 关联 API: Can_Write, Can_Read, Can_...       │
│ ⚙ 配置参数: CanGeneral, CanConfigSet            │
│ 🚀 [在沙盒中运行]                               │
└─────────────────────────────────────────────────┘
```

关键实现要点：
- 代码示例使用 `react-syntax-highlighter`（项目已有依赖）
- 签名区域使用等宽字体 `font-mono` + 语法高亮
- 参数表格使用现有 UI 风格（圆角卡片、分隔线）
- 关联 API 是 `<Link>` 点击跳转
- 配置参数链接到 `/yuleasr/editor/...`
- "在沙盒中运行"按钮目前先做占位（Phase 2 激活）

**Step 2: 创建空状态**

```tsx
// 未选择 API 时显示
<div className="...">
  <BookOpen className="..." />
  <h3>选择一个 API 查看详情</h3>
  <p>从左侧树中选择一个 API 函数</p>
</div>
```

**验证：** 组件渲染所有数据类型可正常显示

---

## Task 7: 创建 DevHub 首页、规范浏览器页面和 API 详情页面

**Objective：** 创建 AutoSAR DevHub 的三个核心页面

**Files：**
- Create: `src/pages/autosar/DevHubPage.tsx`
- Create: `src/pages/autosar/SpecBrowserPage.tsx`

**Step 1: 创建 DevHub 首页**

3 列卡片布局展示三大模块入口：

```
┌─────────────────────────────────────────────────────────┐
│ 🔷 AutoSAR 开发者中心                                   │
│ 一站式规范查询、在线调试、模块管理                        │
│                                                         │
│ ┌────────────┬────────────┬────────────────────────────┐│
│ │ 📖 规范引擎 │ 🖥️ 在线编译 │ 📦 模块仓库 (即将推出)    ││
│ │ 170+ API   │ 浏览器端编译│ 社区共建模块模板           ││
│ │ 15 BSW模块  │ 实时可视化  │ 一键导入配置器             ││
│ │ [开始浏览]  │ [即将推出]  │ [即将推出]                ││
│ └────────────┴────────────┴────────────────────────────┘│
│                                                         │
│ [🔍 搜索 AutoSAR API]                                   │
│                                                         │
│ 📊 统计概览                                              │
│ 规范 API: 170+ | BSW 模块: 15 个 | 版本: 3 个           │
└─────────────────────────────────────────────────────────┘
```

**Step 2: 创建规范浏览器页面（三列布局）**

```
┌───────┬──────────────────────────────────────────────────┐
│ 导航树  │ 详情区域                                        │
│        │                                                  │
│ 层折叠  │ ┌────────────────────────────────────────────┐  │
│ ├MCAL  │ │ Can_Init                                   │  │
│ ├ECUAL │ │ (完整 ApiCard)                             │  │
│ ├Service│ │                                            │  │
│ └RTE   │ └────────────────────────────────────────────┘  │
│        │                                                  │
│ [版本] │ 🔄 版本: [4.4 ▼]  对比: [+ 添加版本]          │
└───────┴──────────────────────────────────────────────────┘
```

页面使用 useParams 获取当前选中的模块和 API：
- `/autosar/spec` → 首页（空选择状态）
- `/autosar/spec/:module` → 模块首页（显示模块概述+API 列表）
- `/autosar/spec/:module/:api` → API 详情

**验证：** 页面路由可正常访问

---

## Task 8: 创建版本对比页面

**Objective：** 支持 2-3 个 AUTOSAR 版本间的 API 差异对比

**Files：**
- Create: `src/pages/autosar/SpecComparePage.tsx`
- Create: `src/components/autosar/SpecVersionCompare.tsx`

**Step 1: 创建 SpecComparePage**

选择器：下拉选择版本 1 / 版本 2 / 版本 3（可选）

对比表格：
```
┌──────────────────────────────────────┬────────┬────────┬──────────┐
│ API                                  │ 4.4    │ 4.6    │ R21-11   │
├──────────────────────────────────────┼────────┼────────┼──────────┤
│ Can_Init                             │ ✅     │ ✅     │ ✅      │
│ Can_Write                            │ ✅     │ ✅     │ ✅      │
│ Can_Read                             │ ✅     │ ✅     │ ❌      │
│ Can_SetBaudrate                      │ ❌     │ ✅     │ ✅      │
│ ...                                  │ ...    │ ...    │ ...     │
└──────────────────────────────────────┴────────┴────────┴──────────┘
```

差异高亮：
- 🟢 新增（绿色背景）
- 🟡 修改（黄色背景 + 签名旧/新对比）
- 🔴 移除（红色背景）
- 无变化（正常）

**验证：** 版本对比表格可正确显示差异

---

## Task 9: 注册路由和导航

**Objective：** 将新页面注册到 App.tsx 的路由系统，并在导航栏添加入口

**Files：**
- Modify: `src/App.tsx`
- Modify: `src/components/Navbar.tsx`

**Step 1: 在 App.tsx 添加懒加载路由**

```typescript
// 在 App.tsx 的 lazy imports 区域添加
const DevHubPage = lazy(() => import('./pages/autosar/DevHubPage').then(m => ({ default: m.DevHubPage })));
const SpecBrowserPage = lazy(() => import('./pages/autosar/SpecBrowserPage').then(m => ({ default: m.SpecBrowserPage })));
const SpecComparePage = lazy(() => import('./pages/autosar/SpecComparePage').then(m => ({ default: m.SpecComparePage })));

// 在 public routes 的 <Routes> 内部添加
<Route path="autosar" element={<DevHubPage />} />
<Route path="autosar/spec" element={<SpecBrowserPage />} />
<Route path="autosar/spec/:module" element={<SpecBrowserPage />} />
<Route path="autosar/spec/:module/:api" element={<SpecBrowserPage />} />
<Route path="autosar/spec/compare" element={<SpecComparePage />} />
```

**Step 2: 在 Navbar 添加"开发者中心"导航项**

在 `navLinks` 数组中合适位置添加：

```typescript
{ label: '开发者中心', to: '/autosar' },
```

建议位置：放在"ASR配置"和"学习成长"之间。

**验证：** 导航栏显示新菜单项，点击可跳转

---

## Task 10: 整合搜索到 GlobalSearch 组件

**Objective：** 让 AutoSAR API 出现在全局搜索结果中

**Files：**
- Modify: `src/data/autosar/spec-index.ts`（导出完整搜索索引）
- Modify: `src/components/GlobalSearch.tsx`（集成 AutoSAR 搜索）

**Step 1: 构建完整搜索索引**

在 `spec-index.ts` 中导入所有模块的 `*_APIS` 数组，生成统一索引。

**Step 2: 集成到 GlobalSearch**

在现有 GlobalSearch 组件中添加 "AutoSAR API" 分类，搜索时列出匹配的 API 结果。点击跳转到 `/autosar/spec/:module/:apiId`

**验证：** Cmd+K 搜索 "Can_Init" 可找到并跳转

---

## 验证计划

每次构建后运行：

```bash
cd ~/yuleCommunity
npm run build    # 确保无构建错误
npm run test     # 运行现有测试确保不破坏
```

最终验收：
- [ ] `/autosar` 首页显示三大模块入口卡片
- [ ] `/autosar/spec` 显示层级树+API 详情
- [ ] 左侧树可按层展开/折叠
- [ ] 点击 API 项右侧显示完整 ApiCard
- [ ] `/autosar/spec/Can/Can_Init` 直接访问 API 详情
- [ ] 代码示例使用语法高亮
- [ ] 版本对比表格正常显示
- [ ] Cmd+K 搜索可找到 AutoSAR API
- [ ] 移动端树导航折叠为选择器
- [ ] 暗色/亮色模式正常

---

## Commit 策略

```
task 1  → "feat(autosar): add spec data types and index"
task 2  → "feat(autosar): add Can module spec data"
task 3  → "feat(autosar): add Dio, Port, Mcu, Spi spec data"
task 4  → "feat(autosar): add search index and useSpecSearch hook"
task 5  → "feat(autosar): add SpecTreeNav component"
task 6  → "feat(autosar): add ApiCard component"
task 7  → "feat(autosar): add DevHub and SpecBrowser pages"
task 8  → "feat(autosar): add version compare page"
task 9  → "feat(autosar): register routes and navigation"
task 10 → "feat(autosar): integrate spec search into GlobalSearch"
```
