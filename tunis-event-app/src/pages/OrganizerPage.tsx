import { useState } from "react";
import { SettingsSection } from "@/components/SettingsComponents/SettingsSection";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { User } from "@/types/user";
import CreateEventForm from "@/components/OrganizerComponents/CreateEventForm";
import OrganizerDashboard from "@/components/OrganizerComponents/OrganizerDashboard";
import OrganizerEvents from "@/components/OrganizerComponents/OrganizerEvents";

const OrganizerPages: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "createventform":
        return <CreateEventForm />;
      case "organizerdetailmodal":
        return <OrganizerDashboard />;
      case "organizerevents":
        return <OrganizerEvents />;

      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Espace organisateur</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 max-w-md mx-auto">
        <SettingsSection
          items={[
            {
              label: "creer un evenment",
              onClick: () => setActiveComponent("createventform"),
            },
            {
              label: "detail de lorganisateur",
              onClick: () => setActiveComponent("organizerdetailmodal"),
            },
            {
              label: "mes événements",
              onClick: () => setActiveComponent("organizerevents"),
            },
          ]}
        />

        <div className="mt-6">{renderActiveComponent()}</div>
      </IonContent>
    </IonPage>
  );
};

export default OrganizerPages;
