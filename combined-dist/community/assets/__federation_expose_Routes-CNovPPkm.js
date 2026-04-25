import { j as jsxRuntimeExports } from './jsx-runtime-XI9uIe3W.js';
import { CommunityPage } from './__federation_expose_CommunityPage-0EdMR0Vb.js';
import { ForumPage } from './__federation_expose_ForumPage-C_xVJYY_.js';
import { QAPage } from './__federation_expose_QAPage-9xUGKoqg.js';
import { EventsPage } from './__federation_expose_EventsPage-BtSpMAm4.js';

const routes = [
    {
        path: '/community',
        element: jsxRuntimeExports.jsx(CommunityPage, {}),
    },
    {
        path: '/community/*',
        element: jsxRuntimeExports.jsx(CommunityPage, {}),
    },
    {
        path: '/forum',
        element: jsxRuntimeExports.jsx(ForumPage, {}),
    },
    {
        path: '/forum/*',
        element: jsxRuntimeExports.jsx(ForumPage, {}),
    },
    {
        path: '/qa',
        element: jsxRuntimeExports.jsx(QAPage, {}),
    },
    {
        path: '/qa/*',
        element: jsxRuntimeExports.jsx(QAPage, {}),
    },
    {
        path: '/events',
        element: jsxRuntimeExports.jsx(EventsPage, {}),
    },
    {
        path: '/events/*',
        element: jsxRuntimeExports.jsx(EventsPage, {}),
    },
];

export { routes as default, routes };
