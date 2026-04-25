import { importShared } from './__federation_fn_import-CDE7MyXR.js';
import { j as jsxRuntimeExports } from './jsx-runtime-XI9uIe3W.js';

const {useState} = await importShared('react');

const {FileText,Search,Clock,Eye,ThumbsUp,MessageSquare,TrendingUp,ArrowRight,Flame} = await importShared('lucide-react');

const categories = ["全部", "MCAL", "ECUAL", "Service", "工具链", "功能安全", "架构设计"];
const hotTags = ["AutoSAR", "CAN", "i.MX8M", "UDS", "MCAL", "RTE", "功能安全", "诊断", "配置工具", "Docker", "MISRA", "多核"];
const articlesData = [
  {
    id: "blog-1",
    title: "AutoSAR BSW 分层架构深度解析：从 MCAL 到 RTE 的完整数据流",
    desc: "本文深入剖析 AutoSAR Classic Platform 的软件分层架构，详细讲解从微控制器驱动层（MCAL）到运行时环境（RTE）的完整数据流动路径，结合 YuleTech 开源实现进行代码级解读。",
    author: "李架构",
    avatar: "李架",
    role: "首席架构师",
    date: "2026-04-20",
    readTime: "15 分钟",
    views: 3420,
    likes: 128,
    comments: 36,
    tags: ["架构设计", "AutoSAR", "BSW"],
    category: "架构设计",
    hot: true
  },
  {
    id: "blog-2",
    title: "i.MX8M Mini CAN FD 驱动开发实战：从寄存器到 AutoSAR 接口",
    desc: "手把手讲解如何在 i.MX8M Mini 上实现 CAN FD 驱动，从 FlexCAN 寄存器配置到 AutoSAR Can 模块的完整对接流程。",
    author: "张明",
    avatar: "张明",
    role: "嵌入式工程师",
    date: "2026-04-19",
    readTime: "12 分钟",
    views: 1860,
    likes: 72,
    comments: 18,
    tags: ["MCAL", "CAN", "i.MX8M"],
    category: "MCAL",
    hot: true
  },
  {
    id: "blog-3",
    title: "CanIf 模块配置最佳实践：信号路由与 PDU 映射",
    desc: "总结 CanIf 模块在实际项目中的配置经验，包括 HOH 配置、PDU 路由表设计、以及 Upper Layer 接口对接要点。",
    author: "李华",
    avatar: "李华",
    role: "软件架构师",
    date: "2026-04-18",
    readTime: "10 分钟",
    views: 1540,
    likes: 58,
    comments: 14,
    tags: ["ECUAL", "CanIf", "配置"],
    category: "ECUAL",
    hot: true
  },
  {
    id: "blog-4",
    title: "AutoSAR Com 模块信号打包与解包机制详解",
    desc: "深入讲解 Com 模块的信号（Signal）和信号组（Signal Group）打包机制，包括字节序、对齐方式和更新位处理。",
    author: "王强",
    avatar: "王强",
    role: "通信工程师",
    date: "2026-04-17",
    readTime: "18 分钟",
    views: 1200,
    likes: 45,
    comments: 9,
    tags: ["Service", "Com", "通信"],
    category: "Service",
    hot: false
  },
  {
    id: "blog-5",
    title: "YuleConfig 工具链插件开发入门指南",
    desc: "介绍 YuleTech 配置工具链的插件架构，如何开发自定义模块配置界面和代码生成器。",
    author: "刘洋",
    avatar: "刘洋",
    role: "DevOps工程师",
    date: "2026-04-16",
    readTime: "8 分钟",
    views: 980,
    likes: 38,
    comments: 7,
    tags: ["工具链", "YuleConfig", "插件"],
    category: "工具链",
    hot: false
  },
  {
    id: "blog-6",
    title: "ISO 26262 功能安全在 AutoSAR BSW 中的实现要点",
    desc: "从 ASIL 等级划分到 E2E 保护，系统讲解功能安全要求在基础软件各层级的实现策略。",
    author: "陈工",
    avatar: "陈工",
    role: "功能安全工程师",
    date: "2026-04-15",
    readTime: "20 分钟",
    views: 2100,
    likes: 89,
    comments: 22,
    tags: ["功能安全", "ISO 26262", "E2E"],
    category: "功能安全",
    hot: true
  }
];
const weeklyTop = [
  { title: "AutoSAR BSW 分层架构深度解析：从 MCAL 到 RTE 的完整数据流", views: 3420 },
  { title: "ISO 26262 功能安全在 AutoSAR BSW 中的实现要点", views: 2100 },
  { title: "i.MX8M Mini CAN FD 驱动开发实战：从寄存器到 AutoSAR 接口", views: 1860 }
];
function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredArticles = articlesData.filter((a) => {
    const matchCategory = activeCategory === "全部" || a.category === activeCategory;
    const matchSearch = searchQuery === "" || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.desc.toLowerCase().includes(searchQuery.toLowerCase()) || a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4" }),
        "技术博客"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6", children: [
        "AutoSAR",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-accent", children: " 技术专栏" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto mb-8", children: "由 YuleTech 技术团队和社区专家撰写的深度技术文章，涵盖 AutoSAR BSW 各层级的 开发实践、架构设计与性能优化经验。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "搜索文章、标签、作者...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/50 shadow-elegant"
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8 border-y border-border bg-card/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "120+" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "技术文章" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "35" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "社区作者" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "85,000+" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "月度阅读" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-[hsl(var(--accent))]", children: "2,400+" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: "互动讨论" })
      ] })
    ] }) }) }),
    !searchQuery && activeCategory === "全部" && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-5 h-5 text-[hsl(var(--accent))]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "编辑推荐" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-3", children: articlesData[0].tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground", children: tag }, tag)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl md:text-2xl font-bold mb-3 hover:text-[hsl(var(--accent))] transition-colors cursor-pointer", children: articlesData[0].title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: articlesData[0].desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-xs font-bold", children: articlesData[0].avatar }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: articlesData[0].author }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs ml-1", children: articlesData[0].role })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }),
              " ",
              articlesData[0].readTime
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
              " ",
              articlesData[0].views
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3.5 h-3.5" }),
              " ",
              articlesData[0].likes
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5" }),
              " ",
              articlesData[0].comments
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:w-48 flex-shrink-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "w-full lg:w-auto px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all flex items-center justify-center gap-2", children: [
          "阅读全文",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 overflow-x-auto pb-2", children: categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setActiveCategory(cat),
        className: `px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-[hsl(var(--primary))] text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`,
        children: cat
      },
      cat
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: searchQuery ? `搜索结果："${searchQuery}"` : activeCategory === "全部" ? "最新文章" : `${activeCategory} 文章` }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
            "共 ",
            filteredArticles.length,
            " 篇"
          ] })
        ] }),
        filteredArticles.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-12 h-12 mx-auto mb-4 opacity-50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "没有找到相关文章" })
        ] }),
        filteredArticles.map((article) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                article.hot && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-red-500/10 text-red-500 rounded-full text-xs font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-3 h-3" }),
                  "热门"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: article.category })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg mb-2 group-hover:text-[hsl(var(--accent))] transition-colors cursor-pointer", children: article.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3 line-clamp-2", children: article.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 mb-3", children: article.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground",
                  children: tag
                },
                tag
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-[10px] font-bold", children: article.avatar }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: article.author })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: article.date }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
                  " ",
                  article.readTime
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                  " ",
                  article.views
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }),
                  " ",
                  article.likes
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }),
                  " ",
                  article.comments
                ] })
              ] })
            ] }) })
          },
          article.id
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:w-80 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-4", children: "热门标签" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: hotTags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setSearchQuery(tag),
              className: "px-3 py-1.5 bg-muted rounded-lg text-xs text-muted-foreground hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))] transition-colors",
              children: tag
            },
            tag
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-4", children: "本周热阅" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: weeklyTop.map((article, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-3 group cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold ${index < 3 ? "bg-[hsl(var(--accent))] text-white" : "bg-muted text-muted-foreground"}`, children: index + 1 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium line-clamp-2 group-hover:text-[hsl(var(--accent))] transition-colors", children: article.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3 inline mr-1" }),
                    article.views.toLocaleString(),
                    " 阅读"
                  ] })
                ] })
              ]
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl p-5 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold mb-2", children: "订阅技术周刊" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80 mb-4", children: "每周获取最新 AutoSAR 技术文章和社区动态" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "email",
                placeholder: "输入邮箱地址",
                className: "w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full py-2 bg-white text-[hsl(var(--primary))] rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors", children: "订阅" })
          ] })
        ] })
      ] })
    ] }) }) })
  ] });
}

export { BlogPage, articlesData };
