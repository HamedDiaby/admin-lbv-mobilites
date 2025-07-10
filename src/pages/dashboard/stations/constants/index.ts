// Provinces du Gabon avec leurs villes principales
export const GABON_PROVINCES = [
  'Estuaire',
  'Haut-Ogooué',
  'Moyen-Ogooué',
  'Ngounié',
  'Nyanga',
  'Ogooué-Ivindo',
  'Ogooué-Lolo',
  'Ogooué-Maritime',
  'Woleu-Ntem'
] as const;

// Types de stations
export const STATION_TYPES = [
  { value: 'terminal', label: 'Terminal' },
  { value: 'arret', label: 'Arrêt' },
  { value: 'depot', label: 'Dépôt' }
] as const;

// Statuts des stations
export const STATION_STATUS = [
  { value: 'active', label: 'Actif', color: 'bg-green-100 text-green-800' },
  { value: 'inactive', label: 'Inactif', color: 'bg-red-100 text-red-800' },
  { value: 'maintenance', label: 'Maintenance', color: 'bg-yellow-100 text-yellow-800' }
] as const;

// Options de filtrage spécifiques aux stations (préfixé pour éviter les conflits)
export const STATIONS_FILTER_OPTIONS = {
  types: [
    { value: '', label: 'Tous les types' },
    ...STATION_TYPES
  ],
  status: [
    { value: '', label: 'Tous les statuts' },
    ...STATION_STATUS.map(s => ({ value: s.value, label: s.label }))
  ]
} as const;

// Couleurs pour les statuts (préfixé pour éviter les conflits)
export const STATIONS_STATUS_COLORS = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-red-100 text-red-800',
  maintenance: 'bg-yellow-100 text-yellow-800'
} as const;

// Équipements disponibles dans les stations
export const STATION_FACILITIES = [
  'Parking',
  'Toilettes',
  'Cafétéria',
  'WiFi',
  'Distributeurs',
  'Salle d\'attente',
  'Billetterie',
  'Information voyageurs',
  'Accès PMR',
  'Vidéosurveillance',
  'Éclairage',
  'Abri météo'
] as const;
