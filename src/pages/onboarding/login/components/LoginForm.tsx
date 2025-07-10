import { FC } from 'react';
import { Text, Input, Icon, Checkbox } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { LoginFormData, LoginFormErrors } from '../types';

interface LoginFormProps {
  formData: LoginFormData;
  errors: LoginFormErrors;
  isLoading: boolean;
  isLocked: boolean;
  onInputChange: (field: keyof LoginFormData, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginForm: FC<LoginFormProps> = ({
  formData,
  errors,
  isLoading,
  isLocked,
  onInputChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Email */}
      <div className="space-y-1">
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold text-xs">
          Adresse email
        </Text>
        <div className="relative group">
          <Input
            type="email"
            placeholder="admin@lbv-mobilites.ga"
            value={formData.email}
            onChange={(e) => onInputChange('email', e.target.value)}
            disabled={isLoading || isLocked}
            error={errors.email}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-lg focus:border-green/50 focus:bg-white/70 transition-all duration-300 text-sm placeholder-gray-400"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green transition-colors">
            <Icon name="Mail" size={16} />
          </div>
        </div>
      </div>

      {/* Mot de passe */}
      <div className="space-y-1">
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold text-xs">
          Mot de passe
        </Text>
        <div className="relative group">
          <Input
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => onInputChange('password', e.target.value)}
            disabled={isLoading || isLocked}
            error={errors.password}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-lg focus:border-green/50 focus:bg-white/70 transition-all duration-300 text-sm placeholder-gray-400"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green transition-colors">
            <Icon name="Lock" size={16} />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center cursor-pointer group">
          <Checkbox
            checked={formData.rememberMe}
            onChange={(e) => onInputChange('rememberMe', e.target.checked)}
            disabled={isLoading || isLocked}
            size="sm"
            className="mr-2"
          />
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs group-hover:text-gray-700 transition-colors">
            Se souvenir de moi
          </Text>
        </label>
        <button
          type="button"
          className="text-xs text-blue hover:text-blue-dark transition-colors hover:underline font-medium"
          disabled={isLoading || isLocked}
        >
          Mot de passe oublié ?
        </button>
      </div>

      {/* Bouton de connexion */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading || isLocked}
          className="w-full relative group overflow-hidden bg-gradient-to-r from-green to-green-light hover:from-green-dark hover:to-green text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                <span className="text-sm">Connexion en cours...</span>
              </>
            ) : isLocked ? (
              <>
                <Icon name="Lock" size={18} color={ColorsEnum.WHITE} className="mr-2" />
                <span className="text-sm">Compte verrouillé</span>
              </>
            ) : (
              <>
                <Icon name="LogIn" size={18} color={ColorsEnum.WHITE} className="mr-2" />
                <span className="text-sm">Se connecter</span>
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
};
