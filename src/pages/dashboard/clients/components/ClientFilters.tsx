import { FC } from "react";
import { Input } from "../../../../components/input";
import { Select } from "../../../../components/select";
import { Button } from "../../../../components/button";
import { Text } from "../../../../components/text";
import { Icon } from "../../../../components/icon";
import { ColorsEnum } from "../../../../utils/enums";
import { FiltresClients } from "../types";

interface ClientFiltersProps {
  filtres: FiltresClients;
  onFiltresChange: (filtres: FiltresClients) => void;
  onReset: () => void;
}

export const ClientFilters: FC<ClientFiltersProps> = ({
  filtres,
  onFiltresChange,
  onReset
}) => {
  const handleFiltreChange = (key: keyof FiltresClients, value: string) => {
    onFiltresChange({
      ...filtres,
      [key]: value || undefined
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
          Filtres
        </Text>
        <Button
          appearance="outline"
          variation="secondary"
          size="sm"
          onClick={onReset}
          iconName="X"
        >
          Réinitialiser
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Recherche par nom */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recherche
          </label>
          <Input
            placeholder="Nom, prénom, email..."
            value={filtres.nom || ''}
            onChange={(e) => handleFiltreChange('nom', e.target.value)}
          />
        </div>

        {/* Filtre par statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <Select
            value={filtres.statut || ''}
            onChange={(e) => handleFiltreChange('statut', e.target.value)}
            options={[
              { value: '', label: 'Tous les statuts' },
              { value: 'Actif', label: 'Actif' },
              { value: 'Inactif', label: 'Inactif' },
              { value: 'Suspendu', label: 'Suspendu' }
            ]}
          />
        </div>

        {/* Filtre par ville */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ville
          </label>
          <Input
            placeholder="Ville..."
            value={filtres.ville || ''}
            onChange={(e) => handleFiltreChange('ville', e.target.value)}
          />
        </div>

        {/* Filtre par type d'abonnement */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d'abonnement
          </label>
          <Select
            value={filtres.typeAbonnement || ''}
            onChange={(e) => handleFiltreChange('typeAbonnement', e.target.value)}
            options={[
              { value: '', label: 'Tous les types' },
              { value: 'Étudiant', label: 'Étudiant' },
              { value: 'Mensuel Standard', label: 'Mensuel Standard' },
              { value: 'Hebdomadaire', label: 'Hebdomadaire' },
              { value: 'Premium Annuel', label: 'Premium Annuel' }
            ]}
          />
        </div>
      </div>
    </div>
  );
};
