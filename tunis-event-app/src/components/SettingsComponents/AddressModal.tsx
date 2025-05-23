import { IonModal, IonContent } from "@ionic/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BackIconButton from "@/components/ui/BackIconButton";
import AppBackground from "@/theme/AppBackground";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ShippingAddressModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    country: "",
  });

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <AppBackground blurhash="L-Cuh^nhV@jZ.ToyWEoJx@a$kDoL" />
      <IonContent className="bg-white/70 backdrop-blur-lg p-6 min-h-full">
        <div className="max-w-md mx-auto space-y-6 px-4">
          <div className="flex justify-between items-centre mt-4">
            <BackIconButton onClick={onClose} />
            <h2 className="text-lg font-semibold m-2 text-center flex-1 ml-8">
              Adresse
            </h2>
            <div className="w-6" />
          </div>

          <div className="space-y-4 pl-1 pr-1">
            <div className="space-y-1">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input
                id="fullName"
                value={address.fullName}
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input
                id="phone"
                type="tel"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="street">Rue / Immeuble</Label>
              <Input
                id="street"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 space-y-1">
                <Label>Ville</Label>
                <Input
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                />
              </div>
              <div className="w-1/3 space-y-1">
                <Label>Code postal</Label>
                <Input
                  value={address.zip}
                  onChange={(e) =>
                    setAddress({ ...address, zip: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1 pl-1 pr-1">
              <Label>Pays</Label>
              <Select
                value={address.country}
                onValueChange={(val) =>
                  setAddress({ ...address, country: val })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un pays" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TN">Tunisie</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="MA">Maroc</SelectItem>
                  <SelectItem value="DZ">Algérie</SelectItem>
                  {/* Tu peux ajouter d'autres pays */}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button className="w-full rounded-full mt-6 pl-1 pr-1">
            Sauvegarder
          </Button>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default ShippingAddressModal;
