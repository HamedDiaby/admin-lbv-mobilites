import { FC } from "react";
import { Text, Button } from "@components";
import { ColorsEnum } from "@utils/enums";
import { City } from "../types";

interface StationFiltersProps {
  selectedCity: string;
  selectedType: string;
  selectedStatus: string;
  cities: City[];
  onCityChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onResetFilters: () => void;
}

export const StationFilters: FC<StationFiltersProps> = ({
  selectedCity,
  selectedType,
  selectedStatus,
  cities,
  onCityChange,
  onTypeChange,
  onStatusChange,
  onResetFilters
}) => {
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
          onClick={onResetFilters}
          iconName="X"
        >
          Réinitialiser
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Filtre par ville */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ville
          </label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Toutes les villes</option>
            {cities.map(city => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre par type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les types</option>
            <option value="terminal">Terminal</option>
            <option value="arret">Arrêt</option>
            <option value="depot">Dépôt</option>
          </select>
        </div>

        {/* Filtre par statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>
    </div>
  );
};
