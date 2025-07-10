import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './StationMap.css';
import { Station, City } from '../types';
import { Text, Select, Button } from '@components';
import { ColorsEnum } from '@utils/enums';

// Configuration des icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Coordonnées du centre du Gabon
const GABON_CENTER: [number, number] = [0.0, 11.0];
const GABON_ZOOM = 6;

// Composant pour ajuster la vue de la carte
const MapController: React.FC<{ stations: Station[] }> = ({ stations }) => {
  const map = useMap();
  
  useEffect(() => {
    if (stations.length > 0) {
      const validStations = stations.filter(station => station.coordinates);
      if (validStations.length > 0) {
        const bounds = L.latLngBounds(
          validStations.map(station => [
            station.coordinates!.latitude,
            station.coordinates!.longitude
          ])
        );
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    }
  }, [stations, map]);

  return null;
};

interface StationMapProps {
  stations: Station[];
  cities: City[];
  onStationClick?: (station: Station) => void;
}

export const StationMap: React.FC<StationMapProps> = ({ 
  stations, 
  cities, 
  onStationClick 
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [filteredStations, setFilteredStations] = useState<Station[]>(stations);

  // Filtrer les stations par ville
  useEffect(() => {
    if (selectedCity) {
      setFilteredStations(stations.filter(station => station.cityId === selectedCity));
    } else {
      setFilteredStations(stations);
    }
  }, [selectedCity, stations]);

  // Créer des icônes personnalisées pour chaque type de station
  const createStationIcon = (type: Station['type']) => {
    const iconColors = {
      terminal: '#10b981', // Vert
      arret: '#3b82f6',    // Bleu
      depot: '#f59e0b'     // Orange
    };

    return L.divIcon({
      html: `
        <div style="
          background-color: ${iconColors[type]};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      className: 'custom-station-icon',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      popupAnchor: [0, -10]
    });
  };

  // Réinitialiser le filtre
  const resetFilter = () => {
    setSelectedCity('');
  };

  // Stations avec coordonnées valides
  const validStations = filteredStations.filter(station => 
    station.coordinates && 
    station.coordinates.latitude && 
    station.coordinates.longitude
  );

  return (
    <div className="space-y-4">
      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
            Filtre par ville
          </Text>
          <Button
            appearance="outline"
            variation="secondary"
            size="sm"
            onClick={resetFilter}
            iconName="X"
          >
            Tout afficher
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select
              placeholder="Sélectionnez une ville"
              options={cities.map(city => ({ value: city.id, label: city.name }))}
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              fullWidth
            />
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Terminal</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Arrêt</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow"></div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Dépôt</Text>
            </div>
          </div>
        </div>
      </div>

      {/* Informations */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center">
          <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY}>
            <strong>{validStations.length}</strong> stations avec coordonnées GPS affichées
            {selectedCity && (
              <span className="text-blue-600 ml-2">
                (filtrées par ville)
              </span>
            )}
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
            {filteredStations.length - validStations.length} stations sans coordonnées
          </Text>
        </div>
      </div>

      {/* Carte */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div style={{ height: '600px', width: '100%' }}>
          <MapContainer
            center={GABON_CENTER}
            zoom={GABON_ZOOM}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {validStations.length > 0 && (
              <MapController stations={validStations} />
            )}
            
            {validStations.map((station) => (
              <Marker
                key={station.id}
                position={[station.coordinates!.latitude, station.coordinates!.longitude]}
                icon={createStationIcon(station.type)}
                eventHandlers={{
                  click: () => onStationClick?.(station)
                }}
              >
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-1">
                      {station.name}
                    </Text>
                    <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mb-1">
                      {station.cityName}
                    </Text>
                    <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="mb-2">
                      {station.address}
                    </Text>
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          station.type === 'terminal' ? 'bg-green-500' :
                          station.type === 'arret' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}></div>
                        <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                          {station.type === 'terminal' ? 'Terminal' :
                           station.type === 'arret' ? 'Arrêt' : 'Dépôt'}
                        </Text>
                      </div>
                      <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                        {station.coordinates!.latitude.toFixed(4)}, {station.coordinates!.longitude.toFixed(4)}
                      </Text>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
