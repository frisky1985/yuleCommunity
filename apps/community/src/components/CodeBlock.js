import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
function isDarkMode() {
    return document.documentElement.classList.contains('dark');
}
export function CodeBlock({ code, language = 'c' }) {
    const [dark, setDark] = useState(isDarkMode);
    useEffect(() => {
        setDark(isDarkMode());
        const interval = setInterval(() => {
            setDark(isDarkMode());
        }, 500);
        return () => clearInterval(interval);
    }, []);
    const bgColor = dark ? '#1e293b' : '#f8fafc';
    const textColor = dark ? '#e2e8f0' : '#1e293b';
    return (_jsxs("div", { className: "rounded-lg overflow-hidden my-4 border border-border", children: [_jsx("div", { className: "flex items-center justify-between px-4 py-2 bg-muted border-b border-border", children: _jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase", children: language }) }), _jsx("pre", { style: {
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    backgroundColor: bgColor,
                    color: textColor,
                    overflow: 'auto',
                }, children: _jsx("code", { children: code }) })] }));
}
