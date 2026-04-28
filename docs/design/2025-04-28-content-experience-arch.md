# 内容体验优化组件架构设计

**日期**: 2025-04-28  
**版本**: v1.0  
**作者**: Architect Agent  
**关联计划**: [优化主计划](../plans/2025-04-28-optimization-master-plan.md)

---

## 目录

1. [架构概览](#架构概览)
2. [组件详细设计](#组件详细设计)
   - [ReadingProgress](#1-readingprogress)
   - [CodeBlock](#2-codeblock)
   - [ImageLightbox](#3-imagelightbox)
   - [ScrollToTop](#4-scrolltotop)
3. [集成方案](#集成方案)
4. [无障碍支持](#无障碍支持)
5. [性能优化](#性能优化)
6. [测试策略](#测试策略)

---

## 架构概览

### 组件关系图

```
┌─────────────────────────────────────────────────────────────────┐
│                        BlogDetailPage                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────────────────────────────────┐  │
│  │ReadingProgress│  │              文章主体区域                │  │
│  │ (fixed top)  │  │  ┌─────────────────────────────────┐   │  │
│  └──────────────┘  │  │     MarkdownRenderer            │   │  │
│                    │  │  ┌───────────────────────────┐  │   │  │
│                    │  │  │   img → ImageLightbox    │  │   │  │
│                    │  │  │   pre → CodeBlock        │  │   │  │
│                    │  │  └───────────────────────────┘  │   │  │
│                    │  └─────────────────────────────────┘   │  │
│                    └─────────────────────────────────────────┘  │
│                                                                │
│  ┌──────────────┐                                    ┌────────┐│
│  │  ScrollToTop │                                    │ Sidebar││
│  │ (fixed right)│                                    │ (TOC)  ││
│  └──────────────┘                                    └────────┘│
└─────────────────────────────────────────────────────────────────┘
```

### 技术栈

- **React 19** - 组件框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式系统
- **Framer Motion** - 动画效果
- **Lucide React** - 图标库

---

## 组件详细设计

### 1. ReadingProgress

**文件**: `src/components/blog/ReadingProgress.tsx`

#### 功能描述
页面顶部固定进度条，实时显示文章阅读进度，与文章内容区域联动。

#### Props 接口

```typescript
export interface ReadingProgressProps {
  /** 目标容器选择器 (默认: 'article') */
  targetSelector?: string;
  /** 
   * 进度计算模式
   * - 'viewport': 基于视口滚动位置
   * - 'element': 基于目标元素滚动位置
   * @default 'element'
   */
  mode?: 'viewport' | 'element';
  /** 进度条颜色 (默认: hsl(var(--primary))) */
  color?: string;
  /** 进度条高度 (默认: 3px) */
  height?: number;
  /** 进度变化回调 */
  onProgressChange?: (progress: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 是否显示百分比文字 (默认: false) */
  showPercentage?: boolean;
  /** 百分比位置 (默认: 'right') */
  percentagePosition?: 'left' | 'right';
}
```

#### 状态管理

```typescript
interface ReadingProgressState {
  /** 当前进度 (0-100) */
  progress: number;
  /** 是否可见 */
  isVisible: boolean;
  /** 目标元素引用 */
  targetElement: HTMLElement | null;
}
```

#### 核心逻辑

```typescript
// 使用 requestAnimationFrame 优化滚动监听
const updateProgress = useCallback(() => {
  if (!targetElement) return;
  
  const rect = targetElement.getBoundingClientRect();
  const elementHeight = targetElement.offsetHeight;
  const windowHeight = window.innerHeight;
  
  // 计算可滚动距离
  const scrollableDistance = elementHeight - windowHeight + rect.top;
  const scrolled = -rect.top;
  
  // 计算进度
  const rawProgress = (scrolled / scrollableDistance) * 100;
  const clampedProgress = Math.max(0, Math.min(100, rawProgress));
  
  setProgress(Math.round(clampedProgress));
}, [targetElement]);

// 节流处理滚动事件
useEffect(() => {
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [updateProgress]);
```

#### ARIA 支持

```typescript
// 进度条语义化
<div
  role="progressbar"
  aria-valuenow={progress}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="阅读进度"
  aria-live="polite"
  aria-atomic="true"
>
  {/* 视觉隐藏的文字，供屏幕阅读器使用 */}
  <span className="sr-only">
    已阅读 {progress}%
  </span>
</div>
```

#### 样式规范

```css
.reading-progress {
  @apply fixed top-0 left-0 right-0 z-50;
  @apply bg-transparent;
}

.reading-progress-bar {
  @apply h-[3px] transition-transform duration-150 ease-out;
  @apply bg-primary;
  transform-origin: left;
  will-change: transform;
}
```

---

### 2. CodeBlock

**文件**: `src/components/blog/CodeBlock.tsx` (增强现有组件)

#### 功能描述
基于现有 MarkdownRenderer 增强代码块，添加悬停复制按钮和复制成功反馈。

#### Props 接口

```typescript
export interface EnhancedCodeBlockProps {
  /** 代码内容 */
  code: string;
  /** 编程语言 */
  language?: string;
  /** 是否显示行号 (默认: true) */
  showLineNumbers?: boolean;
  /** 是否可折叠 (默认: false) */
  collapsible?: boolean;
  /** 默认折叠状态 (默认: false) */
  defaultCollapsed?: boolean;
  /** 代码块标题 */
  filename?: string;
  /** 复制成功回调 */
  onCopy?: () => void;
  /** 自定义类名 */
  className?: string;
}

// 复制按钮专用 Props
export interface CopyButtonProps {
  /** 要复制的文本 */
  text: string;
  /** 复制成功显示时长 (ms) (默认: 2000) */
  successDuration?: number;
  /** 复制成功回调 */
  onCopy?: () => void;
  /** 按钮大小 (默认: 'sm') */
  size?: 'sm' | 'md' | 'lg';
  /** 自定义类名 */
  className?: string;
}
```

#### 状态管理

```typescript
interface CodeBlockState {
  /** 是否已复制 */
  copied: boolean;
  /** 是否悬停 */
  isHovered: boolean;
  /** 是否展开 (可折叠模式) */
  isExpanded: boolean;
  /** 复制按钮位置 */
  buttonPosition: { x: number; y: number };
}
```

#### 核心逻辑 - 复制功能

```typescript
const handleCopy = useCallback(async () => {
  try {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.();
    
    // 重置复制状态
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, successDuration);
  } catch (err) {
    console.error('Failed to copy:', err);
    // 降级方案：使用 execCommand
    fallbackCopy(code);
  }
}, [code, onCopy, successDuration]);

// 降级复制方案
const fallbackCopy = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    setCopied(true);
  } catch (err) {
    console.error('Fallback copy failed:', err);
  } finally {
    document.body.removeChild(textarea);
  }
};
```

#### ARIA 支持

```typescript
<button
  type="button"
  onClick={handleCopy}
  aria-label={copied ? '代码已复制' : '复制代码到剪贴板'}
  aria-live="polite"
  aria-atomic="true"
>
  {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
  <span className="sr-only">
    {copied ? '复制成功' : '复制代码'}
  </span>
</button>
```

#### 动画效果 (Framer Motion)

```typescript
// 复制成功反馈动画
const copyAnimation = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { type: 'spring', stiffness: 500, damping: 30 }
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

// 按钮悬停动画
const buttonHoverAnimation = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};
```

#### MarkdownRenderer 集成点

```typescript
// 在 MarkdownRenderer.tsx 中替换 code 组件
code: ({ className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const isInline = !className;

  if (isInline) {
    return (
      <code className="..." {...props}>
        {children}
      </code>
    );
  }

  return (
    <CodeBlock
      code={String(children).replace(/\n$/, '')}
      language={language}
      showLineNumbers
    />
  );
}
```

---

### 3. ImageLightbox

**文件**: `src/components/blog/ImageLightbox.tsx`

#### 功能描述
点击图片打开模态框预览，支持 ESC 关闭、背景模糊、移动端手势缩放。

#### Props 接口

```typescript
export interface ImageLightboxProps {
  /** 图片源地址 */
  src: string;
  /** 图片替代文本 */
  alt?: string;
  /** 图片标题 */
  caption?: string;
  /** 图片列表 (用于多图切换) */
  images?: LightboxImage[];
  /** 当前图片索引 */
  currentIndex?: number;
  /** 是否可见 (受控模式) */
  isOpen?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 图片切换回调 */
  onIndexChange?: (index: number) => void;
  /** 是否显示导航箭头 (默认: true) */
  showNavigation?: boolean;
  /** 是否显示计数器 (默认: true) */
  showCounter?: boolean;
  /** 背景模糊程度 (默认: 'lg') */
  backdropBlur?: 'sm' | 'md' | 'lg' | 'xl';
  /** 自定义类名 */
  className?: string;
}

export interface LightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}
```

#### 状态管理

```typescript
interface ImageLightboxState {
  /** 是否打开 */
  isOpen: boolean;
  /** 当前缩放级别 */
  scale: number;
  /** 平移位置 */
  position: { x: number; y: number };
  /** 是否正在拖拽 */
  isDragging: boolean;
  /** 当前显示图片索引 */
  currentIndex: number;
  /** 图片加载状态 */
  isLoading: boolean;
  /** 触摸起始点 */
  touchStart: { x: number; y: number } | null;
}
```

#### 手势缩放逻辑 (移动端)

```typescript
// 双指缩放处理
const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    const distance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    setLastTouchDistance(distance);
  }
};

const handleTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 2 && lastTouchDistance > 0) {
    e.preventDefault();
    const distance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
    const delta = distance - lastTouchDistance;
    const newScale = Math.max(1, Math.min(4, scale + delta * 0.01));
    setScale(newScale);
    setLastTouchDistance(distance);
  }
};

// 双击缩放
const handleDoubleTap = (e: MouseEvent) => {
  if (scale > 1) {
    // 重置
    setScale(1);
    setPosition({ x: 0, y: 0 });
  } else {
    // 放大到 2 倍
    setScale(2);
    // 以点击位置为中心缩放
    const rect = imageRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / 2;
      const y = (e.clientY - rect.top - rect.height / 2) / 2;
      setPosition({ x: -x, y: -y });
    }
  }
};
```

#### 键盘快捷键

```typescript
useEffect(() => {
  if (!isOpen) return;
  
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        handleClose();
        break;
      case 'ArrowLeft':
        if (images && images.length > 1) {
          navigateImage(-1);
        }
        break;
      case 'ArrowRight':
        if (images && images.length > 1) {
          navigateImage(1);
        }
        break;
      case '+':
      case '=':
        setScale(prev => Math.min(4, prev + 0.5));
        break;
      case '-':
        setScale(prev => Math.max(1, prev - 0.5));
        break;
      case '0':
        setScale(1);
        setPosition({ x: 0, y: 0 });
        break;
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isOpen, images]);
```

#### ARIA 支持 (模态框)

```typescript
// 焦点管理
const modalRef = useRef<HTMLDivElement>(null);
const previousActiveElement = useRef<Element | null>(null);

useEffect(() => {
  if (isOpen) {
    // 保存当前焦点
    previousActiveElement.current = document.activeElement;
    // 聚焦到模态框
    modalRef.current?.focus();
    // 禁止背景滚动
    document.body.style.overflow = 'hidden';
  } else {
    // 恢复焦点
    (previousActiveElement.current as HTMLElement)?.focus();
    document.body.style.overflow = '';
  }
}, [isOpen]);

// 焦点陷阱
const handleTabKey = (e: KeyboardEvent) => {
  if (e.key !== 'Tab' || !modalRef.current) return;
  
  const focusableElements = modalRef.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault();
    lastElement.focus();
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault();
    firstElement.focus();
  }
};
```

#### 动画效果

```typescript
// 模态框动画
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

const imageVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};
```

#### MarkdownRenderer 集成点

```typescript
// 在 MarkdownRenderer.tsx 中替换 img 组件
img: ({ src, alt }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  
  return (
    <>
      <img
        src={src}
        alt={alt}
        className="max-w-full h-auto rounded-lg my-4 cursor-zoom-in"
        loading="lazy"
        onClick={() => setLightboxOpen(true)}
      />
      <ImageLightbox
        src={src || ''}
        alt={alt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
```

---

### 4. ScrollToTop

**文件**: `src/components/ui/ScrollToTop.tsx`

#### 功能描述
滚动超过 500px 时显示悬浮按钮，点击平滑滚动到顶部。

#### Props 接口

```typescript
export interface ScrollToTopProps {
  /** 显示阈值 (px) (默认: 500) */
  threshold?: number;
  /** 滚动行为 (默认: 'smooth') */
  behavior?: ScrollBehavior;
  /** 按钮位置 (默认: 'right') */
  position?: 'left' | 'right';
  /** 距离边缘距离 (px) (默认: 24) */
  offset?: number;
  /** 距离底部距离 (px) (默认: 24) */
  bottomOffset?: number;
  /** 是否显示进度 (默认: true) */
  showProgress?: boolean;
  /** 按钮大小 (默认: 'md') */
  size?: 'sm' | 'md' | 'lg';
  /** 自定义类名 */
  className?: string;
  /** 滚动完成回调 */
  onScrollComplete?: () => void;
}

// 进度指示器 Props
export interface ScrollProgressProps {
  /** 当前进度 (0-100) */
  progress: number;
  /** 圆形进度条大小 */
  size?: number;
  /** 线宽 */
  strokeWidth?: number;
  /** 颜色 */
  color?: string;
}
```

#### 状态管理

```typescript
interface ScrollToTopState {
  /** 是否可见 */
  isVisible: boolean;
  /** 当前滚动进度 */
  progress: number;
  /** 是否正在滚动 */
  isScrolling: boolean;
}
```

#### 核心逻辑

```typescript
// 滚动监听 (使用 Intersection Observer 优化)
const updateVisibility = useCallback(() => {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  setIsVisible(scrollY > threshold);
  setProgress(Math.min(100, (scrollY / docHeight) * 100));
}, [threshold]);

useEffect(() => {
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateVisibility();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [updateVisibility]);

// 平滑滚动到顶部
const scrollToTop = useCallback(() => {
  setIsScrolling(true);
  
  window.scrollTo({
    top: 0,
    behavior
  });
  
  // 监听滚动完成
  const checkScrollEnd = () => {
    if (window.scrollY === 0) {
      setIsScrolling(false);
      onScrollComplete?.();
      window.removeEventListener('scroll', checkScrollEnd);
    }
  };
  
  window.addEventListener('scroll', checkScrollEnd);
}, [behavior, onScrollComplete]);
```

#### 圆形进度组件

```typescript
const CircularProgress: React.FC<ScrollProgressProps> = ({
  progress,
  size = 48,
  strokeWidth = 3,
  color = 'currentColor'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  return (
    <svg width={size} height={size} className="-rotate-90">
      {/* 背景圆 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="opacity-20"
      />
      {/* 进度圆 */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-150 ease-out"
      />
    </svg>
  );
};
```

#### ARIA 支持

```typescript
<button
  type="button"
  onClick={scrollToTop}
  aria-label="返回页面顶部"
  aria-describedby="scroll-top-desc"
  className={cn(
    'fixed bottom-6 transition-all duration-300 ease-out',
    position === 'left' ? 'left-6' : 'right-6',
    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
  )}
>
  <span id="scroll-top-desc" className="sr-only">
    点击返回页面顶部，当前阅读进度 {Math.round(progress)}%
  </span>
  <ArrowUp className="w-5 h-5" aria-hidden="true" />
</button>
```

#### 动画效果

```typescript
const buttonVariants = {
  hidden: { 
    y: 20, 
    opacity: 0,
    scale: 0.8
  },
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25
    }
  },
  exit: { 
    y: 20, 
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};
```

---

## 集成方案

### BlogDetailPage 集成

```typescript
// BlogDetailPage.tsx 更新
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export function BlogDetailPage() {
  // ... 现有代码
  
  return (
    <>
      <Helmet>...</Helmet>
      
      {/* 阅读进度条 */}
      <ReadingProgress 
        targetSelector="article"
        showPercentage
        percentagePosition="right"
      />
      
      {/* 返回顶部按钮 */}
      <ScrollToTop 
        threshold={500}
        showProgress
        position="right"
      />
      
      <div className="min-h-screen bg-background">
        {/* ... 页面内容 */}
      </div>
    </>
  );
}
```

### MarkdownRenderer 集成

```typescript
// MarkdownRenderer.tsx 更新
import { EnhancedCodeBlock } from '@/components/blog/CodeBlock';
import { ImageLightbox } from '@/components/blog/ImageLightbox';

export function MarkdownRenderer({ content, ...props }: MarkdownRendererProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  const components = useMemo(() => ({
    // 代码块增强
    code: ({ className, children }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      
      if (!className) {
        return <code className="...">{children}</code>;
      }
      
      return (
        <EnhancedCodeBlock
          code={String(children).replace(/\n$/, '')}
          language={language}
          showLineNumbers
        />
      );
    },
    
    // 图片增强
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="... cursor-zoom-in"
        onClick={() => src && setLightboxImage(src)}
        loading="lazy"
      />
    ),
    
    // ... 其他组件
  }), []);
  
  return (
    <>
      <div className="prose ...">
        <ReactMarkdown components={components}>
          {sanitizedContent}
        </ReactMarkdown>
      </div>
      
      {/* 图片灯箱 */}
      <ImageLightbox
        src={lightboxImage || ''}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}
```

---

## 无障碍支持

### 通用 ARIA 原则

1. **语义化标签**: 使用正确的 HTML 标签表达内容含义
2. **键盘导航**: 所有交互功能支持键盘操作
3. **焦点管理**: 模态框等组件管理焦点状态
4. **屏幕阅读器**: 提供适当的 aria-label 和 aria-live

### 各组件无障碍清单

| 组件 | 键盘支持 | ARIA 标签 | 焦点管理 | 颜色对比 |
|------|---------|----------|---------|---------|
| ReadingProgress | N/A | ✅ | N/A | ✅ |
| CodeBlock | ✅ (复制按钮) | ✅ | ✅ | ✅ |
| ImageLightbox | ✅ (ESC/方向键) | ✅ | ✅ (焦点陷阱) | ✅ |
| ScrollToTop | ✅ | ✅ | ✅ | ✅ |

### 焦点可见性

```css
/* 确保焦点样式可见 */
*:focus-visible {
  @apply outline-2 outline-offset-2 outline-primary;
}

/* 鼠标用户不显示焦点环 */
*:focus:not(:focus-visible) {
  @apply outline-none;
}
```

---

## 性能优化

### 1. 滚动性能优化

```typescript
// 使用 passive 事件监听器
window.addEventListener('scroll', handler, { passive: true });

// 使用 requestAnimationFrame 节流
const throttleByRAF = (callback: FrameRequestCallback) => {
  let ticking = false;
  return () => {
    if (!ticking) {
      requestAnimationFrame((time) => {
        callback(time);
        ticking = false;
      });
      ticking = true;
    }
  };
};
```

### 2. 动画性能优化

```typescript
// 使用 GPU 加速属性
const optimizedStyles = {
  transform: 'translateZ(0)', // 开启 GPU 加速
  willChange: 'transform',    // 提示浏览器优化
};

// 避免触发重排的属性
// ✅ 使用 transform 和 opacity
// ❌ 避免 width, height, top, left
```

### 3. 代码分割

```typescript
// 图片灯箱懒加载
const ImageLightbox = lazy(() => 
  import('@/components/blog/ImageLightbox')
);

// 预加载关键组件
const preloadLightbox = () => {
  const ImageLightbox = import('@/components/blog/ImageLightbox');
};
```

### 4. 图片优化

```typescript
// 灯箱图片预加载
useEffect(() => {
  if (isOpen && src) {
    const img = new Image();
    img.src = src;
  }
}, [isOpen, src]);
```

---

## 测试策略

### 单元测试要点

```typescript
// ReadingProgress.test.tsx
describe('ReadingProgress', () => {
  it('should calculate progress correctly', () => {
    // 测试进度计算逻辑
  });
  
  it('should update on scroll', () => {
    // 测试滚动监听
  });
  
  it('should be accessible', () => {
    // 测试 ARIA 属性
  });
});

// CodeBlock.test.tsx
describe('CodeBlock', () => {
  it('should copy code to clipboard', async () => {
    // 测试复制功能
  });
  
  it('should show success feedback', () => {
    // 测试成功反馈
  });
});
```

### 可测试性设计

1. **纯函数优先**: 将计算逻辑抽离为纯函数
2. **依赖注入**: 通过 props 注入依赖，便于 mock
3. **数据属性**: 使用 data-testid 标记测试元素

---

## 移动端适配方案

### 响应式断点

```typescript
// Tailwind 断点使用
// sm: 640px
// md: 768px  
// lg: 1024px
// xl: 1280px
```

### 触摸优化

```typescript
// 增大触摸目标
const touchTargetSize = 'min-h-[44px] min-w-[44px]';

// 禁用双击缩放
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

// 使用 touch-action 控制手势
.lightbox-image {
  touch-action: pan-y pinch-zoom;
}
```

### 性能预算

| 指标 | 目标 | 测量方式 |
|------|------|---------|
| 组件包体积 | < 5KB (gzipped) | Bundle Analyzer |
| 首次渲染 | < 16ms | React DevTools |
| 滚动帧率 | 60fps | Chrome DevTools |
| 交互响应 | < 100ms | Lighthouse |

---

## 附录

### 文件结构

```
src/components/
├── blog/
│   ├── ReadingProgress.tsx      # 阅读进度条
│   ├── CodeBlock.tsx            # 代码块 (增强)
│   ├── ImageLightbox.tsx        # 图片灯箱
│   └── __tests__/
│       ├── ReadingProgress.test.tsx
│       ├── CodeBlock.test.tsx
│       └── ImageLightbox.test.tsx
└── ui/
    ├── ScrollToTop.tsx          # 返回顶部
    └── __tests__/
        └── ScrollToTop.test.tsx
```

### 依赖清单

```json
{
  "dependencies": {
    "framer-motion": "^11.x",
    "lucide-react": "^0.x"
  }
}
```

---

## 变更记录

| 版本 | 日期 | 变更内容 | 作者 |
|------|------|---------|------|
| v1.0 | 2025-04-28 | 初始架构设计 | Architect Agent |
