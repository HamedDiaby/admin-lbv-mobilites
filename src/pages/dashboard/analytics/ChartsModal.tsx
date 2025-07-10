import React, { useState } from 'react';
import { Card } from '../../../components/card';
import { Button } from '../../../components/button';
import { Text } from '../../../components/text';
import { Badge } from '../../../components/badge';
import { Modal } from '../../../components/modal';
import { AnalyticsData } from './types';

interface ChartsModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnalyticsData;
}

const ChartsModal: React.FC<ChartsModalProps> = ({ isOpen, onClose, data }) => {
  const [selectedChart, setSelectedChart] = useState<'revenue' | 'trips' | 'users'>('revenue');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  // Simulation de graphique avec barres CSS
  const renderChart = () => {
    let chartData: any[];
    let title: string;
    let color: string;

    switch (selectedChart) {
      case 'revenue':
        chartData = data.revenueEvolution.slice(-7);
        title = 'Évolution des revenus (7 derniers jours)';
        color = 'bg-blue-500';
        break;
      case 'trips':
        chartData = data.tripsEvolution.slice(-7);
        title = 'Évolution des voyages (7 derniers jours)';
        color = 'bg-green-500';
        break;
      case 'users':
        chartData = data.userGrowth.slice(-7);
        title = 'Croissance des utilisateurs (7 derniers jours)';
        color = 'bg-purple-500';
        break;
    }

    const maxValue = Math.max(...chartData.map(item => 
      selectedChart === 'revenue' ? item.revenue :
      selectedChart === 'trips' ? item.trips :
      item.newUsers
    ));

    return (
      <div className="space-y-4">
        <Text variant="h4" className="text-gray-900 font-semibold">
          {title}
        </Text>
        
        <div className="flex items-end space-x-2 h-64">
          {chartData.map((item, index) => {
            const value = selectedChart === 'revenue' ? item.revenue :
                         selectedChart === 'trips' ? item.trips :
                         item.newUsers;
            
            const height = (value / maxValue) * 240;
            const date = new Date(item.date);
            const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="relative group">
                  <div 
                    className={`${color} rounded-t transition-all duration-300 hover:opacity-80 cursor-pointer w-full`}
                    style={{ height: `${height}px`, minHeight: '10px' }}
                  />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    {selectedChart === 'revenue' ? formatCurrency(value) :
                     selectedChart === 'trips' ? `${formatNumber(value)} voyages` :
                     `${formatNumber(value)} nouveaux`}
                  </div>
                </div>
                
                <Text variant="p5" className="text-gray-500 mt-2">
                  {dayName}
                </Text>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center space-x-4 pt-4">
          <button
            onClick={() => setSelectedChart('revenue')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'revenue' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Revenus
          </button>
          <button
            onClick={() => setSelectedChart('trips')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'trips' 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Voyages
          </button>
          <button
            onClick={() => setSelectedChart('users')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedChart === 'users' 
                ? 'bg-purple-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Utilisateurs
          </button>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Graphiques Analytiques" size="lg">
      <div className="p-6">
        {renderChart()}
        
        {/* Statistiques supplémentaires */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <Text variant="p3" className="text-blue-700 font-medium">
              Revenus Moyens/Jour
            </Text>
            <Text variant="h4" className="text-blue-900 font-bold">
              {formatCurrency(data.totalRevenue / 30)}
            </Text>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <Text variant="p3" className="text-green-700 font-medium">
              Voyages Moyens/Jour
            </Text>
            <Text variant="h4" className="text-green-900 font-bold">
              {Math.round(data.totalTrips / 30)}
            </Text>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <Text variant="p3" className="text-purple-700 font-medium">
              Nouveaux Utilisateurs/Jour
            </Text>
            <Text variant="h4" className="text-purple-900 font-bold">
              {Math.round(data.totalUsers / 30)}
            </Text>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-4 p-6 border-t">
        <Button 
          label="Fermer" 
          appearance="outline" 
          variation="secondary" 
          onClick={onClose} 
        />
        <Button 
          label="Exporter les données" 
          appearance="solid" 
          variation="primary" 
          iconName="Download" 
        />
      </div>
    </Modal>
  );
};

export default ChartsModal;
