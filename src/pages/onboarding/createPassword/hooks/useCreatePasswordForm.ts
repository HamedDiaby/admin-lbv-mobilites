import { useState, useCallback, useMemo } from 'react';
import { CreatePasswordFormData, CreatePasswordFormErrors, CreatePasswordState, PasswordCriteria } from '../types';
import { 
  CREATE_PASSWORD_VALIDATION_RULES, 
  CREATE_PASSWORD_ERROR_MESSAGES,
  PASSWORD_CRITERIA 
} from '../constants';

export const useCreatePasswordForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState<CreatePasswordFormData>({
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<CreatePasswordFormErrors>({});

  const [state, setState] = useState<CreatePasswordState>({
    isLoading: false,
    isSuccess: false,
    error: null,
    email: 'user@lbv-mobilites.ga' // Email simulé - normalement récupéré depuis l'URL ou token
  });

  // Validation des critères de mot de passe
  const passwordCriteria = useMemo((): PasswordCriteria => {
    const password = formData.password;
    return {
      minLength: password.length >= PASSWORD_CRITERIA.MIN_LENGTH,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&]/.test(password)
    };
  }, [formData.password]);

  // Validation du mot de passe
  const validatePassword = useCallback((password: string): string | undefined => {
    if (!password) {
      return CREATE_PASSWORD_ERROR_MESSAGES.REQUIRED_PASSWORD;
    }
    if (password.length < CREATE_PASSWORD_VALIDATION_RULES.password.minLength) {
      return CREATE_PASSWORD_ERROR_MESSAGES.PASSWORD_TOO_SHORT;
    }
    if (CREATE_PASSWORD_VALIDATION_RULES.password.pattern && !CREATE_PASSWORD_VALIDATION_RULES.password.pattern.test(password)) {
      return CREATE_PASSWORD_ERROR_MESSAGES.PASSWORD_TOO_WEAK;
    }
    return undefined;
  }, []);

  // Validation de la confirmation
  const validateConfirmPassword = useCallback((confirmPassword: string, password: string): string | undefined => {
    if (!confirmPassword) {
      return CREATE_PASSWORD_ERROR_MESSAGES.REQUIRED_CONFIRM_PASSWORD;
    }
    if (confirmPassword !== password) {
      return CREATE_PASSWORD_ERROR_MESSAGES.PASSWORD_MISMATCH;
    }
    return undefined;
  }, []);

  // Validation complète du formulaire
  const validateForm = useCallback((): boolean => {
    const newErrors: CreatePasswordFormErrors = {};
    
    // Validation du mot de passe
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    // Validation de la confirmation
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, validatePassword, validateConfirmPassword]);

  // Gestion des changements d'input
  const handleInputChange = useCallback((field: keyof CreatePasswordFormData, value: string) => {
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

  // Simulation de la création du mot de passe
  const createPassword = useCallback(async (passwordData: CreatePasswordFormData): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulation d'une API call
        if (passwordData.password === 'error123') {
          reject(new Error(CREATE_PASSWORD_ERROR_MESSAGES.SERVER_ERROR));
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
      await createPassword(formData);
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        isSuccess: true
      }));
      
      // Navigation après succès
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000); // Délai pour permettre à l'utilisateur de voir le message de succès
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : CREATE_PASSWORD_ERROR_MESSAGES.SERVER_ERROR
      }));
    }
  }, [formData, validateForm, createPassword, onSuccess]);

  // Effacer l'erreur
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Réinitialiser le formulaire
  const resetForm = useCallback(() => {
    setFormData({
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setState({
      isLoading: false,
      isSuccess: false,
      error: null,
      email: 'user@lbv-mobilites.ga'
    });
  }, []);

  return {
    formData,
    errors,
    state,
    passwordCriteria,
    handleInputChange,
    handleSubmit,
    clearError,
    resetForm
  };
};
