# YuleCommunity 技术博客系统架构设计

**版本**: v1.0  
**日期**: 2025-04-28  
**作者**: Architect Agent  
**状态**: 设计阶段

---

## 1. 概述

### 1.1 用户故事
作为 AutoSAR 工程师，我希望阅读技术博客文章，以便学习 BSW 模块的实现细节。

### 1.2 设计目标
- 提供高性能、SEO 友好的技术博客阅读体验
- 支持 Markdown 渲染和代码高亮
- 与现有 YuleCommunity 设计系统保持一致
- 支持标签分类、搜索和热门文章推荐

### 1.3 技术栈
- **前端**: React 19 + TypeScript + Vite
- **样式**: Tailwind CSS + CSS 变量
- **路由**: react-router-dom (Hash Router)
- **SEO**: react-helmet-async
- **Markdown**: react-markdown + react-syntax-highlighter
- **动画**: framer-motion

---

## 2. 系统架构图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              Blog System Architecture                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐      │
│  │   BlogListPage   │    │  BlogDetailPage  │    │   BlogSidebar    │      │
│  │   (博客列表页)    │    │   (博客详情页)    │    │   (侧边栏组件)    │      │
│  └────────┬─────────┘    └────────┬─────────┘    └──────────────────┘      │
│           │                       │                                         │
│           ▼                       ▼                                         │
│  ┌──────────────────┐    ┌──────────────────┐                              │
│  │   BlogCard       │    │  MarkdownRenderer│                              │
│  │   (文章卡片)      │    │  (Markdown渲染器) │                              │
│  └────────┬─────────┘    └────────┬─────────┘                              │
│           │                       │                                         │
│           └───────────┬───────────┘                                         │
│                       ▼                                                     │
│  ┌──────────────────────────────────────────────────────────────────┐      │
│  │                      Blog Service Layer                           │      │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │      │
│  │  │ Article API  │  │  Comment API │  │   Search API │           │      │
│  │  └──────────────┘  └──────────────┘  └──────────────┘           │      │
│  └──────────────────────────────────────────────────────────────────┘      │
│                       │                                                     │
│                       ▼                                                     │
│  ┌──────────────────────────────────────────────────────────────────┐      │
│  │                        Data Layer                                 │      │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │      │
│  │  │  Articles    │  │   Comments   │  │    Tags      │           │      │
│  │  │  (文章数据)   │  │   (评论数据)  │  │   (标签数据)  │           │      │
│  │  └──────────────┘  └──────────────┘  └──────────────┘           │      │
│  └──────────────────────────────────────────────────────────────────┘      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. 数据模型

### 3.1 文章模型 (BlogArticle)

```typescript
interface BlogArticle {
  /** 文章唯一标识 */
  id: string;
  /** 文章标题 */
  title: string;
  /** 文章摘要 */
  description: string;
  /** 完整内容 (Markdown 格式) */
  content: string;
  /** 作者信息 */
  author: Author;
  /** 发布日期 (ISO 8601) */
  publishDate: string;
  /** 最后更新日期 */
  updatedAt?: string;
  /** 阅读时长 (分钟) */
  readTime: number;
  /** 阅读量 */
  viewCount: number;
  /** 点赞数 */
  likeCount: number;
  /** 评论数 */
  commentCount: number;
  /** 标签列表 */
  tags: string[];
  /** 分类 */
  category: BlogCategory;
  /** 是否热门 */
  isHot: boolean;
  /** 封面图片 URL */
  coverImage?: string;
  /** SEO 元信息 */
  seo: SEOInfo;
}

interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio?: string;
}

interface SEOInfo {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

type BlogCategory = 
  | 'MCAL' 
  | 'ECUAL' 
  | 'Service' 
  | '工具链' 
  | '功能安全' 
  | '架构设计' 
  | '全部';
```

### 3.2 评论模型 (BlogComment)

```typescript
interface BlogComment {
  /** 评论唯一标识 */
  id: string;
  /** 所属文章 ID */
  articleId: string;
  /** 评论内容 */
  content: string;
  /** 评论作者 */
  author: CommentAuthor;
  /** 点赞数 */
  likes: number;
  /** 点赞用户列表 */
  likedBy: string[];
  /** 父评论 ID (用于回复) */
  parentId?: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt?: string;
}

interface CommentAuthor {
  id: string;
  name: string;
  avatar: string;
}
```

### 3.3 标签模型 (BlogTag)

```typescript
interface BlogTag {
  /** 标签名称 */
  name: string;
  /** 文章数量 */
  articleCount: number;
  /** 标签颜色 */
  color?: string;
}
```

---

## 4. 接口定义

### 4.1 文章服务接口 (IArticleService)

