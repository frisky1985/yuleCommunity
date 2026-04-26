import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from 'lucide-react';
export function PageLoader() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] gap-3", children: [_jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }), _jsx("span", { className: "text-sm text-muted-foreground", children: "\u9875\u9762\u52A0\u8F7D\u4E2D..." })] }));
}
