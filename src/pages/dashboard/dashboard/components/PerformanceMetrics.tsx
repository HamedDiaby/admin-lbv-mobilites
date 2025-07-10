import React, { useState, useEffect } from 'react';
import { Card, Badge, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';
import { BusPosition } from '../types';

interface PerformanceMetricsProps {
  buses: BusPosition[];
  performanceMetrics: {
    busActifs: number;
    busEnPause: number;
    busHorsService: number;
    punctualite: number;
    vitesseMoyenne: number;
    total: number;
  };
}

interface PerformanceData {
  timestamp: Date;
  activeVehicles: number;
  averageSpeed: number;
  punctuality: number;
  totalPassengers: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ 
  buses, 
  performanceMetrics
}) => {
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceData[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<PerformanceData | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Calcul des métriques en temps réel
  useEffect(() => {
    const now = new Date();
    const totalPassengers = buses.reduce((sum, bus) => sum + bus.passagers, 0);
    
    const newMetrics: PerformanceData = {
      timestamp: now,
      activeVehicles: performanceMetrics.busActifs,
      averageSpeed: performanceMetrics.vitesseMoyenne,
      punctuality: performanceMetrics.punctualite,
      totalPassengers
    };

    setCurrentMetrics(newMetrics);
    
    // Ajouter aux données historiques (garder les 20 dernières)
    setPerformanceHistory(prev => {
      const updated = [newMetrics, ...prev].slice(0, 20);
      return updated;
    });
  }, [buses, performanceMetrics]);

  const getPerformanceStatus = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return { color: ColorsEnum.SUCCESS, text: 'Excellent' };
    if (value >= thresholds.warning) return { color: ColorsEnum.WARNING, text: 'Moyen' };
    return { color: ColorsEnum.ERROR, text: 'Critique' };
  };

  const punctualityStatus = getPerformanceStatus(performanceMetrics.punctualite, { good: 90, warning: 75 });
  const speedStatus = getPerformanceStatus(performanceMetrics.vitesseMoyenne, { good: 25, warning: 15 });

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Icon name="BarChart3" className="mr-2" size={20} />
          Métriques de Performance
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {showDetails ? 'Masquer' : 'Détails'}
        </button>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900">Ponctualité</span>
            <Badge variant="solid" color={punctualityStatus.color}>
              {punctualityStatus.text}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-blue-700 mt-1">
            {performanceMetrics.punctualite}%
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-green-900">Vitesse Moyenne</span>
            <Badge variant="solid" color={speedStatus.color}>
              {speedStatus.text}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-green-700 mt-1">
            {performanceMetrics.vitesseMoyenne} km/h
          </div>
        </div>
      </div>

      {/* État des véhicules */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">État de la Flotte</h4>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-green-100 rounded">
            <div className="text-lg font-bold text-green-700">
              {performanceMetrics.busActifs}
            </div>
            <div className="text-xs text-green-600">En Service</div>
          </div>
          
          <div className="text-center p-2 bg-yellow-100 rounded">
            <div className="text-lg font-bold text-yellow-700">
              {performanceMetrics.busEnPause}
            </div>
            <div className="text-xs text-yellow-600">En Pause</div>
          </div>
          
          <div className="text-center p-2 bg-red-100 rounded">
            <div className="text-lg font-bold text-red-700">
              {performanceMetrics.busHorsService}
            </div>
            <div className="text-xs text-red-600">Hors Service</div>
          </div>
        </div>
      </div>

      {/* Détails supplémentaires */}
      {showDetails && currentMetrics && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h5 className="font-medium text-gray-900 mb-3">Détails Performance</h5>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Passagers:</span>
              <span className="font-medium">{currentMetrics.totalPassengers}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Véhicules Actifs:</span>
              <span className="font-medium">{currentMetrics.activeVehicles}/{performanceMetrics.total}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Taux d'Utilisation:</span>
              <span className="font-medium">
                {Math.round((currentMetrics.activeVehicles / performanceMetrics.total) * 100)}%
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Dernière Mise à Jour:</span>
              <span className="font-medium text-xs">
                {currentMetrics.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Historique récent */}
          {performanceHistory.length > 1 && (
            <div className="mt-4">
              <h6 className="text-sm font-medium text-gray-700 mb-2">Tendance (5 dernières mesures)</h6>
              <div className="space-y-1">
                {performanceHistory.slice(0, 5).map((data, index) => (
                  <div key={index} className="flex justify-between text-xs text-gray-600">
                    <span>{data.timestamp.toLocaleTimeString()}</span>
                    <span>{data.punctuality}% | {data.averageSpeed} km/h</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};
