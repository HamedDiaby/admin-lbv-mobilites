import { useState, useEffect } from 'react';
import { AnalyticsData } from '../types';

interface UseAnalyticsDataProps {
  refreshInterval?: number;
  enabled?: boolean;
}

interface UseAnalyticsDataReturn {
  data: AnalyticsData;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  lastUpdate: Date;
}

// Fonction pour générer des données mockées
const generateMockData = (): AnalyticsData => {
  const today = new Date();
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  const revenueEvolution = last30Days.map((date) => ({
    date,
    revenue: 50000 + Math.sin(Math.random() * 10) * 10000 + Math.random() * 5000,
    subscriptions: 1000 + Math.random() * 200,
    tickets: 800 + Math.random() * 150
  }));

  const tripsEvolution = last30Days.map((date) => ({
    date,
    trips: 2000 + Math.floor(Math.random() * 500),
    passengers: 1800 + Math.floor(Math.random() * 400)
  }));

  const userGrowth = last30Days.map((date) => ({
    date,
    newUsers: 50 + Math.floor(Math.random() * 30),
    totalUsers: 15000 + Math.floor(Math.random() * 1000)
  }));

  return {
    totalRevenue: revenueEvolution.reduce((sum, rev) => sum + rev.revenue, 0),
    totalTrips: tripsEvolution.reduce((sum, trips) => sum + trips.trips, 0),
    totalUsers: 15000 + Math.floor(Math.random() * 1000),
    totalSubscriptions: 3500 + Math.floor(Math.random() * 500),
    revenueEvolution,
    tripsEvolution,
    userGrowth,
    revenueBySubscriptionType: [
      { type: 'mensuel', revenue: 45000, count: 1200, percentage: 45 },
      { type: 'hebdomadaire', revenue: 25000, count: 800, percentage: 25 },
      { type: 'journalier', revenue: 20000, count: 1500, percentage: 20 },
      { type: 'annuel', revenue: 10000, count: 100, percentage: 10 }
    ],
    tripsByLine: [
      { lineId: 'line1', lineName: 'Ligne 1', trips: 450, passengers: 380, revenue: 15000 },
      { lineId: 'line2', lineName: 'Ligne 2', trips: 320, passengers: 290, revenue: 12000 },
      { lineId: 'line3', lineName: 'Ligne 3', trips: 280, passengers: 250, revenue: 9000 },
      { lineId: 'line4', lineName: 'Ligne 4', trips: 200, passengers: 180, revenue: 7000 }
    ],
    usersByAge: [
      { ageRange: '18-25', count: 3500, percentage: 22 },
      { ageRange: '26-35', count: 4200, percentage: 26 },
      { ageRange: '36-45', count: 3800, percentage: 24 },
      { ageRange: '46-55', count: 2800, percentage: 18 },
      { ageRange: '56+', count: 1700, percentage: 10 }
    ],
    busUtilization: [
      { busId: 'bus1', busNumber: 'Bus 001', utilization: 85, totalTrips: 45, maintenanceStatus: 'good' },
      { busId: 'bus2', busNumber: 'Bus 002', utilization: 92, totalTrips: 52, maintenanceStatus: 'good' },
      { busId: 'bus3', busNumber: 'Bus 003', utilization: 78, totalTrips: 38, maintenanceStatus: 'warning' }
    ],
    peakHours: [
      { hour: 8, passengers: 450, trips: 25 },
      { hour: 12, passengers: 320, trips: 18 },
      { hour: 18, passengers: 520, trips: 28 }
    ],
    popularRoutes: [
      { routeId: 'route1', routeName: 'Centre-ville - Aéroport', frequency: 85, revenue: 25000 },
      { routeId: 'route2', routeName: 'Université - Gare', frequency: 92, revenue: 22000 }
    ]
  };
};

export const useAnalyticsData = ({
  refreshInterval = 300000, // 5 minutes
  enabled = true
}: UseAnalyticsDataProps = {}): UseAnalyticsDataReturn => {
  const [data, setData] = useState<AnalyticsData>(generateMockData());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const refreshData = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulation d'un appel API
    setTimeout(() => {
      try {
        setData(generateMockData());
        setLastUpdate(new Date());
        setIsLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        setIsLoading(false);
      }
    }, 1000);
  };

  // Auto-refresh des données
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      refreshData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [enabled, refreshInterval]);

  return {
    data,
    isLoading,
    error,
    refreshData,
    lastUpdate
  };
};
