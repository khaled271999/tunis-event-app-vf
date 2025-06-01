import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import MyEventDetailModal, { SimpleEvent } from "./MyEventDetailModal";
import { EventsService } from "@/api-sdk-backend";
import { withAuth } from "@/hooks/withAuth";
import { toast } from "sonner";

interface Event {
  id: string;
  name: string;
  status: "approved" | "pending" | "rejected" | "canceled";
  startDate: string;
}

const adaptToSimpleEvent = (event: Event): SimpleEvent => ({
  id: event.id,
  title: event.name,
  date: event.startDate,
  status: event.status,
});

const adaptToFullEvent = (simple: SimpleEvent): Event => ({
  id: simple.id,
  name: simple.title,
  startDate: simple.date,
  status: simple.status,
});

const OrganizerEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    withAuth(() => EventsService.eventsControllerGetMyEvents())
      .then((data: Event[]) => setEvents(data))
      .catch((err: any) =>
        toast.error("Erreur lors du chargement des événements")
      );
  }, []);

  const handleSave = async (updated: SimpleEvent) => {
    const newEvent = adaptToFullEvent(updated);
    try {
      await withAuth(() =>
        EventsService.eventsControllerUpdateEvent(newEvent.id, newEvent)
      );
      setEvents((prev) =>
        prev.map((e) => (e.id === newEvent.id ? newEvent : e))
      );
      toast.success("Événement mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      toast.error("Échec de la mise à jour");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await withAuth(() => EventsService.eventsControllerDeleteMyEvent(id));
      setEvents((prev) => prev.filter((e) => e.id !== id));
      toast.success("Événement supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      toast.error("Échec de la suppression");
    }
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
              <TableCell className="font-medium">{event.name}</TableCell>
              <TableCell>
                {new Date(event.startDate).toLocaleDateString()}
              </TableCell>
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

      <MyEventDetailModal
        event={selectedEvent ? adaptToSimpleEvent(selectedEvent) : null}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OrganizerEvents;
