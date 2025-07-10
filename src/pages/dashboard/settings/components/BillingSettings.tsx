import React from 'react';
import { Card } from '../../../../components/card';
import { Button } from '../../../../components/button';
import { Text } from '../../../../components/text';
import { Badge } from '../../../../components/badge';
import { Input } from '../../../../components/input';
import { Switch } from '../../../../components/switch';
import { SystemSettings, SubscriptionPlan, PaymentMethod } from '../types';

interface BillingSettingsProps {
  settings: SystemSettings;
  updateSettings: (section: keyof SystemSettings, field: string, value: any) => void;
}

const BillingSettings: React.FC<BillingSettingsProps> = ({ settings, updateSettings }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XAF',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const updateSubscriptionPlan = (planId: string, field: keyof SubscriptionPlan, value: any) => {
    const updatedPlans = settings.billing.subscriptionPlans.map(plan =>
      plan.id === planId ? { ...plan, [field]: value } : plan
    );
    updateSettings('billing', 'subscriptionPlans', updatedPlans);
  };

  const updatePaymentMethod = (methodId: string, field: keyof PaymentMethod, value: any) => {
    const updatedMethods = settings.billing.paymentMethods.map(method =>
      method.id === methodId ? { ...method, [field]: value } : method
    );
    updateSettings('billing', 'paymentMethods', updatedMethods);
  };

  return (
    <div className="space-y-6">
      {/* Tarifs de base */}
      <Card className="p-6">
        <Text variant="h4" className="text-gray-900 font-semibold mb-4">
          Tarification de base
        </Text>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Tarif de base"
            value={settings.billing.baseFare.toString()}
            onChange={(e) => updateSettings('billing', 'baseFare', parseInt(e.target.value) || 0)}
            helperText="Tarif fixe par voyage"
          />
          
          <Input
            label="Tarif par km"
            value={settings.billing.distanceRate.toString()}
            onChange={(e) => updateSettings('billing', 'distanceRate', parseInt(e.target.value) || 0)}
            helperText="Coût supplémentaire par kilomètre"
          />
          
          <Input
            label="Multiplicateur heures de pointe"
            value={settings.billing.peakHourMultiplier.toString()}
            onChange={(e) => updateSettings('billing', 'peakHourMultiplier', parseFloat(e.target.value) || 1)}
            helperText="Coefficient pendant les heures de pointe"
          />
        </div>
        
        <div className="mt-4">
          <Input
            label="Taux de TVA (%)"
            value={settings.billing.taxRate.toString()}
            onChange={(e) => updateSettings('billing', 'taxRate', parseInt(e.target.value) || 0)}
            helperText="Taux de TVA appliqué aux transactions"
          />
        </div>
      </Card>

      {/* Plans d'abonnement */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Text variant="h4" className="text-gray-900 font-semibold">
            Plans d'abonnement
          </Text>
          <Button
            label="Nouveau plan"
            appearance="outline"
            variation="primary"
            size="sm"
            iconName="Plus"
          />
        </div>
        
        <div className="space-y-4">
          {settings.billing.subscriptionPlans.map((plan) => (
            <div key={plan.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Nom du plan"
                    value={plan.name}
                    onChange={(e) => updateSubscriptionPlan(plan.id, 'name', e.target.value)}
                  />
                  
                  <Input
                    label="Durée (jours)"
                    value={plan.duration.toString()}
                    onChange={(e) => updateSubscriptionPlan(plan.id, 'duration', parseInt(e.target.value) || 1)}
                  />
                  
                  <Input
                    label="Prix"
                    value={plan.price.toString()}
                    onChange={(e) => updateSubscriptionPlan(plan.id, 'price', parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="ml-4 flex items-center space-x-2">
                  <Switch
                    checked={plan.isActive}
                    onChange={(checked) => updateSubscriptionPlan(plan.id, 'isActive', checked)}
                  />
                  <Badge variant="outline" color={plan.isActive ? 'success' : 'secondary'}>
                    {plan.isActive ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-3">
                <Text variant="p3" className="text-gray-700 font-medium mb-2">
                  Fonctionnalités incluses:
                </Text>
                <div className="flex flex-wrap gap-2">
                  {plan.features.map((feature, index) => (
                    <Badge key={index} variant="outline" color="primary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-3 text-right">
                <Text variant="p2" className="text-gray-600">
                  Prix final: <span className="font-semibold text-gray-900">{formatCurrency(plan.price)}</span>
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Méthodes de paiement */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Text variant="h4" className="text-gray-900 font-semibold">
            Méthodes de paiement
          </Text>
          <Button
            label="Nouvelle méthode"
            appearance="outline"
            variation="primary"
            size="sm"
            iconName="Plus"
          />
        </div>
        
        <div className="space-y-4">
          {settings.billing.paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-gray-100">
                  {method.type === 'mobile_money' && '📱'}
                  {method.type === 'card' && '💳'}
                  {method.type === 'cash' && '💵'}
                  {method.type === 'bank_transfer' && '🏦'}
                </div>
                
                <div>
                  <Text variant="p2" className="text-gray-900 font-medium">
                    {method.name}
                  </Text>
                  <Text variant="p4" className="text-gray-500">
                    Frais: {method.fees}%
                  </Text>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Input
                  label="Frais (%)"
                  value={method.fees.toString()}
                  onChange={(e) => updatePaymentMethod(method.id, 'fees', parseFloat(e.target.value) || 0)}
                  className="w-24"
                />
                
                <Switch
                  checked={method.isActive}
                  onChange={(checked) => updatePaymentMethod(method.id, 'isActive', checked)}
                />
                
                <Badge variant="outline" color={method.isActive ? 'success' : 'secondary'}>
                  {method.isActive ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default BillingSettings;
