import { useState, useEffect, useMemo } from 'react';
import { City, Station } from '../types';

interface UseStationDataProps {
  refreshInterval?: number;
  enabled?: boolean;
}

interface UseStationDataReturn {
  cities: City[];
  stations: Station[];
  filteredStations: Station[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  lastUpdate: Date;
  filters: {
    city: string;
    type: string;
    status: string;
    search: string;
  };
  setFilters: (filters: any) => void;
  selectedStation: Station | null;
  setSelectedStation: (station: Station | null) => void;
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
}

export const useStationData = ({
  refreshInterval = 30000,
  enabled = true
}: UseStationDataProps = {}): UseStationDataReturn => {
  const [cities, setCities] = useState<City[]>([]);
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  
  // Filtres pour les stations
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    status: '',
    search: ''
  });

  // Fonction pour charger les données
  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulation d'appel API avec données fictives
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Données fictives des villes du Gabon
      const mockCities: City[] = [
        {
          id: '1',
          name: 'Libreville',
          province: 'Estuaire',
          population: 797003,
          createdAt: '2024-01-15T09:00:00Z',
          updatedAt: '2024-01-15T09:00:00Z'
        },
        {
          id: '2',
          name: 'Port-Gentil',
          province: 'Ogooué-Maritime',
          population: 136462,
          createdAt: '2024-01-15T09:00:00Z',
          updatedAt: '2024-01-15T09:00:00Z'
        },
        {
          id: '3',
          name: 'Franceville',
          province: 'Haut-Ogooué',
          population: 110568,
          createdAt: '2024-01-15T09:00:00Z',
          updatedAt: '2024-01-15T09:00:00Z'
        }
      ];

      // Données fictives des stations
      const mockStations: Station[] = [
        {
          id: '1',
          name: 'Gare Centrale Libreville',
          code: 'LBV-TER-001',
          cityId: '1',
          cityName: 'Libreville',
          address: '100 Avenue de l\'Indépendance',
          coordinates: {
            latitude: 0.4162,
            longitude: 9.4673
          },
          type: 'terminal',
          status: 'active',
          capacity: 25,
          facilities: ['Parking', 'Toilettes', 'Cafétéria', 'WiFi'],
          createdAt: '2024-01-15T09:00:00Z',
          updatedAt: '2024-01-15T09:00:00Z'
        },
        {
          id: '2',
          name: 'Terminal Port-Gentil',
          code: 'PG-TER-001',
          cityId: '2',
          cityName: 'Port-Gentil',
          address: '50 Boulevard de la République',
          coordinates: {
            latitude: -0.7193,
            longitude: 8.7815
          },
          type: 'terminal',
          status: 'active',
          capacity: 20,
          facilities: ['Parking', 'Toilettes', 'Information voyageurs'],
          createdAt: '2024-01-15T09:00:00Z',
          updatedAt: '2024-01-15T09:00:00Z'
        }
      ];
      
      setCities(mockCities);
      setStations(mockStations);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction de rafraîchissement
  const refreshData = () => {
    loadData();
  };

  // Auto-refresh
  useEffect(() => {
    if (!enabled) return;

    loadData();

    if (refreshInterval > 0) {
      const interval = setInterval(loadData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [enabled, refreshInterval]);

  // Filtrage des stations
  const filteredStations = useMemo(() => {
    return stations.filter(station => {
      // Filtre par ville
      if (filters.city && station.cityId !== filters.city) {
        return false;
      }

      // Filtre par type
      if (filters.type && station.type !== filters.type) {
        return false;
      }

      // Filtre par statut
      if (filters.status && station.status !== filters.status) {
        return false;
      }

      // Filtre par recherche (nom, code, adresse)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          station.name.toLowerCase().includes(searchTerm) ||
          station.code.toLowerCase().includes(searchTerm) ||
          station.address.toLowerCase().includes(searchTerm) ||
          station.cityName.toLowerCase().includes(searchTerm)
        );
      }

      return true;
    });
  }, [stations, filters]);

  return {
    cities,
    stations,
    filteredStations,
    isLoading,
    error,
    refreshData,
    lastUpdate,
    filters,
    setFilters,
    selectedStation,
    setSelectedStation,
    selectedCity,
    setSelectedCity
  };
};
