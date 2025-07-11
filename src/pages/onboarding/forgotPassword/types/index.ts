// Interface pour les données du formulaire
export interface ForgotPasswordFormData {
  email: string;
}

// Interface pour les erreurs de validation
export interface ForgotPasswordFormErrors {
  email?: string;
  general?: string;
}

// Interface pour les règles de validation
export interface ForgotPasswordValidationRules {
  email: {
    required: boolean;
    pattern: RegExp;
    message: string;
  };
}

// Interface pour l'état de l'envoi
export interface ForgotPasswordState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  email: string;
}

// Interface pour les props des composants
export interface ForgotPasswordFormProps {
  formData: ForgotPasswordFormData;
  errors: ForgotPasswordFormErrors;
  isLoading: boolean;
  isSuccess: boolean;
  onInputChange: (field: keyof ForgotPasswordFormData, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface ForgotPasswordHeaderProps {
  isSuccess: boolean;
  email?: string;
}

export interface ForgotPasswordLinksProps {
  isLoading: boolean;
}

export interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export interface SuccessMessageProps {
  email: string;
  onBackToLogin: () => void;
}
