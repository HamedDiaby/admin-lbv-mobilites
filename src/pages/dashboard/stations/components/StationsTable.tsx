import { FC } from "react";
import { Text, Table, TableColumn, TableAction } from "@components";
import { ColorsEnum } from "@utils/enums";
import { Station } from "../types";

interface StationsTableProps {
  stations: Station[];
  filteredStations: Station[];
  onAddStation: () => void;
}

export const StationsTable: FC<StationsTableProps> = ({ 
  stations, 
  filteredStations, 
  onAddStation 
}) => {
  // Actions pour les stations
  const stationActions: TableAction<Station>[] = [
    {
      label: 'Voir le détail',
      icon: 'Eye',
      onClick: (station: Station) => {
        console.log('Voir le détail de:', station.name);
      },
      type: 'default'
    },
    {
      label: 'Modifier',
      icon: 'Edit',
      onClick: (station: Station) => {
        console.log('Modifier la station:', station.name);
      },
      type: 'primary'
    },
    {
      label: 'Dupliquer',
      icon: 'Copy',
      onClick: (station: Station) => {
        console.log('Dupliquer la station:', station.name);
      },
      type: 'success'
    },
    {
      label: 'Désactiver',
      icon: 'Power',
      onClick: (station: Station) => {
        console.log('Désactiver la station:', station.name);
      },
      type: 'warning',
      visible: (station: Station) => station.status === 'active'
    },
    {
      label: 'Activer',
      icon: 'PowerOff',
      onClick: (station: Station) => {
        console.log('Activer la station:', station.name);
      },
      type: 'success',
      visible: (station: Station) => station.status === 'inactive'
    },
    {
      label: 'Supprimer',
      icon: 'Trash2',
      onClick: (station: Station) => {
        console.log('Supprimer la station:', station.name);
      },
      type: 'danger'
    }
  ];

  // Colonnes pour les stations
  const stationColumns: TableColumn<Station>[] = [
    {
      key: 'name',
      title: 'Nom de la station',
      sortable: true,
      render: (value: string) => (
        <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
          {value}
        </Text>
      )
    },
    {
      key: 'cityName',
      title: 'Ville',
      sortable: true,
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {value}
        </Text>
      )
    },
    {
      key: 'address',
      title: 'Adresse',
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="max-w-xs">
          {value}
        </Text>
      )
    },
    {
      key: 'coordinates',
      title: 'Latitude',
      render: (value: { latitude: number; longitude: number } | undefined) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {value ? value.latitude.toFixed(6) : 'Non définie'}
        </Text>
      )
    },
    {
      key: 'coordinates',
      title: 'Longitude',
      render: (value: { latitude: number; longitude: number } | undefined) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {value ? value.longitude.toFixed(6) : 'Non définie'}
        </Text>
      )
    }
  ];

  return (
    <Table
      dataSource={filteredStations}
      columns={stationColumns}
      actions={stationActions}
      rowKey="id"
      pagination={true}
      pageSize={8}
      searchable={true}
      searchPlaceholder="Rechercher par nom de station, ville ou adresse..."
      striped={true}
      bordered={true}
      title="Liste des stations"
      subtitle={`${filteredStations.length} stations affichées sur ${stations.length} au total`}
      onAdd={onAddStation}
      addButtonText="Ajouter une station"
    />
  );
};
