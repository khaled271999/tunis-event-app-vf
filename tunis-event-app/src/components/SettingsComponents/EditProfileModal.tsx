import { IonModal, IonContent } from "@ionic/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import BackIconButton from "@/components/ui/BackIconButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import AppBackground from "@/theme/AppBackground";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const EditProfileModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState({
    name: "Khaled",
    dob: "1999-06-27",
    email: "khammassi59@gmail.com",
    address: "bardo , Tunis",
    gender: "Male",
  });

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <AppBackground blurhash="L-Cuh^nhV@jZ.ToyWEoJx@a$kDoL" />{" "}
      <IonContent className="bg-white/70 backdrop-blur-lg p-6 min-h-full">
        <div className="max-w-md mx-auto space-y-6 px-4">
          {/* Header avec bouton retour */}
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={profile.dob}
                onChange={(e) =>
                  setProfile({ ...profile, dob: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="address">Home Address</Label>
              <Input
                id="address"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Gender</Label>
              <Select
                value={profile.gender}
                onValueChange={(val) => setProfile({ ...profile, gender: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bouton Sauvegarder */}
          <Button className="w-full rounded-full mt-6 pl-1 pr-1">
            Save Changes
          </Button>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default EditProfileModal;
