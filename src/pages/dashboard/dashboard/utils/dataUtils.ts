import { BusPosition, Station } from '../types';

/**
 * Calcule la distance entre deux points géographiques
 */
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
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

/**
 * Filtre les bus selon les critères sélectionnés
 */
export const filterBuses = (
  buses: BusPosition[],
  filters: {
    busStatut?: string[];
    lignesSelectionnees?: string[];
  }
): BusPosition[] => {
  return buses.filter(bus => {
    // Filtre par statut
    if (filters.busStatut && filters.busStatut.length > 0) {
      if (!filters.busStatut.includes(bus.statut)) {
        return false;
      }
    }

    // Filtre par lignes
    if (filters.lignesSelectionnees && filters.lignesSelectionnees.length > 0) {
      if (!filters.lignesSelectionnees.includes(bus.ligne)) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Calcule les métriques de performance
 */
export const calculatePerformanceMetrics = (buses: BusPosition[]) => {
  const total = buses.length;
  const enService = buses.filter(bus => bus.statut === 'en_service').length;
  const enPause = buses.filter(bus => bus.statut === 'en_pause').length;
  const horsService = buses.filter(bus => bus.statut === 'hors_service').length;

  const punctualite = Math.round((enService / total) * 100) || 0;
  const vitesseMoyenne = Math.round(
    buses.reduce((sum, bus) => sum + bus.vitesse, 0) / total
  ) || 0;

  return {
    busActifs: enService,
    busEnPause: enPause,
    busHorsService: horsService,
    punctualite,
    vitesseMoyenne,
    total
  };
};

/**
 * Trouve la station la plus proche d'une position
 */
export const findNearestStation = (
  position: { lat: number; lng: number },
  stations: Station[]
): Station | null => {
  if (stations.length === 0) return null;

  let nearest = stations[0];
  let minDistance = calculateDistance(
    position.lat, 
    position.lng, 
    nearest.latitude, 
    nearest.longitude
  );

  stations.forEach(station => {
    const distance = calculateDistance(
      position.lat, 
      position.lng, 
      station.latitude, 
      station.longitude
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      nearest = station;
    }
  });

  return nearest;
};

/**
 * Formate la durée en minutes et secondes
 */
export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
};

/**
 * Formate la vitesse avec l'unité
 */
export const formatSpeed = (speed: number): string => {
  return `${speed} km/h`;
};

/**
 * Génère une couleur pour une ligne de transport
 */
export const getLigneColor = (ligneId: string): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
  ];
  
  const index = ligneId.charCodeAt(0) % colors.length;
  return colors[index];
};

/**
 * Calcule le temps estimé d'arrivée
 */
export const calculateETA = (
  busPosition: { lat: number; lng: number },
  stationPosition: { lat: number; lng: number },
  currentSpeed: number
): number => {
  const distance = calculateDistance(
    busPosition.lat,
    busPosition.lng,
    stationPosition.lat,
    stationPosition.lng
  );
  
  // Vitesse minimale de 10 km/h pour éviter les divisions par zéro
  const speed = Math.max(currentSpeed, 10);
  
  // Temps en minutes
  return Math.round((distance / speed) * 60);
};