```typescript
interface IArticleService {
  /** 获取文章列表 */
  getArticles(params: ArticleQueryParams): Promise<PaginatedResult<BlogArticle>>;
  
  /** 获取单篇文章 */
  getArticleById(id: string): Promise<BlogArticle | null>;
  
  /** 根据 slug 获取文章 */
  getArticleBySlug(slug: string): Promise<BlogArticle | null>;
  
  /** 获取热门文章 */
  getHotArticles(limit?: number): Promise<BlogArticle[]>;
  
  /** 获取相关文章 */
  getRelatedArticles(articleId: string, limit?: number): Promise<BlogArticle[]>;
  
  /** 搜索文章 */
  searchArticles(query: string): Promise<BlogArticle[]>;
  
  /** 增加阅读量 */
  incrementViewCount(articleId: string): Promise<void>;
  
  /** 点赞文章 */
  toggleLike(articleId: string, userId: string): Promise<boolean>;
}

interface ArticleQueryParams {
  /** 分类过滤 */
  category?: BlogCategory;
  /** 标签过滤 */
  tag?: string;
  /** 作者过滤 */
  authorId?: string;
  /** 搜索关键词 */
  search?: string;
  /** 页码 */
  page?: number;
  /** 每页数量 */
  pageSize?: number;
  /** 排序方式 */
  sortBy?: 'date' | 'views' | 'likes';
  /** 排序方向 */
  sortOrder?: 'asc' | 'desc';
}

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

### 4.2 评论服务接口 (ICommentService)

```typescript
interface ICommentService {
  /** 获取文章评论 */
  getComments(articleId: string): Promise<BlogComment[]>;
  
  /** 添加评论 */
  addComment(articleId: string, content: string, author: CommentAuthor): Promise<BlogComment>;
  
  /** 删除评论 */
  deleteComment(commentId: string): Promise<boolean>;
  
  /** 点赞评论 */
  toggleCommentLike(commentId: string, userId: string): Promise<boolean>;
}
```

### 4.3 标签服务接口 (ITagService)

```typescript
interface ITagService {
  /** 获取所有标签 */
  getAllTags(): Promise<BlogTag[]>;
  
  /** 获取热门标签 */
  getHotTags(limit?: number): Promise<BlogTag[]>;
  
  /** 获取标签下的文章 */
  getArticlesByTag(tagName: string): Promise<BlogArticle[]>;
}
```

---

## 5. 路由设计

### 5.1 路由表

| 路由路径 | 组件 | 描述 |
|---------|------|------|
| `/blog` | BlogListPage | 博客列表页 (默认显示全部) |
| `/blog?category=MCAL` | BlogListPage | 按分类筛选 |
| `/blog?tag=CAN` | BlogListPage | 按标签筛选 |
| `/blog?search=keyword` | BlogListPage | 搜索结果页 |
| `/blog/:slug` | BlogDetailPage | 博客详情页 |

### 5.2 路由配置

```typescript
// App.tsx 路由配置
const routes = [
  {
    path: '/blog',
    element: <BlogListPage />,
  },
  {
    path: '/blog/:slug',
    element: <BlogDetailPage />,
  },
];
```

### 5.3 URL 设计规范

- **文章 slug**: 使用文章标题的拼音或英文缩写，如 `autosar-bsw-layered-architecture`
- **查询参数**:
  - `category`: 分类标识 (mcal, ecual, service 等)
  - `tag`: 标签名称
  - `search`: 搜索关键词
  - `page`: 页码
  - `sort`: 排序方式 (date, views, likes)

---

## 6. 组件规划

### 6.1 页面组件

```
src/pages/
├── BlogPage.tsx          # 现有 - 保持兼容
├── BlogListPage.tsx      # 新增 - 博客列表页
└── BlogDetailPage.tsx    # 新增 - 博客详情页
```

### 6.2 业务组件

```
src/components/blog/
├── BlogCard.tsx          # 博客文章卡片
├── BlogSidebar.tsx       # 侧边栏 (标签、热门、作者)
├── BlogSearch.tsx        # 搜索组件
├── BlogFilter.tsx        # 分类筛选器
├── BlogTagCloud.tsx      # 标签云
├── BlogAuthorCard.tsx    # 作者卡片
├── BlogComments.tsx      # 评论区组件
├── BlogCommentForm.tsx   # 评论表单
├── BlogTableOfContents.tsx # 文章目录
└── BlogRelatedArticles.tsx # 相关文章
```

### 6.3 基础组件

```
src/components/
├── MarkdownRenderer.tsx  # Markdown 渲染器 (增强版)
├── CodeBlock.tsx         # 现有 - 代码块组件
├── SEOHead.tsx           # SEO 头部组件
└── ShareButton.tsx       # 分享按钮
```

### 6.4 组件详细设计

#### BlogCard 组件

```typescript
interface BlogCardProps {
  article: BlogArticle;
  variant?: 'default' | 'compact' | 'featured';
  showExcerpt?: boolean;
  showAuthor?: boolean;
  showStats?: boolean;
  onClick?: () => void;
  onTagClick?: (tag: string) => void;
}
```

#### MarkdownRenderer 组件

```typescript
interface MarkdownRendererProps {
  content: string;
  enableToc?: boolean;
  onTocGenerated?: (toc: TocItem[]) => void;
  components?: Record<string, React.ComponentType>;
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}
```

#### SEOHead 组件

```typescript
interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'article' | 'website';
  author?: string;
  publishDate?: string;
  canonicalUrl?: string;
}
```

---

## 7. 状态管理

### 7.1 本地状态 (Local Storage)

```typescript
// 存储键名
const STORAGE_KEYS = {
  LIKED_ARTICLES: 'yuletech:blog:liked',
  COMMENTS: 'yuletech:blog:comments',
  READING_HISTORY: 'yuletech:blog:history',
  SEARCH_HISTORY: 'yuletech:blog:search-history',
};
```

### 7.2 React Hooks

```typescript
// 使用示例
const useArticles = (params: ArticleQueryParams) => { ... };
const useArticle = (slug: string) => { ... };
const useComments = (articleId: string) => { ... };
const useTags = () => { ... };
const useArticleLikes = (articleId: string) => { ... };
```

---

## 8. SEO 策略

### 8.1 页面级 SEO

每个页面使用 `react-helmet-async` 注入 meta 标签：

```tsx
// BlogDetailPage.tsx
<Helmet>
  <title>{article.seo.title} - YuleTech 技术博客</title>
  <meta name="description" content={article.seo.description} />
  <meta name="keywords" content={article.seo.keywords.join(', ')} />
  
  {/* Open Graph */}
  <meta property="og:title" content={article.seo.title} />
  <meta property="og:description" content={article.seo.description} />
  <meta property="og:type" content="article" />
  <meta property="og:image" content={article.seo.ogImage} />
  
  {/* Article specific */}
  <meta property="article:author" content={article.author.name} />
  <meta property="article:published_time" content={article.publishDate} />
  <meta property="article:section" content={article.category} />
  {article.tags.map(tag => (
    <meta key={tag} property="article:tag" content={tag} />
  ))}
  
  {/* Canonical URL */}
  <link rel="canonical" href={`${siteUrl}/blog/${article.slug}`} />
