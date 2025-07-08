import { RouteObject, Navigate } from 'react-router-dom';
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
        element: <Navigate to="/auth/login" replace />,
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
