import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LignesMap.css';
import { Ligne, Ville } from './types';

// Fix pour les icônes Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icônes personnalisées pour les stations
const createStationIcon = (type: 'depart' | 'intermediaire' | 'arrivee') => {
  const colors = {
    depart: '#10b981',
    intermediaire: '#6b7280',
    arrivee: '#ef4444'
  };
  
  return L.divIcon({
    className: 'custom-station-marker',
    html: `<div style="
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${colors[type]};
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

interface LignesMapProps {
  lignes: Ligne[];
}

const LignesMap: React.FC<LignesMapProps> = ({ lignes }) => {
  const [selectedVille, setSelectedVille] = useState<string>('');
  const [selectedStatuts, setSelectedStatuts] = useState<string[]>(['Active', 'Inactive', 'Maintenance']);

  // Coordonnées par défaut pour Libreville
  const defaultCenter: [number, number] = [0.4162, 9.4673];
  const defaultZoom = 12;

  // Mock data pour les villes avec leurs coordonnées
  const villes: Ville[] = [
    { id: '1', nom: 'Libreville', coordonnees: { lat: 0.4162, lng: 9.4673 } },
    { id: '2', nom: 'Port-Gentil', coordonnees: { lat: -0.7193, lng: 8.7815 } },
    { id: '3', nom: 'Franceville', coordonnees: { lat: -1.6333, lng: 13.5833 } },
    { id: '4', nom: 'Oyem', coordonnees: { lat: 1.5993, lng: 11.5804 } },
    { id: '5', nom: 'Moanda', coordonnees: { lat: -1.5667, lng: 13.2167 } }
  ];

  // Couleurs des lignes selon leur statut
  const getLineColor = (statut: string): string => {
    switch (statut) {
      case 'Active':
        return '#3b82f6';
      case 'Inactive':
        return '#f59e0b';
      case 'Maintenance':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  // Filtrer les lignes selon les critères sélectionnés
  const filteredLignes = useMemo(() => {
    return lignes.filter(ligne => {
      const villeMatch = !selectedVille || ligne.ville.id === selectedVille;
      const statutMatch = selectedStatuts.includes(ligne.statut);
      return villeMatch && statutMatch;
    });
  }, [lignes, selectedVille, selectedStatuts]);

  // Générer des coordonnées factices pour les stations si elles n'existent pas
  const generateStationCoordinates = (ligne: Ligne): Array<[number, number]> => {
    const baseVille = villes.find(v => v.id === ligne.ville.id);
    if (!baseVille) return [];

    const { lat: baseLat, lng: baseLng } = baseVille.coordonnees;
    const coordinates: Array<[number, number]> = [];
    
    // Station de départ
    coordinates.push([baseLat, baseLng]);
    
    // Stations intermédiaires
    ligne.stationsIntermediaires.forEach((_, index) => {
      const offset = (index + 1) * 0.005; // 0.005 degrés de décalage
      const angle = (index * 60) * (Math.PI / 180); // Répartition circulaire
      const newLat = baseLat + Math.cos(angle) * offset;
      const newLng = baseLng + Math.sin(angle) * offset;
      coordinates.push([newLat, newLng]);
    });
    
    // Station d'arrivée
    const finalOffset = 0.01;
    coordinates.push([baseLat + finalOffset, baseLng + finalOffset]);
    
    return coordinates;
  };

  // Gérer les changements de statut
  const handleStatutChange = (statut: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuts(prev => [...prev, statut]);
    } else {
      setSelectedStatuts(prev => prev.filter(s => s !== statut));
    }
  };

  return (
    <div>
      {/* Contrôles de filtrage */}
      <div className="filter-controls">
        <div className="filter-row">
          <div className="filter-group">
            <label className="filter-label">Ville :</label>
            <select
              className="ville-filter"
              value={selectedVille}
              onChange={(e) => setSelectedVille(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: 'white',
                minWidth: '200px'
              }}
            >
              <option value="">Toutes les villes</option>
              {villes.map(ville => (
                <option key={ville.id} value={ville.id}>
                  {ville.nom}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Statut :</label>
            <div className="statut-filters">
              {['Active', 'Inactive', 'Maintenance'].map(statut => (
                <label key={statut} className="statut-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedStatuts.includes(statut)}
                    onChange={(e) => handleStatutChange(statut, e.target.checked)}
                  />
                  {statut}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Carte */}
      <div className="lignes-map-container">
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          scrollWheelZoom={true}
          className="leaflet-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredLignes.map(ligne => {
            const coordinates = generateStationCoordinates(ligne);
            const lineColor = getLineColor(ligne.statut);
            
            return (
              <React.Fragment key={ligne.id}>
                {/* Ligne de trajet */}
                {coordinates.length > 1 && (
                  <Polyline
                    positions={coordinates}
                    color={lineColor}
                    weight={4}
                    opacity={0.8}
                  />
                )}
                
                {/* Markers pour les stations */}
                {coordinates.map((coord, index) => {
                  let stationType: 'depart' | 'intermediaire' | 'arrivee';
                  let stationNom: string;
                  
                  if (index === 0) {
                    stationType = 'depart';
                    stationNom = ligne.stationDepart.nom;
                  } else if (index === coordinates.length - 1) {
                    stationType = 'arrivee';
                    stationNom = ligne.stationArrivee.nom;
                  } else {
                    stationType = 'intermediaire';
                    stationNom = ligne.stationsIntermediaires[index - 1]?.nomStation || `Station ${index}`;
                  }
                  
                  return (
                    <Marker
                      key={`${ligne.id}-station-${index}`}
                      position={coord}
                      icon={createStationIcon(stationType)}
                    >
                      <Popup className="ligne-popup">
                        <div>
                          <h3>Ligne {ligne.numero}</h3>
                          <div className="ligne-popup-content">
                            <div className="ligne-popup-row">
                              <span className="ligne-popup-label">Station:</span>
                              <span className="ligne-popup-value">{stationNom}</span>
                            </div>
                            <div className="ligne-popup-row">
                              <span className="ligne-popup-label">Type:</span>
                              <span className="ligne-popup-value">
                                {stationType === 'depart' ? 'Départ' : 
                                 stationType === 'arrivee' ? 'Arrivée' : 'Intermédiaire'}
                              </span>
                            </div>
                            <div className="ligne-popup-row">
                              <span className="ligne-popup-label">Ville:</span>
                              <span className="ligne-popup-value">{ligne.ville.nom}</span>
                            </div>
                            <div className="ligne-popup-row">
                              <span className="ligne-popup-label">Statut:</span>
                              <span className="ligne-popup-value">{ligne.statut}</span>
                            </div>
                            <div className="ligne-popup-row">
                              <span className="ligne-popup-label">Distance totale:</span>
                              <span className="ligne-popup-value">{ligne.distanceTotale} km</span>
                            </div>
                            <div className="ligne-popup-row">
                              <span className="ligne-popup-label">Temps total:</span>
                              <span className="ligne-popup-value">{ligne.tempsTotal} min</span>
                            </div>
                            
                            {ligne.stationsIntermediaires.length > 0 && (
                              <div className="ligne-popup-stations">
                                <div style={{ fontWeight: 600, marginBottom: 4, fontSize: 12 }}>
                                  Stations intermédiaires:
                                </div>
                                {ligne.stationsIntermediaires.map((station, idx) => (
                                  <div key={idx} className="ligne-popup-station">
                                    <div className="station-marker station-intermediaire"></div>
                                    <span>{station.nomStation}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      {/* Légende */}
      <div className="legend">
        <div className="legend-title">Légende des lignes</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color ligne-active"></div>
            <span>Ligne Active</span>
          </div>
          <div className="legend-item">
            <div className="legend-color ligne-inactive"></div>
            <span>Ligne Inactive</span>
          </div>
          <div className="legend-item">
            <div className="legend-color ligne-maintenance"></div>
            <span>Ligne en Maintenance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LignesMap;
