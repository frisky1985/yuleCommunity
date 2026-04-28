# Phase 2: SEO 优化设计文档

**日期**: 2025-04-29  
**版本**: v1.2.2 (目标)  
**设计人**: OSH Architect Agent  
**状态**: 待审批

---

## 1. 需求分析

### 1.1 现状问题

| 问题 | 影响 | 优先级 |
|------|------|--------|
| 无 Sitemap | 搜索引擎无法发现所有页面 | P0 |
| 无 Open Graph | 社交分享无卡片展示 | P0 |
| 无结构化数据 | 搜索结果无富媒体展示 | P0 |
| 文章无独立 OG 图 | 分享效果差 | P1 |
| 未验证站长工具 | 无法监控搜索表现 | P2 |

### 1.2 目标

- **自然搜索流量**: 0 → 100/天 (4周内)
- **收录率**: 100% 页面被索引
- **社交分享**: 微信/微博展示完整卡片

---

## 2. 技术方案

### 2.1 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                    SEO 优化架构                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐      ┌──────────────────┐            │
│  │ Build Time       │      │ Runtime          │            │
│  │ 构建时生成       │      │ 运行时注入       │            │
│  └────────┬─────────┘      └────────┬─────────┘            │
│           │                         │                      │
│           ▼                         ▼                      │
│  ┌─────────────────┐    ┌──────────────────────┐          │
│  │ scripts/        │    │ src/components/seo/  │          │
│  │                 │    │                      │          │
│  │ • generate-     │    │ • StructuredData.tsx │          │
│  │   sitemap.ts    │    │ • SocialMeta.tsx     │          │
│  │                 │    │ • SEOWrapper.tsx     │          │
│  │ • generate-     │    │                      │          │
│  │   og-images.ts  │    │                      │          │
│  └────────┬────────┘    └──────────┬───────────┘          │
│           │                        │                      │
│           ▼                        ▼                      │
│  ┌─────────────────┐    ┌──────────────────────┐          │
│  │ public/         │    │ HTML <head>          │          │
│  │                 │    │                      │          │
│  │ • sitemap.xml   │    │ • <meta og:*>        │          │
│  │ • images/og/    │    │ • <script            │          │
│  │   *.png         │    │   type="application/  │          │
│  │                 │    │   ld+json">          │          │
│  └─────────────────┘    └──────────────────────┘          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 组件设计

#### 2.2.1 Sitemap 生成器

```typescript
// scripts/generate-sitemap.ts
interface SitemapConfig {
  baseUrl: string;           // https://frisky1985.github.io/yuleCommunity
  routes: string[];          // 静态路由
  articles: BlogArticle[];   // 博客文章
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  priority: number;          // 0.0 - 1.0
}

// 输出: public/sitemap.xml
```

**包含内容**:
- 首页 (priority: 1.0)
- 功能页面 (priority: 0.8)
- 博客列表 (priority: 0.9)
- 博客文章 (priority: 0.7, changefreq: weekly)

#### 2.2.2 结构化数据组件

```typescript
// src/components/seo/StructuredData.tsx
interface StructuredDataProps {
  type: 'Article' | 'Organization' | 'BreadcrumbList' | 'WebSite';
  data: {
    // Article
    headline?: string;
    description?: string;
    author?: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
    
    // Organization
    name?: string;
    url?: string;
    logo?: string;
    
    // Breadcrumb
    items?: Array<{name: string, url: string}>;
  };
}
```

**Schema.org 类型**:
1. **Organization** - 首页使用，描述社区组织
2. **WebSite** - 首页使用，站点搜索框
3. **Article** - 博客文章页使用
4. **BreadcrumbList** - 所有页面使用

#### 2.2.3 Open Graph 组件

```typescript
// src/components/seo/SocialMeta.tsx
interface SocialMetaProps {
  title: string;
  description: string;
  image: string;           // OG 图片 URL
  url: string;             // 页面 URL
  type: 'website' | 'article';
  siteName: string;
  locale: string;          // zh_CN
  
  // 可选
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}
```

**支持平台**:
- 微信 (WeChat)
- 微博 (Weibo)
- LinkedIn
- Twitter/X

#### 2.2.4 OG 图片生成器

```typescript
// scripts/generate-og-images.ts
interface OGImageConfig {
  width: number;           // 1200
  height: number;          // 630
  background: string;      // 渐变背景
  titleFont: string;       // 标题字体
  descFont: string;        // 描述字体
  logoPath: string;        // YuleTech logo
  outputDir: string;       // public/images/og/
}

// 为每篇博客文章生成独立 OG 图
```

