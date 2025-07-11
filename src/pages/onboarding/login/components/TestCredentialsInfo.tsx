import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Text, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { TEST_CREDENTIALS, LOGIN_ROUTES } from '../constants';

export const TestCredentialsInfo: FC = () => {
  const primaryCredentials = TEST_CREDENTIALS[0]; // Prendre les premiers identifiants (admin)

  return (
    <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50/80 to-green-50/80 backdrop-blur-sm border border-yellow-200/50 rounded-lg">
      <div className="flex items-center mb-2">
        <div className="p-0.5 bg-yellow-100 rounded-full mr-2">
          <Icon name="Info" size={14} color={ColorsEnum.TERTIARY} />
        </div>
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-semibold text-xs">
          Identifiants de test
        </Text>
      </div>
      <div className="space-y-1 pl-6">
        <div className="flex items-center">
          <Icon name="Mail" size={12} color={ColorsEnum.TEXT_SECONDARY} className="mr-1.5" />
          <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="text-xs font-mono">
            {primaryCredentials.email}
          </Text>
        </div>
        <div className="flex items-center">
          <Icon name="Key" size={12} color={ColorsEnum.TEXT_SECONDARY} className="mr-1.5" />
          <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="text-xs font-mono">
            {primaryCredentials.password}
          </Text>
        </div>
        <div className="flex items-center">
          <Icon name="Shield" size={12} color={ColorsEnum.TEXT_SECONDARY} className="mr-1.5" />
          <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
            {primaryCredentials.description}
          </Text>
        </div>
      </div>
      
      {/* Lien vers création de compte */}
      <div className="mt-3 pt-2 border-t border-yellow-200/30">
        <div className="flex items-center justify-between">
          <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
            Pas encore de compte ?
          </Text>
          <Link
            to={LOGIN_ROUTES.CREATE_PASSWORD}
            className="text-xs text-green hover:text-green-dark transition-colors hover:underline font-medium"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
};
