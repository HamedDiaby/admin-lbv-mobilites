import { FC, ReactNode } from "react";
import { Modal } from "./modal";
import { Button } from "./button";
import { Icon } from "./icon";
import { Text } from "./text";
import { ColorsEnum } from "../utils/enums";

// Types de dialogues de confirmation
export type ConfirmType = "success" | "error" | "warning" | "info" | "question" | "custom";

// Interface pour les props du composant ModalConfirm
export interface ModalConfirmProps {
  // Si la modal est ouverte ou fermée
  isOpen: boolean;
  // Fonction appelée à la fermeture de la modal
  onClose: () => void;
  // Fonction appelée quand l'utilisateur confirme
  onConfirm: () => void;
  // Titre du dialogue (optionnel)
  title?: string;
  // Message à afficher
  message: ReactNode;
  // Type de confirmation
  type?: ConfirmType;
  // Texte du bouton de confirmation
  confirmText?: string;
  // Texte du bouton d'annulation
  cancelText?: string;
  // Icône personnalisée (si type est "custom")
  customIcon?: ReactNode;
  // Taille de la modal
  size?: "xs" | "sm" | "md";
  // Si le bouton de confirmation est en état de chargement
  loading?: boolean;
  // Si le bouton de confirmation est désactivé
  disabled?: boolean;
  // Si l'overlay peut fermer la modal
  closeOnOverlayClick?: boolean;
  // Animation de la modal
  animation?: "fade" | "scale" | "slide-top" | "slide-bottom" | "none";
  // Si le titre doit être centré
  centerTitle?: boolean;
  // Si le contenu doit être centré
  centerContent?: boolean;
  // Classes CSS supplémentaires
  className?: string;
  // Variante du bouton de confirmation
  confirmVariation?: "primary" | "secondary" | "tertiary" | "success" | "error" | "warning" | "info";
  // Apparence du bouton de confirmation
  confirmAppearance?: "solid" | "outline" | "clear";
  // Apparence du bouton d'annulation
  cancelAppearance?: "solid" | "outline" | "clear";
}

export const ModalConfirm: FC<ModalConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = "question",
  confirmText = "Confirmer",
  cancelText = "Annuler",
  customIcon,
  size = "sm",
  loading = false,
  disabled = false,
  closeOnOverlayClick = true,
  animation = "scale",
  centerTitle = true,
  centerContent = true,
  className = "",
  confirmVariation,
  confirmAppearance = "solid",
  cancelAppearance = "outline"
}) => {
  // Configurations en fonction du type de confirmation
  const getConfirmConfig = () => {
    switch (type) {
      case "success":
        return {
          icon: "CheckCircle",
          color: ColorsEnum.SUCCESS,
          confirmVariation: confirmVariation || "success" as const,
          title: title || "Succès"
        };
      case "error":
        return {
          icon: "AlertCircle",
          color: ColorsEnum.ERROR,
          confirmVariation: confirmVariation || "error" as const,
          title: title || "Erreur"
        };
      case "warning":
        return {
          icon: "AlertTriangle",
          color: ColorsEnum.WARNING,
          confirmVariation: confirmVariation || "warning" as const,
          title: title || "Attention"
        };
      case "info":
        return {
          icon: "Info",
          color: ColorsEnum.INFO,
          confirmVariation: confirmVariation || "info" as const,
          title: title || "Information"
        };
      case "question":
        return {
          icon: "HelpCircle",
          color: ColorsEnum.PRIMARY,
          confirmVariation: confirmVariation || "primary" as const,
          title: title || "Confirmation"
        };
      case "custom":
      default:
        return {
          icon: "",
          color: "",
          confirmVariation: confirmVariation || "primary" as const,
          title: title || "Confirmation"
        };
    }
  };
  
  const config = getConfirmConfig();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={config.title}
      size={size}
      closeOnOverlayClick={closeOnOverlayClick}
      animation={animation}
      centerTitle={centerTitle}
      className={className}
    >
      <div className={`flex flex-col ${centerContent ? "items-center" : ""}`}>
        {/* Icône */}
        {type !== "custom" ? (
          <div className="mb-4">
            <Icon 
              name={config.icon as any} 
              size={48} 
              color={config.color as string} 
              className="mx-auto"
            />
          </div>
        ) : customIcon ? (
          <div className="mb-4">
            {customIcon}
          </div>
        ) : null}
        
        {/* Message */}
        <div className={`mb-6 ${centerContent ? "text-center" : ""}`}>
          {typeof message === "string" ? (
            <Text variant="p2">{message}</Text>
          ) : (
            message
          )}
        </div>
        
        {/* Boutons d'action */}
        <div className={`flex ${centerContent ? "justify-center" : "justify-end"} space-x-3`}>
          <Button 
            label={cancelText} 
            appearance={cancelAppearance} 
            variation="secondary" 
            onClick={onClose}
          />
          <Button 
            label={confirmText} 
            appearance={confirmAppearance} 
            variation={config.confirmVariation} 
            onClick={onConfirm}
            loading={loading}
            disabled={disabled}
          />
        </div>
      </div>
    </Modal>
  );
};