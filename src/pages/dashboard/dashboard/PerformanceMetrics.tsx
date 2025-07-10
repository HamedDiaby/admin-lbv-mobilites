import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/card';
import { Badge } from '../../../components/badge';
import { Icon } from '../../../components/icon';
import { BusPosition, Station, Ligne } from './types';
import { ColorsEnum } from '../../../utils/enums';

interface PerformanceMetricsProps {
  buses: BusPosition[];
  stations: Station[];
  lignes: Ligne[];
}

interface PerformanceData {
  timestamp: Date;
  activeVehicles: number;
  averageSpeed: number;
  totalPassengers: number;
  onTimePerformance: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  buses,
  stations,
  lignes
}) => {
  const [performanceHistory, setPerformanceHistory] = useState<PerformanceData[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState<PerformanceData | null>(null);

  // Calculer les métriques de performance actuelles
  useEffect(() => {
    const activeVehicles = buses.filter(bus => bus.statut === 'en_service').length;
    const totalSpeed = buses
      .filter(bus => bus.statut === 'en_service')
      .reduce((sum, bus) => sum + bus.vitesse, 0);
    const averageSpeed = activeVehicles > 0 ? totalSpeed / activeVehicles : 0;
    
    const totalPassengers = buses.reduce((sum, bus) => sum + bus.passagers, 0);
    
    const onTimeBuses = buses.filter(bus => bus.retard <= 2).length;
    const onTimePerformance = buses.length > 0 ? (onTimeBuses / buses.length) * 100 : 100;

    const newMetrics: PerformanceData = {
      timestamp: new Date(),
      activeVehicles,
      averageSpeed: Math.round(averageSpeed),
      totalPassengers,
      onTimePerformance: Math.round(onTimePerformance)
    };

    setCurrentMetrics(newMetrics);

    // Ajouter aux données historiques (garder seulement les 20 dernières)
    setPerformanceHistory(prev => [...prev, newMetrics].slice(-20));
  }, [buses]);

  const getPerformanceColor = (value: number, type: 'speed' | 'onTime' | 'passengers') => {
    switch (type) {
      case 'speed':
        if (value >= 30) return ColorsEnum.SUCCESS;
        if (value >= 20) return ColorsEnum.WARNING;
        return ColorsEnum.ERROR;
      case 'onTime':
        if (value >= 90) return ColorsEnum.SUCCESS;
        if (value >= 75) return ColorsEnum.WARNING;
        return ColorsEnum.ERROR;
      case 'passengers':
        const totalCapacity = buses.reduce((sum, bus) => sum + bus.capacite, 0);
        const utilizationRate = totalCapacity > 0 ? (value / totalCapacity) * 100 : 0;
        if (utilizationRate >= 70) return ColorsEnum.SUCCESS;
        if (utilizationRate >= 50) return ColorsEnum.WARNING;
        return ColorsEnum.ERROR;
      default:
        return ColorsEnum.GRAY_500;
    }
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return 'TrendingUp';
    if (current < previous) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (current: number, previous: number, isPositiveTrend: boolean = true) => {
    if (current > previous) return isPositiveTrend ? ColorsEnum.SUCCESS : ColorsEnum.ERROR;
    if (current < previous) return isPositiveTrend ? ColorsEnum.ERROR : ColorsEnum.SUCCESS;
    return ColorsEnum.GRAY_500;
  };

  if (!currentMetrics) return null;

  const previousMetrics = performanceHistory[performanceHistory.length - 2];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Icon name="BarChart3" className="mr-2" size={20} />
          Métriques de Performance
        </h3>
        <Badge variant="soft" color={ColorsEnum.INFO_LIGHT}>
          Temps réel
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Véhicules actifs */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-blue-700">Véhicules Actifs</span>
            {previousMetrics && (
              <Icon 
                name={getTrendIcon(currentMetrics.activeVehicles, previousMetrics.activeVehicles) as any}
                size={14}
                color={getTrendColor(currentMetrics.activeVehicles, previousMetrics.activeVehicles)}
              />
            )}
          </div>
          <div className="text-2xl font-bold text-blue-900">
            {currentMetrics.activeVehicles}
          </div>
          <div className="text-xs text-blue-600">
            Sur {buses.length} total
          </div>
        </div>

        {/* Vitesse moyenne */}
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-green-700">Vitesse Moyenne</span>
            {previousMetrics && (
              <Icon 
                name={getTrendIcon(currentMetrics.averageSpeed, previousMetrics.averageSpeed) as any}
                size={14}
                color={getTrendColor(currentMetrics.averageSpeed, previousMetrics.averageSpeed)}
              />
            )}
          </div>
          <div className="text-2xl font-bold text-green-900">
            {currentMetrics.averageSpeed}
            <span className="text-sm font-normal ml-1">km/h</span>
          </div>
          <div className="text-xs text-green-600">
            <Badge 
              variant="solid" 
              color={getPerformanceColor(currentMetrics.averageSpeed, 'speed')}
              size="xs"
            >
              {currentMetrics.averageSpeed >= 30 ? 'Optimal' : 
               currentMetrics.averageSpeed >= 20 ? 'Acceptable' : 'Faible'}
            </Badge>
          </div>
        </div>

        {/* Passagers totaux */}
        <div className="p-3 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-purple-700">Passagers</span>
            {previousMetrics && (
              <Icon 
                name={getTrendIcon(currentMetrics.totalPassengers, previousMetrics.totalPassengers) as any}
                size={14}
                color={getTrendColor(currentMetrics.totalPassengers, previousMetrics.totalPassengers)}
              />
            )}
          </div>
          <div className="text-2xl font-bold text-purple-900">
            {currentMetrics.totalPassengers}
          </div>
          <div className="text-xs text-purple-600">
            {Math.round((currentMetrics.totalPassengers / buses.reduce((sum, bus) => sum + bus.capacite, 0)) * 100)}% capacité
          </div>
        </div>

        {/* Ponctualité */}
        <div className="p-3 bg-yellow-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-yellow-700">Ponctualité</span>
            {previousMetrics && (
              <Icon 
                name={getTrendIcon(currentMetrics.onTimePerformance, previousMetrics.onTimePerformance) as any}
                size={14}
                color={getTrendColor(currentMetrics.onTimePerformance, previousMetrics.onTimePerformance)}
              />
            )}
          </div>
          <div className="text-2xl font-bold text-yellow-900">
            {currentMetrics.onTimePerformance}%
          </div>
          <div className="text-xs text-yellow-600">
            <Badge 
              variant="solid" 
              color={getPerformanceColor(currentMetrics.onTimePerformance, 'onTime')}
              size="xs"
            >
              {currentMetrics.onTimePerformance >= 90 ? 'Excellent' : 
               currentMetrics.onTimePerformance >= 75 ? 'Bon' : 'À améliorer'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Résumé des lignes */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">État des Lignes</h4>
        <div className="space-y-1">
          {lignes.map((ligne) => {
            const busesLigne = buses.filter(bus => bus.ligne === ligne.nom);
            const busesActifs = busesLigne.filter(bus => bus.statut === 'en_service').length;
            
            return (
              <div key={ligne.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: ligne.couleur }}
                  ></div>
                  <span className="font-medium">{ligne.nom}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-600">{busesActifs}/{ligne.busActifs}</span>
                  <Badge 
                    variant="soft" 
                    color={ligne.statut === 'normal' ? ColorsEnum.SUCCESS : 
                           ligne.statut === 'retard' ? ColorsEnum.WARNING : ColorsEnum.ERROR}
                    size="xs"
                  >
                    {ligne.statut}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
