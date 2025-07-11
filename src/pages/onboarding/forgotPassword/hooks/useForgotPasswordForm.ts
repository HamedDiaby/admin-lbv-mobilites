import { useState, useCallback } from 'react';
import { ForgotPasswordFormData, ForgotPasswordFormErrors, ForgotPasswordState } from '../types';
import { 
  FORGOT_PASSWORD_VALIDATION_RULES, 
  FORGOT_PASSWORD_ERROR_MESSAGES,
  FORGOT_PASSWORD_TIMEOUTS 
} from '../constants';

export const useForgotPasswordForm = () => {
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: ''
  });

  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});

  const [state, setState] = useState<ForgotPasswordState>({
    isLoading: false,
    isSuccess: false,
    error: null,
    email: ''
  });

  // Validation de l'email
  const validateEmail = useCallback((email: string): string | undefined => {
    if (!email.trim()) {
      return FORGOT_PASSWORD_ERROR_MESSAGES.REQUIRED_EMAIL;
    }
    if (!FORGOT_PASSWORD_VALIDATION_RULES.email.pattern.test(email)) {
      return FORGOT_PASSWORD_ERROR_MESSAGES.INVALID_EMAIL;
    }
    return undefined;
  }, []);

  // Validation complète du formulaire
  const validateForm = useCallback((): boolean => {
    const newErrors: ForgotPasswordFormErrors = {};
    
    // Validation de l'email
    const emailError = validateEmail(formData.email);
    if (emailError) {
      newErrors.email = emailError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData.email, validateEmail]);

  // Gestion des changements d'input
  const handleInputChange = useCallback((field: keyof ForgotPasswordFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Effacer l'erreur générale
    if (state.error) {
      setState(prev => ({ ...prev, error: null }));
    }
  }, [errors, state.error]);

  // Simulation de l'envoi de l'email
  const sendResetEmail = useCallback(async (email: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulation d'une API call
        if (email === 'error@test.com') {
          reject(new Error(FORGOT_PASSWORD_ERROR_MESSAGES.EMAIL_NOT_FOUND));
        } else if (email === 'server@error.com') {
          reject(new Error(FORGOT_PASSWORD_ERROR_MESSAGES.SERVER_ERROR));
        } else {
          resolve();
        }
      }, 2000); // Simulation d'un délai de 2 secondes
    });
  }, []);

  // Soumission du formulaire
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      await sendResetEmail(formData.email);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isSuccess: true,
        email: formData.email
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : FORGOT_PASSWORD_ERROR_MESSAGES.SERVER_ERROR
      }));
    }
  }, [formData.email, validateForm, sendResetEmail]);

  // Effacer l'erreur
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Réinitialiser le formulaire
  const resetForm = useCallback(() => {
    setFormData({ email: '' });
    setErrors({});
    setState({
      isLoading: false,
      isSuccess: false,
      error: null,
      email: ''
    });
  }, []);

  // Renvoyer l'email
  const resendEmail = useCallback(async () => {
    if (state.email) {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      try {
        await sendResetEmail(state.email);
        // Pas besoin de changer isSuccess, juste arrêter le loading
        setState(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error instanceof Error ? error.message : FORGOT_PASSWORD_ERROR_MESSAGES.SERVER_ERROR
        }));
      }
    }
  }, [state.email, sendResetEmail]);

  return {
    formData,
    errors,
    state,
    handleInputChange,
    handleSubmit,
    clearError,
    resetForm,
    resendEmail
  };
};
