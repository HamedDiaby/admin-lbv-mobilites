import { FC } from 'react';
import { Text } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { ForgotPasswordHeaderProps } from '../types';
import { FORGOT_PASSWORD_INSTRUCTIONS } from '../constants';

export const ForgotPasswordHeader: FC<ForgotPasswordHeaderProps> = ({ isSuccess, email }) => {
  if (isSuccess) {
    return (
      <div className="text-center space-y-4 mb-8">
        <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <Text variant="h2" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-2xl mb-2">
            {FORGOT_PASSWORD_INSTRUCTIONS.SUCCESS_TITLE}
          </Text>
          <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="text-sm leading-relaxed">
            {FORGOT_PASSWORD_INSTRUCTIONS.SUCCESS_TEXT}
          </Text>
          {email && (
            <Text variant="p2" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold text-sm mt-1">
              {email}
            </Text>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4 mb-8">
      <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-8 h-8 text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2H7v-2H5v-2l3.257-3.257A6 6 0 0115 7z" />
        </svg>
      </div>
      <div>
        <Text variant="h2" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-2xl mb-2">
          Mot de passe oublié ?
        </Text>
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="text-sm leading-relaxed max-w-sm mx-auto">
          {FORGOT_PASSWORD_INSTRUCTIONS.MAIN_TEXT}
        </Text>
      </div>
    </div>
  );
};