**设计规格**:
- 尺寸: 1200x630 (Facebook/Twitter 标准)
- 背景: 深色渐变 (#0f172a → #1e293b)
- Logo: 右上角 YuleTech logo
- 标题: 白色，最大 2 行
- 描述: 灰色，最大 2 行

### 2.3 集成方案

#### 2.3.1 页面级 SEO 包装器

```typescript
// src/components/seo/SEOWrapper.tsx
interface SEOWrapperProps {
  // 基础
  title: string;
  description: string;
  keywords?: string[];
  
  // Open Graph
  ogImage?: string;
  ogType?: 'website' | 'article';
  
  // 结构化数据
  structuredData?: object;
  
  // 子元素
  children: React.ReactNode;
}

// 使用 Helmet 或原生操作 <head>
```

#### 2.3.2 博客文章页集成

```tsx
// src/pages/BlogDetailPage.tsx
<SEOWrapper
  title={`${article.title} - YuleTech 技术博客`}
  description={article.description}
  keywords={article.tags}
  ogImage={`/images/og/${article.slug}.png`}
  ogType="article"
  structuredData={{
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: article.author.name,
    datePublished: article.publishDate,
    image: article.coverImage,
  }}
>
  {/* 页面内容 */}
</SEOWrapper>
```

---

## 3. 构建流程

### 3.1 构建时脚本

```json
// package.json
{
  "scripts": {
    "build": "npm run generate:sitemap && npm run generate:og && vite build",
    "generate:sitemap": "tsx scripts/generate-sitemap.ts",
    "generate:og": "tsx scripts/generate-og-images.ts"
  }
}
```

### 3.2 CI/CD 集成

```yaml
# .github/workflows/deploy.yml
- name: Generate SEO assets
  run: |
    npm run generate:sitemap
    npm run generate:og
    
- name: Build
  run: npm run build
```

---

## 4. 验证方案

### 4.1 工具清单

| 工具 | 用途 | URL |
|------|------|-----|
| Google Rich Results | 结构化数据测试 | search.google.com/test/rich-results |
| Facebook Sharing Debugger | OG 标签测试 | developers.facebook.com/tools/debug |
| Twitter Card Validator | Twitter 卡片测试 | cards-dev.twitter.com/validator |
| Sitemap Validator | Sitemap 格式检查 | xml-sitemaps.com/validate-xml-sitemap.html |

### 4.2 手动验证清单

- [ ] Sitemap 可访问: `/sitemap.xml`
- [ ] robots.txt 包含 Sitemap 路径
- [ ] 首页 OG 标签完整
- [ ] 博客文章页结构化数据正确
- [ ] 微信分享显示卡片

---

## 5. 任务分解

### 5.1 任务列表

| 序号 | 任务 | 文件 | 工时 | 依赖 |
|------|------|------|------|------|
| 1 | 创建 SEO 目录结构 | `src/components/seo/` | 0.5h | - |
| 2 | Sitemap 生成脚本 | `scripts/generate-sitemap.ts` | 3h | - |
| 3 | StructuredData 组件 | `src/components/seo/StructuredData.tsx` | 2h | 1 |
| 4 | SocialMeta 组件 | `src/components/seo/SocialMeta.tsx` | 2h | 1 |
| 5 | SEOWrapper 组件 | `src/components/seo/SEOWrapper.tsx` | 2h | 3,4 |
| 6 | OG 图片生成脚本 | `scripts/generate-og-images.ts` | 6h | - |
| 7 | 首页 SEO 集成 | `src/pages/HomePage.tsx` | 1h | 5 |
| 8 | 博客页 SEO 集成 | `src/pages/BlogDetailPage.tsx` | 1.5h | 5,6 |
| 9 | robots.txt 更新 | `public/robots.txt` | 0.5h | 2 |
| 10 | 构建脚本更新 | `package.json` | 0.5h | 2,6 |

**合计**: 18.5h

### 5.2 依赖图

```
Week 1: SEO Core
├── Day 1: 1, 2, 3, 4 (基础组件)
├── Day 2: 5 (包装组件)
└── Day 3: 7, 8, 9, 10 (集成测试)

Week 2: OG Images
├── Day 4-5: 6 (图片生成)
└── Day 6-7: 验证优化
```

---

## 6. 风险与缓解

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|---------|
| OG 图生成依赖系统字体 | 中 | 中 | 使用 Canvas 备选方案 |
| Sitemap 构建时路由不全 | 低 | 高 | 动态扫描 src/App.tsx |
| 结构化数据格式错误 | 中 | 中 | 使用 TypeScript 类型检查 |
| 搜索收录延迟 | 高 | 中 | 第1周提交，预期2-4周见效 |

---

## 7. 决策点

### 需要确认的问题：

1. **OG 图片风格** - 是否需要设计师介入，还是使用程序生成？
   - A: 程序生成 (推荐，快速迭代)
   - B: 设计师提供模板 (质量高但慢)

2. **Sitemap 更新频率** - 需要每日自动更新还是构建时更新？
   - A: 构建时更新 (推荐，简单可靠)
   - B: 每日定时任务 (需要 GitHub Actions 定时触发)

3. **是否立即验证站长工具** - 需要现在申请验证文件吗？
   - A: 是，Phase 2 包含
   - B: 否，Phase 2 后单独进行

---

**等待用户审批后开始 Phase 3: Plan**