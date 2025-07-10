import { useState, useEffect } from 'react';
import { BusPosition, Station, Incident, DashboardStats } from '../types';
import { 
  mockBuses, 
  mockStations, 
  mockIncidents, 
  mockDashboardStats 
} from '../constants';

interface UseRealTimeDataProps {
  enabled: boolean;
  updateInterval?: number;
}

interface UseRealTimeDataReturn {
  buses: BusPosition[];
  stations: Station[];
  incidents: Incident[];
  stats: DashboardStats;
  setBuses: React.Dispatch<React.SetStateAction<BusPosition[]>>;
  setStations: React.Dispatch<React.SetStateAction<Station[]>>;
  setIncidents: React.Dispatch<React.SetStateAction<Incident[]>>;
  setStats: React.Dispatch<React.SetStateAction<DashboardStats>>;
  refreshData: () => void;
}

export const useRealTimeData = ({ 
  enabled, 
  updateInterval = 5000 
}: UseRealTimeDataProps): UseRealTimeDataReturn => {
  const [buses, setBuses] = useState<BusPosition[]>(mockBuses);
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [stats, setStats] = useState<DashboardStats>(mockDashboardStats);

  // Simulation de mise à jour des données en temps réel
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(() => {
      setBuses(prevBuses => 
        prevBuses.map(bus => {
          if (bus.statut === 'en_service') {
            // Simulation de mouvement léger
            const latDiff = (Math.random() - 0.5) * 0.001;
            const lngDiff = (Math.random() - 0.5) * 0.001;
            
            return {
              ...bus,
              latitude: bus.latitude + latDiff,
              longitude: bus.longitude + lngDiff,
              vitesse: Math.max(0, bus.vitesse + (Math.random() - 0.5) * 10),
              passagers: Math.max(0, Math.min(bus.capacite, bus.passagers + Math.floor((Math.random() - 0.5) * 4))),
              derniereMiseAJour: new Date()
            };
          }
          return bus;
        })
      );

      // Mise à jour des stations
      setStations(prevStations =>
        prevStations.map(station => ({
          ...station,
          passagersEnAttente: Math.max(0, station.passagersEnAttente + Math.floor((Math.random() - 0.5) * 4))
        }))
      );

      // Mise à jour des statistiques
      setStats(prevStats => ({
        ...prevStats,
        passagersTotal: Math.max(0, prevStats.passagersTotal + Math.floor((Math.random() - 0.5) * 10)),
        retardMoyen: Math.max(0, prevStats.retardMoyen + (Math.random() - 0.5) * 0.5)
      }));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [enabled, updateInterval]);

  const refreshData = () => {
    setBuses([...mockBuses]);
    setStations([...mockStations]);
    setIncidents([...mockIncidents]);
    setStats({ ...mockDashboardStats });
  };

  return {
    buses,
    stations,
    incidents,
    stats,
    setBuses,
    setStations,
    setIncidents,
    setStats,
    refreshData
  };
};
