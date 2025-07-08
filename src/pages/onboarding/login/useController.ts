import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginController {
  formData: LoginFormData;
  isLoading: boolean;
  error: string | null;
  handleInputChange: (field: keyof LoginFormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

export const useController = (): LoginController => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Nettoyer l'erreur quand l'utilisateur tape
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.email.trim()) {
      setError('L\'adresse email est requise');
      return false;
    }
    
    if (!formData.email.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      return false;
    }
    
    if (!formData.password.trim()) {
      setError('Le mot de passe est requis');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulation d'une authentification (à remplacer par votre API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Vérification simulée des identifiants
      if (formData.email === 'admin@lbv-mobilites.ga' && formData.password === 'admin123') {
        // Utiliser le contexte d'authentification pour la connexion
        login(formData.email, formData.rememberMe);
        
        // Rediriger vers la page demandée ou le dashboard
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('Identifiants incorrects. Veuillez réessayer.');
      }
    } catch (err) {
      setError('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    formData,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    clearError
  };
};
