import React, { useState } from "react";
import { IonModal, IonContent, IonIcon } from "@ionic/react";
import EventImage from "./InformationModalComponents/EventImage";
import EventDate from "./InformationModalComponents/EventDate";
import EventLocation from "./InformationModalComponents/EventLocation";
import EventTickets from "./InformationModalComponents/EventTickets";
import SecretCodeUnlock from "./InformationModalComponents/SecretCodeUnlock";
import { Card } from "./ui/card";
import MapComponent from "./MapComponent";

import { Badge } from "./ui/badge";
import { informationCircleOutline } from "ionicons/icons";
import EventOrganizer from "./InformationModalComponents/EventOrganizer";
import { Blurhash } from "react-blurhash";

import { extractFormattedText } from "@/lib/extractFormattedText";
import BackIconButton from "./ui/BackIconButton";
import EventCommentSection from "./InformationModalComponents/EventCommentSection";
interface MinimalEvent {
  id: string;
  name: string;
  description: string;
  image: { path: string; blurhash: string };
  startDate: string;
  endDate: string;
  venue: {
    name: string;
    formatted_address: string;
    latitude: number;
    longitude: number;
    rating?: number;
    address_components?: {
      types: string[];
      long_name: string;
      short_name: string;
    }[];
  };
  badges: {
    prices: number[];
    completelySold: boolean;
    hiddenTickets: boolean;
  };
  organization: {
    id: string;
    name: string;
    description: string | null;
    image: { filename: string };
    createdAt: string;
  };
}

interface InformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: MinimalEvent | null;
}

const InformationModal: React.FC<InformationModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showOrganizer, setShowOrganizer] = useState(false);

  if (!event) return null;

  const tickets =
    event.badges.prices.length > 0
      ? event.badges.prices.map((price, index) => ({
          name: `Ticket ${index + 1}`,
          price: price,
          soldOut: event.badges.completelySold || false,
        }))
      : [];

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className="flex items-center justify-center "
    >
      {/* 🌟 Ajout du Blurhash en arrière-plan */}
      <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg">
        <Blurhash
          hash={event.image.blurhash || "L-Cuh^nhV@jZ.ToyWEoJx@a$kDoL"}
          width="100%"
          height="100%"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <IonContent className="p-6 space-y-6 w-full max-w-2xl mx-auto relative bg-opacity-80 backdrop-blur-lg ">
        <div className="w-full flex justify-center mt-3">
          <BackIconButton onClick={onClose} />{" "}
          <EventImage
            imageUrl={`https://api.tunis.events/${event.image.path}`}
            altText={event.name}
            name={event.name}
          />
        </div>
        {/* ✅ Badge qui disparaît quand la carte s'affiche */}
        <div className="w-full max-w-md mx-auto">
          {!showOrganizer && ( // ✅ Cache le badge si la carte est affichée
            <Badge
              variant="secondary"
              className="flex items-center cursor-pointer px-3 py-1 text-sm"
              onClick={() => setShowOrganizer(true)}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 shadow-md overflow-hidden">
                {event.organization.image?.filename ? (
                  <img
                    src={`https://api.tunis.events/storage/${event.organization.image.filename}`}
                    alt={event.organization.name}
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")} // Cache si l'image ne charge pas
                  />
                ) : (
                  <IonIcon
                    icon={informationCircleOutline}
                    className="w-6 h-6 text-gray-500"
                  />
                )}
              </div>
              <div className="ml-2">{event.organization.name}</div>
            </Badge>
          )}

          {/* ✅ Affichage conditionnel de `EventOrganizer` */}
          {showOrganizer && (
            <div className="mt-3 transition-all duration-300">
              <EventOrganizer organization={event.organization} />
            </div>
          )}
        </div>

        <div className="space-y-4 w-full flex flex-col items-center pl-1 pr-1">
          <div className="w-full max-w-md">
            <EventDate
              startDate={event.startDate}
              endDate={event.endDate}
              name={event.name}
              venue={event.venue}
            />
          </div>

          <div className="w-full max-w-md pl-1 pr-1">
            <EventLocation {...event.venue} />
          </div>
        </div>

        {/* ✅ Toujours afficher le bouton de réservation */}
        <div className="w-full max-w-md mx-auto pl-1 pr-1">
          <EventTickets eventId={event.id} />
        </div>

        {/* ✅ Affichage de la description formatée */}
        {event.description && (
          <div className="w-full max-w-md mx-auto bg-muted p-4 b-3 rounded-2xl  shadow-lg">
            {extractFormattedText(
              event.description,
              "Aucune information disponible sur cet événement."
            )}
          </div>
        )}
        <div className="b-3 w-full max-w-md mx-auto pb-3 pl-1 pr-1">
          <Card className="bg-card border border-gray-700 shadow-lg p-6 rounded-2xl space-y-4 w-full max-w-lg mx-auto">
            <EventLocation {...event.venue} />
            <MapComponent
              event={{
                ...event,
                venue: {
                  ...event.venue,
                  rating: event.venue.rating ?? 0, // ✅ Définit une valeur par défaut
                  address_components: event.venue.address_components ?? [], // ✅ Évite l'erreur
                },
              }}
            />
          </Card>
        </div>
        <div className="b-3 w-full max-w-md mx-auto pb-3 pl-1 pr-1">
          <EventCommentSection />
        </div>
      </IonContent>
    </IonModal>
  );
};

export default InformationModal;
