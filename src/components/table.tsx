import { FC, ReactNode, useState, useEffect, ChangeEvent, useMemo } from "react";
import { Card, CardProps } from "./card";
import { Text } from "./text";
import { ColorsEnum } from "../utils/enums";
import { Button } from "./button";
import { Icon } from "./icon";
import { Input } from "./input";
import * as LucideIcons from "lucide-react";

// Type pour les directions de tri
export type SortDirection = "asc" | "desc" | null;

// Interface pour définir la structure des colonnes
export interface TableColumn<T = any> {
  // Clé unique pour identifier la colonne
  key: string;
  // Titre de la colonne
  title: ReactNode;
  // Fonction de rendu personnalisé pour la cellule (optionnel)
  render?: (value: any, record: T, index: number) => ReactNode;
  // Alignement du contenu
  align?: "left" | "center" | "right";
  // Largeur fixe ou en pourcentage
  width?: string | number;
  // Si la colonne est fixe à gauche ou à droite
  fixed?: "left" | "right";
  // Si la colonne est triable
  sortable?: boolean;
  // Si la colonne peut être masquée
  hideable?: boolean;
  // Si la colonne est masquée par défaut
  hidden?: boolean;
  // Si la colonne est filtrable
  filterable?: boolean;
  // Fonction de comparaison personnalisée pour le tri
  sorter?: (a: T, b: T) => number;
}

// Interface pour une action sur une ligne
export interface TableAction<T = any> {
  // Texte du bouton/tooltip
  label: string;
  // Fonction à appeler lors du clic
  onClick: (record: T, index: number) => void;
  // Nom de l'icône
  icon: keyof typeof LucideIcons;
  // Couleur de l'icône/bouton
  color?: ColorsEnum | string;
  // Si l'action est désactivée
  disabled?: boolean | ((record: T) => boolean);
  // Condition d'affichage (optionnel)
  visible?: boolean | ((record: T) => boolean);
  // Type d'action (influencera l'apparence)
  type?: "default" | "primary" | "success" | "warning" | "danger" | "link";
  // Taille de l'icône/bouton
  size?: "sm" | "md" | "lg";
}

// Interface pour l'état de tri actuel
interface SortState {
  key: string;
  direction: SortDirection;
}

// Interface pour les props du composant Table
export interface TableProps<T = any> extends Omit<CardProps, 'children'> {
  // Données à afficher
  dataSource: T[];
  // Définition des colonnes
  columns: TableColumn<T>[];
  // Actions pour chaque ligne (apparaîtront à la fin)
  actions?: TableAction<T>[];
  // Clé unique pour chaque ligne (fonction ou nom de propriété)
  rowKey?: string | ((record: T) => string);
  // Si le tableau a un style compact
  compact?: boolean;
  // Si les lignes sont rayées
  striped?: boolean;
  // Si le tableau doit avoir des bordures
  bordered?: boolean;
  // Si la première colonne est épinglée
  stickyHeader?: boolean;
  // Si le tableau est en état de chargement
  loading?: boolean;
  // Padding interne du tableau
  tablePadding?: "none" | "sm" | "md" | "lg";
  // Message à afficher quand il n'y a pas de données
  emptyText?: ReactNode;
  // Classes CSS pour les en-têtes
  headerClassName?: string;
  // Classes CSS pour les cellules
  cellClassName?: string;
  // Classes CSS pour les lignes
  rowClassName?: string | ((record: T, index: number) => string);
  // Fonction appelée lorsqu'une ligne est cliquée
  onRowClick?: (record: T, index: number) => void;
  // Fonction de rendu personnalisé pour chaque ligne (avancé)
  renderRow?: (record: T, index: number) => ReactNode;
  // Si le tableau est en lecture seule (pas de survol/interaction)
  readOnly?: boolean;
  // Si la recherche est activée (true par défaut)
  searchable?: boolean;
  // Placeholder pour la barre de recherche
  searchPlaceholder?: string;
  // Callback lorsque la recherche change
  onSearch?: (value: string) => void;
  // Si le tri est activé pour toutes les colonnes
  sortable?: boolean;
  // Callback quand l'ordre de tri change
  onSort?: (sortKey: string, direction: SortDirection) => void;
  // Tri initial
  defaultSortKey?: string;
  // Direction de tri initiale
  defaultSortDirection?: SortDirection;
  // Si la table gère la pagination
  pagination?: boolean;
  // Nombre d'éléments par page
  pageSize?: number;
  // Page actuelle
  currentPage?: number;
  // Callback quand la page change
  onPageChange?: (page: number) => void;
  // Nombre total d'éléments (pour la pagination externe)
  totalItems?: number;
}

