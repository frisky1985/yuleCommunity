import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PageLoader } from './components/PageLoader';

// Shell 内部页面
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <OfflineIndicator />
      <Navbar />
      <main className="pt-16">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* 远程模块路由 - 暂时使用占位符 */}
            <Route path="/opensource/*" element={<div className="p-8 text-center">开源模块加载中...</div>} />
            <Route path="/toolchain" element={<div className="p-8 text-center">工具链模块加载中...</div>} />
            <Route path="/community/*" element={<div className="p-8 text-center">社区模块加载中...</div>} />
            <Route path="/forum/*" element={<div className="p-8 text-center">论坛模块加载中...</div>} />
            <Route path="/qa/*" element={<div className="p-8 text-center">问答模块加载中...</div>} />
            <Route path="/events/*" element={<div className="p-8 text-center">活动模块加载中...</div>} />
            <Route path="/learning/*" element={<div className="p-8 text-center">学习模块加载中...</div>} />
            <Route path="/docs/*" element={<div className="p-8 text-center">文档模块加载中...</div>} />
            <Route path="/blog/*" element={<div className="p-8 text-center">博客模块加载中...</div>} />
            <Route path="/admin/*" element={<div className="p-8 text-center">管理后台模块加载中...</div>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App
