import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordForm } from './hooks';
import { 
  ForgotPasswordHeader, 
  ForgotPasswordForm, 
  ErrorMessage, 
  SuccessMessage, 
  ForgotPasswordLinks 
} from './components';
import { FORGOT_PASSWORD_ROUTES } from './constants';

export const ForgotPassword: FC = () => {
  const navigate = useNavigate();
  
  // Navigation vers la page createPassword après envoi réussi
  const handleNavigateToCreatePassword = () => {
    navigate(FORGOT_PASSWORD_ROUTES.CREATE_PASSWORD);
  };

  const {
    formData,
    errors,
    state,
    handleInputChange,
    handleSubmit,
    clearError,
    resetForm
  } = useForgotPasswordForm(handleNavigateToCreatePassword);

  // Navigation vers la page de connexion
  const handleBackToLogin = () => {
    navigate(FORGOT_PASSWORD_ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-green/20 via-yellow/20 to-blue/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-blue/20 via-green/20 to-yellow/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/20 overflow-hidden">
          {/* En-tête */}
          <div className="p-8 pb-0">
            <ForgotPasswordHeader isSuccess={state.isSuccess} email={state.email} />
          </div>

          {/* Contenu du formulaire */}
          <div className="px-8 pb-8">
            {/* Message d'erreur */}
            {state.error && (
              <ErrorMessage message={state.error} onDismiss={clearError} />
            )}

            {/* Formulaire ou message de succès */}
            {state.isSuccess ? (
              <SuccessMessage 
                email={state.email} 
                onBackToLogin={handleBackToLogin} 
              />
            ) : (
              <div className="space-y-6">
                <ForgotPasswordForm
                  formData={formData}
                  errors={errors}
                  isLoading={state.isLoading}
                  isSuccess={state.isSuccess}
                  onInputChange={handleInputChange}
                  onSubmit={handleSubmit}
                />
                
                <ForgotPasswordLinks isLoading={state.isLoading} />
              </div>
            )}
          </div>
        </div>

        {/* Informations légales */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2025 LBV Mobilités - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};