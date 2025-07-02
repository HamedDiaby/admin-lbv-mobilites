import { FC, ReactNode, HTMLAttributes } from "react";
import { Text } from "./text";
import { ColorsEnum } from "../utils/enums";

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  // Titre de la carte (optionnel)
  title?: ReactNode;
  // Sous-titre de la carte (optionnel)
  subtitle?: ReactNode;
  // Contenu principal de la carte
  children: ReactNode;
  // Contenu à droite du titre (optionnel)
  rightContent?: ReactNode;
  // Contenu secondaire affiché en-dessous du titre (optionnel)
  secondaryContent?: ReactNode;
  // Classes CSS supplémentaires
  className?: string;
  // Niveau d'élévation/ombre
  elevation?: "none" | "sm" | "md" | "lg" | "xl";
  // Bordure de la carte
  border?: boolean;
  // Arrondi des coins
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  // Padding interne
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  // Largeur maximale
  maxWidth?: string;
  // Couleur de fond
  bgColor?: ColorsEnum | string;
  // Couleur de la bordure
  borderColor?: ColorsEnum | string;
}

export const Card: FC<CardProps> = ({
  title,
  subtitle,
  children,
  rightContent,
  secondaryContent,
  className = "",
  elevation = "md",
  border = true,
  rounded = "md",
  padding = "md",
  maxWidth,
  bgColor = "#FFFFFF",
  borderColor,
  ...rest
}) => {
  // Map des élévations avec leur classe d'ombre
  const shadowMap = {
    none: "",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-md",
    xl: "shadow-lg",
  };

  // Map des arrondis
  const roundedMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };

  // Map des paddings
  const paddingMap = {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  };

  // Construction des classes CSS
  const cardClasses = [
    // Base
    "overflow-hidden",
    // Ombre
    shadowMap[elevation],
    // Arrondi
    roundedMap[rounded],
    // Padding
    paddingMap[padding],
    // Bordure
    border ? "border" : "",
    // Classes personnalisées
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Styles en ligne pour la couleur de fond et la bordure
  const cardStyles = {
    backgroundColor: bgColor,
    borderColor: borderColor,
    maxWidth: maxWidth,
  };

  return (
    <div className={cardClasses} style={cardStyles} {...rest}>
      {/* En-tête de la carte avec titre, sous-titre et contenu à droite */}
      {(title || subtitle || rightContent || secondaryContent) && (
        <div className="mb-4">
          {/* Ligne du haut avec titre et contenu à droite */}
          {(title || rightContent) && (
            <div className="flex justify-between items-center mb-1">
              {/* Titre */}
              {title && (
                <div className="flex-grow">
                  {typeof title === "string" ? (
                    <Text variant="h5" weight="semibold">
                      {title}
                    </Text>
                  ) : (
                    title
                  )}
                </div>
              )}
              
              {/* Contenu à droite */}
              {rightContent && <div className="ml-4 flex-shrink-0">{rightContent}</div>}
            </div>
          )}
          
          {/* Sous-titre */}
          {subtitle && (
            <div className="mt-1">
              {typeof subtitle === "string" ? (
                <Text variant="p3" color={ColorsEnum.TEXT_SECONDARY}>
                  {subtitle}
                </Text>
              ) : (
                subtitle
              )}
            </div>
          )}
          
          {/* Contenu secondaire */}
          {secondaryContent && (
            <div className="mt-3 flex justify-end">
              {secondaryContent}
            </div>
          )}
        </div>
      )}
      
      {/* Contenu principal de la carte */}
      {children}
    </div>
  );
}