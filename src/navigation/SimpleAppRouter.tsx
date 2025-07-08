import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Login } from '../pages/onboarding/login';

export const SimpleAppRouter: React.FC = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <span className="ml-3">Chargement...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <div className="p-8">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p>Bienvenue ! Vous êtes connecté.</p>
            </div>
          ) : (
            <Navigate to="/auth/login" replace />
          )
        } />
        <Route path="*" element={<div>Page non trouvée</div>} />
      </Routes>
    </div>
  );
};
