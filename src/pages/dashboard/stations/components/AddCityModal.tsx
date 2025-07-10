import { FC, useState } from "react";
import { Text, Button, Input, Select, Modal } from "@components";
import { ColorsEnum } from "@utils/enums";
import { NewCityData, CityFormErrors } from "../types";

interface AddCityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cityData: NewCityData) => void;
}

export const AddCityModal: FC<AddCityModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<NewCityData>({
    name: '',
    province: ''
  });

  const [errors, setErrors] = useState<CityFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Provinces du Gabon
  const provinceOptions = [
    { value: 'Estuaire', label: 'Estuaire' },
    { value: 'Haut-Ogooué', label: 'Haut-Ogooué' },
    { value: 'Moyen-Ogooué', label: 'Moyen-Ogooué' },
    { value: 'Ngounié', label: 'Ngounié' },
    { value: 'Nyanga', label: 'Nyanga' },
    { value: 'Ogooué-Ivindo', label: 'Ogooué-Ivindo' },
    { value: 'Ogooué-Lolo', label: 'Ogooué-Lolo' },
    { value: 'Ogooué-Maritime', label: 'Ogooué-Maritime' },
    { value: 'Woleu-Ntem', label: 'Woleu-Ntem' }
  ];

  // Gestion des changements de formulaire
  const handleChange = (field: keyof NewCityData, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Effacer l'erreur quand l'utilisateur tape
    if (errors[field as keyof CityFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: CityFormErrors = {};

    // Nom obligatoire
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la ville est obligatoire';
    }

    // Province obligatoire
    if (!formData.province) {
      newErrors.province = 'La province est obligatoire';
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
      console.error('Erreur lors de la création de la ville:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fermeture de la modal
  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        name: '',
        province: ''
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Ajouter une ville"
      size="md"
    >
      <div className="space-y-6">
        {/* Informations de base */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Informations de base
          </Text>
          <div className="space-y-4">
            <div>
              <Input
                label="Nom de la ville"
                placeholder="Ex: Libreville"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                required
                fullWidth
              />
            </div>
            <div>
              <Select
                label="Province"
                placeholder="Sélectionnez une province"
                options={provinceOptions}
                value={formData.province}
                onChange={(e) => handleChange('province', e.target.value)}
                error={errors.province}
                required
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
            {isLoading ? 'Création...' : 'Créer la ville'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
