import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Card, Button, Badge, Switch, Select, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';
import { BusPosition, Station, Ligne, MapFilter, Incident } from '../types';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  buses: BusPosition[];
  stations: Station[];
  selectedBus?: BusPosition | null;
  selectedStation?: Station | null;
  onBusClick?: (bus: BusPosition) => void;
  onStationClick?: (station: Station) => void;
  mapFilters: MapFilter;
  onFiltersChange: (filters: MapFilter) => void;
}

// Création des icônes personnalisées
const createBusIcon = (statut: string, ligne: string) => {
  const color = statut === 'en_service' ? '#10b981' : 
               statut === 'en_pause' ? '#f59e0b' : 
               statut === 'hors_service' ? '#ef4444' : '#6b7280';
  
  return L.divIcon({
    className: 'custom-bus-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        🚌
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const createStationIcon = (passagersEnAttente: number) => {
  const color = passagersEnAttente > 10 ? '#ef4444' : 
               passagersEnAttente > 5 ? '#f59e0b' : '#10b981';
  
  return L.divIcon({
    className: 'custom-station-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 28px;
        height: 28px;
        border-radius: 4px;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      ">
        🚏
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

const createIncidentIcon = (severite: string) => {
  const color = severite === 'eleve' ? '#ef4444' : 
               severite === 'moyen' ? '#f59e0b' : '#10b981';
  
  return L.divIcon({
    className: 'custom-incident-icon',
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        animation: pulse 2s infinite;
      ">
        ⚠️
      </div>
      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      </style>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

// Composant pour centrer la carte automatiquement
const MapCenter: React.FC<{ buses: BusPosition[] }> = ({ buses }) => {
  const map = useMap();

  useEffect(() => {
    if (buses.length > 0) {
      const bounds = L.latLngBounds(buses.map(bus => [bus.latitude, bus.longitude]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [buses, map]);

  return null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  buses,
  stations,
  selectedBus,
  selectedStation,
  mapFilters,
  onFiltersChange,
  onBusClick,
  onStationClick
}) => {
  const [selectedLigne, setSelectedLigne] = useState<string>('');

  // Données mockées pour les lignes et incidents (à remplacer par des props dans le futur)
  const lignes: Ligne[] = [];
  const incidents: Incident[] = [];
  const filters = mapFilters;

  // Filtrage des données selon les filtres
  const filteredBuses = useMemo(() => {
    return buses.filter(bus => {
      if (!filters.showBuses) return false;
      if (filters.busStatut.length > 0 && !filters.busStatut.includes(bus.statut)) return false;
      if (filters.lignesSelectionnees.length > 0 && !filters.lignesSelectionnees.includes(bus.ligne)) return false;
      return true;
    });
  }, [buses, filters]);

  const filteredStations = useMemo(() => {
    return stations.filter(station => {
      if (!filters.showStations) return false;
      if (filters.lignesSelectionnees.length > 0) {
        return station.lignes.some(ligne => filters.lignesSelectionnees.includes(ligne));
      }
      return true;
    });
  }, [stations, filters]);

  const filteredLignes = useMemo(() => {
    return lignes.filter(ligne => {
      if (!filters.showLines) return false;
      if (filters.lignesSelectionnees.length > 0 && !filters.lignesSelectionnees.includes(ligne.id)) return false;
      return true;
    });
  }, [lignes, filters]);

  const filteredIncidents = useMemo(() => {
    return incidents.filter(incident => incident.statut === 'actif');
  }, [incidents]);

  // Centre de la carte (Libreville par défaut)
  const defaultCenter: [number, number] = [0.4162, 9.4673];

  return (
    <div className="w-full h-full flex">
      {/* Panneau de filtres */}
      <Card className="w-80 mr-4 p-4 h-fit">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Icon name="Filter" className="w-5 h-5 mr-2" />
              Filtres de la carte
            </h3>
          </div>

          {/* Affichage des éléments */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Bus</span>
              <Switch
                checked={filters.showBuses}
                onChange={(e) => 
                  onFiltersChange({ ...filters, showBuses: e.target.checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Stations</span>
              <Switch
                checked={filters.showStations}
                onChange={(e) => 
                  onFiltersChange({ ...filters, showStations: e.target.checked })
                }
              />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Lignes</span>
              <Switch
                checked={filters.showLines}
                onChange={(e) => 
                  onFiltersChange({ ...filters, showLines: e.target.checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Temps réel</span>
              <Switch
                checked={filters.affichageTempsReel}
                onChange={(e) => 
                  onFiltersChange({ ...filters, affichageTempsReel: e.target.checked })
                }
              />
            </div>
          </div>

          {/* Filtre par statut de bus */}
          {filters.showBuses && (
            <div>
              <label className="text-sm font-medium mb-2 block">Statut des bus</label>
              <div className="space-y-2">
                {['en_service', 'en_pause', 'hors_service', 'maintenance'].map((statut) => (
                  <label key={statut} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filters.busStatut.includes(statut)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onFiltersChange({
                            ...filters,
                            busStatut: [...filters.busStatut, statut]
                          });
                        } else {
                          onFiltersChange({
                            ...filters,
                            busStatut: filters.busStatut.filter(s => s !== statut)
                          });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="capitalize">{statut.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Filtre par ligne */}
          <div>
            <label className="text-sm font-medium mb-2 block">Lignes</label>
            <Select
              options={lignes.map((ligne) => ({
                value: ligne.id,
                label: ligne.nom
              }))}
              value={selectedLigne}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedLigne(value);
                if (value && !filters.lignesSelectionnees.includes(value)) {
                  onFiltersChange({
                    ...filters,
                    lignesSelectionnees: [...filters.lignesSelectionnees, value]
                  });
                }
              }}
              placeholder="Sélectionner une ligne"
            />
            
            {/* Lignes sélectionnées */}
            {filters.lignesSelectionnees.length > 0 && (
              <div className="mt-2 space-y-1">
                {filters.lignesSelectionnees.map((ligneId) => {
                  const ligne = lignes.find(l => l.id === ligneId);
                  return ligne ? (
                    <Badge
                      key={ligneId}
                      variant="soft"
                      className="mr-1 mb-1"
                    >
                      {ligne.nom}
                      <button
                        onClick={() => {
                          onFiltersChange({
                            ...filters,
                            lignesSelectionnees: filters.lignesSelectionnees.filter(id => id !== ligneId)
                          });
                        }}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Bouton de réinitialisation */}
          <Button
            appearance="outline"
            size="sm"
            onClick={() => {
              onFiltersChange({
                showBuses: true,
                showStations: true,
                showLines: true,
                busStatut: ['en_service'],
                lignesSelectionnees: [],
                affichageTempsReel: true
              });
              setSelectedLigne('');
            }}
            className="w-full"
          >
            <Icon name="RotateCcw" className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>

          {/* Légende */}
          <div className="border-t pt-3">
            <h4 className="font-medium text-sm mb-2">Légende</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Bus en service</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span>Bus en pause</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Bus hors service</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Station</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <span>Incident</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Carte */}
      <div className="flex-1 h-96 rounded-lg overflow-hidden border">
        <MapContainer
          center={defaultCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Centre automatique de la carte */}
          <MapCenter buses={filteredBuses} />

          {/* Affichage des bus */}
          {filteredBuses.map((bus) => (
            <Marker
              key={bus.id}
              position={[bus.latitude, bus.longitude]}
              icon={createBusIcon(bus.statut, bus.ligne)}
              eventHandlers={{
                click: () => onBusClick?.(bus),
              }}
            >
              <Popup>
                <div className="p-2 min-w-48">
                  <h3 className="font-semibold text-lg mb-2">Bus {bus.numero}</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Ligne:</strong> {bus.ligne}</p>
                    <p><strong>Statut:</strong> 
                      <Badge 
                        variant={bus.statut === 'en_service' ? 'solid' : 'soft'}
                        className="ml-2"
                      >
                        {bus.statut.replace('_', ' ')}
                      </Badge>
                    </p>
                    <p><strong>Passagers:</strong> {bus.passagers}/{bus.capacite}</p>
                    <p><strong>Vitesse:</strong> {bus.vitesse} km/h</p>
                    <p><strong>Chauffeur:</strong> {bus.chauffeur}</p>
                    <p><strong>Prochain arrêt:</strong> {bus.prochainArret}</p>
                    {bus.retard > 0 && (
                      <p className="text-red-600"><strong>Retard:</strong> {bus.retard} min</p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Affichage des stations */}
          {filteredStations.map((station) => (
            <Marker
              key={station.id}
              position={[station.latitude, station.longitude]}
              icon={createStationIcon(station.passagersEnAttente)}
              eventHandlers={{
                click: () => onStationClick?.(station),
              }}
            >
              <Popup>
                <div className="p-2 min-w-48">
                  <h3 className="font-semibold text-lg mb-2">{station.nom}</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Passagers en attente:</strong> {station.passagersEnAttente}</p>
                    <p><strong>Lignes:</strong> {station.lignes.join(', ')}</p>
                    {station.prochainBus && (
                      <p><strong>Prochain bus:</strong> {station.prochainBus.ligne} - {station.prochainBus.numero} 
                        ({station.prochainBus.tempsArrivee} min)
                      </p>
                    )}
                    <p><strong>Accessibilité:</strong> {station.accessibilite ? '✅' : '❌'}</p>
                    {station.services.length > 0 && (
                      <p><strong>Services:</strong> {station.services.join(', ')}</p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Affichage des lignes (parcours) */}
          {filteredLignes.map((ligne) => (
            <Polyline
              key={ligne.id}
              positions={ligne.parcours.map(point => [point.latitude, point.longitude])}
              color={ligne.couleur}
              weight={4}
              opacity={0.7}
            />
          ))}

          {/* Affichage des incidents */}
          {filteredIncidents.map((incident) => (
            incident.latitude && incident.longitude ? (
              <Marker
                key={incident.id}
                position={[incident.latitude, incident.longitude]}
                icon={createIncidentIcon(incident.severite)}
              >
                <Popup>
                  <div className="p-2 min-w-48">
                    <h3 className="font-semibold text-lg mb-2 text-red-600">Incident</h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>Type:</strong> {incident.type}</p>
                      <p><strong>Sévérité:</strong> 
                        <Badge 
                          variant={incident.severite === 'eleve' ? 'solid' : 'soft'}
                          color={incident.severite === 'eleve' ? ColorsEnum.ERROR : ColorsEnum.WARNING}
                          className="ml-2"
                        >
                          {incident.severite}
                        </Badge>
                      </p>
                      <p><strong>Description:</strong> {incident.description}</p>
                      {incident.ligne && <p><strong>Ligne affectée:</strong> {incident.ligne}</p>}
                      {incident.bus && <p><strong>Bus concerné:</strong> {incident.bus}</p>}
                      <p><strong>Depuis:</strong> {incident.dateDebut.toLocaleTimeString()}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ) : null
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
