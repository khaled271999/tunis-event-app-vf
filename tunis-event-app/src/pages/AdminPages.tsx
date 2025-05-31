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
import { AuthService, RegisterByAdminDto } from "@/api-sdk-backend";

const AdminPage: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddUser = async (user: RegisterByAdminDto) => {
    try {
      const token = localStorage.getItem("token"); // 🔍 récupère le token du localStorage
      if (!token) throw new Error("Token manquant"); // 🛑 empêche la requête sans token

      await AuthService.authControllerRegisterByAdmin(user);

      setIsAddModalOpen(false); // ✅ ferme le modal si tout s'est bien passé
    } catch (e) {
      console.error("Erreur ajout utilisateur:", e); // ❌ gère proprement l'erreur
    }
  };

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
              onClick: () => setIsAddModalOpen(true),
            },
            {
              label: "Détail d'un utilisateur",
              onClick: () => setActiveComponent("userDetail"),
            },
          ]}
        />

        <div className="mt-6">
          <UserAddModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddUser}
          />
          {renderActiveComponent()}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPage;
