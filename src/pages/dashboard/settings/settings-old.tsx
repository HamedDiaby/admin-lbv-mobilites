import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/card';
import { Button } from '../../../components/button';
import { Text } from '../../../components/text';
import { Input } from '../../../components/input';
import { Select } from '../../../components/select';
import { Switch } from '../../../components/switch';
import { SystemSettings, SettingsTab } from './types';
import BillingSettings from './components/BillingSettings';
import MaintenanceSettings from './components/MaintenanceSettings';

// Données de simulation
const generateMockSettings = (): SystemSettings => ({
  general: {
    companyName: 'LBV Mobilités',
    address: '123 Avenue de la République, Libreville, Gabon',
    phone: '+241 01 23 45 67',
    email: 'contact@lbvmobilites.ga',
    website: 'www.lbvmobilites.ga',
    timezone: 'Africa/Libreville',
    language: 'fr',
    currency: 'XAF',
    businessHours: {
      monday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '05:30', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '06:00', closeTime: '20:00' },
      sunday: { isOpen: true, openTime: '07:00', closeTime: '19:00' }
    }
  },
  notification: {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    maintenanceAlerts: true,
    capacityAlerts: true,
    revenueReports: true,
    alertThresholds: {
      busCapacity: 85,
      lowFuel: 20,
      maintenanceDue: 7,
      revenueDropAlert: 15
    }
  },
  security: {
    twoFactorAuth: false,
    sessionTimeout: 60,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: false,
      passwordExpiry: 90
    },
    apiAccess: true,
    auditLogs: true,
    ipWhitelist: []
  },
  appearance: {
    theme: 'light',
    primaryColor: '#3B82F6',
    fontSize: 'medium',
    compactMode: false,
    showSidebar: true,
    language: 'fr'
  },
  billing: {
    baseFare: 500,
    distanceRate: 50,
    peakHourMultiplier: 1.5,
    subscriptionPlans: [
      {
        id: '1',
        name: 'Journalier',
        duration: 1,
        price: 2000,
        features: ['Voyages illimités pendant 24h', 'Toutes les lignes'],
        isActive: true
      },
      {
        id: '2',
        name: 'Hebdomadaire',
        duration: 7,
        price: 12000,
        features: ['Voyages illimités pendant 7 jours', 'Toutes les lignes', '15% d\'économie'],
        isActive: true
      },
      {
        id: '3',
        name: 'Mensuel',
        duration: 30,
        price: 45000,
        features: ['Voyages illimités pendant 30 jours', 'Toutes les lignes', '25% d\'économie', 'Support prioritaire'],
        isActive: true
      }
    ],
    paymentMethods: [
      { id: '1', name: 'Airtel Money', type: 'mobile_money', isActive: true, fees: 2.5 },
      { id: '2', name: 'Moov Money', type: 'mobile_money', isActive: true, fees: 2.0 },
      { id: '3', name: 'Espèces', type: 'cash', isActive: true, fees: 0 },
      { id: '4', name: 'Carte bancaire', type: 'card', isActive: false, fees: 3.0 }
    ],
    taxRate: 18
  },
  maintenance: {
    scheduleEnabled: true,
    maintenanceWindow: {
      startTime: '02:00',
      endTime: '04:00',
      days: ['sunday']
    },
    autoBackup: true,
    backupFrequency: 'daily',
    retentionPeriod: 30,
    systemUpdates: true,
    updateNotifications: true
  }
});

