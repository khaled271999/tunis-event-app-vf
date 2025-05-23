import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline } from "ionicons/icons";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SecretCodeUnlockProps {
  onUnlock: (code: string) => void;
}

const SecretCodeUnlock: React.FC<SecretCodeUnlockProps> = ({ onUnlock }) => {
  const [code, setCode] = useState("");

  return (
    <Card className="bg-card border border-gray-700 shadow-lg p-4 rounded-lg mx-4 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20 space-y-4">
      <div className="flex items-center space-x-3">
        {/* Icône de verrou */}
        <IonIcon
          icon={lockClosedOutline}
          className="text-primary w-6 h-6 bg-gray-900/50 text-white p-2 rounded-md"
        />
        {/* Texte d'information */}
        <p className="text-lg text-foreground">
          D'autres tickets sont disponibles mais sont cachés
        </p>
      </div>

      {/* Input + Bouton */}
      <div className="flex items-center space-x-3">
        <Input
          type="text"
          placeholder="CODE SECRET"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 bg-transparent border border-gray-500 text-foreground"
        />
        <Button
          variant="default"
          onClick={() => onUnlock(code)}
          disabled={!code.trim()} // Désactiver si aucun code
        >
          Déverrouiller
        </Button>
      </div>
    </Card>
  );
};

export default SecretCodeUnlock;
