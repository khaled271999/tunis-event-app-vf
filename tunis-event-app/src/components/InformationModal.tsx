import React, { useState } from "react";
import { IonModal, IonContent, IonIcon } from "@ionic/react";
import EventImage from "./InformationModalComponents/EventImage";
import EventDate from "./InformationModalComponents/EventDate";
import EventLocation from "./InformationModalComponents/EventLocation";
import EventTickets from "./InformationModalComponents/EventTickets";
import { Card } from "./ui/card";
import MapComponent from "./MapComponent";
import { Badge } from "./ui/badge";
import { informationCircleOutline, trashBin } from "ionicons/icons";
import EventOrganizer from "./InformationModalComponents/EventOrganizer";
import { Blurhash } from "react-blurhash";
import { extractFormattedText } from "@/lib/extractFormattedText";
import BackIconButton from "./ui/BackIconButton";
import EventCommentSection from "./InformationModalComponents/EventCommentSection";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { EventsService } from "@/api-sdk-backend";
import { withAuth } from "@/hooks/withAuth";
import { useAuth } from "@/hooks/useAuth";

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
  const [showOrganizer, setShowOrganizer] = useState(false);
  const { user } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!event) return null;

  const tickets = Array.isArray(event.badges?.prices)
    ? event.badges.prices.map((price, index) => ({
        name: `Ticket ${index + 1}`,
        price,
        soldOut: event.badges.completelySold || false,
      }))
    : [];

  const handleDelete = async () => {
    if (event?.id?.startsWith("public")) {
      toast.error("Événement non autorisé à la suppression (source publique)");
      return;
    }

    try {
      await withAuth(() => EventsService.eventsControllerDeleteEvent(event.id));
      toast.success("Événement supprimé avec succès");
      onClose();
    } catch (error) {
      console.error("Erreur suppression:", error);
      toast.error("Échec de la suppression de l'événement");
    }
  };

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={onClose}
      className="flex items-center justify-center"
    >
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

      <IonContent className="p-6 space-y-6 w-full max-w-2xl mx-auto relative bg-opacity-80 backdrop-blur-lg">
        <div className="w-full flex justify-center mt-3">
          <BackIconButton onClick={onClose} />
          <EventImage
            imageUrl={`https://api.tunis.events/${event.image.path}`}
            altText={event.name}
            name={event.name}
          />
        </div>

        <div className="w-full max-w-md mx-auto">
          {!showOrganizer && (
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
                    onError={(e) => (e.currentTarget.style.display = "none")}
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

        <div className="w-full max-w-md mx-auto pl-1 pr-1">
          <EventTickets eventId={event.id} />
        </div>

        {event.description && (
          <div className="w-full max-w-md mx-auto bg-muted p-4 b-3 rounded-2xl shadow-lg">
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
                  rating: event.venue.rating ?? 0,
                  address_components: event.venue.address_components ?? [],
                },
              }}
            />
          </Card>
        </div>
        <div className="b-3 w-full max-w-md mx-auto pb-3 pl-1 pr-1">
          <EventCommentSection eventId={event.id} />
        </div>
        {user?.role === "SUPERADMIN" && (
          <div className="b-3 w-full max-w-md mx-auto pb-3 pl-1 pr-1 flex justify-center">
            <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
              <AlertDialogTrigger asChild>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2">
                  <IonIcon icon={trashBin} /> Supprimer cet événement
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Confirmer la suppression de l'événement ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Confirmer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </IonContent>
    </IonModal>
  );
};

export default InformationModal;
