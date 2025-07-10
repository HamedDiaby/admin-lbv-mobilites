import { LoginValidationRules, SecuritySettings, TestCredentials } from '../types';

// Constantes de validation
export const LOGIN_VALIDATION_RULES: LoginValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Veuillez entrer une adresse email valide'
  },
  password: {
    required: true,
    minLength: 6,
    message: 'Le mot de passe doit contenir au moins 6 caractères'
  }
};

// Paramètres de sécurité par défaut
export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  maxLoginAttempts: 5,
  lockoutDuration: 15, // 15 minutes
  sessionDuration: 24, // 24 heures
  requireStrongPassword: false,
  enableTwoFactor: false
};

// Messages d'erreur
export const LOGIN_ERROR_MESSAGES = {
  REQUIRED_EMAIL: 'L\'adresse email est requise',
  INVALID_EMAIL: 'Veuillez entrer une adresse email valide',
  REQUIRED_PASSWORD: 'Le mot de passe est requis',
  PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 6 caractères',
  INVALID_CREDENTIALS: 'Identifiants incorrects. Veuillez réessayer.',
  ACCOUNT_LOCKED: 'Compte temporairement verrouillé suite à plusieurs tentatives de connexion',
  SERVER_ERROR: 'Une erreur s\'est produite. Veuillez réessayer.',
  NETWORK_ERROR: 'Problème de connexion. Vérifiez votre connexion internet.',
  SESSION_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.'
} as const;

// Messages de succès
export const LOGIN_SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Connexion réussie ! Redirection en cours...',
  REMEMBER_ME_ENABLED: 'Vous resterez connecté sur cet appareil',
  PASSWORD_RESET_SENT: 'Un email de réinitialisation a été envoyé'
} as const;

// Identifiants de test disponibles
export const TEST_CREDENTIALS: TestCredentials[] = [
  {
    email: 'admin@lbv-mobilites.ga',
    password: 'admin123',
    role: 'Administrateur',
    description: 'Accès complet à toutes les fonctionnalités'
  },
  {
    email: 'manager@lbv-mobilites.ga',
    password: 'manager123',
    role: 'Gestionnaire',
    description: 'Gestion des bus et des lignes'
  },
  {
    email: 'operator@lbv-mobilites.ga',
    password: 'operator123',
    role: 'Opérateur',
    description: 'Consultation et mise à jour des données'
  }
];

// Configuration des délais
export const LOGIN_TIMEOUTS = {
  API_TIMEOUT: 30000, // 30 secondes
  REDIRECT_DELAY: 1500, // 1.5 secondes
  ERROR_DISPLAY_DURATION: 5000, // 5 secondes
  SUCCESS_DISPLAY_DURATION: 2000 // 2 secondes
} as const;

// URLs et endpoints
export const LOGIN_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh',
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESET_PASSWORD: '/api/auth/reset-password'
} as const;

// Clés de stockage local
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'lbv_auth_token',
  REFRESH_TOKEN: 'lbv_refresh_token',
  USER_DATA: 'lbv_user_data',
  REMEMBER_ME: 'lbv_remember_me',
  LAST_LOGIN: 'lbv_last_login',
  LOGIN_ATTEMPTS: 'lbv_login_attempts'
} as const;

// Configuration du style
export const LOGIN_STYLES = {
  GRADIENT_COLORS: {
    primary: 'from-green to-green-light',
    secondary: 'from-slate-50 via-blue-50 to-green-50',
    accent: 'from-green/20 to-yellow/20',
    backdrop: 'from-green/20 via-yellow/20 to-blue/20'
  },
  ANIMATION_DURATION: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  },
  BORDER_RADIUS: {
    small: '0.5rem',
    medium: '0.75rem',
    large: '1rem'
  }
} as const;

// Regex patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/
} as const;

// Configuration de l'application
export const APP_CONFIG = {
  NAME: 'LBV Mobilités',
  DESCRIPTION: 'Panneau d\'administration',
  VERSION: '1.0.0',
  COPYRIGHT: '© 2025 LBV Mobilités - Tous droits réservés',
  SUPPORT_EMAIL: 'support@lbv-mobilites.ga',
  DOCUMENTATION_URL: 'https://docs.lbv-mobilites.ga'
} as const;
