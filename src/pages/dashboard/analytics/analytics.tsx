import React, { useState } from 'react';
import { Card, Button, Text, Badge } from '@components';
import { ChartsModal, ChartsModalAdvanced, MiniChart } from './components';
import { useAnalyticsData } from './hooks';
import { calculatePerformanceMetrics, formatCurrency, formatNumber } from './utils';

const Analytics: React.FC = () => {
  const [showChartsModal, setShowChartsModal] = useState(false);
  const [showAdvancedModal, setShowAdvancedModal] = useState(false);
  
  const { data, isLoading, error, refreshData, lastUpdate } = useAnalyticsData({
    refreshInterval: 300000, // 5 minutes
    enabled: true
  });

  const performanceMetrics = calculatePerformanceMetrics(data);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-8 text-center">
          <Text variant="h3" className="text-red-600 mb-4">
            Erreur de chargement
          </Text>
          <Text className="text-gray-600 mb-4">{error}</Text>
          <Button onClick={refreshData}>Réessayer</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <Text variant="h2" className="text-gray-900">
            Analytics Dashboard
          </Text>
          <Text className="text-gray-600 mt-1">
            Analyse des performances et statistiques détaillées
          </Text>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="soft" color="blue">
            Dernière MAJ: {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button
            appearance="outline"
            onClick={refreshData}
          >
            Actualiser
          </Button>
          <Button
            appearance="outline"
            onClick={() => setShowChartsModal(true)}
          >
            Graphiques Simples
          </Button>
          <Button
            appearance="solid"
            onClick={() => setShowAdvancedModal(true)}
          >
            Graphiques Avancés
          </Button>
        </div>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">
                Revenus Totaux
              </Text>
              <Text variant="h3" className="text-2xl font-bold text-gray-900">
                {formatCurrency(data.totalRevenue)}
              </Text>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              💰
            </div>
          </div>
          <div className="mt-4">
            <Badge 
              variant="soft" 
              color={performanceMetrics.revenueGrowth >= 0 ? "green" : "red"}
              className="text-xs"
            >
              {performanceMetrics.revenueGrowth >= 0 ? '+' : ''}{performanceMetrics.revenueGrowth}% vs période précédente
            </Badge>
          </div>
          <div className="mt-4 h-16">
            <MiniChart data={data} type="revenue" height={60} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">
                Trajets Totaux
              </Text>
              <Text variant="h3" className="text-2xl font-bold text-gray-900">
                {formatNumber(data.totalTrips)}
              </Text>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              🚌
            </div>
          </div>
          <div className="mt-4">
            <Badge 
              variant="soft" 
              color={performanceMetrics.tripsGrowth >= 0 ? "green" : "red"}
              className="text-xs"
            >
              {performanceMetrics.tripsGrowth >= 0 ? '+' : ''}{performanceMetrics.tripsGrowth}% vs période précédente
            </Badge>
          </div>
          <div className="mt-4 h-16">
            <MiniChart data={data} type="trips" height={60} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">
                Utilisateurs
              </Text>
              <Text variant="h3" className="text-2xl font-bold text-gray-900">
                {formatNumber(data.totalUsers)}
              </Text>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              👥
            </div>
          </div>
          <div className="mt-4">
            <Text className="text-xs text-gray-500">
              {Math.round(performanceMetrics.avgPassengersPerTrip)} passagers/trajet
            </Text>
          </div>
          <div className="mt-4 h-16">
            <MiniChart data={data} type="users" height={60} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">
                Abonnements
              </Text>
              <Text variant="h3" className="text-2xl font-bold text-gray-900">
                {formatNumber(data.totalSubscriptions)}
              </Text>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              💳
            </div>
          </div>
          <div className="mt-4">
            <Text className="text-xs text-gray-500">
              Utilisation: {performanceMetrics.avgUtilization}%
            </Text>
          </div>
        </Card>
      </div>

      {/* Section d'analyse des lignes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <Text variant="h4" className="text-gray-900 mb-4">
            Performance par Ligne
          </Text>
          <div className="space-y-4">
            {data.tripsByLine.slice(0, 5).map((line, index) => (
              <div key={line.lineId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  <div>
                    <Text className="font-medium text-gray-900">{line.lineName}</Text>
                    <Text className="text-sm text-gray-600">{formatNumber(line.trips)} voyages</Text>
                  </div>
                </div>
                <div className="text-right">
                  <Text className="font-semibold text-gray-900">{formatCurrency(line.revenue)}</Text>
                  <Text className="text-sm text-gray-600">{line.passengers} passagers</Text>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <Text variant="h4" className="text-gray-900 mb-4">
            Répartition Démographique
          </Text>
          <div className="space-y-4">
            {data.usersByAge.map((ageGroup, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-blue-500" style={{ opacity: 1 - (index * 0.2) }}></div>
                  <Text className="text-gray-700">{ageGroup.ageRange}</Text>
                </div>
                <div className="flex items-center space-x-4">
                  <Text className="font-medium">{formatNumber(ageGroup.count)}</Text>
                  <Badge variant="soft" color="blue" className="text-xs">
                    {ageGroup.percentage}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Section d'utilisation des bus */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Text variant="h4" className="text-gray-900">
            Utilisation de la Flotte
          </Text>
          <Badge variant="soft" color="blue">
            {data.busUtilization.length} bus actifs
          </Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.busUtilization.slice(0, 8).map((bus) => (
            <div key={bus.busId} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Text className="font-medium text-gray-900">Bus {bus.busNumber}</Text>
                <div className={`w-3 h-3 rounded-full ${
                  bus.maintenanceStatus === 'good' ? 'bg-green-500' :
                  bus.maintenanceStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Text className="text-sm text-gray-600">Utilisation</Text>
                  <Text className="text-sm font-medium">{bus.utilization}%</Text>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      bus.utilization >= 90 ? 'bg-red-500' :
                      bus.utilization >= 75 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${bus.utilization}%` }}
                  ></div>
                </div>
                <Text className="text-xs text-gray-500">{bus.totalTrips} voyages</Text>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modals */}
      <ChartsModal
        isOpen={showChartsModal}
        onClose={() => setShowChartsModal(false)}
        data={data}
      />

      <ChartsModalAdvanced
        isOpen={showAdvancedModal}
        onClose={() => setShowAdvancedModal(false)}
        data={data}
      />
    </div>
  );
};

export default Analytics;
