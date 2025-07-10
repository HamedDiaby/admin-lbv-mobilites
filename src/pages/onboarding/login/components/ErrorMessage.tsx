import { FC } from 'react';
import { Text, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';

interface ErrorMessageProps {
  error: string | null;
  onClear: () => void;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ error, onClear }) => {
  if (!error) return null;

  return (
    <div className="mb-4 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-lg flex items-start animate-in slide-in-from-top-2 duration-300">
      <div className="p-0.5 bg-red-100 rounded-full">
        <Icon name="AlertCircle" size={14} color={ColorsEnum.ERROR} />
      </div>
      <Text variant="p4" color={ColorsEnum.ERROR} className="ml-2 flex-1 text-xs">
        {error}
      </Text>
      <button
        onClick={onClear}
        className="ml-2 p-0.5 text-red-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-100"
      >
        <Icon name="X" size={12} />
      </button>
    </div>
  );
};
