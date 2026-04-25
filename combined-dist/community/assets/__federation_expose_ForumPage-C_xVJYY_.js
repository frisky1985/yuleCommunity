import { importShared } from './__federation_fn_import-DPk4vyf3.js';
import { j as jsxRuntimeExports } from './jsx-runtime-XI9uIe3W.js';
import { u as useLocalStorage, a as useUserSystem, b as useNotifications, m as migrateForumPosts, i as initialForumPosts, g as generateId } from './useNotifications-BZ3TIxqz.js';

const {useEffect: useEffect$1,useState: useState$1} = await importShared('react');

function isDarkMode() {
    return document.documentElement.classList.contains('dark');
}
function CodeBlock({ code, language = 'c' }) {
    const [dark, setDark] = useState$1(isDarkMode);
    useEffect$1(() => {
        setDark(isDarkMode());
        const interval = setInterval(() => {
            setDark(isDarkMode());
        }, 500);
        return () => clearInterval(interval);
    }, []);
    const bgColor = dark ? '#1e293b' : '#f8fafc';
    const textColor = dark ? '#e2e8f0' : '#1e293b';
    return (jsxRuntimeExports.jsxs("div", { className: "rounded-lg overflow-hidden my-4 border border-border", children: [jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between px-4 py-2 bg-muted border-b border-border", children: jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase", children: language }) }), jsxRuntimeExports.jsx("pre", { style: {
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    backgroundColor: bgColor,
                    color: textColor,
                    overflow: 'auto',
                }, children: jsxRuntimeExports.jsx("code", { children: code }) })] }));
}

const {useState,useEffect} = await importShared('react');

