# Phase 3: Engagement & Conversion Optimization 设计文档

**日期**: 2025-04-29  
**版本**: v1.3.0 → v1.4.0  
**预计工时**: 17h

---

## 1. 设计目标

### 1.1 业务目标
- 微信社群人数: 0 → 200
- Newsletter 订阅: 0 → 100
- 用户停留时间提升 20%

### 1.2 技术目标
- 零侵入式集成 (不影响现有功能)
- 本地存储用户行为数据
- 响应式设计 (移动端优先)

---

## 2. 组件架构

```
┌─────────────────────────────────────────────────────────────┐
│                  Phase 3: 用户互动组件架构                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           WechatCommunity (微信社群入口)             │    │
│  │  ┌─────────────────────────────────────────────┐   │    │
│  │  │  • 悬浮按钮 (右下角)                          │   │    │
│  │  │  • 二维码弹窗                                 │   │    │
│  │  │  • 关键词自动回复提示                          │   │    │
│  │  └─────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           NewsletterSignup (邮件订阅)                │    │
│  │  ┌─────────────────────────────────────────────┐   │    │
│  │  │  • 博客列表页嵌入                             │   │    │
│  │  │  • 文章页底部                                 │   │    │
│  │  │  • 弹窗式 (退出意图检测)                       │   │    │
│  │  │  • 邮箱验证 + 欢迎邮件                         │   │    │
│  │  └─────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           BookmarkButton (收藏功能)                  │    │
│  │  ┌─────────────────────────────────────────────┐   │    │
│  │  │  • 文章页悬浮按钮                             │   │    │
│  │  │  • 收藏列表页面                               │   │    │
│  │  │  • 本地存储持久化                             │   │    │
│  │  └─────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           RelatedArticles (相关推荐)                 │    │
│  │  ┌─────────────────────────────────────────────┐   │    │
│  │  │  • 基于标签相似度算法                         │   │    │
│  │  │  • 文章页底部推荐                             │   │    │
│  │  │  • 最大 4 篇相关文章                          │   │    │
│  │  └─────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 详细设计

### 3.1 WechatCommunity 组件

**文件**: `src/components/engagement/WechatCommunity.tsx`

**功能规格**:
```typescript
interface WechatCommunityProps {
  // 显示位置
  position?: 'bottom-right' | 'bottom-left';
  // 偏移量
  offset?: { x: number; y: number };
  // 动画延迟
  delay?: number;
}
```

**交互流程**:
```
1. 用户进入页面
   ↓
2. 显示悬浮按钮 (微信图标 + "加入社群" 提示)
   ↓
3. 用户点击
   ↓
4. 弹出二维码弹窗
   ├─ 社群二维码图片
   ├─ 添加说明文字
   ├─ 关键词提示 ("回复【进群】获取邀请")
   └─ 关闭按钮
   ↓
