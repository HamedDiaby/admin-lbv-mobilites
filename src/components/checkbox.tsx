import { FC, InputHTMLAttributes, useState, useRef, ChangeEvent, FocusEvent, useEffect } from "react";
import { Icon } from "./icon";
import { Text } from "./text";
import { ColorsEnum } from "@utils/enums";

// Interface pour les props du composant Checkbox
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  // Label à afficher
  label?: string;
  // Texte d'aide sous le champ
  helperText?: string;
  // Message d'erreur
  error?: string;
  // Si le champ est en état de réussite
  success?: boolean;
  // Si le champ est désactivé
  disabled?: boolean;
  // Si le champ est requis
  required?: boolean;
  // Taille du checkbox
  size?: "sm" | "md" | "lg";
  // Classe CSS supplémentaire
  className?: string;
  // Couleur du checkbox quand il est coché
  color?: ColorsEnum | string;
  // Si le checkbox est indéterminé
  indeterminate?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  helperText,
  error,
  success = false,
  disabled = false,
  required = false,
  size = "md",
  className = "",
  color = ColorsEnum.PRIMARY,
  indeterminate = false,
  checked,
  onChange,
  onFocus,
  onBlur,
  ...rest
}) => {
  // State pour gérer le focus
  const [isFocused, setIsFocused] = useState(false);
  
  // Référence pour le champ d'entrée
  const inputRef = useRef<HTMLInputElement>(null);

  // Appliquer l'état indéterminé quand le composant est monté ou mis à jour
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);
  
  // Gère le changement de valeur
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) {
      onChange(e);
    }
  };
  
  // Gère le focus
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };
  
  // Gère la perte du focus
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  // Taille du checkbox en fonction de la prop size
  const checkboxSize = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }[size];

  // Taille de l'icône en fonction de la prop size
  const iconSize = {
    sm: 12,
    md: 14,
    lg: 18,
  }[size];

  // Classes pour le conteneur
  const containerClasses = [
    "flex items-start",
    className,
  ].join(" ");

  // Classes pour le wrapper du checkbox
  const checkboxWrapperClasses = [
    "relative flex items-center justify-center",
    disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
  ].join(" ");

  // Classes pour le checkbox (élément visuel)
  const checkboxClasses = [
    "border rounded transition-colors duration-200",
    checkboxSize,
    error 
      ? "border-error" 
      : success 
        ? "border-success" 
        : isFocused 
          ? "border-primary ring-2 ring-primary/20" 
          : "border-border",
    checked 
      ? error 
        ? "bg-error border-error" 
        : success 
          ? "bg-success border-success" 
          : `bg-${color} border-${color}` 
      : indeterminate
        ? `bg-${color} border-${color}`
        : "bg-white",
    disabled ? "bg-background-disabled" : "",
  ].join(" ");

  return (
    <div className="flex flex-col">
      <div className={containerClasses}>
        {/* Wrapper pour le checkbox */}
        <div className={checkboxWrapperClasses}>
          {/* Input checkbox caché */}
          <input
            ref={inputRef}
            type="checkbox"
            className="absolute opacity-0 h-0 w-0"
            checked={checked}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            {...rest}
          />
          
          {/* Checkbox visuel personnalisé */}
          <div className={checkboxClasses}>
            {/* Icône de coche quand le checkbox est coché */}
            {checked && !indeterminate && (
              <Icon name="Check" size={iconSize} color="white" strokeWidth={3} />
            )}
            
            {/* Icône de tiret quand le checkbox est indéterminé */}
            {indeterminate && (
              <Icon name="Minus" size={iconSize} color="white" strokeWidth={3} />
            )}
          </div>
        </div>
        
        {/* Label */}
        {label && (
          <label 
            htmlFor={rest.id} 
            className={`ml-2 block text-sm ${
              disabled ? "text-text-disabled" : "text-text-primary"
            } ${size === "lg" ? "text-base" : ""} select-none cursor-pointer`}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
      </div>

      {/* Texte d'aide ou message d'erreur */}
      {(helperText || error) && (
        <Text
          variant="p5"
          className="mt-1 ml-7"
          color={error ? ColorsEnum.ERROR : success ? ColorsEnum.SUCCESS : ColorsEnum.TEXT_SECONDARY}
        >
          {error || helperText}
        </Text>
      )}
    </div>
  );
}