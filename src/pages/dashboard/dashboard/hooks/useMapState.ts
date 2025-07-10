import { useState } from 'react';
import { MapFilter, BusPosition, Station } from '../types';

interface UseMapStateProps {
  initialFilters?: Partial<MapFilter>;
}

interface UseMapStateReturn {
  mapFilters: MapFilter;
  selectedBus: BusPosition | null;
  selectedStation: Station | null;
  setMapFilters: React.Dispatch<React.SetStateAction<MapFilter>>;
  setSelectedBus: React.Dispatch<React.SetStateAction<BusPosition | null>>;
  setSelectedStation: React.Dispatch<React.SetStateAction<Station | null>>;
  handleBusClick: (bus: BusPosition) => void;
  handleStationClick: (station: Station) => void;
  clearSelection: () => void;
  resetFilters: () => void;
}

const defaultFilters: MapFilter = {
  showBuses: true,
  showStations: true,
  showLines: true,
  busStatut: ['en_service', 'en_pause'],
  lignesSelectionnees: [],
  affichageTempsReel: true
};

export const useMapState = ({ 
  initialFilters = {} 
}: UseMapStateProps = {}): UseMapStateReturn => {
  const [mapFilters, setMapFilters] = useState<MapFilter>({
    ...defaultFilters,
    ...initialFilters
  });
  
  const [selectedBus, setSelectedBus] = useState<BusPosition | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const handleBusClick = (bus: BusPosition) => {
    setSelectedBus(bus);
    setSelectedStation(null); // Clear station selection
  };

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
    setSelectedBus(null); // Clear bus selection
  };

  const clearSelection = () => {
    setSelectedBus(null);
    setSelectedStation(null);
  };

  const resetFilters = () => {
    setMapFilters(defaultFilters);
  };

  return {
    mapFilters,
    selectedBus,
    selectedStation,
    setMapFilters,
    setSelectedBus,
    setSelectedStation,
    handleBusClick,
    handleStationClick,
    clearSelection,
    resetFilters
  };
};
