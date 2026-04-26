import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from 'recharts';
import { useLocalStorage } from '../../hooks/useLocalStorage';
export function PointsSourceChart() {
    const [state] = useLocalStorage('yuletech-user-system', { points: 0, history: [] });
    const data = useMemo(() => {
        const historyItems = state?.history || [];
        const sourceCount = new Map();
        historyItems.forEach((item) => {
            const source = item.action || 'other';
            sourceCount.set(source, (sourceCount.get(source) || 0) + 1);
        });
        const hasRealData = sourceCount.size > 0;
        if (hasRealData) {
            return Array.from(sourceCount.entries()).map(([name, value]) => ({ name, value }));
        }
        return [
            { name: '论坛互动', value: 15 },
            { name: '问答回答', value: 12 },
            { name: '活动参与', value: 8 },
            { name: '内容贡献', value: 6 },
            { name: '其他', value: 4 },
        ];
    }, [state]);
    return (_jsx(ResponsiveContainer, { width: "100%", height: 280, children: _jsxs(BarChart, { data: data, margin: { top: 5, right: 20, left: 0, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }), _jsx(XAxis, { dataKey: "name", tick: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }, axisLine: { stroke: 'hsl(var(--border))' }, tickLine: { stroke: 'hsl(var(--border))' } }), _jsx(YAxis, { tick: { fill: 'hsl(var(--muted-foreground))', fontSize: 12 }, axisLine: { stroke: 'hsl(var(--border))' }, tickLine: { stroke: 'hsl(var(--border))' } }), _jsx(Tooltip, { contentStyle: {
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        color: 'hsl(var(--foreground))',
                    }, labelStyle: { color: 'hsl(var(--foreground))' }, formatter: (value) => [`${value} points`, 'Total'] }), _jsx(Bar, { dataKey: "value", fill: "hsl(var(--primary))", radius: [4, 4, 0, 0] })] }) }));
}
