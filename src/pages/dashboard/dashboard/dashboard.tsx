import React, { useState, useEffect } from "react";
import { StatsOverview } from "./StatsOverview";
import { InteractiveMap } from "./InteractiveMap";
import { AlertsPanel } from "./AlertsPanel";
import { RealTimeInfo } from "./RealTimeInfo";
import { Card } from "../../../components/card";
import { Button } from "../../../components/button";
import { Icon } from "../../../components/icon";
import { Badge } from "../../../components/badge";
import { BusPosition, Station, Ligne, MapFilter, Incident } from "./types";
import { 
  mockBuses, 
  mockStations, 
  mockLignes, 
  mockIncidents, 
  mockDashboardStats 
} from "./mockData";
import { ColorsEnum } from "../../../utils/enums";
import "./Dashboard.css";

export const Dashboard: React.FC = () => {
  // États pour les données en temps réel
  const [buses, setBuses] = useState<BusPosition[]>(mockBuses);
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [lignes, setLignes] = useState<Ligne[]>(mockLignes);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [stats, setStats] = useState(mockDashboardStats);
  
  // États pour la carte
  const [mapFilters, setMapFilters] = useState<MapFilter>({
    showBuses: true,
    showStations: true,
    showLines: true,
    busStatut: ['en_service', 'en_pause'],
    lignesSelectionnees: [],
    affichageTempsReel: true
  });

  // État pour le bus sélectionné
  const [selectedBus, setSelectedBus] = useState<BusPosition | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  // Simulation de mise à jour des données en temps réel
  useEffect(() => {
    if (!mapFilters.affichageTempsReel) return;

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
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, [mapFilters.affichageTempsReel]);

  // Gestion des événements de la carte
  const handleBusClick = (bus: BusPosition) => {
    setSelectedBus(bus);
  };

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
  };

  const handleIncidentResolve = (incidentId: string) => {
    setIncidents(prev => 
      prev.map(incident => 
        incident.id === incidentId 
          ? { ...incident, statut: 'resolu' as const, dateFin: new Date() }
          : incident
      )
    );
  };

  const handleRefreshData = () => {
    // Simulation de rechargement des données
    setBuses([...mockBuses]);
    setStations([...mockStations]);
    setLignes([...mockLignes]);
    setIncidents([...mockIncidents]);
    setStats({ ...mockDashboardStats });
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête du dashboard */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Transport</h1>
          <p className="text-gray-600 mt-1">
            Vue d'ensemble en temps réel du système de transport LBV Mobilités
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge 
            variant="solid" 
            color={incidents.filter(i => i.statut === 'actif').length > 0 ? ColorsEnum.ERROR : ColorsEnum.SUCCESS}
          >
            {incidents.filter(i => i.statut === 'actif').length === 0 ? 'Système Normal' : `${incidents.filter(i => i.statut === 'actif').length} Incident(s)`}
          </Badge>
          
          <Button
            appearance="outline"
            onClick={handleRefreshData}
            iconName="RefreshCw"
          >
            Actualiser
          </Button>
        </div>
      </div>

      {/* Statistiques générales */}
      <StatsOverview stats={stats} />

      {/* Section principale avec carte et informations */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Carte interactive (3/4 de la largeur) */}
        <div className="xl:col-span-3">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Icon name="Map" className="mr-2" size={24} />
                Carte Interactive en Temps Réel
              </h2>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={mapFilters.affichageTempsReel ? 'solid' : 'soft'}
                  color={mapFilters.affichageTempsReel ? ColorsEnum.SUCCESS : ColorsEnum.GRAY_500}
                >
                  {mapFilters.affichageTempsReel ? 'Temps Réel Actif' : 'Mode Statique'}
                </Badge>
                <span className="text-sm text-gray-500">
                  {buses.filter(b => b.statut === 'en_service').length} bus actifs
                </span>
              </div>
            </div>
            
            <div className="h-96">
              <InteractiveMap
                buses={buses}
                stations={stations}
                lignes={lignes}
                incidents={incidents}
                filters={mapFilters}
                onFiltersChange={setMapFilters}
                onBusClick={handleBusClick}
                onStationClick={handleStationClick}
              />
            </div>
          </Card>
        </div>

        {/* Panneau latéral d'informations (1/4 de la largeur) */}
        <div className="space-y-4">
          {/* Informations temps réel */}
          <RealTimeInfo buses={buses} stations={stations} />
          
          {/* Alertes et incidents */}
          <AlertsPanel 
            incidents={incidents} 
            onIncidentResolve={handleIncidentResolve}
          />
        </div>
      </div>

      {/* Section des détails sélectionnés */}
      {(selectedBus || selectedStation) && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Détails Sélectionnés</h3>
            <Button
              appearance="clear"
              size="sm"
              onClick={() => {
                setSelectedBus(null);
                setSelectedStation(null);
              }}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {selectedBus && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Bus</label>
                <p className="text-lg font-semibold">{selectedBus.numero}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Ligne</label>
                <p className="text-lg font-semibold">{selectedBus.ligne}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Passagers</label>
                <p className="text-lg font-semibold">{selectedBus.passagers}/{selectedBus.capacite}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Vitesse</label>
                <p className="text-lg font-semibold">{selectedBus.vitesse} km/h</p>
              </div>
            </div>
          )}

          {selectedStation && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Station</label>
                <p className="text-lg font-semibold">{selectedStation.nom}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">En attente</label>
                <p className="text-lg font-semibold">{selectedStation.passagersEnAttente} passagers</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Lignes desservies</label>
                <p className="text-lg font-semibold">{selectedStation.lignes.join(', ')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Prochain bus</label>
                <p className="text-lg font-semibold">
                  {selectedStation.prochainBus 
                    ? `${selectedStation.prochainBus.numero} (${selectedStation.prochainBus.tempsArrivee} min)`
                    : 'Aucun'
                  }
                </p>
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Section de raccourcis rapides */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Icon name="Zap" className="mr-2" size={20} />
          Actions Rapides
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <Button appearance="outline" size="sm" iconName="Plus">
            Nouveau Bus
          </Button>
          <Button appearance="outline" size="sm" iconName="MapPin">
            Nouvelle Station
          </Button>
          <Button appearance="outline" size="sm" iconName="Route">
            Nouvelle Ligne
          </Button>
          <Button appearance="outline" size="sm" iconName="Calendar">
            Planifier
          </Button>
          <Button appearance="outline" size="sm" iconName="FileText">
            Rapport
          </Button>
          <Button appearance="outline" size="sm" iconName="Settings">
            Paramètres
          </Button>
        </div>
      </Card>
    </div>
  );
};