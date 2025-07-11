import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { ForgotPasswordLinksProps } from '../types';
import { FORGOT_PASSWORD_ROUTES } from '../constants';

export const ForgotPasswordLinks: FC<ForgotPasswordLinksProps> = ({ isLoading }) => {
  return (
    <div className="text-center space-y-4 pt-6 border-t border-gray-200/50">
      <div className="space-y-3">
        <Link
          to={FORGOT_PASSWORD_ROUTES.LOGIN}
          className="inline-flex items-center text-green hover:text-green-dark transition-colors text-sm font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            pointerEvents: isLoading ? 'none' : 'auto',
            opacity: isLoading ? 0.5 : 1 
          }}
        >
          ← Retour à la connexion
        </Link>
      </div>
      
      <div className="flex items-center justify-center space-x-2">
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
          Pas encore de compte ?
        </Text>
        <Link
          to={FORGOT_PASSWORD_ROUTES.CREATE_PASSWORD}
          className="text-blue hover:text-blue-dark transition-colors text-xs font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            pointerEvents: isLoading ? 'none' : 'auto',
            opacity: isLoading ? 0.5 : 1 
          }}
        >
          Créer un compte
        </Link>
      </div>
    </div>
  );
};
