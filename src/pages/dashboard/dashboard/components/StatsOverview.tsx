import React from 'react';
import { Card } from '../../../../components/card';
import { Badge } from '../../../../components/badge';
import { Icon } from '../../../../components/icon';
import { DashboardStats } from '../types';
import { ColorsEnum } from '../../../../utils/enums';

interface StatsOverviewProps {
  stats: DashboardStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const statItems = [
    {
      title: 'Bus en Service',
      value: stats.busEnService,
      icon: 'Bus',
      color: ColorsEnum.SUCCESS,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Bus Hors Service',
      value: stats.busHorsService,
      icon: 'AlertTriangle',
      color: ColorsEnum.ERROR,
      bgColor: 'bg-red-50',
      textColor: 'text-red-700'
    },
    {
      title: 'Passagers Total',
      value: stats.passagersTotal,
      icon: 'Users',
      color: ColorsEnum.INFO_LIGHT,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Retard Moyen',
      value: `${stats.retardMoyen} min`,
      icon: 'Clock',
      color: ColorsEnum.WARNING,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    {
      title: 'Stations Actives',
      value: stats.stationsActives,
      icon: 'MapPin',
      color: ColorsEnum.PRIMARY,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Lignes en Service',
      value: stats.lignesEnService,
      icon: 'Route',
      color: ColorsEnum.SUCCESS,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Incidents Actifs',
      value: stats.incidents,
      icon: 'AlertCircle',
      color: stats.incidents > 0 ? ColorsEnum.ERROR : ColorsEnum.SUCCESS,
      bgColor: stats.incidents > 0 ? 'bg-red-50' : 'bg-green-50',
      textColor: stats.incidents > 0 ? 'text-red-700' : 'text-green-700'
    },
    {
      title: 'Revenus du Jour',
      value: `${stats.revenus.toLocaleString()} FCFA`,
      icon: 'DollarSign',
      color: ColorsEnum.SUCCESS,
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {item.title}
              </h3>
              <p className={`text-2xl font-bold ${item.textColor}`}>
                {item.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${item.bgColor}`}>
              <Icon 
                name={item.icon as any} 
                size={24} 
                color={item.color} 
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
