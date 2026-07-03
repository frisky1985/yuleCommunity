/// <reference types="vite/client" />
// This file contains seed article content as plain JS/TS strings
// (extracted to avoid template-literal clashes with markdown code blocks)

export interface SeedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: string;
  tags: string[];
  status: string;
  publishedAt: Date;
}

export function getSeedArticles(baseNow: Date): SeedArticle[] {
  return [
    {
      title: 'AutoSAR 到底是什么？写给嵌入式开发者的入门指南',
      slug: 'what-is-autosar-intro-guide',
      excerpt: 'AutoSAR (AUTomotive Open System ARchitecture) 是汽车电子系统开发的全球标准。本文用通俗的语言为你揭开 AutoSAR 的面纱。',
      content: [
        '# AutoSAR 到底是什么？',
        '',
        '## 为什么要读这篇文章？',
        '',
        '如果你是嵌入式软件工程师，你大概率已经听过"AutoSAR"这个词。如果你在汽车行业，你可能已经被它折磨过。',
        '',
        'AutoSAR 很复杂——规范文档超过 2000 页，工具链动辄数十万——但核心思想其实不复杂。',
        '',
        '这篇文章用 5 分钟帮你建立 AutoSAR 的整体认知地图。',
        '',
        '## AutoSAR 不是什么？',
        '',
        '先澄清误解：',
        '',
        '- ❌ AutoSAR 不是操作系统 — BSW 包含 OS，但 AutoSAR 本身是架构标准',
        '- ❌ AutoSAR 不是代码生成器 — 虽然工具链会生成代码',
        '- ❌ AutoSAR 不是某种硬件 — 它在 MCU 上运行，但不绑定特定芯片',
        '',
        '## AutoSAR 是什么？',
        '',
        'AutoSAR 是一套汽车电子系统的分层软件架构规范。',
        '',
        '## 为什么要分层？',
        '',
        '传统嵌入式开发 = 直接操作寄存器。\n\n' +
        '```c\n' +
        '// 传统写法：直接操作寄存器\n' +
        '*(volatile uint32_t*)0x40020014 |= 0x01;\n\n' +
        '// AutoSAR 写法：通过标准 API\n' +
        'Can_Init(&canConfig);\n' +
        '```\n\n' +
        'AutoSAR 的好处在于：\n' +
        '1. 硬件无关 — 换 MCU 不需要重写应用层\n' +
        '2. 复用 — BSW 模块可以在不同项目间复用\n' +
        '3. 标准化 — 不同供应商的模块可以组合',
        '',
        '## 四层架构速览',
        '',
        '### MCAL（微控制器抽象层）',
        '最底层，直接操作 MCU 寄存器。Can、Dio、Spi、Mcu 等模块都在这一层。',
        '',
        '### ECUAL（ECU 抽象层）',
        '在 MCAL 之上，提供更高级的抽象。比如 CanIf、PduR、Com 等。',
        '',
        '### Service（服务层）',
        '系统级服务，如 NvM（非易失性存储器管理）、EcuM（ECU 状态管理）、OS。',
        '',
        '### RTE（运行时环境）',
        '应用层和 BSW 之间的"高速公路"——所有的跨层通信都通过 RTE 完成。',
        '',
        '## 学习路径建议',
        '',
        '1. 先理解架构\n' +
        '2. 从 MCAL 入手 — 选一个模块（比如 Can），读 API 定义，写简单的控制代码\n' +
        '3. 再到配置工具 — 了解如何用配置器生成 BSW 代码\n' +
        '4. 最后理解 RTE — 应用层和 BSW 如何通信',
        '',
        '## 小结',
        '',
        'AutoSAR 是一套标准，不是特定的软件实现。它的目标是解耦和复用。',
        '',
        '入门 AutoSAR，不需要先读 2000 页规范。先从理解分层架构开始，然后动手——用我们的在线沙盒跑一个 CAN 示例。',
      ].join('\n'),
      category_id: 'cat-001',
      tags: ['AutoSAR', '入门', '架构'],
      status: 'published',
      publishedAt: baseNow,
    },
    {
      title: 'Can_Init 到底干了啥？从调用到寄存器深入解读',
      slug: 'can-init-deep-dive',
      excerpt: 'AutoSAR Can_Init 是每个 BSW 开发者最早接触的 API 之一。本文将带你从函数签名一路深入到底层寄存器操作。',
      content: [
        '# Can_Init 到底干了啥？',
        '',
        '## 函数签名',
        '',
        '```c',
        'Std_ReturnType Can_Init(const Can_ConfigType* Config);',
        '```',
        '',
        '## 参数说明',
        'Config [in]: CAN 控制器配置结构体指针',
        '',
        '## 返回值',
        '- E_OK: 初始化成功',
        '- E_NOT_OK: 初始化失败',
        '',
        '## 它做了什么事？',
        '',
        '简单说：Can_Init 把 CAN 控制器从"复位状态"变成"工作状态"。',
        '',
        '具体包括：\n' +
        '1. 时钟使能 — 打开 CAN 控制器的外设时钟\n' +
        '2. 引脚配置 — 设置 CAN_TX/CAN_RX 为复用功能\n' +
        '3. 波特率配置 — 根据 Config 中的参数设置位时序\n' +
        '4. 滤波器配置 — 设置硬件报文过滤器\n' +
        '5. 中断配置 — 使能接收/发送/错误中断\n' +
        '6. 控制器模式 — 设置为正常模式或 Loopback 模式',
        '',
        '## 常见踩坑',
        '',
        '### 1. 多次调用 Can_Init',
        '规范明确：在没有 Can_DeInit 的情况下只能调用一次 Can_Init。重复调用行为未定义。',
        '',
        '### 2. Config 指针生命周期',
        'Can_Init 不会复制 Config 数据。Config 必须是全局或静态分配的。',
        '',
        '### 3. 中断优先级',
        'Can_Init 内部配置了 NVIC 中断优先级。注意不要和 OS 的中断配置冲突。',
        '',
        '## 实战：在 Sandbox 中体验',
        '打开在线沙盒，选择 CAN 示例，点击运行——你将看到 Can_Init 在虚拟 CAN 总线上产生的效果。',
      ].join('\n'),
      category_id: 'cat-002',
      tags: ['Can', 'MCAL', '初始化', 'API 详解'],
      status: 'published',
      publishedAt: new Date(baseNow.getTime() - 86400000),
    },
    {
      title: 'yuleCommunity 社区正式上线：AutoSAR 开发者的新家园',
      slug: 'yulecommunity-launch-announcement',
      excerpt: '经过数月的开发，yuleCommunity 社区正式与大家见面！一个专注于 AutoSAR BSW 开发的中文技术社区。',
      content: [
        '# 欢迎来到 yuleCommunity！',
        '',
        '我们很高兴地宣布，yuleCommunity — 专注于 AutoSAR BSW 开发的中文技术社区 — 今天正式上线了！',
        '',
        '## 为什么做这个社区？',
        '',
        'AutoSAR 的学习曲线很陡峭。规范文档 2000+ 页，英文，昂贵，还分散。',
        '',
        '我们是一群在汽车电子行业摸爬滚打多年的工程师。我们相信：一个好的开发者社区，可以让 AutoSAR 的学习成本降低 10 倍。',
        '',
        '## 你现在能做什么？',
        '',
        '### 规范浏览器',
        '浏览 AutoSAR Classic Platform 的完整规范，按层级（MCAL/ECUAL/Service/RTE）展开，搜索 API，查看参数说明。',
        '',
        '### 在线沙盒',
        '浏览器中运行 AutoSAR C 代码，观察 CAN 总线报文、GPIO 波形、中断时序——无需任何硬件。',
        '',
        '### 模块仓库',
        '浏览和下载社区贡献的 BSW 模块模板，一键导入 yuleASR 配置器。',
        '',
        '### 技术博客',
        '我们将持续发布 AutoSAR 相关的技术文章——从入门指南到深度分析。',
        '',
        '## 下一步计划',
        '- 更多模块的中文化规范',
        '- 云端编译服务（配置 → 代码 → 编译，全在线）',
        '- 社区问答和论坛',
        '',
        '## 加入我们',
        '注册账号，收藏你喜欢的文章，积分升级，参与社区建设。',
        '',
        '如果觉得有用，欢迎在朋友圈和微信群推荐给同行。',
      ].join('\n'),
      category_id: 'cat-005',
      tags: ['社区公告', '上线', 'AutoSAR'],
      status: 'published',
      publishedAt: new Date(baseNow.getTime() - 172800000),
    },
  ];
}

export function getSeedCategories() {
  return [
    { id: 'cat-001', name: 'AutoSAR 入门', slug: 'autosar-intro', desc: 'AutoSAR 基础知识与概念', order: 1 },
    { id: 'cat-002', name: 'MCAL 开发', slug: 'mcal-dev', desc: '微控制器抽象层开发实践', order: 2 },
    { id: 'cat-003', name: 'ECUAL 开发', slug: 'ecual-dev', desc: 'ECU 抽象层开发实践', order: 3 },
    { id: 'cat-004', name: '工具链与配置', slug: 'toolchain', desc: 'AutoSAR 工具链使用与配置技巧', order: 4 },
    { id: 'cat-005', name: '社区动态', slug: 'community', desc: '社区公告、活动、用户分享', order: 5 },
  ];
}
