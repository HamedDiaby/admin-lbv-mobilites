import React from 'react';
import { Text, Button } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';

interface SettingsHeaderProps {
  onSave: () => void;
  onExport: () => void;
  onReset: () => void;
  saving?: boolean;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ 
  onSave, 
  onExport, 
  onReset, 
  saving = false 
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
          Paramètres Système
        </Text>
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
          Configurez les paramètres de votre système de transport
        </Text>
      </div>
      
      <div className="flex items-center gap-3">
        <Button
          color={ColorsEnum.GRAY_500}
          size="sm"
          onClick={onExport}
          disabled={saving}
        >
          Exporter
        </Button>
        
        <Button
          color={ColorsEnum.WARNING}
          size="sm"
          onClick={onReset}
          disabled={saving}
        >
          Réinitialiser
        </Button>
        
        <Button
          color={ColorsEnum.PRIMARY}
          size="md"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      </div>
    </div>
  );
};
