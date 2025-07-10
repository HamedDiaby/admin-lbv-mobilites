export interface BusPosition {
  id: string;
  numero: string;
  ligne: string;
  latitude: number;
  longitude: number;
  vitesse: number;
  direction: number;
  passagers: number;
  capacite: number;
  statut: 'en_service' | 'en_pause' | 'hors_service' | 'maintenance';
  derniereMiseAJour: Date;
  chauffeur: string;
  prochainArret: string;
  retard: number; // en minutes
}

export interface Station {
  id: string;
  nom: string;
  latitude: number;
  longitude: number;
  lignes: string[];
  passagersEnAttente: number;
  prochainBus: {
    numero: string;
    ligne: string;
    tempsArrivee: number; // en minutes
  } | null;
  accessibilite: boolean;
  services: string[];
}

export interface Ligne {
  id: string;
  nom: string;
  couleur: string;
  stations: string[];
  busActifs: number;
  frequence: number; // en minutes
  statut: 'normal' | 'retard' | 'perturbation' | 'suspendu';
  parcours: {
    latitude: number;
    longitude: number;
  }[];
}

export interface DashboardStats {
  busEnService: number;
  busHorsService: number;
  passagersTotal: number;
  retardMoyen: number;
  stationsActives: number;
  lignesEnService: number;
  incidents: number;
  revenus: number;
}

export interface MapFilter {
  showBuses: boolean;
  showStations: boolean;
  showLines: boolean;
  busStatut: string[];
  lignesSelectionnees: string[];
  affichageTempsReel: boolean;
}

export interface Incident {
  id: string;
  type: 'panne' | 'accident' | 'retard' | 'embouteillage' | 'maintenance';
  description: string;
  latitude?: number;
  longitude?: number;
  ligne?: string;
  bus?: string;
  severite: 'faible' | 'moyen' | 'eleve';
  dateDebut: Date;
  dateFin?: Date;
  statut: 'actif' | 'resolu' | 'en_cours';
}
