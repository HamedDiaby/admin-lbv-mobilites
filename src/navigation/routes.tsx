import { RouteObject } from 'react-router-dom';
import DashboardRoutes from './dashboardRoutes';
import AuthRoutes from './authRoutes';
import { RootLayout } from './layouts/RootLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { NotFoundPage } from './components/NotFoundPage';

// Définition des routes principales de l'application
const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <DashboardLayout />,
      },
      {
        path: 'dashboard/*',
        element: <DashboardLayout />,
        children: DashboardRoutes,
      },
      {
        path: 'auth/*',
        element: <AuthLayout />,
        children: AuthRoutes,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routes;
