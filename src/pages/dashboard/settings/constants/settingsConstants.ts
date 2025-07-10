import { SystemSettings, SettingsTab } from '../types';

// Données de simulation pour les paramètres système
export const generateMockSettings = (): SystemSettings => ({
  general: {
    companyName: 'LBV Mobilités',
    address: '123 Avenue de la République, Libreville, Gabon',
    phone: '+241 01 23 45 67',
    email: 'contact@lbvmobilites.ga',
    website: 'www.lbvmobilites.ga',
    timezone: 'Africa/Libreville',
    language: 'fr',
    currency: 'XAF',
    businessHours: {
      monday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '06:00', closeTime: '20:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '19:00' }
    }
  },
  notification: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    maintenanceAlerts: true,
    capacityAlerts: true,
    revenueReports: true,
    alertThresholds: {
      busCapacity: 85,
      lowFuel: 20,
      maintenanceDue: 7,
      revenueDropAlert: 15
    }
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
      passwordExpiry: 90
    },
    apiAccess: true,
    auditLogs: true,
    ipWhitelist: []
  },
  appearance: {
    theme: 'light',
    primaryColor: '#3B82F6',
    fontSize: 'medium',
    compactMode: false,
    showSidebar: true,
    language: 'fr'
  },
  billing: {
    baseFare: 500,
    distanceRate: 100,
    peakHourMultiplier: 1.5,
    taxRate: 18,
    subscriptionPlans: [
      {
        id: '1',
        name: 'Abonnement Journalier',
        duration: 1,
        price: 2500,
        features: ['Transport illimité 24h', 'Toutes les lignes'],
        isActive: true
      },
      {
        id: '2',
        name: 'Abonnement Hebdomadaire',
        duration: 7,
        price: 15000,
        features: ['Transport illimité 7 jours', 'Toutes les lignes', 'Priorité embarquement'],
        isActive: true
      },
      {
        id: '3',
        name: 'Abonnement Mensuel',
        duration: 30,
        price: 50000,
        features: ['Transport illimité 30 jours', 'Toutes les lignes', 'Priorité embarquement', 'WiFi gratuit'],
        isActive: true
      }
    ],
    paymentMethods: [
      {
        id: '1',
        name: 'Carte Bancaire',
        type: 'card',
        isActive: true,
        fees: 2.5
      },
      {
        id: '2',
        name: 'Mobile Money',
        type: 'mobile_money',
        isActive: true,
        fees: 1.5
      },
      {
        id: '3',
        name: 'Espèces',
        type: 'cash',
        isActive: true,
        fees: 0
      }
    ]
  },
  maintenance: {
    scheduleEnabled: true,
    maintenanceWindow: {
      startTime: '02:00',
      endTime: '04:00',
      days: ['sunday']
    },
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: 30,
    systemUpdates: true,
    updateNotifications: true
  }
});

// Onglets de configuration
export const settingsTabs: SettingsTab[] = [
  {
    id: 'general',
    name: 'Général',
    icon: 'Settings',
    description: 'Informations de base et configuration générale'
  },
  {
    id: 'notification',
    name: 'Notifications',
    icon: 'Bell',
    description: 'Paramètres de notifications et alertes'
  },
  {
    id: 'security',
    name: 'Sécurité',
    icon: 'Shield',
    description: 'Sécurité et politique de mots de passe'
  },
  {
    id: 'appearance',
    name: 'Apparence',
    icon: 'Palette',
    description: 'Thème et préférences d\'affichage'
  },
  {
    id: 'billing',
    name: 'Facturation',
    icon: 'CreditCard',
    description: 'Tarifs et méthodes de paiement'
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    icon: 'Tool',
    description: 'Maintenance système et sauvegardes'
  }
];

// Options pour les fuseaux horaires
export const timezoneOptions = [
  { value: 'Africa/Libreville', label: 'Africa/Libreville (GMT+1)' },
  { value: 'Africa/Casablanca', label: 'Africa/Casablanca (GMT+1)' },
  { value: 'Europe/Paris', label: 'Europe/Paris (GMT+1)' },
  { value: 'UTC', label: 'UTC (GMT+0)' }
];

// Options pour les langues
export const languageOptions = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' }
];

// Options pour les devises
export const currencyOptions = [
  { value: 'XAF', label: 'Franc CFA (XAF)' },
  { value: 'EUR', label: 'Euro (EUR)' },
  { value: 'USD', label: 'Dollar US (USD)' }
];

// Options pour les thèmes
export const themeOptions = [
  { value: 'light', label: 'Clair' },
  { value: 'dark', label: 'Sombre' },
  { value: 'auto', label: 'Automatique' }
];

// Options pour la taille de police
export const fontSizeOptions = [
  { value: 'small', label: 'Petite' },
  { value: 'medium', label: 'Moyenne' },
  { value: 'large', label: 'Grande' }
];

// Options pour les fréquences de sauvegarde
export const backupFrequencyOptions = [
  { value: 'daily', label: 'Quotidienne' },
  { value: 'weekly', label: 'Hebdomadaire' },
  { value: 'monthly', label: 'Mensuelle' }
];

// Jours de la semaine
export const daysOfWeek = [
  { value: 'monday', label: 'Lundi' },
  { value: 'tuesday', label: 'Mardi' },
  { value: 'wednesday', label: 'Mercredi' },
  { value: 'thursday', label: 'Jeudi' },
  { value: 'friday', label: 'Vendredi' },
  { value: 'saturday', label: 'Samedi' },
  { value: 'sunday', label: 'Dimanche' }
];
