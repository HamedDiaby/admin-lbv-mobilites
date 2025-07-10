import { FC } from "react";
import { Text } from "../../../../components/text";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { StatistiquesClients } from "../types";
import { formatPrice } from "../utils";

interface ClientStatsProps {
  stats: StatistiquesClients;
}

export const ClientStats: FC<ClientStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon name="Users" size={20} color={ColorsEnum.PRIMARY} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Total clients
            </Text>
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
              {stats.totalClients}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Icon name="CheckCircle" size={20} color={ColorsEnum.SUCCESS} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Clients actifs
            </Text>
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
              {stats.clientsActifs}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Icon name="CreditCard" size={20} color={ColorsEnum.INFO} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Abonnements actifs
            </Text>
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
              {stats.abonnementsActifs}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Icon name="TrendingUp" size={20} color={ColorsEnum.WARNING} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              CA ce mois
            </Text>
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
              {formatPrice(stats.chiffreAffairesMois)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
