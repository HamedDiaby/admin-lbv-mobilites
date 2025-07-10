import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';
import { MENU_CATEGORIES, MenuItem } from '../constants/menuItems';
import './Sidebar.css';

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

interface CategoryHeaderProps {
  title: string;
  icon?: string;
  collapsed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  hasActiveChild: boolean;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ 
  title, 
  icon, 
  collapsed, 
  isExpanded, 
  onToggle, 
  hasActiveChild 
}) => {
  if (collapsed) {
    return (
      <div className="flex justify-center mb-3">
        <div className={`
          w-8 h-0.5 rounded-full transition-all duration-200
          ${hasActiveChild ? 'bg-yellow' : 'bg-white/20'}
        `}></div>
      </div>
    );
  }

  return (
    <button
      onClick={onToggle}
      className={`
        w-full flex items-center justify-between px-3 py-2 mb-2 rounded-lg
        transition-all duration-200 group
        ${hasActiveChild 
          ? 'bg-yellow/10 text-yellow border border-yellow/20' 
          : 'text-white/70 hover:text-yellow-light hover:bg-white/5'
        }
      `}
    >
      <div className="flex items-center">
        {icon && (
          <Icon 
            name={icon as any} 
            size={16} 
            color={hasActiveChild ? ColorsEnum.YELLOW : ColorsEnum.WHITE} 
            className="mr-2 opacity-70"
          />
        )}
        <Text 
          variant="p4" 
          color={hasActiveChild ? ColorsEnum.YELLOW : ColorsEnum.WHITE}
          weight="medium"
          className="text-xs uppercase tracking-wider"
        >
          {title}
        </Text>
      </div>
      <Icon 
        name={isExpanded ? "ChevronDown" : "ChevronRight"} 
        size={14} 
        color={hasActiveChild ? ColorsEnum.YELLOW : ColorsEnum.WHITE}
        className="opacity-50 group-hover:opacity-100 transition-all duration-200"
      />
    </button>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, onClick, active, collapsed }) => {
  return (
    <li>
      <button 
        onClick={onClick}
        className={`
          group flex items-center w-full transition-all duration-200
          ${collapsed ? 'px-2 py-2 justify-center' : 'px-3 py-2 ml-2'}
          rounded-lg
          ${active 
            ? 'bg-yellow text-blue-dark shadow-lg transform scale-105' 
            : 'text-white/90 hover:bg-green-light/20 hover:text-yellow-light hover:translate-x-1'
          }
        `}
        title={collapsed ? text : undefined}
      >
        <div className={`
          flex items-center justify-center rounded-md transition-all duration-200
          ${collapsed ? 'w-7 h-7 mr-0' : 'w-6 h-6 mr-3'}
          ${active 
            ? 'bg-blue-dark/20' 
            : 'bg-white/10 group-hover:bg-yellow-light/20'
          }
        `}>
          <Icon 
            name={icon as any} 
            size={collapsed ? 16 : 14} 
            color={active ? ColorsEnum.BLUE_DARK : ColorsEnum.WHITE} 
          />
        </div>
        {!collapsed && (
          <>
            <Text 
              variant="p3" 
              color={active ? ColorsEnum.BLUE_DARK : ColorsEnum.WHITE}
              weight={active ? 'semibold' : 'medium'}
              className="transition-all duration-200 text-sm"
            >
              {text}
            </Text>
            {active && (
              <div className="ml-auto w-1.5 h-1.5 bg-blue-dark rounded-full opacity-80"></div>
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(MENU_CATEGORIES.map(category => category.title))
  );
  const [showCategories, setShowCategories] = useState(true);

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const toggleCategory = (categoryTitle: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryTitle)) {
      newExpanded.delete(categoryTitle);
    } else {
      newExpanded.add(categoryTitle);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleAllCategories = () => {
    if (expandedCategories.size === MENU_CATEGORIES.length) {
      setExpandedCategories(new Set());
    } else {
      setExpandedCategories(new Set(MENU_CATEGORIES.map(category => category.title)));
    }
  };

  const hasActiveChildInCategory = (items: MenuItem[]) => {
    return items.some(item => location.pathname === item.path);
  };

  // Vue simple (liste plate)
  const allMenuItems = MENU_CATEGORIES.flatMap(category => category.items);

  return (
    <aside className={`
      fixed lg:static inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out
      transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 bg-gradient-to-b from-green-dark to-green shadow-xl
      ${isCollapsed ? 'w-16' : 'w-72'}
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
        
        {/* Contrôles de navigation */}
        {!isCollapsed && (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-all duration-200"
              title={showCategories ? "Vue simple" : "Vue groupée"}
            >
              <Icon 
                name={showCategories ? "List" : "FolderOpen"} 
                size={14} 
                color={ColorsEnum.WHITE} 
              />
              <Text variant="p5" color={ColorsEnum.WHITE} className="ml-1 text-xs">
                {showCategories ? "Simple" : "Groupé"}
              </Text>
            </button>
            
            {showCategories && (
              <button
                onClick={toggleAllCategories}
                className="flex items-center px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 transition-all duration-200"
                title={expandedCategories.size === MENU_CATEGORIES.length ? "Tout réduire" : "Tout développer"}
              >
                <Icon 
                  name={expandedCategories.size === MENU_CATEGORIES.length ? "ChevronUp" : "ChevronDown"} 
                  size={14} 
                  color={ColorsEnum.WHITE} 
                />
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className={`py-4 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'} overflow-y-auto`} 
           style={{ maxHeight: 'calc(100vh - 220px)' }}>
        
        {showCategories && !isCollapsed ? (
          /* Vue par catégories */
          <div className="space-y-4">
            {MENU_CATEGORIES.map((category) => {
              const hasActiveChild = hasActiveChildInCategory(category.items);
              const isExpanded = expandedCategories.has(category.title);
              
              return (
                <div key={category.title} className="space-y-1">
                  <CategoryHeader
                    title={category.title}
                    icon={category.icon}
                    collapsed={isCollapsed}
                    isExpanded={isExpanded}
                    onToggle={() => toggleCategory(category.title)}
                    hasActiveChild={hasActiveChild}
                  />
                  
                  {/* Items de la catégorie */}
                  <div className={`
                    transition-all duration-300 overflow-hidden
                    ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    <ul className="space-y-1">
                      {category.items.map((item) => (
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
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Vue simple (liste plate) */
          <ul className="space-y-1">
            {allMenuItems.map((item) => (
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
        )}
      </nav>

      {/* Pied de page de la sidebar */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green-light/20">
          <div className="flex items-center px-3 py-2 bg-green-light/10 rounded-lg system-status">
            <div className="w-2 h-2 bg-yellow rounded-full mr-3 animate-pulse"></div>
            <div className="flex-1">
              <Text variant="p4" color={ColorsEnum.YELLOW_LIGHT} className="text-xs">
                Système actif
              </Text>
              <Text variant="p5" color={ColorsEnum.WHITE} className="opacity-60 text-xs">
                {new Date().toLocaleDateString('fr-FR')}
              </Text>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
