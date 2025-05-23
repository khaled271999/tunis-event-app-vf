import React from "react";
import { IonIcon } from "@ionic/react";
import { locationOutline, arrowForwardOutline } from "ionicons/icons";
import { Card } from "@/components/ui/card";

interface EventLocationProps {
  name: string;
  formatted_address: string;
  latitude: number;
  longitude: number;
}

const EventLocation: React.FC<EventLocationProps> = ({
  name,
  formatted_address,
  latitude,
  longitude,
}) => {
  return (
    <Card
      className="bg-card border border-gray-700 shadow-lg p-4 rounded-lg flex items-center space-x-4 w-full max-w-lg mx-auto"
      onClick={() =>
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
          "_blank"
        )
      }
    >
      <IonIcon
        icon={locationOutline}
        className="text-primary w-12 h-12 bg-gray-900/50 text-white p-2 rounded-md flex flex-col items-center justify-center"
      />
      <div className="flex flex-col flex-1">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-muted-foreground">{formatted_address}</p>
      </div>
      <IonIcon
        icon={arrowForwardOutline}
        className="text-primary w-5 h-5 transform rotate-[-45deg]"
      />
    </Card>
  );
};

export default EventLocation;
