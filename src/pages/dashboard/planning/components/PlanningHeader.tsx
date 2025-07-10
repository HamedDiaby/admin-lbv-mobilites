import { FC } from "react";
import { Text } from "../../../../components/text";
import { ColorsEnum } from "../../../../utils/enums";

export const PlanningHeader: FC = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Text variant="h1" className="font-bold text-text-primary">
          Gestion du Planning
        </Text>
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mt-1">
          Programmez et gérez les horaires, bus et chauffeurs pour chaque ligne
        </Text>
      </div>
    </div>
  );
};
