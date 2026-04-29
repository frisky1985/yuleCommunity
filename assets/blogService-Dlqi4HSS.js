import{j as e,m as h}from"./framer-motion-7JIrlNOE.js";import{r as v}from"./react-vendor-BM6UTB8F.js";import{c as S}from"./utils-NWATJiuk.js";import{I}from"./input-UVfMsDK_.js";import{B as E}from"./button-BA42wpak.js";import{b as N,an as k,z as T,aw as L,az as D,aA as R}from"./ui-utils-CPT68ban.js";function X({hotArticles:o=[],tags:t=[],selectedTag:a,onSearch:i,onTagClick:c,onArticleClick:g,className:u}){const[s,y]=v.useState(""),r=v.useCallback(()=>{s.trim()&&i?.(s.trim())},[s,i]),f=v.useCallback(n=>{n.key==="Enter"&&r()},[r]);return e.jsxs("aside",{className:S("space-y-6",u),children:[e.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},className:"bg-card border border-border rounded-xl p-4",children:[e.jsxs("h3",{className:"text-sm font-semibold mb-3 flex items-center gap-2",children:[e.jsx(N,{className:"w-4 h-4 text-[hsl(var(--accent))]"}),"搜索文章"]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx(I,{type:"text",placeholder:"搜索文章...",value:s,onChange:n=>y(n.target.value),onKeyDown:f,className:"flex-1"}),e.jsx(E,{size:"icon",variant:"secondary",onClick:r,"aria-label":"搜索",children:e.jsx(N,{className:"w-4 h-4"})})]})]}),o.length>0&&e.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.1},className:"bg-card border border-border rounded-xl p-4",children:[e.jsxs("h3",{className:"text-sm font-semibold mb-4 flex items-center gap-2",children:[e.jsx(k,{className:"w-4 h-4 text-orange-500"}),"热门文章"]}),e.jsx("div",{className:"space-y-3",children:o.map((n,A)=>e.jsxs("div",{onClick:()=>g?.(n.slug),className:"group flex gap-3 cursor-pointer",children:[e.jsx("span",{className:S("flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs font-bold rounded",A<3?"bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]":"bg-muted text-muted-foreground"),children:A+1}),e.jsxs("div",{className:"flex-1 min-w-0",children:[e.jsx("h4",{className:"text-sm font-medium line-clamp-2 group-hover:text-[hsl(var(--accent))] transition-colors",children:n.title}),e.jsxs("div",{className:"flex items-center gap-2 mt-1 text-xs text-muted-foreground",children:[e.jsx(T,{className:"w-3 h-3"}),e.jsxs("span",{children:[n.viewCount.toLocaleString()," 阅读"]})]})]})]},n.id))})]}),t.length>0&&e.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.2},className:"bg-card border border-border rounded-xl p-4",children:[e.jsxs("h3",{className:"text-sm font-semibold mb-4 flex items-center gap-2",children:[e.jsx(L,{className:"w-4 h-4 text-[hsl(var(--primary))]"}),"热门标签"]}),e.jsx("div",{className:"flex flex-wrap gap-2",children:t.map(n=>e.jsx("button",{onClick:()=>c?.(n.name),className:S("px-3 py-1.5 text-sm rounded-full transition-all duration-200",a===n.name?"bg-[hsl(var(--accent))] text-accent-foreground":"bg-secondary text-secondary-foreground hover:bg-secondary/80"),children:e.jsxs("span",{className:"flex items-center gap-1.5",children:[e.jsx(D,{className:"w-3 h-3"}),n.name,e.jsxs("span",{className:"text-xs opacity-60",children:["(",n.articleCount,")"]})]})},n.name))})]})]})}function Q({author:o,toc:t=[],relatedArticles:a=[],activeTocId:i,onTocClick:c,onArticleClick:g,className:u}){return e.jsxs("aside",{className:S("space-y-6",u),children:[o&&e.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3},className:"bg-card border border-border rounded-xl p-4",children:[e.jsxs("h3",{className:"text-sm font-semibold mb-4 flex items-center gap-2",children:[e.jsx(R,{className:"w-4 h-4 text-[hsl(var(--accent))]"}),"关于作者"]}),e.jsxs("div",{className:"flex items-center gap-3 mb-3",children:[e.jsx("img",{src:o.avatar,alt:o.name,className:"w-12 h-12 rounded-full border-2 border-border"}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium",children:o.name}),e.jsx("p",{className:"text-xs text-muted-foreground",children:o.role})]})]}),o.bio&&e.jsx("p",{className:"text-sm text-muted-foreground",children:o.bio})]}),t.length>0&&e.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.1},className:"bg-card border border-border rounded-xl p-4 sticky top-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-4",children:"目录"}),e.jsx("nav",{className:"space-y-1",children:t.map(s=>e.jsx("button",{onClick:()=>c?.(s.id),className:S("block w-full text-left text-sm py-1 px-2 rounded transition-colors",s.level===1&&"font-medium",s.level===2&&"pl-4",s.level===3&&"pl-6 text-xs",i===s.id?"bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))]":"text-muted-foreground hover:text-foreground hover:bg-muted"),children:s.text},s.id))})]}),a.length>0&&e.jsxs(h.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.3,delay:.2},className:"bg-card border border-border rounded-xl p-4",children:[e.jsx("h3",{className:"text-sm font-semibold mb-4",children:"相关文章"}),e.jsx("div",{className:"space-y-3",children:a.map(s=>e.jsxs("div",{onClick:()=>g?.(s.slug),className:"group cursor-pointer",children:[e.jsx("h4",{className:"text-sm font-medium line-clamp-2 group-hover:text-[hsl(var(--accent))] transition-colors",children:s.title}),e.jsxs("div",{className:"flex items-center gap-2 mt-1 text-xs text-muted-foreground",children:[e.jsx("span",{children:s.category}),e.jsx("span",{children:"·"}),e.jsxs("span",{children:[s.readTime," 分钟"]})]})]},s.id))})]})]})}const p={zhangsan:{id:"1",name:"张三",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan",role:"高级 AutoSAR 工程师",bio:"从事汽车软件开发10年，精通 MCAL 和 BSW 配置"},lisi:{id:"2",name:"李四",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=lisi",role:"架构师",bio:"专注于汽车电子架构设计和功能安全"},wangwu:{id:"3",name:"王五",avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu",role:"工具链专家",bio:"深耕汽车软件开发工具链，擅长构建高效的 CI/CD 流水线"}},C=[{id:"1",title:"AutoSAR BSW 分层架构详解",slug:"autosar-bsw-layered-architecture",description:"深入解析 AutoSAR 基础软件 (BSW) 的分层架构设计原理，包括 MCAL、ECUAL、Service 层的职责划分与交互机制。",content:`# AutoSAR BSW 分层架构详解

## 概述

AutoSAR (汽车领域系统架构) 基础软件 (BSW) 采用分层架构设计，将硬件抽象与应用软件分离，从而实现软件的可移植性和可复用性。

## 架构分层

### 1. 微控制驱动层 (MCAL)

MCAL (Microcontroller Driver Layer) 是最底层的硬件抽象层：

- **主要职责**
  - 微控制器驱动程序开发
  - 寄存器配置
  - 中断管理

- **关键特性**
  - 高度依赖于具体芯片型号
  - 需要芯片厂商提供驱动

\`\`\`c
// MCAL 中断使能示例
void Mcal_EnableIRQ(uint32_t irqId)
{
    // 检查中断号有效性
    if (irqId >= MAX_IRQ_NUM) {
        return;
    }
    
    // 设置中断使能寄存器
    NVIC->ISER[irqId / 32] = (1U << (irqId % 32));
}
\`\`\`

### 2. ECU 抽象层 (ECUAL)

ECUAL (ECU Abstraction Layer) 提供对外设的标准接口：

- **主要组件**
  - ADC 驱动
  - PWM 驱动
  - SPI/I2C/CAN 通信驱动

- **核心价值**
  - 隔离硬件变化
  - 提供统一 API 接口

### 3. 服务层 (Service Layer)

服务层提供高层功能服务：

| 服务模块 | 功能描述 |
|---------|---------|
| NVRAM Manager | 非易失性数据管理 |
| Diagnostic Event Manager | 故障诊断管理 |
| Communication Manager | 通信管理 |

## 层间交互

\`\`\`
┌──────────────────────────┐
│    Application Layer (ASW)   │
├──────────────────────────┤
│       RTE (运行时环境)      │
├──────────────────────────┤
│       Service Layer          │
├──────────────────────────┤
│       ECU Abstraction Layer  │
├──────────────────────────┤
│       Microcontroller Driver │
└──────────────────────────┘
├──────────────────────────┤
│       Microcontroller HW     │
└──────────────────────────┘
\`\`\`

## 最佳实践

1. **层次清晰** - 严格遵守层次调用规范
2. **接口稳定** - 保持层间接口的稳定性
3. **可配置性** - 充分利用 AutoSAR 配置工具

## 总结

BSW 分层架构是 AutoSAR 的核心设计理念，通过明确的层次划分实现了软件的模块化和可移植性。
`,author:p.zhangsan,publishDate:"2025-04-20T08:00:00Z",updatedAt:"2025-04-25T10:30:00Z",readTime:15,viewCount:1234,likeCount:89,commentCount:12,tags:["AutoSAR","BSW","MCAL","架构设计"],category:"架构设计",isHot:!0,coverImage:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",seo:{title:"AutoSAR BSW 分层架构详解 - YuleTech 技术博客",description:"深入解析 AutoSAR 基础软件 (BSW) 的分层架构设计原理",keywords:["AutoSAR","BSW","MCAL","ECUAL","Service Layer","汽车软件"]}},{id:"2",title:"CAN 通信协议与 AutoSAR Com 模块配置",slug:"can-protocol-autosar-com-configuration",description:"详细介绍 CAN 通信协议原理，以及如何在 AutoSAR 中配置 Communication (Com) 模块实现数据发送与接收。",content:`# CAN 通信协议与 AutoSAR Com 模块配置

## CAN 协议基础

CAN (Controller Area Network) 是汽车领域广泛使用的串行通信协议。

### 数据帧结构

\`\`\`
┌─────────┬──────────────────────────────────────┐
│ 字段   │            说明                    │
├─────────┼──────────────────────────────────────┤
│ SOF    │ 起始位，一个显性位                    │
├─────────┼──────────────────────────────────────┤
│ ID     │ 标识符，标准 CAN 为 11 位            │
├─────────┼──────────────────────────────────────┤
│ DLC    │ 数据长度码，表示数据字节数量        │
├─────────┼──────────────────────────────────────┤
│ Data   │ 数据字段，最多 8 字节                │
├─────────┼──────────────────────────────────────┤
│ CRC    │ 循环冗余校验                        │
├─────────┼──────────────────────────────────────┤
│ ACK    │ 应答帐                              │
└─────────┴──────────────────────────────────────┘
\`\`\`

## AutoSAR Com 模块

Com 模块负责数据的发送和接收管理。

\`\`\`c
// Com 发送信号示例
Std_ReturnType Com_SendSignal(
    Com_SignalIdType SignalId,
    const void* SignalDataPtr
)
{
    Std_ReturnType status = E_OK;
    
    // 检查信号 ID 有效性
    if (SignalId >= ComConfig->NumSignals) {
        return E_NOT_OK;
    }
    
    // 复制数据到缓冲区
    memcpy(
        &ComSignalBuffer[SignalId],
        SignalDataPtr,
        ComConfig->Signals[SignalId].Length
    );
    
    return status;
}
\`\`\`

## 配置步骤

1. 定义信号 (Signal)
2. 定义报文 (PDU)
3. 配置发送周期
4. 设置过滤规则

## 常见问题

- 信号更新频率与报文发送周期不匹配
- 数据长度超出配置限制
- 未正确配置过滤规则

## 总结

Com 模块是 AutoSAR 通信架构的核心，正确的配置对系统性能至关重要。
`,author:p.lisi,publishDate:"2025-04-18T10:00:00Z",updatedAt:"2025-04-22T14:20:00Z",readTime:12,viewCount:987,likeCount:76,commentCount:8,tags:["CAN","通信协议","COM","ECUAL"],category:"ECUAL",isHot:!0,coverImage:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",seo:{title:"CAN 通信协议与 AutoSAR Com 配置指南",description:"详细介绍 CAN 通信协议和 AutoSAR Com 模块配置",keywords:["CAN","通信","AutoSAR","Com","汽车网络"]}},{id:"3",title:"NXP S32K3 芯片 MCAL 配置实战",slug:"nxp-s32k3-mcal-configuration-guide",description:"基于 NXP S32K3 系列芯片的 MCAL 配置实战，包括 ADC、PWM、GPIO 等模块的详细配置步骤。",content:`# NXP S32K3 芯片 MCAL 配置实战

## 硬件平台

S32K3 是 NXP 针对汽车应用推出的高性能微控制器系列。

### 芯片特性

- ARM Cortex-M7 核心，最高 240MHz
- 支持 ASIL-D 功能安全等级
- 丰富的外设接口

## MCAL 配置流程

### 1. 环境准备

\`\`\`
1. 安装 S32 Design Studio
2. 导入 MCAL 包
3. 配置 EB tresos
\`\`\`

### 2. ADC 配置

\`\`\`c
// ADC 通道配置
const Adc_ChannelConfigType AdcChannelConfig[] = {
    {
        .ChannelId = 0,
        .ChannelInputMode = ADC_INPUT_MODE_SINGLE,
        .ChannelRange = ADC_RANGE_UNDER_OVER_VOLTAGE,
        .ChannelResolution = ADC_RESOLUTION_12BIT
    }
};
\`\`\`

### 3. PWM 配置

\`\`\`c
// PWM 模块配置
const Pwm_ChannelConfigType PwmChannelConfig[] = {
    {
        .ChannelId = 0,
        .Frequency = 1000,  // 1kHz
        .DutyCycle = 5000,  // 50%
        .Polarity = PWM_HIGH
    }
};
\`\`\`

## 调试技巧

- 使用 Lauterbach 调试器
- 配置 TRACE 输出
- 监控寄存器状态

## 常见问题

1. 时钟配置错误导致外设工作异常
2. 中断优先级配置不当
3. DMA 通道冲突

## 总结

S32K3 的 MCAL 配置需要深入理解芯片硬件特性，建议从简单模块开始逐步练习。
`,author:p.zhangsan,publishDate:"2025-04-15T09:30:00Z",updatedAt:"2025-04-20T11:00:00Z",readTime:20,viewCount:1567,likeCount:112,commentCount:23,tags:["NXP","S32K3","MCAL","芯片配置"],category:"MCAL",isHot:!0,coverImage:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",seo:{title:"NXP S32K3 MCAL 配置实战指南",description:"基于 NXP S32K3 芯片的 MCAL 配置实战教程",keywords:["NXP","S32K3","MCAL","ADC","PWM","汽车芯片"]}},{id:"4",title:"构建汽车软件 CI/CD 流水线",slug:"automotive-software-ci-cd-pipeline",description:"使用 Jenkins、Docker 和静态代码分析工具构建完整的汽车软件持续集成/持续部署流水线。",content:`# 构建汽车软件 CI/CD 流水线

## CI/CD 在汽车软件中的重要性

汽车软件的复杂性和安全要求使得 CI/CD 成为必须。

## 技术栈

\`\`\`
┌────────────────────────────────┐
│     源代码管理 (Git/GitLab)      │
├────────────────────────────────┤
│      构建工具 (Jenkins)           │
├────────────────────────────────┤
│    静态分析 (SonarQube/Polyspace)   │
├────────────────────────────────┤
│      测试执行 (Unit/HIL 测试)      │
├────────────────────────────────┤
│     文档生成 (Doxygen)             │
├────────────────────────────────┤
│     部署发布 (OTA/刷写工具)       │
└────────────────────────────────┘
\`\`\`

## Jenkins Pipeline 示例

\`\`\`groovy
pipeline {
    agent { docker 'autosar-build-env:latest' }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Static Analysis') {
            steps {
                sh 'polyspace-bug-finder -config ps_config.txt'
            }
        }
        
        stage('Build') {
            steps {
                sh 'make BSW_CONFIG=Release'
            }
        }
        
        stage('Unit Test') {
            steps {
                sh 'ctest -T test --output-on-failure'
            }
            post {
                always {
                    publishTestResults testResultsPattern: 'build/Testing/**/*.xml'
                }
            }
        }
        
        stage('Code Coverage') {
            steps {
                sh 'gcovr -r . --html --html-details -o coverage.html'
            }
        }
    }
}
\`\`\`

## 静态代码分析

### MISRA C 规则检查

- 必须遵守 MISRA C:2012 编码规范
- 使用 SonarQube 进行持续检查

### 功能安全分析

- 使用 Polyspace 进行运行时错误检测
- 证明无运行时异常

## 测试策略

1. **单元测试** - Tessy/VectorCAST
2. **软件在环 (SIL) 测试** - PC 仿真
3. **硬件在环 (HIL) 测试** - dSPACE/NI

## 总结

CI/CD 是提高汽车软件质量的关键，需要结合功能安全和 ASPICE 要求进行设计。
`,author:p.wangwu,publishDate:"2025-04-10T14:00:00Z",updatedAt:"2025-04-18T16:30:00Z",readTime:18,viewCount:2345,likeCount:156,commentCount:31,tags:["CI/CD","Jenkins","工具链","自动化"],category:"工具链",isHot:!0,coverImage:"https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop",seo:{title:"汽车软件 CI/CD 流水线构建指南",description:"使用 Jenkins、Docker 构建汽车软件持续集成流水线",keywords:["CI/CD","Jenkins","汽车软件","持续集成","自动化"]}},{id:"5",title:"ISO 26262 功能安全实现要点",slug:"iso-26262-functional-safety-implementation",description:"从标准角度解读 ISO 26262 功能安全要求，并分享在 AutoSAR 项目中的实际应用经验。",content:`# ISO 26262 功能安全实现要点

## ISO 26262 概述

ISO 26262 是汽车电气/电子系统的功能安全国际标准。

## ASIL 等级

| ASIL | 风险程度 | 示例系统 |
|------|---------|----------|
| ASIL-A | 最低 | 后视镜调节 |
| ASIL-B | 低 | 头灯控制 |
| ASIL-C | 中 | 空调系统 |
| ASIL-D | 最高 | 制动系统 |

## 安全要求

### 1. 安全分析

\`\`\`
HAZOP 分析 → FMEA 分析 → FTA 分析
└─────────────────────────────────────┘
          ↓
    安全目标 (Safety Goals)
          ↓
    技术安全要求 (TSR)
          ↓
    软件安全要求 (SSR)
\`\`\`

### 2. E2E 保护

\`\`\`c
// E2E 保护示例
#include "E2E_P01.h"

E2E_P01CheckStatusType E2E_CheckData(
    const E2E_P01ConfigType* Config,
    E2E_P01CheckStateType* State,
    const uint8_t* Data
)
{
    // CRC 校验
    uint8_t crc = Crc_CalculateCRC8(
        Data + 1,  // 跳过 CRC 字节
        Config->DataLength - 1,
        0xFF,
        FALSE
    );
    
    if (crc != Data[0]) {
        return E2E_P01STATUS_ERROR;
    }
    
    // 序号检查
    uint8_t receivedCounter = Data[Config->CounterOffset];
    // ... 计算期望的序号
    
    return E2E_P01STATUS_OK;
}
\`\`\`

### 3. 安全监视

\`\`\`c
// WdgM 监视示例
void WdgM_CheckpointReached(
    WdgM_SupervisedEntityIdType SEID,
    WdgM_CheckpointIdType CheckpointID
)
{
    // 更新监视实体状态
    WdgM_SEStatus[SEID].LastCheckpoint = CheckpointID;
    WdgM_SEStatus[SEID].Timestamp = GetCurrentTime();
    
    // 检查活动监视
    if (WdgM_IsAliveSupervisionEnabled(SEID)) {
        WdgM_CheckAliveSupervision(SEID);
    }
}
\`\`\`

## 开发流程

1. 安全分析阶段
2. 架构设计阶段
3. 软件实现阶段
4. 测试验证阶段
5. 确认评估阶段

## 工具链

- **Polyspace** - 静态代码分析
- **Tessy** - 单元测试
- **BTC** - 覆盖率测试

## 总结

ISO 26262 是确保汽车软件安全的基础，需要全生命周期的對待。
`,author:p.lisi,publishDate:"2025-04-08T11:00:00Z",updatedAt:"2025-04-15T09:00:00Z",readTime:25,viewCount:876,likeCount:67,commentCount:15,tags:["ISO 26262","功能安全","ASIL","E2E"],category:"功能安全",isHot:!1,coverImage:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",seo:{title:"ISO 26262 功能安全实现要点 - YuleTech 技术博客",description:"从标准角度解读 ISO 26262 功能安全要求和实践经验",keywords:["ISO 26262","功能安全","ASIL","E2E","汽车安全"]}},{id:"6",title:"AutoSAR NVM 模块数据管理深度解析",slug:"autosar-nvm-data-management",description:"深入探讨 AutoSAR NVM (Non-Volatile Memory) 模块的数据管理机制，包括数据块配置、写入策略和损耗均衡算法。",content:`# AutoSAR NVM 模块数据管理深度解析

## NVM 架构概述

NVM (Non-Volatile Memory Manager) 负责管理非易失性数据的存储。

\`\`\`
┌────────────────────────────────┐
│       RTE / Application          │
├────────────────────────────────┤
│         NvM (Manager)            │
├────────────────────────────────┤
│   MemIf (Memory Interface)       │
├────────────────────────────────┤
│  Fee (Flash) / Ea (EEPROM)      │
├────────────────────────────────┤
│    Flash Driver / Eep Driver    │
└────────────────────────────────┘
\`\`\`

## 数据块类型

### Native Block

\`\`\`c
// 原生数据块配置
const NvM_BlockDescriptorType NvM_BlockDescriptor_Native = {
    .BlockManagementType = NVM_BLOCK_NATIVE,
    .BlockJobPriority = 1,
    .BlockCrcType = NVM_CRC_32,
    .NvBlockNum = 1,  // 单个备份
    .RomBlockNum = 1,
    .NvBlockLength = 64
};
\`\`\`

### Redundant Block

\`\`\`c
// 冗余数据块配置
const NvM_BlockDescriptorType NvM_BlockDescriptor_Redundant = {
    .BlockManagementType = NVM_BLOCK_REDUNDANT,
    .NvBlockNum = 2,  // 双份备份
    .RomBlockNum = 1,
    .NvBlockLength = 32
};
\`\`\`

## 写入策略

### 立即写入

\`\`\`c
// 显式写入 API
Std_ReturnType NvM_WriteBlock(
    NvM_BlockIdType BlockId,
    const void* NvM_SrcPtr
);
\`\`\`

### 定时写入

\`\`\`c
// 定时写入任务
void NvM_MainFunction(void)
{
    // 检查写队列
    if (NvM_WriteQueueNotEmpty()) {
        NvM_ProcessWriteRequest();
    }
    
    // 处理定时写入
    for (uint8 i = 0; i < NUM_BLOCKS; i++) {
        if (NvM_IsWriteTimerExpired(i)) {
            NvM_TriggerBlockWrite(i);
        }
    }
}
\`\`\`

## 损耗均衡

### 算法原理

1. 追踪每个块的操作次数
2. 动态迁移数据到低损耗区域
3. 保证整体写入次数均衡

\`\`\`c
// 简化的均衡算法
void Fee_WearLeveling(void)
{
    uint32 minEraseCount = FindMinEraseCount();
    uint32 maxEraseCount = FindMaxEraseCount();
    
    if ((maxEraseCount - minEraseCount) > WEAR_THRESHOLD) {
        // 执行数据迁移
        Fee_MigrateData(maxEraseCountBlock, minEraseCountBlock);
    }
}
\`\`\`

## 使用示例

\`\`\`c
// 初始化
void NvM_Init(void)
{
    NvM_ReadAll();  // 从 NV 读取所有数据
}

// 应用使用
void SaveVehicleConfig(void)
{
    // 更新数据
    memcpy(&vehicleConfig, &newConfig, sizeof(VehicleConfigType));
    
    // 触发定时写入
    NvM_SetRamBlockStatus(NVM_BLOCK_VEHICLE_CONFIG, TRUE);
}
\`\`\`

## 常见问题

1. **CRC 校验失败** - 数据损坏
2. **写入时间过长** - 阻塞其他任务
3. **块互斥** - 多任务冲突

## 总结

NVM 是 AutoSAR 中关键的数据管理模块，正确的配置和使用对系统稳定性至关重要。
`,author:p.zhangsan,publishDate:"2025-04-05T08:30:00Z",updatedAt:"2025-04-12T10:00:00Z",readTime:22,viewCount:1123,likeCount:91,commentCount:19,tags:["NVM","Service","数据管理","Flash"],category:"Service",isHot:!1,coverImage:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",seo:{title:"AutoSAR NVM 模块数据管理深度解析",description:"深入探讨 AutoSAR NVM 模块的数据管理机制和配置",keywords:["AutoSAR","NVM","数据管理","Flash","EEPROM"]}}],b=[{name:"AutoSAR",articleCount:4,color:"#3b82f6"},{name:"MCAL",articleCount:2,color:"#10b981"},{name:"BSW",articleCount:3,color:"#8b5cf6"},{name:"CAN",articleCount:1,color:"#f59e0b"},{name:"架构设计",articleCount:2,color:"#ef4444"},{name:"NXP",articleCount:1,color:"#6366f1"},{name:"CI/CD",articleCount:1,color:"#14b8a6"},{name:"ISO 26262",articleCount:1,color:"#ec4899"},{name:"功能安全",articleCount:1,color:"#f97316"},{name:"工具链",articleCount:1,color:"#84cc16"},{name:"Service",articleCount:1,color:"#06b6d4"},{name:"ECUAL",articleCount:2,color:"#a855f7"}];function x(o){return C.find(t=>t.id===o)}function w(o){return C.find(t=>t.slug===o)}function _(o=5){return C.filter(t=>t.isHot).sort((t,a)=>a.viewCount-t.viewCount).slice(0,o)}function B(o,t=3){const a=x(o);return a?C.filter(i=>i.id!==o&&(i.category===a.category||i.tags.some(c=>a.tags.includes(c)))).slice(0,t):[]}function j(){return b}function P(o=10){return[...b].sort((t,a)=>a.articleCount-t.articleCount).slice(0,o)}function O(o){return C.filter(t=>t.tags.some(a=>a.toLowerCase()===o.toLowerCase()))}function W(o){const t=o.toLowerCase();return C.filter(a=>a.title.toLowerCase().includes(t)||a.description.toLowerCase().includes(t)||a.tags.some(i=>i.toLowerCase().includes(t)))}const q=["全部","MCAL","ECUAL","Service","工具链","功能安全","架构设计"];class V{async getArticles(t={}){const{category:a,tag:i,search:c,page:g=1,pageSize:u=10,sortBy:s="date",sortOrder:y="desc"}=t;let r=[...C];if(a&&a!=="全部"&&(r=r.filter(l=>l.category===a)),i&&(r=r.filter(l=>l.tags.some(d=>d.toLowerCase()===i.toLowerCase()))),c){const l=c.toLowerCase();r=r.filter(d=>d.title.toLowerCase().includes(l)||d.description.toLowerCase().includes(l)||d.tags.some(m=>m.toLowerCase().includes(l)))}r.sort((l,d)=>{let m=0;switch(s){case"date":m=new Date(d.publishDate).getTime()-new Date(l.publishDate).getTime();break;case"views":m=d.viewCount-l.viewCount;break;case"likes":m=d.likeCount-l.likeCount;break;default:m=new Date(d.publishDate).getTime()-new Date(l.publishDate).getTime()}return y==="asc"?-m:m});const f=r.length,n=Math.ceil(f/u),A=(g-1)*u,M=A+u;return{data:r.slice(A,M),total:f,page:g,pageSize:u,totalPages:n}}async getArticleById(t){return x(t)||null}async getArticleBySlug(t){const a=w(t);return a&&await this.incrementViewCount(a.id),a||null}async getHotArticles(t=5){return _(t)}async getRelatedArticles(t,a=3){return B(t,a)}async searchArticles(t){return W(t)}async incrementViewCount(t){const a=x(t);a&&a.viewCount++}async toggleLike(t){const a=x(t);if(!a)return!1;const i=JSON.parse(localStorage.getItem("yuletech:blog:liked")||"[]"),c=i.indexOf(t);return c>-1?(i.splice(c,1),a.likeCount=Math.max(0,a.likeCount-1)):(i.push(t),a.likeCount++),localStorage.setItem("yuletech:blog:liked",JSON.stringify(i)),c===-1}isArticleLiked(t){return JSON.parse(localStorage.getItem("yuletech:blog:liked")||"[]").includes(t)}}class U{async getAllTags(){return j()}async getHotTags(t=10){return P(t)}async getArticlesByTag(t){return O(t)}}const Y=new V,$=new U;export{X as B,Y as a,Q as b,q as c,$ as t};
