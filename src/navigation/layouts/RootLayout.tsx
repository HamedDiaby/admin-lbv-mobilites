import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Text } from '@components';

// Layout racine qui contient l'ensemble de l'application
export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Suspense pour gérer le chargement des composants lazy */}
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

// Composant de chargement simple
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <Text variant="p3" className="ml-3">Chargement...</Text>
    </div>
  );
};
