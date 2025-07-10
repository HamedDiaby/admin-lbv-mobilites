import { FC } from 'react';
import { Text, Card, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { User } from '../types';
import { formatUserName } from '../utils';

interface ProfileCardProps {
  user: User | null;
}

export const ProfileCard: FC<ProfileCardProps> = ({ user }) => {
  return (
    <Card className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-start space-x-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-br from-green to-green-light rounded-full flex items-center justify-center shadow-lg">
            <Icon name="User" size={40} color={ColorsEnum.WHITE} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nom */}
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-medium text-sm mb-1">
                Nom complet
              </Text>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                <Icon name="User" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {formatUserName(user)}
                </Text>
              </div>
            </div>

            {/* Email */}
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-medium text-sm mb-1">
                Adresse email
              </Text>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                <Icon name="Mail" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {user?.email || "admin@lbv-mobilites.ga"}
                </Text>
              </div>
            </div>

            {/* Rôle */}
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-medium text-sm mb-1">
                Rôle
              </Text>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                <Icon name="Shield" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
                <div className="flex items-center">
                  <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium mr-2">
                    {user?.role || "Administrateur"}
                  </Text>
                  <span className="px-2 py-1 bg-green-100 text-green-dark text-xs font-medium rounded-full">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            {/* Département */}
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-medium text-sm mb-1">
                Département
              </Text>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg border">
                <Icon name="Building" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
                <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                  {user?.department || "Administration"}
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
