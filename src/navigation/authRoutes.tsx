import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Chargement asynchrone des composants pour améliorer les performances
const Login = lazy(() => import('../pages/onboarding/login/login').then(module => ({ default: module.Login })));

const AuthRoutes: RouteObject[] = [
  {
    index: true,
    element: <Login />,
  },
  {
    path: 'login',
    element: <Login />,
  }
];

export default AuthRoutes;
