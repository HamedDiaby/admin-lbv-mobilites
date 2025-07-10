import React, { useState } from 'react';
import { Text, Button, Icon, Badge, Table, TableColumn, TableAction, Select, Input } from '@components';
import { ColorsEnum } from '@utils/enums';
import { Bus, BusFilters } from './types';
import { Station } from '../stations/types';
import { AddBusModal, BusDetailsModal, BusMap } from './components';
import { useBusData } from './hooks';
import { calculateBusPerformance, formatKilometrage } from './utils';
import { FILTER_OPTIONS } from './constants';

export const Buses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bus' | 'carte'>('bus');
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Couleurs selon le statut
  const STATUS_COLORS = {
    actif: 'green',
    maintenance: 'orange',
    hors_service: 'red',
    en_route: 'blue'
  } as const;
  
  const {
    buses,
    filteredBuses,
    isLoading,
    error,
    refreshData,
    lastUpdate,
    filters,
    setFilters,
    selectedBus,
    setSelectedBus
  } = useBusData({
    refreshInterval: 30000,
    enabled: true
  });

  const performance = calculateBusPerformance(buses);

  // Données simulées des stations (pour l'affectation)
  const stations: Station[] = [
    {
      id: '1',
      name: 'Terminal Libreville',
      code: 'LBV-001',
      cityId: '1',
      cityName: 'Libreville',
      address: 'Centre-ville, Libreville',
      type: 'terminal',
      status: 'active',
      capacity: 200,
      facilities: ['Parking', 'Toilettes', 'Restauration'],
      coordinates: { latitude: 0.4162, longitude: 9.4673 },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    },
    {
      id: '2',
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
    }
  ];

  // Handlers
  const handleBusSelect = (bus: Bus) => {
    setSelectedBus(bus);
    setShowDetailsModal(true);
  };

  const handleBusAdd = (newBusData: any) => {
    // Logique d'ajout de bus
    console.log('Ajout d\'un nouveau bus:', newBusData);
    setShowAddBusModal(false);
    refreshData();
  };

  const handleFilterChange = (key: keyof BusFilters, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  // Configuration des colonnes du tableau
  const columns: TableColumn[] = [
    {
      key: 'numero',
      title: 'N° Bus',
      sortable: true,
      render: (value: any, bus: Bus) => (
        <div className="flex items-center space-x-2">
          <Text className="font-medium">{bus.numero}</Text>
          <Badge 
            color={STATUS_COLORS[bus.statut]}
            variant="soft"
            size="sm"
          >
            {bus.statut}
          </Badge>
        </div>
      )
    },
    {
      key: 'marque',
      title: 'Marque/Modèle',
      sortable: true,
      render: (value: any, bus: Bus) => (
        <div>
          <Text className="font-medium">{bus.marque}</Text>
          <Text variant="p3" className="text-gray-600">{bus.modele} ({bus.annee})</Text>
        </div>
      )
    },
    {
      key: 'capacite',
      title: 'Capacité',
      sortable: true,
      render: (value: any, bus: Bus) => (
        <Badge variant="outline" color="blue">
          {bus.capacite} places
        </Badge>
      )
    },
    {
      key: 'carburant',
      title: 'Carburant',
      sortable: true,
      render: (value: any, bus: Bus) => (
        <Badge 
          color={bus.carburant === 'electrique' ? 'green' : 'gray'}
          variant="soft"
        >
          {bus.carburant}
        </Badge>
      )
    },
    {
      key: 'station',
      title: 'Station',
      sortable: false,
      render: (value: any, bus: Bus) => (
        <Text variant="p3" className="text-gray-600">
          {bus.stationName || 'Non assigné'}
        </Text>
      )
    },
    {
      key: 'scoreEtat',
      title: 'État',
      sortable: true,
      render: (value: any, bus: Bus) => {
        const score = bus.obd2Data.scoreEtat;
        const getHealthColor = (score: number) => {
          if (score >= 90) return 'green';
          if (score >= 70) return 'blue';
          if (score >= 50) return 'orange';
          return 'red';
        };
        
        return (
          <div className="flex items-center space-x-2">
            <Badge 
              color={getHealthColor(score)}
              variant="soft"
            >
              {score}%
            </Badge>
            {bus.obd2Data.alertes.some(alert => alert.type === 'critique' && !alert.resolved) && (
              <Icon name="AlertTriangle" size="sm" color={ColorsEnum.ERROR} />
            )}
          </div>
        );
      }
    },
    {
      key: 'kilometrage',
      title: 'Kilométrage',
      sortable: true,
      render: (value: any, bus: Bus) => (
        <Text variant="p3" className="text-gray-600">
          {formatKilometrage(bus.obd2Data.kilometrage)}
        </Text>
      )
    }
  ];

  // Actions du tableau
  const actions: TableAction[] = [
    {
      label: 'Voir détails',
      icon: 'Eye',
      onClick: (bus: Bus) => handleBusSelect(bus)
    },
    {
      label: 'Modifier',
      icon: 'Edit',
      onClick: (bus: Bus) => console.log('Modifier bus:', bus.id)
    }
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <Text variant="h3" className="text-red-600 mb-4">
            Erreur de chargement
          </Text>
          <Text className="text-red-600 mb-4">{error}</Text>
          <Button onClick={refreshData} appearance="solid" variation="primary">
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <Text variant="h2" className="text-gray-900">
            Gestion de la Flotte
          </Text>
          <Text className="text-gray-600 mt-1">
            Suivi et maintenance des véhicules en temps réel
          </Text>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="soft" color="blue">
            Dernière MAJ: {lastUpdate.toLocaleTimeString()}
          </Badge>
          <Button
            label="Actualiser"
            appearance="outline"
            iconName="RefreshCw"
            onClick={refreshData}
          />
          <Button
            label="Ajouter un bus"
            appearance="solid"
            iconName="Plus"
            onClick={() => setShowAddBusModal(true)}
          />
        </div>
      </div>

      {/* Métriques de performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">Total Bus</Text>
              <Text variant="h3" className="text-2xl font-bold text-gray-900">
                {performance.totalBuses}
              </Text>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              🚌
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">Bus Actifs</Text>
              <Text variant="h3" className="text-2xl font-bold text-green-600">
                {performance.activeBuses}
              </Text>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              ✅
            </div>
          </div>
          <div className="mt-2">
            <Badge 
              color="green"
              variant="soft"
              size="sm"
            >
              {performance.utilizationRate.toFixed(1)}% d'utilisation
            </Badge>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">En Maintenance</Text>
              <Text variant="h3" className="text-2xl font-bold text-orange-600">
                {performance.maintenanceBuses}
              </Text>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              🔧
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">État Moyen</Text>
              <Text variant="h3" className="text-2xl font-bold text-blue-600">
                {performance.averageHealth}%
              </Text>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              💯
            </div>
          </div>
          {performance.criticalAlerts > 0 && (
            <div className="mt-2">
              <Badge 
                color="red"
                variant="soft"
                size="sm"
              >
                {performance.criticalAlerts} alertes critiques
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('bus')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bus'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🚌 Liste des Bus ({filteredBuses.length})
          </button>
          <button
            onClick={() => setActiveTab('carte')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'carte'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🗺️ Carte en Temps Réel
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'bus' && (
        <div className="space-y-6">
          {/* Filtres */}
          <div className="bg-white p-6 rounded-lg border">
            <Text variant="h4" className="text-gray-900 mb-4">Filtres</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Input
                  label="Recherche"
                  placeholder="N° bus, marque, plaque..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  iconName="Search"
                />
              </div>

              <div>
                <Select
                  label="Statut"
                  value={filters.statut}
                  onChange={(e) => handleFilterChange('statut', e.target.value)}
                  options={FILTER_OPTIONS.statuts}
                />
              </div>

              <div>
                <Select
                  label="Carburant"
                  value={filters.carburant}
                  onChange={(e) => handleFilterChange('carburant', e.target.value)}
                  options={FILTER_OPTIONS.carburants}
                />
              </div>

              <div>
                <Select
                  label="Station"
                  value={filters.station}
                  onChange={(e) => handleFilterChange('station', e.target.value)}
                  options={[
                    { value: '', label: 'Toutes les stations' },
                    ...stations.map(station => ({
                      value: station.id,
                      label: station.name
                    }))
                  ]}
                />
              </div>

              <div>
                <Select
                  label="État de Santé"
                  value={filters.etatSante}
                  onChange={(e) => handleFilterChange('etatSante', e.target.value)}
                  options={FILTER_OPTIONS.etatsSante}
                />
              </div>
            </div>
          </div>

          {/* Tableau des bus */}
          <div className="bg-white rounded-lg border">
            <Table
              dataSource={filteredBuses}
              columns={columns}
              actions={actions}
              emptyText="Aucun bus trouvé"
              searchable={false}
            />
          </div>
        </div>
      )}

      {activeTab === 'carte' && (
        <div className="bg-white rounded-lg border">
          <BusMap
            buses={filteredBuses.filter(bus => bus.obd2Data.latitude && bus.obd2Data.longitude)}
            onBusSelect={handleBusSelect}
          />
        </div>
      )}

      {/* Modals */}
      <AddBusModal
        isOpen={showAddBusModal}
        onClose={() => setShowAddBusModal(false)}
        onSave={handleBusAdd}
      />

      <BusDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        bus={selectedBus}
      />
    </div>
  );
};
