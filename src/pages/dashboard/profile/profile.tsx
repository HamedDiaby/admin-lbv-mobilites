import { FC, useState } from "react";
import { Text, Card, Icon, Button } from "@components";
import { ColorsEnum } from "@utils/enums";
import { useAuth } from "@contexts";
import { EditProfileModal, ProfileData } from "./EditProfileModal";

export const Profile: FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (profileData: ProfileData) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour du contexte utilisateur
      updateUser({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        department: profileData.department
      });
      
      setIsEditModalOpen(false);
      // Ici, vous pourriez ajouter une notification de succès
      console.log('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      // Ici, vous pourriez ajouter une notification d'erreur
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Text variant="h1" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-2xl mb-2">
            Profil utilisateur
          </Text>
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="text-base">
            Gérez vos informations personnelles et paramètres de compte
          </Text>
        </div>
        <Button
          appearance="outline"
          variation="primary"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          className="border-green text-green hover:bg-green hover:text-white"
          onClick={handleEditProfile}
        >
          Modifier
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-start space-x-6">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-green to-green-light rounded-full flex items-center justify-center shadow-lg">
              <Icon name="User" size={40} color={ColorsEnum.WHITE} />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nom */}
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-medium text-sm mb-1">
                  Nom complet
                </Text>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                  <Icon name="User" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
                  <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                    {user?.firstName || "Prénom"} {user?.lastName || "Nom"}
                  </Text>
                </div>
              </div>

              {/* Email */}
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-medium text-sm mb-1">
                  Adresse email
                </Text>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                  <Icon name="Mail" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
                  <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                    {user?.email || "admin@lbv-mobilites.ga"}
                  </Text>
                </div>
              </div>

              {/* Rôle */}
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-medium text-sm mb-1">
                  Rôle
                </Text>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                  <Icon name="Shield" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
                  <div className="flex items-center">
                    <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium mr-2">
                      {user?.role || "Administrateur"}
                    </Text>
                    <span className="px-2 py-1 bg-green-100 text-green-dark text-xs font-medium rounded-full">
                      Admin
                    </span>
                  </div>
                </div>
              </div>

              {/* Département */}
              <div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-medium text-sm mb-1">
                  Département
                </Text>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                  <Icon name="Building" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
                  <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                    {user?.department || "Administration"}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="mb-4">
          <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-lg mb-2">
            Paramètres du compte
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
            Gérez vos préférences et paramètres de sécurité
          </Text>
        </div>

        <div className="space-y-4">
          {/* Dernière connexion */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Icon name="Clock" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
              <div>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  Dernière connexion
                </Text>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
                  {user?.lastLogin || "Aujourd'hui à 14:30"}
                </Text>
              </div>
            </div>
          </div>

          {/* Statut du compte */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Icon name="CheckCircle" size={18} color={ColorsEnum.SUCCESS} className="mr-3" />
              <div>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  Statut du compte
                </Text>
                <Text variant="p4" color={ColorsEnum.SUCCESS} className="text-sm">
                  Actif
                </Text>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-dark text-xs font-medium rounded-full">
              Vérifié
            </span>
          </div>

          {/* Permissions */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <Icon name="Key" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
              <div>
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  Permissions
                </Text>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
                  Accès complet à toutes les fonctionnalités
                </Text>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <Card className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="mb-4">
          <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-lg mb-2">
            Actions
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
            Gérez votre compte et vos paramètres de sécurité
          </Text>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            appearance="outline"
            variation="primary"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            className="border-blue text-blue hover:bg-blue hover:text-white"
            onClick={handleEditProfile}
          >
            Modifier le profil
          </Button>
          <Button
            appearance="outline"
            variation="secondary"
            size="sm"
            iconName="Lock"
            iconPosition="left"
            className="border-yellow text-yellow hover:bg-yellow hover:text-white"
          >
            Changer mot de passe
          </Button>
          <Button
            appearance="outline"
            variation="secondary"
            size="sm"
            iconName="Settings"
            iconPosition="left"
            className="border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white"
          >
            Paramètres
          </Button>
        </div>
      </Card>

      {/* Modal de modification du profil */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};
