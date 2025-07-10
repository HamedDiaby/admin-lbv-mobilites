import { ColorsEnum } from "../../../../utils/enums";

// Fonction pour obtenir la couleur du badge de statut
export const getStatutColor = (statut: string) => {
  switch (statut) {
    case 'Actif':
      return ColorsEnum.SUCCESS;
    case 'Suspendu':
      return ColorsEnum.WARNING;
    case 'Inactif':
      return ColorsEnum.ERROR;
    default:
      return ColorsEnum.TEXT_SECONDARY;
  }
};

// Fonction pour formater une date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Fonction pour formater une heure
export const formatTime = (timeString: string): string => {
  return timeString;
};

// Fonction pour obtenir le texte du statut
export const getStatutText = (statut: string): string => {
  switch (statut) {
    case 'Actif':
      return 'Actif';
    case 'Suspendu':
      return 'Suspendu';
    case 'Inactif':
      return 'Inactif';
    default:
      return 'Inconnu';
  }
};
