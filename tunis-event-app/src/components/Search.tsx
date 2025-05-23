import { Input } from "@/components/ui/input";
import { IonContent, IonIcon, IonItem } from "@ionic/react";
import { search } from "ionicons/icons";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { Event } from "../types/event";
import { fetchWithCache } from "@/lib/fetchWithCache";

export function Search() {
  const [query, setQuery] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showSkeleton) {
      const fetchEvents = async () => {
        try {
          // utilisation de fetchwithcache
          const data = await fetchWithCache("events");
          const validEvents = Array.isArray(data?.data) ? data.data : [];
          setEvents(validEvents);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching events:", error);
          setEvents([]);
          setLoading(false);
        }
      };

      fetchEvents();
    }
  }, [showSkeleton]);

  const filteredEvents = events.filter((event) =>
    event?.name?.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <IonItem className="!bg-transparent !shadow-none !border-none">
        <IonIcon
          icon={search}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"
        />
        <Input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setShowSkeleton(true);
            setLoading(true);
          }}
          onBlur={() => {
            if (!query) {
              setShowSkeleton(false);
            }
          }}
          className="pl-10 w-full"
        />
      </IonItem>
      {showSkeleton && loading && <SkeletonCard />}

      {showSkeleton && !loading && query && (
        <div className="grid gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event?.id || Math.random().toString()}
              event={event}
            />
          ))}
        </div>
      )}
    </div>
  );
}
