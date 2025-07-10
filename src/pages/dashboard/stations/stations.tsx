import { FC, useState, useEffect, useCallback } from "react";
import { City, Station, NewCityData, NewStationData } from "./types";
import { 
  AddCityModal, 
  AddStationModal, 
  StationMap, 
  StationHeader,
  StationStats,
  StationTabs,
  StationFilters,
  CitiesTable,
  StationsTable
} from "./components";

export const Stations: FC = () => {
  const [activeTab, setActiveTab] = useState<'cities' | 'stations' | 'map'>('cities');
  const [showAddCityModal, setShowAddCityModal] = useState(false);
  const [showAddStationModal, setShowAddStationModal] = useState(false);
  
  // États pour les filtres
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  // Données simulées des villes du Gabon
  const [cities, setCities] = useState<City[]>([
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
    },
    {
      id: '4',
      name: 'Oyem',
      province: 'Woleu-Ntem',
      population: 60685,
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    },
    {
      id: '5',
      name: 'Moanda',
      province: 'Haut-Ogooué',
      population: 42997,
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    }
  ]);

  // Données simulées des stations
  const [stations, setStations] = useState<Station[]>([
    {
      id: '1',
      name: 'Gare Routière de Libreville',
      code: 'LBV-001',
      cityId: '1',
      cityName: 'Libreville',
      address: 'Avenue Bouët, Libreville',
      type: 'terminal',
      status: 'active',
      capacity: 200,
      facilities: ['Parking', 'Toilettes', 'Boutiques', 'WiFi'],
      coordinates: { latitude: 0.4162, longitude: 9.4673 },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    },
    {
      id: '2',
      name: 'Station Akanda',
      code: 'LBV-002',
      cityId: '1',
      cityName: 'Libreville',
      address: 'Route d\'Akanda, Libreville',
      type: 'arret',
      status: 'active',
      capacity: 50,
      facilities: ['Abri', 'Éclairage'],
      coordinates: { latitude: 0.4532, longitude: 9.4241 },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    },
    {
      id: '3',
      name: 'Terminal Port-Gentil',
      code: 'PG-001',
      cityId: '2',
      cityName: 'Port-Gentil',
      address: 'Boulevard Bessieux, Port-Gentil',
      type: 'terminal',
      status: 'active',
      capacity: 150,
      facilities: ['Parking', 'Toilettes', 'Restauration'],
      coordinates: { latitude: -0.7193, longitude: 8.7815 },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    },
    {
      id: '4',
      name: 'Dépôt Franceville',
      code: 'FV-001',
      cityId: '3',
      cityName: 'Franceville',
      address: 'Zone industrielle, Franceville',
      type: 'depot',
      status: 'maintenance',
      capacity: 100,
      facilities: ['Atelier', 'Parking', 'Carburant'],
      coordinates: { latitude: -1.6332, longitude: 13.5833 },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    }
  ]);

  // Handlers
  const handleAddCity = (cityData: NewCityData) => {
    const newCity: City = {
      id: Date.now().toString(),
      name: cityData.name,
      province: cityData.province,
      population: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCities(prev => [...prev, newCity]);
    setShowAddCityModal(false);
  };

  const handleAddStation = (stationData: NewStationData) => {
    const city = cities.find(c => c.id === stationData.cityId);
    const newStation: Station = {
      id: Date.now().toString(),
      name: stationData.name,
      code: `${city?.name.substring(0, 2).toUpperCase()}-${String(stations.length + 1).padStart(3, '0')}`,
      cityId: stationData.cityId,
      cityName: city?.name || '',
      address: stationData.address,
      type: 'arret',
      status: 'active',
      capacity: undefined,
      facilities: [],
      coordinates: stationData.latitude && stationData.longitude ? {
        latitude: stationData.latitude,
        longitude: stationData.longitude
      } : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setStations(prev => [...prev, newStation]);
    setShowAddStationModal(false);
  };

  const resetFilters = () => {
    setSelectedCity('');
    setSelectedType('');
    setSelectedStatus('');
  };

  const handleViewStations = (city: City) => {
    setActiveTab('stations');
    setSelectedCity(city.id);
  };

  const handleAddButtonClick = () => {
    if (activeTab === 'cities') {
      setShowAddCityModal(true);
    } else {
      setShowAddStationModal(true);
    }
  };

  // Filtrage des stations
  const filterStations = useCallback(() => {
    let filtered = stations;

    if (selectedCity) {
      filtered = filtered.filter(station => station.cityId === selectedCity);
    }

    if (selectedType) {
      filtered = filtered.filter(station => station.type === selectedType);
    }

    if (selectedStatus) {
      filtered = filtered.filter(station => station.status === selectedStatus);
    }

    setFilteredStations(filtered);
  }, [selectedCity, selectedType, selectedStatus, stations]);

  useEffect(() => {
    filterStations();
  }, [filterStations]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <StationHeader 
        activeTab={activeTab} 
        onAddClick={handleAddButtonClick} 
      />

      {/* Statistiques */}
      <StationStats 
        cities={cities} 
        stations={stations} 
      />

      {/* Onglets */}
      <StationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cities={cities}
        stations={stations}
      />

      {/* Contenu des onglets */}
      {activeTab === 'cities' ? (
        <CitiesTable
          cities={cities}
          stations={stations}
          onAddCity={() => setShowAddCityModal(true)}
          onViewStations={handleViewStations}
        />
      ) : activeTab === 'stations' ? (
        <div className="space-y-4">
          {/* Filtres */}
          <StationFilters
            selectedCity={selectedCity}
            selectedType={selectedType}
            selectedStatus={selectedStatus}
            cities={cities}
            onCityChange={setSelectedCity}
            onTypeChange={setSelectedType}
            onStatusChange={setSelectedStatus}
            onResetFilters={resetFilters}
          />

          {/* Tableau des stations */}
          <StationsTable
            stations={stations}
            filteredStations={filteredStations}
            onAddStation={() => setShowAddStationModal(true)}
          />
        </div>
      ) : (
        <StationMap
          stations={stations}
          cities={cities}
          onStationClick={(station) => {
            console.log('Station cliquée:', station);
          }}
        />
      )}

      {/* Modals */}
      <AddCityModal
        isOpen={showAddCityModal}
        onClose={() => setShowAddCityModal(false)}
        onSave={handleAddCity}
      />
      
      <AddStationModal
        isOpen={showAddStationModal}
        onClose={() => setShowAddStationModal(false)}
        onSave={handleAddStation}
        cities={cities}
      />
    </div>
  );
};
