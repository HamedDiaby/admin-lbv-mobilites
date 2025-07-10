import React from 'react';
import { Card, Text, Input, Select, Switch } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { SystemSettings } from '../types';
import { timezoneOptions, languageOptions, currencyOptions, daysOfWeek } from '../constants';
import { validateBusinessHours, formatTime } from '../utils';

interface GeneralSettingsProps {
  settings: SystemSettings;
  updateSettings: (section: keyof SystemSettings, field: string, value: any) => void;
  updateBusinessHours: (day: string, field: string, value: any) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ 
  settings, 
  updateSettings,
  updateBusinessHours 
}) => {
  return (
    <div className="space-y-6">
      {/* Informations de l'entreprise */}
      <Card className="p-6">
        <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
          Informations de l'entreprise
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Nom de l'entreprise *
            </Text>
            <Input
              value={settings.general.companyName}
              onChange={(e) => updateSettings('general', 'companyName', e.target.value)}
              placeholder="Nom de votre entreprise"
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Email *
            </Text>
            <Input
              value={settings.general.email}
              onChange={(e) => updateSettings('general', 'email', e.target.value)}
              placeholder="contact@entreprise.com"
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Téléphone *
            </Text>
            <Input
              value={settings.general.phone}
              onChange={(e) => updateSettings('general', 'phone', e.target.value)}
              placeholder="+241 XX XX XX XX"
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Site web
            </Text>
            <Input
              value={settings.general.website}
              onChange={(e) => updateSettings('general', 'website', e.target.value)}
              placeholder="www.entreprise.com"
            />
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Adresse *
            </Text>
            <Input
              value={settings.general.address}
              onChange={(e) => updateSettings('general', 'address', e.target.value)}
              placeholder="Adresse complète"
            />
          </div>
        </div>
      </Card>

      {/* Configuration régionale */}
      <Card className="p-6">
        <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
          Configuration régionale
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Fuseau horaire
            </Text>
            <Select
              value={settings.general.timezone}
              onChange={(e) => updateSettings('general', 'timezone', e.target.value)}
              options={timezoneOptions}
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Langue
            </Text>
            <Select
              value={settings.general.language}
              onChange={(e) => updateSettings('general', 'language', e.target.value)}
              options={languageOptions}
            />
          </div>
          
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Devise
            </Text>
            <Select
              value={settings.general.currency}
              onChange={(e) => updateSettings('general', 'currency', e.target.value)}
              options={currencyOptions}
            />
          </div>
        </div>
      </Card>

      {/* Heures d'ouverture */}
      <Card className="p-6">
        <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold mb-4">
          Heures d'ouverture
        </Text>
        
        <div className="space-y-4">
          {daysOfWeek.map((day) => {
            const daySchedule = settings.general.businessHours[day.value as keyof typeof settings.general.businessHours];
            
            return (
              <div key={day.value} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={daySchedule.isOpen}
                    onChange={(checked) => updateBusinessHours(day.value, 'isOpen', checked)}
                  />
                  <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-medium min-w-[80px]">
                    {day.label}
                  </Text>
                </div>
                
                {daySchedule.isOpen && (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      value={daySchedule.openTime}
                      onChange={(e) => updateBusinessHours(day.value, 'openTime', e.target.value)}
                      className="w-32"
                    />
                    <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                      à
                    </Text>
                    <Input
                      type="time"
                      value={daySchedule.closeTime}
                      onChange={(e) => updateBusinessHours(day.value, 'closeTime', e.target.value)}
                      className="w-32"
                    />
                    {!validateBusinessHours(daySchedule.openTime, daySchedule.closeTime) && (
                      <Text variant="p4" color={ColorsEnum.ERROR} className="text-xs">
                        Heures invalides
                      </Text>
                    )}
                  </div>
                )}
                
                {!daySchedule.isOpen && (
                  <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                    Fermé
                  </Text>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
