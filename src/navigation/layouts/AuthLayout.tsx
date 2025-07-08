import React from 'react';
import { Outlet } from 'react-router-dom';

// Layout simple pour les pages d'authentification
// Le composant Login gère maintenant son propre design complet
export const AuthLayout: React.FC = () => {
  return <Outlet />;
};
