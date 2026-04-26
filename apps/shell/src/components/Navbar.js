import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Code2, Menu, X, Shield, Search, Bell } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(() => {
        setIsMobileMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);
    const navLinks = [
        { label: '开源代码', to: '/opensource' },
        { label: '工具链', to: '/toolchain' },
        { label: '学习成长', to: '/learning' },
        { label: '技术博客', to: '/blog' },
        { label: '文档中心', to: '/docs' },
        { label: '论坛', to: '/forum' },
        { label: '问答', to: '/qa' },
        { label: '活动', to: '/events' },
        { label: '开发板', to: '/hardware' },
        { label: '下载中心', to: '/downloads' },
    ];
    return (_jsx("nav", { className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-background/80 backdrop-blur-xl shadow-elegant border-b border-border/50'
            : 'bg-transparent'}`, children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center", children: _jsx(Code2, { className: "w-5 h-5 text-white" }) }), _jsxs("span", { className: "font-bold text-lg tracking-tight", children: ["Yule", _jsx("span", { className: "text-[hsl(var(--accent))]", children: "Tech" })] })] }), _jsx("div", { className: "hidden lg:flex items-center gap-6 ml-12", children: navLinks.map((link) => (_jsx(NavLink, { to: link.to, className: ({ isActive }) => `text-sm font-medium transition-colors relative group ${isActive
                                    ? 'text-foreground'
                                    : 'text-muted-foreground hover:text-foreground'}`, children: ({ isActive }) => (_jsxs(_Fragment, { children: [link.label, _jsx("span", { className: `absolute -bottom-1 left-0 h-0.5 bg-[hsl(var(--accent))] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}` })] })) }, link.to))) }), _jsxs("div", { className: "hidden md:flex items-center gap-3", children: [_jsx("button", { className: "p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted", children: _jsx(Search, { className: "w-4 h-4" }) }), _jsx("button", { className: "p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted", children: _jsx(Bell, { className: "w-4 h-4" }) }), _jsx(ThemeToggle, {}), _jsx(Link, { to: "/admin/dashboard", className: "p-2 text-muted-foreground hover:text-[hsl(var(--accent))] transition-colors rounded-lg hover:bg-muted", title: "\u7BA1\u7406\u540E\u53F0", children: _jsx(Shield, { className: "w-4 h-4" }) }), _jsx(Link, { to: "/profile", className: `text-sm font-medium transition-colors px-3 py-2 ${location.pathname === '/profile'
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'}`, children: "\u4E2A\u4EBA\u4E2D\u5FC3" }), _jsx("button", { className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2", children: "\u767B\u5F55" }), _jsx("button", { className: "text-sm font-medium bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] transition-colors px-4 py-2 rounded-lg", children: "\u514D\u8D39\u52A0\u5165" })] }), _jsx("button", { className: "md:hidden p-2 text-muted-foreground hover:text-foreground", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), children: isMobileMenuOpen ? _jsx(X, { className: "w-5 h-5" }) : _jsx(Menu, { className: "w-5 h-5" }) })] }), isMobileMenuOpen && (_jsxs("div", { className: "md:hidden pb-4 space-y-2", children: [_jsx(Link, { to: "/", className: `block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === '/'
                                ? 'text-foreground bg-muted'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`, onClick: () => setIsMobileMenuOpen(false), children: "\u9996\u9875" }), navLinks.map((link) => (_jsx(Link, { to: link.to, className: `block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${location.pathname === link.to
                                ? 'text-foreground bg-muted'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`, onClick: () => setIsMobileMenuOpen(false), children: link.label }, link.to))), _jsxs("div", { className: "pt-2 flex flex-col gap-2 px-4", children: [_jsxs("div", { className: "flex items-center justify-between py-2 border-b border-border", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "\u4E3B\u9898" }), _jsx(ThemeToggle, {})] }), _jsx(Link, { to: "/profile", className: `text-sm font-medium py-2 transition-colors ${location.pathname === '/profile'
                                        ? 'text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'}`, onClick: () => setIsMobileMenuOpen(false), children: "\u4E2A\u4EBA\u4E2D\u5FC3" }), _jsx("button", { className: "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 text-left", children: "\u767B\u5F55" }), _jsx("button", { className: "text-sm font-medium bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] transition-colors px-4 py-2 rounded-lg", children: "\u514D\u8D39\u52A0\u5165" })] })] }))] }) }));
}
