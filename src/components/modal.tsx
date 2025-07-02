import { FC, ReactNode, useEffect, useRef } from "react";
import { Icon } from "./icon";
import { Text } from "./text";
import { ColorsEnum } from "../utils/enums";
import { createPortal } from "react-dom";

// Types de taille pour la largeur de la modal
export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "full";

// Interface pour les props du composant Modal
export interface ModalProps {
  // Si la modal est ouverte ou fermée
  isOpen: boolean;
  // Fonction appelée à la fermeture de la modal
  onClose: () => void;
  // Titre de la modal (optionnel)
  title?: string;
  // Contenu de la modal
  children: ReactNode;
  // Taille de la modal (largeur)
  size?: ModalSize;
  // Hauteur maximale en pixels (optionnel)
  maxHeight?: number | string;
  // Si l'overlay doit être affiché
  hasOverlay?: boolean;
  // Si la modal peut être fermée en cliquant sur l'overlay
  closeOnOverlayClick?: boolean;
  // Si la modal peut être fermée avec la touche Echap
  closeOnEsc?: boolean;
  // Position verticale de la modal
  position?: "top" | "center" | "bottom";
  // Classes CSS supplémentaires pour la modal
  className?: string;
  // Si le bouton de fermeture doit être affiché
  showCloseButton?: boolean;
  // Si le titre doit être centré
  centerTitle?: boolean;
  // Animation d'entrée/sortie
  animation?: "fade" | "scale" | "slide-top" | "slide-bottom" | "none";
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  maxHeight,
  hasOverlay = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  position = "center",
  className = "",
  showCloseButton = true,
  centerTitle = false,
  animation = "fade"
}) => {
  // Référence pour la modal
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Effet pour gérer la fermeture avec Echap
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (isOpen && closeOnEsc && event.key === "Escape") {
        onClose();
      }
    };
    
    // Ajouter l'event listener pour la touche Echap
    window.addEventListener("keydown", handleEsc);
    
    // Bloquer le scroll du body quand la modal est ouverte
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    
    // Cleanup: retirer l'event listener et restaurer le scroll
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeOnEsc, onClose]);
  
  // Gérer le clic sur l'overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Largeur de la modal en fonction de la taille
  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-full mx-4"
  }[size];
  
  // Position verticale de la modal
  const positionClasses = {
    top: "items-start pt-20",
    center: "items-center",
    bottom: "items-end pb-20"
  }[position];
  
  // Animation d'entrée/sortie
  const getAnimationClasses = () => {
    if (!isOpen) {
      return "opacity-0";
    }
    
    switch (animation) {
      case "fade":
        return "opacity-100 transition-opacity duration-300";
      case "scale":
        return "opacity-100 scale-100 transition-all duration-300";
      case "slide-top":
        return "opacity-100 translate-y-0 transition-all duration-300";
      case "slide-bottom":
        return "opacity-100 translate-y-0 transition-all duration-300";
      case "none":
      default:
        return "opacity-100";
    }
  };
  
  // Style initial pour l'animation
  const getInitialStyle = () => {
    switch (animation) {
      case "scale":
        return "scale-95";
      case "slide-top":
        return "translate-y-[-20px]";
      case "slide-bottom":
        return "translate-y-[20px]";
      default:
        return "";
    }
  };
  
  // Classes pour l'overlay
  const overlayClasses = [
    "fixed inset-0 flex justify-center",
    positionClasses,
    "z-50 p-4",
    hasOverlay ? "bg-black bg-opacity-50" : "",
    isOpen ? getAnimationClasses() : "opacity-0 pointer-events-none",
    "transition-opacity duration-300 ease-in-out"
  ].join(" ");
  
  // Classes pour la modal
  const modalClasses = [
    "bg-white rounded-lg shadow-xl",
    "w-full",
    sizeClasses,
    "overflow-hidden",
    "relative",
    getInitialStyle(),
    isOpen ? getAnimationClasses() : "",
    className
  ].join(" ");
  
  // Style pour la hauteur maximale
  const modalStyle = {
    maxHeight: maxHeight ? `${maxHeight}${typeof maxHeight === 'number' ? 'px' : ''}` : undefined
  };
  
  // Si la modal n'est pas ouverte, ne rien afficher
  if (!isOpen && typeof document === 'undefined') return null;
  
  // Utiliser un portail pour rendre la modal à la fin du body
  return createPortal(
    <div 
      className={overlayClasses} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div 
        ref={modalRef}
        className={modalClasses}
        style={modalStyle}
      >
        {/* En-tête de la modal (si titre fourni) */}
        {title && (
          <div className="flex items-center justify-between border-b border-border p-4">
            <Text 
              variant="h3" 
              id="modal-title"
              className={`text-text-primary font-semibold ${centerTitle ? "w-full text-center" : ""}`}
            >
              {title}
            </Text>
            
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className={`text-text-secondary hover:text-text-primary focus:outline-none transition-colors ${
                  centerTitle ? "-ml-8" : ""
                }`}
                aria-label="Fermer"
              >
                <Icon name="X" size={20} />
              </button>
            )}
          </div>
        )}
        
        {/* Contenu de la modal */}
        <div className="p-4 overflow-y-auto" style={{ maxHeight: maxHeight ? `calc(${typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight} - ${title ? '4rem' : '0px'})` : undefined }}>
          {children}
        </div>
        
        {/* Bouton de fermeture (si pas de titre mais showCloseButton=true) */}
        {!title && showCloseButton && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-2 right-2 text-text-secondary hover:text-text-primary focus:outline-none transition-colors"
            aria-label="Fermer"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};