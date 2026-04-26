import { jsx as _jsx } from "react/jsx-runtime";
import { CommunityPage } from './pages/CommunityPage';
import { ForumPage } from './pages/ForumPage';
import { QAPage } from './pages/QAPage';
import { EventsPage } from './pages/EventsPage';
export const routes = [
    {
        path: '/community',
        element: _jsx(CommunityPage, {}),
    },
    {
        path: '/community/*',
        element: _jsx(CommunityPage, {}),
    },
    {
        path: '/forum',
        element: _jsx(ForumPage, {}),
    },
    {
        path: '/forum/*',
        element: _jsx(ForumPage, {}),
    },
    {
        path: '/qa',
        element: _jsx(QAPage, {}),
    },
    {
        path: '/qa/*',
        element: _jsx(QAPage, {}),
    },
    {
        path: '/events',
        element: _jsx(EventsPage, {}),
    },
    {
        path: '/events/*',
        element: _jsx(EventsPage, {}),
    },
];
export default routes;
