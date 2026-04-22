# YuleTech Open Source Community

> 上海予乐电子科技有限公司 - 开源技术社区官网

## 项目简介

基于予乐科技 MBA 论文《YL 汽车软件公司商业模式优化研究》中第 5.3 章"开源社区建设"构想，打造的予乐开源技术社区官方网站 MVP。

网站定位：面向 AutoSAR BSW 开发者、汽车电子工程师、芯片厂商和高校研究人员的技术社区平台。

## 技术栈

- **框架**: React 19 + TypeScript
- **构建工具**: Vite 6
- **样式**: Tailwind CSS 4
- **UI 组件**: shadcn/ui
- **图标**: Lucide React
- **字体**: Geist Sans + Geist Mono

## 项目结构

```
yuletech-community/
├── public/
│   └── images/          # 网站图片资源（AI 生成）
│       ├── hero-bg.jpg
│       ├── feature-code.jpg
│       ├── feature-toolchain.jpg
│       ├── feature-learning.jpg
│       └── feature-hardware.jpg
├── src/
│   ├── components/      # React 组件
│   │   ├── Navbar.tsx       # 顶部导航
│   │   ├── Hero.tsx         # 首屏 Hero
│   │   ├── Features.tsx     # 核心功能展示
│   │   ├── Stats.tsx        # 数据统计
│   │   ├── OpenSource.tsx   # 开源架构展示
│   │   ├── Community.tsx    # 社区活动
│   │   ├── CTA.tsx          # 行动号召
│   │   └── Footer.tsx       # 页脚
│   ├── App.tsx          # 主应用
│   ├── index.css        # 设计系统 + Tailwind
│   └── main.tsx         # 入口
├── dist/                # 生产构建输出
└── index.html           # HTML 模板
```

## 页面模块

| 模块 | 说明 |
|:-----|:-----|
| Hero | 全屏首屏，品牌 slogan，双 CTA 按钮 |
| Features | 四大核心能力：源码开放、工具链、学习、硬件 |
| Stats | 动态数字：代码行数、贡献者、模块数、下载量 |
| OpenSource | AutoSAR BSW 四层架构可视化 |
| Community | 社区活动和成员评价 |
| CTA | 加入社区行动号召 |
| Footer | 多栏导航和资源链接 |

## 设计系统

- **主色**: `#0B3D91` (深蓝)
- **强调色**: `#1DBCB8` (青绿)
- **渐变**: `135deg` 深蓝到青绿
- **字体**: Geist Sans / Geist Mono
- **动效**: Intersection Observer 触发动画

## 构建

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 预览
npm run preview
```

## 论文依据

本社区网站的业务模型映射自论文商业模式画布：
- **核心价值主张**: 国产替代 AutoSAR BSW 开源方案
- **客户细分**: OEM/Tier1/Tier2/高校/个人开发者
- **关键资源**: MCAL 9 驱动 + ECUAL 9 模块 + Service 5 模块 + RTE
- **收入来源**: 商业授权、技术支持、定制开发、培训认证

## 许可证

MIT © 上海予乐电子科技有限公司
