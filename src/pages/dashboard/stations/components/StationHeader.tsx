import { FC } from "react";
import { Text, Button, Icon } from "@components";
import { ColorsEnum } from "@utils/enums";

interface StationHeaderProps {
  activeTab: 'cities' | 'stations' | 'map';
  onAddClick: () => void;
}

export const StationHeader: FC<StationHeaderProps> = ({ activeTab, onAddClick }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Text variant="h1" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-2xl mb-2">
          Gestion des stations
        </Text>
        <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="text-base">
          Gérez les villes et stations de transport au Gabon
        </Text>
      </div>
      <Button
        appearance="solid"
        variation="primary"
        size="md"
        iconName={activeTab === 'cities' ? 'MapPin' : 'Plus'}
        iconPosition="left"
        onClick={onAddClick}
      >
        {activeTab === 'cities' ? 'Ajouter une ville' : 'Ajouter une station'}
      </Button>
    </div>
  );
};
