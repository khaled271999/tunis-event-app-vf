import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { LoginSignUp } from "@/components/LoginSignUp";

import { ModeToggle } from "@/components/mode-toggle";
import Logo from "@/components/Logo";

import { SkeletonNotif } from "@/components/SkeletonNotif";
import OfflineStatus from "@/components/OfflineStatus";
import AdminUserManagement from "@/components/superadmincomponents/AdminUserManagement";
import AdminEventList from "@/components/superadmincomponents/AdminEventList";
import AdminEvent from "@/components/superadmincomponents/AdminEvent";
import OrganizerDashboard from "@/components/OrganizerComponents/OrganizerDashboard";
import CreateEventForm from "@/components/OrganizerComponents/CreateEventForm";
import OrganizerEvents from "@/components/OrganizerComponents/OrganizerEvents";
import AdminCommentModeration from "@/components/superadmincomponents/AdminCommentModeration";

const Ticket: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ticket</IonTitle>
          <div style={{ position: "absolute", right: "10px", top: "10px" }}>
            <ModeToggle />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* offline motif */}
        <OfflineStatus />
        <h1>login</h1>
        <LoginSignUp />
        <h1>les pages du superadmin</h1>
        <AdminUserManagement />
        <AdminEvent />
        <AdminCommentModeration />
        <h1>les pages d'organisateur</h1>
        <OrganizerDashboard />
        <CreateEventForm />
        <OrganizerEvents />
      </IonContent>
    </IonPage>
  );
};

export default Ticket;
