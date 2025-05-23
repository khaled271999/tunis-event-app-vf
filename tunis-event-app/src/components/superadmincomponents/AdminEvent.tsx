import React, { useEffect, useState } from "react";
import AdminEventList from "@/components/superadmincomponents/AdminEventList";
import { Event } from "@/types/event";
import { fetchWithCache } from "@/lib/fetchWithCache";

export default function AdminEvent() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchWithCache("admin-events")
      .then((data) => {
        console.log("DATA REÇUE :", data);
        setEvents(data.data);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des événements :", err)
      );
  }, []);

  return <AdminEventList events={events} />;
}
