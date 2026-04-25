import { RouteObject } from 'react-router-dom';
import { LearningPage } from './pages/LearningPage';
import { DocsPage } from './pages/DocsPage';
import { BlogPage } from './pages/BlogPage';

export const routes: RouteObject[] = [
  {
    path: '/learning',
    element: <LearningPage />,
  },
  {
    path: '/learning/*',
    element: <LearningPage />,
  },
  {
    path: '/docs',
    element: <DocsPage />,
  },
  {
    path: '/docs/*',
    element: <DocsPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/blog/*',
    element: <BlogPage />,
  },
];

export default routes;
