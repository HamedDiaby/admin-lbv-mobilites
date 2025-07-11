import { FC } from 'react';
import { Text, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { ErrorMessageProps } from '../types';

export const ErrorMessage: FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon name="AlertCircle" size={20} color={ColorsEnum.ERROR} />
        </div>
        <div className="ml-3 flex-1">
          <Text variant="p4" color={ColorsEnum.ERROR} className="text-sm font-medium">
            {message}
          </Text>
        </div>
        <button
          onClick={onDismiss}
          className="flex-shrink-0 ml-3 text-red-400 hover:text-red-600 transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};
