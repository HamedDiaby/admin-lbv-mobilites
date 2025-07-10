import { FC } from "react";
import { Input } from "../../../../components/input";
import { Select } from "../../../../components/select";
import { Button } from "../../../../components/button";
import { Text } from "../../../../components/text";
import { ColorsEnum } from "../../../../utils/enums";
import { AbonnementFilters } from "../types";
import { typeAbonnementOptions, statutAbonnementOptions } from "../constants";

interface AbonnementFiltersProps {
  filters: AbonnementFilters;
  onFiltersChange: (filters: AbonnementFilters) => void;
  onReset: () => void;
}

export const AbonnementFiltersComponent: FC<AbonnementFiltersProps> = ({
  filters,
  onFiltersChange,
  onReset
}) => {
  const handleFilterChange = (key: keyof AbonnementFilters, value: string | number) => {
    onFiltersChange({
      ...filters,
      [key]: value
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
        {/* Filtre par statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <Select
            value={filters.statut}
            onChange={(e) => handleFilterChange('statut', e.target.value)}
            options={statutAbonnementOptions}
          />
        </div>

        {/* Filtre par type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d'abonnement
          </label>
          <Select
            value={filters.typeAbonnement}
            onChange={(e) => handleFilterChange('typeAbonnement', e.target.value)}
            options={typeAbonnementOptions}
          />
        </div>

        {/* Prix minimum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix minimum (FCFA)
          </label>
          <Input
            value={filters.prixMin.toString()}
            onChange={(e) => handleFilterChange('prixMin', parseInt(e.target.value) || 0)}
            placeholder="0"
          />
        </div>

        {/* Prix maximum */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix maximum (FCFA)
          </label>
          <Input
            value={filters.prixMax.toString()}
            onChange={(e) => handleFilterChange('prixMax', parseInt(e.target.value) || 1000000)}
            placeholder="1000000"
          />
        </div>
      </div>
    </div>
  );
};
