import { IonModal, IonContent } from "@ionic/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import BackIconButton from "@/components/ui/BackIconButton";
import AppBackground from "@/theme/AppBackground";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentMethodModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [method, setMethod] = useState("card");

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <AppBackground blurhash="L-Cuh^nhV@jZ.ToyWEoJx@a$kDoL" />
      <IonContent className="bg-white/70 backdrop-blur-lg p-6 min-h-full">
        <div className="max-w-md mx-auto space-y-6 px-4">
          <div className="flex justify-between items-centre mt-4">
            <BackIconButton onClick={onClose} />
            <h2 className="text-lg font-semibold m-2 text-center flex-1 ml-8">
              Méthode de paiement
            </h2>
            <div className="w-6" />
          </div>

          <div className="space-y-4 pl-1 pr-1">
            <Label>Méthode actuelle</Label>
            <RadioGroup
              defaultValue="card"
              value={method}
              onValueChange={setMethod}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card">Carte de crédit</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="applepay" id="applepay" />
                <Label htmlFor="applepay">Apple Pay</Label>
              </div>
            </RadioGroup>
          </div>

          <Button className="w-full rounded-full mt-6 pl-1 pr-1">
            Sauvegarder la méthode
          </Button>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default PaymentMethodModal;
