import { FC } from "react";
import { Text, Icon, Badge, Table, TableColumn, TableAction } from "@components";
import { ColorsEnum } from "@utils/enums";
import { City, Station } from "../types";

interface CitiesTableProps {
  cities: City[];
  stations: Station[];
  onAddCity: () => void;
  onViewStations: (city: City) => void;
}

export const CitiesTable: FC<CitiesTableProps> = ({ 
  cities, 
  stations, 
  onAddCity, 
  onViewStations 
}) => {
  // Fonction pour formater une date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Fonction pour formater la population
  const formatPopulation = (population?: number): string => {
    if (!population) return 'Non renseigné';
    return population.toLocaleString('fr-FR');
  };

  // Actions pour les villes
  const cityActions: TableAction<City>[] = [
    {
      label: 'Voir les stations',
      icon: 'MapPin',
      onClick: (city: City) => {
        onViewStations(city);
        console.log('Voir les stations de:', city.name);
      },
      type: 'default'
    },
    {
      label: 'Modifier',
      icon: 'Edit',
      onClick: (city: City) => {
        console.log('Modifier la ville:', city.name);
      },
      type: 'primary'
    },
    {
      label: 'Supprimer',
      icon: 'Trash2',
      onClick: (city: City) => {
        console.log('Supprimer la ville:', city.name);
      },
      type: 'danger'
    }
  ];

  // Colonnes pour les villes
  const cityColumns: TableColumn<City>[] = [
    {
      key: 'name',
      title: 'Nom de la ville',
      sortable: true,
      render: (value: string, record: City) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={16} color={ColorsEnum.WHITE} />
            </div>
          </div>
          <div>
            <Text variant="p3" color={ColorsEnum.TEXT_PRIMARY} className="font-medium">
              {value}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.province}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'province',
      title: 'Province',
      sortable: true,
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {value}
        </Text>
      )
    },
    {
      key: 'population',
      title: 'Population',
      sortable: true,
      render: (value: number) => (
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY}>
          {formatPopulation(value)}
        </Text>
      )
    },
    {
      key: 'stations',
      title: 'Stations',
      render: (_, record: City) => {
        const stationCount = stations.filter(s => s.cityId === record.id).length;
        return (
          <Badge color={stationCount > 0 ? ColorsEnum.SUCCESS : ColorsEnum.TEXT_SECONDARY}>
            {stationCount} station{stationCount > 1 ? 's' : ''}
          </Badge>
        );
      }
    },
    {
      key: 'createdAt',
      title: 'Créé le',
      sortable: true,
      render: (value: string) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
          {formatDate(value)}
        </Text>
      )
    }
  ];

  return (
    <Table
      dataSource={cities}
      columns={cityColumns}
      actions={cityActions}
      rowKey="id"
      pagination={true}
      pageSize={8}
      searchable={true}
      searchPlaceholder="Rechercher par nom de ville ou province..."
      striped={true}
      bordered={true}
      title="Liste des villes"
      subtitle={`${cities.length} villes au Gabon`}
      onAdd={onAddCity}
      addButtonText="Ajouter une ville"
    />
  );
};
