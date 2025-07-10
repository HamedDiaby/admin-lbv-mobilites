import React, { useState, useEffect } from 'react';
import { Card } from '../../../../components/card';
import { Badge } from '../../../../components/badge';
import { Icon } from '../../../../components/icon';
import { Button } from '../../../../components/button';
import { BusPosition, Station } from '../types';
import { ColorsEnum } from '../../../../utils/enums';

interface RealTimeInfoProps {
  selectedBus: BusPosition | null;
  selectedStation: Station | null;
  onClearSelection: () => void;
}

interface BusUpdate {
  id: string;
  message: string;
  timestamp: Date;
  type: 'arrival' | 'departure' | 'delay' | 'breakdown';
}

export const RealTimeInfo: React.FC<RealTimeInfoProps> = ({ 
  selectedBus, 
  selectedStation, 
  onClearSelection 
}) => {
  const [updates, setUpdates] = useState<BusUpdate[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulation d'updates en temps réel
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Générer des updates aléatoires
      const updateTypes: BusUpdate['type'][] = ['arrival', 'departure', 'delay'];
      const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];
      
      const messages = {
        arrival: `Bus arrive à la station prévue`,
        departure: `Bus quitte la station`,
        delay: `Bus signale un retard de 3 minutes`,
        breakdown: `Bus signale une panne résolue`
      };

      const newUpdate: BusUpdate = {
        id: `update_${Date.now()}`,
        message: messages[randomType],
        timestamp: new Date(),
        type: randomType
      };

      setUpdates(prev => [newUpdate, ...prev].slice(0, 10)); // Garde seulement les 10 dernières
    }, 8000); // Nouvelle update toutes les 8 secondes

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getUpdateIcon = (type: BusUpdate['type']) => {
    switch (type) {
      case 'arrival': return 'ArrowDown';
      case 'departure': return 'ArrowUp';
      case 'delay': return 'Clock';
      case 'breakdown': return 'AlertTriangle';
      default: return 'Info';
    }
  };

  const getUpdateColor = (type: BusUpdate['type']) => {
    switch (type) {
      case 'arrival': return ColorsEnum.SUCCESS;
      case 'departure': return ColorsEnum.INFO_LIGHT;
      case 'delay': return ColorsEnum.WARNING;
      case 'breakdown': return ColorsEnum.ERROR;
      default: return ColorsEnum.GRAY_500;
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Icon name="Activity" className="mr-2" size={20} />
          Informations Temps Réel
        </h3>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={autoRefresh ? 'solid' : 'soft'} 
            color={autoRefresh ? ColorsEnum.SUCCESS : ColorsEnum.GRAY_500}
            className="animate-pulse"
          >
            {autoRefresh ? 'En direct' : 'Pausé'}
          </Badge>
          <Button
            size="sm"
            appearance="outline"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <Icon name={autoRefresh ? 'Pause' : 'Play'} size={14} />
          </Button>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="text-lg font-bold text-blue-700">12</div>
          <div className="text-xs text-blue-600">Bus actifs</div>
        </div>
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="text-lg font-bold text-green-700">245</div>
          <div className="text-xs text-green-600">Passagers</div>
        </div>
        <div className="text-center p-2 bg-yellow-50 rounded">
          <div className="text-lg font-bold text-yellow-700">2.5 min</div>
          <div className="text-xs text-yellow-600">Retard moy.</div>
        </div>
      </div>

      {/* Feed d'activités */}
      <div className="space-y-2 max-h-48 overflow-y-auto">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Activité Récente</h4>
        
        {updates.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            En attente d'activités...
          </div>
        ) : (
          updates.map((update) => (
            <div 
              key={update.id} 
              className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon 
                  name={getUpdateIcon(update.type) as any} 
                  size={16} 
                  color={getUpdateColor(update.type)} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">{update.message}</p>
                <p className="text-xs text-gray-500">
                  {update.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};
