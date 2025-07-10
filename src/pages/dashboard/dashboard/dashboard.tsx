import React from 'react';
import { 
  StatsOverview,
  InteractiveMap,
  AlertsPanel,
  RealTimeInfo,
  PerformanceMetrics
} from './components';
import { Card, Button, Icon, Badge } from '@components';
import { ColorsEnum } from '@utils/enums';
import { useRealTimeData, useMapState } from './hooks';
import { filterBuses, calculatePerformanceMetrics } from './utils';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  // Utilisation des hooks personnalisés
  const { buses, stations, incidents, stats, refreshData } = useRealTimeData({
    enabled: true,
    updateInterval: 5000
  });
  
  const { 
    mapFilters, 
    selectedBus, 
    selectedStation,
    setMapFilters,
    handleBusClick,
    handleStationClick,
    clearSelection
  } = useMapState();

  // Filtrage des données
  const filteredBuses = filterBuses(buses, mapFilters);
  const performanceMetrics = calculatePerformanceMetrics(buses);

  // Gestion des événements
  const handleIncidentResolve = (incidentId: string) => {
    // Cette fonction sera gérée par le hook useRealTimeData dans une version future
    console.log('Résolution incident:', incidentId);
  };

  const handleRefreshData = () => {
    refreshData();
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête du dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Transport</h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble en temps réel du système de transport LBV Mobilités
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge 
            variant="solid" 
            color={incidents.filter(i => i.statut === 'actif').length > 0 ? ColorsEnum.ERROR : ColorsEnum.SUCCESS}
          >
            {incidents.filter(i => i.statut === 'actif').length === 0 ? 'Système Normal' : `${incidents.filter(i => i.statut === 'actif').length} Incident(s)`}
          </Badge>
          
          <Button
            appearance="outline"
            onClick={handleRefreshData}
            iconName="RefreshCw"
          >
            Actualiser
          </Button>
        </div>
      </div>

      {/* Statistiques générales */}
      <StatsOverview stats={stats} />

      {/* Section principale avec carte et informations */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Carte interactive (3/4 de la largeur) */}
        <div className="xl:col-span-3">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Icon name="Map" className="mr-2" size={24} />
                Carte Interactive en Temps Réel
              </h2>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={mapFilters.affichageTempsReel ? 'solid' : 'soft'}
                  color={mapFilters.affichageTempsReel ? ColorsEnum.SUCCESS : ColorsEnum.GRAY_500}
                >
                  {mapFilters.affichageTempsReel ? 'Temps Réel Actif' : 'Mode Statique'}
                </Badge>
                <span className="text-sm text-gray-500">
                  {buses.filter(b => b.statut === 'en_service').length} bus actifs
                </span>
              </div>
            </div>
            
            <div className="h-96">
              <InteractiveMap
                buses={filteredBuses}
                stations={stations}
                selectedBus={selectedBus}
                selectedStation={selectedStation}
                onBusClick={handleBusClick}
                onStationClick={handleStationClick}
                mapFilters={mapFilters}
                onFiltersChange={setMapFilters}
              />
            </div>
          </Card>
        </div>

        {/* Panneau latéral droit (1/4 de la largeur) */}
        <div className="xl:col-span-1 space-y-4">
          {/* Informations temps réel */}
          <RealTimeInfo 
            selectedBus={selectedBus}
            selectedStation={selectedStation}
            onClearSelection={clearSelection}
          />

          {/* Alertes et incidents */}
          <AlertsPanel 
            incidents={incidents}
            onResolveIncident={handleIncidentResolve}
          />
        </div>
      </div>

      {/* Métriques de performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceMetrics 
          buses={buses}
          performanceMetrics={performanceMetrics}
        />
        
        {/* Graphiques supplémentaires */}
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Icon name="TrendingUp" className="mr-2" size={20} />
            Tendances
          </h3>
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">Affluence moyenne</span>
                <span className="text-lg font-bold text-blue-700">
                  {Math.round(buses.reduce((sum, bus) => sum + (bus.passagers / bus.capacite), 0) / buses.length * 100)}%
                </span>
              </div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-900">Ponctualité</span>
                <span className="text-lg font-bold text-green-700">{performanceMetrics.punctualite}%</span>
              </div>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-900">Vitesse moyenne</span>
                <span className="text-lg font-bold text-orange-700">{performanceMetrics.vitesseMoyenne} km/h</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Informations sur l'état du système */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Icon name="Activity" className="text-blue-600" size={24} />
            <div>
              <h3 className="font-semibold">État du Système</h3>
              <p className="text-sm text-gray-600">
                Dernière mise à jour: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{performanceMetrics.busActifs}</div>
              <div className="text-xs text-gray-500">Bus Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{performanceMetrics.busEnPause}</div>
              <div className="text-xs text-gray-500">En Pause</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{performanceMetrics.busHorsService}</div>
              <div className="text-xs text-gray-500">Hors Service</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
