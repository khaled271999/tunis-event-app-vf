import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Props {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  onDelete: (id: number) => void;
}

export default function UserDetailModal({
  user,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'utilisateur</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Select
            value={formData.role}
            onValueChange={(value) => setFormData({ ...formData, role: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Participant">Participant</SelectItem>
              <SelectItem value="Organisateur">Organisateur</SelectItem>
              <SelectItem value="SuperAdmin">Super Admin</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-between gap-2 pt-4">
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(formData.id);
                onClose();
              }}
            >
              Supprimer
            </Button>
            <div className="flex gap-2 ml-auto">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
