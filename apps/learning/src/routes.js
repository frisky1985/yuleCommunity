import { jsx as _jsx } from "react/jsx-runtime";
import { LearningPage } from './pages/LearningPage';
import { DocsPage } from './pages/DocsPage';
import { BlogPage } from './pages/BlogPage';
export const routes = [
    {
        path: '/learning',
        element: _jsx(LearningPage, {}),
    },
    {
        path: '/learning/*',
        element: _jsx(LearningPage, {}),
    },
    {
        path: '/docs',
        element: _jsx(DocsPage, {}),
    },
    {
        path: '/docs/*',
        element: _jsx(DocsPage, {}),
    },
    {
        path: '/blog',
        element: _jsx(BlogPage, {}),
    },
    {
        path: '/blog/*',
        element: _jsx(BlogPage, {}),
    },
];
export default routes;
