import { Abonnement } from "../types";

// Données mock pour les abonnements
export const mockAbonnements: Abonnement[] = [
  {
    id: '1',
    nom: 'Abonnement Mensuel Standard',
    description: 'Accès illimité à toutes les lignes pendant 30 jours',
    prix: 25000,
    duree: 30,
    typeAbonnement: 'mensuel',
    avantages: ['Accès illimité', 'Toutes les lignes', 'Support prioritaire'],
    nombreTrajet: -1,
    lignesIncluses: [],
    heuresValidite: { debut: '05:00', fin: '23:00' },
    joursValidite: [],
    statut: 'actif',
    couleur: '#3B82F6',
    icone: 'Calendar',
    conditions: 'Valable pour un seul utilisateur',
    reduction: { type: 'aucune', valeur: 0, description: '' },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: 'admin1',
  },
  {
    id: '2',
    nom: 'Abonnement Hebdomadaire',
    description: 'Accès à toutes les lignes pendant 7 jours',
    prix: 8000,
    duree: 7,
    typeAbonnement: 'hebdomadaire',
    avantages: ['Accès illimité', 'Toutes les lignes'],
    nombreTrajet: -1,
    lignesIncluses: [],
    heuresValidite: { debut: '05:00', fin: '23:00' },
    joursValidite: [],
    statut: 'actif',
    couleur: '#10B981',
    icone: 'Clock',
    conditions: 'Valable pour un seul utilisateur',
    reduction: { type: 'aucune', valeur: 0, description: '' },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
    createdBy: 'admin1',
  },
  {
    id: '3',
    nom: 'Abonnement Étudiant',
    description: 'Tarif réduit pour les étudiants',
    prix: 15000,
    duree: 30,
    typeAbonnement: 'mensuel',
    avantages: ['Tarif étudiant', 'Accès illimité', 'Toutes les lignes'],
    nombreTrajet: -1,
    lignesIncluses: [],
    heuresValidite: { debut: '05:00', fin: '23:00' },
    joursValidite: [],
    statut: 'actif',
    couleur: '#F59E0B',
    icone: 'BookOpen',
    conditions: 'Carte étudiante requise',
    reduction: { type: 'pourcentage', valeur: 40, description: 'Réduction étudiante' },
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
    createdBy: 'admin1',
  },
  {
    id: '4',
    nom: 'Abonnement Premium',
    description: 'Abonnement premium avec services exclusifs',
    prix: 45000,
    duree: 30,
    typeAbonnement: 'mensuel',
    avantages: ['Accès prioritaire', 'Wi-Fi gratuit', 'Sièges réservés', 'Service client dédié'],
    nombreTrajet: -1,
    lignesIncluses: [],
    heuresValidite: { debut: '05:00', fin: '23:00' },
    joursValidite: [],
    statut: 'actif',
    couleur: '#8B5CF6',
    icone: 'Crown',
    conditions: 'Services premium inclus',
    reduction: { type: 'aucune', valeur: 0, description: '' },
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
    createdBy: 'admin1',
  },
  {
    id: '5',
    nom: 'Abonnement Journalier',
    description: 'Accès pour une journée complète',
    prix: 2000,
    duree: 1,
    typeAbonnement: 'journalier',
    avantages: ['Accès illimité pour 24h', 'Toutes les lignes'],
    nombreTrajet: -1,
    lignesIncluses: [],
    heuresValidite: { debut: '05:00', fin: '23:00' },
    joursValidite: [],
    statut: 'actif',
    couleur: '#F97316',
    icone: 'Sun',
    conditions: 'Valable 24h à partir de l\'activation',
    reduction: { type: 'aucune', valeur: 0, description: '' },
    createdAt: '2024-01-25T10:00:00Z',
    updatedAt: '2024-01-25T10:00:00Z',
    createdBy: 'admin1',
  },
  {
    id: '6',
    nom: 'Abonnement Senior',
    description: 'Tarif préférentiel pour les seniors (+60 ans)',
    prix: 18000,
    duree: 30,
    typeAbonnement: 'mensuel',
    avantages: ['Tarif senior', 'Accès prioritaire', 'Support dédié'],
    nombreTrajet: -1,
    lignesIncluses: [],
    heuresValidite: { debut: '06:00', fin: '22:00' },
    joursValidite: [],
    statut: 'actif',
    couleur: '#6B7280',
    icone: 'Users',
    conditions: 'Justificatif d\'âge requis',
    reduction: { type: 'pourcentage', valeur: 28, description: 'Réduction senior' },
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
    createdBy: 'admin1',
  }
];

// Options pour les types d'abonnements
export const typeAbonnementOptions = [
  { value: 'tous', label: 'Tous les types' },
  { value: 'mensuel', label: 'Mensuel' },
  { value: 'hebdomadaire', label: 'Hebdomadaire' },
  { value: 'journalier', label: 'Journalier' },
  { value: 'annuel', label: 'Annuel' },
  { value: 'personnalise', label: 'Personnalisé' }
];

// Options pour les statuts
export const statutAbonnementOptions = [
  { value: 'tous', label: 'Tous les statuts' },
  { value: 'actif', label: 'Actif' },
  { value: 'inactif', label: 'Inactif' },
  { value: 'brouillon', label: 'Brouillon' }
];

// Icônes disponibles pour les abonnements
export const iconeAbonnementOptions = [
  { value: 'Calendar', label: 'Calendrier' },
  { value: 'Clock', label: 'Horloge' },
  { value: 'BookOpen', label: 'Livre' },
  { value: 'Crown', label: 'Couronne' },
  { value: 'Sun', label: 'Soleil' },
  { value: 'Users', label: 'Utilisateurs' },
  { value: 'Star', label: 'Étoile' },
  { value: 'Shield', label: 'Bouclier' },
  { value: 'Zap', label: 'Éclair' },
  { value: 'Heart', label: 'Cœur' }
];

// Couleurs disponibles pour les abonnements
export const couleurAbonnementOptions = [
  { value: '#3B82F6', label: 'Bleu', color: '#3B82F6' },
  { value: '#10B981', label: 'Vert', color: '#10B981' },
  { value: '#F59E0B', label: 'Orange', color: '#F59E0B' },
  { value: '#8B5CF6', label: 'Violet', color: '#8B5CF6' },
  { value: '#F97316', label: 'Orange foncé', color: '#F97316' },
  { value: '#6B7280', label: 'Gris', color: '#6B7280' },
  { value: '#EF4444', label: 'Rouge', color: '#EF4444' },
  { value: '#14B8A6', label: 'Turquoise', color: '#14B8A6' }
];
