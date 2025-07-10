import { AnalyticsData, RevenueData, TripData } from '../types';

/**
 * Calcule la croissance en pourcentage entre deux valeurs
 */
export const calculateGrowthRate = (current: number, previous: number): number => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
};

/**
 * Formate un montant en euros
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Formate un nombre avec des espaces comme séparateurs de milliers
 */
export const formatNumber = (number: number): string => {
  return new Intl.NumberFormat('fr-FR').format(number);
};

/**
 * Calcule la moyenne d'un tableau de nombres
 */
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
};

/**
 * Calcule le taux de croissance des revenus sur une période
 */
export const calculateRevenueGrowth = (revenueData: RevenueData[]): number => {
  if (revenueData.length < 2) return 0;
  
  const firstWeek = revenueData.slice(0, 7);
  const lastWeek = revenueData.slice(-7);
  
  const firstWeekTotal = firstWeek.reduce((sum, day) => sum + day.revenue, 0);
  const lastWeekTotal = lastWeek.reduce((sum, day) => sum + day.revenue, 0);
  
  return calculateGrowthRate(lastWeekTotal, firstWeekTotal);
};

/**
 * Calcule le taux de croissance des trajets
 */
export const calculateTripsGrowth = (tripsData: TripData[]): number => {
  if (tripsData.length < 2) return 0;
  
  const firstWeek = tripsData.slice(0, 7);
  const lastWeek = tripsData.slice(-7);
  
  const firstWeekTotal = firstWeek.reduce((sum, day) => sum + day.trips, 0);
  const lastWeekTotal = lastWeek.reduce((sum, day) => sum + day.trips, 0);
  
  return calculateGrowthRate(lastWeekTotal, firstWeekTotal);
};

/**
 * Trouve les heures de pointe dans les données
 */
export const findPeakHours = (data: AnalyticsData): Array<{ hour: number; passengers: number }> => {
  return data.peakHours
    .sort((a, b) => b.passengers - a.passengers)
    .slice(0, 3);
};

/**
 * Calcule les métriques de performance
 */
export const calculatePerformanceMetrics = (data: AnalyticsData) => {
  const revenueGrowth = calculateRevenueGrowth(data.revenueEvolution);
  const tripsGrowth = calculateTripsGrowth(data.tripsEvolution);
  
  const avgUtilization = calculateAverage(
    data.busUtilization.map(bus => bus.utilization)
  );
  
  const totalPassengers = data.tripsEvolution.reduce((sum, day) => sum + day.passengers, 0);
  const avgPassengersPerTrip = totalPassengers / data.totalTrips;
  
  return {
    revenueGrowth,
    tripsGrowth,
    avgUtilization: Math.round(avgUtilization),
    avgPassengersPerTrip: Math.round(avgPassengersPerTrip),
    totalPassengers
  };
};

/**
 * Génère les couleurs pour les graphiques
 */
export const generateChartColors = (count: number): string[] => {
  const colors = [
    '#3B82F6', // blue
    '#EF4444', // red
    '#10B981', // green
    '#F59E0B', // amber
    '#8B5CF6', // violet
    '#EC4899', // pink
    '#6B7280', // gray
    '#14B8A6', // teal
  ];
  
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

/**
 * Filtre les données par période
 */
export const filterDataByPeriod = <T extends { date: string }>(
  data: T[],
  period: 'week' | 'month' | 'quarter'
): T[] => {
  const now = new Date();
  let daysToSubtract = 30; // month by default
  
  switch (period) {
    case 'week':
      daysToSubtract = 7;
      break;
    case 'quarter':
      daysToSubtract = 90;
      break;
  }
  
  const cutoffDate = new Date();
  cutoffDate.setDate(now.getDate() - daysToSubtract);
  
  return data.filter(item => new Date(item.date) >= cutoffDate);
};
