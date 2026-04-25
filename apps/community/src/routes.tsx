import type { RouteObject } from 'react-router-dom';
import { CommunityPage } from './pages/CommunityPage';
import { ForumPage } from './pages/ForumPage';
import { QAPage } from './pages/QAPage';
import { EventsPage } from './pages/EventsPage';

export const routes: RouteObject[] = [
  {
    path: '/community',
    element: <CommunityPage />,
  },
  {
    path: '/community/*',
    element: <CommunityPage />,
  },
  {
    path: '/forum',
    element: <ForumPage />,
  },
  {
    path: '/forum/*',
    element: <ForumPage />,
  },
  {
    path: '/qa',
    element: <QAPage />,
  },
  {
    path: '/qa/*',
    element: <QAPage />,
  },
  {
    path: '/events',
    element: <EventsPage />,
  },
  {
    path: '/events/*',
    element: <EventsPage />,
  },
];

export default routes;
