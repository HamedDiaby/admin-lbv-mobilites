import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { RootLayout } from './layouts/RootLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { NotFoundPage } from './components/NotFoundPage';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Profile } from '../pages/dashboard/profile';
import { Users } from '../pages/dashboard/users';
import { Stations } from '../pages/dashboard/stations';
import { Lignes } from '../pages/dashboard/lignes';
import { Buses } from '../pages/dashboard/buses';
import { Planning } from '../pages/dashboard/planning';
import { Login } from '../pages/onboarding/login';
import { ForgotPassword } from '../pages/onboarding/forgotPassword';
import { CreatePassword } from '../pages/onboarding/createPassword';

export const AppRouter: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3">Chargement...</span>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* Route par défaut vers login */}
        <Route index element={<Navigate to="/auth/login" replace />} />
        
        {/* Routes d'authentification */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="create-password" element={<CreatePassword />} />
        </Route>
        
        {/* Routes protégées du dashboard */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="stations" element={<Stations />} />
          <Route path="lignes" element={<Lignes />} />
          <Route path="buses" element={<Buses />} />
          <Route path="planning" element={<Planning />} />
        </Route>
        
        {/* Page 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};
