export interface StationIntermediaire {
  id: string;
  stationId: string;
  nomStation: string;
  ordre: number;
  distanceDepuisStation: number; // en km depuis la station précédente
  tempsDepuisStation: number; // en minutes depuis la station précédente
}

export interface Ligne {
  id: string;
  nom: string;
  ville: string;
  stationDepart: {
    id: string;
    nom: string;
  };
  stationArrivee: {
    id: string;
    nom: string;
  };
  distanceTotale: number; // en km
  tempsTotal: number; // en minutes
  stationsIntermediaires: StationIntermediaire[];
  statut: 'active' | 'inactive' | 'maintenance';
  dateCreation: string;
  dateMiseAJour: string;
}

export interface Station {
  id: string;
  nom: string;
  ville: string;
  adresse: string;
  latitude?: number;
  longitude?: number;
}

export interface Ville {
  id: string;
  nom: string;
}

export interface LigneFormData {
  nom: string;
  ville: string;
  stationDepartId: string;
  stationArriveeId: string;
  stationsIntermediaires: Omit<StationIntermediaire, 'id'>[];
}
