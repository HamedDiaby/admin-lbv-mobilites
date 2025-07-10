import { FC, useState } from "react";
import { Text, Button, Input, Select, Modal } from "@components";
import { ColorsEnum } from "@utils/enums";
import { NewStationData, StationFormErrors } from "../types";

interface AddStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (stationData: NewStationData) => void;
  cities: Array<{ id: string; name: string }>;
}

export const AddStationModal: FC<AddStationModalProps> = ({ isOpen, onClose, onSave, cities }) => {
  const [formData, setFormData] = useState<NewStationData>({
    name: '',
    cityId: '',
    address: '',
    latitude: undefined,
    longitude: undefined
  });

  const [errors, setErrors] = useState<StationFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Gestion des changements de formulaire
  const handleChange = (field: keyof NewStationData, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Effacer l'erreur quand l'utilisateur tape
    if (errors[field as keyof StationFormErrors]) {
      setErrors((prev: StationFormErrors) => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: StationFormErrors = {};

    // Nom obligatoire
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la station est obligatoire';
    }

    // Ville obligatoire
    if (!formData.cityId) {
      newErrors.cityId = 'La ville est obligatoire';
    }

    // Adresse obligatoire
    if (!formData.address.trim()) {
      newErrors.address = 'L\'adresse est obligatoire';
    }

    // Validation des coordonnées
    if (formData.latitude && (formData.latitude < -90 || formData.latitude > 90)) {
      newErrors.latitude = 'La latitude doit être entre -90 et 90';
    }

    if (formData.longitude && (formData.longitude < -180 || formData.longitude > 180)) {
      newErrors.longitude = 'La longitude doit être entre -180 et 180';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion de la soumission
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSave(formData);
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création de la station:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fermeture de la modal
  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        name: '',
        cityId: '',
        address: '',
        latitude: undefined,
        longitude: undefined
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Ajouter une station"
      size="lg"
    >
      <div className="space-y-6">
        {/* Informations de base */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Informations de la station
          </Text>
          <div className="space-y-4">
            <div>
              <Input
                label="Nom de la station"
                placeholder="Ex: Gare de Libreville"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                required
                fullWidth
              />
            </div>
            <div>
              <Select
                label="Ville"
                placeholder="Sélectionnez une ville"
                options={cities.map(city => ({ value: city.id, label: city.name }))}
                value={formData.cityId}
                onChange={(e) => handleChange('cityId', e.target.value)}
                error={errors.cityId}
                required
                fullWidth
              />
            </div>
            <div>
              <Input
                label="Adresse"
                placeholder="Ex: Avenue de la Liberté, Libreville"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                error={errors.address}
                required
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Coordonnées GPS */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Coordonnées GPS (optionnel)
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Latitude"
                placeholder="Ex: 0.3964"
                value={formData.latitude?.toString() || ''}
                onChange={(e) => handleChange('latitude', e.target.value ? parseFloat(e.target.value) : undefined)}
                error={errors.latitude}
                helperText="Coordonnée GPS latitude"
                fullWidth
              />
            </div>
            <div>
              <Input
                label="Longitude"
                placeholder="Ex: 9.4673"
                value={formData.longitude?.toString() || ''}
                onChange={(e) => handleChange('longitude', e.target.value ? parseFloat(e.target.value) : undefined)}
                error={errors.longitude}
                helperText="Coordonnée GPS longitude"
                fullWidth
              />
            </div>
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
            iconName="MapPin"
            iconPosition="left"
          >
            {isLoading ? 'Création...' : 'Créer la station'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
