import { FC } from "react";
import { Text } from "@components";

export const LignesTest: FC = () => {
  return (
    <div className="p-6">
      <Text variant="h1" className="font-bold text-text-primary">
        Page Lignes - Test
      </Text>
      <Text variant="p2" className="mt-2">
        Cette page fonctionne correctement !
      </Text>
    </div>
  );
};