const {MessageSquare,ThumbsUp,Eye,Flame,Clock,ChevronRight,X,Send,Plus,Search,Filter,Pin} = await importShared('lucide-react');
function renderRichContent(content) {
    const parts = [];
    const regex = /```(\w*)\n([\s\S]*?)\n```/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
            parts.push(jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground whitespace-pre-wrap leading-relaxed", children: content.slice(lastIndex, match.index) }, `text-${lastIndex}`));
        }
        const language = match[1] || 'c';
        const code = match[2];
        parts.push(jsxRuntimeExports.jsx(CodeBlock, { code: code, language: language }, `code-${match.index}`));
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < content.length) {
        parts.push(jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground whitespace-pre-wrap leading-relaxed", children: content.slice(lastIndex) }, `text-${lastIndex}`));
    }
    return parts;
}
const sortOptions = [
    { label: '最新发布', value: 'newest' },
    { label: '最多回复', value: 'replies' },
    { label: '最多点赞', value: 'likes' },
    { label: '最多浏览', value: 'views' },
];
const allTags = ['全部', 'MCAL', 'ECUAL', 'Service', 'OS', '工具链', '经验分享', 'CAN', 'Pwm', 'i.MX8M', 'Docker', '配置', '量产'];
function ForumPage() {
    const [posts, setPosts] = useLocalStorage('yuletech-forum-posts', initialForumPosts);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState('全部');
    const [sortBy, setSortBy] = useState('newest');
    const [activePostId, setActivePostId] = useState(null);
    const [showNewPost, setShowNewPost] = useState(false);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostTags, setNewPostTags] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const currentUser = '我';
    const { addPoints } = useUserSystem();
    const { addNotification } = useNotifications();
    const activePost = posts.find((p) => p.id === activePostId);
    // Migrate old data on mount
    useEffect(() => {
        setPosts((prev) => migrateForumPosts(prev));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const filteredPosts = posts
        .filter((post) => {
        const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchTag = selectedTag === '全部' || post.tags.includes(selectedTag);
        return matchSearch && matchTag;
    })
        .sort((a, b) => {
        // Pinned posts always on top
        if (a.isPinned && !b.isPinned)
            return -1;
        if (!a.isPinned && b.isPinned)
            return 1;
        if (sortBy === 'newest')
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'replies')
            return b.replies.length - a.replies.length;
        if (sortBy === 'likes')
            return b.likes - a.likes;
        if (sortBy === 'views')
            return b.views - a.likes;
        return 0;
    });
    const handleLikePost = (postId) => {
        setPosts((prev) => prev.map((post) => {
            if (post.id !== postId)
                return post;
            const alreadyLiked = post.likedBy.includes(currentUser);
            return {
                ...post,
                likes: alreadyLiked ? post.likes - 1 : post.likes + 1,
                likedBy: alreadyLiked ? post.likedBy.filter((u) => u !== currentUser) : [...post.likedBy, currentUser],
            };
        }));
    };
    const handleLikeReply = (postId, replyId) => {
        setPosts((prev) => prev.map((post) => {
            if (post.id !== postId)
                return post;
            return {
                ...post,
                replies: post.replies.map((reply) => {
                    if (reply.id !== replyId)
                        return reply;
                    const alreadyLiked = reply.likedBy.includes(currentUser);
                    return {
                        ...reply,
                        likes: alreadyLiked ? reply.likes - 1 : reply.likes + 1,
                        likedBy: alreadyLiked ? reply.likedBy.filter((u) => u !== currentUser) : [...reply.likedBy, currentUser],
                    };
                }),
            };
        }));
    };
    const handleAddReply = (postId) => {
        if (!replyContent.trim())
            return;
        const post = posts.find((p) => p.id === postId);
        const newReply = {
            id: generateId('fr'),
            content: replyContent.trim(),
            author: currentUser,
            avatar: '我',
            role: '社区成员',
            likes: 0,
            likedBy: [],
            createdAt: new Date().toISOString(),
        };
        setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, replies: [...p.replies, newReply] } : p)));
        setReplyContent('');
        addPoints('reply');
        if (post && post.author === currentUser) {
            addNotification({
                type: 'reply',
                title: '有人回复了你的帖子',
                message: `你的帖子《${post.title}》收到了新回复`,
                link: '/forum',
            });
        }
    };
    const handleCreatePost = () => {
        if (!newPostTitle.trim() || !newPostContent.trim())
            return;
        const tags = newPostTags
            .split(/[,，]/)
            .map((t) => t.trim())
            .filter(Boolean);
        const newPost = {
            id: generateId('fp'),
            title: newPostTitle.trim(),
            content: newPostContent.trim(),
            author: currentUser,
            avatar: '我',
            role: '社区成员',
            tags: tags.length ? tags : ['讨论'],
            likes: 0,
            likedBy: [],
            replies: [],
            views: 0,
            createdAt: new Date().toISOString(),
            hot: false,
        };
        setPosts((prev) => [newPost, ...prev]);
        setNewPostTitle('');
        setNewPostContent('');
        setNewPostTags('');
        setShowNewPost(false);
        addPoints('post');
    };
    const formatTime = (iso) => {
        const d = new Date(iso);
        const now = new Date();
        const diff = now.getTime() - d.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 1)
            return '刚刚';
        if (minutes < 60)
            return `${minutes}分钟前`;
        if (hours < 24)
            return `${hours}小时前`;
        if (days < 30)
            return `${days}天前`;
        return d.toLocaleDateString('zh-CN');
    };
    return (jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pt-16", children: [jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-muted/50 to-background border-b border-border", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight mb-2", children: "\u6280\u672F\u8BBA\u575B" }), jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "\u8BA8\u8BBA AutoSAR BSW \u5F00\u53D1\u4E2D\u7684\u6280\u672F\u95EE\u9898\uFF0C\u5206\u4EAB\u91CF\u4EA7\u7ECF\u9A8C" })] }), jsxRuntimeExports.jsxs("button", { onClick: () => setShowNewPost(true), className: "inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] transition-colors px-5 py-2.5 rounded-lg font-medium self-start", children: [jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }), "\u53D1\u5E03\u65B0\u5E16"] })] }), jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-4", children: [jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), jsxRuntimeExports.jsx("input", { type: "text", placeholder: "\u641C\u7D22\u5E16\u5B50\u6807\u9898\u6216\u5185\u5BB9...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx(Filter, { className: "w-4 h-4 text-muted-foreground" }), jsxRuntimeExports.jsx("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30", children: sortOptions.map((opt) => (jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] })] }), jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: allTags.map((tag) => (jsxRuntimeExports.jsx("button", { onClick: () => setSelectedTag(tag), className: `px-3 py-1 rounded-full text-xs font-medium transition-colors ${selectedTag === tag
                                    ? 'bg-[hsl(var(--accent))] text-white'
                                    : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: tag }, tag))) })] }) }), jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [filteredPosts.map((post) => (jsxRuntimeExports.jsx("div", { onClick: () => {
                                setActivePostId(post.id);
                                setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, views: p.views + 1 } : p)));
                            }, className: "bg-card border border-border rounded-xl p-5 cursor-pointer hover:border-[hsl(var(--accent))]/30 hover:shadow-elegant transition-all group", children: jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-sm font-bold", children: post.avatar }), jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground group-hover:text-[hsl(var(--accent))] transition-colors line-clamp-1", children: post.title }), post.isPinned && jsxRuntimeExports.jsx(Pin, { className: "w-4 h-4 text-[hsl(var(--accent))] flex-shrink-0" }), post.hot && jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-orange-500 flex-shrink-0" })] }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-3", children: post.content }), jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground", children: [jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: post.author }), jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 bg-muted rounded text-[10px]", children: post.role }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }), formatTime(post.createdAt)] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }), post.views] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(MessageSquare, { className: "w-3 h-3" }), post.replies.length] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }), post.likes] }), jsxRuntimeExports.jsx("div", { className: "flex gap-1 ml-auto", children: post.tags.map((tag) => (jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] rounded-full text-[10px]", children: tag }, tag))) })] })] }), jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-muted-foreground group-hover:text-[hsl(var(--accent))] transition-colors flex-shrink-0 mt-1" })] }) }, post.id))), filteredPosts.length === 0 && (jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [jsxRuntimeExports.jsx(MessageSquare, { className: "w-12 h-12 mx-auto mb-4 opacity-30" }), jsxRuntimeExports.jsx("p", { children: "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5E16\u5B50" }), jsxRuntimeExports.jsx("button", { onClick: () => { setSearchQuery(''); setSelectedTag('全部'); }, className: "mt-2 text-[hsl(var(--accent))] hover:underline text-sm", children: "\u6E05\u9664\u7B5B\u9009\u6761\u4EF6" })] }))] }) }), activePost && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border", children: [jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold pr-4 line-clamp-1", children: activePost.title }), jsxRuntimeExports.jsx("button", { onClick: () => setActivePostId(null), className: "p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0", children: jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })] }), jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-6", children: [jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-sm font-bold", children: activePost.avatar }), jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [jsxRuntimeExports.jsx("span", { className: "font-semibold", children: activePost.author }), jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 bg-muted rounded text-[10px] text-muted-foreground", children: activePost.role }), jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: formatTime(activePost.createdAt) })] }), jsxRuntimeExports.jsx("div", { children: renderRichContent(activePost.content) }), jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 mt-3", children: activePost.tags.map((tag) => (jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] rounded-full text-[10px]", children: tag }, tag))) }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mt-4", children: [jsxRuntimeExports.jsxs("button", { onClick: () => handleLikePost(activePost.id), className: `flex items-center gap-1.5 text-sm transition-colors ${activePost.likedBy.includes(currentUser)
                                                                ? 'text-[hsl(var(--accent))]'
                                                                : 'text-muted-foreground hover:text-foreground'}`, children: [jsxRuntimeExports.jsx(ThumbsUp, { className: "w-4 h-4" }), activePost.likes] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4" }), activePost.replies.length] }), jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }), activePost.views] })] })] })] }), activePost.replies.length > 0 && (jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-4", children: [jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold mb-4", children: [activePost.replies.length, " \u6761\u56DE\u590D"] }), jsxRuntimeExports.jsx("div", { className: "space-y-4", children: activePost.replies.map((reply) => (jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pl-4 border-l-2 border-border", children: [jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground", children: reply.avatar }), jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: reply.author }), jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 bg-muted rounded text-[10px] text-muted-foreground", children: reply.role }), jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: formatTime(reply.createdAt) })] }), jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground", children: renderRichContent(reply.content) }), jsxRuntimeExports.jsxs("button", { onClick: () => handleLikeReply(activePost.id, reply.id), className: `flex items-center gap-1 mt-2 text-xs transition-colors ${reply.likedBy.includes(currentUser)
                                                                    ? 'text-[hsl(var(--accent))]'
                                                                    : 'text-muted-foreground hover:text-foreground'}`, children: [jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }), reply.likes] })] })] }, reply.id))) })] })), jsxRuntimeExports.jsx("div", { className: "border-t border-border pt-4", children: jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center text-xs font-bold text-[hsl(var(--accent))]", children: "\u6211" }), jsxRuntimeExports.jsxs("div", { className: "flex-1 flex gap-2", children: [jsxRuntimeExports.jsx("textarea", { value: replyContent, onChange: (e) => setReplyContent(e.target.value), placeholder: "\u5199\u4E0B\u4F60\u7684\u56DE\u590D...", rows: 3, className: "flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30 resize-none" }), jsxRuntimeExports.jsx("button", { onClick: () => handleAddReply(activePost.id), disabled: !replyContent.trim(), className: "self-end px-4 py-2 bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg text-sm font-medium", children: jsxRuntimeExports.jsx(Send, { className: "w-4 h-4" }) })] })] }) })] })] }) })), showNewPost && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border", children: [jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "\u53D1\u5E03\u65B0\u5E16" }), jsxRuntimeExports.jsx("button", { onClick: () => setShowNewPost(false), className: "p-1.5 rounded-lg hover:bg-muted transition-colors", children: jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })] }), jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u6807\u9898" }), jsxRuntimeExports.jsx("input", { type: "text", value: newPostTitle, onChange: (e) => setNewPostTitle(e.target.value), placeholder: "\u8BF7\u7B80\u8981\u63CF\u8FF0\u4F60\u7684\u95EE\u9898\u6216\u8BDD\u9898", className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u5185\u5BB9" }), jsxRuntimeExports.jsx("textarea", { value: newPostContent, onChange: (e) => setNewPostContent(e.target.value), placeholder: "\u8BE6\u7EC6\u63CF\u8FF0\u4F60\u7684\u95EE\u9898\u3001\u7ECF\u9A8C\u6216\u60F3\u6CD5...", rows: 8, className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30 resize-none" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u6807\u7B7E\uFF08\u7528\u9017\u53F7\u5206\u9694\uFF09" }), jsxRuntimeExports.jsx("input", { type: "text", value: newPostTags, onChange: (e) => setNewPostTags(e.target.value), placeholder: "\u4F8B\u5982\uFF1AMCAL, CAN, \u914D\u7F6E", className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] })] }), jsxRuntimeExports.jsxs("div", { className: "p-5 border-t border-border flex justify-end gap-3", children: [jsxRuntimeExports.jsx("button", { onClick: () => setShowNewPost(false), className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", children: "\u53D6\u6D88" }), jsxRuntimeExports.jsx("button", { onClick: handleCreatePost, disabled: !newPostTitle.trim() || !newPostContent.trim(), className: "px-5 py-2 bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg text-sm font-medium", children: "\u53D1\u5E03" })] })] }) }))] }));
}

export { ForumPage };
