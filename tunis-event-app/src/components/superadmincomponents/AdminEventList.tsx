import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/event";
import EventDetailModal from "./EventDetailModal";
import { EventsService } from "@/api-sdk-backend";
import { withAuth } from "@/hooks/withAuth";
import { toast } from "sonner";

interface AdminEventListProps {
  events: Event[];
  onUpdate: (events: Event[]) => void;
}

const AdminEventList: React.FC<AdminEventListProps> = ({
  events,
  onUpdate,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApprove = async (id: string) => {
    try {
      await withAuth(() => EventsService.eventsControllerApproveEvent(id));
      const updated = events.map((e) =>
        e.id === id ? { ...e, status: "approved" as "approved" } : e
      );
      onUpdate(updated);
      toast.success("✅ Événement approuvé");
    } catch (err) {
      toast.error("❌ Erreur approbation événement");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await withAuth(() => EventsService.eventsControllerRejectEvent(id));
      const updated = events.map((e) =>
        e.id === id ? { ...e, status: "rejected" as "rejected" } : e
      );
      onUpdate(updated);
      toast.success("⛔ Événement rejeté");
    } catch (err) {
      toast.error("❌ Erreur rejet événement");
    }
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
        onApprove={(id) => handleApprove(id)}
        onReject={(id) => handleReject(id)}
      />
    </div>
  );
};

export default AdminEventList;
