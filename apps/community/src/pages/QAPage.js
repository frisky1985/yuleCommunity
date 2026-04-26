import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HelpCircle, CheckCircle2, MessageSquare, Eye, ThumbsUp, Award, X, Send, Plus, Search, Filter, User, Clock, ChevronDown, ChevronUp, } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useUserSystem } from '../hooks/useUserSystem';
import { useNotifications } from '../hooks/useNotifications';
import { initialQuestions, generateId } from '../data/communityData';
const sortOptions = [
    { label: '最新提问', value: 'newest' },
    { label: '悬赏最高', value: 'bounty' },
    { label: '最多浏览', value: 'views' },
];
const statusFilters = [
    { label: '全部', value: 'all' },
    { label: '未解决', value: 'open' },
    { label: '已解决', value: 'resolved' },
];
export function QAPage() {
    const [questions, setQuestions] = useLocalStorage('yuletech-qa-questions', initialQuestions);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [expandedQuestionId, setExpandedQuestionId] = useState(null);
    const [showNewQuestion, setShowNewQuestion] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [newTags, setNewTags] = useState('');
    const [newBounty, setNewBounty] = useState(10);
    const [answerContent, setAnswerContent] = useState('');
    const currentUser = '我';
    const { addPoints } = useUserSystem();
    const { addNotification } = useNotifications();
    const filteredQuestions = questions
        .filter((q) => {
        const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === 'all' || q.status === statusFilter;
        return matchSearch && matchStatus;
    })
        .sort((a, b) => {
        if (sortBy === 'newest')
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'bounty')
            return b.bounty - a.bounty;
        if (sortBy === 'views')
            return b.views - a.views;
        return 0;
    });
    const handleLikeAnswer = (questionId, answerId) => {
        setQuestions((prev) => prev.map((q) => {
            if (q.id !== questionId)
                return q;
            return {
                ...q,
                answers: q.answers.map((ans) => {
                    if (ans.id !== answerId)
                        return ans;
                    const alreadyLiked = ans.likedBy.includes(currentUser);
                    return {
                        ...ans,
                        likes: alreadyLiked ? ans.likes - 1 : ans.likes + 1,
                        likedBy: alreadyLiked ? ans.likedBy.filter((u) => u !== currentUser) : [...ans.likedBy, currentUser],
                    };
                }),
            };
        }));
    };
    const handleAcceptAnswer = (questionId, answerId) => {
        const question = questions.find((q) => q.id === questionId);
        const answer = question?.answers.find((a) => a.id === answerId);
        setQuestions((prev) => prev.map((q) => {
            if (q.id !== questionId)
                return q;
            return {
                ...q,
                status: 'resolved',
                answers: q.answers.map((ans) => ({
                    ...ans,
                    isAccepted: ans.id === answerId,
                })),
            };
        }));
        if (answer && answer.author === currentUser) {
            addPoints('accepted');
            addNotification({
                type: 'points_change',
                title: '回答被采纳',
                message: `你的回答被采纳，获得 50 积分`,
                link: '/qa',
            });
        }
    };
    const handleAddAnswer = (questionId) => {
        if (!answerContent.trim())
            return;
        const question = questions.find((q) => q.id === questionId);
        const newAnswer = {
            id: generateId('ans'),
            content: answerContent.trim(),
            author: currentUser,
            avatar: '我',
            role: '社区成员',
            isAccepted: false,
            likes: 0,
            likedBy: [],
            createdAt: new Date().toISOString(),
        };
        setQuestions((prev) => prev.map((q) => (q.id === questionId ? { ...q, answers: [...q.answers, newAnswer] } : q)));
        setAnswerContent('');
        addPoints('answer');
        if (question && question.author === currentUser) {
            addNotification({
                type: 'answer',
                title: '有人回答了你的问题',
                message: `你的问题《${question.title}》收到了新回答`,
                link: '/qa',
            });
        }
    };
    const handleCreateQuestion = () => {
        if (!newTitle.trim() || !newContent.trim())
            return;
        const tags = newTags
            .split(/[,\uff0c]/)
            .map((t) => t.trim())
            .filter(Boolean);
        const newQuestion = {
            id: generateId('qa'),
            title: newTitle.trim(),
            content: newContent.trim(),
            author: currentUser,
            avatar: '我',
            role: '社区成员',
            tags: tags.length ? tags : ['问答'],
            status: 'open',
            bounty: newBounty,
            views: 0,
            answers: [],
            createdAt: new Date().toISOString(),
        };
        setQuestions((prev) => [newQuestion, ...prev]);
        setNewTitle('');
        setNewContent('');
        setNewTags('');
        setNewBounty(10);
        setShowNewQuestion(false);
        addPoints('post', '发布问题');
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
    return (_jsxs("div", { className: "min-h-screen bg-background pt-16", children: [_jsx("div", { className: "bg-gradient-to-br from-muted/50 to-background border-b border-border", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight mb-2", children: "\u6280\u672F\u95EE\u7B54" }), _jsx("p", { className: "text-muted-foreground", children: "\u60AC\u8D4F\u63D0\u95EE\uFF0C\u4E13\u5BB6\u89E3\u7B54\uFF0C\u5171\u5EFA AutoSAR \u77E5\u8BC6\u5E93" })] }), _jsxs("button", { onClick: () => setShowNewQuestion(true), className: "inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] transition-colors px-5 py-2.5 rounded-lg font-medium self-start", children: [_jsx(Plus, { className: "w-4 h-4" }), "\u6211\u8981\u63D0\u95EE"] })] }), _jsxs("div", { className: "mt-8 flex flex-col sm:flex-row gap-4", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx("input", { type: "text", placeholder: "\u641C\u7D22\u95EE\u9898...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Filter, { className: "w-4 h-4 text-muted-foreground" }), _jsx("select", { value: sortBy, onChange: (e) => setSortBy(e.target.value), className: "px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30", children: sortOptions.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] })] }), _jsx("div", { className: "mt-4 flex gap-2", children: statusFilters.map((f) => (_jsx("button", { onClick: () => setStatusFilter(f.value), className: `px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === f.value
                                    ? 'bg-[hsl(var(--accent))] text-white'
                                    : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: f.label }, f.value))) })] }) }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: _jsxs("div", { className: "space-y-4", children: [filteredQuestions.map((q) => {
                            const isExpanded = expandedQuestionId === q.id;
                            return (_jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden transition-all hover:border-[hsl(var(--accent))]/30", children: [_jsx("div", { onClick: () => {
                                            setExpandedQuestionId(isExpanded ? null : q.id);
                                            if (!isExpanded) {
                                                setQuestions((prev) => prev.map((item) => (item.id === q.id ? { ...item, views: item.views + 1 } : item)));
                                            }
                                        }, className: "p-5 cursor-pointer", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "flex-shrink-0 mt-0.5", children: q.status === 'resolved' ? (_jsx(CheckCircle2, { className: "w-6 h-6 text-green-500" })) : (_jsx(HelpCircle, { className: "w-6 h-6 text-[hsl(var(--accent))]" })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h3", { className: "font-semibold text-foreground line-clamp-1", children: q.title }), q.bounty > 0 && (_jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-bold", children: [_jsx(Award, { className: "w-3 h-3" }), q.bounty, " \u79EF\u5206"] }))] }), _jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 mb-3", children: q.content }), _jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs text-muted-foreground", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(User, { className: "w-3 h-3" }), q.author] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "w-3 h-3" }), formatTime(q.createdAt)] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Eye, { className: "w-3 h-3" }), q.views] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(MessageSquare, { className: "w-3 h-3" }), q.answers.length, " \u56DE\u7B54"] }), _jsx("div", { className: "flex gap-1 ml-auto", children: q.tags.map((tag) => (_jsx("span", { className: "px-2 py-0.5 bg-muted rounded-full text-[10px]", children: tag }, tag))) }), isExpanded ? (_jsx(ChevronUp, { className: "w-4 h-4 ml-2" })) : (_jsx(ChevronDown, { className: "w-4 h-4 ml-2" }))] })] })] }) }), isExpanded && (_jsx("div", { className: "border-t border-border px-5 pb-5", children: _jsxs("div", { className: "pt-4 space-y-4", children: [q.answers.length === 0 && (_jsx("p", { className: "text-sm text-muted-foreground text-center py-4", children: "\u6682\u65E0\u56DE\u7B54\uFF0C\u6765\u62A2\u9996\u7B54\u5427\uFF01" })), q.answers.map((ans) => (_jsxs("div", { className: `flex gap-3 p-4 rounded-xl ${ans.isAccepted ? 'bg-green-500/5 border border-green-500/20' : 'bg-muted/30'}`, children: [_jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground", children: ans.avatar }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "text-sm font-medium", children: ans.author }), ans.isAccepted && (_jsxs("span", { className: "flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-500 rounded text-[10px] font-bold", children: [_jsx(CheckCircle2, { className: "w-3 h-3" }), "\u5DF2\u91C7\u7EB3"] })), _jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: formatTime(ans.createdAt) })] }), _jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap", children: ans.content }), _jsxs("div", { className: "flex items-center gap-4 mt-3", children: [_jsxs("button", { onClick: () => handleLikeAnswer(q.id, ans.id), className: `flex items-center gap-1 text-xs transition-colors ${ans.likedBy.includes(currentUser)
                                                                                ? 'text-[hsl(var(--accent))]'
                                                                                : 'text-muted-foreground hover:text-foreground'}`, children: [_jsx(ThumbsUp, { className: "w-3 h-3" }), ans.likes] }), q.status === 'open' && !ans.isAccepted && (_jsxs("button", { onClick: () => handleAcceptAnswer(q.id, ans.id), className: "flex items-center gap-1 text-xs text-green-600 hover:text-green-700 transition-colors", children: [_jsx(CheckCircle2, { className: "w-3 h-3" }), "\u91C7\u7EB3\u56DE\u7B54"] }))] })] })] }, ans.id))), _jsxs("div", { className: "flex gap-3 pt-2", children: [_jsx("div", { className: "flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--accent))]/10 flex items-center justify-center text-xs font-bold text-[hsl(var(--accent))]", children: "\u6211" }), _jsxs("div", { className: "flex-1 flex gap-2", children: [_jsx("textarea", { value: answerContent, onChange: (e) => setAnswerContent(e.target.value), placeholder: q.status === 'resolved' ? '该问题已解决' : '写下你的回答...', disabled: q.status === 'resolved', rows: 3, className: "flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30 resize-none disabled:opacity-50" }), _jsx("button", { onClick: () => handleAddAnswer(q.id), disabled: !answerContent.trim() || q.status === 'resolved', className: "self-end px-4 py-2 bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg text-sm font-medium", children: _jsx(Send, { className: "w-4 h-4" }) })] })] })] }) }))] }, q.id));
                        }), filteredQuestions.length === 0 && (_jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [_jsx(HelpCircle, { className: "w-12 h-12 mx-auto mb-4 opacity-30" }), _jsx("p", { children: "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u95EE\u9898" })] }))] }) }), showNewQuestion && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: _jsxs("div", { className: "bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl", children: [_jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border", children: [_jsx("h2", { className: "text-lg font-bold", children: "\u6211\u8981\u63D0\u95EE" }), _jsx("button", { onClick: () => setShowNewQuestion(false), className: "p-1.5 rounded-lg hover:bg-muted transition-colors", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u95EE\u9898\u6807\u9898" }), _jsx("input", { type: "text", value: newTitle, onChange: (e) => setNewTitle(e.target.value), placeholder: "\u4E00\u53E5\u8BDD\u63CF\u8FF0\u4F60\u7684\u95EE\u9898", className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u95EE\u9898\u8BE6\u60C5" }), _jsx("textarea", { value: newContent, onChange: (e) => setNewContent(e.target.value), placeholder: "\u8BE6\u7EC6\u63CF\u8FF0\u4F60\u9047\u5230\u7684\u95EE\u9898\uFF0C\u5305\u62EC\u73AF\u5883\u3001\u5DF2\u5C1D\u8BD5\u7684\u65B9\u6848\u7B49...", rows: 6, className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30 resize-none" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u6807\u7B7E\uFF08\u7528\u9017\u53F7\u5206\u9694\uFF09" }), _jsx("input", { type: "text", value: newTags, onChange: (e) => setNewTags(e.target.value), placeholder: "\u4F8B\u5982\uFF1AOS, FreeRTOS, Alarm", className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u60AC\u8D4F\u79EF\u5206" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("input", { type: "range", min: 0, max: 100, step: 5, value: newBounty, onChange: (e) => setNewBounty(Number(e.target.value)), className: "flex-1" }), _jsx("span", { className: "text-sm font-bold text-amber-500 w-12 text-right", children: newBounty })] })] })] }), _jsxs("div", { className: "p-5 border-t border-border flex justify-end gap-3", children: [_jsx("button", { onClick: () => setShowNewQuestion(false), className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", children: "\u53D6\u6D88" }), _jsx("button", { onClick: handleCreateQuestion, disabled: !newTitle.trim() || !newContent.trim(), className: "px-5 py-2 bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg text-sm font-medium", children: "\u53D1\u5E03\u95EE\u9898" })] })] }) }))] }));
}
