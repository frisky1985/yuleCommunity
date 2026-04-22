import { useState } from 'react';
import {
  FileText,
  Search,
  Clock,
  Eye,
  ThumbsUp,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  User,
  ChevronRight,
  Flame,
} from 'lucide-react';

const categories = ['全部', 'MCAL', 'ECUAL', 'Service', '工具链', '功能安全', '架构设计'];

const hotTags = ['AutoSAR', 'CAN', 'i.MX8M', 'UDS', 'MCAL', 'RTE', '功能安全', '诊断', '配置工具', 'Docker', 'MISRA', '多核'];

const featuredArticle = {
  title: 'AutoSAR BSW 分层架构深度解析：从 MCAL 到 RTE 的完整数据流',
  desc: '本文深入剖析 AutoSAR Classic Platform 的软件分层架构，详细讲解从微控制器驱动层（MCAL）到运行时环境（RTE）的完整数据流动路径，结合 YuleTech 开源实现进行代码级解读。',
  author: '李架构',
  avatar: '李架',
  role: '首席架构师',
  date: '2026-04-20',
  readTime: '15 分钟',
  views: 3420,
  likes: 128,
  comments: 36,
  tags: ['架构设计', 'AutoSAR', 'BSW'],
};

const articles = [
  {
    title: 'i.MX8M Mini CAN FD 驱动开发实战：从寄存器到 AutoSAR 接口',
    desc: '手把手讲解如何在 i.MX8M Mini 上实现 CAN FD 驱动，从 FlexCAN 寄存器配置到 AutoSAR Can 模块的完整对接流程。',
    author: '张明',
    avatar: '张明',
    role: '嵌入式工程师',
    date: '2026-04-19',
    readTime: '12 分钟',
    views: 1860,
    likes: 72,
    comments: 18,
    tags: ['MCAL', 'CAN', 'i.MX8M'],
    category: 'MCAL',
    hot: true,
  },
  {
    title: 'CanIf 模块配置最佳实践：信号路由与 PDU 映射',
    desc: '总结 CanIf 模块在实际项目中的配置经验，包括 HOH 配置、PDU 路由表设计、以及 Upper Layer 接口对接要点。',
    author: '李华',
    avatar: '李华',
    role: '软件架构师',
    date: '2026-04-18',
    readTime: '10 分钟',
    views: 1540,
    likes: 58,
    comments: 14,
    tags: ['ECUAL', 'CanIf', '配置'],
    category: 'ECUAL',
    hot: true,
  },
  {
    title: 'AutoSAR Com 模块信号打包与解包机制详解',
    desc: '深入讲解 Com 模块的信号（Signal）和信号组（Signal Group）打包机制，包括字节序、对齐方式和更新位处理。',
    author: '王强',
    avatar: '王强',
    role: '通信工程师',
    date: '2026-04-17',
    readTime: '18 分钟',
    views: 1200,
    likes: 45,
    comments: 9,
    tags: ['Service', 'Com', '通信'],
    category: 'Service',
    hot: false,
  },
  {
    title: 'YuleConfig 工具链插件开发入门指南',
    desc: '介绍 YuleTech 配置工具链的插件架构，如何开发自定义模块配置界面和代码生成器。',
    author: '刘洋',
    avatar: '刘洋',
    role: 'DevOps工程师',
    date: '2026-04-16',
    readTime: '8 分钟',
    views: 980,
    likes: 38,
    comments: 7,
    tags: ['工具链', 'YuleConfig', '插件'],
    category: '工具链',
    hot: false,
  },
  {
    title: 'ISO 26262 功能安全在 AutoSAR BSW 中的实现要点',
    desc: '从 ASIL 等级划分到 E2E 保护，系统讲解功能安全要求在基础软件各层级的实现策略。',
    author: '陈工',
    avatar: '陈工',
    role: '功能安全工程师',
    date: '2026-04-15',
    readTime: '20 分钟',
    views: 2100,
    likes: 89,
    comments: 22,
    tags: ['功能安全', 'ISO 26262', 'E2E'],
    category: '功能安全',
    hot: true,
  },
  {
    title: '从 0 到 1：搭建 AutoSAR BSW 持续集成流水线',
    desc: '基于 GitHub Actions 和 Docker 搭建完整的 BSW 编译、静态分析和单元测试流水线。',
    author: '赵敏',
    avatar: '赵敏',
    role: 'CI/CD工程师',
    date: '2026-04-14',
    readTime: '14 分钟',
    views: 1120,
    likes: 41,
    comments: 11,
    tags: ['工具链', 'CI/CD', 'Docker'],
    category: '工具链',
    hot: false,
  },
  {
    title: 'PduR 模块路由策略设计与性能优化',
    desc: 'PduR 作为 PDU 路由的核心模块，本文分析其路由表设计、缓冲策略和性能优化技巧。',
    author: '孙博',
    avatar: '孙博',
    role: '高级软件工程师',
    date: '2026-04-13',
    readTime: '16 分钟',
    views: 890,
    likes: 33,
    comments: 6,
    tags: ['Service', 'PduR', '性能优化'],
    category: 'Service',
    hot: false,
  },
  {
    title: 'AutoSAR RTE 层接口生成原理与代码分析',
    desc: '解析 RTE 生成器的工作原理，从 ARXML 描述到 C 语言接口代码的完整转换流程。',
    author: '李架构',
    avatar: '李架',
    role: '首席架构师',
    date: '2026-04-12',
    readTime: '22 分钟',
    views: 1650,
    likes: 67,
    comments: 15,
    tags: ['架构设计', 'RTE', '代码生成'],
    category: '架构设计',
    hot: true,
  },
  {
    title: 'MISRA C:2012 规则在汽车软件中的实践应用',
    desc: '结合实际代码案例讲解 MISRA C:2012 中最常被触发的规则，以及如何在开发中避免违规。',
    author: '周审',
    avatar: '周审',
    role: '质量工程师',
    date: '2026-04-11',
    readTime: '11 分钟',
    views: 1340,
    likes: 52,
    comments: 10,
    tags: ['工具链', 'MISRA', '代码质量'],
    category: '工具链',
    hot: false,
  },
];

