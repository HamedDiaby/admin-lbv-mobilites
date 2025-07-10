export interface AnalyticsData {
  // Métriques générales
  totalRevenue: number;
  totalTrips: number;
  totalUsers: number;
  totalSubscriptions: number;
  
  // Evolution temporelle
  revenueEvolution: RevenueData[];
  tripsEvolution: TripData[];
  userGrowth: UserGrowthData[];
  
  // Répartitions
  revenueBySubscriptionType: SubscriptionTypeRevenue[];
  tripsByLine: LineTripsData[];
  usersByAge: UserAgeData[];
  
  // Performance
  busUtilization: BusUtilizationData[];
  peakHours: PeakHourData[];
  popularRoutes: PopularRouteData[];
}

export interface RevenueData {
  date: string;
  revenue: number;
  subscriptions: number;
  tickets: number;
}

export interface TripData {
  date: string;
  trips: number;
  passengers: number;
}

export interface UserGrowthData {
  date: string;
  newUsers: number;
  totalUsers: number;
}

export interface SubscriptionTypeRevenue {
  type: 'journalier' | 'hebdomadaire' | 'mensuel' | 'annuel';
  revenue: number;
  count: number;
  percentage: number;
}

export interface LineTripsData {
  lineId: string;
  lineName: string;
  trips: number;
  passengers: number;
  revenue: number;
}

export interface UserAgeData {
  ageRange: string;
  count: number;
  percentage: number;
}

export interface BusUtilizationData {
  busId: string;
  busNumber: string;
  utilization: number; // percentage
  totalTrips: number;
  maintenanceStatus: 'good' | 'warning' | 'critical';
}

export interface PeakHourData {
  hour: number;
  passengers: number;
  trips: number;
}

export interface PopularRouteData {
  routeId: string;
  routeName: string;
  frequency: number;
  revenue: number;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface AnalyticsFilters {
  dateRange: DateRange;
  lineIds?: string[];
  subscriptionTypes?: string[];
  busIds?: string[];
}
