import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/card';
import { Button } from '../../../components/button';
import { Text } from '../../../components/text';
import { Badge } from '../../../components/badge';
import { AnalyticsData } from './types';
import ChartsModal from './ChartsModal';

// Données de simulation
const generateMockData = (): AnalyticsData => {
  const today = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  return {
    totalRevenue: 2847500,
    totalTrips: 15420,
    totalUsers: 3280,
    totalSubscriptions: 1240,
    
    revenueEvolution: last30Days.map((date, i) => ({
      date,
      revenue: 80000 + Math.random() * 40000,
      subscriptions: 30000 + Math.random() * 15000,
      tickets: 50000 + Math.random() * 25000
    })),
    
    tripsEvolution: last30Days.map((date, i) => ({
      date,
      trips: 450 + Math.random() * 200,
      passengers: 1200 + Math.random() * 600
    })),
    
    userGrowth: last30Days.map((date, i) => ({
      date,
      newUsers: 15 + Math.random() * 25,
      totalUsers: 3000 + i * 10 + Math.random() * 50
    })),
    
    revenueBySubscriptionType: [
      { type: 'mensuel', revenue: 1250000, count: 620, percentage: 43.9 },
      { type: 'hebdomadaire', revenue: 850000, count: 340, percentage: 29.9 },
      { type: 'annuel', revenue: 520000, count: 180, percentage: 18.3 },
      { type: 'journalier', revenue: 227500, count: 100, percentage: 8.0 }
    ],
    
    tripsByLine: [
      { lineId: '1', lineName: 'Ligne Nord-Sud', trips: 4200, passengers: 12800, revenue: 720000 },
      { lineId: '2', lineName: 'Ligne Est-Ouest', trips: 3800, passengers: 11200, revenue: 650000 },
      { lineId: '3', lineName: 'Ligne Circulaire', trips: 3200, passengers: 9800, revenue: 580000 },
      { lineId: '4', lineName: 'Ligne Express', trips: 2500, passengers: 8200, revenue: 420000 },
      { lineId: '5', lineName: 'Ligne Périphérique', trips: 1720, passengers: 5400, revenue: 320000 }
    ],
    
    usersByAge: [
      { ageRange: '18-25', count: 980, percentage: 29.9 },
      { ageRange: '26-35', count: 850, percentage: 25.9 },
      { ageRange: '36-50', count: 720, percentage: 22.0 },
      { ageRange: '51-65', count: 520, percentage: 15.9 },
      { ageRange: '65+', count: 210, percentage: 6.4 }
    ],
    
    busUtilization: [
      { busId: '1', busNumber: 'LBV-001', utilization: 92, totalTrips: 280, maintenanceStatus: 'good' },
      { busId: '2', busNumber: 'LBV-002', utilization: 88, totalTrips: 265, maintenanceStatus: 'good' },
      { busId: '3', busNumber: 'LBV-003', utilization: 85, totalTrips: 255, maintenanceStatus: 'warning' },
      { busId: '4', busNumber: 'LBV-004', utilization: 78, totalTrips: 235, maintenanceStatus: 'good' },
      { busId: '5', busNumber: 'LBV-005', utilization: 65, totalTrips: 195, maintenanceStatus: 'critical' }
    ],
    
    peakHours: [
      { hour: 6, passengers: 180, trips: 12 },
      { hour: 7, passengers: 450, trips: 25 },
      { hour: 8, passengers: 680, trips: 35 },
      { hour: 9, passengers: 320, trips: 18 },
      { hour: 12, passengers: 420, trips: 22 },
      { hour: 17, passengers: 580, trips: 28 },
      { hour: 18, passengers: 720, trips: 38 },
      { hour: 19, passengers: 480, trips: 26 }
    ],
    
    popularRoutes: [
      { routeId: '1', routeName: 'Centre-ville → Aéroport', frequency: 850, revenue: 380000 },
      { routeId: '2', routeName: 'Université → Marché Central', frequency: 720, revenue: 320000 },
      { routeId: '3', routeName: 'Gare → Hôpital', frequency: 680, revenue: 290000 },
      { routeId: '4', routeName: 'Port → Zone Industrielle', frequency: 520, revenue: 240000 }
    ]
  };
};

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [showChartsModal, setShowChartsModal] = useState(false);

  useEffect(() => {
    // Simulation du chargement des données
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(generateMockData());
      setLoading(false);
    };

    loadData();
  }, [selectedPeriod]);

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

  const getMaintenanceStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'success';
      case 'warning': return 'warning';
      case 'critical': return 'danger';
      default: return 'primary';
    }
  };

  const getMaintenanceStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'Bon état';
      case 'warning': return 'Attention';
      case 'critical': return 'Critique';
      default: return 'Inconnu';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6">
        <Text variant="p2" className="text-center text-gray-500">
          Impossible de charger les données analytics.
        </Text>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Text variant="h1" className="text-gray-900 font-bold">
            Analytics
          </Text>
          <Text variant="p2" className="text-gray-500 mt-1">
            Tableau de bord des performances et métriques
          </Text>
        </div>
        
        <div className="flex gap-4">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm bg-white"
          >
            <option value="7">7 derniers jours</option>
            <option value="30">30 derniers jours</option>
            <option value="90">3 derniers mois</option>
            <option value="365">12 derniers mois</option>
          </select>
          
          <Button label="Exporter" appearance="solid" variation="primary" size="sm" iconName="Download" />
          
          <Button 
            label="Voir les graphiques" 
            appearance="outline" 
            variation="primary" 
            size="sm" 
            iconName="BarChart2"
            onClick={() => setShowChartsModal(true)}
          />
        </div>
      </div>

      {/* KPIs Principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" className="text-gray-500 font-medium">
                Revenus Total
              </Text>
              <Text variant="h2" className="text-gray-900 font-bold mt-1">
                {formatCurrency(data.totalRevenue)}
              </Text>
              <div className="flex items-center mt-2">
                <span className="text-green-500 text-sm">↗</span>
                <Text variant="p4" className="text-green-500 font-medium ml-1">
                  +12.5%
                </Text>
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <span className="text-blue-600 text-2xl">💰</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" className="text-gray-500 font-medium">
                Voyages
              </Text>
              <Text variant="h2" className="text-gray-900 font-bold mt-1">
                {formatNumber(data.totalTrips)}
              </Text>
              <div className="flex items-center mt-2">
                <span className="text-green-500 text-sm">↗</span>
                <Text variant="p4" className="text-green-500 font-medium ml-1">
                  +8.3%
                </Text>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <span className="text-green-600 text-2xl">🚌</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" className="text-gray-500 font-medium">
                Utilisateurs
              </Text>
              <Text variant="h2" className="text-gray-900 font-bold mt-1">
                {formatNumber(data.totalUsers)}
              </Text>
              <div className="flex items-center mt-2">
                <span className="text-green-500 text-sm">↗</span>
                <Text variant="p4" className="text-green-500 font-medium ml-1">
                  +15.2%
                </Text>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <span className="text-purple-600 text-2xl">👥</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" className="text-gray-500 font-medium">
                Abonnements
              </Text>
              <Text variant="h2" className="text-gray-900 font-bold mt-1">
                {formatNumber(data.totalSubscriptions)}
              </Text>
              <div className="flex items-center mt-2">
                <span className="text-green-500 text-sm">↗</span>
                <Text variant="p4" className="text-green-500 font-medium ml-1">
                  +5.7%
                </Text>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <span className="text-orange-600 text-2xl">💳</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenus par Type d'Abonnement */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Text variant="h3" className="text-gray-900 font-semibold">
            Revenus par Type d'Abonnement
          </Text>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.revenueBySubscriptionType.map((item, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Text variant="p2" className="text-gray-700 font-medium capitalize">
                  {item.type}
                </Text>
                <Badge variant="outline" color="primary">
                  {item.percentage}%
                </Badge>
              </div>
              <Text variant="h3" className="text-gray-900 font-bold">
                {formatCurrency(item.revenue)}
              </Text>
              <Text variant="p4" className="text-gray-500 mt-1">
                {formatNumber(item.count)} abonnements
              </Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Performance des Lignes */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Text variant="h3" className="text-gray-900 font-semibold">
            Performance des Lignes
          </Text>
        </div>
        
        <div className="space-y-4">
          {data.tripsByLine.map((line, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <Text variant="p2" className="text-gray-900 font-medium">
                  {line.lineName}
                </Text>
                <Text variant="p2" className="text-gray-600 font-semibold">
                  {formatCurrency(line.revenue)}
                </Text>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text variant="p4" className="text-gray-500">
                    Voyages
                  </Text>
                  <Text variant="p2" className="text-gray-900 font-medium">
                    {formatNumber(line.trips)}
                  </Text>
                </div>
                <div>
                  <Text variant="p4" className="text-gray-500">
                    Passagers
                  </Text>
                  <Text variant="p2" className="text-gray-900 font-medium">
                    {formatNumber(line.passengers)}
                  </Text>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Utilisation des Bus */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Text variant="h3" className="text-gray-900 font-semibold">
            Utilisation des Bus
          </Text>
        </div>
        
        <div className="space-y-4">
          {data.busUtilization.map((bus, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <Text variant="p2" className="text-gray-900 font-medium">
                    {bus.busNumber}
                  </Text>
                  <Badge 
                    variant="outline" 
                    color={getMaintenanceStatusColor(bus.maintenanceStatus)}
                  >
                    {getMaintenanceStatusText(bus.maintenanceStatus)}
                  </Badge>
                </div>
                <Text variant="p2" className="text-gray-600 font-semibold">
                  {bus.utilization}%
                </Text>
              </div>
              
              <div className="mb-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      bus.utilization >= 90 ? 'bg-red-500' :
                      bus.utilization >= 75 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${bus.utilization}%` }}
                  ></div>
                </div>
              </div>
              
              <Text variant="p4" className="text-gray-500">
                {formatNumber(bus.totalTrips)} voyages totaux
              </Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Heures de Pointe */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Text variant="h3" className="text-gray-900 font-semibold">
            Analyse des Heures de Pointe
          </Text>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.peakHours.map((hour, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
              <Text variant="p2" className="text-gray-700 font-medium">
                {hour.hour}h00
              </Text>
              <Text variant="h3" className="text-gray-900 font-bold mt-1">
                {formatNumber(hour.passengers)}
              </Text>
              <Text variant="p4" className="text-gray-500">
                passagers
              </Text>
              <Text variant="p4" className="text-gray-500 block mt-1">
                {hour.trips} voyages
              </Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Routes Populaires */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Text variant="h3" className="text-gray-900 font-semibold">
            Routes les Plus Populaires
          </Text>
        </div>
        
        <div className="space-y-4">
          {data.popularRoutes.map((route, index) => (
            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <Text variant="p2" className="text-gray-900 font-medium">
                  {route.routeName}
                </Text>
                <Text variant="p4" className="text-gray-500 mt-1">
                  {formatNumber(route.frequency)} voyages
                </Text>
              </div>
              <Text variant="p2" className="text-gray-600 font-semibold">
                {formatCurrency(route.revenue)}
              </Text>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Modal de graphiques */}
      {data && (
        <ChartsModal 
          isOpen={showChartsModal} 
          onClose={() => setShowChartsModal(false)} 
          data={data} 
        />
      )}
    </div>
  );
};

export default Analytics;
