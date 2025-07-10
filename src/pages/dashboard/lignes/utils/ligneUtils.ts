import { Ligne, StationIntermediaire } from '../types';

// Formatage de la distance
export const formatDistance = (distance: number): string => {
  if (distance >= 1) {
    return `${distance.toFixed(1)} km`;
  }
  return `${(distance * 1000).toFixed(0)} m`;
};

// Formatage de la durée
export const formatDuree = (minutes: number): string => {
  if (minutes >= 60) {
    const heures = Math.floor(minutes / 60);
    const minutesRestantes = minutes % 60;
    return minutesRestantes > 0 
      ? `${heures}h${minutesRestantes.toString().padStart(2, '0')}`
      : `${heures}h`;
  }
  return `${minutes}min`;
};

// Calcul de la vitesse moyenne
export const calculateAverageSpeed = (distance: number, timeInMinutes: number): number => {
  const timeInHours = timeInMinutes / 60;
  return distance / timeInHours;
};

// Obtenir les informations de trajet
export const getTrajetInfo = (ligne: Ligne): string => {
  return `${ligne.stationDepart.nom} → ${ligne.stationArrivee.nom}`;
};

// Obtenir le nombre total de stations (départ + intermédiaires + arrivée)
export const getTotalStations = (ligne: Ligne): number => {
  return 2 + ligne.stationsIntermediaires.length;
};

// Validation d'une ligne
export const validateLigne = (ligne: Partial<Ligne>): string[] => {
  const errors: string[] = [];

  if (!ligne.nom || ligne.nom.trim().length === 0) {
    errors.push('Le nom de la ligne est requis');
  }

  if (!ligne.numero || ligne.numero.trim().length === 0) {
    errors.push('Le numéro de la ligne est requis');
  }

  if (!ligne.ville?.id) {
    errors.push('La ville est requise');
  }

  if (!ligne.stationDepart?.id) {
    errors.push('La station de départ est requise');
  }

  if (!ligne.stationArrivee?.id) {
    errors.push('La station d\'arrivée est requise');
  }

  if (ligne.stationDepart?.id === ligne.stationArrivee?.id) {
    errors.push('La station de départ et d\'arrivée doivent être différentes');
  }

  if (ligne.distanceTotale && ligne.distanceTotale <= 0) {
    errors.push('La distance totale doit être positive');
  }

  if (ligne.tempsTotal && ligne.tempsTotal <= 0) {
    errors.push('Le temps total doit être positif');
  }

  return errors;
};