const weeklyTop = [
  { title: 'AutoSAR BSW 分层架构深度解析：从 MCAL 到 RTE 的完整数据流', views: 3420 },
  { title: 'ISO 26262 功能安全在 AutoSAR BSW 中的实现要点', views: 2100 },
  { title: 'i.MX8M Mini CAN FD 驱动开发实战：从寄存器到 AutoSAR 接口', views: 1860 },
  { title: 'AutoSAR RTE 层接口生成原理与代码分析', views: 1650 },
  { title: 'CanIf 模块配置最佳实践：信号路由与 PDU 映射', views: 1540 },
];

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = articles.filter((a) => {
    const matchCategory = activeCategory === '全部' || a.category === activeCategory;
    const matchSearch =
      searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[hsl(var(--primary))]/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              技术博客
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              AutoSAR
              <span className="text-gradient-accent"> 技术专栏</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              由 YuleTech 技术团队和社区专家撰写的深度技术文章，涵盖 AutoSAR BSW 各层级的
              开发实践、架构设计与性能优化经验。
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="搜索文章、标签、作者..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/50 shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--accent))]">120+</div>
              <div className="text-sm text-muted-foreground">技术文章</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--accent))]">35</div>
              <div className="text-sm text-muted-foreground">社区作者</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--accent))]">85,000+</div>
              <div className="text-sm text-muted-foreground">月度阅读</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[hsl(var(--accent))]">2,400+</div>
              <div className="text-sm text-muted-foreground">互动讨论</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {!searchQuery && activeCategory === '全部' && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[hsl(var(--accent))]" />
              <h2 className="text-xl font-bold">编辑推荐</h2>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featuredArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 hover:text-[hsl(var(--accent))] transition-colors cursor-pointer">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{featuredArticle.desc}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-xs font-bold">
                        {featuredArticle.avatar}
                      </div>
                      <div>
                        <span className="font-medium text-foreground">{featuredArticle.author}</span>
                        <span className="text-xs ml-1">{featuredArticle.role}</span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {featuredArticle.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" /> {featuredArticle.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> {featuredArticle.comments}
                    </span>
                  </div>
                </div>
                <div className="lg:w-48 flex-shrink-0 flex items-center">
                  <button className="w-full lg:w-auto px-6 py-3 bg-[hsl(var(--primary))] text-primary-foreground rounded-xl font-semibold hover:bg-[hsl(var(--primary-glow))] transition-all flex items-center justify-center gap-2">
                    阅读全文
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter + Content */}
      <section className="py-8 sticky top-16 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[hsl(var(--primary))] text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles + Sidebar */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Articles */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold">
                  {searchQuery ? `搜索结果："${searchQuery}"` : activeCategory === '全部' ? '最新文章' : `${activeCategory} 文章`}
                </h2>
                <span className="text-sm text-muted-foreground">共 {filteredArticles.length} 篇</span>
              </div>
              {filteredArticles.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>没有找到相关文章</p>
                </div>
              )}
              {filteredArticles.map((article) => (
                <div
                  key={article.title}
                  className="group bg-card border border-border rounded-xl p-5 hover:border-[hsl(var(--accent))]/30 transition-all hover:shadow-elegant"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-muted rounded-md text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {article.hot && (
                      <span className="flex items-center gap-1 text-xs font-medium text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full flex-shrink-0">
                        <Flame className="w-3 h-3" /> 热门
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[hsl(var(--accent))] transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{article.desc}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-[10px] font-bold">
                        {article.avatar}
                      </div>
                      <span className="font-medium text-foreground">{article.author}</span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {article.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" /> {article.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" /> {article.comments}
                    </span>
                    <span className="ml-auto">{article.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 flex-shrink-0 space-y-6">
              {/* Hot Tags */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-4">热门标签</h3>
                <div className="flex flex-wrap gap-2">
                  {hotTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 bg-muted rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly Top */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[hsl(var(--accent))]" />
                  本周热门
                </h3>
                <div className="space-y-3">
                  {weeklyTop.map((item, i) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 group cursor-pointer"
                    >
                      <span className={`text-sm font-bold w-5 text-center flex-shrink-0 ${
                        i < 3 ? 'text-[hsl(var(--accent))]' : 'text-muted-foreground'
                      }`}>
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate group-hover:text-[hsl(var(--accent))] transition-colors">
                          {item.title}
                        </p>
                        <span className="text-xs text-muted-foreground">{item.views} 阅读</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Authors */}
              <div className="bg-card border border-border rounded-xl p-5">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-[hsl(var(--accent))]" />
                  活跃作者
                </h3>
                <div className="space-y-3">
                  {[
                    { name: '李架构', role: '首席架构师', articles: 18 },
                    { name: '张明', role: '嵌入式工程师', articles: 12 },
                    { name: '陈工', role: '功能安全工程师', articles: 9 },
                    { name: '刘洋', role: 'DevOps工程师', articles: 7 },
                  ].map((author) => (
                    <div key={author.name} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-xs font-bold">
                        {author.name.slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{author.name}</div>
                        <div className="text-xs text-muted-foreground">{author.role}</div>
                      </div>
                      <span className="text-xs text-muted-foreground">{author.articles} 篇</span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-[hsl(var(--accent))] hover:text-[hsl(var(--accent-glow))] font-medium flex items-center justify-center gap-1">
                  查看全部作者 <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Write CTA */}
              <div className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-xl p-5 text-white text-center">
                <FileText className="w-8 h-8 mx-auto mb-3 opacity-90" />
                <h3 className="font-semibold mb-2">成为技术作者</h3>
                <p className="text-sm text-white/80 mb-4">
                  分享你的 AutoSAR 开发经验，与社区共同成长
                </p>
                <button className="w-full py-2.5 bg-white text-[hsl(var(--primary))] rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors">
                  开始写作
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
