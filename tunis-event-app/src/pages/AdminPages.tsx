import { useState } from "react";
import { SettingsSection } from "@/components/SettingsComponents/SettingsSection";
import AdminCommentModeration from "@/components/superadmincomponents/AdminCommentModeration";
import AdminEvent from "@/components/superadmincomponents/AdminEvent";
import AdminEventList from "@/components/superadmincomponents/AdminEventList";
import AdminUserManagement from "@/components/superadmincomponents/AdminUserManagement";
import EventDetailModal from "@/components/superadmincomponents/EventDetailModal";
import UserAddModal from "@/components/superadmincomponents/UserAddModal";
import UserDetailModal from "@/components/superadmincomponents/UserDetailModal";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { User } from "@/types/user";

const AdminPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "commentModeration":
        return <AdminCommentModeration />;
      case "eventManagement":
        return <AdminEvent />;
      case "eventList":
        return <AdminEventList events={[]} />;
      case "userManagement":
        return <AdminUserManagement />;
      case "eventDetail":
        return (
          <EventDetailModal
            isOpen={true}
            onClose={() => setActiveComponent(null)}
            event={null}
            onApprove={function (eventId: string): void {
              throw new Error("Function not implemented.");
            }}
            onReject={function (eventId: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        );
      case "userAdd":
        return (
          <UserAddModal
            isOpen={true}
            onClose={() => setActiveComponent(null)}
            onAdd={function (user: {
              name: string;
              email: string;
              role: string;
            }): void {
              throw new Error("Function not implemented.");
            }}
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
            {
              label: "Ajouter un utilisateur",
              onClick: () => setActiveComponent("userAdd"),
            },
            {
              label: "Détail d'un utilisateur",
              onClick: () => setActiveComponent("userDetail"),
            },
          ]}
        />

        <div className="mt-6">{renderActiveComponent()}</div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;
