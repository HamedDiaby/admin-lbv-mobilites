import { FC } from "react";
import { Text } from "../../../../components/text";
import { Button } from "../../../../components/button";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";

interface ClientHeaderProps {
  onAddClient: () => void;
  onScanQR: () => void;
}

export const ClientHeader: FC<ClientHeaderProps> = ({ onAddClient, onScanQR }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Text variant="h1" className="font-bold text-text-primary">
          Gestion des Clients
        </Text>
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
          Gérez les clients et leurs abonnements au transport
        </Text>
      </div>
      <div className="flex items-center space-x-3">
        <Button
          appearance="outline"
          variation="primary"
          onClick={onScanQR}
          className="flex items-center space-x-2"
        >
          <Icon name="QrCode" size={16} />
          <span>Scanner QR</span>
        </Button>
        <Button
          appearance="solid"
          variation="primary"
          onClick={onAddClient}
          className="flex items-center space-x-2"
        >
          <Icon name="Plus" size={16} />
          <span>Nouveau client</span>
        </Button>
      </div>
    </div>
  );
};
