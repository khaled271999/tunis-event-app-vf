import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";
import { Badge } from "@/components/ui/badge";

interface Props {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (eventId: string) => void;
  onReject: (eventId: string) => void;
}

export default function EventDetailModal({
  event,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: Props) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Détail de l'événement</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Titre :</strong> {event.name}
          </p>
          <p>
            <strong>Date :</strong> {new Date(event.startDate).toLocaleString()}
          </p>
          <p>
            <strong>Lieu :</strong> {event.venue?.name ?? "Non spécifié"}
          </p>
          <p>
            <strong>Statut :</strong>{" "}
            <Badge>{event.status ?? "En attente"}</Badge>
          </p>
        </div>
        <div className="flex justify-between pt-4">
          <Button
            variant="destructive"
            onClick={() => {
              onReject(event.id);
              onClose();
            }}
          >
            Rejeter
          </Button>
          <Button
            onClick={() => {
              onApprove(event.id);
              onClose();
            }}
          >
            Approuver
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
