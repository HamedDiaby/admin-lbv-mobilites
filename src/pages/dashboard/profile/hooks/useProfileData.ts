import { useState, useCallback } from 'react';
import { useAuth } from '../../../../contexts';
import { ProfileData, ProfileFormErrors, User, ProfileSettings, SecuritySettings } from '../types';
import { validateProfileForm, sanitizeProfileData, hasProfileChanged } from '../utils';
import { getDefaultProfileSettings, generateMockAccountInfo } from '../constants';

// Type pour l'utilisateur du contexte d'authentification
type AuthUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  department?: string;
  role?: string;
  lastLogin?: string;
  [key: string]: any;
};

// Fonction pour convertir l'utilisateur du contexte vers notre type User
const convertAuthUserToProfileUser = (authUser: AuthUser | null): User | null => {
  if (!authUser) return null;
  
  return {
    firstName: authUser.firstName || '',
    lastName: authUser.lastName || '',
    email: authUser.email || '',
    department: authUser.department || '',
    role: authUser.role,
    lastLogin: authUser.lastLogin,
    status: 'active', // valeur par défaut
    permissions: [], // valeur par défaut
  };
};

interface UseProfileDataReturn {
  // État du profil
  user: User | null;
  isEditing: boolean;
  isSaving: boolean;
  isLoading: boolean;
  
  // État du formulaire
  formData: ProfileData;
  errors: ProfileFormErrors;
  hasUnsavedChanges: boolean;
  
  // État des paramètres
  profileSettings: ProfileSettings;
  securitySettings: SecuritySettings;
  
  // Actions de profil
  startEditing: () => void;
  cancelEditing: () => void;
  updateFormData: (data: Partial<ProfileData>) => void;
  saveProfile: () => Promise<{ success: boolean; errors?: string[] }>;
  
  // Actions de sécurité
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  toggleTwoFactor: () => Promise<boolean>;
  
  // Actions des paramètres
  updateProfileSettings: (settings: Partial<ProfileSettings>) => void;
  
  // Actions diverses
  exportUserData: () => string;
  deleteAccount: () => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

export const useProfileData = (): UseProfileDataReturn => {
  const { user: authUser, updateUser } = useAuth();
  
  // Convertir l'utilisateur du contexte vers notre type User
  const user = convertAuthUserToProfileUser(authUser);
  
  // États locaux
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  
  // Données du formulaire
  const [formData, setFormData] = useState<ProfileData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    department: user?.department || ''
  });
  
  // Paramètres
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>(
    getDefaultProfileSettings()
  );
  
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    lastPasswordChange: '2024-01-15T10:30:00Z',
    activeSessions: 1,
    loginAttempts: 0
  });

  // Calculer si il y a des changements non sauvegardés
  const hasUnsavedChanges = user ? hasProfileChanged(
    {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      department: user.department || ''
    },
    formData
  ) : false;

  // Démarrer l'édition
  const startEditing = useCallback(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        department: user.department || ''
      });
      setErrors({});
      setIsEditing(true);
    }
  }, [user]);

  // Annuler l'édition
  const cancelEditing = useCallback(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        department: user.department || ''
      });
    }
    setErrors({});
    setIsEditing(false);
  }, [user]);

  // Mettre à jour les données du formulaire
  const updateFormData = useCallback((data: Partial<ProfileData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    
    // Nettoyer les erreurs des champs modifiés
    const updatedFields = Object.keys(data) as (keyof ProfileData)[];
    if (updatedFields.some(field => errors[field])) {
      setErrors(prev => {
        const newErrors = { ...prev };
        updatedFields.forEach(field => {
          if (newErrors[field]) {
            delete newErrors[field];
          }
        });
        return newErrors;
      });
    }
  }, [errors]);

  // Sauvegarder le profil
  const saveProfile = useCallback(async (): Promise<{ success: boolean; errors?: string[] }> => {
    setIsSaving(true);
    
    try {
      // Validation
      const validationErrors = validateProfileForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return { 
          success: false, 
          errors: Object.values(validationErrors).filter(Boolean) as string[] 
        };
      }

      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Nettoyer et sauvegarder les données
      const sanitizedData = sanitizeProfileData(formData);
      
      // Mettre à jour le contexte utilisateur
      updateUser(sanitizedData);
      
      // Arrêter l'édition
      setIsEditing(false);
      setErrors({});
      
      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du profil:', error);
      return { 
        success: false, 
        errors: ['Une erreur est survenue lors de la sauvegarde'] 
      };
    } finally {
      setIsSaving(false);
    }
  }, [formData, updateUser]);

  // Changer le mot de passe
  const changePassword = useCallback(async (
    currentPassword: string, 
    newPassword: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler une validation du mot de passe actuel
      if (currentPassword !== 'current123') {
        throw new Error('Mot de passe actuel incorrect');
      }
      
      // Mettre à jour les paramètres de sécurité
      setSecuritySettings(prev => ({
        ...prev,
        lastPasswordChange: new Date().toISOString()
      }));
      
      return true;
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Basculer l'authentification à deux facteurs
  const toggleTwoFactor = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSecuritySettings(prev => ({
        ...prev,
        twoFactorEnabled: !prev.twoFactorEnabled
      }));
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la configuration 2FA:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Mettre à jour les paramètres de profil
  const updateProfileSettings = useCallback((settings: Partial<ProfileSettings>) => {
    setProfileSettings(prev => ({ ...prev, ...settings }));
    
    // Ici, vous pourriez ajouter une sauvegarde automatique
    console.log('Paramètres mis à jour:', settings);
  }, []);

  // Exporter les données utilisateur
  const exportUserData = useCallback((): string => {
    if (!user) return '';
    
    const exportData = {
      profile: user,
      settings: profileSettings,
      security: {
        twoFactorEnabled: securitySettings.twoFactorEnabled,
        lastPasswordChange: securitySettings.lastPasswordChange
      },
      accountInfo: generateMockAccountInfo(),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    return JSON.stringify(exportData, null, 2);
  }, [user, profileSettings, securitySettings]);

  // Supprimer le compte
  const deleteAccount = useCallback(async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Ici, vous pourriez déconnecter l'utilisateur
      console.log('Compte supprimé');
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Rafraîchir les données du profil
  const refreshProfile = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Simulation d'un appel API pour récupérer les données fraîches
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici, vous pourriez refetch les données depuis l'API
      console.log('Profil rafraîchi');
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // État du profil
    user,
    isEditing,
    isSaving,
    isLoading,
    
    // État du formulaire
    formData,
    errors,
    hasUnsavedChanges,
    
    // État des paramètres
    profileSettings,
    securitySettings,
    
    // Actions de profil
    startEditing,
    cancelEditing,
    updateFormData,
    saveProfile,
    
    // Actions de sécurité
    changePassword,
    toggleTwoFactor,
    
    // Actions des paramètres
    updateProfileSettings,
    
    // Actions diverses
    exportUserData,
    deleteAccount,
    refreshProfile
  };
};
