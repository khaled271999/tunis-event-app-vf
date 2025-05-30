import { useState } from "react";
import { UserHeader } from "@/components/SettingsComponents/UserHeader";
import { SettingsSection } from "@/components/SettingsComponents/SettingsSection";
import { SettingsModal } from "@/components/SettingsComponents/SettingsModal";
import { SettingsSwitchItem } from "@/components/SettingsComponents/SettingsSwitchItem";
import EditProfileModal from "@/components/SettingsComponents/EditProfileModal";
import CreditCardModal from "@/components/SettingsComponents/CreditCardModal";
import AddressModal from "@/components/SettingsComponents/AddressModal";
import PaymentMethodModal from "@/components/SettingsComponents/PaymentMethodModal";
import { useAuth } from "@/hooks/useAuth";

export const SettingsComponent: React.FC = () => {
  const { logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const openModal = (title: string) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const [locationEnabled, setLocationEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [creditModalOpen, setCreditModalOpen] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  return (
    <div className="max-w-md mx-auto space-y-6 pt-4">
      <UserHeader onClick={() => setEditProfileOpen(true)} />
      <EditProfileModal
        isOpen={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
      <CreditCardModal
        isOpen={creditModalOpen}
        onClose={() => setCreditModalOpen(false)}
      />
      <AddressModal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
      />
      <PaymentMethodModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      />

      <SettingsSection
        items={[
          {
            label: "Carte de crédit",
            onClick: () => setCreditModalOpen(true),
          },
          {
            label: "Adresse ",
            onClick: () => setAddressModalOpen(true),
          },
          {
            label: "Méthode de paiement",
            onClick: () => setPaymentModalOpen(true),
          },
        ]}
      />

      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow divide-y divide-gray-200">
        <SettingsSwitchItem
          label="Services de localisation"
          value={locationEnabled}
          onChange={setLocationEnabled}
          danger
        />
        <SettingsSwitchItem
          label="Notifications"
          value={notificationsEnabled}
          onChange={setNotificationsEnabled}
        />
      </div>

      <SettingsSection
        items={[
          {
            label: "Aide & Support",
            onClick: () => openModal("Aide & Support"),
          },
          {
            label: "Donner un avis",
            onClick: () => openModal("Donner un avis"),
          },
          {
            label: "Conditions d'utilisation",
            onClick: () => openModal("Conditions d'utilisation"),
          },
        ]}
      />

      <button
        className="w-full py-3 rounded-full border border-red-500 text-red-500 hover:bg-red-100 font-semibold transition"
        onClick={logout}
      >
        Se Déconnecter
      </button>

      <SettingsModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={modalTitle}
      >
        <p>Contenu pour "{modalTitle}" ici...</p>
      </SettingsModal>
    </div>
  );
};
