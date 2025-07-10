import { FC, useState } from "react";
import { Text, Button, Input, Icon, Modal } from "../../../../components";
import { ColorsEnum } from "../../../../utils/enums";
import { useAuth } from "../../../../contexts";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ProfileData) => void;
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  department: string;
}

export const EditProfileModal: FC<EditProfileModalProps> = ({ isOpen, onClose, onSave }) => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<ProfileData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    department: user?.department || ""
  });

  const [errors, setErrors] = useState<Partial<ProfileData>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Nettoyer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProfileData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.department.trim()) {
      newErrors.department = "Le département est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulation d'une sauvegarde (remplacer par appel API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSave(formData);
      onClose();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        department: user?.department || ""
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title="Modifier le profil"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4 pb-4 border-b border-gray-200">
          <div className="w-16 h-16 bg-gradient-to-br from-green to-green-light rounded-full flex items-center justify-center">
            <Icon name="User" size={24} color={ColorsEnum.WHITE} />
          </div>
          <div>
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
              Informations personnelles
            </Text>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
              Modifiez vos informations de profil
            </Text>
          </div>
        </div>

        {/* Formulaire */}
        <div className="space-y-4">
          {/* Prénom et Nom */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-medium text-sm mb-2">
                Prénom *
              </Text>
              <Input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Entrez votre prénom"
                error={errors.firstName}
                disabled={isLoading}
                iconName="User"
                iconPosition="left"
                className="w-full"
              />
            </div>
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-medium text-sm mb-2">
                Nom *
              </Text>
              <Input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Entrez votre nom"
                error={errors.lastName}
                disabled={isLoading}
                iconName="User"
                iconPosition="left"
                className="w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-medium text-sm mb-2">
              Adresse email *
            </Text>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Entrez votre email"
              error={errors.email}
              disabled={isLoading}
              iconName="Mail"
              iconPosition="left"
              className="w-full"
            />
          </div>

          {/* Département */}
          <div>
            <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-medium text-sm mb-2">
              Département *
            </Text>
            <Input
              type="text"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              placeholder="Entrez votre département"
              error={errors.department}
              disabled={isLoading}
              iconName="Building"
              iconPosition="left"
              className="w-full"
            />
          </div>
        </div>

        {/* Informations sur le rôle (non modifiable) */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="Shield" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  Rôle : {user?.role || "Administrateur"}
                </Text>
                <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
                  Le rôle ne peut pas être modifié
                </Text>
              </div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-dark text-xs font-medium rounded-full">
              Admin
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button
            htmlType="button"
            appearance="outline"
            variation="secondary"
            size="sm"
            onClick={handleClose}
            disabled={isLoading}
            className="border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Annuler
          </Button>
          <Button
            htmlType="submit"
            appearance="solid"
            variation="primary"
            size="sm"
            loading={isLoading}
            iconName={isLoading ? undefined : "Save"}
            iconPosition="left"
            className="bg-green hover:bg-green-dark text-white"
          >
            {isLoading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
