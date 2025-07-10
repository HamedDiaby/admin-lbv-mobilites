import { FC } from 'react';
import { Text, Button } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';

interface ProfileHeaderProps {
  onEditProfile: () => void;
}

export const ProfileHeader: FC<ProfileHeaderProps> = ({ onEditProfile }) => {
  return (
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
        onClick={onEditProfile}
      >
        Modifier
      </Button>
    </div>
  );
};
