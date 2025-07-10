import React from 'react';
import { Card, Text, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { UserStats } from '../types';

interface UserStatsComponentProps {
  stats: UserStats;
  loading?: boolean;
}

export const UserStatsComponent: React.FC<UserStatsComponentProps> = ({ 
  stats, 
  loading = false 
}) => {
  const statsData = [
    {
      title: 'Total Utilisateurs',
      value: stats.total,
      icon: 'Users',
      color: ColorsEnum.PRIMARY,
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Utilisateurs Actifs',
      value: stats.active,
      icon: 'UserCheck',
      color: ColorsEnum.SUCCESS,
      bgColor: 'bg-green-100'
    },
    {
      title: 'Utilisateurs Inactifs',
      value: stats.inactive,
      icon: 'UserX',
      color: ColorsEnum.ERROR,
      bgColor: 'bg-red-100'
    },
    {
      title: 'En Attente',
      value: stats.pending,
      icon: 'UserPlus',
      color: ColorsEnum.WARNING,
      bgColor: 'bg-yellow-100'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-8 bg-gray-200 rounded w-12"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                {stat.title}
              </Text>
              <Text variant="h2" color={ColorsEnum.TEXT_PRIMARY} className="font-bold">
                {stat.value.toLocaleString()}
              </Text>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon as any} size={24} color={stat.color} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
