import React, { useState, useEffect, useCallback } from "react";
import EventCard from "@/components/EventCard";
import { Event } from "../types/event";
import { fetchWithCache } from "@/lib/fetchWithCache";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { IonRefresher, IonRefresherContent } from "@ionic/react";
import { Calendar } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { fetchCombinedEvents } from "@/services/eventService";

interface EventsListProps {
  className?: string;
}

const EventsList: React.FC<EventsListProps> = ({ className }) => {
  console.log("📦 Composant EventsList monté");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloading, setReloading] = useState(false);

  const fetchEvents = useCallback(async () => {
    console.log("🔁 fetchEvents déclenché");
    try {
      setLoading(true);
      const events = await fetchCombinedEvents();
      console.log("✅ Événements reçus :", events);
      setEvents(events);
      setError(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(true);
    } finally {
      setLoading(false);
      setReloading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchEvents();
    event.detail.complete();
  };

  const groupedEvents = events.reduce((acc, event) => {
    const eventDate = new Date(event.startDate).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });
    acc[eventDate] = acc[eventDate] || [];
    acc[eventDate].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent
          pullingText="Tirer pour rafraîchir..."
          refreshingSpinner="circles"
        />
      </IonRefresher>

      <div className="relative ml-4 border-l-2 border-gray-300 pl-4 space-y-4">
        {loading || reloading ? (
          [...Array(3)].map((_, index) => <SkeletonCard key={index} />)
        ) : error ? (
          <Alert className="bg-red-100 text-red-700 border border-red-400 p-4 rounded-lg">
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              Impossible de récupérer les événements. Vérifiez votre connexion
              et réessayez.
            </AlertDescription>
          </Alert>
        ) : Object.entries(groupedEvents).length > 0 ? (
          Object.entries(groupedEvents).map(([date, events]) => (
            <div key={date} className="relative mt-6">
              {/* Ligne et cercle */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>{" "}
                {/* Cercle gris */}
                <Badge className="bg-gray-100 text-gray-600 px-3 py-1 font-semibold">
                  {date}
                </Badge>
              </div>

              {/* Liste des événements */}
              <div className="space-y-2 mt-2 mr-1.5">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Aucun événement disponible.
          </p>
        )}
      </div>
    </>
  );
};

export default EventsList;
