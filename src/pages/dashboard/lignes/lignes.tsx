import React, { useState } from 'react';
import { Text, Button, Icon, Badge, Table, TableColumn, TableAction, Select, Input } from '@components';
import { ColorsEnum } from '@utils/enums';
import { Ligne, LigneFilters } from './types';
import { AddLigneModal, LignesMap } from './components';
import { useLigneData } from './hooks';
import { 
  calculateLignesPerformance, 
  formatDistance, 
  formatDuree, 
  getTrajetInfo, 
  getTotalStations,
  getStatusColor 
} from './utils';
import { LIGNES_FILTER_OPTIONS } from './constants';

export const Lignes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lignes' | 'carte'>('lignes');
  const [showAddLigneModal, setShowAddLigneModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    lignes,
    filteredLignes,
    villes,
    stations,
    isLoading,
    error,
    refreshData,
    lastUpdate,
    filters,
    setFilters,
    selectedLigne,
    setSelectedLigne
  } = useLigneData({
    refreshInterval: 30000,
    enabled: true
  });

  const performance = calculateLignesPerformance(lignes);

  // Handlers
  const handleLigneSelect = (ligne: Ligne) => {
    setSelectedLigne(ligne);
    // Optionnel: ouvrir un modal de détails
  };

  const handleLigneAdd = (newLigneData: any) => {
    console.log('Ajout d\'une nouvelle ligne:', newLigneData);
    setShowAddLigneModal(false);
    refreshData();
  };

  const handleFilterChange = (key: keyof LigneFilters, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  // Configuration des colonnes du tableau
  const columns: TableColumn[] = [
    {
      key: 'numero',
      title: 'N° Ligne',
      sortable: true,
      render: (value: any, ligne: Ligne) => (
        <div className="flex items-center space-x-2">
          <Text className="font-medium">{ligne.numero}</Text>
          <Badge 
            color={getStatusColor(ligne.statut)}
            variant="soft"
            size="sm"
          >
            {ligne.statut}
          </Badge>
        </div>
      )
    },
    {
      key: 'nom',
      title: 'Nom',
      sortable: true,
      render: (value: any, ligne: Ligne) => (
        <div>
          <Text className="font-medium">{ligne.nom}</Text>
          <Text variant="p3" className="text-gray-600">{ligne.ville.nom}</Text>
        </div>
      )
    },
    {
      key: 'trajet',
      title: 'Trajet',
      sortable: false,
      render: (value: any, ligne: Ligne) => (
        <div className="flex items-center space-x-2">
          <Text variant="p3" className="text-gray-600">
            {getTrajetInfo(ligne)}
          </Text>
        </div>
      )
    },
    {
      key: 'distance',
      title: 'Distance',
      sortable: true,
      render: (value: any, ligne: Ligne) => (
        <Badge variant="outline" color="blue">
          {formatDistance(ligne.distanceTotale)}
        </Badge>
      )
    },
    {
      key: 'duree',
      title: 'Durée',
      sortable: true,
      render: (value: any, ligne: Ligne) => (
        <Badge variant="outline" color="purple">
          {formatDuree(ligne.tempsTotal)}
        </Badge>
      )
    },
    {
      key: 'stations',
      title: 'Stations',
      sortable: true,
      render: (value: any, ligne: Ligne) => (
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size="sm" color={ColorsEnum.PRIMARY} />
          <Text variant="p3" className="text-gray-600">
            {getTotalStations(ligne)} stations
          </Text>
        </div>
      )
    },
    {
      key: 'dateCreation',
      title: 'Créée le',
      sortable: true,
      render: (value: any, ligne: Ligne) => (
        <Text variant="p3" className="text-gray-600">
          {new Date(ligne.dateCreation).toLocaleDateString('fr-FR')}
        </Text>
      )
    }
  ];

  // Actions du tableau
  const actions: TableAction[] = [
    {
      label: 'Voir détails',
      icon: 'Eye',
      onClick: (ligne: Ligne) => handleLigneSelect(ligne)
    },
    {
      label: 'Modifier',
      icon: 'Edit',
      onClick: (ligne: Ligne) => console.log('Modifier ligne:', ligne.id)
    },
    {
      label: 'Voir sur carte',
      icon: 'Map',
      onClick: (ligne: Ligne) => {
        setSelectedLigne(ligne);
        setActiveTab('carte');
      }
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
            Gestion des Lignes
          </Text>
          <Text className="text-gray-600 mt-1">
            Configuration et suivi des itinéraires de transport
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
            label="Ajouter une ligne"
            appearance="solid"
            iconName="Plus"
            onClick={() => setShowAddLigneModal(true)}
          />
        </div>
      </div>

      {/* Métriques de performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">Total Lignes</Text>
              <Text variant="h3" className="text-2xl font-bold text-gray-900">
                {performance.totalLignes}
              </Text>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              🚏
            </div>
          </div>
          <div className="mt-2">
            <Badge 
              color="blue"
              variant="soft"
              size="sm"
            >
              {performance.totalCities} villes desservies
            </Badge>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">Lignes Actives</Text>
              <Text variant="h3" className="text-2xl font-bold text-green-600">
                {performance.activeLignes}
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
              {performance.activePercentage}% du réseau
            </Badge>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">Distance Totale</Text>
              <Text variant="h3" className="text-2xl font-bold text-purple-600">
                {formatDistance(performance.totalDistance)}
              </Text>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              📏
            </div>
          </div>
          <div className="mt-2">
            <Badge 
              color="purple"
              variant="soft"
              size="sm"
            >
              {formatDistance(performance.averageDistance)} en moyenne
            </Badge>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <Text className="text-sm font-medium text-gray-600">Total Stations</Text>
              <Text variant="h3" className="text-2xl font-bold text-orange-600">
                {performance.totalStations}
              </Text>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              📍
            </div>
          </div>
          <div className="mt-2">
            <Badge 
              color="orange"
              variant="soft"
              size="sm"
            >
              {performance.averageStationsPerLigne.toFixed(1)} par ligne
            </Badge>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      {(performance.maintenanceLignes > 0 || performance.inactiveLignes > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            {performance.maintenanceLignes > 0 && (
              <Badge color="orange" variant="soft">
                {performance.maintenanceLignes} ligne(s) en maintenance
              </Badge>
            )}
            {performance.inactiveLignes > 0 && (
              <Badge color="red" variant="soft">
                {performance.inactiveLignes} ligne(s) inactive(s)
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('lignes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'lignes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🚏 Liste des Lignes ({filteredLignes.length})
          </button>
          <button
            onClick={() => setActiveTab('carte')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'carte'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🗺️ Carte des Itinéraires
          </button>
        </nav>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'lignes' && (
        <div className="space-y-6">
          {/* Filtres */}
          <div className="bg-white p-6 rounded-lg border">
            <Text variant="h4" className="text-gray-900 mb-4">Filtres</Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Input
                  label="Recherche"
                  placeholder="Ligne, ville, station..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleFilterChange('recherche', e.target.value);
                  }}
                  iconName="Search"
                />
              </div>

              <div>
                <Select
                  label="Statut"
                  value={filters.statut}
                  onChange={(e) => handleFilterChange('statut', e.target.value)}
                  options={LIGNES_FILTER_OPTIONS.statuts}
                />
              </div>

              <div>
                <Select
                  label="Ville"
                  value={filters.ville}
                  onChange={(e) => handleFilterChange('ville', e.target.value)}
                  options={LIGNES_FILTER_OPTIONS.villes}
                />
              </div>

              <div className="flex items-end">
                <Button
                  label="Réinitialiser"
                  appearance="outline"
                  iconName="X"
                  onClick={() => {
                    setFilters({ statut: '', ville: '', recherche: '' });
                    setSearchTerm('');
                  }}
                />
              </div>
            </div>
          </div>

          {/* Tableau des lignes */}
          <div className="bg-white rounded-lg border">
            <Table
              dataSource={filteredLignes}
              columns={columns}
              actions={actions}
              emptyText="Aucune ligne trouvée"
              searchable={false}
            />
          </div>
        </div>
      )}

      {activeTab === 'carte' && (
        <div className="bg-white rounded-lg border">
          <LignesMap
            lignes={filteredLignes}
          />
        </div>
      )}

      {/* Modal d'ajout */}
      <AddLigneModal
        isOpen={showAddLigneModal}
        onClose={() => setShowAddLigneModal(false)}
        onSubmit={handleLigneAdd}
        villes={villes}
        stations={stations}
      />
    </div>
  );
};
