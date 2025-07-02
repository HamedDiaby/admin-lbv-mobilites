import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button, Icon } from '@components';
import { ColorsEnum } from '@utils/enums';

// Page 404 - Page non trouvée
export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Icon name="AlertTriangle" size={64} color={ColorsEnum.WARNING} />
        </div>
        <Text variant="h1" color={ColorsEnum.TEXT_PRIMARY} className="mb-2">404</Text>
        <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="mb-4">Page non trouvée</Text>
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="mb-6 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </Text>
        
        <div className="flex justify-center space-x-4">
          <Button 
            label="Retour à l'accueil"
            appearance="solid"
            variation="primary"
            iconName="Home"
            iconPosition="left"
            onClick={() => navigate('/')}
          />
          
          <Button 
            label="Retour en arrière"
            appearance="outline"
            variation="secondary"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
};
