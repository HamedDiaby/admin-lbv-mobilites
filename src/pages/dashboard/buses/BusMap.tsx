import { FC, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon as LeafletIcon, LatLngBounds } from 'leaflet';
import { Text, Badge, Button } from '@components';
import { ColorsEnum } from '@utils/enums';
import { Bus } from './types';
import 'leaflet/dist/leaflet.css';
import './BusMap.css';

// Configuration des icônes pour les bus
const createBusIcon = (statut: Bus['statut']) => {
  const getColor = () => {
    switch (statut) {
      case 'actif': return '#22c55e'; // vert
      case 'en_route': return '#3b82f6'; // bleu
      case 'maintenance': return '#f59e0b'; // orange
      case 'hors_service': return '#ef4444'; // rouge
      default: return '#6b7280'; // gris
    }
  };

  const color = getColor();
  
  return new LeafletIcon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="12" fill="${color}" stroke="#ffffff" stroke-width="2"/>
        <rect x="9" y="10" width="12" height="8" fill="white" rx="1"/>
        <rect x="10" y="11" width="10" height="6" fill="${color}" rx="0.5"/>
        <rect x="10" y="11" width="4" height="2" fill="white" rx="0.5"/>
        <rect x="16" y="11" width="4" height="2" fill="white" rx="0.5"/>
        <circle cx="12" cy="19" r="1" fill="white"/>
        <circle cx="18" cy="19" r="1" fill="white"/>
      </svg>
    `)}`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

// Composant pour ajuster la vue de la carte
const MapBounds: FC<{ buses: Bus[] }> = ({ buses }) => {
  const map = useMap();

  useEffect(() => {
    if (buses.length > 0) {
      const busesWithLocation = buses.filter(bus => 
        bus.obd2Data.latitude && bus.obd2Data.longitude
      );

      if (busesWithLocation.length > 0) {
        const bounds = new LatLngBounds(
          busesWithLocation.map(bus => [
            bus.obd2Data.latitude!,
            bus.obd2Data.longitude!
          ])
        );
        
        // Ajouter un padding autour des marqueurs
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    } else {
      // Vue par défaut sur Libreville, Gabon
      map.setView([-0.3976, 9.4547], 11);
    }
  }, [buses, map]);

  return null;
};

interface BusMapProps {
  buses: Bus[];
  onBusSelect?: (bus: Bus) => void;
}

export const BusMap: FC<BusMapProps> = ({ buses, onBusSelect }) => {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);

  // Générer des positions aléatoires pour les bus qui n'en ont pas
  const busesWithLocations = buses.map(bus => {
    if (!bus.obd2Data.latitude || !bus.obd2Data.longitude) {
      // Positions aléatoires autour de Libreville
      const baseLat = -0.3976;
      const baseLng = 9.4547;
      const randomLat = baseLat + (Math.random() - 0.5) * 0.1; // ±0.05 degrés
      const randomLng = baseLng + (Math.random() - 0.5) * 0.1; // ±0.05 degrés
      
      return {
        ...bus,
        obd2Data: {
          ...bus.obd2Data,
          latitude: randomLat,
          longitude: randomLng
        }
      };
    }
    return bus;
  });

  const handleBusClick = (bus: Bus) => {
    setSelectedBus(bus);
    if (onBusSelect) {
      onBusSelect(bus);
    }
  };

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[-0.3976, 9.4547]} // Libreville, Gabon
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapBounds buses={busesWithLocations} />
        
        {busesWithLocations.map((bus) => (
          <Marker
            key={bus.id}
            position={[bus.obd2Data.latitude!, bus.obd2Data.longitude!]}
            icon={createBusIcon(bus.statut)}
            eventHandlers={{
              click: () => handleBusClick(bus)
            }}
          >
            <Popup>
              <div className="p-2 min-w-48">
                <div className="flex items-center justify-between mb-2">
                  <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
                    Bus {bus.numero}
                  </Text>
                  <Badge
                    color={
                      bus.statut === 'actif' ? ColorsEnum.SUCCESS :
                      bus.statut === 'en_route' ? ColorsEnum.INFO :
                      bus.statut === 'maintenance' ? ColorsEnum.WARNING :
                      ColorsEnum.ERROR
                    }
                  >
                    {bus.statut}
                  </Badge>
                </div>
                
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between">
                    <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Plaque:</Text>
                    <Text variant="p5" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                      {bus.plaqueImmatriculation}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Vitesse:</Text>
                    <Text variant="p5" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                      {bus.obd2Data.vitesse} km/h
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Carburant:</Text>
                    <Text variant="p5" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                      {bus.obd2Data.niveauCarburant}%
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Score santé:</Text>
                    <Badge
                      color={
                        bus.obd2Data.scoreEtat >= 80 ? ColorsEnum.SUCCESS :
                        bus.obd2Data.scoreEtat >= 60 ? ColorsEnum.WARNING :
                        ColorsEnum.ERROR
                      }
                    >
                      {bus.obd2Data.scoreEtat}/100
                    </Badge>
                  </div>
                </div>
                
                {onBusSelect && (
                  <Button
                    appearance="solid"
                    variation="primary"
                    size="sm"
                    onClick={() => onBusSelect(bus)}
                    iconName="Eye"
                    iconPosition="left"
                    className="w-full"
                  >
                    Voir détails
                  </Button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Légende */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-3 z-10">
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-2">
          Statut des bus
        </Text>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Actif</Text>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>En route</Text>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Maintenance</Text>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>Hors service</Text>
          </div>
        </div>
      </div>
      
      {/* Informations du bus sélectionné */}
      {selectedBus && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 z-10 max-w-xs">
          <div className="flex items-center justify-between mb-2">
            <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
              Bus {selectedBus.numero}
            </Text>
            <Button
              appearance="clear"
              variation="secondary"
              size="sm"
              onClick={() => setSelectedBus(null)}
              iconName="X"
            />
          </div>
          <div className="space-y-1">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Position: {selectedBus.obd2Data.latitude?.toFixed(4)}, {selectedBus.obd2Data.longitude?.toFixed(4)}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Dernière maj: {new Date(selectedBus.obd2Data.lastUpdate).toLocaleTimeString()}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};
