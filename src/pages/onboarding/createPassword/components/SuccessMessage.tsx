import { FC } from 'react';
import { Text } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { SuccessMessageProps } from '../types';
import { CREATE_PASSWORD_SUCCESS_MESSAGES } from '../constants';

export const SuccessMessage: FC<SuccessMessageProps> = ({ email, onGoToLogin }) => {
  return (
    <div className="text-center space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <Text variant="p2" color={ColorsEnum.SUCCESS} className="text-sm leading-relaxed mb-4 font-medium">
          {CREATE_PASSWORD_SUCCESS_MESSAGES.PASSWORD_UPDATED}
        </Text>
        
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs mb-4">
          {CREATE_PASSWORD_SUCCESS_MESSAGES.LOGIN_REDIRECT}
        </Text>
        
        <button
          onClick={onGoToLogin}
          className="bg-gradient-to-r from-green to-green-light hover:from-green-dark hover:to-green text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm"
        >
          Se connecter maintenant
        </button>
      </div>
    </div>
  );
};
