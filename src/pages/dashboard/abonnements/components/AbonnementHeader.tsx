import { FC } from "react";
import { Text } from "../../../../components/text";
import { Button } from "../../../../components/button";
import { ColorsEnum } from "../../../../utils/enums";

interface AbonnementHeaderProps {
  onAddAbonnement: () => void;
}

export const AbonnementHeader: FC<AbonnementHeaderProps> = ({
  onAddAbonnement
}) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <Text variant="h1" className="font-bold" color={ColorsEnum.TEXT_PRIMARY}>
          Gestion des Abonnements
        </Text>
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
          Créez et gérez les différents types d'abonnements pour vos clients
        </Text>
      </div>
      <div className="flex space-x-3">
        <Button
          appearance="solid"
          variation="primary"
          iconName="Plus"
          onClick={onAddAbonnement}
        >
          Nouvel abonnement
        </Button>
      </div>
    </div>
  );
};
