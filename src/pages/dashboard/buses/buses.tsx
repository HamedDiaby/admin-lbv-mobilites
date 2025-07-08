import { FC, useState, useEffect } from "react";
import { Text, Button, Icon, Badge, Table, TableColumn, TableAction } from "@components";
import { ColorsEnum } from "@utils/enums";
import { Bus, NewBusData, BusFilters, OBD2Data } from "./types";
import { Station } from "../stations/types";
import { AddBusModal } from "./AddBusModal";
import { BusDetailsModal } from "./BusDetailsModal";

export const Buses: FC = () => {
  const [showAddBusModal, setShowAddBusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  
  // États pour les filtres
  const [filters, setFilters] = useState<BusFilters>({
    statut: '',
    carburant: '',
    station: '',
    etatSante: ''
  });
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);

  // Données simulées des stations (pour l'affectation)
  const [stations] = useState<Station[]>([
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
  ]);

  // Données simulées des bus avec données OBD2
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: '1',
      numero: 'LBV-001',
      capacite: 45,
      carburant: 'diesel',
      plaqueImmatriculation: 'AB-123-CD',
      marque: 'Mercedes',
      modele: 'Citaro',
      annee: 2022,
      couleur: 'Bleu',
      statut: 'actif',
      stationId: '1',
      stationName: 'Terminal Libreville',
      obd2Data: {
        vitesse: 32,
        rpm: 1800,
        temperatureMoteur: 88,
        pressionHuile: 2.5,
        niveauCarburant: 75,
        consommationInstantanee: 8.5,
        kilometrage: 45230,
        heuresMoteur: 2150,
        pressionPneus: {
          avantGauche: 2.2,
          avantDroit: 2.1,
          arriereGauche: 2.3,
          arriereDroit: 2.2
        },
        alertes: [],
        scoreEtat: 85,
        prochaineMaintenance: 2770,
        emissionsCO2: 145,
        consommationMoyenne: 9.2,
        latitude: 0.4162,
        longitude: 9.4673,
        lastUpdate: new Date().toISOString()
      },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      numero: 'PG-002',
      capacite: 38,
      carburant: 'diesel',
      plaqueImmatriculation: 'EF-456-GH',
      marque: 'Iveco',
      modele: 'Urbanway',
      annee: 2021,
      couleur: 'Rouge',
      statut: 'maintenance',
      stationId: '2',
      stationName: 'Terminal Port-Gentil',
      obd2Data: {
        vitesse: 0,
        rpm: 0,
        temperatureMoteur: 25,
        pressionHuile: 0,
        niveauCarburant: 30,
        consommationInstantanee: 0,
        kilometrage: 67890,
        heuresMoteur: 3250,
        pressionPneus: {
          avantGauche: 1.8,
          avantDroit: 2.0,
          arriereGauche: 1.9,
          arriereDroit: 2.1
        },
        alertes: [
          {
            id: '1',
            type: 'avertissement',
            code: 'P0171',
            message: 'Mélange trop pauvre (Bank 1)',
            timestamp: new Date().toISOString(),
            resolved: false
          }
        ],
        scoreEtat: 65,
        prochaineMaintenance: 890,
        emissionsCO2: 155,
        consommationMoyenne: 10.1,
        latitude: -0.7193,
        longitude: 8.7815,
        lastUpdate: new Date().toISOString()
      },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      numero: 'LBV-003',
      capacite: 50,
      carburant: 'hybride',
      plaqueImmatriculation: 'IJ-789-KL',
      marque: 'Volvo',
      modele: '7900 Hybrid',
      annee: 2023,
      couleur: 'Vert',
      statut: 'en_route',
      stationId: '1',
      stationName: 'Terminal Libreville',
      obd2Data: {
        vitesse: 45,
        rpm: 1200,
        temperatureMoteur: 75,
        pressionHuile: 2.8,
        niveauCarburant: 90,
        consommationInstantanee: 6.2,
        kilometrage: 12450,
        heuresMoteur: 850,
        pressionPneus: {
          avantGauche: 2.3,
          avantDroit: 2.3,
          arriereGauche: 2.4,
          arriereDroit: 2.3
        },
        alertes: [],
        scoreEtat: 95,
        prochaineMaintenance: 7550,
        emissionsCO2: 85,
        consommationMoyenne: 6.8,
        latitude: 0.4200,
        longitude: 9.4700,
        lastUpdate: new Date().toISOString()
      },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: new Date().toISOString()
    }
  ]);

  // Fonction pour ajouter un bus
  const handleAddBus = (busData: NewBusData) => {
    const station = stations.find(s => s.id === busData.stationId);
    const newBus: Bus = {
      id: Date.now().toString(),
      numero: busData.numero,
      capacite: busData.capacite,
      carburant: busData.carburant,
      plaqueImmatriculation: busData.plaqueImmatriculation,
      marque: busData.marque,
      modele: busData.modele,
      annee: busData.annee,
      couleur: busData.couleur,
      statut: 'actif',
      stationId: busData.stationId,
      stationName: station?.name,
      obd2Data: {
        vitesse: 0,
        rpm: 0,
        temperatureMoteur: 25,
        pressionHuile: 0,
        niveauCarburant: 100,
        consommationInstantanee: 0,
        kilometrage: 0,
        heuresMoteur: 0,
        pressionPneus: {
          avantGauche: 2.2,
          avantDroit: 2.2,
          arriereGauche: 2.2,
          arriereDroit: 2.2
        },
        alertes: [],
        scoreEtat: 100,
        prochaineMaintenance: 10000,
        emissionsCO2: 0,
        consommationMoyenne: 0,
        lastUpdate: new Date().toISOString()
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setBuses(prev => [...prev, newBus]);
    setShowAddBusModal(false);
  };

  // Fonction de filtrage des bus
  const filterBuses = () => {
    let filtered = buses;

    if (filters.statut) {
      filtered = filtered.filter(bus => bus.statut === filters.statut);
    }

    if (filters.carburant) {
      filtered = filtered.filter(bus => bus.carburant === filters.carburant);
    }

    if (filters.station) {
      filtered = filtered.filter(bus => bus.stationId === filters.station);
    }

    if (filters.etatSante) {
      filtered = filtered.filter(bus => {
        const score = bus.obd2Data.scoreEtat;
        switch (filters.etatSante) {
          case 'excellent':
            return score >= 90;
          case 'bon':
            return score >= 70 && score < 90;
          case 'moyen':
            return score >= 50 && score < 70;
          case 'mauvais':
            return score < 50;
          default:
            return true;
        }
      });
    }

    setFilteredBuses(filtered);
  };

  // Effet pour filtrer les bus quand les filtres changent
  useEffect(() => {
    filterBuses();
  }, [filters, buses]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      statut: '',
      carburant: '',
      station: '',
      etatSante: ''
    });
  };

  // Fonction pour obtenir la couleur du badge de statut
  const getStatusBadgeProps = (status: Bus['statut']) => {
    switch (status) {
      case 'actif':
        return { color: ColorsEnum.SUCCESS, text: 'Actif' };
      case 'maintenance':
        return { color: ColorsEnum.WARNING, text: 'Maintenance' };
      case 'hors_service':
        return { color: ColorsEnum.ERROR, text: 'Hors service' };
      case 'en_route':
        return { color: ColorsEnum.INFO, text: 'En route' };
      default:
        return { color: ColorsEnum.TEXT_SECONDARY, text: 'Inconnu' };
    }
  };

  // Fonction pour obtenir la couleur du badge de carburant
  const getFuelBadgeProps = (fuel: Bus['carburant']) => {
    switch (fuel) {
      case 'diesel':
        return { color: ColorsEnum.WARNING, text: 'Diesel' };
      case 'essence':
        return { color: ColorsEnum.ERROR, text: 'Essence' };
      case 'electrique':
        return { color: ColorsEnum.SUCCESS, text: 'Électrique' };
      case 'hybride':
        return { color: ColorsEnum.INFO, text: 'Hybride' };
      default:
        return { color: ColorsEnum.TEXT_SECONDARY, text: 'Inconnu' };
    }
  };

  // Actions pour les bus
  const busActions: TableAction<Bus>[] = [
    {
      label: 'Voir détails OBD2',
      icon: 'Activity',
      onClick: (bus: Bus) => {
        setSelectedBus(bus);
        setShowDetailsModal(true);
      },
      type: 'default'
    },
    {
      label: 'Modifier',
      icon: 'Edit',
      onClick: (bus: Bus) => {
        console.log('Modifier le bus:', bus.numero);
      },
      type: 'primary'
    },
    {
      label: 'Supprimer',
      icon: 'Trash2',
      onClick: (bus: Bus) => {
        console.log('Supprimer le bus:', bus.numero);
      },
      type: 'danger'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Text variant="h1" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-2xl mb-2">
            Gestion des bus
          </Text>
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="text-base">
            Gérez la flotte de bus avec monitoring OBD2 en temps réel
          </Text>
        </div>
        <Button
          appearance="solid"
          variation="primary"
          size="md"
          iconName="Plus"
          onClick={() => setShowAddBusModal(true)}
        >
          Ajouter un bus
        </Button>
      </div>

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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filtre par statut */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Statut
            </label>
            <select
              value={filters.statut}
              onChange={(e) => setFilters(prev => ({ ...prev, statut: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="maintenance">Maintenance</option>
              <option value="hors_service">Hors service</option>
              <option value="en_route">En route</option>
            </select>
          </div>

          {/* Filtre par carburant */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Carburant
            </label>
            <select
              value={filters.carburant}
              onChange={(e) => setFilters(prev => ({ ...prev, carburant: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous les carburants</option>
              <option value="diesel">Diesel</option>
              <option value="essence">Essence</option>
              <option value="electrique">Électrique</option>
              <option value="hybride">Hybride</option>
            </select>
          </div>

          {/* Filtre par station */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Station
            </label>
            <select
              value={filters.station}
              onChange={(e) => setFilters(prev => ({ ...prev, station: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Toutes les stations</option>
              {stations.map(station => (
                <option key={station.id} value={station.id}>
                  {station.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtre par état de santé */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              État de santé
            </label>
            <select
              value={filters.etatSante}
              onChange={(e) => setFilters(prev => ({ ...prev, etatSante: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tous les états</option>
              <option value="excellent">Excellent (90-100%)</option>
              <option value="bon">Bon (70-89%)</option>
              <option value="moyen">Moyen (50-69%)</option>
              <option value="mauvais">Mauvais (&lt;50%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des bus */}
      <Table
        dataSource={filteredBuses}
        columns={[
          {
            key: 'numero',
            title: 'Numéro',
            sortable: true,
            render: (value: string, record: Bus) => (
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Icon name="Bus" size={16} color={ColorsEnum.WHITE} />
                  </div>
                </div>
                <div>
                  <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                    {value}
                  </Text>
                  <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                    {record.plaqueImmatriculation}
                  </Text>
                </div>
              </div>
            )
          },
          {
            key: 'marque',
            title: 'Véhicule',
            sortable: true,
            render: (value: string, record: Bus) => (
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {value} {record.modele}
                </Text>
                <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
                  {record.annee} • {record.couleur}
                </Text>
              </div>
            )
          },
          {
            key: 'capacite',
            title: 'Capacité',
            sortable: true,
            render: (value: number) => (
              <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
                {value} places
              </Text>
            )
          },
          {
            key: 'carburant',
            title: 'Carburant',
            sortable: true,
            render: (value: Bus['carburant']) => {
              const { color, text } = getFuelBadgeProps(value);
              return (
                <Badge color={color}>
                  {text}
                </Badge>
              );
            }
          },
          {
            key: 'statut',
            title: 'Statut',
            sortable: true,
            render: (value: Bus['statut']) => {
              const { color, text } = getStatusBadgeProps(value);
              return (
                <Badge color={color}>
                  {text}
                </Badge>
              );
            }
          },
          {
            key: 'obd2Data',
            title: 'État de santé',
            sortable: true,
            render: (value: Bus['obd2Data']) => (
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  value.scoreEtat >= 90 ? 'bg-green-500' :
                  value.scoreEtat >= 70 ? 'bg-yellow-500' :
                  value.scoreEtat >= 50 ? 'bg-orange-500' : 'bg-red-500'
                }`}></div>
                <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
                  {value.scoreEtat}%
                </Text>
              </div>
            )
          },
          {
            key: 'stationName',
            title: 'Station',
            render: (value: string) => (
              <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
                {value || 'Non assignée'}
              </Text>
            )
          }
        ]}
        actions={busActions}
        rowKey="id"
        pagination={true}
        pageSize={10}
        searchable={true}
        searchPlaceholder="Rechercher par numéro, plaque ou marque..."
        striped={true}
        bordered={true}
        title="Liste des bus"
        subtitle={`${filteredBuses.length} bus affichés sur ${buses.length} au total`}
        onAdd={() => setShowAddBusModal(true)}
        addButtonText="Ajouter un bus"
      />

      {/* Modals */}
      <AddBusModal
        isOpen={showAddBusModal}
        onClose={() => setShowAddBusModal(false)}
        onSave={handleAddBus}
        stations={stations}
      />

      <BusDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        bus={selectedBus}
      />
    </div>
  );
};
