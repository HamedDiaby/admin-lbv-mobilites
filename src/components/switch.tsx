import { FC, InputHTMLAttributes, useState, ChangeEvent, FocusEvent } from "react";
import { Text } from "./text";
import { ColorsEnum } from "../utils/enums";

// Interface pour les props du composant Switch
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
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
  // Position du label (avant ou après le switch)
  labelPosition?: "left" | "right";
  // Taille du switch
  size?: "sm" | "md" | "lg";
  // Classe CSS supplémentaire
  className?: string;
  // Couleur du switch quand il est activé
  color?: ColorsEnum | string;
  // Texte pour l'état activé (optionnel)
  onText?: string;
  // Texte pour l'état désactivé (optionnel)
  offText?: string;
}

export const Switch: FC<SwitchProps> = ({
  label,
  helperText,
  error,
  success = false,
  disabled = false,
  required = false,
  labelPosition = "right",
  size = "md",
  className = "",
  color = ColorsEnum.PRIMARY,
  onText,
  offText,
  checked,
  onChange,
  onFocus,
  onBlur,
  ...rest
}) => {
  // State pour gérer le focus
  const [isFocused, setIsFocused] = useState(false);
  
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

  // Dimensions du switch en fonction de la taille
  const switchDimensions = {
    sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: "translate-x-4" },
    md: { track: "w-10 h-5", thumb: "w-4 h-4", translate: "translate-x-5" },
    lg: { track: "w-12 h-6", thumb: "w-5 h-5", translate: "translate-x-6" },
  }[size];

  // Classes pour le conteneur
  const containerClasses = [
    "flex items-center",
    labelPosition === "right" ? "flex-row" : "flex-row-reverse justify-end",
    className,
  ].join(" ");

  // Classes pour le wrapper du switch
  const switchWrapperClasses = [
    "relative inline-flex shrink-0 cursor-pointer transition-colors duration-200 ease-in-out",
    switchDimensions.track,
    "rounded-full",
    error 
      ? "bg-error/30" 
      : success 
        ? "bg-success/30" 
        : checked 
          ? color === ColorsEnum.PRIMARY 
            ? "bg-primary" 
            : `bg-${color}` 
          : "bg-gray-200",
    disabled ? "opacity-60 cursor-not-allowed" : "",
    isFocused ? "ring-2 ring-offset-1 ring-primary/40" : "",
  ].join(" ");

  // Classes pour le pouce du switch
  const thumbClasses = [
    "pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out",
    switchDimensions.thumb,
    checked ? switchDimensions.translate : "translate-x-0.5",
    disabled ? "bg-gray-100" : "",
  ].join(" ");

  return (
    <div className="flex flex-col">
      <div className={containerClasses}>
        {/* Label (à gauche ou à droite) */}
        {label && (
          <label 
            htmlFor={rest.id} 
            className={`block text-sm ${
              disabled ? "text-text-disabled" : "text-text-primary"
            } ${size === "lg" ? "text-base" : ""} select-none cursor-pointer ${
              labelPosition === "right" ? "ml-3" : "mr-3"
            }`}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        {/* Wrapper pour le switch */}
        <div className="flex items-center">
          {/* Texte pour l'état désactivé */}
          {offText && !checked && (
            <span className={`mr-2 text-xs ${disabled ? "text-text-disabled" : "text-text-secondary"}`}>
              {offText}
            </span>
          )}

          {/* Switch */}
          <div className={switchWrapperClasses}>
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              disabled={disabled}
              {...rest}
            />
            <span className={thumbClasses}></span>
          </div>

          {/* Texte pour l'état activé */}
          {onText && checked && (
            <span className={`ml-2 text-xs ${disabled ? "text-text-disabled" : "text-text-secondary"}`}>
              {onText}
            </span>
          )}
        </div>
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