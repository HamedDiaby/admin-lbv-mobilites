import { Bus, OBD2Data, BusAlert } from '../types';

// Génération de données OBD2 mockées
const generateMockOBD2Data = (): OBD2Data => {
  const alerts: BusAlert[] = [];
  const randomAlertCount = Math.floor(Math.random() * 3);
  
  for (let i = 0; i < randomAlertCount; i++) {
    alerts.push({
      id: `alert-${i}`,
      type: Math.random() > 0.7 ? 'critique' : Math.random() > 0.5 ? 'avertissement' : 'info',
      code: `P${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`,
      message: [
        'Pression d\'huile faible',
        'Température moteur élevée',
        'Pression pneu arrière gauche',
        'Niveau carburant bas',
        'Maintenance programmée'
      ][Math.floor(Math.random() * 5)],
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
      resolved: Math.random() > 0.3
    });
  }

  return {
    vitesse: Math.floor(Math.random() * 80),
    rpm: 800 + Math.floor(Math.random() * 1500),
    temperatureMoteur: 75 + Math.floor(Math.random() * 25),
    pressionHuile: 2.5 + Math.random() * 1.5,
    niveauCarburant: Math.floor(Math.random() * 100),
    consommationInstantanee: 8 + Math.random() * 5,
    kilometrage: 10000 + Math.floor(Math.random() * 200000),
    heuresMoteur: 500 + Math.floor(Math.random() * 5000),
    pressionPneus: {
      avantGauche: 2.0 + Math.random() * 0.5,
      avantDroit: 2.0 + Math.random() * 0.5,
      arriereGauche: 2.0 + Math.random() * 0.5,
      arriereDroit: 2.0 + Math.random() * 0.5
    },
    alertes: alerts,
    scoreEtat: Math.floor(Math.random() * 100),
    prochaineMaintenance: Math.floor(Math.random() * 10000),
    emissionsCO2: 120 + Math.random() * 50,
    consommationMoyenne: 9 + Math.random() * 4,
    latitude: 0.4162 + (Math.random() - 0.5) * 0.1,
    longitude: 9.4673 + (Math.random() - 0.5) * 0.1,
    lastUpdate: new Date().toISOString()
  };
};

// Génération de bus mockés
export const generateMockBuses = (): Bus[] => {
  const marques = ['Mercedes', 'Volvo', 'Scania', 'Iveco', 'MAN'];
  const modeles = ['Citaro', 'Lions City', 'Touring', 'Crossway', 'Lions Coach'];
  const couleurs = ['Blanc', 'Bleu', 'Rouge', 'Vert', 'Jaune'];
  const carburants: Bus['carburant'][] = ['diesel', 'essence', 'electrique', 'hybride'];
  const statuts: Bus['statut'][] = ['actif', 'maintenance', 'hors_service', 'en_route'];
  
  const buses: Bus[] = [];
  
  for (let i = 1; i <= 25; i++) {
    buses.push({
      id: `bus-${i}`,
      numero: `LBV-${i.toString().padStart(3, '0')}`,
      capacite: [30, 40, 50, 60][Math.floor(Math.random() * 4)],
      carburant: carburants[Math.floor(Math.random() * carburants.length)],
      plaqueImmatriculation: `GA-${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}-LBV`,
      marque: marques[Math.floor(Math.random() * marques.length)],
      modele: modeles[Math.floor(Math.random() * modeles.length)],
      annee: 2015 + Math.floor(Math.random() * 9),
      couleur: couleurs[Math.floor(Math.random() * couleurs.length)],
      statut: statuts[Math.floor(Math.random() * statuts.length)],
      stationId: Math.random() > 0.3 ? `station-${Math.floor(Math.random() * 5) + 1}` : undefined,
      stationName: Math.random() > 0.3 ? [
        'Terminal Libreville',
        'Terminal Port-Gentil',
        'Gare Routière Owendo',
        'Station Montagne Sainte',
        'Terminal Franceville'
      ][Math.floor(Math.random() * 5)] : undefined,
      obd2Data: generateMockOBD2Data(),
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return buses;
};

// Options pour les filtres
export const FILTER_OPTIONS = {
  statuts: [
    { value: '', label: 'Tous les statuts' },
    { value: 'actif', label: 'Actif' },
    { value: 'maintenance', label: 'En maintenance' },
    { value: 'hors_service', label: 'Hors service' },
    { value: 'en_route', label: 'En route' }
  ],
  carburants: [
    { value: '', label: 'Tous les carburants' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'essence', label: 'Essence' },
    { value: 'electrique', label: 'Électrique' },
    { value: 'hybride', label: 'Hybride' }
  ],
  etatsSante: [
    { value: '', label: 'Tous les états' },
    { value: 'excellent', label: 'Excellent (90-100%)' },
    { value: 'bon', label: 'Bon (70-89%)' },
    { value: 'moyen', label: 'Moyen (50-69%)' },
    { value: 'faible', label: 'Faible (<50%)' }
  ]
};

// Configuration des colonnes du tableau
export const BUS_TABLE_COLUMNS = [
  { key: 'numero', label: 'N° Bus', sortable: true },
  { key: 'marque', label: 'Marque/Modèle', sortable: true },
  { key: 'capacite', label: 'Capacité', sortable: true },
  { key: 'carburant', label: 'Carburant', sortable: true },
  { key: 'statut', label: 'Statut', sortable: true },
  { key: 'station', label: 'Station', sortable: false },
  { key: 'scoreEtat', label: 'État', sortable: true },
  { key: 'actions', label: 'Actions', sortable: false }
];

// Couleurs selon le statut
export const STATUS_COLORS = {
  actif: 'green',
  maintenance: 'orange',
  hors_service: 'red',
  en_route: 'blue'
} as const;

// Couleurs selon l'état de santé
export const HEALTH_COLORS = {
  excellent: 'green',
  bon: 'blue',
  moyen: 'orange',
  faible: 'red'
} as const;
