import { FC } from "react";
import * as LucideIcons from "lucide-react";
import { ColorsEnum } from "@utils/enums";

// Types pour les props du composant Icon
export interface IconProps {
  // Nom de l'icône de Lucide
  name: keyof typeof LucideIcons;
  // Taille de l'icône (en pixels)
  size?: number | string;
  // Couleur de l'icône (utilise notre enum de couleurs)
  color?: ColorsEnum | string;
  // Classes CSS supplémentaires
  className?: string;
  // Pour les événements onClick
  onClick?: () => void;
  // Rotation de l'icône (en degrés)
  rotate?: number;
  // Pour l'accessibilité
  ariaLabel?: string;
  // Pour spécifier si l'icône est décorative
  ariaHidden?: boolean;
  // Stroke width de l'icône
  strokeWidth?: number;
}

/**
 * Composant Icon qui utilise Lucide Icons
 * 
 * Exemple d'usage:
 * ```tsx
 * <Icon name="ChevronRight" size={24} color={ColorsEnum.PRIMARY} />
 * ```
 */
export const Icon: FC<IconProps> = ({
  name,
  size = 24,
  color = ColorsEnum.TEXT_PRIMARY,
  className = "",
  onClick,
  rotate = 0,
  ariaLabel,
  ariaHidden = false,
  strokeWidth = 2,
}) => {
  // Vérifie si l'icône existe dans Lucide
  const LucideIcon = LucideIcons[name] as React.ComponentType<LucideIcons.LucideProps>;

  if (!LucideIcon) {
    console.error(`L'icône "${name}" n'existe pas dans Lucide Icons`);
    return null;
  }

  // Style pour la rotation si nécessaire
  const rotationStyle = rotate ? { transform: `rotate(${rotate}deg)` } : {};

  return (
    <LucideIcon
      size={size}
      color={color}
      className={className}
      onClick={onClick}
      style={rotationStyle}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      strokeWidth={strokeWidth}
    />
  );
}