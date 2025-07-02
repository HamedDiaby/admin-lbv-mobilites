import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Chargement asynchrone des composants pour améliorer les performances
const Dashboard = lazy(() => import('../pages/dashboard/dashboard/dashboard').then(module => ({ default: module.Dashboard })));

const DashboardRoutes: RouteObject[] = [
  {
    index: true,
    element: <Dashboard />,
  }
];

export default DashboardRoutes;
