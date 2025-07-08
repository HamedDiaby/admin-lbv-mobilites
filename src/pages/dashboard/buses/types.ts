// Types pour la gestion des bus
export interface Bus {
  id: string;
  numero: string;
  capacite: number;
  carburant: 'diesel' | 'essence' | 'electrique' | 'hybride';
  plaqueImmatriculation: string;
  marque: string;
  modele: string;
  annee: number;
  couleur: string;
  statut: 'actif' | 'maintenance' | 'hors_service' | 'en_route';
  stationId?: string;
  stationName?: string;
  // Données OBD2 en temps réel
  obd2Data: OBD2Data;
  createdAt: string;
  updatedAt: string;
}

export interface OBD2Data {
  // Données moteur
  vitesse: number; // km/h
  rpm: number; // tours/minute
  temperatureMoteur: number; // °C
  pressionHuile: number; // bar
  niveauCarburant: number; // pourcentage
  consommationInstantanee: number; // L/100km
  
  // Données de santé
  kilometrage: number; // km
  heuresMoteur: number; // heures
  pressionPneus: {
    avantGauche: number;
    avantDroit: number;
    arriereGauche: number;
    arriereDroit: number;
  }; // bar
  
  // Alertes et diagnostics
  alertes: BusAlert[];
  scoreEtat: number; // 0-100
  prochaineMaintenance: number; // km restants
  
  // Données environnementales
  emissionsCO2: number; // g/km
  consommationMoyenne: number; // L/100km
  
  // Localisation
  latitude?: number;
  longitude?: number;
  
  // Timestamp de dernière mise à jour
  lastUpdate: string;
}

export interface BusAlert {
  id: string;
  type: 'critique' | 'avertissement' | 'info';
  code: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

// Types pour les formulaires
export interface NewBusData {
  numero: string;
  capacite: number;
  carburant: Bus['carburant'];
  plaqueImmatriculation: string;
  marque: string;
  modele: string;
  annee: number;
  couleur: string;
}

export interface BusFormErrors {
  numero?: string;
  capacite?: string;
  carburant?: string;
  plaqueImmatriculation?: string;
  marque?: string;
  modele?: string;
  annee?: string;
  couleur?: string;
}

// Types pour les filtres
export interface BusFilters {
  statut: string;
  carburant: string;
  station: string;
  etatSante: string;
}
