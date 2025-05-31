import { useState } from "react";
import { SettingsSection } from "@/components/SettingsComponents/SettingsSection";
import AdminCommentModeration from "@/components/superadmincomponents/AdminCommentModeration";
import AdminEvent from "@/components/superadmincomponents/AdminEvent";
import AdminEventList from "@/components/superadmincomponents/AdminEventList";
import AdminUserManagement from "@/components/superadmincomponents/AdminUserManagement";
import EventDetailModal from "@/components/superadmincomponents/EventDetailModal";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { RegisterByAdminDto, AuthService } from "@/api-sdk-backend";

const AdminPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "commentModeration":
        return <AdminCommentModeration />;
      case "eventManagement":
        return <AdminEvent />;
      case "eventList":
        return <AdminEventList events={[]} />;
      case "userManagement":
        return (
          <AdminUserManagement
            openAddUserModal={() => setIsAddModalOpen(true)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Espace Super Admin</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 max-w-md mx-auto">
        <SettingsSection
          items={[
            {
              label: "Gestion des utilisateurs",
              onClick: () => setActiveComponent("userManagement"),
            },
            {
              label: "Modération des commentaires",
              onClick: () => setActiveComponent("commentModeration"),
            },
            {
              label: "Gestion des événements",
              onClick: () => setActiveComponent("eventManagement"),
            },
            {
              label: "Liste des événements",
              onClick: () => setActiveComponent("eventList"),
            },
            {
              label: "Détail d'un événement",
              onClick: () => setActiveComponent("eventDetail"),
            },
          ]}
        />

        <div className="mt-6">{renderActiveComponent()}</div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;
