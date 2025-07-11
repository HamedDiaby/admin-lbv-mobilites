import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePasswordForm } from './hooks';
import { 
  CreatePasswordHeader, 
  CreatePasswordForm, 
  ErrorMessage, 
  SuccessMessage,
  CreatePasswordLinks 
} from './components';
import { CREATE_PASSWORD_ROUTES } from './constants';

export const CreatePassword: FC = () => {
  const navigate = useNavigate();
  
  // Navigation vers la page de connexion après création réussie
  const handleNavigateToLogin = () => {
    navigate(CREATE_PASSWORD_ROUTES.LOGIN);
  };

  const {
    formData,
    errors,
    state,
    passwordCriteria,
    handleInputChange,
    handleSubmit,
    clearError,
    resetForm
  } = useCreatePasswordForm(handleNavigateToLogin);

  // Navigation manuelle vers la page de connexion
  const handleGoToLogin = () => {
    resetForm();
    navigate(CREATE_PASSWORD_ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 flex items-center justify-center p-4">
      {/* Particules d'arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue/20 via-green/20 to-yellow/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-bl from-green/20 via-yellow/20 to-blue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white/70 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/20 overflow-hidden">
          {/* En-tête */}
          <div className="p-8 pb-0">
            <CreatePasswordHeader isSuccess={state.isSuccess} email={state.email} />
          </div>

          {/* Contenu du formulaire */}
          <div className="px-8 pb-8">
            {/* Message d'erreur */}
            {state.error && (
              <ErrorMessage message={state.error} onDismiss={clearError} />
            )}

            {/* Formulaire ou message de succès */}
            {state.isSuccess ? (
              <SuccessMessage email={state.email} onGoToLogin={handleGoToLogin} />
            ) : (
              <>
                <CreatePasswordForm
                  formData={formData}
                  errors={errors}
                  isLoading={state.isLoading}
                  isSuccess={state.isSuccess}
                  onInputChange={handleInputChange}
                  onSubmit={handleSubmit}
                />
                
                {/* Liens de navigation */}
                <CreatePasswordLinks isLoading={state.isLoading} />
              </>
            )}
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 LBV Mobilités - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};