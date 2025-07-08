import { FC, useState, useEffect } from "react";
import { Text, Button, Icon, Badge, Table, TableColumn, TableAction, Select } from "@components";
import { ColorsEnum } from "@utils/enums";
import { City, Station, NewCityData, NewStationData } from "./types";
import { AddCityModal } from "./AddCityModal";
import { AddStationModal } from "./AddStationModal";
import { StationMap } from "./StationMap";

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

  // Fonction pour ajouter une ville
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

  // Fonction pour ajouter une station
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

  // Fonction pour formater une date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Fonction pour formater la population
  const formatPopulation = (population?: number): string => {
    if (!population) return 'Non renseigné';
    return population.toLocaleString('fr-FR');
  };

  // Fonction pour obtenir la couleur du badge de statut
  const getStatusBadgeProps = (status: Station['status']) => {
    switch (status) {
      case 'active':
        return { color: ColorsEnum.SUCCESS, text: 'Actif' };
      case 'inactive':
        return { color: ColorsEnum.ERROR, text: 'Inactif' };
      case 'maintenance':
        return { color: ColorsEnum.WARNING, text: 'Maintenance' };
      default:
        return { color: ColorsEnum.TEXT_SECONDARY, text: 'Inconnu' };
    }
  };

  // Fonction pour obtenir la couleur du badge de type
  const getTypeBadgeProps = (type: Station['type']) => {
    switch (type) {
      case 'terminal':
        return { color: ColorsEnum.PRIMARY, text: 'Terminal' };
      case 'arret':
        return { color: ColorsEnum.INFO, text: 'Arrêt' };
      case 'depot':
        return { color: ColorsEnum.WARNING, text: 'Dépôt' };
      default:
        return { color: ColorsEnum.TEXT_SECONDARY, text: 'Inconnu' };
    }
  };

  // Fonction de filtrage des stations
  const filterStations = () => {
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
  };

  // Effet pour filtrer les stations quand les filtres changent
  useEffect(() => {
    filterStations();
  }, [selectedCity, selectedType, selectedStatus, stations]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSelectedCity('');
    setSelectedType('');
    setSelectedStatus('');
  };

  // Actions pour les villes
  const cityActions: TableAction<City>[] = [
    {
      label: 'Voir les stations',
      icon: 'MapPin',
      onClick: (city: City) => {
        setActiveTab('stations');
        console.log('Voir les stations de:', city.name);
      },
      type: 'default'
    },
    {
      label: 'Modifier',
      icon: 'Edit',
      onClick: (city: City) => {
        console.log('Modifier la ville:', city.name);
      },
      type: 'primary'
    },
    {
      label: 'Supprimer',
      icon: 'Trash2',
      onClick: (city: City) => {
        console.log('Supprimer la ville:', city.name);
      },
      type: 'danger'
    }
  ];

  // Actions pour les stations
  const stationActions: TableAction<Station>[] = [
    {
      label: 'Voir le détail',
      icon: 'Eye',
      onClick: (station: Station) => {
        console.log('Voir le détail de:', station.name);
      },
      type: 'default'
    },
    {
      label: 'Modifier',
      icon: 'Edit',
      onClick: (station: Station) => {
        console.log('Modifier la station:', station.name);
      },
      type: 'primary'
    },
    {
      label: 'Dupliquer',
      icon: 'Copy',
      onClick: (station: Station) => {
        console.log('Dupliquer la station:', station.name);
      },
      type: 'success'
    },
    {
      label: 'Désactiver',
      icon: 'Power',
      onClick: (station: Station) => {
        console.log('Désactiver la station:', station.name);
      },
      type: 'warning',
      visible: (station: Station) => station.status === 'active'
    },
    {
      label: 'Activer',
      icon: 'PowerOff',
      onClick: (station: Station) => {
        console.log('Activer la station:', station.name);
      },
      type: 'success',
      visible: (station: Station) => station.status === 'inactive'
    },
    {
      label: 'Supprimer',
      icon: 'Trash2',
      onClick: (station: Station) => {
        console.log('Supprimer la station:', station.name);
      },
      type: 'danger'
    }
  ];

  // Colonnes pour les villes
  const cityColumns: TableColumn<City>[] = [
    {
      key: 'name',
      title: 'Nom de la ville',
      sortable: true,
      render: (value: string, record: City) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={16} color={ColorsEnum.WHITE} />
            </div>
          </div>
          <div>
            <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
              {value}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.province}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'province',
      title: 'Province',
      sortable: true,
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {value}
        </Text>
      )
    },
    {
      key: 'population',
      title: 'Population',
      sortable: true,
      render: (value: number) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {formatPopulation(value)}
        </Text>
      )
    },
    {
      key: 'stations',
      title: 'Stations',
      render: (_, record: City) => {
        const stationCount = stations.filter(s => s.cityId === record.id).length;
        return (
          <Badge color={stationCount > 0 ? ColorsEnum.SUCCESS : ColorsEnum.TEXT_SECONDARY}>
            {stationCount} station{stationCount > 1 ? 's' : ''}
          </Badge>
        );
      }
    },
    {
      key: 'createdAt',
      title: 'Créé le',
      sortable: true,
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
          {formatDate(value)}
        </Text>
      )
    }
  ];

  // Colonnes pour les stations (simplifiées)
  const stationColumns: TableColumn<Station>[] = [
    {
      key: 'name',
      title: 'Nom de la station',
      sortable: true,
      render: (value: string) => (
        <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
          {value}
        </Text>
      )
    },
    {
      key: 'cityName',
      title: 'Ville',
      sortable: true,
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {value}
        </Text>
      )
    },
    {
      key: 'address',
      title: 'Adresse',
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="max-w-xs">
          {value}
        </Text>
      )
    },
    {
      key: 'coordinates',
      title: 'Latitude',
      render: (value: { latitude: number; longitude: number } | undefined) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {value ? value.latitude.toFixed(6) : 'Non définie'}
        </Text>
      )
    },
    {
      key: 'coordinates',
      title: 'Longitude',
      render: (value: { latitude: number; longitude: number } | undefined) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {value ? value.longitude.toFixed(6) : 'Non définie'}
        </Text>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Text variant="h1" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-2xl mb-2">
            Gestion des stations
          </Text>
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="text-base">
            Gérez les villes et stations de transport au Gabon
          </Text>
        </div>
        <Button
          appearance="solid"
          variation="primary"
          size="md"
          iconName={activeTab === 'cities' ? 'MapPin' : 'Plus'}
          iconPosition="left"
        >
          {activeTab === 'cities' ? 'Ajouter une ville' : 'Ajouter une station'}
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon name="MapPin" size={20} color={ColorsEnum.PRIMARY} />
            </div>
            <div className="ml-3">
              <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                Villes
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {cities.length}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon name="Bus" size={20} color={ColorsEnum.SUCCESS} />
            </div>
            <div className="ml-3">
              <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                Stations
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {stations.length}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Icon name="CheckCircle" size={20} color={ColorsEnum.SUCCESS} />
            </div>
            <div className="ml-3">
              <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                Actives
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {stations.filter(s => s.status === 'active').length}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Icon name="AlertTriangle" size={20} color={ColorsEnum.WARNING} />
            </div>
            <div className="ml-3">
              <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                Maintenance
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {stations.filter(s => s.status === 'maintenance').length}
              </Text>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('cities')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'cities'
                ? 'border-green text-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon name="MapPin" size={16} className="mr-2 inline" />
            Villes ({cities.length})
          </button>
          <button
            onClick={() => setActiveTab('stations')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'stations'
                ? 'border-green text-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon name="Bus" size={16} className="mr-2 inline" />
            Stations ({stations.length})
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'map'
                ? 'border-green text-green'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon name="Map" size={16} className="mr-2 inline" />
            Carte
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'cities' ? (
        <Table
          dataSource={cities}
          columns={cityColumns}
          actions={cityActions}
          rowKey="id"
          pagination={true}
          pageSize={8}
          searchable={true}
          searchPlaceholder="Rechercher par nom de ville ou province..."
          striped={true}
          bordered={true}
          title="Liste des villes"
          subtitle={`${cities.length} villes au Gabon`}
          onAdd={() => setShowAddCityModal(true)}
          addButtonText="Ajouter une ville"
        />
      ) : activeTab === 'stations' ? (
        <div className="space-y-4">
          {/* Filtres */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
                Filtres
              </Text>
              <Button
                appearance="outline"
                variation="secondary"
                size="sm"
                onClick={resetFilters}
                iconName="X"
              >
                Réinitialiser
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtre par ville */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Toutes les villes</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtre par type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tous les types</option>
                  <option value="terminal">Terminal</option>
                  <option value="arret">Arrêt</option>
                  <option value="depot">Dépôt</option>
                </select>
              </div>

              {/* Filtre par statut */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tableau des stations */}
          <Table
            dataSource={filteredStations}
            columns={stationColumns}
            actions={stationActions}
            rowKey="id"
            pagination={true}
            pageSize={8}
            searchable={true}
            searchPlaceholder="Rechercher par nom de station, ville ou adresse..."
            striped={true}
            bordered={true}
            title="Liste des stations"
            subtitle={`${filteredStations.length} stations affichées sur ${stations.length} au total`}
            onAdd={() => setShowAddStationModal(true)}
            addButtonText="Ajouter une station"
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
