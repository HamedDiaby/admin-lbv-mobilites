// Types pour la gestion de la connexion

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface LoginValidationRules {
  email: {
    required: boolean;
    pattern: RegExp;
    message: string;
  };
  password: {
    required: boolean;
    minLength: number;
    message: string;
  };
}

export interface LoginAttempt {
  email: string;
  timestamp: number;
  success: boolean;
  ip?: string;
  userAgent?: string;
}

export interface SecuritySettings {
  maxLoginAttempts: number;
  lockoutDuration: number; // en minutes
  sessionDuration: number; // en heures
  requireStrongPassword: boolean;
  enableTwoFactor: boolean;
}

export interface TestCredentials {
  email: string;
  password: string;
  role: string;
  description: string;
}

export interface LoginResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
    permissions: string[];
  };
  token?: string;
  refreshToken?: string;
  expiresIn?: number;
  error?: string;
}
