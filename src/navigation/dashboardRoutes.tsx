import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/dashboard/dashboard';
import { Profile } from '../pages/dashboard/profile/profile';
import { Users } from '../pages/dashboard/users/users';

const DashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'users',
    element: <Users />,
  }
];

export default DashboardRoutes;
