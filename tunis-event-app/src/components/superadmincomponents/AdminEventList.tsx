import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/types/event";
import EventDetailModal from "./EventDetailModal";

interface AdminEventListProps {
  events: Event[];
}

const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = date.toLocaleString("fr-FR", { month: "short" });
  return `${day} ${month}`.toUpperCase();
};

const AdminEventList: React.FC<AdminEventListProps> = ({ events }) => {
  React.useEffect(() => {
    setEventList(events);
  }, [events]);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventList, setEventList] = useState(events); // local copy for updates

  const handleApprove = (id: string) => {
    const updated = eventList.map((e) =>
      e.id === id ? { ...e, status: "approved" } : e
    ) as Event[]; // ✅ Ajout ici
    setEventList(updated);
  };

  const handleReject = (id: string) => {
    const updated = eventList.map((e) =>
      e.id === id ? { ...e, status: "rejected" } : e
    ) as Event[]; // ✅ Ajout ici
    setEventList(updated);
  };

  return (
    <div className="w-full p-4 space-y-4">
      <h1 className="text-xl font-bold">Gestion des Événements</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Titre</TableCell>

            <TableCell>Statut</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventList.map((event) => (
            <TableRow
              key={event.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => {
                setSelectedEvent(event);
                setIsModalOpen(true);
              }}
            >
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    event.status === "approved"
                      ? "default"
                      : event.status === "rejected"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {event.status ?? "En attente"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AdminEventList;
