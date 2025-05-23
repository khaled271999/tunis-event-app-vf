import React, { useState, useEffect, useCallback } from "react";
import { IonModal, IonContent, IonButton, IonIcon } from "@ionic/react";
import EventCard from "@/components/EventCard";
import { Event } from "../types/event";
import { fetchWithCache } from "@/lib/fetchWithCache";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "./ui/badge";
import {
  callOutline,
  mailOutline,
  logoInstagram,
  logoFacebook,
} from "ionicons/icons";
import { extractFormattedText } from "@/lib/extractFormattedText";
import AppBackground from "@/theme/AppBackground";
import BackIconButton from "./ui/BackIconButton";

interface OrganizerEventListProps {
  isOpen: boolean;
  onClose: () => void;
  organizerId: string;
}

const OrganizerEventList: React.FC<OrganizerEventListProps> = ({
  isOpen,
  onClose,
  organizerId,
}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [organizer, setOrganizer] = useState<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  const fetchOrganizerData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchWithCache("/public/events");

      if (!data?.data || !Array.isArray(data.data)) {
        throw new Error("Données invalides reçues");
      }

      const filteredEvents = data.data.filter(
        (event: Event) => event.organization.id === organizerId
      );
      setEvents(filteredEvents);

      if (filteredEvents.length > 0) {
        setOrganizer(filteredEvents[0].organization);
      }

      setError(false);
    } catch (error) {
      console.error("Erreur lors du chargement des événements:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [organizerId]);

  useEffect(() => {
    if (isOpen) {
      fetchOrganizerData();
    }
  }, [isOpen, fetchOrganizerData]);

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose} backdropDismiss={false}>
      <AppBackground blurhash="L-Cuh^nhV@jZ.ToyWEoJx@a$kDoL" />{" "}
      <IonContent className="relative z-10 p-6 w-full max-w-2xl mx-auto text-center bg-white/80 backdrop-blur">
        <BackIconButton onClick={onClose} />
        {/* ✅ Image centrée de l'organisateur */}
        <div className="relative flex flex-col items-center mt-6">
          {organizer?.image ? (
            <img
              src={`https://api.tunis.events/storage/${organizer.image.filename}`}
              alt={organizer.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-lg">?</span>
            </div>
          )}

          {/* ✅ Nom de l'organisateur */}
          <h2 className="mt-3 text-xl font-bold text-gray-900">
            {organizer?.name || "Organisateur inconnu"}
          </h2>

          {/* ✅ Icônes de contact dynamiques */}
          <div className="mt-2 flex justify-center space-x-4 text-gray-600">
            {organizer?.additionalInformation?.facebookPageUrl && (
              <IonButton
                fill="clear"
                href={organizer.additionalInformation.facebookPageUrl}
                target="_blank"
              >
                <IonIcon icon={logoFacebook} className="w-6 h-6 text-black" />
              </IonButton>
            )}
            {organizer?.additionalInformation?.infoPhone && (
              <IonButton
                fill="clear"
                href={`tel:${organizer.additionalInformation.infoPhone}`}
              >
                <IonIcon icon={callOutline} className="w-6 h-6 text-black" />
              </IonButton>
            )}
            {organizer?.additionalInformation?.publicEmail && (
              <IonButton
                fill="clear"
                href={`mailto:${organizer.additionalInformation.publicEmail}`}
              >
                <IonIcon icon={mailOutline} className="w-6 h-6 text-black" />
              </IonButton>
            )}
            {organizer?.additionalInformation?.instagramProfileUrl && (
              <IonButton
                fill="clear"
                href={organizer.additionalInformation.instagramProfileUrl}
                target="_blank"
              >
                <IonIcon icon={logoInstagram} className="w-6 h-6 text-black" />
              </IonButton>
            )}
          </div>

          {/* ✅ Description */}
          <div className="mt-3 text-sm text-gray-700 px-4 max-w-lg">
            {extractFormattedText(
              organizer?.description,
              "Cet organisateur n’a pas encore ajouté de description."
            )}
          </div>
        </div>

        {/* ✅ Liste des événements */}
        <div className="relative ml-4 border-l-2 border-gray-300 pl-4 space-y-6 mt-6">
          {loading ? (
            [...Array(3)].map((_, index) => <SkeletonCard key={index} />)
          ) : error ? (
            <Alert className="bg-red-100 text-red-700 border border-red-400 p-4 rounded-lg">
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>
                Impossible de récupérer les événements. Vérifiez votre connexion
                et réessayez.
              </AlertDescription>
            </Alert>
          ) : events.length > 0 ? (
            Object.entries(
              events.reduce((acc, event) => {
                const eventDate = new Date(event.startDate).toLocaleDateString(
                  "fr-FR",
                  { weekday: "long", day: "2-digit", month: "long" }
                );
                acc[eventDate] = acc[eventDate] || [];
                acc[eventDate].push(event);
                return acc;
              }, {} as Record<string, Event[]>)
            ).map(([date, events]) => (
              <div key={date} className="relative mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <Badge className="bg-gray-100 text-gray-600 px-3 py-1 font-semibold">
                    {date}
                  </Badge>
                </div>

                <div className="space-y-2 mt-2 mb-3 ml-2 mr-1.5">
                  {events.map((event: Event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Aucun événement disponible pour cet organisateur.
            </p>
          )}
        </div>
      </IonContent>
    </IonModal>
  );
};

export default OrganizerEventList;
