import { useLocation } from 'react-router-dom';

export interface PageInfo {
  title: string;
  subtitle: string;
}

export const usePageInfo = (): PageInfo => {
  const location = useLocation();
  
  const getPageInfo = (): PageInfo => {
    switch (location.pathname) {
      case '/dashboard':
        return {
          title: 'Tableau de bord',
          subtitle: 'Vue d\'ensemble de votre système de transport'
        };
      case '/dashboard/analytics':
        return {
          title: 'Analytiques',
          subtitle: 'Statistiques et analyses détaillées'
        };
      case '/dashboard/users':
        return {
          title: 'Utilisateurs',
          subtitle: 'Gestion des utilisateurs et permissions'
        };
      case '/dashboard/settings':
        return {
          title: 'Paramètres',
          subtitle: 'Configuration du système'
        };
      default:
        return {
          title: 'LBV Mobilités',
          subtitle: 'Administration'
        };
    }
  };

  return getPageInfo();
};
