import { FC } from 'react';
import { Text } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { SuccessMessageProps } from '../types';
import { FORGOT_PASSWORD_INSTRUCTIONS } from '../constants';

export const SuccessMessage: FC<SuccessMessageProps> = ({ email, onBackToLogin }) => {
  return (
    <div className="text-center space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="text-sm leading-relaxed mb-4">
          {FORGOT_PASSWORD_INSTRUCTIONS.NEXT_STEPS}
        </Text>
        
        <div className="space-y-3">
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
            {FORGOT_PASSWORD_INSTRUCTIONS.NOT_RECEIVED}
          </Text>
          <button className="text-blue hover:text-blue-dark transition-colors text-xs font-medium hover:underline">
            {FORGOT_PASSWORD_INSTRUCTIONS.RESEND_TEXT}
          </button>
        </div>
      </div>

      <button
        onClick={onBackToLogin}
        className="text-green hover:text-green-dark transition-colors text-sm font-medium hover:underline"
      >
        ← Retour à la connexion
      </button>
    </div>
  );
};
