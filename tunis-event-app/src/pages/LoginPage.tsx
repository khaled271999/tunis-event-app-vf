import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { LoginSignUp } from "@/components/LoginSignUp";

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Connexion / Inscription</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <LoginSignUp />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
