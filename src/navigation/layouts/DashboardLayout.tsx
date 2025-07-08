import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Text, Button, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';

// Layout pour la section tableau de bord avec navigation latérale
export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Fonction pour obtenir le titre de la page actuelle
  const getPageTitle = () => {
    const path = window.location.pathname;
    switch (path) {
      case '/dashboard':
        return 'Tableau de bord';
      case '/dashboard/analytics':
        return 'Analytiques';
      case '/dashboard/users':
        return 'Utilisateurs';
      case '/dashboard/settings':
        return 'Paramètres';
      default:
        return 'LBV Mobilités';
    }
  };

  // Fonction pour obtenir le sous-titre de la page actuelle
  const getPageSubtitle = () => {
    const path = window.location.pathname;
    switch (path) {
      case '/dashboard':
        return 'Vue d\'ensemble de votre système de transport';
      case '/dashboard/analytics':
        return 'Statistiques et analyses détaillées';
      case '/dashboard/users':
        return 'Gestion des utilisateurs et permissions';
      case '/dashboard/settings':
        return 'Configuration du système';
      default:
        return 'Administration';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Overlay pour mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Barre latérale */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out
        transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 bg-gradient-to-b from-green-dark to-green shadow-xl
        ${isSidebarCollapsed ? 'w-16' : 'w-64'}
      `}>
        {/* En-tête avec logo */}
        <div className={`border-b border-green-light/20 transition-all duration-300 ${
          isSidebarCollapsed ? 'p-4' : 'p-6'
        }`}>
          <div className="flex items-center justify-center lg:justify-start">
            <div className="flex items-center justify-center w-10 h-10 bg-yellow rounded-lg shadow-md">
              <Icon name="Bus" size={24} color={ColorsEnum.BLUE_DARK} />
            </div>
            {!isSidebarCollapsed && (
              <div className="ml-3">
                <Text variant="h3" color={ColorsEnum.WHITE} className="font-bold">
                  LBV Mobilités
                </Text>
                <Text variant="p4" color={ColorsEnum.YELLOW_LIGHT} className="opacity-80">
                  Administration
                </Text>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            <SidebarItem 
              icon="Layout" 
              text="Tableau de bord" 
              onClick={() => {
                navigate('/dashboard');
                setIsSidebarOpen(false);
              }} 
              active={window.location.pathname === '/dashboard'}
              collapsed={isSidebarCollapsed}
            />
            <SidebarItem 
              icon="BarChart2" 
              text="Analytiques" 
              onClick={() => {
                navigate('/dashboard/analytics');
                setIsSidebarOpen(false);
              }} 
              active={window.location.pathname === '/dashboard/analytics'}
              collapsed={isSidebarCollapsed}
            />
            <SidebarItem 
              icon="Users" 
              text="Utilisateurs" 
              onClick={() => {
                navigate('/dashboard/users');
                setIsSidebarOpen(false);
              }} 
              active={window.location.pathname === '/dashboard/users'}
              collapsed={isSidebarCollapsed}
            />
            <SidebarItem 
              icon="Settings" 
              text="Paramètres" 
              onClick={() => {
                navigate('/dashboard/settings');
                setIsSidebarOpen(false);
              }} 
              active={window.location.pathname === '/dashboard/settings'}
              collapsed={isSidebarCollapsed}
            />
          </ul>
        </nav>

        {/* Pied de page de la sidebar */}
        {!isSidebarCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-light/20">
            <div className="flex items-center px-3 py-2 bg-green-light/10 rounded-lg">
              <div className="w-2 h-2 bg-yellow rounded-full mr-3"></div>
              <Text variant="p4" color={ColorsEnum.YELLOW_LIGHT}>
                Système actif
              </Text>
            </div>
          </div>
        )}
      </aside>
      
      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header fixe */}
        <header className="bg-white border-b border-gray-200 shadow-sm z-30 relative">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            {/* Section gauche - Menu mobile + Titre */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon name="AlignJustify" size={24} color={ColorsEnum.TEXT_PRIMARY} />
              </button>
              
              <div className="flex items-center lg:hidden">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow rounded-md mr-2">
                  <Icon name="Bus" size={16} color={ColorsEnum.BLUE_DARK} />
                </div>
                <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
                  LBV Mobilités
                </Text>
              </div>
              
              {/* Titre de page pour desktop */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Toggle sidebar collapse */}
                <button 
                  onClick={toggleSidebarCollapse}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon 
                    name={isSidebarCollapsed ? "ChevronRight" : "ChevronLeft"} 
                    size={20} 
                    color={ColorsEnum.TEXT_SECONDARY} 
                  />
                </button>
                
                <div>
                  <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
                    {getPageTitle()}
                  </Text>
                  <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
                    {getPageSubtitle()}
                  </Text>
                </div>
              </div>
            </div>

            {/* Section droite - Actions et profil */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Icon name="Bell" size={20} color={ColorsEnum.TEXT_SECONDARY} />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow rounded-full flex items-center justify-center">
                  <Text variant="p5" color={ColorsEnum.BLUE_DARK} className="font-semibold">
                    3
                  </Text>
                </div>
              </button>

              {/* Profil utilisateur */}
              <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
                <div className="hidden sm:block text-right">
                  <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                    Admin LBV
                  </Text>
                  <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                    Administrateur
                  </Text>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-green to-yellow rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color={ColorsEnum.WHITE} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu principal */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Composant pour un élément du menu latéral
interface SidebarItemProps {
  icon: string;
  text: string;
  onClick: () => void;
  active?: boolean;
  collapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, onClick, active, collapsed }) => {
  return (
    <li>
      <button 
        onClick={onClick}
        className={`
          group flex items-center w-full transition-all duration-200
          ${collapsed ? 'px-3 py-3 justify-center' : 'px-3 py-3'}
          rounded-xl
          ${active 
            ? 'bg-yellow text-blue-dark shadow-lg transform scale-105' 
            : 'text-white hover:bg-green-light/20 hover:text-yellow-light hover:translate-x-1'
          }
        `}
        title={collapsed ? text : undefined}
      >
        <div className={`
          flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
          ${collapsed ? 'mr-0' : 'mr-3'}
          ${active 
            ? 'bg-blue-dark/20' 
            : 'bg-white/10 group-hover:bg-yellow-light/20'
          }
        `}>
          <Icon 
            name={icon as any} 
            size={18} 
            color={active ? ColorsEnum.BLUE_DARK : ColorsEnum.WHITE} 
          />
        </div>
        {!collapsed && (
          <>
            <Text 
              variant="p3" 
              color={active ? ColorsEnum.BLUE_DARK : ColorsEnum.WHITE}
              weight={active ? 'semibold' : 'medium'}
              className="transition-all duration-200"
            >
              {text}
            </Text>
            {active && (
              <div className="ml-auto w-2 h-2 bg-blue-dark rounded-full opacity-60"></div>
            )}
          </>
        )}
      </button>
    </li>
  );
};