export const Table: FC<TableProps> = ({
  dataSource = [],
  columns = [],
  actions = [],
  rowKey = "id",
  compact = false,
  striped = true,
  bordered = true,
  stickyHeader = false,
  loading = false,
  emptyText = "Aucune donnée",
  headerClassName = "",
  cellClassName = "",
  rowClassName = "",
  onRowClick,
  renderRow,
  readOnly = false,
  searchable = true,
  searchPlaceholder = "Rechercher...",
  onSearch,
  sortable = true,
  onSort,
  defaultSortKey,
  defaultSortDirection = null,
  pagination = false,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  totalItems,
  tablePadding = "md",
  // Props du Card
  title,
  subtitle,
  rightContent,
  elevation = "sm",
  border = true,
  rounded = "md",
  padding = "none",
  bgColor = "#FFFFFF",
  borderColor,
  ...rest
}) => {
  // État pour la recherche
  const [searchValue, setSearchValue] = useState<string>('');
  
  // État pour le tri
  const [sortState, setSortState] = useState<SortState>(() => ({
    key: defaultSortKey || '',
    direction: defaultSortDirection,
  }));

  // État pour la pagination
  const [localCurrentPage, setLocalCurrentPage] = useState<number>(currentPage);

  // Gère le changement de la valeur de recherche
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    
    if (onSearch) {
      onSearch(value);
    }
  };

  // Gère le changement de tri
  const handleSort = (key: string) => {
    const newDirection: SortDirection = 
      sortState.key === key
        ? sortState.direction === "asc"
          ? "desc"
          : sortState.direction === "desc"
            ? null
            : "asc"
        : "asc";

    setSortState({
      key,
      direction: newDirection,
    });
    
    if (onSort) {
      onSort(key, newDirection);
    }
  };

  // Gère le changement de page
  const handlePageChange = (page: number) => {
    setLocalCurrentPage(page);
    
    if (onPageChange) {
      onPageChange(page);
    }
  };

  // Filtre les données en fonction de la recherche
  const filteredData = useMemo(() => {
    if (!searchValue.trim() || onSearch) {
      return dataSource;
    }

    const searchLower = searchValue.toLowerCase();
    
    return dataSource.filter(record => {
      return columns.some(column => {
        const value = record[column.key];
        if (value === undefined || value === null) return false;
        
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [dataSource, searchValue, columns, onSearch]);

  // Trie les données
  const sortedData = useMemo(() => {
    if (!sortState.key || !sortState.direction || onSort) {
      return filteredData;
    }

    const column = columns.find(col => col.key === sortState.key);
    
    if (!column) return filteredData;
    
    const sorted = [...filteredData].sort((a, b) => {
      if (column.sorter) {
        return sortState.direction === "asc" 
          ? column.sorter(a, b) 
          : column.sorter(b, a);
      }
      
      const valueA = a[column.key];
      const valueB = b[column.key];
      
      if (valueA === valueB) return 0;
      if (valueA === undefined || valueA === null) return sortState.direction === "asc" ? -1 : 1;
      if (valueB === undefined || valueB === null) return sortState.direction === "asc" ? 1 : -1;
      
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortState.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      return sortState.direction === "asc" 
        ? valueA > valueB ? 1 : -1
        : valueA < valueB ? 1 : -1;
    });
    
    return sorted;
  }, [filteredData, sortState, columns, onSort]);

  // Données paginées
  const paginatedData = useMemo(() => {
    if (!pagination || onPageChange) {
      return sortedData;
    }

    const startIndex = (localCurrentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, pagination, localCurrentPage, pageSize, onPageChange]);
  
  // Nombre total de pages
  const totalPages = useMemo(() => {
    const total = totalItems || sortedData.length;
    return Math.ceil(total / pageSize);
  }, [totalItems, sortedData.length, pageSize]);

  // Réinitialise la page si les données changent
  useEffect(() => {
    if (pagination && !onPageChange && localCurrentPage > 1 && paginatedData.length === 0 && sortedData.length > 0) {
      setLocalCurrentPage(1);
    }
  }, [sortedData, pagination, localCurrentPage, paginatedData, onPageChange]);

  // Fonction pour obtenir la clé unique de chaque ligne
  const getRowKey = (record: any, index: number): string => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    return record[rowKey]?.toString() || index.toString();
  };

  // Fonction pour obtenir la valeur d'une cellule
  const getCellValue = (record: any, column: TableColumn, index: number) => {
    const value = record[column.key];
    
    if (column.render) {
      return column.render(value, record, index);
    }
    
    if (value === undefined || value === null) {
      return "-";
    }
    
    return value;
  };

  // Fonction pour vérifier si une action est visible
  const isActionVisible = (action: TableAction, record: any): boolean => {
    if (typeof action.visible === "function") {
      return action.visible(record);
    }
    return action.visible !== false;
  };

  // Fonction pour vérifier si une action est désactivée
  const isActionDisabled = (action: TableAction, record: any): boolean => {
    if (typeof action.disabled === "function") {
      return action.disabled(record);
    }
    return action.disabled === true;
  };

  // Fonction pour obtenir les classes d'une ligne
  const getRowClasses = (record: any, index: number): string => {
    const baseClasses = [
      "transition-colors duration-150",
      !readOnly && onRowClick ? "cursor-pointer hover:bg-background-light" : "",
      striped && index % 2 === 1 ? "bg-gray-50" : "",
      bordered ? "border-b border-border" : "",
      compact ? "py-1.5" : "py-2.5",
    ].filter(Boolean).join(" ");
    
    if (typeof rowClassName === "function") {
      return `${baseClasses} ${rowClassName(record, index)}`;
    }
    
    return `${baseClasses} ${rowClassName}`;
  };

  // Fonction pour gérer le clic sur une ligne
  const handleRowClick = (record: any, index: number) => {
    if (!readOnly && onRowClick) {
      onRowClick(record, index);
    }
  };

  // Rendu du tableau vide
  const renderEmptyState = () => {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-4 text-text-secondary">
        <Icon name="FileX" size={40} color={ColorsEnum.TEXT_SECONDARY} className="mb-3 opacity-70" />
        <Text variant="p3" align="center" className="max-w-md">
          {searchValue ? "Aucun résultat ne correspond à votre recherche" : emptyText}
        </Text>
        {searchValue && (
          <Button 
            label="Effacer la recherche" 
            appearance="outline" 
            variation="secondary" 
            size="sm" 
            className="mt-3"
            iconName="X"
            onClick={() => setSearchValue('')}
          />
        )}
      </div>
    );
  };

  // Rendu de l'état de chargement
  const renderLoadingState = () => {
    return (
      <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10 backdrop-blur-[1px]">
        <div className="flex flex-col items-center bg-white/90 p-4 rounded-lg shadow-sm">
          <Icon name="Loader" size={28} className="animate-spin" color={ColorsEnum.PRIMARY} />
          <Text variant="p4" className="mt-2.5 font-medium text-primary">
            Chargement...
          </Text>
        </div>
      </div>
    );
  };
  
  // Rendu de l'icône de tri
  const renderSortIcon = (column: TableColumn) => {
    if (!sortable || !column.sortable) return null;
    
    const isSorted = sortState.key === column.key;
    const direction = isSorted ? sortState.direction : null;
    
    let iconName: keyof typeof LucideIcons = "ArrowUpDown";
    let iconColor = ColorsEnum.TEXT_SECONDARY;
    
    if (isSorted) {
      if (direction === "asc") {
        iconName = "ArrowUp";
        iconColor = ColorsEnum.PRIMARY;
      } else if (direction === "desc") {
        iconName = "ArrowDown";
        iconColor = ColorsEnum.PRIMARY;
      }
    }
    
    return (
      <Icon 
        name={iconName}
        size={16} 
        color={iconColor}
        className="ml-1 inline-block transition-all duration-200"
      />
    );
  };
  
  // Rendu de la pagination
  const renderPagination = () => {
    if (!pagination || totalPages <= 1) return null;
    
    const renderPageButton = (page: number, label?: ReactNode) => (
      <button
        key={`page-${page}`}
        className={`
          inline-flex items-center justify-center min-w-8 h-8 px-2
          text-sm rounded-md transition-colors
          ${localCurrentPage === page 
            ? "bg-primary text-white font-medium" 
            : "bg-background-light hover:bg-background-accent text-text-secondary"}
        `}
        onClick={() => handlePageChange(page)}
        disabled={page === localCurrentPage}
      >
        {label || page}
      </button>
    );
    
    let pages = [];
    
    // Toujours afficher la première page
    if (localCurrentPage > 3) {
      pages.push(renderPageButton(1));
    }
    
    // Afficher des points de suspension si nécessaire
    if (localCurrentPage > 4) {
      pages.push(
        <span key="ellipsis-start" className="px-1">...</span>
      );
    }
    
    // Afficher les pages autour de la page actuelle
    for (let i = Math.max(1, localCurrentPage - 2); i <= Math.min(totalPages, localCurrentPage + 2); i++) {
      pages.push(renderPageButton(i));
    }
    
    // Afficher des points de suspension si nécessaire
    if (localCurrentPage < totalPages - 3) {
      pages.push(
        <span key="ellipsis-end" className="px-1">...</span>
      );
    }
    
    // Toujours afficher la dernière page
    if (localCurrentPage < totalPages - 2) {
      pages.push(renderPageButton(totalPages));
    }
    
    return (
      <div className="flex items-center justify-between py-4 px-4 border-t border-border">
        <div>
          <Text variant="p5" color={ColorsEnum.TEXT_SECONDARY}>
            {`${Math.min((localCurrentPage - 1) * pageSize + 1, totalItems || sortedData.length)} - ${Math.min(localCurrentPage * pageSize, totalItems || sortedData.length)} sur ${totalItems || sortedData.length}`}
          </Text>
        </div>
        
        <div className="flex items-center space-x-1">
          <button
            className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-background-light hover:bg-background-accent transition-colors disabled:opacity-50"
            onClick={() => handlePageChange(localCurrentPage - 1)}
            disabled={localCurrentPage <= 1}
          >
            <Icon name="ChevronLeft" size={16} color={ColorsEnum.TEXT_SECONDARY} />
          </button>
          
          <div className="flex items-center space-x-1">
            {pages}
          </div>
          
          <button
            className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-background-light hover:bg-background-accent transition-colors disabled:opacity-50"
            onClick={() => handlePageChange(localCurrentPage + 1)}
            disabled={localCurrentPage >= totalPages}
          >
            <Icon name="ChevronRight" size={16} color={ColorsEnum.TEXT_SECONDARY} />
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <Card
      title={title}
      subtitle={subtitle}
      rightContent={rightContent}
      elevation={elevation}
      border={border}
      rounded={rounded}
      padding={padding}
      bgColor={bgColor}
      borderColor={borderColor}
      className="overflow-hidden relative p-4"
      {...rest}
    >
      <div className={`relative overflow-x-auto rounded-b-md`}>
        {/* État de chargement */}
        {loading && renderLoadingState()}
        
        {/* Barre de recherche au-dessus du tableau */}
        {searchable && (
          <div className="flex mb-3">
            <div className="w-full md:w-60 lg:w-72">
              <Input 
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleSearchChange(e as ChangeEvent<HTMLInputElement>)}
                iconName="Search"
                iconPosition="left"
                fullWidth
              />
            </div>
          </div>
        )}

        <table className="w-full min-w-full border-collapse bg-white">
          {/* En-tête du tableau */}
          <thead className={`bg-background ${stickyHeader ? "sticky top-0 z-10" : ""}`}>
            <tr className={`${bordered ? "border-b border-border" : ""}`}>
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
                  className={`
                    ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"}
                    ${compact ? "px-3 py-2" : "px-4 py-3.5"}
                    font-medium text-text-secondary text-sm
                    ${sortable && column.sortable ? "cursor-pointer hover:bg-background-light" : ""}
                    ${headerClassName}
                  `}
                  onClick={() => {
                    if (sortable && column.sortable) handleSort(column.key);
                  }}
                  style={{
                    width: column.width,
                    position: column.fixed ? "sticky" : undefined,
                    left: column.fixed === "left" ? 0 : undefined,
                    right: column.fixed === "right" ? 0 : undefined,
                  }}
                >
                  <div className={`flex items-center ${column.align === "center" ? "justify-center" : column.align === "right" ? "justify-end" : "justify-start"}`}>
                    <span>{column.title}</span>
                    {sortable && column.sortable && renderSortIcon(column)}
                  </div>
                </th>
              ))}

              {/* Colonne pour les actions si présentes */}
              {actions.length > 0 && (
                <th
                  className={`
                    text-right
                    ${compact ? "px-3 py-2" : "px-4 py-3.5"}
                    font-medium text-text-secondary text-sm
                    ${headerClassName}
                  `}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Corps du tableau */}
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                  className="border-b border-border"
                >
                  {renderEmptyState()}
                </td>
              </tr>
            ) : (
              paginatedData.map((record, rowIndex) => {
                // Si un rendu personnalisé de ligne est fourni
                if (renderRow) {
                  return renderRow(record, rowIndex);
                }

                return (
                  <tr
                    key={getRowKey(record, rowIndex)}
                    className={getRowClasses(record, rowIndex)}
                    onClick={() => handleRowClick(record, rowIndex)}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={`${getRowKey(record, rowIndex)}-${column.key || colIndex}`}
                        className={`
                          ${column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : "text-left"}
                          ${compact ? "px-3 py-1.5" : "px-4 py-2"}
                          ${cellClassName}
                        `}
                        style={{
                          position: column.fixed ? "sticky" : undefined,
                          left: column.fixed === "left" ? 0 : undefined,
                          right: column.fixed === "right" ? 0 : undefined,
                          backgroundColor: column.fixed ? bgColor : undefined,
                        }}
                      >
                        {getCellValue(record, column, rowIndex)}
                      </td>
                    ))}

                    {/* Cellule pour les actions si présentes */}
                    {actions.length > 0 && (
                      <td
                        className={`
                          text-right
                          ${compact ? "px-3 py-1.5" : "px-4 py-2"}
                          ${cellClassName}
                        `}
                      >
                        <div className="flex justify-end items-center space-x-1.5">
                          {actions
                            .filter(action => isActionVisible(action, record))
                            .map((action, actionIndex) => {
                              const disabled = isActionDisabled(action, record);
                              
                              // Utilisation d'icônes simples pour les actions
                              if (action.type === "link" || action.size === "sm") {
                                return (
                                  <button
                                    key={actionIndex}
                                    type="button"
                                    className={`p-1.5 rounded-full transition-colors ${
                                      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-background-light"
                                    }`}
                                    onClick={(e: React.MouseEvent) => {
                                      e.stopPropagation();
                                      if (!disabled) action.onClick(record, rowIndex);
                                    }}
                                    title={action.label}
                                    disabled={disabled}
                                  >
                                    <Icon
                                      name={action.icon}
                                      size={action.size === "sm" ? 16 : action.size === "lg" ? 20 : 18}
                                      color={
                                        action.type === "danger"
                                          ? ColorsEnum.ERROR
                                          : action.type === "success"
                                          ? ColorsEnum.SUCCESS
                                          : action.type === "warning"
                                          ? ColorsEnum.WARNING
                                          : action.type === "primary"
                                          ? ColorsEnum.PRIMARY
                                          : action.color || ColorsEnum.TEXT_SECONDARY
                                      }
                                    />
                                  </button>
                                );
                              }
                              
                              // Utilisation de boutons pour les actions plus importantes
                              return (
                                <Button
                                  key={actionIndex}
                                  iconName={action.icon}
                                  label=""
                                  size="sm"
                                  appearance="outline"
                                  variation={
                                    action.type === "danger"
                                      ? "error"
                                      : action.type === "success"
                                      ? "success"
                                      : action.type === "warning"
                                      ? "warning"
                                      : action.type === "primary"
                                      ? "primary"
                                      : "secondary"
                                  }
                                  onClick={() => {
                                    // Utiliser une fonction sans paramètre pour éviter l'erreur de typage
                                    action.onClick(record, rowIndex);
                                  }}
                                  title={action.label}
                                  disabled={disabled}
                                />
                              );
                            })}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        
        {/* Padding de bas de table si pas de pagination */}
        {!pagination && <div className="h-2"></div>}
        
        {/* Pagination */}
        {pagination && renderPagination()}
      </div>
    </Card>
  );
};
