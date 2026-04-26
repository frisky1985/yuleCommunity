import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { initialForumPosts, initialQuestions, initialEvents, } from '../../data/communityData';
function getDateKey(date) {
    return date.toISOString().split('T')[0];
}
function formatDateLabel(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
}
export function ActivityTrendChart() {
    const [posts] = useLocalStorage('yuletech-forum-posts', initialForumPosts);
    const [questions] = useLocalStorage('yuletech-qa-questions', initialQuestions);
    const [events] = useLocalStorage('yuletech-events', initialEvents);
    const data = useMemo(() => {
        const today = new Date();
        const days = [];
        // Collect all timestamps for activity calculation
        const allTimestamps = [];
        posts.forEach((p) => {
            allTimestamps.push(p.createdAt);
            p.replies.forEach((r) => allTimestamps.push(r.createdAt));
        });
        questions.forEach((q) => {
            allTimestamps.push(q.createdAt);
            q.answers.forEach((a) => allTimestamps.push(a.createdAt));
        });
        events.forEach((e) => {
            // Count event attendee signups as activity
            e.attendees.forEach(() => {
                allTimestamps.push(`${e.date}T00:00:00`);
            });
        });
        // Count activities per day for last 14 days
        const dailyCounts = new Map();
        for (let i = 13; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            dailyCounts.set(getDateKey(d), 0);
        }
        allTimestamps.forEach((ts) => {
            const key = ts.split('T')[0];
            if (dailyCounts.has(key)) {
                dailyCounts.set(key, (dailyCounts.get(key) || 0) + 1);
            }
        });
        for (let i = 13; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            days.push({
                label: formatDateLabel(d),
                count: dailyCounts.get(getDateKey(d)) || 0,
            });
        }
        return days;
    }, [posts, questions, events]);
    return (_jsx(ResponsiveContainer, { width: "100%", height: 280, children: _jsxs(AreaChart, { data: data, margin: { top: 5, right: 20, left: 0, bottom: 5 }, children: [_jsx("defs", { children: _jsxs("linearGradient", { id: "activityGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "5%", stopColor: "hsl(var(--accent))", stopOpacity: 0.4 }), _jsx("stop", { offset: "95%", stopColor: "hsl(var(--accent))", stopOpacity: 0.05 })] }) }), _jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }), _jsx(XAxis, { dataKey: "label", tick: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }, axisLine: { stroke: 'hsl(var(--border))' }, tickLine: { stroke: 'hsl(var(--border))' } }), _jsx(YAxis, { tick: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }, axisLine: { stroke: 'hsl(var(--border))' }, tickLine: { stroke: 'hsl(var(--border))' } }), _jsx(Tooltip, { contentStyle: {
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))',
                    }, labelStyle: { color: 'hsl(var(--foreground))' }, formatter: (value) => [`${value} 次互动`, '活跃度'] }), _jsx(Area, { type: "monotone", dataKey: "count", name: "\u4E92\u52A8\u6B21\u6570", stroke: "hsl(var(--accent))", strokeWidth: 2, fill: "url(#activityGradient)" })] }) }));
}
