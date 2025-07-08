import React, { useState, useEffect, useRef } from 'react';
import { Text, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';
import { usePageInfo } from '../hooks';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onToggleSidebarCollapse: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isSidebarCollapsed, 
  onToggleSidebar, 
  onToggleSidebarCollapse 
}) => {
  const { title, subtitle } = usePageInfo();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth/login', { replace: true });
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm z-30 relative">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Section gauche - Menu mobile + Titre */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
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
              onClick={onToggleSidebarCollapse}
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
                {title}
              </Text>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
                {subtitle}
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
          <div className="relative flex items-center space-x-3 pl-3 border-l border-gray-200" ref={menuRef}>
            <div className="hidden sm:block text-right">
              <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.email || 'Admin LBV'}
              </Text>
              <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                {user?.role || 'Administrateur'}
              </Text>
            </div>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-8 h-8 bg-gradient-to-r from-green to-yellow rounded-full flex items-center justify-center hover:from-green-dark hover:to-yellow-dark transition-all duration-200"
            >
              <Icon name="User" size={16} color={ColorsEnum.WHITE} />
            </button>

            {/* Menu utilisateur */}
            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    navigate('/dashboard/profile');
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
                >
                  <Icon name="User" size={16} color={ColorsEnum.TEXT_SECONDARY} />
                  <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="ml-2">
                    Mon profil
                  </Text>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center transition-colors"
                >
                  <Icon name="LogOut" size={16} color={ColorsEnum.TEXT_SECONDARY} />
                  <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="ml-2">
                    Se déconnecter
                  </Text>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
