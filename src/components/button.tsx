import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Icon } from "./icon";
import * as LucideIcons from "lucide-react";
import { ColorsEnum } from "@utils/enums";

// Types d'apparence du bouton
export type ButtonAppearance = "solid" | "outline" | "clear";

// Variations de couleurs du bouton
export type ButtonVariation = 
  | "primary"
  | "secondary" 
  | "tertiary" 
  | "success" 
  | "error" 
  | "warning" 
  | "info";

// Position de l'icône
export type IconPosition = "left" | "right";

// Props du composant Button
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  // Label du bouton
  label?: string;
  // Contenu JSX personnalisé
  children?: ReactNode;
  // Type HTML du bouton
  htmlType?: "button" | "submit" | "reset";
  // Apparence visuelle
  appearance?: ButtonAppearance;
  // Variation de couleur
  variation?: ButtonVariation;
  // Nom de l'icône (de Lucide)
  iconName?: keyof typeof LucideIcons;
  // Position de l'icône
  iconPosition?: IconPosition;
  // Si le bouton est arrondi
  rounded?: boolean;
  // Taille du bouton
  size?: "sm" | "md" | "lg";
  // Classes CSS personnalisées
  className?: string;
  // Si le bouton prend toute la largeur disponible
  fullWidth?: boolean;
  // État désactivé
  disabled?: boolean;
  // État de chargement
  loading?: boolean;
  // Événement onClick
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  label,
  children,
  htmlType = "button",
  appearance = "solid",
  variation = "primary",
  iconName,
  iconPosition = "left",
  rounded = false,
  size = "md",
  className = "",
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  ...rest
}) => {
  // Map des variations de couleurs selon l'apparence du bouton
  const colorMap = {
    solid: {
      primary: `bg-primary text-white hover:bg-primary-dark`,
      secondary: `bg-secondary text-white hover:bg-secondary-dark`,
      tertiary: `bg-tertiary text-text-primary hover:bg-tertiary-dark`,
      success: `bg-success text-white hover:bg-success-dark`,
      error: `bg-error text-white hover:bg-error-dark`,
      warning: `bg-warning text-text-primary hover:bg-warning-dark`,
      info: `bg-info text-white hover:bg-info-dark`,
    },
    outline: {
      primary: `border border-primary text-primary hover:bg-primary hover:text-white`,
      secondary: `border border-secondary text-secondary hover:bg-secondary hover:text-white`,
      tertiary: `border border-tertiary text-tertiary hover:bg-tertiary hover:text-text-primary`,
      success: `border border-success text-success hover:bg-success hover:text-white`,
      error: `border border-error text-error hover:bg-error hover:text-white`,
      warning: `border border-warning text-warning hover:bg-warning hover:text-text-primary`,
      info: `border border-info text-info hover:bg-info hover:text-white`,
    },
    clear: {
      primary: `text-primary hover:bg-primary hover:bg-opacity-10`,
      secondary: `text-secondary hover:bg-secondary hover:bg-opacity-10`,
      tertiary: `text-tertiary hover:bg-tertiary hover:bg-opacity-10`,
      success: `text-success hover:bg-success hover:bg-opacity-10`,
      error: `text-error hover:bg-error hover:bg-opacity-10`,
      warning: `text-warning hover:bg-warning hover:bg-opacity-10`,
      info: `text-info hover:bg-info hover:bg-opacity-10`,
    },
  };

  // Map des tailles
  const sizeMap = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  // Gère l'espacement entre l'icône et le texte
  const iconSpacing = label || children ? (iconPosition === "left" ? "mr-2" : "ml-2") : "";

  // Détermine les classes CSS du bouton
  const buttonClasses = [
    // Base
    "font-medium inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50",
    // Type et variation
    colorMap[appearance][variation],
    // Taille
    sizeMap[size],
    // Arrondi
    rounded ? "rounded-full" : "rounded-md",
    // Largeur
    fullWidth ? "w-full" : "",
    // Désactivé
    disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
    // Focus ring color
    `focus:ring-${variation}`,
    // Classes personnalisées
    className,
  ].join(" ");

  // Obtient la couleur de l'icône en fonction de l'apparence et de la variation
  const getIconColor = () => {
    if (appearance === "solid") {
      return ColorsEnum.WHITE;
    } else {
      switch (variation) {
        case "primary":
          return ColorsEnum.PRIMARY;
        case "secondary":
          return ColorsEnum.SECONDARY;
        case "tertiary":
          return ColorsEnum.TERTIARY;
        case "success":
          return ColorsEnum.SUCCESS;
        case "error":
          return ColorsEnum.ERROR;
        case "warning":
          return ColorsEnum.WARNING;
        case "info":
          return ColorsEnum.INFO;
        default:
          return ColorsEnum.PRIMARY;
      }
    }
  };

  return (
    <button
      type={htmlType}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading ? (
        // Indicateur de chargement
        <Icon name="Loader2" className="animate-spin" size={size === "lg" ? 20 : size === "md" ? 18 : 16} color={getIconColor()} />
      ) : (
        <>
          {/* Icône à gauche si spécifié */}
          {iconName && iconPosition === "left" && (
            <Icon name={iconName} className={iconSpacing} size={size === "lg" ? 20 : size === "md" ? 18 : 16} color={getIconColor()} />
          )}
          
          {/* Texte du bouton */}
          {label || children}
          
          {/* Icône à droite si spécifié */}
          {iconName && iconPosition === "right" && (
            <Icon name={iconName} className={iconSpacing} size={size === "lg" ? 20 : size === "md" ? 18 : 16} color={getIconColor()} />
          )}
        </>
      )}
    </button>
  );
}