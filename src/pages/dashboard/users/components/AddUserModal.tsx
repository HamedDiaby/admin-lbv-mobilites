import { FC, useState } from "react";
import { Text, Button, Input, Select, Modal } from "../../../../components";
import { ColorsEnum } from "../../../../utils/enums";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: NewUserData) => void;
}

export interface NewUserData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  password: string;
  confirmPassword: string;
}

export const AddUserModal: FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<NewUserData>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    department: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Partial<NewUserData>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Options pour les rôles
  const roleOptions = [
    { value: 'Administrateur', label: 'Administrateur' },
    { value: 'Superviseur', label: 'Superviseur' },
    { value: 'Gestionnaire', label: 'Gestionnaire' },
    { value: 'Analyste', label: 'Analyste' },
    { value: 'Opérateur', label: 'Opérateur' },
    { value: 'Technicien', label: 'Technicien' }
  ];

  // Options pour les départements
  const departmentOptions = [
    { value: 'Administration', label: 'Administration' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Logistique', label: 'Logistique' },
    { value: 'Maintenance', label: 'Maintenance' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Analyse', label: 'Analyse' }
  ];

  // Gestion des changements de formulaire
  const handleChange = (field: keyof NewUserData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Effacer l'erreur quand l'utilisateur tape
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: Partial<NewUserData> = {};

    // Prénom obligatoire
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Le prénom est obligatoire';
    }

    // Nom obligatoire
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Le nom est obligatoire';
    }

    // Email obligatoire et format valide
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    // Rôle obligatoire
    if (!formData.role) {
      newErrors.role = 'Le rôle est obligatoire';
    }

    // Département obligatoire
    if (!formData.department) {
      newErrors.department = 'Le département est obligatoire';
    }

    // Mot de passe obligatoire et longueur minimum
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est obligatoire';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    // Confirmation du mot de passe
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est obligatoire';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onSave(formData);
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fermeture de la modal
  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        department: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Ajouter un utilisateur"
      size="lg"
    >
      <div className="space-y-6">
        {/* Section informations personnelles */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Informations personnelles
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Prénom"
                placeholder="Entrez le prénom"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                error={errors.firstName}
                required
                fullWidth
              />
            </div>
            <div>
              <Input
                label="Nom"
                placeholder="Entrez le nom"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                error={errors.lastName}
                required
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Section contact */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Informations de contact
          </Text>
          <div>
            <Input
              label="Adresse email"
              type="email"
              placeholder="exemple@lbv-mobilites.ga"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              error={errors.email}
              required
              fullWidth
            />
          </div>
        </div>

        {/* Section rôle et département */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Rôle et département
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                label="Rôle"
                placeholder="Sélectionnez un rôle"
                options={roleOptions}
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                error={errors.role}
                required
                fullWidth
              />
            </div>
            <div>
              <Select
                label="Département"
                placeholder="Sélectionnez un département"
                options={departmentOptions}
                value={formData.department}
                onChange={(e) => handleChange('department', e.target.value)}
                error={errors.department}
                required
                fullWidth
              />
            </div>
          </div>
        </div>

        {/* Section mot de passe */}
        <div>
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
            Mot de passe
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Mot de passe"
                type="password"
                placeholder="Entrez le mot de passe"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={errors.password}
                required
                fullWidth
              />
            </div>
            <div>
              <Input
                label="Confirmer le mot de passe"
                type="password"
                placeholder="Confirmez le mot de passe"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
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
            iconName="UserPlus"
            iconPosition="left"
          >
            {isLoading ? 'Création...' : 'Créer l\'utilisateur'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
