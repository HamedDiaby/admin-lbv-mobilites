import { FC } from "react";
import { Table } from "../../../../components/table";
import { Text } from "../../../../components/text";
import { Button } from "../../../../components/button";
import { Badge } from "../../../../components/badge";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { Client } from "../types";

interface ClientsTableProps {
  clients: Client[];
  onClientDetails: (client: Client) => void;
  onClientEdit: (client: Client) => void;
  onClientDelete: (clientId: string) => void;
}

export const ClientsTable: FC<ClientsTableProps> = ({
  clients,
  onClientDetails,
  onClientEdit,
  onClientDelete
}) => {
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Actif':
        return 'success';
      case 'Inactif':
        return 'warning';
      case 'Suspendu':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const columns = [
    {
      key: 'client',
      title: 'Client',
      render: (_value: any, client: Client) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Text variant="p4" className="font-semibold text-blue-600">
                {client.prenom.charAt(0).toUpperCase()}{client.nom.charAt(0).toUpperCase()}
              </Text>
            </div>
          </div>
          <div>
            <Text variant="p3" className="font-medium text-gray-900">
              {client.prenom} {client.nom}
            </Text>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              {client.email}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'telephone',
      title: 'Téléphone',
      render: (_value: any, client: Client) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {client.telephone}
        </Text>
      )
    },
    {
      key: 'ville',
      title: 'Ville',
      render: (_value: any, client: Client) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {client.ville}
        </Text>
      )
    },
    {
      key: 'statut',
      title: 'Statut',
      render: (_value: any, client: Client) => (
        <Badge color={getStatutColor(client.statut)}>
          {client.statut}
        </Badge>
      )
    },
    {
      key: 'dateInscription',
      title: 'Date d\'inscription',
      render: (_value: any, client: Client) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {formatDate(client.dateInscription)}
        </Text>
      )
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_value: any, client: Client) => (
        <div className="flex items-center space-x-2">
          <Button
            appearance="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onClientDetails(client)}
            className="text-blue-600 hover:text-blue-800"
          />
          <Button
            appearance="outline"
            size="sm"
            iconName="Edit"
            onClick={() => onClientEdit(client)}
            className="text-green-600 hover:text-green-800"
          />
          <Button
            appearance="outline"
            size="sm"
            iconName="Trash2"
            onClick={() => onClientDelete(client.id)}
            className="text-red-600 hover:text-red-800"
          />
        </div>
      )
    }
  ];

  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center">
          <Icon name="Users" className="mx-auto h-12 w-12 text-gray-400" />
          <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="mt-4 font-semibold">
            Aucun client trouvé
          </Text>
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="mt-2">
            Aucun client ne correspond aux critères de recherche.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table
        dataSource={clients}
        columns={columns}
        className="min-w-full"
      />
    </div>
  );
};
