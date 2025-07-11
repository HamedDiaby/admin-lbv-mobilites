import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { LOGIN_ROUTES, APP_CONFIG } from '../constants';

interface LoginLinksProps {
  isLoading?: boolean;
  isLocked?: boolean;
}

export const LoginLinks: FC<LoginLinksProps> = ({ isLoading = false, isLocked = false }) => {
  const linkStyle = {
    pointerEvents: isLoading || isLocked ? ('none' as const) : ('auto' as const),
    opacity: isLoading || isLocked ? 0.5 : 1
  };

  return (
    <div className="mt-4 space-y-3">
      {/* Liens d'aide */}
      <div className="flex items-center justify-center space-x-4 text-xs">
        <Link
          to={LOGIN_ROUTES.FORGOT_PASSWORD}
          className="text-blue hover:text-blue-dark transition-colors hover:underline font-medium"
          style={linkStyle}
        >
          Mot de passe oublié ?
        </Link>
        <span className="text-gray-300">•</span>
        <Link
          to={LOGIN_ROUTES.CREATE_PASSWORD}
          className="text-green hover:text-green-dark transition-colors hover:underline font-medium"
          style={linkStyle}
        >
          Créer un compte
        </Link>
      </div>

      {/* Support */}
      <div className="text-center">
        <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
          Besoin d'aide ? Contactez{' '}
          <a 
            href={`mailto:${APP_CONFIG.SUPPORT_EMAIL}`} 
            className="text-blue hover:text-blue-dark transition-colors hover:underline"
          >
            {APP_CONFIG.SUPPORT_EMAIL}
          </a>
        </Text>
      </div>
    </div>
  );
};
