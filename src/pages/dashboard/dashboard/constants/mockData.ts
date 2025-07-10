import { BusPosition, Station, Ligne, Incident, DashboardStats } from './types';

// Données de test pour les bus
export const mockBuses: BusPosition[] = [
  {
    id: 'bus_001',
    numero: 'LBV-101',
    ligne: 'Ligne 1',
    latitude: 0.4162,
    longitude: 9.4673,
    vitesse: 35,
    direction: 90,
    passagers: 28,
    capacite: 40,
    statut: 'en_service',
    derniereMiseAJour: new Date(),
    chauffeur: 'Amadou Diallo',
    prochainArret: 'Station Centre-Ville',
    retard: 0
  },
  {
    id: 'bus_002',
    numero: 'LBV-102',
    ligne: 'Ligne 1',
    latitude: 0.4180,
    longitude: 9.4690,
    vitesse: 0,
    direction: 90,
    passagers: 15,
    capacite: 40,
    statut: 'en_pause',
    derniereMiseAJour: new Date(),
    chauffeur: 'Marie Mbengue',
    prochainArret: 'Station Université',
    retard: 5
  },
  {
    id: 'bus_003',
    numero: 'LBV-201',
    ligne: 'Ligne 2',
    latitude: 0.4145,
    longitude: 9.4620,
    vitesse: 42,
    direction: 270,
    passagers: 35,
    capacite: 45,
    statut: 'en_service',
    derniereMiseAJour: new Date(),
    chauffeur: 'Pierre Ndong',
    prochainArret: 'Station Marché',
    retard: 0
  },
  {
    id: 'bus_004',
    numero: 'LBV-301',
    ligne: 'Ligne 3',
    latitude: 0.4200,
    longitude: 9.4750,
    vitesse: 0,
    direction: 180,
    passagers: 0,
    capacite: 35,
    statut: 'hors_service',
    derniereMiseAJour: new Date(),
    chauffeur: 'Jean Ondo',
    prochainArret: 'Dépôt',
    retard: 0
  },
  {
    id: 'bus_005',
    numero: 'LBV-103',
    ligne: 'Ligne 1',
    latitude: 0.4120,
    longitude: 9.4580,
    vitesse: 28,
    direction: 45,
    passagers: 22,
    capacite: 40,
    statut: 'en_service',
    derniereMiseAJour: new Date(),
    chauffeur: 'Fatou Sy',
    prochainArret: 'Station Aéroport',
    retard: 3
  }
];

// Données de test pour les stations
export const mockStations: Station[] = [
  {
    id: 'station_001',
    nom: 'Station Centre-Ville',
    latitude: 0.4162,
    longitude: 9.4673,
    lignes: ['Ligne 1', 'Ligne 2'],
    passagersEnAttente: 12,
    prochainBus: {
      numero: 'LBV-101',
      ligne: 'Ligne 1',
      tempsArrivee: 3
    },
    accessibilite: true,
    services: ['Wifi', 'Bancs', 'Abri']
  },
  {
    id: 'station_002',
    nom: 'Station Université',
    latitude: 0.4180,
    longitude: 9.4690,
    lignes: ['Ligne 1'],
    passagersEnAttente: 8,
    prochainBus: {
      numero: 'LBV-102',
      ligne: 'Ligne 1',
      tempsArrivee: 1
    },
    accessibilite: true,
    services: ['Wifi', 'Distributeur', 'Abri']
  },
  {
    id: 'station_003',
    nom: 'Station Marché',
    latitude: 0.4145,
    longitude: 9.4620,
    lignes: ['Ligne 2', 'Ligne 3'],
    passagersEnAttente: 15,
    prochainBus: {
      numero: 'LBV-201',
      ligne: 'Ligne 2',
      tempsArrivee: 2
    },
    accessibilite: false,
    services: ['Bancs']
  },
  {
    id: 'station_004',
    nom: 'Station Aéroport',
    latitude: 0.4120,
    longitude: 9.4580,
    lignes: ['Ligne 1', 'Ligne 3'],
    passagersEnAttente: 6,
    prochainBus: {
      numero: 'LBV-103',
      ligne: 'Ligne 1',
      tempsArrivee: 5
    },
    accessibilite: true,
    services: ['Wifi', 'Bancs', 'Abri', 'Toilettes']
  },
  {
    id: 'station_005',
    nom: 'Station Port',
    latitude: 0.4200,
    longitude: 9.4750,
    lignes: ['Ligne 2'],
    passagersEnAttente: 4,
    prochainBus: null,
    accessibilite: true,
    services: ['Bancs', 'Abri']
  }
];

// Données de test pour les lignes
export const mockLignes: Ligne[] = [
  {
    id: 'ligne_1',
    nom: 'Ligne 1',
    couleur: '#3b82f6',
    stations: ['station_001', 'station_002', 'station_004'],
    busActifs: 3,
    frequence: 10,
    statut: 'normal',
    parcours: [
      { latitude: 0.4120, longitude: 9.4580 },
      { latitude: 0.4140, longitude: 9.4620 },
      { latitude: 0.4162, longitude: 9.4673 },
      { latitude: 0.4180, longitude: 9.4690 }
    ]
  },
  {
    id: 'ligne_2',
    nom: 'Ligne 2',
    couleur: '#10b981',
    stations: ['station_001', 'station_003', 'station_005'],
    busActifs: 1,
    frequence: 15,
    statut: 'retard',
    parcours: [
      { latitude: 0.4162, longitude: 9.4673 },
      { latitude: 0.4145, longitude: 9.4620 },
      { latitude: 0.4200, longitude: 9.4750 }
    ]
  },
  {
    id: 'ligne_3',
    nom: 'Ligne 3',
    couleur: '#f59e0b',
    stations: ['station_003', 'station_004'],
    busActifs: 0,
    frequence: 20,
    statut: 'suspendu',
    parcours: [
      { latitude: 0.4145, longitude: 9.4620 },
      { latitude: 0.4120, longitude: 9.4580 }
    ]
  }
];

// Données de test pour les incidents
export const mockIncidents: Incident[] = [
  {
    id: 'incident_001',
    type: 'panne',
    description: 'Panne moteur sur bus LBV-301',
    latitude: 0.4200,
    longitude: 9.4750,
    ligne: 'Ligne 3',
    bus: 'LBV-301',
    severite: 'eleve',
    dateDebut: new Date(Date.now() - 30 * 60 * 1000),
    statut: 'actif'
  },
  {
    id: 'incident_002',
    type: 'retard',
    description: 'Embouteillages sur la Ligne 2',
    ligne: 'Ligne 2',
    severite: 'moyen',
    dateDebut: new Date(Date.now() - 15 * 60 * 1000),
    statut: 'actif'
  },
  {
    id: 'incident_003',
    type: 'maintenance',
    description: 'Maintenance préventive terminée',
    bus: 'LBV-104',
    severite: 'faible',
    dateDebut: new Date(Date.now() - 2 * 60 * 60 * 1000),
    dateFin: new Date(Date.now() - 30 * 60 * 1000),
    statut: 'resolu'
  }
];

// Statistiques du dashboard
export const mockDashboardStats: DashboardStats = {
  busEnService: 3,
  busHorsService: 1,
  passagersTotal: 100,
  retardMoyen: 2.7,
  stationsActives: 5,
  lignesEnService: 2,
  incidents: 2,
  revenus: 12500
};
