import { FC } from "react";
import { Text } from "@components";
import { ColorsEnum } from "@utils/enums";

export const BusesMinimal: FC = () => {
  return (
    <div className="p-6">
      <Text variant="h1" color={ColorsEnum.TEXT_PRIMARY}>
        Gestion des Bus
      </Text>
      <div className="mt-4 p-4 bg-green-100 rounded-lg">
        <Text variant="p2" color={ColorsEnum.SUCCESS}>
          ✅ La route /dashboard/buses fonctionne maintenant !
        </Text>
      </div>
    </div>
  );
};
