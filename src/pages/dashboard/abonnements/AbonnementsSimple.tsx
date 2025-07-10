import React, { useState, useEffect } from 'react';
import { Text, Button, Card, Badge, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';
import { Abonnement, NewAbonnementData } from './types';
import { AddAbonnementModal } from './AddAbonnementModal';
import { AbonnementDetailsModal } from './AbonnementDetailsModal';
import { EditAbonnementModal } from './EditAbonnementModal';

export const AbonnementsSimple: React.FC = () => {
  const [abonnements, setAbonnements] = useState<Abonnement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAbonnement, setSelectedAbonnement] = useState<Abonnement | null>(null);

  // Données simulées d'abonnements
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
    {
      id: '4',
      nom: 'Abonnement Journalier',
      description: 'Accès pour une journée complète',
      prix: 2000,
      duree: 1,
      typeAbonnement: 'journalier',
      avantages: ['Accès 24h', 'Toutes les lignes'],
      nombreTrajet: -1,
      lignesIncluses: [],
      heuresValidite: { debut: '05:00', fin: '23:59' },
      joursValidite: [],
      statut: 'actif',
      couleur: '#8B5CF6',
      icone: 'Sun',
      conditions: 'Valable 24 heures',
      reduction: { type: 'aucune', valeur: 0, description: '' },
      createdAt: '2024-01-20T10:00:00Z',
      updatedAt: '2024-01-20T10:00:00Z',
      createdBy: 'admin1',
    },
    {
      id: '5',
      nom: 'Abonnement Annuel Premium',
      description: 'Abonnement annuel avec tous les avantages',
      prix: 250000,
      duree: 365,
      typeAbonnement: 'annuel',
      avantages: ['Accès illimité', 'Toutes les lignes', 'Support prioritaire', 'Réductions partenaires'],
      nombreTrajet: -1,
      lignesIncluses: [],
      heuresValidite: { debut: '05:00', fin: '23:00' },
      joursValidite: [],
      statut: 'actif',
      couleur: '#EF4444',
      icone: 'Crown',
      conditions: 'Engagement 12 mois',
      reduction: { type: 'pourcentage', valeur: 20, description: 'Réduction annuelle' },
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z',
      createdBy: 'admin1',
    },
    {
      id: '6',
      nom: 'Abonnement Senior',
      description: 'Tarif préférentiel pour les personnes âgées',
      prix: 12000,
      duree: 30,
      typeAbonnement: 'mensuel',
      avantages: ['Tarif senior', 'Accès illimité', 'Support dédié'],
      nombreTrajet: -1,
      lignesIncluses: [],
      heuresValidite: { debut: '05:00', fin: '23:00' },
      joursValidite: [],
      statut: 'actif',
      couleur: '#06B6D4',
      icone: 'Heart',
      conditions: 'Justificatif d\'âge requis (+60 ans)',
      reduction: { type: 'pourcentage', valeur: 50, description: 'Réduction senior' },
      createdAt: '2024-01-08T10:00:00Z',
      updatedAt: '2024-01-08T10:00:00Z',
      createdBy: 'admin1',
    }
  ];

  useEffect(() => {
    // Simulation du chargement des données
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAbonnements(mockAbonnements);
      setLoading(false);
    };

    loadData();
  }, []);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0,
    }).format(price);
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

  const handleAddAbonnement = (newAbonnement: Abonnement) => {
    setAbonnements(prev => [...prev, newAbonnement]);
    setShowAddModal(false);
  };

  const handleEditAbonnement = (updatedAbonnement: Abonnement) => {
    setAbonnements(prev => 
      prev.map(abonnement => 
        abonnement.id === updatedAbonnement.id ? updatedAbonnement : abonnement
      )
    );
    setShowEditModal(false);
    setShowDetailsModal(false);
    setSelectedAbonnement(null);
  };

  const handleDeleteAbonnement = (id: string) => {
    setAbonnements(prev => prev.filter(abonnement => abonnement.id !== id));
    setShowDetailsModal(false);
    setSelectedAbonnement(null);
  };

  const openDetailsModal = (abonnement: Abonnement) => {
    setSelectedAbonnement(abonnement);
    setShowDetailsModal(true);
  };

  const openEditModal = (abonnement: Abonnement) => {
    setSelectedAbonnement(abonnement);
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY}>
              Chargement des abonnements...
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Text variant="h1" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
            Abonnements
          </Text>
          <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY}>
            Gérez les abonnements de transport ({abonnements.length} abonnements)
          </Text>
        </div>
        <Button
          appearance="solid"
          variation="primary"
          size="md"
          iconName="Plus"
          onClick={() => setShowAddModal(true)}
        >
          Nouvel abonnement
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                Total Abonnements
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {abonnements.length}
              </Text>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Icon name="CreditCard" size={24} color={ColorsEnum.PRIMARY} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                Actifs
              </Text>
              <Text variant="h3" color={ColorsEnum.SUCCESS} className="font-bold">
                {abonnements.filter(a => a.statut === 'actif').length}
              </Text>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Icon name="CheckCircle" size={24} color={ColorsEnum.SUCCESS} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                Prix Moyen
              </Text>
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {formatPrice(abonnements.reduce((sum, a) => sum + a.prix, 0) / abonnements.length)}
              </Text>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Icon name="TrendingUp" size={24} color={ColorsEnum.WARNING} />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                Avec Réductions
              </Text>
              <Text variant="h3" color={ColorsEnum.ERROR} className="font-bold">
                {abonnements.filter(a => a.reduction && a.reduction.type !== 'aucune').length}
              </Text>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <Icon name="Tag" size={24} color={ColorsEnum.ERROR} />
            </div>
          </div>
        </Card>
      </div>

      {/* Liste des abonnements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {abonnements.map((abonnement) => (
          <Card key={abonnement.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: abonnement.couleur }}
                />
                <div>
                  <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
                    {abonnement.nom}
                  </Text>
                  <Badge
                    variant="soft"
                    color={getTypeBadgeColor(abonnement.typeAbonnement)}
                    className="mt-1"
                  >
                    {abonnement.typeAbonnement.charAt(0).toUpperCase() + abonnement.typeAbonnement.slice(1)}
                  </Badge>
                </div>
              </div>
              <Badge
                variant="solid"
                color={getStatusBadgeColor(abonnement.statut)}
              >
                {abonnement.statut.charAt(0).toUpperCase() + abonnement.statut.slice(1)}
              </Badge>
            </div>

            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="mb-4">
              {abonnement.description}
            </Text>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>Prix:</Text>
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
              </div>

              <div className="flex justify-between items-center">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>Durée:</Text>
                <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {abonnement.duree} {abonnement.duree === 1 ? 'jour' : 'jours'}
                </Text>
              </div>

              <div className="flex justify-between items-center">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>Trajets:</Text>
                {abonnement.nombreTrajet === -1 ? (
                  <div className="flex items-center">
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
            </div>

            <div className="flex gap-2">
              <Button
                appearance="outline"
                variation="secondary"
                size="sm"
                iconName="Eye"
                className="flex-1"
                onClick={() => openDetailsModal(abonnement)}
              >
                Voir
              </Button>
              <Button
                appearance="outline"
                variation="secondary"
                size="sm"
                iconName="Edit"
                className="flex-1"
                onClick={() => openEditModal(abonnement)}
              >
                Modifier
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal d'ajout d'abonnement */}
      <AddAbonnementModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddAbonnement}
      />

      {/* Modal de détails d'abonnement */}
      {selectedAbonnement && (
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

      {/* Modal d'édition d'abonnement */}
      {selectedAbonnement && (
        <EditAbonnementModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAbonnement(null);
          }}
          abonnement={selectedAbonnement}
          onSubmit={handleEditAbonnement}
        />
      )}
    </div>
  );
};
