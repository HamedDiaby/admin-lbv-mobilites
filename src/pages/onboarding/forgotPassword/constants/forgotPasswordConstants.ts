import { ForgotPasswordValidationRules } from '../types';

// Constantes de validation
export const FORGOT_PASSWORD_VALIDATION_RULES: ForgotPasswordValidationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Veuillez entrer une adresse email valide'
  }
};

// Messages d'erreur
export const FORGOT_PASSWORD_ERROR_MESSAGES = {
  REQUIRED_EMAIL: 'L\'adresse email est requise',
  INVALID_EMAIL: 'Veuillez entrer une adresse email valide',
  EMAIL_NOT_FOUND: 'Cette adresse email n\'est pas associée à un compte',
  SERVER_ERROR: 'Une erreur s\'est produite. Veuillez réessayer.',
  NETWORK_ERROR: 'Problème de connexion. Vérifiez votre connexion internet.',
  RATE_LIMIT: 'Trop de demandes. Veuillez attendre avant de réessayer.'
} as const;

// Messages de succès
export const FORGOT_PASSWORD_SUCCESS_MESSAGES = {
  EMAIL_SENT: 'Un email de réinitialisation a été envoyé',
  CHECK_INBOX: 'Vérifiez votre boîte de réception',
  SPAM_CHECK: 'N\'oubliez pas de vérifier vos spams'
} as const;

// Configuration des délais
export const FORGOT_PASSWORD_TIMEOUTS = {
  API_TIMEOUT: 30000, // 30 secondes
  REDIRECT_DELAY: 2000, // 2 secondes
  ERROR_DISPLAY_DURATION: 5000, // 5 secondes
  SUCCESS_DISPLAY_DURATION: 10000 // 10 secondes
} as const;

// URLs et endpoints
export const FORGOT_PASSWORD_ENDPOINTS = {
  FORGOT_PASSWORD: '/api/auth/forgot-password',
  RESEND_EMAIL: '/api/auth/resend-reset-email'
} as const;

// Routes de navigation
export const FORGOT_PASSWORD_ROUTES = {
  LOGIN: '/auth/login',
  CREATE_PASSWORD: '/auth/create-password',
  FORGOT_PASSWORD: '/auth/forgot-password'
} as const;

// Instructions pour l'utilisateur
export const FORGOT_PASSWORD_INSTRUCTIONS = {
  MAIN_TEXT: 'Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
  SUCCESS_TITLE: 'Email envoyé !',
  SUCCESS_TEXT: 'Un email contenant les instructions de réinitialisation a été envoyé à',
  NEXT_STEPS: 'Suivez les instructions dans l\'email pour créer un nouveau mot de passe.',
  NOT_RECEIVED: 'Vous n\'avez pas reçu l\'email ? Vérifiez vos spams ou',
  RESEND_TEXT: 'renvoyer l\'email'
} as const;

// Configuration du style
export const FORGOT_PASSWORD_STYLES = {
  CONTAINER_CLASSES: 'min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center p-4',
  CARD_CLASSES: 'w-full max-w-md bg-white/70 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/20 overflow-hidden',
  FORM_CLASSES: 'space-y-6',
  INPUT_CLASSES: 'w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-lg focus:border-green/50 focus:bg-white/70 transition-all duration-300 text-sm placeholder-gray-400',
  BUTTON_CLASSES: 'w-full bg-gradient-to-r from-green to-green-light hover:from-green-dark hover:to-green text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
} as const;
