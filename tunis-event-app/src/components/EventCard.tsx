import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import InformationModal from "./InformationModal";
import { Event } from "../types/event";
import { Calendar, MapPin, Zap } from "lucide-react";
import { IonIcon } from "@ionic/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { informationCircleOutline } from "ionicons/icons";
import EventOrganizer from "./InformationModalComponents/EventOrganizer";

// Fonction pour formater la date
const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day: string = date.getUTCDate().toString().padStart(2, "0");
  const month: string = date.toLocaleString("fr-FR", { month: "short" });

  return `${day} ${month}`.toUpperCase();
};

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!event) return null;

  const modalEvent = {
    ...event,
    organization: event.organization || null,
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Gestion du prix (afficher le prix minimum)
  const price = event.badges?.prices?.length
    ? Math.min(...event.badges.prices)
    : null;

  return (
    <>
      <Card
        className="w-full max-w-2xl mx-auto flex items-center gap-4 p-4 cursor-pointer shadow-sm rounded-xl"
        onClick={handleOpenModal}
      >
        {event.image ? (
          <img
            src={`https://api.tunis.events/${event.image.path}`}
            alt={event.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
        ) : (
          <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg">
            <span className="text-gray-500">No image</span>
          </div>
        )}

        <CardContent className="flex flex-col flex-1 space-y-2 p-0">
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar size={14} /> {formatShortDate(event.startDate)}
          </div>
          <CardTitle className="text-lg font-semibold truncate max-w-[250px]">
            {event.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 flex items-center gap-1">
            {/* ✅ Badge de l'organisateur (qui ouvre un popover) */}
            <div className="mt-2 flex items-center">
              <Popover>
                <PopoverTrigger onClick={(e) => e.stopPropagation()}>
                  <Badge
                    variant="secondary"
                    className="flex items-center cursor-pointer px-3 py-1"
                  >
                    {/* 🌟 Image de l'organisateur ou icône par défaut */}
                    {event.organization?.image?.filename ? (
                      <img
                        src={`https://api.tunis.events/storage/${event.organization.image.filename}`}
                        alt={event.organization?.name ?? "Organisateur"}
                        className="w-5 h-5 rounded-full object-cover mr-2 border border-gray-300 shadow-sm"
                      />
                    ) : (
                      <IonIcon
                        icon={informationCircleOutline}
                        className="w-5 h-5 text-gray-500 mr-2"
                      />
                    )}

                    {/* 🌟 Nom de l'organisateur */}
                    {event.organization?.name ?? "Organisateur inconnu"}
                  </Badge>
                </PopoverTrigger>
                <PopoverContent className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-80 max-w-[90vw]  shadow-xl rounded-lg z-[999]">
                  {event.organization ? (
                    <EventOrganizer organization={event.organization} />
                  ) : (
                    <div className="p-4 text-sm text-gray-500">
                      Organisation inconnue
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
            <MapPin size={14} /> {event.venue?.name ?? "Lieu non spécifié"}
          </CardDescription>

          <div className="flex items-center  ">
            {event.badges?.prices?.length > 0 && (
              <Badge
                variant="secondary"
                className="flex items-center cursor-pointer"
              >
                {event.badges.prices.length === 1
                  ? `${event.badges.prices[0]} TND`
                  : `${Math.min(...event.badges.prices)} → ${Math.max(
                      ...event.badges.prices
                    )} TND`}
              </Badge>
            )}
            <Badge
              variant="secondary"
              className="flex items-center cursor-pointer"
            >
              <Zap size={14} /> Réservation instantanée
            </Badge>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && (
        <InformationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          event={modalEvent}
        />
      )}
    </>
  );
};

export default EventCard;
