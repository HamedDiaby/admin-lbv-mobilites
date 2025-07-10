import { FC } from "react";
import { Text } from "@components";
import { ColorsEnum } from "@utils/enums";
import { useLoginForm } from "./hooks/useLoginForm";
import {
  LoginHeader,
  LoginBackground,
  ErrorMessage,
  LoginForm,
  TestCredentialsInfo,
  LoginFooter
} from "./components";

const Login: FC = () => {
  // Hook personnalisé pour la gestion du formulaire de connexion
  const {
    formData,
    errors,
    isLoading,
    isLocked,
    lockoutTimeRemaining,
    error,
    handleInputChange,
    handleSubmit,
    clearError
  } = useLoginForm();

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center p-3 relative overflow-hidden">
      {/* Background decoration */}
      <LoginBackground />

      <div className="relative z-10 w-full max-w-sm">
        {/* Header avec logo */}
        <LoginHeader />

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
            <ErrorMessage error={error} onClear={clearError} />

            {/* Affichage du temps de verrouillage restant */}
            {isLocked && lockoutTimeRemaining > 0 && (
              <div className="mb-4 p-3 bg-orange-50/80 backdrop-blur-sm border border-orange-200/50 rounded-lg">
                <Text variant="p4" color={ColorsEnum.WARNING} className="text-xs text-center">
                  Compte temporairement verrouillé. 
                  Réessayez dans {Math.ceil(lockoutTimeRemaining / (1000 * 60))} minute(s).
                </Text>
              </div>
            )}

            {/* Formulaire */}
            <LoginForm
              formData={formData}
              errors={errors}
              isLoading={isLoading}
              isLocked={isLocked}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />

            {/* Informations de test */}
            <TestCredentialsInfo />
          </div>
        </div>

        {/* Footer */}
        <LoginFooter />
      </div>
    </div>
  );
};

export { Login };
export default Login;