import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './navigation/layouts/DashboardLayout';
import { AuthLayout } from './navigation/layouts/AuthLayout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Profile } from './pages/dashboard/profile';
import { Login } from './pages/onboarding/login';

// Test Router pour debug
const TestRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          
          {/* Routes d'authentification */}
          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
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
          </Route>
          
          {/* Page 404 */}
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default TestRouter;
