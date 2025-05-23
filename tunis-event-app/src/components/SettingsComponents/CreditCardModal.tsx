import { IonModal, IonContent } from "@ionic/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import BackIconButton from "@/components/ui/BackIconButton";
import AppBackground from "@/theme/AppBackground";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreditCardModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [card, setCard] = useState({
    number: "",
    month: "",
    year: "",
    cvc: "",
    name: "",
    emailEnabled: true,
    email: "",
  });

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <AppBackground blurhash="L-Cuh^nhV@jZ.ToyWEoJx@a$kDoL" />
      <IonContent className="bg-white/70 backdrop-blur-lg p-6 min-h-full">
        <div className="max-w-md mx-auto space-y-6 px-4">
          <div className="flex justify-between items-centre mt-4">
            <BackIconButton onClick={onClose} />
            <h2 className="text-lg font-semibold m-2 text-center flex-1 ml-8">
              Ajouter une carte
            </h2>
            <div className="w-6" />
          </div>

          <div className="space-y-4 pl-1 pr-1">
            <div className="space-y-1">
              <Label htmlFor="number">Numéro de la carte</Label>
              <Input
                id="number"
                type="text"
                placeholder="•••• •••• •••• ••••"
                value={card.number}
                onChange={(e) => setCard({ ...card, number: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 space-y-1">
                <Label>Mois</Label>
                <Select
                  value={card.month}
                  onValueChange={(val) => setCard({ ...card, month: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Mois" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString().padStart(2, "0")}
                      >
                        {(i + 1).toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1 space-y-1">
                <Label>Année</Label>
                <Select
                  value={card.year}
                  onValueChange={(val) => setCard({ ...card, year: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Année" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-1/3 space-y-1">
                <Label>Code</Label>
                <Input
                  type="text"
                  placeholder="CVC"
                  value={card.cvc}
                  onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Nom du détenteur</Label>
              <Input
                value={card.name}
                onChange={(e) => setCard({ ...card, name: e.target.value })}
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="emailEnabled"
                checked={card.emailEnabled}
                onCheckedChange={(val) =>
                  setCard({ ...card, emailEnabled: !!val })
                }
              />
              <Label htmlFor="emailEnabled">Adresse e-mail</Label>
            </div>

            {card.emailEnabled && (
              <div className="space-y-1">
                <Input
                  type="email"
                  placeholder="exemple@email.com"
                  value={card.email}
                  onChange={(e) => setCard({ ...card, email: e.target.value })}
                />
              </div>
            )}
          </div>

          <Button className="w-full rounded-full mt-6 pl-1 pr-1">
            Ajouter la carte
          </Button>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default CreditCardModal;
