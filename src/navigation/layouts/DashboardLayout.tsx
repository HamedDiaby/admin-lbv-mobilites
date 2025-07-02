import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Text, Button, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';

// Layout pour la section tableau de bord avec navigation latérale
export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Barre latérale */}
      <aside className="w-64 bg-white border-r border-border h-full">
        <div className="p-4 border-b border-border flex items-center">
          <Icon name="Bus" size={28} color={ColorsEnum.PRIMARY} />
          <Text variant="h3" color={ColorsEnum.PRIMARY} className="ml-2">LBV Mobilités</Text>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-1">
            <SidebarItem 
              icon="Layout" 
              text="Tableau de bord" 
              onClick={() => navigate('/dashboard')} 
              active={window.location.pathname === '/dashboard'}
            />
            <SidebarItem 
              icon="BarChart2" 
              text="Analytiques" 
              onClick={() => navigate('/dashboard/analytics')} 
              active={window.location.pathname === '/dashboard/analytics'}
            />
            <SidebarItem 
              icon="Users" 
              text="Utilisateurs" 
              onClick={() => navigate('/dashboard/users')} 
              active={window.location.pathname === '/dashboard/users'}
            />
            <SidebarItem 
              icon="Settings" 
              text="Paramètres" 
              onClick={() => navigate('/dashboard/settings')} 
              active={window.location.pathname === '/dashboard/settings'}
            />
          </ul>
        </nav>
      </aside>
      
      {/* Contenu principal */}
      <main className="flex-1 overflow-y-auto bg-background p-6">
        <Outlet />
      </main>
    </div>
  );
};

// Composant pour un élément du menu latéral
interface SidebarItemProps {
  icon: string;
  text: string;
  onClick: () => void;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, onClick, active }) => {
  return (
    <li>
      <button 
        onClick={onClick}
        className={`flex items-center w-full p-2 rounded-md transition-colors ${
          active 
            ? 'bg-primary text-white' 
            : 'hover:bg-background-light text-text-secondary'
        }`}
      >
        <Icon 
          name={icon as any} 
          size={18} 
          color={active ? '#FFFFFF' : ColorsEnum.TEXT_SECONDARY} 
        />
        <span className="ml-3">{text}</span>
      </button>
    </li>
  );
};
