import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { useLocalStorage } from '../../hooks/useLocalStorage';
function formatDateLabel(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
}
function getDateKey(date) {
    return date.toISOString().split('T')[0];
}
export function UserGrowthChart() {
    const [state] = useLocalStorage('yuletech-user-system', { points: 0, history: [] });
    const data = useMemo(() => {
        const today = new Date();
        const days = [];
        const historyItems = state?.history || [];
        const dailyNewUsers = new Map();
        historyItems.forEach((item) => {
            const key = item.timestamp.split('T')[0];
            dailyNewUsers.set(key, (dailyNewUsers.get(key) || 0) + 1);
        });
        const hasRealData = dailyNewUsers.size > 0;
        let baseUsers = 24;
        let cumulative = baseUsers;
        for (let i = 29; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const key = getDateKey(d);
            const label = formatDateLabel(d);
            let newUsers;
            if (hasRealData) {
                newUsers = dailyNewUsers.get(key) || 0;
            }
            else {
                const seed = d.getDate() + d.getMonth() * 31;
                newUsers = Math.floor((Math.sin(seed) + 1.5) * 2) + 1;
                if (newUsers < 0)
                    newUsers = 1;
                if (newUsers > 5)
                    newUsers = 5;
            }
            cumulative += newUsers;
            days.push({ date: key, label, total: cumulative, newUsers });
        }
        return days;
    }, [state]);
    return (_jsx(ResponsiveContainer, { width: "100%", height: 280, children: _jsxs(LineChart, { data: data, margin: { top: 5, right: 20, left: 0, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }), _jsx(XAxis, { dataKey: "label", tick: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }, axisLine: { stroke: 'hsl(var(--border))' }, tickLine: { stroke: 'hsl(var(--border))' } }), _jsx(YAxis, { tick: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }, axisLine: { stroke: 'hsl(var(--border))' }, tickLine: { stroke: 'hsl(var(--border))' } }), _jsx(Tooltip, { contentStyle: {
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))',
                    }, labelStyle: { color: 'hsl(var(--foreground))' }, formatter: (value) => [`${value} users`, 'Count'] }), _jsx(Legend, { wrapperStyle: { color: 'hsl(var(--foreground))' } }), _jsx(Line, { type: "monotone", dataKey: "total", name: "Total Users", stroke: "#3b82f6", strokeWidth: 2, dot: false, activeDot: { r: 4 } }), _jsx(Line, { type: "monotone", dataKey: "newUsers", name: "New Users", stroke: "#10b981", strokeWidth: 2, dot: false, activeDot: { r: 4 } })] }) }));
}
