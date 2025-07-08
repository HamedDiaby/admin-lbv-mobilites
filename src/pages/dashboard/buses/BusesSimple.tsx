import { FC } from "react";
import { Text } from "@components";
import { ColorsEnum } from "@utils/enums";

export const BusesSimple: FC = () => {
  return (
    <div className="p-6">
      <Text variant="h2" color={ColorsEnum.TEXT_PRIMARY} className="mb-6">
        Gestion des Bus
      </Text>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY}>
          Page des bus en cours de développement...
        </Text>
      </div>
    </div>
  );
};
