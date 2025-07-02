import { FC, InputHTMLAttributes, TextareaHTMLAttributes, useState, useRef, ChangeEvent, FocusEvent } from "react";
import { Icon } from "./icon";
import { Text } from "./text";
import { ColorsEnum } from "@utils/enums";
import * as LucideIcons from "lucide-react";

// Types d'entrée pris en charge
export type InputType = "text" | "password" | "date" | "time" | "textarea";

// Position de l'icône
type IconPosition = "left" | "right";

// Interface pour les props du composant Input
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>, "type"> {
  // Type d'entrée
  type?: InputType;
  // Label à afficher
  label?: string;
  // Texte d'aide sous le champ
  helperText?: string;
  // Message d'erreur
  error?: string;
  // Nom de l'icône
  iconName?: keyof typeof LucideIcons;
  // Couleur de l'icône
  iconColor?: ColorsEnum | string;
  // Position de l'icône
  iconPosition?: IconPosition;
  // Si le champ prend toute la largeur disponible
  fullWidth?: boolean;
  // Si le champ est en état de réussite
  success?: boolean;
  // Si le champ est désactivé
  disabled?: boolean;
  // Si le champ est en lecture seule
  readOnly?: boolean;
  // Si le champ est requis
  required?: boolean;
  // Texte de l'espace réservé
  placeholder?: string;
  // Hauteur pour les textareas
  rows?: number;
}

export const Input: FC<InputProps> = ({
  type = "text",
  label,
  helperText,
  error,
  iconName,
  iconColor = ColorsEnum.TEXT_SECONDARY,
  iconPosition = "left",
  fullWidth = false,
  success = false,
  disabled = false,
  readOnly = false,
  required = false,
  placeholder = "",
  rows = 3,
  className = "",
  value,
  onChange,
  onFocus,
  onBlur,
  ...rest
}) => {
  // State pour gérer la visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  
  // State pour gérer le focus
  const [isFocused, setIsFocused] = useState(false);
  
  // Référence pour le champ d'entrée
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  // Détermine le type d'entrée à afficher (pour le mot de passe)
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
  
  // Gère le changement de valeur
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e as any);
    }
  };
  
  // Gère le focus
  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e as any);
    }
  };
  
  // Gère la perte du focus
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e as any);
    }
  };
  
  // Bascule la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Classes pour le conteneur du champ
  const containerClasses = [
    "flex flex-col",
    fullWidth ? "w-full" : "w-auto",
    className,
  ].join(" ");

  // Classes pour le wrapper de l'input
  const inputWrapperClasses = [
    "flex items-center relative",
    error ? "border-error" : success ? "border-success" : isFocused ? "border-primary" : "border-border",
    "border rounded-md overflow-hidden bg-white transition-colors duration-200",
    disabled ? "bg-background-disabled cursor-not-allowed opacity-60" : "",
  ].join(" ");

  // Padding pour l'entrée en fonction de la présence d'une icône
  const inputPadding = iconName
    ? iconPosition === "left"
      ? "pl-10 pr-3"
      : type === "password"
        ? "pl-3 pr-20" // Plus d'espace à droite pour les icônes du mot de passe
        : "pl-3 pr-10"
    : type === "password"
      ? "px-3 pr-10" // Espace pour l'icône de visibilité du mot de passe
      : "px-3";

  // Classes pour l'input
  const inputClasses = [
    "py-2 w-full outline-none bg-transparent",
    inputPadding,
    disabled ? "cursor-not-allowed" : "",
  ].join(" ");

  // Rendu de l'icône (si spécifiée)
  const renderIcon = () => {
    if (!iconName) return null;

    return (
      <div
        className={`absolute inset-y-0 ${
          iconPosition === "left" ? "left-0" : "right-0"
        } flex items-center ${iconPosition === "left" ? "pl-3" : "pr-3"}`}
      >
        <Icon name={iconName} size={18} color={iconColor} />
      </div>
    );
  };

  // Rendu de l'icône de visibilité du mot de passe
  const renderPasswordIcon = () => {
    if (type !== "password") return null;

    return (
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary"
        onClick={togglePasswordVisibility}
        tabIndex={-1}
      >
        <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
      </button>
    );
  };

  // Rendu de l'indication d'erreur ou de succès
  const renderStatusIcon = () => {
    if (type === "password" || !(!iconName || iconPosition === "left")) return null;
    
    if (error) {
      return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Icon name="AlertCircle" size={18} color={ColorsEnum.ERROR} />
        </div>
      );
    }
    
    if (success) {
      return (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Icon name="CheckCircle" size={18} color={ColorsEnum.SUCCESS} />
        </div>
      );
    }
    
    return null;
  };

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

      {/* Wrapper pour l'input et les icônes */}
      <div className={inputWrapperClasses}>
        {/* Icône (si spécifiée) */}
        {renderIcon()}

        {/* Input ou Textarea selon le type */}
        {type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            className={inputClasses}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            rows={rows}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={inputType}
            className={inputClasses}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}

        {/* Icône pour le mot de passe */}
        {renderPasswordIcon()}

        {/* Icône d'état (erreur ou succès) */}
        {renderStatusIcon()}
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