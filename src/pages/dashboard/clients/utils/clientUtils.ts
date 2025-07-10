import { ColorsEnum } from "../../../../utils/enums";

// Fonction pour obtenir la couleur du statut client
export const getClientStatusColor = (statut: string) => {
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

// Fonction pour obtenir la couleur du statut abonnement
export const getAbonnementStatusColor = (statut: string) => {
  switch (statut) {
    case 'Actif':
      return ColorsEnum.SUCCESS;
    case 'Expiré':
      return ColorsEnum.ERROR;
    case 'Suspendu':
      return ColorsEnum.WARNING;
    case 'En attente':
      return ColorsEnum.INFO;
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

// Fonction pour formater le prix
export const formatPrice = (price: number): string => {
  return `${price.toLocaleString('fr-FR')} FCFA`;
};

// Fonction pour calculer l'âge
export const calculateAge = (dateNaissance: string): number => {
  const today = new Date();
  const birthDate = new Date(dateNaissance);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Fonction pour vérifier si un abonnement est proche de l'expiration
export const isAbonnementExpiringSoon = (dateFin: string, daysThreshold: number = 7): boolean => {
  const today = new Date();
  const endDate = new Date(dateFin);
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays <= daysThreshold && diffDays > 0;
};
