import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/dashboard/dashboard';
import { Profile } from '../pages/dashboard/profile/profile';

const DashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'profile',
    element: <Profile />,
  }
];

export default DashboardRoutes;
