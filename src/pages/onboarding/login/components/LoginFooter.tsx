import { FC } from 'react';
import { Text } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { APP_CONFIG } from '../constants';

export const LoginFooter: FC = () => {
  return (
    <div className="text-center mt-4">
      <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
        {APP_CONFIG.COPYRIGHT}
      </Text>
      <div className="flex justify-center items-center mt-1 space-x-1">
        <div className="w-1.5 h-1.5 bg-green rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-yellow rounded-full"></div>
        <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
      </div>
    </div>
  );
};
