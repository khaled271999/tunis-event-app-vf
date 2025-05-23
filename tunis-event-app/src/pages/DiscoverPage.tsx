import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/Search";
import Logo from "@/components/Logo";
import OfflineStatus from "@/components/OfflineStatus";
import EventsList from "@/components/EventsList";
import autoHideTabBar from "@/lib/AutoHide";

const DiscoverPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Discover</IonTitle>
          <IonButtons slot="end">
            <ModeToggle />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollEvents={true} onIonScroll={autoHideTabBar()}>
        {/* offline motif */}
        <OfflineStatus />

        <EventsList />
      </IonContent>
    </IonPage>
  );
};

export default DiscoverPage;
