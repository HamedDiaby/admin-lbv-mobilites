import { FC } from "react";
import { Text } from "../../../../components/text";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { AbonnementStats } from "../types";
import { formatPrice } from "../utils";

interface AbonnementStatsProps {
  stats: AbonnementStats;
  loading?: boolean;
}

export const AbonnementStatsComponent: FC<AbonnementStatsProps> = ({ 
  stats, 
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg w-10 h-10"></div>
              <div className="ml-3 flex-1">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total abonnements */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon name="Calendar" size={20} color={ColorsEnum.PRIMARY} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Total abonnements
            </Text>
            <Text variant="h3" className="font-bold" color={ColorsEnum.TEXT_PRIMARY}>
              {stats.totalAbonnements}
            </Text>
          </div>
        </div>
      </div>

      {/* Abonnements actifs */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Icon name="CheckCircle" size={20} color={ColorsEnum.SUCCESS} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Actifs
            </Text>
            <Text variant="h3" className="font-bold" color={ColorsEnum.SUCCESS}>
              {stats.abonnementsActifs}
            </Text>
          </div>
        </div>
      </div>

      {/* Revenus mensuels */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Icon name="DollarSign" size={20} color={ColorsEnum.WARNING} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Revenus potentiels
            </Text>
            <Text variant="h3" className="font-bold" color={ColorsEnum.TEXT_PRIMARY}>
              {formatPrice(stats.revenus.total)}
            </Text>
          </div>
        </div>
      </div>

      {/* Abonnement populaire */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Icon name="TrendingUp" size={20} color={ColorsEnum.INFO} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Plus populaire
            </Text>
            <Text variant="p4" className="font-bold" color={ColorsEnum.TEXT_PRIMARY}>
              {stats.abonnementPopulaire.nom}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {stats.abonnementPopulaire.nombreUtilisateurs} utilisateurs
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
