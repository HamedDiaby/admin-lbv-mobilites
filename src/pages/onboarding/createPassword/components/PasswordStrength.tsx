import { FC } from 'react';
import { Text } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { PasswordStrengthProps } from '../types';

export const PasswordStrength: FC<PasswordStrengthProps> = ({ password, criteria }) => {
  if (!password) return null;

  const criteriaList = [
    { key: 'minLength', label: 'Au moins 8 caractères', met: criteria.minLength },
    { key: 'hasLowercase', label: 'Une lettre minuscule', met: criteria.hasLowercase },
    { key: 'hasUppercase', label: 'Une lettre majuscule', met: criteria.hasUppercase },
    { key: 'hasNumber', label: 'Un chiffre', met: criteria.hasNumber },
    { key: 'hasSpecialChar', label: 'Un caractère spécial', met: criteria.hasSpecialChar }
  ];

  const metCriteria = criteriaList.filter(c => c.met).length;
  const strength = metCriteria / criteriaList.length;
  
  let strengthColor = 'bg-red-500';
  let strengthText = 'Faible';
  
  if (strength >= 0.8) {
    strengthColor = 'bg-green-500';
    strengthText = 'Fort';
  } else if (strength >= 0.6) {
    strengthColor = 'bg-yellow-500';
    strengthText = 'Moyen';
  } else if (strength >= 0.4) {
    strengthColor = 'bg-orange-500';
    strengthText = 'Faible';
  }

  return (
    <div className="mt-3 space-y-3">
      {/* Barre de force du mot de passe */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
            Force du mot de passe
          </Text>
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs font-medium">
            {strengthText}
          </Text>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${strengthColor}`}
            style={{ width: `${strength * 100}%` }}
          />
        </div>
      </div>

      {/* Liste des critères */}
      <div className="space-y-1">
        {criteriaList.map((criterion) => (
          <div key={criterion.key} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${criterion.met ? 'bg-green-100' : 'bg-gray-100'}`}>
              {criterion.met ? (
                <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-2 h-2 rounded-full bg-gray-400" />
              )}
            </div>
            <Text 
              variant="p4" 
              color={criterion.met ? ColorsEnum.SUCCESS : ColorsEnum.TEXT_SECONDARY} 
              className="text-xs"
            >
              {criterion.label}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};
