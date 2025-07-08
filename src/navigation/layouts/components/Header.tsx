import React from 'react';
import { Text, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';
import { usePageInfo } from '../hooks';

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
  );
};
