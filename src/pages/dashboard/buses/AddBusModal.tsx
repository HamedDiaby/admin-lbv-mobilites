import { FC, useState } from "react";
import { Modal, Text, Input, Select, Button } from "@components";
import { ColorsEnum } from "@utils/enums";
import { NewBusData, BusFormErrors } from "./types";
import { Station } from "../stations/types";

interface AddBusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (busData: NewBusData) => void;
  stations: Station[];
}

export const AddBusModal: FC<AddBusModalProps> = ({
  isOpen,
  onClose,
  onSave,
  stations
}) => {
  const [formData, setFormData] = useState<NewBusData>({
    numero: '',
    capacite: 0,
    carburant: 'diesel',
    plaqueImmatriculation: '',
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    couleur: '',
    stationId: ''
  });

  const [errors, setErrors] = useState<BusFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Options pour le type de carburant
  const carburantOptions = [
    { value: 'diesel', label: 'Diesel' },
    { value: 'essence', label: 'Essence' },
    { value: 'electrique', label: 'Électrique' },
    { value: 'hybride', label: 'Hybride' }
  ];

  // Marques populaires de bus
  const marqueOptions = [
    { value: 'Mercedes', label: 'Mercedes-Benz' },
    { value: 'Volvo', label: 'Volvo' },
    { value: 'Iveco', label: 'Iveco' },
    { value: 'Scania', label: 'Scania' },
    { value: 'MAN', label: 'MAN' },
    { value: 'Renault', label: 'Renault' },
    { value: 'VDL', label: 'VDL' },
    { value: 'Solaris', label: 'Solaris' },
    { value: 'Autre', label: 'Autre' }
  ];

  // Couleurs disponibles
  const couleurOptions = [
    { value: 'Blanc', label: 'Blanc' },
    { value: 'Bleu', label: 'Bleu' },
    { value: 'Rouge', label: 'Rouge' },
    { value: 'Vert', label: 'Vert' },
    { value: 'Jaune', label: 'Jaune' },
    { value: 'Orange', label: 'Orange' },
    { value: 'Gris', label: 'Gris' },
    { value: 'Noir', label: 'Noir' }
  ];

  // Gestion des changements de formulaire
  const handleChange = (field: keyof NewBusData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Effacer l'erreur quand l'utilisateur tape
    if (errors[field as keyof BusFormErrors]) {
      setErrors((prev: BusFormErrors) => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: BusFormErrors = {};

    // Numéro obligatoire
    if (!formData.numero.trim()) {
      newErrors.numero = 'Le numéro du bus est obligatoire';
    }

    // Capacité obligatoire et positive
    if (!formData.capacite || formData.capacite <= 0) {
      newErrors.capacite = 'La capacité doit être supérieure à 0';
    }

    // Plaque d'immatriculation obligatoire
    if (!formData.plaqueImmatriculation.trim()) {
      newErrors.plaqueImmatriculation = 'La plaque d\'immatriculation est obligatoire';
    } else if (!/^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/.test(formData.plaqueImmatriculation)) {
      newErrors.plaqueImmatriculation = 'Format invalide (ex: AB-123-CD)';
    }

    // Marque obligatoire
    if (!formData.marque.trim()) {
      newErrors.marque = 'La marque est obligatoire';
    }

    // Modèle obligatoire
    if (!formData.modele.trim()) {
      newErrors.modele = 'Le modèle est obligatoire';
    }

    // Année valide
    const currentYear = new Date().getFullYear();
    if (formData.annee < 1990 || formData.annee > currentYear + 1) {
      newErrors.annee = `L'année doit être entre 1990 et ${currentYear + 1}`;
    }

    // Couleur obligatoire
    if (!formData.couleur.trim()) {
      newErrors.couleur = 'La couleur est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission du formulaire
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(formData);
    } catch (error) {
      console.error('Erreur lors de la création du bus:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fermeture de la modal
  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        numero: '',
        capacite: 0,
        carburant: 'diesel',
        plaqueImmatriculation: '',
        marque: '',
        modele: '',
        annee: new Date().getFullYear(),
        couleur: '',
        stationId: ''
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title="Ajouter un nouveau bus"
      size="lg"
    >
      <div className="space-y-6">
        {/* Informations principales */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Informations principales
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Numéro du bus"
                placeholder="Ex: LBV-001"
                value={formData.numero}
                onChange={(e) => handleChange('numero', e.target.value)}
                error={errors.numero}
                required
                fullWidth
              />
            </div>
            <div>
              <Input
                label="Plaque d'immatriculation"
                placeholder="Ex: AB-123-CD"
                value={formData.plaqueImmatriculation}
                onChange={(e) => handleChange('plaqueImmatriculation', e.target.value.toUpperCase())}
                error={errors.plaqueImmatriculation}
                required
                fullWidth
              />
            </div>
            <div>
              <Input
                label="Capacité"
                placeholder="Ex: 45"
                type="text"
                value={formData.capacite?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  // Permettre seulement les chiffres
                  if (/^\d*$/.test(value)) {
                    handleChange('capacite', value ? parseInt(value) : 0);
                  }
                }}
                error={errors.capacite}
                helperText="Nombre de passagers"
                required
                fullWidth
              />
            </div>
            <div>
              <Select
                label="Type de carburant"
                placeholder="Sélectionnez le carburant"
                options={carburantOptions}
                value={formData.carburant}
                onChange={(e) => handleChange('carburant', e.target.value)}
                error={errors.carburant}
                required
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Informations du véhicule */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Informations du véhicule
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select
                label="Marque"
                placeholder="Sélectionnez la marque"
                options={marqueOptions}
                value={formData.marque}
                onChange={(e) => handleChange('marque', e.target.value)}
                error={errors.marque}
                required
                fullWidth
              />
            </div>
            <div>
              <Input
                label="Modèle"
                placeholder="Ex: Citaro, Urbanway"
                value={formData.modele}
                onChange={(e) => handleChange('modele', e.target.value)}
                error={errors.modele}
                required
                fullWidth
              />
            </div>
            <div>
              <Input
                label="Année"
                placeholder="Ex: 2023"
                type="text"
                value={formData.annee?.toString() || ''}
                onChange={(e) => {
                  const value = e.target.value;
                  // Permettre seulement les chiffres
                  if (/^\d*$/.test(value)) {
                    handleChange('annee', value ? parseInt(value) : new Date().getFullYear());
                  }
                }}
                error={errors.annee}
                required
                fullWidth
              />
            </div>
            <div>
              <Select
                label="Couleur"
                placeholder="Sélectionnez la couleur"
                options={couleurOptions}
                value={formData.couleur}
                onChange={(e) => handleChange('couleur', e.target.value)}
                error={errors.couleur}
                required
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Affectation */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Affectation (optionnel)
          </Text>
          <div>
            <Select
              label="Station d'affectation"
              placeholder="Sélectionnez une station"
              options={stations.map(station => ({ value: station.id, label: station.name }))}
              value={formData.stationId || ''}
              onChange={(e) => handleChange('stationId', e.target.value)}
              error={errors.stationId}
              helperText="Station où le bus sera basé"
              fullWidth
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            appearance="outline"
            variation="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Annuler
          </Button>
          <Button
            appearance="solid"
            variation="primary"
            onClick={handleSubmit}
            loading={isLoading}
            iconName="Bus"
            iconPosition="left"
          >
            {isLoading ? 'Création...' : 'Créer le bus'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
