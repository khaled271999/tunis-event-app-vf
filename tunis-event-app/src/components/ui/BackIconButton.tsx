import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";

interface BackIconButtonProps {
  onClick: () => void;
  className?: string;
}

const BackIconButton: React.FC<BackIconButtonProps> = ({
  onClick,
  className = "",
}) => {
  return (
    <IonButton
      onClick={onClick}
      fill="clear"
      className={`fixed top-2 -left-6 z-50 p-1 ${className}`}
    >
      <IonIcon
        icon={chevronBackOutline}
        className="w-6 h-6 text-black dark:text-white transition-colors"
      />
    </IonButton>
  );
};

export default BackIconButton;
