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
  const [activeComponent, setActiveComponent] = useState<string | null>(
    "Dashboard"
  );

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "createventform":
        return <CreateEventForm />;
      case "Dashboard":
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
              label: "Dashboard",
              onClick: () => setActiveComponent("Dashboard"),
            },
            {
              label: "creer un evenment",
              onClick: () => setActiveComponent("createventform"),
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
