import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
export function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    if (isOnline)
        return null;
    return (_jsxs("div", { className: "fixed top-0 left-0 right-0 z-[60] bg-amber-500 text-white px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 shadow-md", children: [_jsx(WifiOff, { className: "w-4 h-4" }), _jsx("span", { children: "\u5F53\u524D\u5904\u4E8E\u79BB\u7EBF\u6A21\u5F0F\uFF0C\u90E8\u5206\u529F\u80FD\u53EF\u80FD\u4E0D\u53EF\u7528" })] }));
}
