import { CreatePasswordValidationRules } from '../types';

// Constantes de validation
export const CREATE_PASSWORD_VALIDATION_RULES: CreatePasswordValidationRules = {
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: 'Le mot de passe doit contenir au moins 8 caractères avec une majuscule, une minuscule, un chiffre et un caractère spécial'
  },
  confirmPassword: {
    required: true,
    message: 'La confirmation du mot de passe est requise'
  }
};

// Messages d'erreur
export const CREATE_PASSWORD_ERROR_MESSAGES = {
  REQUIRED_PASSWORD: 'Le mot de passe est requis',
  PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caractères',
  PASSWORD_TOO_WEAK: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
  REQUIRED_CONFIRM_PASSWORD: 'La confirmation du mot de passe est requise',
  PASSWORD_MISMATCH: 'Les mots de passe ne correspondent pas',
  SERVER_ERROR: 'Une erreur s\'est produite. Veuillez réessayer.',
  NETWORK_ERROR: 'Problème de connexion. Vérifiez votre connexion internet.',
  VALIDATION_FAILED: 'Veuillez corriger les erreurs dans le formulaire',
  INVALID_TOKEN: 'Le lien de réinitialisation est invalide ou a expiré',
  TOKEN_EXPIRED: 'Le lien de réinitialisation a expiré. Demandez un nouveau lien.'
} as const;

// Messages de succès
export const CREATE_PASSWORD_SUCCESS_MESSAGES = {
  PASSWORD_CREATED: 'Mot de passe créé avec succès !',
  PASSWORD_UPDATED: 'Votre mot de passe a été mis à jour',
  LOGIN_REDIRECT: 'Vous pouvez maintenant vous connecter avec votre nouveau mot de passe'
} as const;

// Configuration des délais
export const CREATE_PASSWORD_TIMEOUTS = {
  API_TIMEOUT: 30000, // 30 secondes
  REDIRECT_DELAY: 3000, // 3 secondes
  ERROR_DISPLAY_DURATION: 5000, // 5 secondes
  SUCCESS_DISPLAY_DURATION: 3000 // 3 secondes
} as const;

// URLs et endpoints
export const CREATE_PASSWORD_ENDPOINTS = {
  CREATE_ACCOUNT: '/api/auth/register',
  CHECK_EMAIL: '/api/auth/check-email',
  VERIFY_EMAIL: '/api/auth/verify-email'
} as const;

// Routes de navigation
export const CREATE_PASSWORD_ROUTES = {
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  CREATE_PASSWORD: '/auth/create-password',
  DASHBOARD: '/dashboard'
} as const;

// Instructions pour l'utilisateur
export const CREATE_PASSWORD_INSTRUCTIONS = {
  MAIN_TEXT: 'Créez un nouveau mot de passe sécurisé pour votre compte.',
  SUCCESS_TITLE: 'Mot de passe créé !',
  SUCCESS_TEXT: 'Votre nouveau mot de passe a été enregistré avec succès.',
  PASSWORD_REQUIREMENTS: 'Le mot de passe doit contenir :',
  SECURITY_INFO: 'Pour votre sécurité, choisissez un mot de passe unique et fort.'
} as const;

// Critères de mot de passe fort
export const PASSWORD_CRITERIA = {
  MIN_LENGTH: 8,
  REQUIRED_LOWERCASE: true,
  REQUIRED_UPPERCASE: true,
  REQUIRED_NUMBER: true,
  REQUIRED_SPECIAL_CHAR: true,
  SPECIAL_CHARS: '@$!%*?&'
} as const;

// Configuration du style
export const CREATE_PASSWORD_STYLES = {
  CONTAINER_CLASSES: 'min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center p-4',
  CARD_CLASSES: 'w-full max-w-lg bg-white/70 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/20 overflow-hidden',
  FORM_CLASSES: 'space-y-4',
  INPUT_CLASSES: 'w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-lg focus:border-green/50 focus:bg-white/70 transition-all duration-300 text-sm placeholder-gray-400',
  BUTTON_CLASSES: 'w-full bg-gradient-to-r from-green to-green-light hover:from-green-dark hover:to-green text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
} as const;

// Messages d'aide
export const CREATE_PASSWORD_HELP_MESSAGES = {
  FIRST_NAME_HELP: 'Votre prénom tel qu\'il apparaîtra dans l\'application',
  LAST_NAME_HELP: 'Votre nom de famille',
  EMAIL_HELP: 'Cette adresse sera utilisée pour vous connecter',
  PASSWORD_HELP: 'Choisissez un mot de passe sécurisé',
  CONFIRM_PASSWORD_HELP: 'Répétez le même mot de passe',
  TERMS_HELP: 'Acceptez les conditions pour créer votre compte'
} as const;
