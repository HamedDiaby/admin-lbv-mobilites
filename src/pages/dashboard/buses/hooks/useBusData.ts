import { useState, useEffect } from 'react';
import { Bus, BusFilters } from '../types';

// Mock data généré localement
const generateMockBuses = (): Bus[] => {
  const marques = ['Mercedes', 'Volvo', 'Scania', 'Iveco', 'MAN'];
  const modeles = ['Citaro', 'Lions City', 'Touring', 'Crossway', 'Lions Coach'];
  const couleurs = ['Blanc', 'Bleu', 'Rouge', 'Vert', 'Jaune'];
  const carburants: Bus['carburant'][] = ['diesel', 'essence', 'electrique', 'hybride'];
  const statuts: Bus['statut'][] = ['actif', 'maintenance', 'hors_service', 'en_route'];
  
  const buses: Bus[] = [];
  
  for (let i = 1; i <= 15; i++) {
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
      obd2Data: {
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
        alertes: [],
        scoreEtat: Math.floor(Math.random() * 100),
        prochaineMaintenance: Math.floor(Math.random() * 10000),
        emissionsCO2: 120 + Math.random() * 50,
        consommationMoyenne: 9 + Math.random() * 4,
        latitude: 0.4162 + (Math.random() - 0.5) * 0.1,
        longitude: 9.4673 + (Math.random() - 0.5) * 0.1,
        lastUpdate: new Date().toISOString()
      },
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return buses;
};

interface UseBusDataProps {
  refreshInterval?: number;
  enabled?: boolean;
}

interface UseBusDataReturn {
  buses: Bus[];
  filteredBuses: Bus[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  lastUpdate: Date;
  filters: BusFilters;
  setFilters: (filters: BusFilters) => void;
  selectedBus: Bus | null;
  setSelectedBus: (bus: Bus | null) => void;
}

export const useBusData = ({
  refreshInterval = 30000, // 30 secondes
  enabled = true
}: UseBusDataProps = {}): UseBusDataReturn => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [filters, setFilters] = useState<BusFilters>({
    statut: '',
    carburant: '',
    station: '',
    etatSante: ''
  });
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  const refreshData = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulation d'un appel API
    setTimeout(() => {
      try {
        const mockBuses = generateMockBuses();
        setBuses(mockBuses);
        setLastUpdate(new Date());
        setIsLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données des bus');
        setIsLoading(false);
      }
    }, 1000);
  };

  // Filtrage des bus
  useEffect(() => {
    let filtered = buses;

    if (filters.statut) {
      filtered = filtered.filter(bus => bus.statut === filters.statut);
    }

    if (filters.carburant) {
      filtered = filtered.filter(bus => bus.carburant === filters.carburant);
    }

    if (filters.station) {
      filtered = filtered.filter(bus => bus.stationId === filters.station);
    }

    if (filters.etatSante) {
      filtered = filtered.filter(bus => {
        const score = bus.obd2Data.scoreEtat;
        switch (filters.etatSante) {
          case 'excellent': return score >= 90;
          case 'bon': return score >= 70 && score < 90;
          case 'moyen': return score >= 50 && score < 70;
          case 'faible': return score < 50;
          default: return true;
        }
      });
    }

    setFilteredBuses(filtered);
  }, [buses, filters]);

  // Chargement initial
  useEffect(() => {
    if (enabled) {
      refreshData();
    }
  }, [enabled]);

  // Auto-refresh
  useEffect(() => {
    if (enabled && refreshInterval > 0) {
      const interval = setInterval(refreshData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [enabled, refreshInterval]);

  return {
    buses,
    filteredBuses,
    isLoading,
    error,
    refreshData,
    lastUpdate,
    filters,
    setFilters,
    selectedBus,
    setSelectedBus
  };
};
