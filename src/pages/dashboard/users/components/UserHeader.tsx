import React from 'react';
import { Text, Button, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';

interface UserHeaderProps {
  onAddUser: () => void;
}

export const UserHeader: React.FC<UserHeaderProps> = ({ onAddUser }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
          Gestion des Utilisateurs
        </Text>
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
          Gérez les comptes utilisateurs et leurs permissions
        </Text>
      </div>
      
      <Button
        color={ColorsEnum.PRIMARY}
        size="md"
        onClick={onAddUser}
        className="flex items-center gap-2"
      >
        <Icon name="Plus" size={16} />
        <span>Ajouter un utilisateur</span>
      </Button>
    </div>
  );
};
