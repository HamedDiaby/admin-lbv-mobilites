import { FC, ReactNode, HTMLAttributes, ElementType } from "react";
import { ColorsEnum } from "@utils/enums";

// Définition des variantes pour les titres et paragraphes
export type TextVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p1" | "p2" | "p3" | "p4" | "p5";

// Définition des épaisseurs de police
export type TextWeight = "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";

// Définition de l'alignement du texte
export type TextAlignment = "left" | "center" | "right" | "justify";

// Définition des propriétés du composant Text
export interface TextProps extends HTMLAttributes<HTMLElement> {
  // Contenu du texte
  children: ReactNode;
  // Variante du texte
  variant?: TextVariant;
  // Épaisseur de la police
  weight?: TextWeight;
  // Couleur du texte
  color?: ColorsEnum | string;
  // Alignement du texte
  align?: TextAlignment;
  // Transformation du texte (majuscules, minuscules, etc.)
  transform?: "uppercase" | "lowercase" | "capitalize" | "normal-case";
  // Décoration du texte (souligné, barré, etc.)
  decoration?: "underline" | "line-through" | "no-underline";
  // Style d'affichage italique
  italic?: boolean;
  // Espacement des lettres
  tracking?: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  // Classes CSS supplémentaires
  className?: string;
  // Style en ligne
  style?: React.CSSProperties;
  // Pour tronquer le texte avec ellipsis
  truncate?: boolean;
  // Nombre maximum de lignes (tronque avec ellipsis)
  maxLines?: number;
}

export const Text: FC<TextProps> = ({
  children,
  variant = "p1",
  weight = "normal",
  color,
  align = "left",
  transform,
  decoration,
  italic = false,
  tracking = "normal",
  className = "",
  style = {},
  truncate = false,
  maxLines,
  ...rest
}) => {
  // Map des variantes avec leur taille et style correspondant
  const variantMap: Record<TextVariant, { element: ElementType; classes: string }> = {
    h1: { element: "h1", classes: "text-4xl leading-tight" },
    h2: { element: "h2", classes: "text-3xl leading-tight" },
    h3: { element: "h3", classes: "text-2xl leading-tight" },
    h4: { element: "h4", classes: "text-xl leading-snug" },
    h5: { element: "h5", classes: "text-lg leading-snug" },
    h6: { element: "h6", classes: "text-base leading-normal" },
    p1: { element: "p", classes: "text-lg leading-relaxed" },
    p2: { element: "p", classes: "text-base leading-relaxed" },
    p3: { element: "p", classes: "text-sm leading-relaxed" },
    p4: { element: "p", classes: "text-xs leading-relaxed" },
    p5: { element: "p", classes: "text-xs leading-tight" },
  };

  // Map des épaisseurs de police
  const weightMap: Record<TextWeight, string> = {
    thin: "font-thin",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  // Map des alignements de texte
  const alignMap: Record<TextAlignment, string> = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
    justify: "text-justify",
  };

  // Construction des classes CSS
  const classes = [
    // Classes de base selon la variante
    variantMap[variant].classes,
    // Épaisseur de la police
    weightMap[weight],
    // Alignement
    alignMap[align],
    // Transformation
    transform && `${transform}`,
    // Décoration
    decoration && `${decoration}`,
    // Italique
    italic && "italic",
    // Espacement des lettres
    tracking !== "normal" && `tracking-${tracking}`,
    // Troncature
    truncate && "truncate",
    // Classes personnalisées
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Styles en ligne
  const combinedStyles: React.CSSProperties = {
    ...(color && { color }),
    // Pour limiter le nombre de lignes
    ...(maxLines && {
      display: "-webkit-box",
      WebkitLineClamp: maxLines,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }),
    ...style,
  };

  // Élément à rendre selon la variante
  const TagName = variantMap[variant].element;

  return (
    <TagName className={classes} style={combinedStyles} {...rest}>
      {children}
    </TagName>
  );
}