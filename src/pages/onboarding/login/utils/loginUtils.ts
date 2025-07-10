import { LoginFormData, LoginFormErrors, LoginAttempt } from '../types';
import { 
  LOGIN_VALIDATION_RULES, 
  LOGIN_ERROR_MESSAGES, 
  VALIDATION_PATTERNS,
  STORAGE_KEYS,
  DEFAULT_SECURITY_SETTINGS
} from '../constants';

// Utilitaires de validation
export const validateLoginForm = (formData: LoginFormData): LoginFormErrors => {
  const errors: LoginFormErrors = {};

  // Validation de l'email
  if (!formData.email.trim()) {
    errors.email = LOGIN_ERROR_MESSAGES.REQUIRED_EMAIL;
  } else if (!VALIDATION_PATTERNS.EMAIL.test(formData.email)) {
    errors.email = LOGIN_ERROR_MESSAGES.INVALID_EMAIL;
  }

  // Validation du mot de passe
  if (!formData.password.trim()) {
    errors.password = LOGIN_ERROR_MESSAGES.REQUIRED_PASSWORD;
  } else if (formData.password.length < LOGIN_VALIDATION_RULES.password.minLength) {
    errors.password = LOGIN_ERROR_MESSAGES.PASSWORD_TOO_SHORT;
  }

  return errors;
};

// Validation d'un champ individuel
export const validateField = (field: keyof LoginFormData, value: string | boolean): string | undefined => {
  const stringValue = typeof value === 'boolean' ? '' : value;
  
  switch (field) {
    case 'email':
      if (!stringValue.trim()) return LOGIN_ERROR_MESSAGES.REQUIRED_EMAIL;
      if (!VALIDATION_PATTERNS.EMAIL.test(stringValue)) return LOGIN_ERROR_MESSAGES.INVALID_EMAIL;
      break;
    case 'password':
      if (!stringValue.trim()) return LOGIN_ERROR_MESSAGES.REQUIRED_PASSWORD;
      if (stringValue.length < LOGIN_VALIDATION_RULES.password.minLength) return LOGIN_ERROR_MESSAGES.PASSWORD_TOO_SHORT;
      break;
  }
  return undefined;
};

// Utilitaires de formatage
export const formatEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const sanitizeFormData = (formData: LoginFormData): LoginFormData => ({
  email: formatEmail(formData.email),
  password: formData.password.trim(),
  rememberMe: formData.rememberMe
});

// Gestion des tentatives de connexion
export const saveLoginAttempt = (attempt: LoginAttempt): void => {
  try {
    const attempts = getLoginAttempts();
    attempts.push(attempt);
    
    // Garder seulement les 10 dernières tentatives
    const recentAttempts = attempts.slice(-10);
    localStorage.setItem(STORAGE_KEYS.LOGIN_ATTEMPTS, JSON.stringify(recentAttempts));
  } catch (error) {
    console.warn('Impossible de sauvegarder la tentative de connexion:', error);
  }
};

export const getLoginAttempts = (): LoginAttempt[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LOGIN_ATTEMPTS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Impossible de récupérer les tentatives de connexion:', error);
    return [];
  }
};

export const getFailedAttemptsCount = (email: string, timeWindowMinutes: number = 15): number => {
  const attempts = getLoginAttempts();
  const cutoffTime = Date.now() - (timeWindowMinutes * 60 * 1000);
  
  return attempts.filter(attempt => 
    attempt.email === formatEmail(email) && 
    attempt.timestamp > cutoffTime && 
    !attempt.success
  ).length;
};

export const isAccountLocked = (email: string): boolean => {
  const failedAttempts = getFailedAttemptsCount(email);
  return failedAttempts >= DEFAULT_SECURITY_SETTINGS.maxLoginAttempts;
};

export const getRemainingLockoutTime = (email: string): number => {
  const attempts = getLoginAttempts();
  const cutoffTime = Date.now() - (DEFAULT_SECURITY_SETTINGS.lockoutDuration * 60 * 1000);
  
  const recentFailedAttempts = attempts.filter(attempt => 
    attempt.email === formatEmail(email) && 
    attempt.timestamp > cutoffTime && 
    !attempt.success
  );

  if (recentFailedAttempts.length >= DEFAULT_SECURITY_SETTINGS.maxLoginAttempts) {
    const lastAttempt = recentFailedAttempts[recentFailedAttempts.length - 1];
    const unlockTime = lastAttempt.timestamp + (DEFAULT_SECURITY_SETTINGS.lockoutDuration * 60 * 1000);
    return Math.max(0, unlockTime - Date.now());
  }

  return 0;
};

// Gestion du stockage des données utilisateur
export const saveUserSession = (userData: any, rememberMe: boolean): void => {
  try {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    storage.setItem(STORAGE_KEYS.LAST_LOGIN, new Date().toISOString());
    
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
    }
  } catch (error) {
    console.warn('Impossible de sauvegarder la session utilisateur:', error);
  }
};

export const getUserSession = (): any | null => {
  try {
    // Vérifier d'abord localStorage puis sessionStorage
    let userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!userData) {
      userData = sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
    }
    
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.warn('Impossible de récupérer la session utilisateur:', error);
    return null;
  }
};

export const clearUserSession = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
    localStorage.removeItem(STORAGE_KEYS.LAST_LOGIN);
    
    sessionStorage.removeItem(STORAGE_KEYS.USER_DATA);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.warn('Impossible de nettoyer la session utilisateur:', error);
  }
};

// Utilitaires de sécurité
export const generateSessionId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const hashPassword = async (password: string): Promise<string> => {
  // En production, utilisez une vraie fonction de hachage côté serveur
  // Ceci est juste pour la démo
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Utilitaires de redirection
export const getRedirectUrl = (location: any): string => {
  const from = location.state?.from?.pathname;
  const searchParams = location.state?.from?.search;
  
  if (from && from !== '/login') {
    return `${from}${searchParams || ''}`;
  }
  
  return '/dashboard';
};

export const shouldRedirectToLogin = (currentPath: string): boolean => {
  const publicPaths = ['/login', '/forgot-password', '/reset-password', '/'];
  return !publicPaths.includes(currentPath);
};

// Détection de l'environnement
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

// Utilitaires de debug
export const logLoginAttempt = (email: string, success: boolean, details?: any): void => {
  if (isDevelopment()) {
    console.log(`🔐 Tentative de connexion - Email: ${email}, Succès: ${success}`, details);
  }
};

export const logSecurityEvent = (event: string, details?: any): void => {
  if (isDevelopment()) {
    console.warn(`🚨 Événement de sécurité: ${event}`, details);
  }
};
