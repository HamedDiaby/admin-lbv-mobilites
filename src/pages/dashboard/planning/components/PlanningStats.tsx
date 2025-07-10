import { FC } from "react";
import { Text } from "../../../../components/text";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";

interface PlanningStatsProps {
  stats: {
    totalPlannings: number;
    planningsActifs: number;
    planningSuspendus: number;
    chauffeursUtilises: number;
    busUtilises: number;
  };
}

export const PlanningStats: FC<PlanningStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Calendar" size={20} color={ColorsEnum.PRIMARY} />
          </div>
          <div>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              Total plannings
            </Text>
            <Text variant="h3" className="font-bold">
              {stats.totalPlannings}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <Icon name="CheckCircle" size={20} color={ColorsEnum.SUCCESS} />
          </div>
          <div>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              Plannings actifs
            </Text>
            <Text variant="h3" className="font-bold">
              {stats.planningsActifs}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-warning/10 rounded-lg">
            <Icon name="Pause" size={20} color={ColorsEnum.WARNING} />
          </div>
          <div>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              Suspendus
            </Text>
            <Text variant="h3" className="font-bold">
              {stats.planningSuspendus}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-info/10 rounded-lg">
            <Icon name="Users" size={20} color={ColorsEnum.INFO} />
          </div>
          <div>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              Chauffeurs actifs
            </Text>
            <Text variant="h3" className="font-bold">
              {stats.chauffeursUtilises}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="Bus" size={20} color={ColorsEnum.SECONDARY} />
          </div>
          <div>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              Bus utilisés
            </Text>
            <Text variant="h3" className="font-bold">
              {stats.busUtilises}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
