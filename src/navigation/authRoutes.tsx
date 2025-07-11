import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

// Chargement asynchrone des composants pour améliorer les performances
const Login = lazy(() => import('../pages/onboarding/login/login').then(module => ({ default: module.Login })));
const ForgotPassword = lazy(() => import('../pages/onboarding/forgotPassword/forgotPassword').then(module => ({ default: module.ForgotPassword })));
const CreatePassword = lazy(() => import('../pages/onboarding/createPassword/createPassword').then(module => ({ default: module.CreatePassword })));

const AuthRoutes: RouteObject[] = [
  {
    index: true,
    element: <Login />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: 'create-password',
    element: <CreatePassword />,
  }
];

export default AuthRoutes;
