// Exporter tous les éléments de navigation
import routes from './routes';
export { routes };

export * from './layouts/RootLayout';
export * from './layouts/DashboardLayout';
export * from './layouts/AuthLayout';
export * from './components/NotFoundPage';
export { default as dashboardRoutes } from './dashboardRoutes';
export { default as authRoutes } from './authRoutes';
export { AppRouter } from './AppRouter';
