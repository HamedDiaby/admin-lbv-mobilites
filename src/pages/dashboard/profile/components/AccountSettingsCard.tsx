import { FC } from 'react';
import { Text, Card, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { User } from '../types';
import { formatLastLogin } from '../utils';

interface AccountSettingsCardProps {
  user: User | null;
}

export const AccountSettingsCard: FC<AccountSettingsCardProps> = ({ user }) => {
  return (
    <Card className="p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="mb-4">
        <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-lg mb-2">
          Paramètres du compte
        </Text>
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
          Gérez vos préférences et paramètres de sécurité
        </Text>
      </div>

      <div className="space-y-4">
        {/* Dernière connexion */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Icon name="Clock" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                Dernière connexion
              </Text>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
                {formatLastLogin(user?.lastLogin)}
              </Text>
            </div>
          </div>
        </div>

        {/* Statut du compte */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Icon name="CheckCircle" size={18} color={ColorsEnum.SUCCESS} className="mr-3" />
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                Statut du compte
              </Text>
              <Text variant="p4" color={ColorsEnum.SUCCESS} className="text-sm">
                {user?.status === 'active' ? 'Actif' : user?.status || 'Actif'}
              </Text>
            </div>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-dark text-xs font-medium rounded-full">
            Vérifié
          </span>
        </div>

        {/* Permissions */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Icon name="Key" size={18} color={ColorsEnum.TEXT_SECONDARY} className="mr-3" />
            <div>
              <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                Permissions
              </Text>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
                {user?.permissions?.length ? 
                  `${user.permissions.length} permissions actives` : 
                  'Accès complet à toutes les fonctionnalités'
                }
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
