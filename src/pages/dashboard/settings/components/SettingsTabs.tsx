import React from 'react';
import { Card, Text, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { SettingsTab } from '../types';

interface SettingsTabsProps {
  tabs: SettingsTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange 
}) => {
  return (
    <Card className="p-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`p-4 border-b-2 transition-colors duration-200 ${
                isActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <Icon 
                    name={tab.icon as any} 
                    size={20} 
                    color={isActive ? ColorsEnum.PRIMARY : ColorsEnum.TEXT_SECONDARY} 
                  />
                </div>
                
                <div className="text-center">
                  <Text 
                    variant="p3" 
                    color={isActive ? ColorsEnum.PRIMARY : ColorsEnum.TEXT_PRIMARY}
                    className="font-medium"
                  >
                    {tab.name}
                  </Text>
                  <Text 
                    variant="p4" 
                    color={ColorsEnum.TEXT_SECONDARY}
                    className="text-xs mt-1 hidden md:block"
                  >
                    {tab.description}
                  </Text>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};
