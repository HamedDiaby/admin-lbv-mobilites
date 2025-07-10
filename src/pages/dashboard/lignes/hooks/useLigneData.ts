import { useState, useEffect, useMemo } from 'react';
import { Ligne, LigneFilters, Station, Ville } from '../types';
import { generateMockLignes, lignesMockVilles, lignesMockStations } from '../constants';

interface UseLigneDataProps {
  refreshInterval?: number;
  enabled?: boolean;
}

interface UseLigneDataReturn {
  lignes: Ligne[];
  filteredLignes: Ligne[];
  villes: Ville[];
  stations: Station[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  lastUpdate: Date;
  filters: LigneFilters;
  setFilters: (filters: LigneFilters) => void;
  selectedLigne: Ligne | null;
  setSelectedLigne: (ligne: Ligne | null) => void;
}

export const useLigneData = ({
  refreshInterval = 30000,
  enabled = true
}: UseLigneDataProps = {}): UseLigneDataReturn => {
  const [lignes, setLignes] = useState<Ligne[]>([]);
  const [villes] = useState<Ville[]>(lignesMockVilles);
  const [stations] = useState<Station[]>(lignesMockStations);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedLigne, setSelectedLigne] = useState<Ligne | null>(null);
  
  // Filtres pour les lignes
  const [filters, setFilters] = useState<LigneFilters>({
    statut: '',
    ville: '',
    recherche: ''
  });

  // Fonction pour charger les données
  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData = generateMockLignes();
      setLignes(mockData);
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

  // Filtrage des lignes
  const filteredLignes = useMemo(() => {
    return lignes.filter(ligne => {
      // Filtre par statut
      if (filters.statut && ligne.statut !== filters.statut) {
        return false;
      }

      // Filtre par ville
      if (filters.ville && ligne.ville.id !== filters.ville) {
        return false;
      }

      // Filtre par recherche (nom, numéro)
      if (filters.recherche) {
        const searchTerm = filters.recherche.toLowerCase();
        return (
          ligne.nom.toLowerCase().includes(searchTerm) ||
          ligne.numero.toLowerCase().includes(searchTerm) ||
          ligne.stationDepart.nom.toLowerCase().includes(searchTerm) ||
          ligne.stationArrivee.nom.toLowerCase().includes(searchTerm)
        );
      }

      return true;
    });
  }, [lignes, filters]);

  return {
    lignes,
    filteredLignes,
    villes,
    stations,
    isLoading,
    error,
    refreshData,
    lastUpdate,
    filters,
    setFilters,
    selectedLigne,
    setSelectedLigne
  };
};
