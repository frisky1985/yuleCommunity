import { Routes, Route } from 'react-router-dom';
import { LearningPage } from './pages/LearningPage';
import { DocsPage } from './pages/DocsPage';
import { BlogPage } from './pages/BlogPage';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path="/learning" element={<LearningPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/" element={<LearningPage />} />
      </Routes>
    </div>
  );
}

export default App;