5. 用户关闭后，按钮变为迷你模式
```

**本地存储**:
```typescript
// 记录用户是否已关闭提示
const WECHAT_PROMPT_KEY = 'yuletech:wechat:dismissed';
// 记录点击次数
const WECHAT_CLICK_KEY = 'yuletech:wechat:clicks';
```

---

### 3.2 NewsletterSignup 组件

**文件**: `src/components/engagement/NewsletterSignup.tsx`

**三种变体**:

#### A. Inline 嵌入版 (博客列表页)
```typescript
interface InlineNewsletterProps {
  variant: 'inline';
  className?: string;
}
```
- 显示在博客列表页顶部或底部
- 简洁的邮箱输入框 + 订阅按钮

#### B. 文章页底部版
```typescript
interface ArticleNewsletterProps {
  variant: 'article-end';
  articleTitle?: string;
}
```
- 显示在文章阅读完成后
- 提示 "喜欢这篇文章？订阅获取更多"

#### C. 弹窗版 (退出意图)
```typescript
interface PopupNewsletterProps {
  variant: 'popup';
  // 延迟显示时间 (秒)
  delay?: number;
  // 是否启用退出意图检测
  enableExitIntent?: boolean;
}
```
- 检测鼠标移出视口上方时触发
- 仅显示一次 (本地存储标记)

**邮箱验证**:
```typescript
// 验证规则
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 存储已订阅邮箱
const SUBSCRIBED_KEY = 'yuletech:newsletter:subscribed';
```

**UI 设计**:
```
┌─────────────────────────────────────┐
│         📧 订阅技术周报              │
├─────────────────────────────────────┤
│                                     │
│  每周精选 AutoSAR 干货              │
│  独家教程 + 源码解读 + 行业动态      │
│                                     │
│  ┌─────────────────────────────┐   │
│  │ 输入您的邮箱地址            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │      立即订阅               │   │
│  └─────────────────────────────┘   │
│                                     │
│  🔒 无垃圾邮件，随时取消订阅         │
│                                     │
└─────────────────────────────────────┘
```

---

### 3.3 BookmarkButton 组件

**文件**: `src/components/engagement/BookmarkButton.tsx`

**功能规格**:
```typescript
interface BookmarkButtonProps {
  articleId: string;
  articleTitle: string;
  variant?: 'icon' | 'button';
  showCount?: boolean;
}
```

**本地存储结构**:
```typescript
interface BookmarkedArticle {
  id: string;
  title: string;
  slug: string;
  bookmarkedAt: string;
}

const BOOKMARKS_KEY = 'yuletech:bookmarks';
```

**交互设计**:
- 空心书签图标 → 点击 → 实心书签图标 + Toast 提示
- 已收藏状态持久化显示
- 点击已收藏 → 取消收藏

**收藏列表页面**:
- 路由: `/bookmarks`
- 显示所有收藏的文章
- 支持删除单个/清空全部

---

### 3.4 RelatedArticles 组件

**文件**: `src/components/blog/RelatedArticles.tsx`

**算法**:
```typescript
function calculateSimilarity(articleA: BlogArticle, articleB: BlogArticle): number {
  let score = 0;
  
  // 相同分类 +3
  if (articleA.category === articleB.category) score += 3;
  
  // 相同标签，每个 +1
  const commonTags = articleA.tags.filter(tag => articleB.tags.includes(tag));
  score += commonTags.length;
  
  // 相同作者 +1
  if (articleA.author.id === articleB.author.id) score += 1;
  
  return score;
}
```

**显示规则**:
- 最多显示 4 篇
- 按相似度分数排序
- 排除当前文章

---

## 4. 数据流设计

### 4.1 本地存储 Key 规范

```typescript
// 用户互动相关
const STORAGE_KEYS = {
  // 微信社群
  WECHAT_DISMISSED: 'yuletech:wechat:dismissed',
  WECHAT_CLICKS: 'yuletech:wechat:clicks',
  
  // Newsletter
  NEWSLETTER_SUBSCRIBED: 'yuletech:newsletter:subscribed',
  NEWSLETTER_EMAIL: 'yuletech:newsletter:email',
  NEWSLETTER_POPUP_SHOWN: 'yuletech:newsletter:popup-shown',
  
  // 收藏
  BOOKMARKS: 'yuletech:bookmarks',
  
  // 阅读历史
  READING_HISTORY: 'yuletech:reading:history',
} as const;
```

### 4.2 Hook 设计

```typescript
// src/hooks/useBookmarks.ts
export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<BookmarkedArticle[]>(
    STORAGE_KEYS.BOOKMARKS, 
    []
  );
  
  const addBookmark = (article: BlogArticle) => { ... };
  const removeBookmark = (articleId: string) => { ... };
  const isBookmarked = (articleId: string) => { ... };
  
  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}

// src/hooks/useNewsletter.ts
export function useNewsletter() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscribe = async (email: string) => { ... };
  return { isSubscribed, subscribe };
}
```

---

## 5. 页面集成点

### 5.1 App.tsx (全局)
```tsx
// 微信社群悬浮按钮 (全局显示)
<WechatCommunity position="bottom-right" delay={3000} />

