import { importShared } from './__federation_fn_import-DPk4vyf3.js';
import { j as jsxRuntimeExports } from './jsx-runtime-XI9uIe3W.js';
import { u as useLocalStorage, a as useUserSystem, b as useNotifications, d as initialEvents, g as generateId } from './useNotifications-BZ3TIxqz.js';

const {useState,useEffect,useRef} = await importShared('react');

const {Calendar,Clock,MapPin,Users,Video,MapPinned,CheckCircle2,X,Plus,Search} = await importShared('lucide-react');
const typeFilters = [
    { label: '全部', value: 'all' },
    { label: '线上', value: 'online' },
    { label: '线下', value: 'offline' },
];
const statusFilters = [
    { label: '全部', value: 'all' },
    { label: '即将开始', value: 'upcoming' },
    { label: '进行中', value: 'ongoing' },
    { label: '已结束', value: 'ended' },
];
function EventsPage() {
    const [events, setEvents] = useLocalStorage('yuletech-events', initialEvents);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showNewEvent, setShowNewEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        type: 'online',
        date: '',
        time: '',
        location: '',
        description: '',
        speaker: '',
        speakerRole: '',
        maxAttendees: 100,
        tags: '',
    });
    const currentUser = '我';
    const { addPoints } = useUserSystem();
    const { addNotification } = useNotifications();
    const notifiedEventsRef = useRef(new Set());
    const filteredEvents = events.filter((evt) => {
        const matchSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            evt.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchType = typeFilter === 'all' || evt.type === typeFilter;
        const matchStatus = statusFilter === 'all' || evt.status === statusFilter;
        return matchSearch && matchType && matchStatus;
    });
    const handleRegister = (eventId) => {
        const evt = events.find((e) => e.id === eventId);
        const alreadyRegistered = evt?.attendees.includes(currentUser);
        setEvents((prev) => prev.map((e) => {
            if (e.id !== eventId)
                return e;
            const registered = e.attendees.includes(currentUser);
            if (registered) {
                return { ...e, attendees: e.attendees.filter((a) => a !== currentUser) };
            }
            if (e.attendees.length >= e.maxAttendees)
                return e;
            return { ...e, attendees: [...e.attendees, currentUser] };
        }));
        if (evt && !alreadyRegistered && evt.attendees.length < evt.maxAttendees && evt.status !== 'ended') {
            addPoints('event', `报名活动：${evt.title}`);
            addNotification({
                type: 'event_start',
                title: '活动报名成功',
                message: `你已报名《${evt.title}》，记得准时参加`,
                link: '/events',
            });
        }
    };
    const handleCreateEvent = () => {
        if (!newEvent.title.trim() || !newEvent.date || !newEvent.time || !newEvent.description.trim())
            return;
        const tags = newEvent.tags
            .split(/[,\uff0c]/)
            .map((t) => t.trim())
            .filter(Boolean);
        const evt = {
            id: generateId('evt'),
            title: newEvent.title.trim(),
            type: newEvent.type,
            date: newEvent.date,
            time: newEvent.time,
            location: newEvent.location.trim() || undefined,
            description: newEvent.description.trim(),
            speaker: newEvent.speaker.trim() || currentUser,
            speakerRole: newEvent.speakerRole.trim() || '社区成员',
            maxAttendees: newEvent.maxAttendees,
            attendees: [],
            tags: tags.length ? tags : ['活动'],
            status: 'upcoming',
        };
        setEvents((prev) => [evt, ...prev]);
        setNewEvent({
            title: '',
            type: 'online',
            date: '',
            time: '',
            location: '',
            description: '',
            speaker: '',
            speakerRole: '',
            maxAttendees: 100,
            tags: '',
        });
        setShowNewEvent(false);
    };
    useEffect(() => {
        events.forEach((evt) => {
            if (evt.status !== 'upcoming' || notifiedEventsRef.current.has(evt.id))
                return;
            const eventDate = new Date(evt.date);
            const now = new Date();
            const diffDays = (eventDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
            if (diffDays >= 0 && diffDays <= 3) {
                addNotification({
                    type: 'event_start',
                    title: '活动即将开始',
                    message: `《${evt.title}》将在 ${evt.date} 开始，记得参加`,
                    link: '/events',
                });
                notifiedEventsRef.current.add(evt.id);
            }
        });
    }, [events, addNotification]);
    const getStatusBadge = (status) => {
        switch (status) {
            case 'upcoming':
                return (jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] rounded-full text-[10px] font-bold", children: "\u5373\u5C06\u5F00\u59CB" }));
            case 'ongoing':
                return (jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full text-[10px] font-bold", children: "\u8FDB\u884C\u4E2D" }));
            case 'ended':
                return (jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-[10px] font-bold", children: "\u5DF2\u7ED3\u675F" }));
            default:
                return null;
        }
    };
    return (jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pt-16", children: [jsxRuntimeExports.jsx("div", { className: "bg-gradient-to-br from-muted/50 to-background border-b border-border", children: jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-6", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight mb-2", children: "\u793E\u533A\u6D3B\u52A8" }), jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "\u7EBF\u4E0A\u6280\u672F\u6C99\u9F99\u3001\u7EBF\u4E0B\u7814\u8BA8\u4F1A\u3001\u5B9E\u6218\u8BAD\u7EC3\u8425" })] }), jsxRuntimeExports.jsxs("button", { onClick: () => setShowNewEvent(true), className: "inline-flex items-center gap-2 bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] transition-colors px-5 py-2.5 rounded-lg font-medium self-start", children: [jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }), "\u53D1\u5E03\u6D3B\u52A8"] })] }), jsxRuntimeExports.jsx("div", { className: "mt-8 flex flex-col sm:flex-row gap-4", children: jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }), jsxRuntimeExports.jsx("input", { type: "text", placeholder: "\u641C\u7D22\u6D3B\u52A8...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }) }), jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [typeFilters.map((f) => (jsxRuntimeExports.jsx("button", { onClick: () => setTypeFilter(f.value), className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${typeFilter === f.value
                                        ? 'bg-[hsl(var(--accent))] text-white'
                                        : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: f.label }, f.value))), jsxRuntimeExports.jsx("div", { className: "w-px h-6 bg-border mx-1 self-center" }), statusFilters.map((f) => (jsxRuntimeExports.jsx("button", { onClick: () => setStatusFilter(f.value), className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === f.value
                                        ? 'bg-[hsl(var(--accent))] text-white'
                                        : 'bg-muted text-muted-foreground hover:text-foreground'}`, children: f.label }, f.value)))] })] }) }), jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredEvents.map((evt) => {
                            const isRegistered = evt.attendees.includes(currentUser);
                            const isFull = evt.attendees.length >= evt.maxAttendees;
                            const isEnded = evt.status === 'ended';
                            return (jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden hover:border-[hsl(var(--accent))]/30 hover:shadow-elegant transition-all flex flex-col", children: [jsxRuntimeExports.jsxs("div", { className: "p-5 flex-1", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [evt.type === 'online' ? (jsxRuntimeExports.jsx(Video, { className: "w-4 h-4 text-[hsl(var(--accent))]" })) : (jsxRuntimeExports.jsx(MapPinned, { className: "w-4 h-4 text-green-500" })), jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: evt.type === 'online' ? '线上' : '线下' })] }), getStatusBadge(evt.status)] }), jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-2 line-clamp-2", children: evt.title }), jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-3 mb-4", children: evt.description }), jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-xs text-muted-foreground", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }), jsxRuntimeExports.jsx("span", { children: evt.date })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5" }), jsxRuntimeExports.jsx("span", { children: evt.time })] }), evt.location && (jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }), jsxRuntimeExports.jsx("span", { children: evt.location })] })), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5" }), jsxRuntimeExports.jsxs("span", { children: [evt.attendees.length, " / ", evt.maxAttendees, " \u5DF2\u62A5\u540D"] })] })] }), jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-4", children: [jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white text-[10px] font-bold", children: evt.speaker.charAt(0) }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: evt.speaker }), jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: evt.speakerRole })] })] }), jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-3", children: evt.tags.map((tag) => (jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-muted rounded-full text-[10px] text-muted-foreground", children: tag }, tag))) })] }), jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border bg-muted/20", children: isEnded ? (jsxRuntimeExports.jsx("button", { disabled: true, className: "w-full py-2 text-sm font-medium text-muted-foreground bg-muted rounded-lg cursor-not-allowed", children: "\u6D3B\u52A8\u5DF2\u7ED3\u675F" })) : isRegistered ? (jsxRuntimeExports.jsx("button", { onClick: () => handleRegister(evt.id), className: "w-full py-2 text-sm font-medium text-green-600 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors", children: jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1", children: [jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4" }), "\u5DF2\u62A5\u540D"] }) })) : isFull ? (jsxRuntimeExports.jsx("button", { disabled: true, className: "w-full py-2 text-sm font-medium text-muted-foreground bg-muted rounded-lg cursor-not-allowed", children: "\u540D\u989D\u5DF2\u6EE1" })) : (jsxRuntimeExports.jsx("button", { onClick: () => handleRegister(evt.id), className: "w-full py-2 text-sm font-medium bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] rounded-lg transition-colors", children: "\u7ACB\u5373\u62A5\u540D" })) })] }, evt.id));
                        }) }), filteredEvents.length === 0 && (jsxRuntimeExports.jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [jsxRuntimeExports.jsx(Calendar, { className: "w-12 h-12 mx-auto mb-4 opacity-30" }), jsxRuntimeExports.jsx("p", { children: "\u6CA1\u6709\u627E\u5230\u76F8\u5173\u6D3B\u52A8" })] }))] }), showNewEvent && (jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm", children: jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl", children: [jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-5 border-b border-border", children: [jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold", children: "\u53D1\u5E03\u6D3B\u52A8" }), jsxRuntimeExports.jsx("button", { onClick: () => setShowNewEvent(false), className: "p-1.5 rounded-lg hover:bg-muted transition-colors", children: jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })] }), jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u6D3B\u52A8\u6807\u9898" }), jsxRuntimeExports.jsx("input", { type: "text", value: newEvent.title, onChange: (e) => setNewEvent({ ...newEvent, title: e.target.value }), placeholder: "\u6D3B\u52A8\u540D\u79F0", className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u6D3B\u52A8\u7C7B\u578B" }), jsxRuntimeExports.jsxs("select", { value: newEvent.type, onChange: (e) => setNewEvent({ ...newEvent, type: e.target.value }), className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30", children: [jsxRuntimeExports.jsx("option", { value: "online", children: "\u7EBF\u4E0A" }), jsxRuntimeExports.jsx("option", { value: "offline", children: "\u7EBF\u4E0B" })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u4EBA\u6570\u4E0A\u9650" }), jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 10000, value: newEvent.maxAttendees, onChange: (e) => setNewEvent({ ...newEvent, maxAttendees: Number(e.target.value) }), className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] })] }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u65E5\u671F" }), jsxRuntimeExports.jsx("input", { type: "date", value: newEvent.date, onChange: (e) => setNewEvent({ ...newEvent, date: e.target.value }), className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u65F6\u95F4" }), jsxRuntimeExports.jsx("input", { type: "text", value: newEvent.time, onChange: (e) => setNewEvent({ ...newEvent, time: e.target.value }), placeholder: "\u4F8B\u5982\uFF1A20:00 - 21:30", className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u5730\u70B9 / \u94FE\u63A5" }), jsxRuntimeExports.jsx("input", { type: "text", value: newEvent.location, onChange: (e) => setNewEvent({ ...newEvent, location: e.target.value }), placeholder: newEvent.type === 'online' ? '腾讯会议 / B站直播 / Zoom' : '详细地址', className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u6D3B\u52A8\u63CF\u8FF0" }), jsxRuntimeExports.jsx("textarea", { value: newEvent.description, onChange: (e) => setNewEvent({ ...newEvent, description: e.target.value }), placeholder: "\u6D3B\u52A8\u8BE6\u60C5\u4ECB\u7ECD...", rows: 4, className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30 resize-none" })] }), jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u4E3B\u8BB2\u4EBA" }), jsxRuntimeExports.jsx("input", { type: "text", value: newEvent.speaker, onChange: (e) => setNewEvent({ ...newEvent, speaker: e.target.value }), placeholder: "\u59D3\u540D", className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u4E3B\u8BB2\u4EBA\u804C\u4F4D" }), jsxRuntimeExports.jsx("input", { type: "text", value: newEvent.speakerRole, onChange: (e) => setNewEvent({ ...newEvent, speakerRole: e.target.value }), placeholder: "\u804C\u4F4D", className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] })] }), jsxRuntimeExports.jsxs("div", { children: [jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-1.5", children: "\u6807\u7B7E\uFF08\u7528\u9017\u53F7\u5206\u9694\uFF09" }), jsxRuntimeExports.jsx("input", { type: "text", value: newEvent.tags, onChange: (e) => setNewEvent({ ...newEvent, tags: e.target.value }), placeholder: "\u4F8B\u5982\uFF1ABSW, \u6280\u672F\u5206\u4EAB, \u57F9\u8BAD", className: "w-full px-3 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))]/30" })] })] }), jsxRuntimeExports.jsxs("div", { className: "p-5 border-t border-border flex justify-end gap-3", children: [jsxRuntimeExports.jsx("button", { onClick: () => setShowNewEvent(false), className: "px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors", children: "\u53D6\u6D88" }), jsxRuntimeExports.jsx("button", { onClick: handleCreateEvent, disabled: !newEvent.title.trim() || !newEvent.date || !newEvent.time || !newEvent.description.trim(), className: "px-5 py-2 bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-lg text-sm font-medium", children: "\u53D1\u5E03\u6D3B\u52A8" })] })] }) }))] }));
}

export { EventsPage };