const settingsTabs: SettingsTab[] = [
  {
    id: 'general',
    name: 'Général',
    icon: 'Settings',
    description: 'Informations de base et configuration générale'
  },
  {
    id: 'notification',
    name: 'Notifications',
    icon: 'Bell',
    description: 'Paramètres des alertes et notifications'
  },
  {
    id: 'security',
    name: 'Sécurité',
    icon: 'Shield',
    description: 'Authentification et sécurité du système'
  },
  {
    id: 'appearance',
    name: 'Apparence',
    icon: 'Palette',
    description: 'Thème et préférences d\'affichage'
  },
  {
    id: 'billing',
    name: 'Tarification',
    icon: 'CreditCard',
    description: 'Tarifs et méthodes de paiement'
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    icon: 'Wrench',
    description: 'Sauvegarde et maintenance du système'
  }
];

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Simulation du chargement des paramètres
    const loadSettings = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setSettings(generateMockSettings());
      setLoading(false);
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    // Ici on ferait l'appel API pour sauvegarder
  };

  const updateSettings = (section: keyof SystemSettings, field: string, value: any) => {
    if (!settings) return;

    setSettings(prev => ({
      ...prev!,
      [section]: {
        ...prev![section],
        [field]: value
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Informations de l'entreprise
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nom de l'entreprise"
            value={settings?.general.companyName || ''}
            onChange={(e) => updateSettings('general', 'companyName', e.target.value)}
            required
          />
          
          <Input
            label="Email"
            type="email"
            value={settings?.general.email || ''}
            onChange={(e) => updateSettings('general', 'email', e.target.value)}
            required
          />
          
          <Input
            label="Téléphone"
            value={settings?.general.phone || ''}
            onChange={(e) => updateSettings('general', 'phone', e.target.value)}
            required
          />
          
          <Input
            label="Site web"
            value={settings?.general.website || ''}
            onChange={(e) => updateSettings('general', 'website', e.target.value)}
          />
        </div>
        
        <div className="mt-4">
          <Input
            label="Adresse"
            value={settings?.general.address || ''}
            onChange={(e) => updateSettings('general', 'address', e.target.value)}
            fullWidth
            required
          />
        </div>
      </Card>

      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Configuration régionale
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Fuseau horaire"
            value={settings?.general.timezone || ''}
            onChange={(e) => updateSettings('general', 'timezone', e.target.value)}
            options={[
              { value: 'Africa/Libreville', label: 'Libreville (WAT)' },
              { value: 'UTC', label: 'UTC' },
              { value: 'Europe/Paris', label: 'Paris (CET)' }
            ]}
          />
          
          <Select
            label="Langue"
            value={settings?.general.language || ''}
            onChange={(e) => updateSettings('general', 'language', e.target.value)}
            options={[
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'English' }
            ]}
          />
          
          <Select
            label="Devise"
            value={settings?.general.currency || ''}
            onChange={(e) => updateSettings('general', 'currency', e.target.value)}
            options={[
              { value: 'XAF', label: 'Franc CFA (XAF)' },
              { value: 'EUR', label: 'Euro (EUR)' },
              { value: 'USD', label: 'Dollar US (USD)' }
            ]}
          />
        </div>
      </Card>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Types de notifications
        </Text>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Notifications par email
              </Text>
              <Text variant="p4" className="text-gray-500">
                Recevoir les alertes par email
              </Text>
            </div>
            <Switch
              checked={settings?.notification.emailNotifications || false}
              onChange={(checked) => updateSettings('notification', 'emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Notifications SMS
              </Text>
              <Text variant="p4" className="text-gray-500">
                Recevoir les alertes par SMS
              </Text>
            </div>
            <Switch
              checked={settings?.notification.smsNotifications || false}
              onChange={(checked) => updateSettings('notification', 'smsNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Notifications push
              </Text>
              <Text variant="p4" className="text-gray-500">
                Notifications dans l'application
              </Text>
            </div>
            <Switch
              checked={settings?.notification.pushNotifications || false}
              onChange={(checked) => updateSettings('notification', 'pushNotifications', checked)}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Alertes spécialisées
        </Text>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Alertes de maintenance
              </Text>
              <Text variant="p4" className="text-gray-500">
                Notifications pour la maintenance des véhicules
              </Text>
            </div>
            <Switch
              checked={settings?.notification.maintenanceAlerts || false}
              onChange={(checked) => updateSettings('notification', 'maintenanceAlerts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Alertes de capacité
              </Text>
              <Text variant="p4" className="text-gray-500">
                Notifications quand les bus sont pleins
              </Text>
            </div>
            <Switch
              checked={settings?.notification.capacityAlerts || false}
              onChange={(checked) => updateSettings('notification', 'capacityAlerts', checked)}
            />
          </div>
        </div>
      </Card>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Authentification
        </Text>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Authentification à deux facteurs
              </Text>
              <Text variant="p4" className="text-gray-500">
                Ajouter une couche de sécurité supplémentaire
              </Text>
            </div>
            <Switch
              checked={settings?.security.twoFactorAuth || false}
              onChange={(checked) => updateSettings('security', 'twoFactorAuth', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Journaux d'audit
              </Text>
              <Text variant="p4" className="text-gray-500">
                Enregistrer toutes les actions des utilisateurs
              </Text>
            </div>
            <Switch
              checked={settings?.security.auditLogs || false}
              onChange={(checked) => updateSettings('security', 'auditLogs', checked)}
            />
          </div>
        </div>
        
        <div className="mt-6">
          <Input
            label="Timeout de session (minutes)"
            type="text"
            value={settings?.security.sessionTimeout?.toString() || ''}
            onChange={(e) => updateSettings('security', 'sessionTimeout', parseInt(e.target.value) || 60)}
          />
        </div>
      </Card>

      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Politique de mot de passe
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Longueur minimale"
            type="text"
            value={settings?.security.passwordPolicy.minLength?.toString() || ''}
            onChange={(e) => updateSettings('security', 'passwordPolicy', {
              ...settings?.security.passwordPolicy,
              minLength: parseInt(e.target.value) || 8
            })}
          />
          
          <Input
            label="Expiration (jours)"
            type="text"
            value={settings?.security.passwordPolicy.passwordExpiry?.toString() || ''}
            onChange={(e) => updateSettings('security', 'passwordPolicy', {
              ...settings?.security.passwordPolicy,
              passwordExpiry: parseInt(e.target.value) || 90
            })}
          />
        </div>
      </Card>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notification':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return (
          <Card className="p-6">
            <Text variant="h4" className="text-gray-900 font-semibold mb-4">
              Apparence
            </Text>
            <Text variant="p2" className="text-gray-500">
              Configuration de l'apparence en cours de développement...
            </Text>
          </Card>
        );
      case 'billing':
        return settings ? (
          <BillingSettings 
            settings={settings} 
            updateSettings={updateSettings}
          />
        ) : null;
      case 'maintenance':
        return settings ? (
          <MaintenanceSettings 
            settings={settings} 
            updateSettings={updateSettings}
          />
        ) : null;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Text variant="h1" className="text-gray-900 font-bold">
            Paramètres
          </Text>
          <Text variant="p2" className="text-gray-500 mt-1">
            Configuration et préférences du système
          </Text>
        </div>
        
        <Button
          label={saving ? "Sauvegarde..." : "Sauvegarder"}
          appearance="solid"
          variation="primary"
          iconName="Save"
          loading={saving}
          onClick={handleSave}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation des onglets */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <div className="space-y-2">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      {tab.id === 'general' && '⚙️'}
                      {tab.id === 'notification' && '🔔'}
                      {tab.id === 'security' && '🛡️'}
                      {tab.id === 'appearance' && '🎨'}
                      {tab.id === 'billing' && '💳'}
                      {tab.id === 'maintenance' && '🔧'}
                    </span>
                    <div>
                      <Text variant="p2" className="font-medium">
                        {tab.name}
                      </Text>
                      <Text variant="p5" className="text-gray-500">
                        {tab.description}
                      </Text>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Contenu des paramètres */}
        <div className="lg:col-span-3">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