// Newsletter 弹窗 (仅非订阅用户)
<NewsletterSignup variant="popup" enableExitIntent />
```

### 5.2 BlogListPage.tsx
```tsx
// 顶部 Newsletter 嵌入
<NewsletterSignup variant="inline" />

// 文章卡片添加收藏按钮
<ArticleCard bookmarkable />
```

### 5.3 BlogDetailPage.tsx
```tsx
// 文章页添加收藏按钮
<BookmarkButton 
  articleId={article.id} 
  articleTitle={article.title}
  variant="icon" 
/>

// 文章底部 Newsletter
<NewsletterSignup variant="article-end" articleTitle={article.title} />

// 相关文章推荐
<RelatedArticles 
  currentArticle={article} 
  articles={allArticles}
  maxCount={4}
/>
```

### 5.4 新增 BookmarksPage.tsx
```tsx
// 收藏列表页面
<Route path="/bookmarks" element={<BookmarksPage />} />
```

---

## 6. 样式规范

### 6.1 微信社群按钮
- 尺寸: 56px × 56px (悬浮按钮)
- 颜色: #07C160 (微信绿)
- 图标: MessageCircle
- 阴影: lg
- 圆角: full

### 6.2 Newsletter 弹窗
- 最大宽度: 480px
- 背景: card
- 边框: border
- 圆角: 2xl
- 遮罩: bg-black/50 backdrop-blur-sm

### 6.3 收藏按钮
- 尺寸: 40px × 40px
- 颜色: 
  - 未收藏: text-muted-foreground
  - 已收藏: text-yellow-500 fill-yellow-500
- 动画: scale + bounce

---

## 7. 性能考虑

### 7.1 懒加载
- Newsletter 弹窗组件动态导入
- 二维码图片懒加载

### 7.2 防抖
- 订阅按钮点击防抖 1s
- 收藏操作防抖 300ms

### 7.3 存储限制
- 最多存储 100 篇收藏
- 阅读历史最多 50 条

---

## 8. 无障碍支持

### 8.1 ARIA 标签
```tsx
<button 
  aria-label={isBookmarked ? "取消收藏" : "添加收藏"}
  aria-pressed={isBookmarked}
>
  <BookmarkIcon />
</button>
```

### 8.2 键盘导航
- Tab 顺序合理
- Enter/Space 触发按钮
- ESC 关闭弹窗

### 8.3 焦点管理
- 弹窗打开时聚焦到第一个输入框
- 弹窗关闭时焦点回到触发按钮

---

## 9. 测试策略

### 9.1 单元测试
- 收藏功能 Hook 测试
- Newsletter 验证逻辑测试
- 相似度算法测试

### 9.2 集成测试
- 弹窗显示/关闭流程
- 本地存储持久化
- 页面集成点

### 9.3 E2E 测试
- 完整收藏流程
- Newsletter 订阅流程

---

## 10. 实施计划

| 任务 | 工时 | 依赖 | 优先级 |
|------|------|------|--------|
| WechatCommunity | 4h | 无 | P0 |
| NewsletterSignup | 6h | 无 | P0 |
| BookmarkButton | 4h | useBookmarks hook | P1 |
| RelatedArticles | 3h | 相似度算法 | P1 |
| 集成测试 | 2h | 全部组件 | P2 |
| **总计** | **19h** | | |

---

## 11. 验收标准

- [ ] 微信社群按钮显示正常，点击弹出二维码
- [ ] Newsletter 订阅表单验证通过，本地存储标记
- [ ] 收藏功能工作正常，收藏列表页面可访问
- [ ] 相关文章推荐显示 2-4 篇相关文章
- [ ] 所有组件支持响应式设计
- [ ] 单元测试覆盖率 > 80%
- [ ] Lighthouse Accessibility > 95

---

**下一步**: 创建实施计划文档，开始组件开发
