import { FC, useState } from "react";
import { useProfileData } from './hooks/useProfileData';
import { ProfileData } from './types';
import {
  ProfileHeader,
  ProfileCard,
  AccountSettingsCard,
  ProfileActionsCard,
  EditProfileModal
} from './components';

const Profile: FC = () => {
  // Hook personnalisé pour la gestion du profil
  const {
    user,
    isEditing,
    isSaving,
    startEditing,
    exportUserData
  } = useProfileData();

  // État local pour la modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Handlers
  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = async (profileData: ProfileData) => {
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cette logique sera gérée par le hook useProfileData
      // updateUser({
      //   firstName: profileData.firstName,
      //   lastName: profileData.lastName,
      //   email: profileData.email,
      //   department: profileData.department
      // });
      
      setIsEditModalOpen(false);
      console.log('Profil mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };

  const handleExportData = () => {
    const data = exportUserData();
    if (data) {
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'profile-data.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <ProfileHeader onEditProfile={handleEditProfile} />

      {/* Profile Card */}
      <ProfileCard user={user} />

      {/* Account Settings */}
      <AccountSettingsCard user={user} />

      {/* Actions */}
      <ProfileActionsCard 
        onEditProfile={handleEditProfile}
        onExportData={handleExportData}
      />

      {/* Modal de modification du profil */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export { Profile };
export default Profile;
