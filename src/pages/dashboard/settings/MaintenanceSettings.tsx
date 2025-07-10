import React from 'react';
import { Card } from '../../../components/card';
import { Button } from '../../../components/button';
import { Text } from '../../../components/text';
import { Badge } from '../../../components/badge';
import { Input } from '../../../components/input';
import { Select } from '../../../components/select';
import { Switch } from '../../../components/switch';
import { SystemSettings } from './types';

interface MaintenanceSettingsProps {
  settings: SystemSettings;
  updateSettings: (section: keyof SystemSettings, field: string, value: any) => void;
}

const MaintenanceSettings: React.FC<MaintenanceSettingsProps> = ({ settings, updateSettings }) => {
  const updateMaintenanceWindow = (field: string, value: any) => {
    updateSettings('maintenance', 'maintenanceWindow', {
      ...settings.maintenance.maintenanceWindow,
      [field]: value
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysOfWeek = () => [
    { value: 'monday', label: 'Lundi' },
    { value: 'tuesday', label: 'Mardi' },
    { value: 'wednesday', label: 'Mercredi' },
    { value: 'thursday', label: 'Jeudi' },
    { value: 'friday', label: 'Vendredi' },
    { value: 'saturday', label: 'Samedi' },
    { value: 'sunday', label: 'Dimanche' }
  ];

  return (
    <div className="space-y-6">
      {/* Fenêtre de maintenance */}
      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Fenêtre de maintenance
        </Text>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Maintenance programmée
              </Text>
              <Text variant="p4" className="text-gray-500">
                Activer les maintenances automatiques
              </Text>
            </div>
            <Switch
              checked={settings.maintenance.scheduleEnabled}
              onChange={(checked) => updateSettings('maintenance', 'scheduleEnabled', checked)}
            />
          </div>
          
          {settings.maintenance.scheduleEnabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <Input
                label="Heure de début"
                type="time"
                value={settings.maintenance.maintenanceWindow.startTime}
                onChange={(e) => updateMaintenanceWindow('startTime', e.target.value)}
              />
              
              <Input
                label="Heure de fin"
                type="time"
                value={settings.maintenance.maintenanceWindow.endTime}
                onChange={(e) => updateMaintenanceWindow('endTime', e.target.value)}
              />
            </div>
          )}
          
          {settings.maintenance.scheduleEnabled && (
            <div className="pt-2">
              <Text variant="p3" className="text-gray-700 font-medium mb-2">
                Jours de maintenance:
              </Text>
              <div className="flex flex-wrap gap-2">
                {getDaysOfWeek().map((day) => (
                  <button
                    key={day.value}
                    onClick={() => {
                      const currentDays = settings.maintenance.maintenanceWindow.days;
                      const newDays = currentDays.includes(day.value)
                        ? currentDays.filter(d => d !== day.value)
                        : [...currentDays, day.value];
                      updateMaintenanceWindow('days', newDays);
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      settings.maintenance.maintenanceWindow.days.includes(day.value)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {settings.maintenance.scheduleEnabled && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <Text variant="p3" className="text-blue-800">
              <strong>Prochaine maintenance:</strong> {
                settings.maintenance.maintenanceWindow.days.map(day => 
                  getDaysOfWeek().find(d => d.value === day)?.label
                ).join(', ')
              } de {formatTime(settings.maintenance.maintenanceWindow.startTime)} à {formatTime(settings.maintenance.maintenanceWindow.endTime)}
            </Text>
          </div>
        )}
      </Card>

      {/* Sauvegarde automatique */}
      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Sauvegarde automatique
        </Text>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Sauvegarde automatique
              </Text>
              <Text variant="p4" className="text-gray-500">
                Créer automatiquement des sauvegardes du système
              </Text>
            </div>
            <Switch
              checked={settings.maintenance.autoBackup}
              onChange={(checked) => updateSettings('maintenance', 'autoBackup', checked)}
            />
          </div>
          
          {settings.maintenance.autoBackup && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Fréquence de sauvegarde"
                value={settings.maintenance.backupFrequency}
                onChange={(e) => updateSettings('maintenance', 'backupFrequency', e.target.value)}
                options={[
                  { value: 'daily', label: 'Quotidienne' },
                  { value: 'weekly', label: 'Hebdomadaire' },
                  { value: 'monthly', label: 'Mensuelle' }
                ]}
              />
              
              <Input
                label="Période de rétention (jours)"
                value={settings.maintenance.retentionPeriod.toString()}
                onChange={(e) => updateSettings('maintenance', 'retentionPeriod', parseInt(e.target.value) || 30)}
                helperText="Durée de conservation des sauvegardes"
              />
            </div>
          )}
        </div>
        
        <div className="mt-6 flex space-x-4">
          <Button
            label="Créer une sauvegarde maintenant"
            appearance="outline"
            variation="primary"
            iconName="Database"
          />
          
          <Button
            label="Restaurer depuis une sauvegarde"
            appearance="outline"
            variation="secondary"
            iconName="Upload"
          />
        </div>
      </Card>

      {/* Mises à jour système */}
      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Mises à jour système
        </Text>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Mises à jour automatiques
              </Text>
              <Text variant="p4" className="text-gray-500">
                Installer automatiquement les mises à jour de sécurité
              </Text>
            </div>
            <Switch
              checked={settings.maintenance.systemUpdates}
              onChange={(checked) => updateSettings('maintenance', 'systemUpdates', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-gray-900 font-medium">
                Notifications de mise à jour
              </Text>
              <Text variant="p4" className="text-gray-500">
                Recevoir des notifications pour les nouvelles versions
              </Text>
            </div>
            <Switch
              checked={settings.maintenance.updateNotifications}
              onChange={(checked) => updateSettings('maintenance', 'updateNotifications', checked)}
            />
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <Text variant="p2" className="text-green-800 font-medium">
                Système à jour
              </Text>
              <Text variant="p4" className="text-green-600">
                Version 2.1.4 - Dernière vérification: il y a 2 heures
              </Text>
            </div>
            <Badge variant="outline" color="success">
              ✓ À jour
            </Badge>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-4">
          <Button
            label="Vérifier les mises à jour"
            appearance="outline"
            variation="primary"
            iconName="RefreshCw"
          />
          
          <Button
            label="Voir l'historique"
            appearance="clear"
            variation="secondary"
            iconName="History"
          />
        </div>
      </Card>

      {/* Informations système */}
      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Informations système
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Text variant="p3" className="text-gray-500">Version:</Text>
              <Text variant="p3" className="text-gray-900 font-medium">2.1.4</Text>
            </div>
            <div className="flex justify-between">
              <Text variant="p3" className="text-gray-500">Base de données:</Text>
              <Text variant="p3" className="text-gray-900 font-medium">PostgreSQL 14.2</Text>
            </div>
            <div className="flex justify-between">
              <Text variant="p3" className="text-gray-500">Uptime:</Text>
              <Text variant="p3" className="text-gray-900 font-medium">15 jours, 8h 32m</Text>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Text variant="p3" className="text-gray-500">Espace disque:</Text>
              <Text variant="p3" className="text-gray-900 font-medium">2.3 GB / 10 GB</Text>
            </div>
            <div className="flex justify-between">
              <Text variant="p3" className="text-gray-500">Mémoire:</Text>
              <Text variant="p3" className="text-gray-900 font-medium">1.8 GB / 4 GB</Text>
            </div>
            <div className="flex justify-between">
              <Text variant="p3" className="text-gray-500">Dernière sauvegarde:</Text>
              <Text variant="p3" className="text-gray-900 font-medium">Aujourd'hui à 03:00</Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MaintenanceSettings;
