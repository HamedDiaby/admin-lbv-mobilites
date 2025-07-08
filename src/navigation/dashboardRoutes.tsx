import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/dashboard/dashboard';
import { Profile } from '../pages/dashboard/profile/profile';
import { Users } from '../pages/dashboard/users/users';
import { Stations } from '../pages/dashboard/stations/stations';
import { Buses } from '../pages/dashboard';

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
  },
  {
    path: 'stations',
    element: <Stations />,
  },
  {
    path: 'buses',
    element: <Buses />,
  }
];

export default DashboardRoutes;