</Helmet>
```

### 8.2 结构化数据 (JSON-LD)

```typescript
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: article.title,
  description: article.description,
  author: {
    '@type': 'Person',
    name: article.author.name,
  },
  datePublished: article.publishDate,
  dateModified: article.updatedAt,
  articleSection: article.category,
  keywords: article.tags.join(','),
};
```

---

## 9. 性能优化

### 9.1 代码分割

```typescript
// 懒加载博客页面
const BlogListPage = lazy(() => import('./pages/BlogListPage'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'));

// 预加载策略
const prefetchArticle = (slug: string) => {
  import('./pages/BlogDetailPage');
};
```

### 9.2 虚拟滚动 (长列表)

对于文章列表使用虚拟滚动优化：

```typescript
import { VirtualList } from 'react-window';

<VirtualList
  height={600}
  itemCount={articles.length}
  itemSize={200}
  width="100%"
>
  {({ index, style }) => (
    <BlogCard article={articles[index]} style={style} />
  )}
</VirtualList>
```

### 9.3 图片优化

- 使用 WebP 格式
- 懒加载非首屏图片
- 提供响应式图片 srcset

### 9.4 缓存策略

```typescript
// SWR 配置
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000,
  errorRetryCount: 3,
};
```

---

## 10. 与现有系统整合

### 10.1 样式一致性

使用现有 CSS 变量系统：

```css
/* 复用现有变量 */
--background: 220 20% 98%;
--foreground: 222 47% 11%;
--primary: 215 80% 25%;
--accent: 175 75% 40%;
--card: 0 0% 100%;
--border: 214 32% 91%;
```

### 10.2 组件复用

复用现有组件：
- `Card`, `Button` - UI 基础组件
- `CodeBlock` - 代码高亮
- `OptimizedImage` - 图片优化
- `AnimatedPage` - 页面动画

### 10.3 向后兼容

保持现有 `BlogPage.tsx` 兼容性，逐步迁移：

```typescript
// BlogPage.tsx - 保持现有导出
export { BlogPage } from './BlogPage';
export { articlesData } from './data/articles';

// 新增页面逐步替换
```

---

## 11. 数据存储方案

### 11.1 当前阶段 (静态数据)

```typescript
// src/data/articles.ts
export const articles: BlogArticle[] = [
  // 文章数据...
];
```

### 11.2 未来扩展 (API 接入)

```typescript
// src/services/articleApi.ts
const API_BASE = import.meta.env.VITE_API_URL;

export const articleApi = {
  getArticles: (params) => fetch(`${API_BASE}/articles`, { params }),
  getArticle: (slug) => fetch(`${API_BASE}/articles/${slug}`),
  // ...
};
```

---

## 12. 风险评估与缓解策略

### 12.1 风险清单

| 风险 | 等级 | 影响 | 缓解策略 |
|-----|------|------|---------|
| SEO 不友好 (Hash Router) | 中 | 搜索引擎收录受限 | 使用 SSR 或预渲染；提交 Sitemap |
| 文章数据量大 | 低 | 首屏加载慢 | 虚拟滚动；分页加载；CDN 加速 |
| Markdown 渲染性能 | 低 | 大文章渲染卡顿 | 分片渲染；Web Worker 处理 |
| XSS 攻击 (Markdown) | 中 | 安全漏洞 | 使用 DOMPurify 过滤；严格 CSP |
| 浏览器兼容性 | 低 | 旧浏览器不支持 | Babel 转译；Polyfill；优雅降级 |

### 12.2 详细缓解方案

#### SEO 缓解

```typescript
// 预渲染配置 (vite.config.ts)
export default defineConfig({
  plugins: [
    prerender({
      routes: ['/blog', '/blog/article-1', '/blog/article-2'],
    }),
  ],
});
```

#### XSS 防护

```typescript
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const renderMarkdown = (content: string) => {
  const rawHtml = marked(content);
  return DOMPurify.sanitize(rawHtml);
};
```

---

## 13. 测试策略

### 13.1 单元测试

```typescript
// BlogCard.test.tsx
describe('BlogCard', () => {
  it('should render article title and excerpt', () => {
    render(<BlogCard article={mockArticle} />);
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
  });
  
  it('should call onClick when clicked', () => {
    const onClick = vi.fn();
    render(<BlogCard article={mockArticle} onClick={onClick} />);
    fireEvent.click(screen.getByRole('article'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### 13.2 E2E 测试

```typescript
// blog.spec.ts
test('blog list page', async ({ page }) => {
  await page.goto('/blog');
  await expect(page).toHaveTitle(/技术博客/);
  await page.click('[data-testid="category-mcal"]');
  await expect(page.locator('[data-testid="article-card"]')).toHaveCount(5);
});
```

---

## 14. 实现路线图

### Phase 1: 基础架构 (Week 1)
- [ ] 创建数据模型和接口定义
- [ ] 实现 BlogCard 组件
- [ ] 实现 BlogSidebar 组件
- [ ] 配置路由

### Phase 2: 核心功能 (Week 2)
- [ ] 实现 BlogListPage
- [ ] 实现 BlogDetailPage
- [ ] 集成 Markdown 渲染
- [ ] 实现评论功能

### Phase 3: SEO & 优化 (Week 3)
- [ ] 添加 SEO meta 标签
- [ ] 实现结构化数据
- [ ] 性能优化 (懒加载、缓存)
- [ ] 添加加载状态

### Phase 4: 完善 (Week 4)
- [ ] 响应式适配
- [ ] 无障碍支持
- [ ] 单元测试
- [ ] 文档更新

---

## 15. 附录

### 15.1 命名规范

- **组件**: PascalCase (e.g., `BlogCard.tsx`)
- **Hooks**: camelCase with use prefix (e.g., `useArticles.ts`)
- **工具函数**: camelCase (e.g., `formatDate.ts`)
- **常量**: UPPER_SNAKE_CASE (e.g., `ARTICLES_PER_PAGE`)
- **类型**: PascalCase with suffix (e.g., `BlogArticle`, `ArticleDTO`)

### 15.2 文件结构

```
src/
├── components/
│   ├── blog/              # 博客专用组件
│   ├── ui/                # 通用 UI 组件
│   ├── MarkdownRenderer.tsx
│   └── SEOHead.tsx
├── pages/
│   ├── BlogListPage.tsx
│   └── BlogDetailPage.tsx
├── hooks/
│   ├── useArticles.ts
│   ├── useArticle.ts
│   └── useComments.ts
├── services/
│   ├── articleService.ts
│   └── commentService.ts
├── data/
│   └── articles.ts        # 静态文章数据
├── types/
│   └── blog.ts            # 类型定义
└── utils/
    ├── markdown.ts        # Markdown 工具
    └── seo.ts             # SEO 工具
```

### 15.3 参考资料

- [React Router v6 文档](https://reactrouter.com/)
- [react-markdown 文档](https://github.com/remarkjs/react-markdown)
- [Schema.org TechArticle](https://schema.org/TechArticle)
- [Google SEO 指南](https://developers.google.com/search/docs)

---

**文档结束**