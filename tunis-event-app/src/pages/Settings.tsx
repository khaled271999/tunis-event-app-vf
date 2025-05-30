import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import OfflineStatus from "@/components/OfflineStatus";
import ProfileMenu from "@/components/ProfileMenu";

import { UserHeader } from "@/components/SettingsComponents/UserHeader";
import { SettingsSection } from "@/components/SettingsComponents/SettingsSection";
import { SettingsModal } from "@/components/SettingsComponents/SettingsModal";
import { SettingsSwitchItem } from "@/components/SettingsComponents/SettingsSwitchItem";
import EditProfileModal from "@/components/SettingsComponents/EditProfileModal";
import CreditCardModal from "@/components/SettingsComponents/CreditCardModal";
import AddressModal from "@/components/SettingsComponents/AddressModal";
import PaymentMethodModal from "@/components/SettingsComponents/PaymentMethodModal";
import { LoginSignUp } from "@/components/LoginSignUp";
import { SettingsComponent } from "@/components/SettingsComponent";

const Settings: React.FC = () => {
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
          <div style={{ position: "absolute", right: "10px", top: "10px" }}>
            <ModeToggle />
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding bg-transparent">
        <OfflineStatus />

        <SettingsComponent />
      </IonContent>
    </IonPage>
  );
};

export default Settings;
