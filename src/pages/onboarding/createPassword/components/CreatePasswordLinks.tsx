import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { CreatePasswordLinksProps } from '../types';
import { CREATE_PASSWORD_ROUTES } from '../constants';

export const CreatePasswordLinks: FC<CreatePasswordLinksProps> = ({ isLoading }) => {
  return (
    <div className="text-center space-y-4 pt-6 border-t border-gray-200/50">
      <div className="flex items-center justify-center space-x-2">
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
          Vous avez déjà un compte ?
        </Text>
        <Link
          to={CREATE_PASSWORD_ROUTES.LOGIN}
          className="text-green hover:text-green-dark transition-colors text-xs font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            pointerEvents: isLoading ? 'none' : 'auto',
            opacity: isLoading ? 0.5 : 1 
          }}
        >
          Se connecter
        </Link>
      </div>
      
      <div className="flex items-center justify-center space-x-2">
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
          Mot de passe oublié ?
        </Text>
        <Link
          to={CREATE_PASSWORD_ROUTES.FORGOT_PASSWORD}
          className="text-blue hover:text-blue-dark transition-colors text-xs font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ 
            pointerEvents: isLoading ? 'none' : 'auto',
            opacity: isLoading ? 0.5 : 1 
          }}
        >
          Réinitialiser
        </Link>
      </div>
    </div>
  );
};
