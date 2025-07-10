import { FC } from "react";
import { Modal } from "../../../../components/modal";
import { Text } from "../../../../components/text";
import { Badge } from "../../../../components/badge";
import { Button } from "../../../../components/button";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { PlanningData } from "../types";

interface PlanningDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  planning: PlanningData | null;
  onEdit?: (planning: PlanningData) => void;
}

export const PlanningDetailsModal: FC<PlanningDetailsModalProps> = ({
  isOpen,
  onClose,
  planning,
  onEdit
}) => {
  if (!planning) return null;

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Actif':
        return ColorsEnum.SUCCESS;
      case 'Suspendu':
        return ColorsEnum.WARNING;
      case 'Terminé':
        return ColorsEnum.ERROR;
      default:
        return ColorsEnum.TEXT_SECONDARY;
    }
  };

  const formatRecurrence = (recurrence: PlanningData['recurrence']) => {
    let text = recurrence.type;
    if (recurrence.joursActifs && recurrence.joursActifs.length > 0) {
      text += ` (${recurrence.joursActifs.join(', ')})`;
    }
    return text;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Détails du planning"
      size="md"
    >
      <div className="space-y-6">
        {/* Statut et informations principales */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={24} color={ColorsEnum.PRIMARY} />
            <div>
              <Text variant="h3" className="font-bold">
                {planning.ligne.numero} - {planning.ligne.nom}
              </Text>
              <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                Planning créé le {new Date(planning.dateCreation).toLocaleDateString('fr-FR')}
              </Text>
            </div>
          </div>
          <Badge
            variant="outline"
            color={getStatutColor(planning.statut)}
            className="text-sm"
          >
            {planning.statut}
          </Badge>
        </div>

        {/* Affectations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bus */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Bus" size={20} color={ColorsEnum.INFO} />
              <Text variant="p3" className="font-semibold">Bus assigné</Text>
            </div>
            <Text variant="p2" className="font-medium">
              {planning.bus.numeroImmatriculation}
            </Text>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              {planning.bus.marque} {planning.bus.modele}
            </Text>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              Capacité : {planning.bus.capacite} places
            </Text>
          </div>

          {/* Chauffeur */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="User" size={20} color={ColorsEnum.SUCCESS} />
              <Text variant="p3" className="font-semibold">Chauffeur assigné</Text>
            </div>
            <Text variant="p2" className="font-medium">
              {planning.chauffeur.prenom} {planning.chauffeur.nom}
            </Text>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              {planning.chauffeur.telephone}
            </Text>
            <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
              Expérience : {planning.chauffeur.experience} ans
            </Text>
          </div>
        </div>

        {/* Horaires */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Clock" size={20} color={ColorsEnum.WARNING} />
            <Text variant="p3" className="font-semibold">Horaires</Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {planning.horaires.map((horaire, index) => (
              <div
                key={horaire.id}
                className="flex items-center justify-between p-3 bg-white border border-border rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={horaire.type === 'Aller' ? "ArrowRight" : "ArrowLeft"} 
                    size={16} 
                    color={horaire.type === 'Aller' ? ColorsEnum.SUCCESS : ColorsEnum.WARNING} 
                  />
                  <Text variant="p4" className="font-medium">
                    {horaire.type}
                  </Text>
                </div>
                <Text variant="p3" className="font-mono">
                  {horaire.heureDepart} → {horaire.heureArrivee}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Récurrence */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Repeat" size={20} color={ColorsEnum.SECONDARY} />
            <Text variant="p3" className="font-semibold">Récurrence</Text>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Type :</Text>
              <Text variant="p3" className="font-medium">
                {formatRecurrence(planning.recurrence)}
              </Text>
            </div>
            <div className="flex items-center justify-between">
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Début :</Text>
              <Text variant="p3">
                {new Date(planning.recurrence.dateDebut).toLocaleDateString('fr-FR')}
              </Text>
            </div>
            {planning.recurrence.dateFin && (
              <div className="flex items-center justify-between">
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Fin :</Text>
                <Text variant="p3">
                  {new Date(planning.recurrence.dateFin).toLocaleDateString('fr-FR')}
                </Text>
              </div>
            )}
          </div>
        </div>

        {/* Commentaires */}
        {planning.commentaires && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MessageSquare" size={20} color={ColorsEnum.TEXT_SECONDARY} />
              <Text variant="p3" className="font-semibold">Commentaires</Text>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Text variant="p3">{planning.commentaires}</Text>
            </div>
          </div>
        )}

        {/* Métadonnées */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Créé le :</Text>
              <Text variant="p4">
                {new Date(planning.dateCreation).toLocaleDateString('fr-FR')}
              </Text>
            </div>
            <div>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>Mis à jour le :</Text>
              <Text variant="p4">
                {new Date(planning.dateMiseAJour).toLocaleDateString('fr-FR')}
              </Text>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
          <Button
            appearance="outline"
            variation="secondary"
            onClick={onClose}
          >
            Fermer
          </Button>
          {onEdit && (
            <Button
              appearance="solid"
              variation="primary"
              onClick={() => {
                onEdit(planning);
                onClose();
              }}
              className="flex items-center space-x-2"
            >
              <Icon name="Edit" size={16} />
              <span>Modifier</span>
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
