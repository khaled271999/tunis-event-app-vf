import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { ModeToggle } from "@/components/mode-toggle";
import EventsList from "@/components/EventsList";
import Logo from "@/components/Logo";
import OfflineStatus from "@/components/OfflineStatus";
// autohide import
import autoHideTabBar from "../lib/AutoHide";
import { Search } from "@/components/Search";
import MapComponent from "@/components/MapComponent";
import { Abonner } from "@/components/Abonner";
import { Title } from "@radix-ui/react-dialog";
import PopularEventsCarousel from "@/components/PopularEventsCarousel";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonButtons slot="end">
            <ModeToggle />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollEvents={true} onIonScroll={autoHideTabBar()}>
        {/* offline motif */}
        <OfflineStatus />
        <div>
          <Search />
        </div>
        <div>
          <PopularEventsCarousel />
        </div>

        <div>
          <IonTitle>Nearby events</IonTitle>
          <div>
            <MapComponent />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Abonner />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
