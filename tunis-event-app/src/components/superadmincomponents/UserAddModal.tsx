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
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (user: any) => void; // adapt if needed
}

export default function UserAddModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PARTICIPANT",
    orgName: "",
    orgDescription: "",
  });

  const handleAdd = async () => {
    const { name, email, password, role, orgName, orgDescription } = formData;
    if (!name || !email || !password || !role) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    const user: any = { name, email, password, role };
    if (role === "ORGANISATEUR") {
      user.orgName = orgName;
      user.orgDescription = orgDescription;
    }

    try {
      await onAdd(user); // doit être async
      toast.success("Utilisateur ajouté avec succès");
      onClose();
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "PARTICIPANT",
        orgName: "",
        orgDescription: "",
      });
    } catch (error: any) {
      toast.error("Échec de l’ajout de l’utilisateur");
      console.error("Erreur pendant onAdd:", error);
    }
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
          <Input
            type="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
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
              <SelectItem value="PARTICIPANT">Participant</SelectItem>
              <SelectItem value="ORGANISATEUR">Organisateur</SelectItem>
              <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
            </SelectContent>
          </Select>

          {formData.role === "ORGANISATEUR" && (
            <>
              <Input
                placeholder="Nom de l'organisation"
                value={formData.orgName}
                onChange={(e) =>
                  setFormData({ ...formData, orgName: e.target.value })
                }
              />
              <Input
                placeholder="Description (facultative)"
                value={formData.orgDescription}
                onChange={(e) =>
                  setFormData({ ...formData, orgDescription: e.target.value })
                }
              />
            </>
          )}

          <div className="flex justify-end pt-4">
            <Button onClick={handleAdd}>Ajouter</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
