import React, { useState, useEffect } from 'react';
import { Text, Button, Modal } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { Abonnement, AbonnementFormErrors } from '../types';

interface EditAbonnementModalProps {
  isOpen: boolean;
  onClose: () => void;
  abonnement: Abonnement;
  onSubmit: (abonnement: Abonnement) => void;
}

export const EditAbonnementModal: React.FC<EditAbonnementModalProps> = ({
  isOpen,
  onClose,
  abonnement,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Abonnement>(abonnement);
  const [errors, setErrors] = useState<AbonnementFormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(abonnement);
  }, [abonnement]);

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

      const updatedAbonnement: Abonnement = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      onSubmit(updatedAbonnement);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la modification de l\'abonnement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Abonnement, value: any) => {
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
      title="Modifier l'abonnement"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'abonnement *
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => handleInputChange('nom', e.target.value)}
                placeholder="Ex: Abonnement Mensuel Standard"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
              {errors.nom && (
                <Text variant="p3" color={ColorsEnum.ERROR} className="mt-1">
                  {errors.nom}
                </Text>
              )}
            </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Description détaillée de l'abonnement"
              required
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {errors.description && (
              <Text variant="p3" color={ColorsEnum.ERROR} className="mt-1">
                {errors.description}
              </Text>
            )}
          </div>
        </div>

        {/* Configuration */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-4">
            Configuration
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type d'abonnement *
              </label>
              <select
                value={formData.typeAbonnement}
                onChange={(e) => handleInputChange('typeAbonnement', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="journalier">Journalier</option>
                <option value="hebdomadaire">Hebdomadaire</option>
                <option value="mensuel">Mensuel</option>
                <option value="annuel">Annuel</option>
                <option value="personnalise">Personnalisé</option>
              </select>
            </div>

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

        {/* Statut */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="mb-4">
            Statut et personnalisation
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut *
              </label>
              <select
                value={formData.statut}
                onChange={(e) => handleInputChange('statut', e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="brouillon">Brouillon</option>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </div>

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
                <input
                  type="text"
                  value={formData.couleur}
                  onChange={(e) => handleInputChange('couleur', e.target.value)}
                  placeholder="#3B82F6"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conditions d'utilisation
            </label>
            <textarea
              value={formData.conditions}
              onChange={(e) => handleInputChange('conditions', e.target.value)}
              placeholder="Conditions spécifiques à cet abonnement"
              rows={2}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
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
            iconName="Save"
          >
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Modal>
  );
};
