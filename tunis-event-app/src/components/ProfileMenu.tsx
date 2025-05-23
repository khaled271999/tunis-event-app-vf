import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { key, ticket, logOut } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "@/theme/profileMenu.css";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const ProfileMenu: React.FC = () => {
  const history = useHistory();

  return (
    <IonList>
      <IonItem button onClick={() => history.push("/profile")}>
        <div className="avatar-container">
          <div className="avatar-wrapper">
            <Avatar>
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="avatar-circle"
              />
              <AvatarFallback>Profile</AvatarFallback>
            </Avatar>
          </div>
          <IonLabel className="avatar-label">Modifier profile</IonLabel>
        </div>
      </IonItem>

      <IonItem button onClick={() => history.push("/reset-password")}>
        <IonIcon icon={key} slot="start" />
        <IonLabel>Réinitialiser le mot de passe</IonLabel>
      </IonItem>
      <IonItem button onClick={() => history.push("/my-tickets")}>
        <IonIcon icon={ticket} slot="start" />
        <IonLabel>Mes Tickets</IonLabel>
      </IonItem>

      <div className="px-4 py-2">
        {" "}
        {/* Ajoutez un espacement pour correspondre à IonItem */}
        <Button
          variant="destructive" // Utilisez le variant "destructive" pour un bouton rouge
          className="w-full" // Prend toute la largeur disponible
          onClick={() => console.log("Déconnexion...")}
        >
          <IonIcon icon={logOut} slot="start" className="mr-2" />{" "}
          {/* Icône de déconnexion */}
          Déconnexion
        </Button>
      </div>
    </IonList>
  );
};

export default ProfileMenu;
