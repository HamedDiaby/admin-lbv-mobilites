import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';
import { MENU_ITEMS } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  isCollapsed: boolean;
  onClose: () => void;
}

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
          ${collapsed ? 'px-2 py-2 justify-center' : 'px-3 py-3'}
          rounded-xl
          ${active 
            ? 'bg-yellow text-blue-dark shadow-lg transform scale-105' 
            : 'text-white hover:bg-green-light/20 hover:text-yellow-light hover:translate-x-1'
          }
        `}
        title={collapsed ? text : undefined}
      >
        <div className={`
          flex items-center justify-center rounded-lg transition-all duration-200
          ${collapsed ? 'w-8 h-8 mr-0' : 'w-8 h-8 mr-3'}
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

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, isCollapsed, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out
      transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 bg-gradient-to-b from-green-dark to-green shadow-xl
      ${isCollapsed ? 'w-16' : 'w-64'}
    `}>
      {/* En-tête avec logo */}
      <div className={`border-b border-green-light/20 transition-all duration-300 ${
        isCollapsed ? 'p-3' : 'p-6'
      }`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-center lg:justify-start'}`}>
          <div className="flex items-center justify-center w-10 h-10 bg-yellow rounded-lg shadow-md">
            <Icon name="Bus" size={24} color={ColorsEnum.BLUE_DARK} />
          </div>
          {!isCollapsed && (
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
      <nav className={`py-6 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        <ul className="space-y-2">
          {MENU_ITEMS.map((item) => (
            <SidebarItem 
              key={item.path}
              icon={item.icon} 
              text={item.text} 
              onClick={() => handleNavigation(item.path)}
              active={location.pathname === item.path}
              collapsed={isCollapsed}
            />
          ))}
        </ul>
      </nav>

      {/* Pied de page de la sidebar */}
      {!isCollapsed && (
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
  );
};
