import { FC } from "react";
import { Table } from "../../../../components/table";
import { Text } from "../../../../components/text";
import { Button } from "../../../../components/button";
import { Badge } from "../../../../components/badge";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { Abonnement } from "../types";

interface AbonnementsTableProps {
  abonnements: Abonnement[];
  onAbonnementDetails: (abonnement: Abonnement) => void;
  onAbonnementEdit: (abonnement: Abonnement) => void;
  onAbonnementDelete: (abonnementId: string) => void;
}

export const AbonnementsTable: FC<AbonnementsTableProps> = ({
  abonnements,
  onAbonnementDetails,
  onAbonnementEdit,
  onAbonnementDelete
}) => {
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Actif':
        return 'success';
      case 'Expiré':
        return 'error';
      case 'Suspendu':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const formatPrix = (prix: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(prix);
  };

  const columns = [
    {
      key: 'client',
      title: 'Client',
      render: (_value: any, abonnement: Abonnement) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <Icon name="User" className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div>
            <Text variant="p3" className="font-medium text-gray-900">
              {abonnement.client.prenom} {abonnement.client.nom}
            </Text>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              {abonnement.client.email}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'type',
      title: 'Type d\'abonnement',
      render: (_value: any, abonnement: Abonnement) => (
        <div>
          <Text variant="p3" className="font-medium text-gray-900">
            {abonnement.typeAbonnement.nom}
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
            {formatPrix(abonnement.typeAbonnement.prix)}
          </Text>
        </div>
      )
    },
    {
      key: 'periode',
      title: 'Période',
      render: (_value: any, abonnement: Abonnement) => (
        <div>
          <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
            Du {formatDate(abonnement.dateDebut)}
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
            Au {formatDate(abonnement.dateFin)}
          </Text>
        </div>
      )
    },
    {
      key: 'statut',
      title: 'Statut',
      render: (_value: any, abonnement: Abonnement) => (
        <Badge color={getStatutColor(abonnement.statut)}>
          {abonnement.statut}
        </Badge>
      )
    },
    {
      key: 'utilisation',
      title: 'Utilisation',
      render: (_value: any, abonnement: Abonnement) => {
        const voyagesMax = abonnement.typeAbonnement.nbVoyagesMax || 0;
        const voyagesUtilises = abonnement.nbVoyagesUtilises;
        const voyagesRestants = abonnement.nbVoyagesRestants || (voyagesMax - voyagesUtilises);
        
        return (
          <div className="flex flex-col">
            <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
              {voyagesRestants} / {voyagesMax > 0 ? voyagesMax : '∞'} voyages
            </Text>
            {voyagesMax > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ 
                    width: `${(voyagesUtilises / voyagesMax) * 100}%` 
                  }}
                ></div>
              </div>
            )}
          </div>
        );
      }
    },
    {
      key: 'dateCreation',
      title: 'Date de création',
      render: (_value: any, abonnement: Abonnement) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {formatDate(abonnement.dateCreation)}
        </Text>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_value: any, abonnement: Abonnement) => (
        <div className="flex items-center space-x-2">
          <Button
            appearance="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onAbonnementDetails(abonnement)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Button
            appearance="outline"
            size="sm"
            iconName="Edit"
            onClick={() => onAbonnementEdit(abonnement)}
            className="text-green-600 hover:text-green-800"
          />
          <Button
            appearance="outline"
            size="sm"
            iconName="Trash2"
            onClick={() => onAbonnementDelete(abonnement.id)}
            className="text-red-600 hover:text-red-800"
          />
        </div>
      )
    }
  ];

  if (abonnements.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center">
          <Icon name="Calendar" className="mx-auto h-12 w-12 text-gray-400" />
          <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="mt-4 font-semibold">
            Aucun abonnement trouvé
          </Text>
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="mt-2">
            Aucun abonnement ne correspond aux critères de recherche.
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
