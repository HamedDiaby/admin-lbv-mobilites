import React from 'react';
import { useSettingsData } from './hooks/useSettingsData';
import { settingsTabs } from './constants';
import {
  SettingsHeader,
  SettingsTabs,
  GeneralSettings,
  BillingSettings,
  MaintenanceSettings
} from './components';

const Settings: React.FC = () => {
  // Données et logique métier
  const {
    settings,
    loading,
    saving,
    activeTab,
    setActiveTab,
    updateSettings,
    updateBusinessHours,
    updateAlertThresholds,
    updatePasswordPolicy,
    updateMaintenanceWindow,
    saveSettings,
    resetSettings,
    exportSettings
  } = useSettingsData();

  // Handlers
  const handleSave = async () => {
    const result = await saveSettings();
    if (result.success) {
      alert('Paramètres sauvegardés avec succès !');
    } else {
      alert(`Erreur: ${result.errors?.join(', ')}`);
    }
  };

  const handleExport = () => {
    const settingsData = exportSettings();
    const blob = new Blob([settingsData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (window.confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      resetSettings();
    }
  };

  // Rendu du contenu de l'onglet actif
  const renderTabContent = () => {
    if (!settings) return null;

    switch (activeTab) {
      case 'general':
        return (
          <GeneralSettings
            settings={settings}
            updateSettings={updateSettings}
            updateBusinessHours={updateBusinessHours}
          />
        );
      case 'notification':
        return (
          <div className="p-6 text-center">
            <p>Paramètres de notifications - À implémenter</p>
          </div>
        );
      case 'security':
        return (
          <div className="p-6 text-center">
            <p>Paramètres de sécurité - À implémenter</p>
          </div>
        );
      case 'appearance':
        return (
          <div className="p-6 text-center">
            <p>Paramètres d'apparence - À implémenter</p>
          </div>
        );
      case 'billing':
        return (
          <BillingSettings
            settings={settings}
            updateSettings={updateSettings}
          />
        );
      case 'maintenance':
        return (
          <MaintenanceSettings
            settings={settings}
            updateSettings={updateSettings}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-16 bg-gray-100 rounded mb-6"></div>
          <div className="h-96 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <SettingsHeader
        onSave={handleSave}
        onExport={handleExport}
        onReset={handleReset}
        saving={saving}
      />

      {/* Navigation par onglets */}
      <SettingsTabs
        tabs={settingsTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Contenu de l'onglet actif */}
      {renderTabContent()}
    </div>
  );
};

export { Settings };
export default Settings;