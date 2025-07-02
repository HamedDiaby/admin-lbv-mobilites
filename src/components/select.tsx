import { FC, SelectHTMLAttributes, useState, useRef, ChangeEvent, FocusEvent } from "react";
import { Icon } from "./icon";
import { Text } from "./text";
import { ColorsEnum } from "@utils/enums";
import * as LucideIcons from "lucide-react";

// Type pour les options du select
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Interface pour les props du composant Select
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "value"> {
  // Label à afficher
  label?: string;
  // Options du select
  options: SelectOption[];
  // Texte d'aide sous le champ
  helperText?: string;
  // Message d'erreur
  error?: string;
  // Nom de l'icône (à gauche)
  iconName?: keyof typeof LucideIcons;
  // Couleur de l'icône
  iconColor?: ColorsEnum | string;
  // Si le champ prend toute la largeur disponible
  fullWidth?: boolean;
  // Si le champ est en état de réussite
  success?: boolean;
  // Si le champ est désactivé
  disabled?: boolean;
  // Si le champ est requis
  required?: boolean;
  // Texte affiché quand aucune option n'est sélectionnée
  placeholder?: string;
  // Classes CSS supplémentaires
  className?: string;
  // Valeur sélectionnée
  value?: string;
  // Fonction appelée lors du changement de valeur
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  // Si le select permet la sélection multiple
  multiple?: boolean;
  // Taille du select quand multiple est true
  size?: number;
}

export const Select: FC<SelectProps> = ({
  label,
  options = [],
  helperText,
  error,
  iconName,
  iconColor = ColorsEnum.TEXT_SECONDARY,
  fullWidth = false,
  success = false,
  disabled = false,
  required = false,
  placeholder = "Sélectionnez une option",
  className = "",
  value,
  onChange,
  onFocus,
  onBlur,
  multiple = false,
  size = 4,
  ...rest
}) => {
  // State pour gérer le focus
  const [isFocused, setIsFocused] = useState(false);
  
  // Référence pour le champ select
  const selectRef = useRef<HTMLSelectElement>(null);
  
  // Gère le changement de valeur
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  
  // Gère le focus
  const handleFocus = (e: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };
  
  // Gère la perte du focus
  const handleBlur = (e: FocusEvent<HTMLSelectElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  // Classes pour le conteneur du champ
  const containerClasses = [
    "flex flex-col",
    fullWidth ? "w-full" : "w-auto",
    className,
  ].join(" ");

  // Classes pour le wrapper du select
  const selectWrapperClasses = [
    "flex items-center relative",
    error ? "border-error" : success ? "border-success" : isFocused ? "border-primary" : "border-border",
    "border rounded-md overflow-hidden bg-white transition-colors duration-200",
    disabled ? "bg-background-disabled cursor-not-allowed opacity-60" : "",
  ].join(" ");

  // Padding pour le select en fonction de la présence d'une icône
  const selectPadding = iconName
    ? "pl-10 pr-10"  // Icône à gauche + icône flèche à droite
    : "pl-3 pr-10";  // Juste l'icône flèche à droite

  // Classes pour le select
  const selectClasses = [
    "py-2 w-full outline-none bg-transparent appearance-none",
    selectPadding,
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    "focus:outline-none",
  ].join(" ");

  return (
    <div className={containerClasses}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={rest.id} 
          className={`mb-1 block text-sm font-medium ${
            disabled ? "text-text-disabled" : "text-text-secondary"
          }`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Wrapper pour le select et les icônes */}
      <div className={selectWrapperClasses}>
        {/* Icône (si spécifiée) */}
        {iconName && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon name={iconName} size={18} color={iconColor} />
          </div>
        )}

        {/* Select */}
        <select
          ref={selectRef}
          className={selectClasses}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiple={multiple}
          size={multiple ? size : undefined}
          {...rest}
        >
          {/* Option de placeholder si pas de valeur sélectionnée et pas multiple */}
          {!multiple && !value && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          
          {/* Options du select */}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Icône flèche à droite (uniquement si pas multiple) */}
        {!multiple && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Icon 
              name={isFocused ? "ChevronUp" : "ChevronDown"} 
              size={18} 
              color={error ? ColorsEnum.ERROR : success ? ColorsEnum.SUCCESS : ColorsEnum.TEXT_SECONDARY} 
            />
          </div>
        )}
      </div>

      {/* Texte d'aide ou message d'erreur */}
      {(helperText || error) && (
        <Text
          variant="p5"
          className="mt-1"
          color={error ? ColorsEnum.ERROR : success ? ColorsEnum.SUCCESS : ColorsEnum.TEXT_SECONDARY}
        >
          {error || helperText}
        </Text>
      )}
    </div>
  );
}