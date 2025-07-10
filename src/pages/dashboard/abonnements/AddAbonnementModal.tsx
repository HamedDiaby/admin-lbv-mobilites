import React, { useState } from 'react';
import { Text, Button, Input, Card, Select, Modal } from '@components';
import { ColorsEnum } from '@utils/enums';
import { Abonnement, NewAbonnementData, AbonnementFormErrors } from './types';

interface AddAbonnementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (abonnement: Abonnement) => void;
}

export const AddAbonnementModal: React.FC<AddAbonnementModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<NewAbonnementData>({
    nom: '',
    description: '',
    prix: 0,
    duree: 30,
    typeAbonnement: 'mensuel',
    avantages: [],
    nombreTrajet: -1,
    lignesIncluses: [],
    heuresValidite: { debut: '05:00', fin: '23:00' },
    joursValidite: [],
    couleur: '#3B82F6',
    icone: 'Calendar',
    conditions: '',
    reduction: { type: 'aucune', valeur: 0, description: '' },
  });

  const [errors, setErrors] = useState<AbonnementFormErrors>({});
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: AbonnementFormErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La description est requise';
    }

    if (formData.prix <= 0) {
      newErrors.prix = 'Le prix doit être supérieur à 0';
    }

    if (formData.duree <= 0) {
      newErrors.duree = 'La durée doit être supérieure à 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulation d'une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newAbonnement: Abonnement = {
        id: Date.now().toString(),
        ...formData,
        statut: 'brouillon',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin1', // À remplacer par l'ID de l'utilisateur connecté
      };

      onSubmit(newAbonnement);
    } catch (error) {
      console.error('Erreur lors de la création de l\'abonnement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof NewAbonnementData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Supprimer l'erreur pour ce champ si elle existe
    if (errors[field as keyof AbonnementFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Créer un nouvel abonnement"
      size="xl"
      maxHeight="90vh"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de base */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-4">
            Informations générales
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              label="Nom de l'abonnement"
              value={formData.nom}
              onChange={(e) => handleInputChange('nom', e.target.value)}
              placeholder="Ex: Abonnement Mensuel Standard"
              required
              error={errors.nom}
              fullWidth
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prix (FCFA) *
              </label>
              <input
                type="number"
                value={formData.prix}
                onChange={(e) => handleInputChange('prix', Number(e.target.value))}
                placeholder="25000"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.prix && (
                <Text variant="p3" color={ColorsEnum.ERROR} className="mt-1">
                  {errors.prix}
                </Text>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Input
              type="textarea"
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Description détaillée de l'abonnement"
              required
              error={errors.description}
              rows={3}
              fullWidth
            />
          </div>
        </div>

        {/* Configuration */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-4">
            Configuration
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Type d'abonnement"
              options={[
                { value: 'journalier', label: 'Journalier' },
                { value: 'hebdomadaire', label: 'Hebdomadaire' },
                { value: 'mensuel', label: 'Mensuel' },
                { value: 'annuel', label: 'Annuel' },
                { value: 'personnalise', label: 'Personnalisé' }
              ]}
              value={formData.typeAbonnement}
              onChange={(e) => handleInputChange('typeAbonnement', e.target.value)}
              fullWidth
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée (jours) *
              </label>
              <input
                type="number"
                value={formData.duree}
                onChange={(e) => handleInputChange('duree', Number(e.target.value))}
                placeholder="30"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.duree && (
                <Text variant="p3" color={ColorsEnum.ERROR} className="mt-1">
                  {errors.duree}
                </Text>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de trajets
              </label>
              <input
                type="number"
                value={formData.nombreTrajet === -1 ? '' : formData.nombreTrajet}
                onChange={(e) => handleInputChange('nombreTrajet', e.target.value === '' ? -1 : Number(e.target.value))}
                placeholder="Illimité"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
                Laissez vide pour illimité
              </Text>
            </div>
          </div>
        </div>

        {/* Personnalisation */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-4">
            Personnalisation
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Couleur d'affichage
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formData.couleur}
                  onChange={(e) => handleInputChange('couleur', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded-md cursor-pointer"
                />
                <Input
                  type="text"
                  value={formData.couleur}
                  onChange={(e) => handleInputChange('couleur', e.target.value)}
                  placeholder="#3B82F6"
                  className="flex-1"
                />
              </div>
            </div>

            <Input
              type="textarea"
              label="Conditions d'utilisation"
              value={formData.conditions}
              onChange={(e) => handleInputChange('conditions', e.target.value)}
              placeholder="Conditions spécifiques à cet abonnement"
              rows={2}
              fullWidth
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            appearance="outline"
            variation="secondary"
            onClick={onClose}
            htmlType="button"
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            appearance="solid"
            variation="primary"
            htmlType="submit"
            loading={loading}
            iconName="Plus"
          >
            Créer l'abonnement
          </Button>
        </div>
      </form>
    </Modal>
  );
};
