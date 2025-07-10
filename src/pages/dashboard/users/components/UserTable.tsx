import React from 'react';
import { Card, Text, Badge, Button, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { User } from '../types';
import { formatLastLogin, formatCreatedAt, getUserInitials } from '../utils';

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading = false,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return ColorsEnum.SUCCESS;
      case 'inactive': return ColorsEnum.ERROR;
      case 'pending': return ColorsEnum.WARNING;
      default: return ColorsEnum.GRAY_500;
    }
  };

  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status: User['status']) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-full mb-4"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded mb-2"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Text variant="p1" color={ColorsEnum.TEXT_SECONDARY}>
          Aucun utilisateur trouvé
        </Text>
        <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="mt-2">
          Ajustez vos filtres ou ajoutez un nouveau utilisateur
        </Text>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                  Utilisateur
                </Text>
              </th>
              <th className="px-6 py-4 text-left">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                  Rôle
                </Text>
              </th>
              <th className="px-6 py-4 text-left">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                  Statut
                </Text>
              </th>
              <th className="px-6 py-4 text-left">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                  Dernière connexion
                </Text>
              </th>
              <th className="px-6 py-4 text-left">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                  Date de création
                </Text>
              </th>
              <th className="px-6 py-4 text-right">
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                  Actions
                </Text>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={`${user.firstName} ${user.lastName}`}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="font-medium">
                          {getUserInitials(user.firstName, user.lastName)}
                        </Text>
                      )}
                    </div>
                    <div>
                      <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                        {user.firstName} {user.lastName}
                      </Text>
                      <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                        {user.email}
                      </Text>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
                      {user.role}
                    </Text>
                    <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                      {user.department}
                    </Text>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge color={getStatusColor(user.status)}>
                    {getStatusLabel(user.status)}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                    {formatLastLogin(user.lastLogin)}
                  </Text>
                </td>
                <td className="px-6 py-4">
                  <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                    {formatCreatedAt(user.createdAt)}
                  </Text>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      size="sm"
                      color={ColorsEnum.PRIMARY}
                      onClick={() => onEdit(user)}
                      className="flex items-center gap-1"
                    >
                      <Icon name="Edit" size={14} />
                      <span>Modifier</span>
                    </Button>
                    <Button
                      size="sm"
                      color={user.status === 'active' ? ColorsEnum.WARNING : ColorsEnum.SUCCESS}
                      onClick={() => onToggleStatus(user.id)}
                      className="flex items-center gap-1"
                    >
                      <Icon name={user.status === 'active' ? 'UserX' : 'UserCheck'} size={14} />
                      <span>{user.status === 'active' ? 'Désactiver' : 'Activer'}</span>
                    </Button>
                    <Button
                      size="sm"
                      color={ColorsEnum.ERROR}
                      onClick={() => onDelete(user.id)}
                      className="flex items-center gap-1"
                    >
                      <Icon name="Trash2" size={14} />
                      <span>Supprimer</span>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
