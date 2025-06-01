import React, { useEffect, useState } from "react";
import { IonModal, IonContent } from "@ionic/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import BackIconButton from "@/components/ui/BackIconButton";
import AppBackground from "@/theme/AppBackground";
import { useAuth } from "@/hooks/useAuth";
import { withAuth } from "@/hooks/withAuth";
import { toast } from "sonner";
import { UsersService } from "@/api-sdk-backend";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await withAuth(() =>
          UsersService.usersControllerGetCurrentUser()
        );
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        toast.error("Erreur lors du chargement du profil.");
      }
    };

    if (isOpen) fetchUserProfile();
  }, [isOpen]);

  const handleSave = async () => {
    if (!name || !email) {
      toast.warning("Le nom et l'email sont requis.");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      toast.warning("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await withAuth(() =>
        UsersService.usersControllerUpdateProfile({
          name,
          email,
          oldPassword: oldPassword || undefined,
          newPassword: newPassword || undefined,
        })
      );
      toast.success("Profil mis à jour !");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <AppBackground blurhash="L-Cuh^nhV@jZ.ToyWEoJx@a$kDoL" />
      <IonContent className="bg-white/70 backdrop-blur-lg p-6 min-h-full">
        <div className="max-w-md mx-auto space-y-6 px-4">
          {/* Header */}
          <div className="flex justify-between items-centre mt-4">
            <BackIconButton onClick={onClose} />
            <h2 className="text-lg font-semibold m-2 text-center flex-1 ml-8 ">
              Edit Profile
            </h2>
            <div className="w-6" />
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://i.pravatar.cc/300" alt="Profile" />
              <AvatarFallback>KH</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground italic">
              Tap to change photo
            </span>
          </div>

          {/* Form */}
          <div className="space-y-4 pl-1 pr-1">
            <div className="space-y-1">
              <Label>Nom</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Mot de passe actuel</Label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Nouveau mot de passe</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Confirmer le mot de passe</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <Button
            className="w-full rounded-full mt-6 pl-1 pr-1"
            onClick={handleSave}
          >
            Enregistrer les modifications
          </Button>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default EditProfileModal;
