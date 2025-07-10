export interface Chauffeur {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  numeroPermis: string;
  dateEmbauche: string;
  statut: 'Disponible' | 'En service' | 'Repos' | 'Congé' | 'Indisponible';
  experience: number; // en années
  avatar?: string;
}

export interface Bus {
  id: string;
  numeroImmatriculation: string;
  marque: string;
  modele: string;
  capacite: number;
  annee: number;
  statut: 'Disponible' | 'En service' | 'Maintenance' | 'Hors service';
  kilometrage: number;
  dateAchat: string;
  prochaineMaintenance: string;
}

export interface Horaire {
  id: string;
  heureDepart: string; // Format HH:MM
  heureArrivee: string; // Format HH:MM
  type: 'Aller' | 'Retour';
}

export interface Recurrence {
  type: 'Quotidien' | 'Hebdomadaire' | 'Mensuel' | 'Personnalisé';
  joursActifs?: string[]; // ['Lundi', 'Mardi', etc.] pour hebdomadaire
  dateDebut: string;
  dateFin?: string;
  exceptions?: string[]; // Dates d'exception
}

export interface PlanningData {
  id: string;
  ligneId: string;
  ligne: {
    id: string;
    nom: string;
    numero: string;
  };
  busId: string;
  bus: Bus;
  chauffeurId: string;
  chauffeur: Chauffeur;
  horaires: Horaire[];
  recurrence: Recurrence;
  statut: 'Actif' | 'Suspendu' | 'Terminé';
  commentaires?: string;
  dateCreation: string;
  dateMiseAJour: string;
}

export interface PlanningFormData {
  ligneId: string;
  busId: string;
  chauffeurId: string;
  horaires: Omit<Horaire, 'id'>[];
  recurrence: Recurrence;
  commentaires?: string;
}

export interface FiltresPlanning {
  ligneId?: string;
  chauffeurId?: string;
  busId?: string;
  statut?: string;
  dateDebut?: string;
  dateFin?: string;
}
