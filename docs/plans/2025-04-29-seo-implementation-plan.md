# Phase 2: SEO 优化实施计划

**日期**: 2025-04-29  
**版本**: v1.2.2 (目标)  
**基于**: `docs/design/2025-04-29-seo-optimization-design.md`  
**决策**: AAA (OG程序生成 / Sitemap构建时更新 / 站长验证包含)

---

## 执行摘要

| 项目 | 内容 |
|------|------|
| **总工时** | 18.5h |
| **任务数** | 10 个 |
| **预计完成** | 2025-05-06 |
| **目标版本** | v1.2.2 |
| **输出文件** | sitemap.xml, OG图片, SEO组件 |

---

## 任务分解

### 阶段 1: 基础组件 (Day 1-2)

#### Task 1: 创建 SEO 目录结构
**ID**: T1  
**文件**: 创建 `src/components/seo/` 目录  
**工时**: 0.5h  
**依赖**: 无  

```
├── src/
    └── components/
        └── seo/
            ├── index.ts           # 导出所有组件
            ├── StructuredData.tsx  # 结构化数据
            ├── SocialMeta.tsx      # OG 标签
            └── SEOWrapper.tsx      # SEO 包装器
```

**验证**: 目录结构正确

---

#### Task 2: Sitemap 生成脚本
**ID**: T2  
**文件**: `scripts/generate-sitemap.ts`  
**工时**: 3h  
**依赖**: 无  

**功能**: 
- 读取所有路由和博客文章
- 生成符合标准的 XML
- 输出到 `public/sitemap.xml`

**验证**: `npm run generate:sitemap` 成功生成 XML

---

#### Task 3: StructuredData 组件
**ID**: T3  
**文件**: `src/components/seo/StructuredData.tsx`  
**工时**: 2h  
**依赖**: T1  

**支持类型**: Article, Organization, WebSite, BreadcrumbList  
**Props**: type, data (headline, author, datePublished, etc.)

**验证**: 渲染正确的 JSON-LD 脚本

---

#### Task 4: SocialMeta 组件
**ID**: T4  
**文件**: `src/components/seo/SocialMeta.tsx`  
**工时**: 2h  
**依赖**: T1  

**支持标签**: og:title, og:description, og:image, og:url, og:type, og:site_name, og:locale, twitter:card

**验证**: `<meta>` 标签正确注入 head

---

#### Task 5: SEOWrapper 组件
**ID**: T5  
**文件**: `src/components/seo/SEOWrapper.tsx`  
**工时**: 2h  
**依赖**: T3, T4  

**功能**: 统一包装器，组合 StructuredData + SocialMeta + 基础 meta

**Props**: title, description, keywords, ogImage, ogType, structuredData

**验证**: 单个组件完成所有 SEO 注入

---

### 阶段 2: OG 图片生成 (Day 3-4)

#### Task 6: OG 图片生成脚本
**ID**: T6  
**文件**: `scripts/generate-og-images.ts`  
**工时**: 6h  
**依赖**: 无  

**技术选型**: Node.js Canvas API (node-canvas / skia-canvas)  

**设计规格**:
- 尺寸: 1200x630
- 背景: 深色渐变 (#0f172a → #1e293b)
- 标题: 白色，最大 2 行，自动截断
- 描述: 灰色，最大 2 行
- Logo: 右上角 YuleTech logo

**输出**: `public/images/og/{slug}.png`  

**验证**: `npm run generate:og` 生成所有文章的 OG 图

---

### 阶段 3: 页面集成 (Day 5)

#### Task 7: 首页 SEO 集成
**ID**: T7  
**文件**: `src/pages/HomePage.tsx`  
**工时**: 1h  
**依赖**: T5  

**需要**: Organization + WebSite 结构化数据  
**验证**: Google Rich Results 测试通过

---

#### Task 8: 博客页 SEO 集成
**ID**: T8  
**文件**: `src/pages/BlogDetailPage.tsx`  
**工时**: 1.5h  
**依赖**: T5, T6  

**需要**: Article 结构化数据 + OG 图片  
**验证**: 分享到微信显示卡片

---

### 阶段 4: 配置与验证 (Day 6)

#### Task 9: robots.txt 更新
**ID**: T9  
**文件**: `public/robots.txt`  
**工时**: 0.5h  
**依赖**: T2  

**内容**: 
```
User-agent: *
Allow: /
Sitemap: https://frisky1985.github.io/yuleCommunity/sitemap.xml
```

**验证**: `/robots.txt` 可访问

---

#### Task 10: 构建脚本更新
**ID**: T10  
**文件**: `package.json`  
**工时**: 0.5h  
**依赖**: T2, T6  

**修改**:
```json
{
  "scripts": {
    "generate:sitemap": "tsx scripts/generate-sitemap.ts",
    "generate:og": "tsx scripts/generate-og-images.ts",
    "build": "npm run generate:sitemap && npm run generate:og && vite build"
  }
}
```

**验证**: `npm run build` 自动生成 SEO 资源

---

## 时间表

```
Day 1 (4.5h)
├── T1: 创建 SEO 目录结构 (0.5h)
├── T2: Sitemap 生成脚本 (3h)
└── T3: StructuredData 组件开始 (1h)

Day 2 (5h)
├── T3: StructuredData 完成 (1h)
├── T4: SocialMeta 组件 (2h)
└── T5: SEOWrapper 组件 (2h)

Day 3-4 (6h)
├── T6: OG 图片生成脚本 (6h)

Day 5 (2.5h)
├── T7: 首页 SEO 集成 (1h)
├── T8: 博客页 SEO 集成 (1.5h)

Day 6 (0.5h)
├── T9: robots.txt 更新 (0.5h)
└── T10: 构建脚本更新 (0.5h)
```

---

## Sprint 合约 (Done Criteria)

### 必须完成
- [ ] `public/sitemap.xml` 可访问且格式正确
- [ ] 首页包含 Organization + WebSite 结构化数据
- [ ] 博客文章页包含 Article 结构化数据
- [ ] 所有页面包含完整 OG 标签
- [ ] 每篇博客文章有独立 OG 图片
- [ ] `npm run build` 自动生成所有 SEO 资源

### 验证清单
- [ ] Google Rich Results 测试通过
- [ ] Facebook Sharing Debugger 显示正确卡片
- [ ] 微信分享显示卡片 (调试工具或手机测试)
- [ ] Sitemap 验证工具通过
- [ ] 构建无错误，所有测试通过

### 文档要求
- [ ] 每个组件有 JSDoc 注释
- [ ] 添加使用示例到 `docs/` 或 README

---

## 执行方案

### 方式 A: 循序执行 (推荐)
按任务依赖顺序依次完成，适合当前会话。

### 方式 B: 并行执行 (如果时间紧)
- 子任务 1: T1-T5 (组件开发)
- 子任务 2: T6 (OG图片) 并行进行
- 子任务 3: T7-T10 (集成配置)

---

## 风险预案

| 风险 | 发生时机 | 应对措施 |
|------|---------|---------|
| node-canvas 安装失败 | T6 | 使用 skia-canvas 或 Puppeteer 替代 |
| OG 图中文乱码 | T6 | 确保安装系统字体或使用图片字体 |
| Sitemap 路径错误 | T2 | 动态读取 base URL 配置 |

---

## 下一步

审批此计划后，进入 **Phase 4: Execute** 开始实施。

**建议启动指令**: "开始执行" 或 "开始开发 Phase 2"