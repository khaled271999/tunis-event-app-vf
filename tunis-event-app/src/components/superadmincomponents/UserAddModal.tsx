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
import React, { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: { name: string; email: string; role: string }) => void;
}

export default function UserAddModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Participant",
  });

  const handleAdd = () => {
    if (!formData.name || !formData.email || !formData.role) return;
    onAdd(formData);
    onClose();
    setFormData({ name: "", email: "", role: "Participant" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un utilisateur</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
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
          <div className="flex justify-end pt-4">
            <Button onClick={handleAdd}>Ajouter</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
