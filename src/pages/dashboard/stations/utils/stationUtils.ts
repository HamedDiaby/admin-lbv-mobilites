import { Station, City } from '../types';

/**
 * Calcule la distance entre deux points géographiques (en km)
 * Utilise la formule Haversine
 */
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Valide les coordonnées géographiques pour le Gabon
 */
export const validateGabonCoordinates = (lat: number, lon: number): boolean => {
  // Gabon bounds approximatifs
  const GABON_BOUNDS = {
    north: 2.32,
    south: -4.06,
    east: 14.52,
    west: 8.7
  };
  
  return (
    lat >= GABON_BOUNDS.south &&
    lat <= GABON_BOUNDS.north &&
    lon >= GABON_BOUNDS.west &&
    lon <= GABON_BOUNDS.east
  );
};

/**
 * Formate l'adresse d'une station
 */
export const formatStationAddress = (station: Station): string => {
  const parts = [station.address];
  if (station.cityName) parts.push(station.cityName);
  return parts.join(', ');
};

/**
 * Génère un code unique pour une station
 */
export const generateStationCode = (cityName: string, stationType: 'terminal' | 'arret' | 'depot'): string => {
  const cityPrefix = cityName.substring(0, 3).toUpperCase();
  const typePrefix = stationType === 'terminal' ? 'TER' : 
                    stationType === 'arret' ? 'ARR' : 'DEP';
  const randomSuffix = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `${cityPrefix}-${typePrefix}-${randomSuffix}`;
};

/**
 * Vérifie si une station est opérationnelle
 */
export const isStationOperational = (station: Station): boolean => {
  return station.status === 'active';
};

/**
 * Calcule les statistiques des stations
 */
export const calculateStationStats = (stations: Station[]) => {
  const total = stations.length;
  const active = stations.filter(s => s.status === 'active').length;
  const inactive = stations.filter(s => s.status === 'inactive').length;
  const maintenance = stations.filter(s => s.status === 'maintenance').length;
  const terminals = stations.filter(s => s.type === 'terminal').length;
  const arrets = stations.filter(s => s.type === 'arret').length;
  const depots = stations.filter(s => s.type === 'depot').length;

  return {
    total,
    active,
    inactive,
    maintenance,
    terminals,
    arrets,
    depots
  };
};

/**
 * Groupe les stations par ville
 */
export const groupStationsByCity = (stations: Station[]): Record<string, Station[]> => {
  return stations.reduce((acc, station) => {
    const cityName = station.cityName;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(station);
    return acc;
  }, {} as Record<string, Station[]>);
};
