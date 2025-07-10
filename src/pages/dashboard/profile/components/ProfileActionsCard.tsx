import { FC } from 'react';
import { Text, Card, Button } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';

interface ProfileActionsCardProps {
  onEditProfile: () => void;
  onChangePassword?: () => void;
  onSettings?: () => void;
  onExportData?: () => void;
}

export const ProfileActionsCard: FC<ProfileActionsCardProps> = ({
  onEditProfile,
  onChangePassword,
  onSettings,
  onExportData
}) => {
  const handleChangePassword = () => {
    if (onChangePassword) {
      onChangePassword();
    } else {
      alert('Fonctionnalité de changement de mot de passe à implémenter');
    }
  };

  const handleSettings = () => {
    if (onSettings) {
      onSettings();
    } else {
      alert('Redirection vers les paramètres à implémenter');
    }
  };

  const handleExportData = () => {
    if (onExportData) {
      onExportData();
    } else {
      alert('Export des données à implémenter');
    }
  };

  return (
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
          onClick={onEditProfile}
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
          onClick={handleChangePassword}
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
          onClick={handleSettings}
        >
          Paramètres
        </Button>
        <Button
          appearance="outline"
          variation="secondary"
          size="sm"
          iconName="Download"
          iconPosition="left"
          className="border-green text-green hover:bg-green hover:text-white"
          onClick={handleExportData}
        >
          Exporter données
        </Button>
      </div>
    </Card>
  );
};
