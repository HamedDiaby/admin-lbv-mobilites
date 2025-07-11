import { FC } from 'react';
import { Text } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { CreatePasswordHeaderProps } from '../types';
import { CREATE_PASSWORD_INSTRUCTIONS } from '../constants';

export const CreatePasswordHeader: FC<CreatePasswordHeaderProps> = ({ isSuccess, email }) => {
  if (isSuccess) {
    return (
      <div className="text-center space-y-4 mb-8">
        <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <Text variant="h2" color={ColorsEnum.TEXT_PRIMARY} className="font-bold text-2xl mb-2">
            {CREATE_PASSWORD_INSTRUCTIONS.SUCCESS_TITLE}
          </Text>
          <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="text-sm leading-relaxed">
            {CREATE_PASSWORD_INSTRUCTIONS.SUCCESS_TEXT}
          </Text>
          {email && (
            <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="text-sm mt-2">
              pour {email}
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
          Créer un mot de passe
        </Text>
        <Text variant="p2" color={ColorsEnum.TEXT_SECONDARY} className="text-sm leading-relaxed max-w-sm mx-auto">
          {CREATE_PASSWORD_INSTRUCTIONS.MAIN_TEXT}
        </Text>
        {email && (
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="text-sm mt-3 font-medium">
            pour {email}
          </Text>
        )}
        <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs mt-2">
          {CREATE_PASSWORD_INSTRUCTIONS.SECURITY_INFO}
        </Text>
      </div>
    </div>
  );
};
