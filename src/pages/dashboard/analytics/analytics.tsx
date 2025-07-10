import React, { useState } from 'react';
import { Card, Button, Text, Badge } from '@components';
import { ChartsModalAdvanced } from './components';
import { useAnalyticsData } from './hooks';
import { calculatePerformanceMetrics, formatCurrency, formatNumber } from './utils';

const Analytics: React.FC = () => {
  const [showChartsModal, setShowChartsModal] = useState(false);
  
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
            appearance="solid"
            onClick={() => setShowChartsModal(true)}
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

      {/* Modal des graphiques avancés */}
      <ChartsModalAdvanced
        isOpen={showChartsModal}
        onClose={() => setShowChartsModal(false)}
        data={data}
      />
    </div>
  );
};

export default Analytics;
