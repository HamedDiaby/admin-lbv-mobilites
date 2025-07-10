import { Bus, BusAlert, OBD2Data } from '../types';

// Formatage des données
export const formatKilometrage = (km: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(km) + ' km';
};

export const formatConsommation = (liters: number): string => {
  return `${liters.toFixed(1)} L/100km`;
};

export const formatPression = (bar: number): string => {
  return `${bar.toFixed(1)} bar`;
};

export const formatTemperature = (celsius: number): string => {
  return `${celsius}°C`;
};

export const formatRPM = (rpm: number): string => {
  return new Intl.NumberFormat('fr-FR').format(rpm) + ' RPM';
};

// Calculs de performance
export const calculateBusPerformance = (buses: Bus[]) => {
  const totalBuses = buses.length;
  const activeBuses = buses.filter(bus => bus.statut === 'actif').length;
  const maintenanceBuses = buses.filter(bus => bus.statut === 'maintenance').length;
  const averageHealth = buses.reduce((sum, bus) => sum + bus.obd2Data.scoreEtat, 0) / totalBuses;
  
  return {
    totalBuses,
    activeBuses,
    maintenanceBuses,
    utilizationRate: (activeBuses / totalBuses) * 100,
    averageHealth: Math.round(averageHealth),
    criticalAlerts: buses.reduce((sum, bus) => 
      sum + bus.obd2Data.alertes.filter(alert => alert.type === 'critique' && !alert.resolved).length, 0
    )
  };
};

// Gestion des alertes
export const categorizeAlerts = (alerts: BusAlert[]) => {
  return {
    critiques: alerts.filter(alert => alert.type === 'critique' && !alert.resolved),
    avertissements: alerts.filter(alert => alert.type === 'avertissement' && !alert.resolved),
    infos: alerts.filter(alert => alert.type === 'info' && !alert.resolved),
    resolved: alerts.filter(alert => alert.resolved)
  };
};

export const getAlertPriority = (alert: BusAlert): number => {
  switch (alert.type) {
    case 'critique': return 3;
    case 'avertissement': return 2;
    case 'info': return 1;
    default: return 0;
  }
};

// Calculs de consommation et émissions
export const calculateFuelEfficiency = (obd2Data: OBD2Data) => {
  const { consommationMoyenne, emissionsCO2 } = obd2Data;
  
  return {
    efficiency: consommationMoyenne,
    co2PerKm: emissionsCO2,
    estimatedMonthlyCost: (consommationMoyenne * 2000 * 1.5) / 100, // Estimation mensuelle
    environmentalScore: Math.max(0, 100 - (emissionsCO2 - 120) * 2) // Score environnemental
  };
};

// Validation des données OBD2
export const validateOBD2Data = (data: OBD2Data): { isValid: boolean; issues: string[] } => {
  const issues: string[] = [];
  
  if (data.temperatureMoteur > 100) {
    issues.push('Température moteur critique');
  }
  
  if (data.pressionHuile < 1.5) {
    issues.push('Pression d\'huile faible');
  }
  
  if (data.niveauCarburant < 10) {
    issues.push('Niveau de carburant bas');
  }
  
  Object.entries(data.pressionPneus).forEach(([position, pression]) => {
    if (pression < 1.8 || pression > 2.8) {
      issues.push(`Pression pneu ${position} anormale`);
    }
  });
  
  if (data.scoreEtat < 30) {
    issues.push('État général critique');
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
};

// Tri et filtrage
export const sortBuses = (buses: Bus[], key: keyof Bus | 'scoreEtat', direction: 'asc' | 'desc' = 'asc'): Bus[] => {
  return [...buses].sort((a, b) => {
    let aValue: any = key === 'scoreEtat' ? a.obd2Data.scoreEtat : a[key as keyof Bus];
    let bValue: any = key === 'scoreEtat' ? b.obd2Data.scoreEtat : b[key as keyof Bus];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });
};

// Recherche de bus
export const searchBuses = (buses: Bus[], searchTerm: string): Bus[] => {
  if (!searchTerm.trim()) return buses;
  
  const term = searchTerm.toLowerCase();
  
  return buses.filter(bus =>
    bus.numero.toLowerCase().includes(term) ||
    bus.marque.toLowerCase().includes(term) ||
    bus.modele.toLowerCase().includes(term) ||
    bus.plaqueImmatriculation.toLowerCase().includes(term) ||
    bus.stationName?.toLowerCase().includes(term)
  );
};

// Calcul de la distance entre deux points (Haversine)
export const calculateDistance = (
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Génération de rapports
export const generateBusReport = (bus: Bus) => {
  const performance = calculateFuelEfficiency(bus.obd2Data);
  const validation = validateOBD2Data(bus.obd2Data);
  const alerts = categorizeAlerts(bus.obd2Data.alertes);
  
  return {
    bus,
    performance,
    validation,
    alerts,
    lastUpdate: bus.obd2Data.lastUpdate,
    recommendations: generateRecommendations(bus)
  };
};

const generateRecommendations = (bus: Bus): string[] => {
  const recommendations: string[] = [];
  const { obd2Data } = bus;
  
  if (obd2Data.scoreEtat < 70) {
    recommendations.push('Maintenance préventive recommandée');
  }
  
  if (obd2Data.consommationMoyenne > 12) {
    recommendations.push('Optimisation de la conduite recommandée');
  }
  
  if (obd2Data.prochaineMaintenance < 1000) {
    recommendations.push('Programmer la maintenance sous 1000 km');
  }
  
  if (obd2Data.alertes.some(alert => alert.type === 'critique' && !alert.resolved)) {
    recommendations.push('Résoudre les alertes critiques en priorité');
  }
  
  return recommendations;
};
