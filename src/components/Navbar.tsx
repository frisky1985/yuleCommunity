import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';

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
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: '开源代码', to: '/opensource' },
    { label: '工具链', to: '/toolchain' },
    { label: '学习成长', to: '/learning' },
    { label: '技术博客', to: '/blog' },
    { label: '文档中心', to: '/docs' },
    { label: '社区', to: '/community' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-elegant border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Yule<span className="text-gradient-accent">Tech</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors relative group ${
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[hsl(var(--accent))] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/profile"
              className={`text-sm font-medium transition-colors px-3 py-2 ${
                location.pathname === '/profile'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              个人中心
            </Link>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              登录
            </button>
            <button className="text-sm font-medium bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] transition-colors px-4 py-2 rounded-lg">
              免费加入
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'text-foreground bg-muted'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              首页
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.to
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 flex flex-col gap-2 px-4">
              <Link
                to="/profile"
                className={`text-sm font-medium py-2 transition-colors ${
                  location.pathname === '/profile'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                个人中心
              </Link>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 text-left">
                登录
              </button>
              <button className="text-sm font-medium bg-[hsl(var(--primary))] text-primary-foreground hover:bg-[hsl(var(--primary-glow))] transition-colors px-4 py-2 rounded-lg">
                免费加入
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
