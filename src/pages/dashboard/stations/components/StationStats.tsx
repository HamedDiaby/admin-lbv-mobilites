import { FC } from "react";
import { Text, Icon } from "@components";
import { ColorsEnum } from "@utils/enums";
import { City, Station } from "../types";

interface StationStatsProps {
  cities: City[];
  stations: Station[];
}

export const StationStats: FC<StationStatsProps> = ({ cities, stations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon name="MapPin" size={20} color={ColorsEnum.PRIMARY} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Villes
            </Text>
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
              {cities.length}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <Icon name="Bus" size={20} color={ColorsEnum.SUCCESS} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Stations
            </Text>
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
              {stations.length}
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
              Actives
            </Text>
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
              {stations.filter(s => s.status === 'active').length}
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Icon name="AlertTriangle" size={20} color={ColorsEnum.WARNING} />
          </div>
          <div className="ml-3">
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              Maintenance
            </Text>
            <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
              {stations.filter(s => s.status === 'maintenance').length}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};
