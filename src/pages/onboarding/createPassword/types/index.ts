// Interface pour les données du formulaire
export interface CreatePasswordFormData {
  password: string;
  confirmPassword: string;
}

// Interface pour les erreurs de validation
export interface CreatePasswordFormErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

// Interface pour les règles de validation
export interface CreatePasswordValidationRules {
  password: {
    required: boolean;
    minLength: number;
    pattern?: RegExp;
    message: string;
  };
  confirmPassword: {
    required: boolean;
    message: string;
  };
}

// Interface pour l'état de création
export interface CreatePasswordState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  email?: string; // Email récupéré depuis les paramètres de l'URL ou token
}

// Interface pour les props des composants
export interface CreatePasswordFormProps {
  formData: CreatePasswordFormData;
  errors: CreatePasswordFormErrors;
  isLoading: boolean;
  isSuccess: boolean;
  onInputChange: (field: keyof CreatePasswordFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface CreatePasswordHeaderProps {
  isSuccess: boolean;
  email?: string;
}

export interface CreatePasswordLinksProps {
  isLoading: boolean;
}

export interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export interface SuccessMessageProps {
  email?: string;
  onGoToLogin: () => void;
}

// Interface pour les critères de mot de passe
export interface PasswordCriteria {
  minLength: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export interface PasswordStrengthProps {
  password: string;
  criteria: PasswordCriteria;
}
