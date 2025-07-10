import { RouteObject } from 'react-router-dom';
import { Dashboard } from '../pages/dashboard/dashboard/dashboard';
import { Profile } from '../pages/dashboard/profile/profile';
import { Users } from '../pages/dashboard/users/users';
import { Stations } from '../pages/dashboard/stations/stations';
import { Lignes } from '../pages/dashboard/lignes/lignes';
import { BusesMinimal as Buses } from '../pages/dashboard/buses/BusesMinimal';
import { Planning } from '../pages/dashboard/planning/planning';
import { Abonnements } from '../pages/dashboard/abonnements/abonnements';
import Analytics from '../pages/dashboard/analytics/analytics';
import Settings from '../pages/dashboard/settings/settings';

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
    path: 'lignes',
    element: <Lignes />,
  },
  {
    path: 'buses',
    element: <Buses />,
  },
  {
    path: 'planning',
    element: <Planning />,
  },
  {
    path: 'abonnements',
    element: <Abonnements />,
  },
  {
    path: 'analytics',
    element: <Analytics />,
  },
  {
    path: 'settings',
    element: <Settings />,
  }
];

export default DashboardRoutes;
