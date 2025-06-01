import { useEffect, useState } from "react";
import { Event } from "@/types/event";
import { EventsService } from "@/api-sdk-backend";
import { withAuth } from "@/hooks/withAuth";
import AdminEventList from "@/components/superadmincomponents/AdminEventList";

export default function AdminEvent() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await withAuth(() =>
          EventsService.eventsControllerGetAllEvents()
        );
        setEvents(data);
      } catch (err) {
        console.error("Erreur lors du chargement des événements :", err);
      }
    };

    fetchEvents();
  }, []);

  return (
    <AdminEventList
      events={events}
      onUpdate={(updatedEvents) => setEvents(updatedEvents)}
    />
  );
}
