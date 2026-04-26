import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { initialForumPosts, initialQuestions, initialEvents, articlesData, } from '../../data/communityData';
const COLORS = ['#06b6d4', '#10b981', '#f59e0b', '#f43f5e'];
export function ContentDistributionChart() {
    const [posts] = useLocalStorage('yuletech-forum-posts', initialForumPosts);
    const [questions] = useLocalStorage('yuletech-qa-questions', initialQuestions);
    const [events] = useLocalStorage('yuletech-events', initialEvents);
    const data = useMemo(() => {
        return [
            { name: 'Forum Posts', value: posts.length, color: COLORS[0] },
            { name: 'Q&A Questions', value: questions.length, color: COLORS[1] },
            { name: 'Events', value: events.length, color: COLORS[2] },
            { name: 'Articles', value: articlesData.length, color: COLORS[3] },
        ];
    }, [posts.length, questions.length, events.length]);
    return (_jsx(ResponsiveContainer, { width: "100%", height: 280, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: data, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 90, paddingAngle: 4, dataKey: "value", stroke: "hsl(var(--card))", strokeWidth: 2, children: data.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, { contentStyle: {
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))',
                    }, labelStyle: { color: 'hsl(var(--foreground))' }, formatter: (value) => [`${value} items`, 'Count'] }), _jsx(Legend, { wrapperStyle: { color: 'hsl(var(--foreground))' } })] }) }));
}
