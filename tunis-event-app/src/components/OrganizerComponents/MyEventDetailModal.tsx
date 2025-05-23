import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

// Définir un type simple pour l'événement (local, pas le type global Event complet)
interface SimpleEvent {
  id: string;
  title: string;
  date: string;
  status: "approved" | "pending" | "rejected" | "canceled";
}

interface Props {
  event: SimpleEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: SimpleEvent) => void;
  onDelete: (id: string) => void;
}

const MyEventDetailModal = ({
  event,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: Props) => {
  const [formData, setFormData] = useState<SimpleEvent | null>(null);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'événement</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Titre</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="destructive"
            onClick={() => {
              onDelete(formData.id);
              onClose();
            }}
          >
            Supprimer
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              onClick={() => {
                onSave(formData);
                onClose();
              }}
            >
              Enregistrer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyEventDetailModal;
