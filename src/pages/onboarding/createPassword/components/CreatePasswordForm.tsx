import { FC } from 'react';
import { Text, Input, Icon } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { CreatePasswordFormProps } from '../types';
import { PasswordStrength } from './PasswordStrength';

export const CreatePasswordForm: FC<CreatePasswordFormProps> = ({
  formData,
  errors,
  isLoading,
  isSuccess,
  onInputChange,
  onSubmit
}) => {
  if (isSuccess) {
    return null; // Le formulaire n'est pas affiché en cas de succès
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Mot de passe */}
      <div className="space-y-2">
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold text-sm">
          Nouveau mot de passe
        </Text>
        <div className="relative group">
          <Input
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => onInputChange('password', e.target.value)}
            disabled={isLoading}
            error={errors.password}
            className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-lg focus:border-green/50 focus:bg-white/70 transition-all duration-300 text-sm placeholder-gray-400"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green transition-colors">
            <Icon name="Lock" size={18} />
          </div>
        </div>
        
        {/* Indicateur de force du mot de passe */}
        {formData.password && (
          <PasswordStrength 
            password={formData.password}
            criteria={{
              minLength: formData.password.length >= 8,
              hasLowercase: /[a-z]/.test(formData.password),
              hasUppercase: /[A-Z]/.test(formData.password),
              hasNumber: /\d/.test(formData.password),
              hasSpecialChar: /[@$!%*?&]/.test(formData.password)
            }}
          />
        )}
      </div>

      {/* Confirmation mot de passe */}
      <div className="space-y-2">
        <Text variant="p4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold text-sm">
          Confirmer le mot de passe
        </Text>
        <div className="relative group">
          <Input
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            disabled={isLoading}
            error={errors.confirmPassword}
            className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200/50 rounded-lg focus:border-green/50 focus:bg-white/70 transition-all duration-300 text-sm placeholder-gray-400"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green transition-colors">
            <Icon name="Lock" size={18} />
          </div>
        </div>
      </div>

      {/* Bouton de création */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full relative group overflow-hidden bg-gradient-to-r from-green to-green-light hover:from-green-dark hover:to-green text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                <span className="text-sm">Création en cours...</span>
              </>
            ) : (
              <>
                <Icon name="Key" size={18} color={ColorsEnum.WHITE} className="mr-3" />
                <span className="text-sm">Créer le mot de passe</span>
              </>
            )}
          </div>
        </button>
      </div>
    </form>
  );
};
