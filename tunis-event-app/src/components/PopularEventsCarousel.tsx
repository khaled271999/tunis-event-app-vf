import React, { useState, useEffect, useCallback } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useHistory } from "react-router-dom";
import EventCard from "@/components/EventCard";
import { Event } from "@/types/event";
import { fetchWithCache } from "@/lib/fetchWithCache";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const PopularEventsCarousel: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const history = useHistory();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchWithCache("/public/events/popular");
      setEvents(Array.isArray(data?.data) ? data.data : []);
      setError(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="space-y-4 px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Événements Populaires</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => history.push("/discoverPage")}
        >
          Voir tous
        </Button>
      </div>

      {loading ? (
        <div className="flex space-x-4 pb-2">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <Alert className="bg-red-100 text-red-700 border border-red-400 p-4 rounded-lg">
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Impossible de récupérer les événements.
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="w-full overflow-x-auto">
          <div className="flex space-x-4 p-2">
            {events.map((event) => (
              <div key={event.id} className="shrink-0">
                <EventCard event={event} />
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

export default PopularEventsCarousel;
