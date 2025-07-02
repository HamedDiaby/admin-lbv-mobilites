import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Text, Icon, Card } from '@components';
import { ColorsEnum } from '@utils/enums';

// Layout pour les pages d'authentification
export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Icon name="Bus" size={40} color={ColorsEnum.PRIMARY} />
          </div>
          <Text variant="h2" color={ColorsEnum.PRIMARY}>LBV Mobilités</Text>
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="mt-2">
            Administration des services de mobilité urbaine
          </Text>
        </div>
        
        <Card elevation="md" padding="lg" rounded="lg">
          <Outlet />
        </Card>
        
        <div className="text-center mt-6">
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY}>
            © {new Date().getFullYear()} LBV Mobilités. Tous droits réservés.
          </Text>
          <div className="flex justify-center mt-2 space-x-4">
            <Link to="/" className="text-primary hover:underline text-sm">
              Conditions d'utilisation
            </Link>
            <Link to="/" className="text-primary hover:underline text-sm">
              Confidentialité
            </Link>
            <Link to="/" className="text-primary hover:underline text-sm">
              Aide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
