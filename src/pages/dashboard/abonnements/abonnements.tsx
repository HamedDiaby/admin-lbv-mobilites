import React, { useState, useEffect } from 'react';
import { Text, Button, Card, Table, Badge, Input, Select, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';
import { Abonnement, AbonnementFilters, AbonnementStats } from './types';
import { AddAbonnementModal } from './AddAbonnementModal';
import { AbonnementDetailsModal } from './AbonnementDetailsModal';

export const Abonnements: React.FC = () => {
  const [abonnements, setAbonnements] = useState<Abonnement[]>([]);
  const [filteredAbonnements, setFilteredAbonnements] = useState<Abonnement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAbonnement, setSelectedAbonnement] = useState<Abonnement | null>(null);
  const [filters, setFilters] = useState<AbonnementFilters>({
    statut: 'tous',
    typeAbonnement: 'tous',
    prixMin: 0,
    prixMax: 1000000,
  });
  const [stats, setStats] = useState<AbonnementStats>({
    totalAbonnements: 0,
    abonnementsActifs: 0,
    abonnementsInactifs: 0,
    revenus: {
      mensuel: 0,
      hebdomadaire: 0,
      total: 0,
    },
    abonnementPopulaire: {
      id: '',
      nom: '',
      nombreUtilisateurs: 0,
    },
  });

  // Données fictives pour la démonstration
  const mockAbonnements: Abonnement[] = [
    {
      id: '1',
      nom: 'Abonnement Mensuel Standard',
      description: 'Accès illimité à toutes les lignes pendant 30 jours',
      prix: 25000,
      duree: 30,
      typeAbonnement: 'mensuel',
      avantages: ['Accès illimité', 'Toutes les lignes', 'Support prioritaire'],
      nombreTrajet: -1,
      lignesIncluses: [],
      heuresValidite: { debut: '05:00', fin: '23:00' },
      joursValidite: [],
      statut: 'actif',
      couleur: '#3B82F6',
      icone: 'Calendar',
      conditions: 'Valable pour un seul utilisateur',
      reduction: { type: 'aucune', valeur: 0, description: '' },
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      createdBy: 'admin1',
    },
    {
      id: '2',
      nom: 'Abonnement Hebdomadaire',
      description: 'Accès à toutes les lignes pendant 7 jours',
      prix: 8000,
      duree: 7,
      typeAbonnement: 'hebdomadaire',
      avantages: ['Accès illimité', 'Toutes les lignes'],
      nombreTrajet: -1,
      lignesIncluses: [],
      heuresValidite: { debut: '05:00', fin: '23:00' },
      joursValidite: [],
      statut: 'actif',
      couleur: '#10B981',
      icone: 'Clock',
      conditions: 'Valable pour un seul utilisateur',
      reduction: { type: 'aucune', valeur: 0, description: '' },
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z',
      createdBy: 'admin1',
    },
    {
      id: '3',
      nom: 'Abonnement Étudiant',
      description: 'Tarif réduit pour les étudiants',
      prix: 15000,
      duree: 30,
      typeAbonnement: 'mensuel',
      avantages: ['Tarif étudiant', 'Accès illimité', 'Toutes les lignes'],
      nombreTrajet: -1,
      lignesIncluses: [],
      heuresValidite: { debut: '05:00', fin: '23:00' },
      joursValidite: [],
      statut: 'actif',
      couleur: '#F59E0B',
      icone: 'BookOpen',
      conditions: 'Carte étudiante requise',
      reduction: { type: 'pourcentage', valeur: 40, description: 'Réduction étudiante' },
      createdAt: '2024-01-05T10:00:00Z',
      updatedAt: '2024-01-05T10:00:00Z',
      createdBy: 'admin1',
    },
  ];

  useEffect(() => {
    // Simulation du chargement des données
    const loadData = async () => {
      setLoading(true);
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAbonnements(mockAbonnements);
      setFilteredAbonnements(mockAbonnements);
      
      // Calcul des statistiques
      const statsData: AbonnementStats = {
        totalAbonnements: mockAbonnements.length,
        abonnementsActifs: mockAbonnements.filter(a => a.statut === 'actif').length,
        abonnementsInactifs: mockAbonnements.filter(a => a.statut === 'inactif').length,
        revenus: {
          mensuel: 850000,
          hebdomadaire: 240000,
          total: 1200000,
        },
        abonnementPopulaire: {
          id: '1',
          nom: 'Abonnement Mensuel Standard',
          nombreUtilisateurs: 245,
        },
      };
      setStats(statsData);
      setLoading(false);
    };

    loadData();
  }, []);

  // Filtrage des abonnements
  useEffect(() => {
    let filtered = abonnements;

    if (filters.statut !== 'tous') {
      filtered = filtered.filter(a => a.statut === filters.statut);
    }

    if (filters.typeAbonnement !== 'tous') {
      filtered = filtered.filter(a => a.typeAbonnement === filters.typeAbonnement);
    }

    filtered = filtered.filter(a => a.prix >= filters.prixMin && a.prix <= filters.prixMax);

    setFilteredAbonnements(filtered);
  }, [filters, abonnements]);

  const handleAddAbonnement = (newAbonnement: Abonnement) => {
    setAbonnements(prev => [...prev, newAbonnement]);
    setShowAddModal(false);
  };

  const handleEditAbonnement = (updatedAbonnement: Abonnement) => {
    setAbonnements(prev =>
      prev.map(a => a.id === updatedAbonnement.id ? updatedAbonnement : a)
    );
    setShowDetailsModal(false);
    setSelectedAbonnement(null);
  };

  const handleDeleteAbonnement = (id: string) => {
    setAbonnements(prev => prev.filter(a => a.id !== id));
    setShowDetailsModal(false);
    setSelectedAbonnement(null);
  };

  const getStatusBadgeColor = (statut: string) => {
    switch (statut) {
      case 'actif': return ColorsEnum.SUCCESS;
      case 'inactif': return ColorsEnum.ERROR;
      case 'brouillon': return ColorsEnum.WARNING;
      default: return ColorsEnum.GRAY_500;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'mensuel': return ColorsEnum.PRIMARY;
      case 'hebdomadaire': return ColorsEnum.SUCCESS;
      case 'journalier': return ColorsEnum.WARNING;
      case 'annuel': return ColorsEnum.INFO_LIGHT;
      default: return ColorsEnum.GRAY_500;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const columns = [
    {
      key: 'nom',
      title: 'Abonnement',
      sortable: true,
      render: (abonnement: Abonnement) => {
        if (!abonnement) return null;
        return (
          <div className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: abonnement.couleur }}
            />
            <div className="min-w-0 flex-1">
              <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium truncate">
                {abonnement.nom}
              </Text>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="truncate">
                {abonnement.description}
              </Text>
            </div>
          </div>
        );
      },
    },
    {
      key: 'prix',
      title: 'Prix',
      sortable: true,
      align: 'right' as const,
      render: (abonnement: Abonnement) => {
        if (!abonnement) return null;
        return (
          <div className="text-right">
            <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
              {formatPrice(abonnement.prix)}
            </Text>
            {abonnement.reduction && abonnement.reduction.type !== 'aucune' && (
              <div className="flex items-center justify-end mt-1">
                <Icon name="Tag" size={12} color={ColorsEnum.WARNING} />
                <Text variant="p4" color={ColorsEnum.WARNING} className="ml-1">
                  -{abonnement.reduction.type === 'pourcentage' 
                    ? `${abonnement.reduction.valeur}%` 
                    : formatPrice(abonnement.reduction.valeur)}
                </Text>
              </div>
            )}
          </div>
        );
      },
    },
    {
      key: 'duree',
      title: 'Durée',
      sortable: true,
      align: 'center' as const,
      render: (abonnement: Abonnement) => {
        if (!abonnement) return null;
        return (
          <div className="text-center">
            <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
              {abonnement.duree}
            </Text>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              {abonnement.duree === 1 ? 'jour' : 'jours'}
            </Text>
          </div>
        );
      },
    },
    {
      key: 'typeAbonnement',
      title: 'Type',
      sortable: true,
      render: (abonnement: Abonnement) => {
        if (!abonnement) return null;
        return (
          <Badge
            variant="soft"
            color={getTypeBadgeColor(abonnement.typeAbonnement)}
          >
            {abonnement.typeAbonnement.charAt(0).toUpperCase() + abonnement.typeAbonnement.slice(1)}
          </Badge>
        );
      },
    },
    {
      key: 'nombreTrajet',
      title: 'Trajets',
      align: 'center' as const,
      render: (abonnement: Abonnement) => {
        if (!abonnement) return null;
        return (
          <div className="text-center">
            {abonnement.nombreTrajet === -1 ? (
              <div className="flex items-center justify-center">
                <Icon name="Infinity" size={16} color={ColorsEnum.SUCCESS} />
                <Text variant="p3" color={ColorsEnum.SUCCESS} className="ml-1 font-medium">
                  Illimité
                </Text>
              </div>
            ) : (
              <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                {abonnement.nombreTrajet}
              </Text>
            )}
          </div>
        );
      },
    },
    {
      key: 'statut',
      title: 'Statut',
      sortable: true,
      render: (abonnement: Abonnement) => {
        if (!abonnement) return null;
        return (
          <Badge
            variant="solid"
            color={getStatusBadgeColor(abonnement.statut)}
          >
            {abonnement.statut.charAt(0).toUpperCase() + abonnement.statut.slice(1)}
          </Badge>
        );
      },
    },
    {
      key: 'actions',
      title: 'Actions',
      align: 'right' as const,
      render: (abonnement: Abonnement) => {
        if (!abonnement) return null;
        return (
          <div className="flex items-center justify-end gap-1">
            <Button
              appearance="clear"
              variation="secondary"
              size="sm"
              iconName="Eye"
              onClick={() => {
                setSelectedAbonnement(abonnement);
                setShowDetailsModal(true);
              }}
              htmlType="button"
            />
            <Button
              appearance="clear"
              variation="secondary"
              size="sm"
              iconName="Edit"
              onClick={() => {
                // TODO: Implémenter l'édition rapide
                setSelectedAbonnement(abonnement);
                setShowDetailsModal(true);
              }}
              htmlType="button"
            />
            <Button
              appearance="clear"
              variation={abonnement.statut === 'actif' ? 'warning' : 'success'}
              size="sm"
              iconName={abonnement.statut === 'actif' ? 'Pause' : 'Play'}
              onClick={() => {
                const updatedAbonnement = {
                  ...abonnement,
                  statut: abonnement.statut === 'actif' ? 'inactif' : 'actif',
                  updatedAt: new Date().toISOString(),
                } as Abonnement;
                handleEditAbonnement(updatedAbonnement);
              }}
              htmlType="button"
            />
          </div>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header avec actions */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon name="CreditCard" size={24} color={ColorsEnum.PRIMARY} />
              </div>
              <div>
                <Text variant="h1" color={ColorsEnum.TEXT_PRIMARY}>
                  Gestion des Abonnements
                </Text>
                <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY}>
                  Créez et gérez les différents plans d'abonnement pour vos services
                </Text>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              appearance="outline"
              variation="secondary"
              iconName="Download"
              size="sm"
            >
              Exporter
            </Button>
            <Button
              appearance="solid"
              variation="primary"
              iconName="Plus"
              onClick={() => setShowAddModal(true)}
            >
              Nouvel abonnement
            </Button>
          </div>
        </div>
      </Card>

      {/* Statistiques améliorées */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                Total Abonnements
              </Text>
              <Text variant="h2" color={ColorsEnum.TEXT_PRIMARY} className="mt-1">
                {stats.totalAbonnements}
              </Text>
              <div className="flex items-center mt-2">
                <Icon name="TrendingUp" size={16} color={ColorsEnum.SUCCESS} />
                <Text variant="p4" color={ColorsEnum.SUCCESS} className="ml-1">
                  +12% ce mois
                </Text>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Icon name="CreditCard" size={24} color={ColorsEnum.PRIMARY} />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                Abonnements Actifs
              </Text>
              <Text variant="h2" color={ColorsEnum.SUCCESS} className="mt-1">
                {stats.abonnementsActifs}
              </Text>
              <div className="flex items-center mt-2">
                <Icon name="Users" size={16} color={ColorsEnum.SUCCESS} />
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="ml-1">
                  {Math.round((stats.abonnementsActifs / stats.totalAbonnements) * 100)}% du total
                </Text>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <Icon name="CheckCircle" size={24} color={ColorsEnum.SUCCESS} />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                Revenus Mensuels
              </Text>
              <Text variant="h2" color={ColorsEnum.PRIMARY} className="mt-1">
                {formatPrice(stats.revenus.mensuel)}
              </Text>
              <div className="flex items-center mt-2">
                <Icon name="TrendingUp" size={16} color={ColorsEnum.SUCCESS} />
                <Text variant="p4" color={ColorsEnum.SUCCESS} className="ml-1">
                  +8.5% vs mois dernier
                </Text>
              </div>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <Icon name="DollarSign" size={24} color={ColorsEnum.PRIMARY} />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                Plus Populaire
              </Text>
              <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mt-1">
                {stats.abonnementPopulaire.nom}
              </Text>
              <div className="flex items-center mt-2">
                <Icon name="Star" size={16} color={ColorsEnum.WARNING} />
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="ml-1">
                  {stats.abonnementPopulaire.nombreUtilisateurs} souscriptions
                </Text>
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Icon name="Trophy" size={24} color={ColorsEnum.WARNING} />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtres et recherche améliorés */}
      <Card className="mb-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY}>
              Filtres et recherche
            </Text>
            <Button
              appearance="clear"
              variation="secondary"
              size="sm"
              iconName="RotateCcw"
              onClick={() => {
                setFilters({
                  statut: 'tous',
                  typeAbonnement: 'tous',
                  prixMin: 0,
                  prixMax: 1000000,
                });
              }}
            >
              Réinitialiser
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <Input
                type="text"
                placeholder="Rechercher un abonnement..."
                iconName="Search"
                fullWidth
                value=""
                onChange={() => {}}
              />
            </div>
            
            <Select
              options={[
                { value: 'tous', label: 'Tous les statuts' },
                { value: 'actif', label: 'Actif' },
                { value: 'inactif', label: 'Inactif' },
                { value: 'brouillon', label: 'Brouillon' }
              ]}
              value={filters.statut}
              onChange={(e) => setFilters(prev => ({ ...prev, statut: e.target.value }))}
              iconName="Filter"
              fullWidth
            />
            
            <Select
              options={[
                { value: 'tous', label: 'Tous les types' },
                { value: 'journalier', label: 'Journalier' },
                { value: 'hebdomadaire', label: 'Hebdomadaire' },
                { value: 'mensuel', label: 'Mensuel' },
                { value: 'annuel', label: 'Annuel' }
              ]}
              value={filters.typeAbonnement}
              onChange={(e) => setFilters(prev => ({ ...prev, typeAbonnement: e.target.value }))}
              iconName="Calendar"
              fullWidth
            />
            
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Prix min"
                value={filters.prixMin === 0 ? '' : filters.prixMin.toString()}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  prixMin: e.target.value === '' ? 0 : Number(e.target.value) 
                }))}
                fullWidth
              />
              <span className="text-gray-400">-</span>
              <Input
                type="text"
                placeholder="Prix max"
                value={filters.prixMax === 1000000 ? '' : filters.prixMax.toString()}
                onChange={(e) => setFilters(prev => ({ 
                  ...prev, 
                  prixMax: e.target.value === '' ? 1000000 : Number(e.target.value) 
                }))}
                fullWidth
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              {filteredAbonnements.length} abonnement(s) trouvé(s)
            </Text>
            <div className="flex items-center gap-2">
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                Affichage:
              </Text>
              <Button
                appearance="outline"
                variation="secondary"
                size="sm"
                iconName="Grid3X3"
              >
                Grille
              </Button>
              <Button
                appearance="solid"
                variation="secondary"
                size="sm"
                iconName="List"
              >
                Liste
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tableau des abonnements avec pagination */}
      <Card>
        <Table
          dataSource={filteredAbonnements}
          columns={columns}
          emptyText="Aucun abonnement trouvé"
          searchable={false}
          sortable={true}
          pagination={true}
          pageSize={10}
          striped={true}
          bordered={false}
          stickyHeader={true}
        />
      </Card>

      {/* Modals */}
      {showAddModal && (
        <AddAbonnementModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddAbonnement}
        />
      )}

      {showDetailsModal && selectedAbonnement && (
        <AbonnementDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedAbonnement(null);
          }}
          abonnement={selectedAbonnement}
          onEdit={handleEditAbonnement}
          onDelete={handleDeleteAbonnement}
        />
      )}
    </div>
  );
};
