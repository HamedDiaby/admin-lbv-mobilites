import { FC } from "react";
import { Text, Button, Input, Icon, Checkbox } from "@components";
import { ColorsEnum } from "@utils/enums";
import { useController } from "./useController";

export const Login: FC = () => {
  const {
    formData,
    isLoading,
    error,
    handleInputChange,
    handleSubmit,
    clearError
  } = useController();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center p-3 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green/20 to-yellow/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue/20 to-green/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Header avec logo */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green to-yellow rounded-xl blur-sm opacity-75"></div>
              <div className="relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green to-yellow rounded-xl shadow-xl">
                <Icon name="Bus" size={24} color={ColorsEnum.WHITE} />
              </div>
            </div>
          </div>
          <Text variant="h2" color={ColorsEnum.TEXT_PRIMARY} className="font-bold mb-1 text-xl">
            LBV Mobilités
          </Text>
          <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY} className="text-sm">
            Panneau d'administration
          </Text>
        </div>

        {/* Formulaire de connexion */}
        <div className="bg-white/80 backdrop-blur-xl rounded-xl shadow-2xl p-5 border border-white/20 relative">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green/20 via-yellow/20 to-blue/20 rounded-xl blur-sm opacity-50"></div>
          
          <div className="relative z-10">
            <div className="mb-4">
              <Text variant="h3" color={ColorsEnum.TEXT_PRIMARY} className="font-bold mb-1 text-lg">
                Connexion
              </Text>
              <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
                Accédez à votre espace d'administration
              </Text>
            </div>

            {/* Message d'erreur */}
            {error && (
              <div className="mb-4 p-3 bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-lg flex items-start animate-in slide-in-from-top-2 duration-300">
                <div className="p-0.5 bg-red-100 rounded-full">
                  <Icon name="AlertCircle" size={14} color={ColorsEnum.ERROR} />
                </div>
                <Text variant="p4" color={ColorsEnum.ERROR} className="ml-2 flex-1 text-xs">
                  {error}
                </Text>
                <button
                  onClick={clearError}
                  className="ml-2 p-0.5 text-red-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-100"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={isLoading}
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
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    disabled={isLoading}
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
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    disabled={isLoading}
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
                  disabled={isLoading}
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Bouton de connexion */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-green to-green-light hover:from-green-dark hover:to-green text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        <span className="text-sm">Connexion en cours...</span>
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

            {/* Informations de test */}
            <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50/80 to-green-50/80 backdrop-blur-sm border border-yellow-200/50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="p-0.5 bg-yellow-100 rounded-full mr-2">
                  <Icon name="Info" size={14} color={ColorsEnum.TERTIARY} />
                </div>
                <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="font-semibold text-xs">
                  Identifiants de test
                </Text>
              </div>
              <div className="space-y-1 pl-6">
                <div className="flex items-center">
                  <Icon name="Mail" size={12} color={ColorsEnum.TEXT_SECONDARY} className="mr-1.5" />
                  <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="text-xs font-mono">
                    admin@lbv-mobilites.ga
                  </Text>
                </div>
                <div className="flex items-center">
                  <Icon name="Key" size={12} color={ColorsEnum.TEXT_SECONDARY} className="mr-1.5" />
                  <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY} className="text-xs font-mono">
                    admin123
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <Text variant="p4" color={ColorsEnum.TEXT_SECONDARY} className="text-xs">
            © 2025 LBV Mobilités - Tous droits réservés
          </Text>
          <div className="flex justify-center items-center mt-1 space-x-1">
            <div className="w-1.5 h-1.5 bg-green rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-yellow rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-blue rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};