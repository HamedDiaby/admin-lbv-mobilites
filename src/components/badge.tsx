import { FC, HTMLAttributes, ReactNode } from "react";
import { Icon } from "./icon";
import { ColorsEnum } from "@utils/enums";
import * as LucideIcons from "lucide-react";

// Types de variantes pour le badge
export type BadgeVariant = "solid" | "outline" | "soft";

// Types de tailles pour le badge
export type BadgeSize = "xs" | "sm" | "md" | "lg";

// Interface pour les props du composant Badge
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  // Contenu du badge
  children?: ReactNode;
  // Variante du badge
  variant?: BadgeVariant;
  // Couleur du badge
  color?: ColorsEnum | string;
  // Taille du badge
  size?: BadgeSize;
  // Forme du badge
  rounded?: boolean;
  // Si le badge est un point sans contenu
  dot?: boolean;
  // Si le badge a une bordure complète
  bordered?: boolean;
  // Nom de l'icône à afficher
  iconName?: keyof typeof LucideIcons;
  // Position de l'icône
  iconPosition?: "left" | "right";
  // Si le badge est cliquable (avec effet hover)
  clickable?: boolean;
  // Nombre maximal de caractères à afficher
  maxCount?: number;
  // Si le badge affiche un compteur dépassant maxCount, ajoute un +
  showCountOverflow?: boolean;
  // Classes CSS supplémentaires
  className?: string;
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant = "solid",
  color = ColorsEnum.PRIMARY,
  size = "md",
  rounded = false,
  dot = false,
  bordered = false,
  iconName,
  iconPosition = "left",
  clickable = false,
  maxCount,
  showCountOverflow = false,
  className = "",
  ...rest
}) => {
  // Convertir le contenu en chaîne si c'est un nombre pour la limitation maxCount
  let content = children;
  
  if (typeof children === 'number' && maxCount && children > maxCount && showCountOverflow) {
    content = `${maxCount}+`;
  }

  // Couleurs en fonction de la variante et de la couleur de base
  const getColorClasses = () => {
    // Mappage direct des couleurs avec fallback
    const colorMap: Record<string, Record<string, string>> = {
      [ColorsEnum.PRIMARY]: {
        solid: 'bg-blue-500 text-white',
        outline: 'bg-transparent text-blue-500 border border-blue-500',
        soft: 'bg-blue-50 text-blue-600'
      },
      [ColorsEnum.SUCCESS]: {
        solid: 'bg-green-500 text-white',
        outline: 'bg-transparent text-green-500 border border-green-500',
        soft: 'bg-green-50 text-green-600'
      },
      [ColorsEnum.WARNING]: {
        solid: 'bg-yellow-500 text-white',
        outline: 'bg-transparent text-yellow-500 border border-yellow-500',
        soft: 'bg-yellow-50 text-yellow-600'
      },
      [ColorsEnum.ERROR]: {
        solid: 'bg-red-500 text-white',
        outline: 'bg-transparent text-red-500 border border-red-500',
        soft: 'bg-red-50 text-red-600'
      },
      [ColorsEnum.INFO_LIGHT]: {
        solid: 'bg-blue-400 text-white',
        outline: 'bg-transparent text-blue-400 border border-blue-400',
        soft: 'bg-blue-50 text-blue-500'
      },
      [ColorsEnum.GRAY_500]: {
        solid: 'bg-gray-500 text-white',
        outline: 'bg-transparent text-gray-500 border border-gray-500',
        soft: 'bg-gray-50 text-gray-600'
      }
    };

    const defaultColors = {
      solid: 'bg-gray-500 text-white',
      outline: 'bg-transparent text-gray-500 border border-gray-500',
      soft: 'bg-gray-50 text-gray-600'
    };

    const colorKey = String(color);
    const colorVariants = colorMap[colorKey] || defaultColors;
    
    return colorVariants[variant] || colorVariants.solid;
  };

  // Tailles en fonction de la prop size
  const sizeClasses = {
    xs: dot ? "h-1.5 w-1.5" : "text-xs py-0.5 px-1.5",
    sm: dot ? "h-2 w-2" : "text-xs py-0.5 px-2",
    md: dot ? "h-2.5 w-2.5" : "text-sm py-1 px-2.5",
    lg: dot ? "h-3 w-3" : "text-base py-1 px-3",
  }[size];

  // Taille de l'icône en fonction de la taille du badge
  const iconSize = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
  }[size];

  // Classes pour le badge
  const badgeClasses = [
    // Classes de base
    "inline-flex items-center justify-center font-medium",
    // Classes de taille
    sizeClasses,
    // Classes de couleur
    getColorClasses(),
    // Classes de forme
    rounded ? "rounded-full" : "rounded",
    // Classes de bordure
    bordered && variant !== "outline" ? "border border-white/20" : "",
    // Classes pour l'effet de clic
    clickable ? "cursor-pointer hover:opacity-80 active:opacity-70 transition-opacity" : "",
    // Classes supplémentaires
    className,
  ].filter(Boolean).join(" ");

  // Si c'est juste un point, on ne montre pas de contenu
  if (dot) {
    return <span className={badgeClasses} {...rest}></span>;
  }

  return (
    <span className={badgeClasses} {...rest}>
      {/* Icône à gauche */}
      {iconName && iconPosition === "left" && (
        <Icon 
          name={iconName} 
          size={iconSize} 
          className="mr-1" 
          color={variant === "solid" ? "white" : color as string} 
        />
      )}
      
      {/* Contenu */}
      {content}
      
      {/* Icône à droite */}
      {iconName && iconPosition === "right" && (
        <Icon 
          name={iconName} 
          size={iconSize} 
          className="ml-1" 
          color={variant === "solid" ? "white" : color as string} 
        />
      )}
    </span>
  );
};