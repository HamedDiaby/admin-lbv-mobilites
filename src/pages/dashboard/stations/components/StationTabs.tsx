import { FC } from "react";
import { Icon } from "@components";
import { City, Station } from "../types";

interface StationTabsProps {
  activeTab: 'cities' | 'stations' | 'map';
  onTabChange: (tab: 'cities' | 'stations' | 'map') => void;
  cities: City[];
  stations: Station[];
}

export const StationTabs: FC<StationTabsProps> = ({ 
  activeTab, 
  onTabChange, 
  cities, 
  stations 
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8">
        <button
          onClick={() => onTabChange('cities')}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'cities'
              ? 'border-green text-green'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Icon name="MapPin" size={16} className="mr-2 inline" />
          Villes ({cities.length})
        </button>
        <button
          onClick={() => onTabChange('stations')}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'stations'
              ? 'border-green text-green'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Icon name="Bus" size={16} className="mr-2 inline" />
          Stations ({stations.length})
        </button>
        <button
          onClick={() => onTabChange('map')}
          className={`py-2 px-1 border-b-2 font-medium text-sm ${
            activeTab === 'map'
              ? 'border-green text-green'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Icon name="Map" size={16} className="mr-2 inline" />
          Carte
        </button>
      </nav>
    </div>
  );
};
