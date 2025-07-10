import { Abonnement, AbonnementStats } from "../types";

/**
 * Formate un prix en FCFA
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    minimumFractionDigits: 0
  }).format(price);
};

/**
 * Formate une date au format français
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Formate une durée en jours
 */
export const formatDuree = (duree: number): string => {
  if (duree === 1) return '1 jour';
  if (duree === 7) return '1 semaine';
  if (duree === 30) return '1 mois';
  if (duree === 365) return '1 an';
  return `${duree} jours`;
};

/**
 * Obtient la couleur pour un statut d'abonnement
 */
export const getStatutColor = (statut: string) => {
  switch (statut) {
    case 'actif':
      return 'success';
    case 'inactif':
      return 'error';
    case 'brouillon':
      return 'warning';
    default:
      return 'default';
  }
};

/**
 * Obtient le libellé pour un type d'abonnement
 */
export const getTypeAbonnementLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'mensuel': 'Mensuel',
    'hebdomadaire': 'Hebdomadaire',
    'journalier': 'Journalier',
    'annuel': 'Annuel',
    'personnalise': 'Personnalisé'
  };
  return labels[type] || type;
};

/**
 * Calcule les statistiques des abonnements
 */
export const calculateAbonnementStats = (abonnements: Abonnement[]): AbonnementStats => {
  const totalAbonnements = abonnements.length;
  const abonnementsActifs = abonnements.filter(a => a.statut === 'actif').length;
  const abonnementsInactifs = abonnements.filter(a => a.statut === 'inactif').length;

  // Calcul des revenus potentiels
  const revenusTotal = abonnements
    .filter(a => a.statut === 'actif')
    .reduce((total, a) => total + a.prix, 0);

  const revenusMensuel = abonnements
    .filter(a => a.statut === 'actif' && a.typeAbonnement === 'mensuel')
    .reduce((total, a) => total + a.prix, 0);

  const revenusHebdomadaire = abonnements
    .filter(a => a.statut === 'actif' && a.typeAbonnement === 'hebdomadaire')
    .reduce((total, a) => total + a.prix, 0);

  // Abonnement le plus populaire (simulé)
  const abonnementPopulaire = abonnements
    .filter(a => a.statut === 'actif')
    .sort((a, b) => a.prix - b.prix)[0] || {
      id: '',
      nom: 'Aucun',
      nombreUtilisateurs: 0
    };

  return {
    totalAbonnements,
    abonnementsActifs,
    abonnementsInactifs,
    revenus: {
      mensuel: revenusMensuel,
      hebdomadaire: revenusHebdomadaire,
      total: revenusTotal,
    },
    abonnementPopulaire: {
      id: abonnementPopulaire.id,
      nom: abonnementPopulaire.nom,
      nombreUtilisateurs: Math.floor(Math.random() * 500) + 100 // Simulé
    }
  };
};

/**
 * Filtre les abonnements selon les critères
 */
export const filterAbonnements = (
  abonnements: Abonnement[],
  filters: {
    statut?: string;
    typeAbonnement?: string;
    prixMin?: number;
    prixMax?: number;
    searchTerm?: string;
  }
): Abonnement[] => {
  return abonnements.filter(abonnement => {
    // Filtre par statut
    if (filters.statut && filters.statut !== 'tous' && abonnement.statut !== filters.statut) {
      return false;
    }

    // Filtre par type
    if (filters.typeAbonnement && filters.typeAbonnement !== 'tous' && abonnement.typeAbonnement !== filters.typeAbonnement) {
      return false;
    }

    // Filtre par prix
    if (filters.prixMin !== undefined && abonnement.prix < filters.prixMin) {
      return false;
    }
    if (filters.prixMax !== undefined && abonnement.prix > filters.prixMax) {
      return false;
    }

    // Filtre par terme de recherche
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        abonnement.nom.toLowerCase().includes(searchLower) ||
        abonnement.description.toLowerCase().includes(searchLower) ||
        abonnement.avantages.some(a => a.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });
};

/**
 * Génère un ID unique pour un nouvel abonnement
 */
export const generateAbonnementId = (): string => {
  return `abo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valide les données d'un abonnement
 */
export const validateAbonnementData = (data: any): string[] => {
  const errors: string[] = [];

  if (!data.nom || data.nom.trim().length < 3) {
    errors.push('Le nom doit contenir au moins 3 caractères');
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.push('La description doit contenir au moins 10 caractères');
  }

  if (!data.prix || data.prix <= 0) {
    errors.push('Le prix doit être supérieur à 0');
  }

  if (!data.duree || data.duree <= 0) {
    errors.push('La durée doit être supérieure à 0');
  }

  if (!data.typeAbonnement) {
    errors.push('Le type d\'abonnement est requis');
  }

  return errors;
};
