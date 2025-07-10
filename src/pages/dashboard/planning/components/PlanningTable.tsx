import { FC } from "react";
import { Table, TableColumn, TableAction } from "../../../../components/table";
import { Text } from "../../../../components/text";
import { Badge } from "../../../../components/badge";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { PlanningData } from "../types";
import { getStatutColor } from "../utils";

interface PlanningTableProps {
  plannings: PlanningData[];
  onViewDetails: (planning: PlanningData) => void;
  onEdit: (planning: PlanningData) => void;
  onDelete: (planning: PlanningData) => void;
  onToggleStatus: (planning: PlanningData) => void;
}

export const PlanningTable: FC<PlanningTableProps> = ({
  plannings,
  onViewDetails,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  // Colonnes du tableau
  const columns: TableColumn<PlanningData>[] = [
    {
      key: "ligne",
      title: "Ligne",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Icon name="Route" size={18} color={ColorsEnum.PRIMARY} />
          <div>
            <Text variant="p3" className="font-medium">
              {record.ligne.numero}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.ligne.nom}
            </Text>
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: "bus",
      title: "Bus",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Icon name="Bus" size={18} color={ColorsEnum.INFO} />
          <div>
            <Text variant="p3" className="font-medium">
              {record.bus.numeroImmatriculation}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.bus.marque} {record.bus.modele}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: "chauffeur",
      title: "Chauffeur",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Icon name="User" size={18} color={ColorsEnum.SUCCESS} />
          <div>
            <Text variant="p3" className="font-medium">
              {record.chauffeur.prenom} {record.chauffeur.nom}
            </Text>
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.chauffeur.experience} ans d'exp.
            </Text>
          </div>
        </div>
      )
    },
    {
      key: "horaires",
      title: "Horaires",
      render: (_, record) => (
        <div className="space-y-1">
          {record.horaires.slice(0, 2).map((horaire) => (
            <div key={horaire.id} className="flex items-center space-x-2">
              <Icon 
                name={horaire.type === 'Aller' ? "ArrowRight" : "ArrowLeft"} 
                size={12} 
                color={horaire.type === 'Aller' ? ColorsEnum.SUCCESS : ColorsEnum.WARNING} 
              />
              <Text variant="p4">
                {horaire.heureDepart} - {horaire.heureArrivee}
              </Text>
            </div>
          ))}
          {record.horaires.length > 2 && (
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              +{record.horaires.length - 2} autres
            </Text>
          )}
        </div>
      )
    },
    {
      key: "recurrence",
      title: "Récurrence",
      render: (_, record) => (
        <div>
          <Text variant="p3" className="font-medium">
            {record.recurrence.type}
          </Text>
          {record.recurrence.joursActifs && (
            <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
              {record.recurrence.joursActifs.length} jours/semaine
            </Text>
          )}
        </div>
      )
    },
    {
      key: "statut",
      title: "Statut",
      render: (value) => (
        <Badge
          variant="outline"
          color={getStatutColor(value)}
          className="capitalize"
        >
          {value}
        </Badge>
      ),
      sortable: true
    },
    {
      key: "dateCreation",
      title: "Créé le",
      render: (value) => (
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
          {new Date(value).toLocaleDateString('fr-FR')}
        </Text>
      ),
      sortable: true
    }
  ];

  // Actions du tableau
  const actions: TableAction<PlanningData>[] = [
    {
      label: "Voir détails",
      icon: "Eye",
      onClick: onViewDetails
    },
    {
      label: "Modifier",
      icon: "Edit",
      onClick: onEdit
    },
    {
      label: "Dupliquer",
      icon: "Copy",
      onClick: (planning) => {
        // Logique de duplication
        console.log('Dupliquer planning:', planning.id);
      }
    },
    {
      label: "Suspendre",
      icon: "Pause",
      onClick: onToggleStatus,
      visible: (planning) => planning.statut === 'Actif'
    },
    {
      label: "Activer",
      icon: "Play",
      onClick: onToggleStatus,
      visible: (planning) => planning.statut === 'Suspendu'
    },
    {
      label: "Supprimer",
      icon: "Trash2",
      onClick: onDelete
    }
  ];

  return (
    <div className="bg-white border border-border rounded-lg">
      <Table
        columns={columns}
        dataSource={plannings}
        actions={actions}
        emptyText="Aucun planning trouvé"
      />
    </div>
  );
};
