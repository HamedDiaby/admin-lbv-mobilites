// Types pour la gestion des abonnements
export interface Abonnement {
  id: string;
  nom: string;
  description: string;
  prix: number;
  duree: number; // en jours
  typeAbonnement: 'mensuel' | 'hebdomadaire' | 'journalier' | 'annuel' | 'personnalise';
  avantages: string[];
  nombreTrajet: number; // nombre de trajets inclus (-1 pour illimité)
  lignesIncluses: string[]; // IDs des lignes incluses (vide = toutes les lignes)
  heuresValidite: {
    debut: string; // HH:mm
    fin: string; // HH:mm
  };
  joursValidite: string[]; // ['lundi', 'mardi', ...] (vide = tous les jours)
  statut: 'actif' | 'inactif' | 'brouillon';
  couleur: string; // couleur d'affichage
  icone: string; // nom de l'icône
  conditions: string; // conditions d'utilisation
  reduction: {
    type: 'pourcentage' | 'montant' | 'aucune';
    valeur: number;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string; // ID de l'utilisateur créateur
}

// Types pour les formulaires
export interface NewAbonnementData {
  nom: string;
  description: string;
  prix: number;
  duree: number;
  typeAbonnement: Abonnement['typeAbonnement'];
  avantages: string[];
  nombreTrajet: number;
  lignesIncluses: string[];
  heuresValidite: {
    debut: string;
    fin: string;
  };
  joursValidite: string[];
  couleur: string;
  icone: string;
  conditions: string;
  reduction: {
    type: 'pourcentage' | 'montant' | 'aucune';
    valeur: number;
    description: string;
  };
}

export interface AbonnementFormErrors {
  nom?: string;
  description?: string;
  prix?: string;
  duree?: string;
  typeAbonnement?: string;
  avantages?: string;
  nombreTrajet?: string;
  heuresValidite?: string;
  conditions?: string;
  reduction?: string;
}

// Types pour les filtres
export interface AbonnementFilters {
  statut: string;
  typeAbonnement: string;
  prixMin: number;
  prixMax: number;
}

// Types pour les statistiques d'abonnement
export interface AbonnementStats {
  totalAbonnements: number;
  abonnementsActifs: number;
  abonnementsInactifs: number;
  revenus: {
    mensuel: number;
    hebdomadaire: number;
    total: number;
  };
  abonnementPopulaire: {
    id: string;
    nom: string;
    nombreUtilisateurs: number;
  };
}

// Types pour l'historique des souscriptions
export interface SouscriptionAbonnement {
  id: string;
  abonnementId: string;
  clientId: string;
  clientNom: string;
  clientEmail: string;
  dateDebut: string;
  dateFin: string;
  statut: 'actif' | 'expire' | 'suspendu' | 'annule';
  prixPaye: number;
  methodePaiement: string;
  trajetsUtilises: number;
  createdAt: string;
}
