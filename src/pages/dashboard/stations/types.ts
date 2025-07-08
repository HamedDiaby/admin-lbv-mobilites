// Types pour la gestion des stations au Gabon
export interface City {
  id: string;
  name: string;
  province: string;
  population?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Station {
  id: string;
  name: string;
  code: string;
  cityId: string;
  cityName: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  type: 'terminal' | 'arret' | 'depot';
  status: 'active' | 'inactive' | 'maintenance';
  capacity?: number;
  facilities: string[];
  createdAt: string;
  updatedAt: string;
}

// Types pour les formulaires
export interface NewCityData {
  name: string;
  province: string;
}

export interface CityFormErrors {
  name?: string;
  province?: string;
}

export interface NewStationData {
  name: string;
  cityId: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface StationFormErrors {
  name?: string;
  cityId?: string;
  address?: string;
  latitude?: string;
  longitude?: string;
}
