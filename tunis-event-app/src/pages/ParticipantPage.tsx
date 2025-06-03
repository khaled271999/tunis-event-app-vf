import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
} from "@ionic/react";
import EventCard from "@/components/EventCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import { API_BASE_URL } from "@/config"; // ou le bon chemin selon ton projet

// 🔁 À externaliser plus tard dans une variable d’environnement
const API_URL = `${API_BASE_URL}/participant/mes-evenements`;

const ParticipantEventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [reloading, setReloading] = useState(false);

  const fetchParticipantEvents = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur de requête API");
      }

      const data = await response.json();
      setEvents(data);
      setError(false);
    } catch (err) {
      console.error("Erreur lors du chargement des événements:", err);
      setError(true);
    } finally {
      setLoading(false);
      setReloading(false);
    }
  };

  useEffect(() => {
    fetchParticipantEvents();
  }, []);

  const handleRefresh = async (event: CustomEvent) => {
    await fetchParticipantEvents();
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mes événements inscrits</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4 max-w-md mx-auto">
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
                Impossible de récupérer vos événements. Vérifiez votre connexion
                et réessayez.
              </AlertDescription>
            </Alert>
          ) : events.length === 0 ? (
            <Alert className="bg-blue-100 text-blue-700 border border-blue-400 p-4 rounded-lg">
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                Aucun événement disponible pour le moment. Vous n'êtes inscrit à
                aucun événement.
              </AlertDescription>
            </Alert>
          ) : (
            Object.entries(groupedEvents).map(([date, events]) => (
              <div key={date} className="relative mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  <Badge className="bg-gray-100 text-gray-600 px-3 py-1 font-semibold">
                    {date}
                  </Badge>
                </div>
                <div className="space-y-2 mt-2 mr-1.5">
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ParticipantEventsPage;
