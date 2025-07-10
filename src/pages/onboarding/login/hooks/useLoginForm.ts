import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../contexts';
import { LoginFormData, LoginFormErrors } from '../types';
import { 
  validateLoginForm, 
  sanitizeFormData, 
  saveLoginAttempt, 
  isAccountLocked,
  getRemainingLockoutTime,
  saveUserSession,
  getRedirectUrl,
  logLoginAttempt,
  logSecurityEvent
} from '../utils';
import { LOGIN_ERROR_MESSAGES, TEST_CREDENTIALS, LOGIN_TIMEOUTS } from '../constants';

interface LoginController {
  formData: LoginFormData;
  errors: LoginFormErrors;
  isLoading: boolean;
  isLocked: boolean;
  lockoutTimeRemaining: number;
  error: string | null;
  handleInputChange: (field: keyof LoginFormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
  clearField: (field: keyof LoginFormData) => void;
}

export const useLoginForm = (): LoginController => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // États du formulaire
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState(0);

  // Vérifier si le compte est verrouillé
  const isLocked = isAccountLocked(formData.email) || lockoutTimeRemaining > 0;

  // Gestion des changements d'input
  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Nettoyer les erreurs du champ modifié
    if (errors[field as keyof LoginFormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (error) setError(null);

    // Mettre à jour le statut de verrouillage si l'email change
    if (field === 'email' && typeof value === 'string') {
      const remaining = getRemainingLockoutTime(value);
      setLockoutTimeRemaining(remaining);
    }
  };

  // Nettoyer une erreur spécifique
  const clearField = (field: keyof LoginFormData) => {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  // Nettoyer l'erreur générale
  const clearError = () => {
    setError(null);
  };

  // Validation du formulaire
  const validateForm = (): boolean => {
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return false;
    }

    // Vérifier le verrouillage du compte
    if (isAccountLocked(formData.email)) {
      const remaining = getRemainingLockoutTime(formData.email);
      if (remaining > 0) {
        const minutes = Math.ceil(remaining / (1000 * 60));
        setError(`${LOGIN_ERROR_MESSAGES.ACCOUNT_LOCKED}. Réessayez dans ${minutes} minute${minutes > 1 ? 's' : ''}.`);
        setLockoutTimeRemaining(remaining);
        logSecurityEvent('Account locked', { email: formData.email, remaining });
        return false;
      }
    }
    
    return true;
  };

  // Authentifier avec les identifiants de test
  const authenticateWithTestCredentials = (email: string, password: string): boolean => {
    return TEST_CREDENTIALS.some(cred => 
      cred.email === email && cred.password === password
    );
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    
    const sanitizedData = sanitizeFormData(formData);
    const startTime = Date.now();
    
    try {
      // Simulation d'un appel API avec timeout
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          clearTimeout(timer);
          
          // Vérification des identifiants de test
          const isValidCredentials = authenticateWithTestCredentials(
            sanitizedData.email, 
            sanitizedData.password
          );
          
          if (isValidCredentials) {
            resolve(true);
          } else {
            reject(new Error('Identifiants incorrects'));
          }
        }, 1500);

        // Timeout de sécurité
        setTimeout(() => {
          clearTimeout(timer);
          reject(new Error('Timeout'));
        }, LOGIN_TIMEOUTS.API_TIMEOUT);
      });
      
      // Enregistrer la tentative réussie
      saveLoginAttempt({
        email: sanitizedData.email,
        timestamp: Date.now(),
        success: true
      });

      // Trouver les données utilisateur correspondantes
      const userCredentials = TEST_CREDENTIALS.find(cred => 
        cred.email === sanitizedData.email
      );

      // Sauvegarder la session utilisateur
      const userData = {
        email: sanitizedData.email,
        role: userCredentials?.role || 'Utilisateur',
        loginTime: new Date().toISOString()
      };

      saveUserSession(userData, sanitizedData.rememberMe);
      
      // Utiliser le contexte d'authentification
      login(sanitizedData.email, sanitizedData.rememberMe);
      
      logLoginAttempt(sanitizedData.email, true, { 
        duration: Date.now() - startTime,
        rememberMe: sanitizedData.rememberMe 
      });
      
      // Redirection vers la page demandée
      const redirectUrl = getRedirectUrl(location);
      
      setTimeout(() => {
        navigate(redirectUrl, { replace: true });
      }, LOGIN_TIMEOUTS.REDIRECT_DELAY);
      
    } catch (err) {
      // Enregistrer la tentative échouée
      saveLoginAttempt({
        email: sanitizedData.email,
        timestamp: Date.now(),
        success: false
      });

      logLoginAttempt(sanitizedData.email, false, { 
        error: err instanceof Error ? err.message : 'Unknown error',
        duration: Date.now() - startTime 
      });
      
      // Vérifier si le compte doit être verrouillé
      const remaining = getRemainingLockoutTime(sanitizedData.email);
      if (remaining > 0) {
        const minutes = Math.ceil(remaining / (1000 * 60));
        setError(`${LOGIN_ERROR_MESSAGES.ACCOUNT_LOCKED}. Réessayez dans ${minutes} minute${minutes > 1 ? 's' : ''}.`);
        setLockoutTimeRemaining(remaining);
        logSecurityEvent('Account locked after failed attempt', { email: sanitizedData.email });
      } else {
        setError(LOGIN_ERROR_MESSAGES.INVALID_CREDENTIALS);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    isLocked,
    lockoutTimeRemaining,
    error,
    handleInputChange,
    handleSubmit,
    clearError,
    clearField
  };
};
