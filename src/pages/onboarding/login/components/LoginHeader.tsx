import { FC } from 'react';
import { Text, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { APP_CONFIG } from '../constants';

export const LoginHeader: FC = () => {
  return (
    <div className="text-center mb-4">
      <div className="flex items-center justify-center mb-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green to-yellow rounded-xl blur-sm opacity-75"></div>
          <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green to-yellow rounded-xl shadow-xl">
            <Icon name="Bus" size={24} color={ColorsEnum.WHITE} />
          </div>
        </div>
      </div>
      <Text variant="h2" color={ColorsEnum.TEXT_PRIMARY} className="font-bold mb-1 text-xl">
        {APP_CONFIG.NAME}
      </Text>
      <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
        {APP_CONFIG.DESCRIPTION}
      </Text>
    </div>
  );
};
