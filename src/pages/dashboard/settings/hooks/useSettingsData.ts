import { useState, useEffect } from 'react';
import { SystemSettings } from '../types';
import { generateMockSettings } from '../constants';
import { validateGeneralSettings, validatePasswordPolicy } from '../utils';

export const useSettingsData = () => {
  // État des paramètres
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Initialisation des données
  useEffect(() => {
    const loadSettings = async () => {
      try {
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 800));
        setSettings(generateMockSettings());
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Fonction pour mettre à jour une section des paramètres
  const updateSettings = (section: keyof SystemSettings, field: string, value: any) => {
    if (!settings) return;

    setSettings(prevSettings => ({
      ...prevSettings!,
      [section]: {
        ...prevSettings![section],
        [field]: value
      }
    }));
  };

  // Fonction pour mettre à jour les heures d'ouverture
  const updateBusinessHours = (day: string, field: string, value: any) => {
    if (!settings) return;

    setSettings(prevSettings => {
      if (!prevSettings) return null;
      
      return {
        ...prevSettings,
        general: {
          ...prevSettings.general,
          businessHours: {
            ...prevSettings.general.businessHours,
            [day]: {
              ...prevSettings.general.businessHours[day as keyof typeof prevSettings.general.businessHours],
              [field]: value
            }
          }
        }
      };
    });
  };

  // Fonction pour mettre à jour les seuils d'alerte
  const updateAlertThresholds = (field: string, value: number) => {
    if (!settings) return;

    setSettings(prevSettings => ({
      ...prevSettings!,
      notification: {
        ...prevSettings!.notification,
        alertThresholds: {
          ...prevSettings!.notification.alertThresholds,
          [field]: value
        }
      }
    }));
  };

  // Fonction pour mettre à jour la politique de mot de passe
  const updatePasswordPolicy = (field: string, value: any) => {
    if (!settings) return;

    setSettings(prevSettings => ({
      ...prevSettings!,
      security: {
        ...prevSettings!.security,
        passwordPolicy: {
          ...prevSettings!.security.passwordPolicy,
          [field]: value
        }
      }
    }));
  };

  // Fonction pour mettre à jour la fenêtre de maintenance
  const updateMaintenanceWindow = (field: string, value: any) => {
    if (!settings) return;

    setSettings(prevSettings => ({
      ...prevSettings!,
      maintenance: {
        ...prevSettings!.maintenance,
        maintenanceWindow: {
          ...prevSettings!.maintenance.maintenanceWindow,
          [field]: value
        }
      }
    }));
  };

  // Fonction pour sauvegarder les paramètres
  const saveSettings = async (): Promise<{ success: boolean; errors?: string[] }> => {
    if (!settings) return { success: false, errors: ['Aucun paramètre à sauvegarder'] };

    setSaving(true);

    try {
      // Validation des paramètres généraux
      const generalValidation = validateGeneralSettings(settings.general);
      if (!generalValidation.isValid) {
        return { success: false, errors: generalValidation.errors };
      }

      // Validation de la politique de mot de passe
      const passwordPolicyErrors = validatePasswordPolicy(settings.security.passwordPolicy);
      if (passwordPolicyErrors.length > 0) {
        return { success: false, errors: passwordPolicyErrors };
      }

      // Simulation d'un appel API pour sauvegarder
      await new Promise(resolve => setTimeout(resolve, 1500));

      return { success: true };
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return { success: false, errors: ['Erreur lors de la sauvegarde des paramètres'] };
    } finally {
      setSaving(false);
    }
  };

  // Fonction pour réinitialiser les paramètres
  const resetSettings = () => {
    setSettings(generateMockSettings());
  };

  // Fonction pour exporter les paramètres
  const exportSettings = (): string => {
    if (!settings) return '';
    return JSON.stringify(settings, null, 2);
  };

  // Fonction pour importer les paramètres
  const importSettings = (settingsJson: string): { success: boolean; error?: string } => {
    try {
      const importedSettings = JSON.parse(settingsJson) as SystemSettings;
      setSettings(importedSettings);
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Format de fichier invalide' };
    }
  };

  return {
    // Données
    settings,
    loading,
    saving,
    activeTab,

    // Actions de navigation
    setActiveTab,

    // Actions de modification
    updateSettings,
    updateBusinessHours,
    updateAlertThresholds,
    updatePasswordPolicy,
    updateMaintenanceWindow,

    // Actions globales
    saveSettings,
    resetSettings,
    exportSettings,
    importSettings
  };
};
