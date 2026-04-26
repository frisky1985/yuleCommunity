import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
    const style = dark ? oneDark : oneLight;
    const background = dark ? 'hsl(var(--card))' : 'hsl(var(--background))';
    return (_jsxs("div", { className: "rounded-lg overflow-hidden my-4 border border-border", children: [_jsx("div", { className: "flex items-center justify-between px-4 py-2 bg-muted border-b border-border", children: _jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase", children: language }) }), _jsx(SyntaxHighlighter, { language: language, style: style, customStyle: {
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    background,
                }, children: code })] }));
}
