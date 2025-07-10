import React from 'react';
import { Card, Text, Button, Input, Select } from '../../../../components';
import { ColorsEnum } from '../../../../utils/enums';
import { UserFilters } from '../types';
import { filterStatusOptions, filterRoleOptions, filterDepartmentOptions } from '../constants';

interface UserFiltersComponentProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
  onReset: () => void;
}

export const UserFiltersComponent: React.FC<UserFiltersComponentProps> = ({
  filters,
  onFiltersChange,
  onReset
}) => {
  const handleFilterChange = (field: keyof UserFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value
    });
  };

  const hasActiveFilters = 
    filters.status !== 'tous' ||
    filters.role !== 'tous' ||
    filters.department !== 'tous' ||
    filters.searchTerm !== '';

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <Text variant="h4" color={ColorsEnum.TEXT_PRIMARY} className="font-semibold">
            Filtres
          </Text>
          {hasActiveFilters && (
            <Button
              color={ColorsEnum.GRAY_500}
              size="sm"
              onClick={onReset}
            >
              Réinitialiser
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Recherche */}
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Rechercher
            </Text>
            <Input
              placeholder="Nom, email, rôle..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            />
          </div>

          {/* Statut */}
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Statut
            </Text>
            <Select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              options={filterStatusOptions}
            />
          </div>

          {/* Rôle */}
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Rôle
            </Text>
            <Select
              value={filters.role}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              options={filterRoleOptions}
            />
          </div>

          {/* Département */}
          <div className="space-y-2">
            <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
              Département
            </Text>
            <Select
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              options={filterDepartmentOptions}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
