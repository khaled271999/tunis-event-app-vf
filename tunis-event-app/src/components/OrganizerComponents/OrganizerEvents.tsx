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
import { useIonRouter } from "@ionic/react";
import EventDetailModal from "./MyEventDetailModal";

interface Event {
  id: string;
  title: string;
  status: "approved" | "pending" | "rejected" | "canceled";
  date: string;
}

const OrganizerEvents = () => {
  const router = useIonRouter();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = (updated: Event) => {
    const updatedEvents = events.map((e) =>
      e.id === updated.id ? updated : e
    );
    setEvents(updatedEvents);
  };

  const handleDelete = (id: string) => {
    const filtered = events.filter((e) => e.id !== id);
    setEvents(filtered);
  };

  // 🔁 Mock des événements créés par l'utilisateur
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Hackathon 2024",
      status: "approved",
      date: "2024-06-01",
    },
    { id: "2", title: "Atelier UI/UX", status: "pending", date: "2024-06-10" },
    {
      id: "3",
      title: "Conférence Web3",
      status: "rejected",
      date: "2024-06-20",
    },
  ]);

  const handleCancel = (id: string) => {
    const updated = events.map((e) =>
      e.id === id ? { ...e, status: "canceled" as Event["status"] } : e
    );
    setEvents(updated);
  };

  const handleEdit = (id: string) => {
    router.push(`/organizer/events/edit/${id}`, "forward");
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Mes événements</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Titre</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Statut</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow
              key={event.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => {
                setSelectedEvent(event);
                setIsModalOpen(true);
              }}
            >
              <TableCell className="font-medium">{event.title}</TableCell>
              <TableCell>{event.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    event.status === "approved"
                      ? "default"
                      : event.status === "pending"
                      ? "secondary"
                      : event.status === "rejected"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {event.status === "canceled" ? "Annulé" : event.status}
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
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OrganizerEvents;
