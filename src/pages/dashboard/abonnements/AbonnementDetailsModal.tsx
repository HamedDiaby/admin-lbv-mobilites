import React, { useState } from 'react';
import { Text, Button, Badge, Card, Modal, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';
import { Abonnement } from './types';

interface AbonnementDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  abonnement: Abonnement;
  onEdit: (abonnement: Abonnement) => void;
  onDelete: (id: string) => void;
}

export const AbonnementDetailsModal: React.FC<AbonnementDetailsModalProps> = ({
  isOpen,
  onClose,
  abonnement,
  onEdit,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const formatPrice = (price: number) => {
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

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      onDelete(abonnement.id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivateDeactivate = async () => {
    setLoading(true);
    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedAbonnement: Abonnement = {
        ...abonnement,
        statut: abonnement.statut === 'actif' ? 'inactif' : 'actif',
        updatedAt: new Date().toISOString(),
      };
      
      onEdit(updatedAbonnement);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      maxHeight="90vh"
    >
      {/* Header avec informations principales */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <div
            className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
            style={{ backgroundColor: abonnement.couleur }}
          />
          <div className="flex-1">
            <Text variant="h2" color={ColorsEnum.TEXT_PRIMARY}>
              {abonnement.nom}
            </Text>
            <div className="flex items-center space-x-2 mt-1">
              <Badge 
                variant="solid"
                color={getStatusBadgeColor(abonnement.statut)}
                iconName={abonnement.statut === 'actif' ? 'CheckCircle' : abonnement.statut === 'inactif' ? 'XCircle' : 'Clock'}
              >
                {abonnement.statut.charAt(0).toUpperCase() + abonnement.statut.slice(1)}
              </Badge>
              <Badge 
                variant="soft"
                color={getTypeBadgeColor(abonnement.typeAbonnement)}
                iconName="Calendar"
              >
                {abonnement.typeAbonnement.charAt(0).toUpperCase() + abonnement.typeAbonnement.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
        
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY}>
          {abonnement.description}
        </Text>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="DollarSign" size={20} color={ColorsEnum.PRIMARY} />
          </div>
          <Text variant="h3" color={ColorsEnum.PRIMARY}>
            {formatPrice(abonnement.prix)}
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
            Prix de l'abonnement
          </Text>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Calendar" size={20} color={ColorsEnum.SUCCESS} />
          </div>
          <Text variant="h3" color={ColorsEnum.SUCCESS}>
            {abonnement.duree}
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
            {abonnement.duree === 1 ? 'Jour' : 'Jours'} de validité
          </Text>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name={abonnement.nombreTrajet === -1 ? "Infinity" : "Route"} size={20} color={ColorsEnum.INFO} />
          </div>
          <Text variant="h3" color={ColorsEnum.INFO}>
            {abonnement.nombreTrajet === -1 ? '∞' : abonnement.nombreTrajet}
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
            {abonnement.nombreTrajet === -1 ? 'Trajets illimités' : 'Trajets inclus'}
          </Text>
        </Card>
      </div>

      {/* Détails */}
      <div className="space-y-6">
        {/* Avantages */}
        {abonnement.avantages.length > 0 && (
          <div>
            <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-3 flex items-center">
              <Icon name="Star" size={18} color={ColorsEnum.WARNING} className="mr-2" />
              Avantages inclus
            </Text>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <ul className="space-y-2">
                {abonnement.avantages.map((avantage, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} color={ColorsEnum.SUCCESS} />
                    <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY}>
                      {avantage}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Horaires et conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-3 flex items-center">
              <Icon name="Clock" size={18} color={ColorsEnum.PRIMARY} className="mr-2" />
              Horaires de validité
            </Text>
            <Card className="p-4">
              <div className="flex items-center justify-center space-x-2">
                <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {abonnement.heuresValidite.debut}
                </Text>
                <Icon name="ArrowRight" size={16} color={ColorsEnum.TEXT_SECONDARY} />
                <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {abonnement.heuresValidite.fin}
                </Text>
              </div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-center mt-1">
                Tous les jours
              </Text>
            </Card>
          </div>

          <div>
            <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-3 flex items-center">
              <Icon name="Calendar" size={18} color={ColorsEnum.PRIMARY} className="mr-2" />
              Informations
            </Text>
            <div className="space-y-3">
              <div className="flex justify-between">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                  Créé le
                </Text>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY}>
                  {new Date(abonnement.createdAt).toLocaleDateString('fr-FR')}
                </Text>
              </div>
              <div className="flex justify-between">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                  Modifié le
                </Text>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY}>
                  {new Date(abonnement.updatedAt).toLocaleDateString('fr-FR')}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Réduction */}
        {abonnement.reduction.type !== 'aucune' && (
          <div>
            <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-3 flex items-center">
              <Icon name="Tag" size={18} color={ColorsEnum.WARNING} className="mr-2" />
              Réduction appliquée
            </Text>
            <Card className="p-4 bg-yellow-50 border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                    {abonnement.reduction.type === 'pourcentage' 
                      ? `${abonnement.reduction.valeur}% de réduction`
                      : `${formatPrice(abonnement.reduction.valeur)} de réduction`
                    }
                  </Text>
                  <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                    {abonnement.reduction.description}
                  </Text>
                </div>
                <Badge variant="solid" className="bg-yellow-500 text-white">
                  <Icon name="Percent" size={14} />
                </Badge>
              </div>
            </Card>
          </div>
        )}

        {/* Conditions */}
        {abonnement.conditions && (
          <div>
            <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-3 flex items-center">
              <Icon name="FileText" size={18} color={ColorsEnum.PRIMARY} className="mr-2" />
              Conditions d'utilisation
            </Text>
            <Card className="p-4 bg-gray-50">
              <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY}>
                {abonnement.conditions}
              </Text>
            </Card>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
        <div className="flex items-center space-x-3">
          <Button
            appearance="solid"
            variation={abonnement.statut === 'actif' ? 'warning' : 'success'}
            onClick={handleActivateDeactivate}
            loading={loading}
            htmlType="button"
            iconName={abonnement.statut === 'actif' ? 'Pause' : 'Play'}
          >
            {abonnement.statut === 'actif' ? 'Désactiver' : 'Activer'}
          </Button>
          
          <Button
            appearance="outline"
            variation="error"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={loading}
            htmlType="button"
            iconName="Trash2"
          >
            Supprimer
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            appearance="outline"
            variation="secondary"
            onClick={onClose}
            disabled={loading}
            htmlType="button"
          >
            Fermer
          </Button>
          
          <Button
            appearance="solid"
            variation="primary"
            onClick={() => {
              // TODO: Implémenter l'édition
              console.log('Éditer l\'abonnement');
            }}
            disabled={loading}
            htmlType="button"
            iconName="Edit"
          >
            Modifier
          </Button>
        </div>
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <Modal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          title="Confirmer la suppression"
          size="sm"
        >
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <Icon name="AlertTriangle" size={24} color={ColorsEnum.ERROR} />
            </div>
            <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY}>
              Êtes-vous sûr de vouloir supprimer l'abonnement <strong>"{abonnement.nom}"</strong> ? 
              Cette action est irréversible.
            </Text>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <Button
              appearance="outline"
              variation="secondary"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={loading}
              htmlType="button"
            >
              Annuler
            </Button>
            <Button
              appearance="solid"
              variation="error"
              onClick={handleDelete}
              loading={loading}
              htmlType="button"
              iconName="Trash2"
            >
              Supprimer définitivement
            </Button>
          </div>
        </Modal>
      )}
    </Modal>
  );
};
