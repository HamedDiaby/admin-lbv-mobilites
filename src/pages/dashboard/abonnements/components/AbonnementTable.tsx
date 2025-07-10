import { FC } from "react";
import { Table } from "../../../../components/table";
import { Text } from "../../../../components/text";
import { Button } from "../../../../components/button";
import { Badge } from "../../../../components/badge";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { Abonnement } from "../types";
import { formatPrice, formatDuree, getStatutColor, getTypeAbonnementLabel } from "../utils";

interface AbonnementTableProps {
  abonnements: Abonnement[];
  loading?: boolean;
  onEdit: (abonnement: Abonnement) => void;
  onDelete: (id: string) => void;
  onDetails: (abonnement: Abonnement) => void;
  onDuplicate: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const AbonnementTable: FC<AbonnementTableProps> = ({
  abonnements,
  loading = false,
  onEdit,
  onDelete,
  onDetails,
  onDuplicate,
  onToggleStatus
}) => {
  const columns = [
    {
      key: 'abonnement',
      title: 'Abonnement',
      render: (_value: any, abonnement: Abonnement) => (
        <div className="flex items-center space-x-3">
          <div 
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${abonnement.couleur}20` }}
          >
            <Icon 
              name={abonnement.icone as any} 
              size={20} 
              className="text-current"
            />
          </div>
          <div className="min-w-0 flex-1">
            <Text variant="p3" className="font-medium text-gray-900 truncate">
              {abonnement.nom}
            </Text>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="truncate">
              {abonnement.description}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'prix',
      title: 'Prix',
      render: (_value: any, abonnement: Abonnement) => (
        <div>
          <Text variant="p3" className="font-semibold text-gray-900">
            {formatPrice(abonnement.prix)}
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
            {formatDuree(abonnement.duree)}
          </Text>
        </div>
      )
    },
    {
      key: 'type',
      title: 'Type',
      render: (_value: any, abonnement: Abonnement) => (
        <Badge color="info">
          {getTypeAbonnementLabel(abonnement.typeAbonnement)}
        </Badge>
      )
    },
    {
      key: 'trajets',
      title: 'Trajets',
      render: (_value: any, abonnement: Abonnement) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {abonnement.nombreTrajet === -1 ? 'Illimité' : abonnement.nombreTrajet}
        </Text>
      )
    },
    {
      key: 'statut',
      title: 'Statut',
      render: (_value: any, abonnement: Abonnement) => (
        <Badge color={getStatutColor(abonnement.statut)}>
          {abonnement.statut.charAt(0).toUpperCase() + abonnement.statut.slice(1)}
        </Badge>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_value: any, abonnement: Abonnement) => (
        <div className="flex items-center space-x-1">
          <Button
            appearance="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onDetails(abonnement)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Button
            appearance="outline"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(abonnement)}
            className="text-green-600 hover:text-green-800"
          />
          <Button
            appearance="outline"
            size="sm"
            iconName="Copy"
            onClick={() => onDuplicate(abonnement.id)}
            className="text-purple-600 hover:text-purple-800"
          />
          <Button
            appearance="outline"
            size="sm"
            iconName={abonnement.statut === 'actif' ? 'PauseCircle' : 'PlayCircle'}
            onClick={() => onToggleStatus(abonnement.id)}
            className={abonnement.statut === 'actif' 
              ? "text-orange-600 hover:text-orange-800" 
              : "text-green-600 hover:text-green-800"
            }
          />
          <Button
            appearance="outline"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(abonnement.id)}
            className="text-red-600 hover:text-red-800"
          />
        </div>
      )
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (abonnements.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center">
          <Icon name="Calendar" className="mx-auto h-12 w-12 text-gray-400" />
          <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="mt-4 font-semibold">
            Aucun abonnement trouvé
          </Text>
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="mt-2">
            Créez votre premier abonnement pour commencer.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table
        dataSource={abonnements}
        columns={columns}
        className="min-w-full"
      />
    </div>
  );
};