// Tri des lignes
export const sortLignes = (lignes: Ligne[], sortKey: keyof Ligne, sortOrder: 'asc' | 'desc' = 'asc'): Ligne[] => {
  return [...lignes].sort((a, b) => {
    let aValue: any = a[sortKey];
    let bValue: any = b[sortKey];

    // Gestion des cas spéciaux
    if (sortKey === 'ville') {
      aValue = a.ville.nom;
      bValue = b.ville.nom;
    } else if (sortKey === 'stationDepart') {
      aValue = a.stationDepart.nom;
      bValue = b.stationDepart.nom;
    } else if (sortKey === 'stationArrivee') {
      aValue = a.stationArrivee.nom;
      bValue = b.stationArrivee.nom;
    }

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

// Recherche dans les lignes
export const searchLignes = (lignes: Ligne[], searchTerm: string): Ligne[] => {
  if (!searchTerm.trim()) return lignes;

  const term = searchTerm.toLowerCase();
  return lignes.filter(ligne =>
    ligne.nom.toLowerCase().includes(term) ||
    ligne.numero.toLowerCase().includes(term) ||
    ligne.ville.nom.toLowerCase().includes(term) ||
    ligne.stationDepart.nom.toLowerCase().includes(term) ||
    ligne.stationArrivee.nom.toLowerCase().includes(term) ||
    ligne.stationsIntermediaires.some(station =>
      station.nomStation.toLowerCase().includes(term)
    )
  );
};

// Calcul des statistiques d'une ligne
export const calculateLigneStats = (ligne: Ligne) => {
  const totalStations = getTotalStations(ligne);
  const averageSpeed = calculateAverageSpeed(ligne.distanceTotale, ligne.tempsTotal);
  const averageDistanceBetweenStations = ligne.distanceTotale / (totalStations - 1);
  const averageTimeBetweenStations = ligne.tempsTotal / (totalStations - 1);

  return {
    totalStations,
    averageSpeed: Math.round(averageSpeed * 10) / 10,
    averageDistanceBetweenStations: Math.round(averageDistanceBetweenStations * 10) / 10,
    averageTimeBetweenStations: Math.round(averageTimeBetweenStations)
  };
};

// Obtenir la couleur selon le statut
export const getStatusColor = (statut: Ligne['statut']): string => {
  switch (statut) {
    case 'Active': return 'green';
    case 'Inactive': return 'red';
    case 'Maintenance': return 'orange';
    default: return 'gray';
  }
};

// Générer un itinéraire détaillé
export const generateItineraire = (ligne: Ligne): Array<{
  station: string;
  ordre: number;
  distance: number;
  temps: number;
  cumulatedDistance: number;
  cumulatedTime: number;
}> => {
  const itineraire = [];
  
  // Station de départ
  itineraire.push({
    station: ligne.stationDepart.nom,
    ordre: 0,
    distance: 0,
    temps: 0,
    cumulatedDistance: 0,
    cumulatedTime: 0
  });

  // Stations intermédiaires
  let cumulatedDistance = 0;
  let cumulatedTime = 0;

  ligne.stationsIntermediaires
    .sort((a, b) => a.ordre - b.ordre)
    .forEach(station => {
      cumulatedDistance += station.distanceDepuisStation;
      cumulatedTime += station.tempsDepuisStation;
      
      itineraire.push({
        station: station.nomStation,
        ordre: station.ordre,
        distance: station.distanceDepuisStation,
        temps: station.tempsDepuisStation,
        cumulatedDistance,
        cumulatedTime
      });
    });

  // Station d'arrivée
  const remainingDistance = ligne.distanceTotale - cumulatedDistance;
  const remainingTime = ligne.tempsTotal - cumulatedTime;
  
  itineraire.push({
    station: ligne.stationArrivee.nom,
    ordre: ligne.stationsIntermediaires.length + 1,
    distance: remainingDistance,
    temps: remainingTime,
    cumulatedDistance: ligne.distanceTotale,
    cumulatedTime: ligne.tempsTotal
  });

  return itineraire;
};

// Calcul des performances globales des lignes
export const calculateLignesPerformance = (lignes: Ligne[]) => {
  const totalLignes = lignes.length;
  const activeLignes = lignes.filter(l => l.statut === 'Active').length;
  const maintenanceLignes = lignes.filter(l => l.statut === 'Maintenance').length;
  const inactiveLignes = lignes.filter(l => l.statut === 'Inactive').length;
  
  const totalDistance = lignes.reduce((sum, ligne) => sum + ligne.distanceTotale, 0);
  const averageDistance = totalLignes > 0 ? totalDistance / totalLignes : 0;
  
  const totalStations = lignes.reduce((sum, ligne) => sum + getTotalStations(ligne), 0);
  const averageStationsPerLigne = totalLignes > 0 ? totalStations / totalLignes : 0;
  
  const citySet = new Set(lignes.map(l => l.ville.nom));
  const cities = Array.from(citySet);
  const totalCities = cities.length;

  return {
    totalLignes,
    activeLignes,
    maintenanceLignes,
    inactiveLignes,
    activePercentage: totalLignes > 0 ? Math.round((activeLignes / totalLignes) * 100) : 0,
    totalDistance: Math.round(totalDistance * 10) / 10,
    averageDistance: Math.round(averageDistance * 10) / 10,
    totalStations,
    averageStationsPerLigne: Math.round(averageStationsPerLigne * 10) / 10,
    totalCities
  };
};
