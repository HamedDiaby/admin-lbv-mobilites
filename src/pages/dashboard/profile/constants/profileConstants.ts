import { ProfileActionItem, AccountInfo, ProfileSettings } from '../types';

// Constantes pour la gestion du profil
export const PROFILE_CONSTANTS = {
  MAX_NAME_LENGTH: 50,
  MIN_NAME_LENGTH: 2,
  MAX_DEPARTMENT_LENGTH: 100,
  PASSWORD_MIN_LENGTH: 8,
  AVATAR_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
} as const;

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  NAME: /^[a-zA-ZÀ-ÿ\s'-]+$/
} as const;

// Options de département prédéfinies
export const DEPARTMENT_OPTIONS = [
  'Administration',
  'Ressources Humaines',
  'Informatique',
  'Transport',
  'Maintenance',
  'Sécurité',
  'Service Client',
  'Comptabilité',
  'Marketing',
  'Direction'
] as const;

// Options de langue
export const LANGUAGE_OPTIONS = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'de', label: 'Deutsch' }
] as const;

// Options de fuseau horaire
export const TIMEZONE_OPTIONS = [
  { value: 'Africa/Libreville', label: 'Libreville (GMT+1)' },
  { value: 'Europe/Paris', label: 'Paris (GMT+1)' },
  { value: 'UTC', label: 'UTC (GMT+0)' },
  { value: 'America/New_York', label: 'New York (GMT-5)' }
] as const;

// Actions disponibles dans le profil
export const getProfileActions = (handlers: {
  onEditProfile: () => void;
  onChangePassword: () => void;
  onSettings: () => void;
  onExportData: () => void;
  onDeleteAccount: () => void;
}): ProfileActionItem[] => [
  {
    id: 'edit-profile',
    title: 'Modifier le profil',
    description: 'Mettre à jour vos informations personnelles',
    icon: 'Edit',
    action: handlers.onEditProfile,
    variant: 'primary'
  },
  {
    id: 'change-password',
    title: 'Changer le mot de passe',
    description: 'Modifier votre mot de passe de connexion',
    icon: 'Lock',
    action: handlers.onChangePassword,
    variant: 'warning'
  },
  {
    id: 'settings',
    title: 'Paramètres',
    description: 'Configurer vos préférences',
    icon: 'Settings',
    action: handlers.onSettings,
    variant: 'secondary'
  },
  {
    id: 'export-data',
    title: 'Exporter les données',
    description: 'Télécharger vos données personnelles',
    icon: 'Download',
    action: handlers.onExportData,
    variant: 'secondary'
  },
  {
    id: 'delete-account',
    title: 'Supprimer le compte',
    description: 'Supprimer définitivement votre compte',
    icon: 'Trash',
    action: handlers.onDeleteAccount,
    variant: 'danger'
  }
];

// Informations de compte par défaut
export const generateMockAccountInfo = (): AccountInfo => ({
  accountType: 'Administrateur Premium',
  memberSince: '15 janvier 2023',
  accountStatus: 'verified',
  permissions: [
    'Gestion des utilisateurs',
    'Gestion des bus',
    'Gestion des lignes',
    'Rapports et statistiques',
    'Configuration système'
  ],
  lastActivity: 'Il y a 5 minutes'
});

// Paramètres de profil par défaut
export const getDefaultProfileSettings = (): ProfileSettings => ({
  emailNotifications: true,
  smsNotifications: false,
  theme: 'system',
  language: 'fr',
  timezone: 'Africa/Libreville'
});

// Messages de validation
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Ce champ est requis',
  INVALID_EMAIL: 'Format d\'email invalide',
  INVALID_PHONE: 'Format de téléphone invalide',
  NAME_TOO_SHORT: `Le nom doit contenir au moins ${PROFILE_CONSTANTS.MIN_NAME_LENGTH} caractères`,
  NAME_TOO_LONG: `Le nom ne peut pas dépasser ${PROFILE_CONSTANTS.MAX_NAME_LENGTH} caractères`,
  INVALID_NAME_FORMAT: 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets',
  DEPARTMENT_TOO_LONG: `Le département ne peut pas dépasser ${PROFILE_CONSTANTS.MAX_DEPARTMENT_LENGTH} caractères`,
  PASSWORD_TOO_SHORT: `Le mot de passe doit contenir au moins ${PROFILE_CONSTANTS.PASSWORD_MIN_LENGTH} caractères`
} as const;
