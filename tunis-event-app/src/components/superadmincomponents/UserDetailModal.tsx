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
import { UserDto } from "@/api-sdk-backend/models/UserDto";
import { UsersService } from "@/api-sdk-backend/services/UsersService";
import { toast } from "sonner";

interface Props {
  user: UserDto;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}
interface UserDtoWithOrg extends UserDto {
  organization?: {
    name?: string;
    subdomain?: string;
    description?: string;
  };
}

export default function UserDetailModal({
  user,
  onClose,
  onUpdate,
  onDelete,
}: Props) {
  const [formData, setFormData] = useState<UserDtoWithOrg>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Token manquant");

    try {
      const { name, email, role, organization } = formData;

      const payload: any = { name, email, role };

      if (role === "ORGANISATEUR") {
        if (!organization?.name)
          return toast.error("Nom de l'organisation requis");

        payload.organization = {
          name: organization.name,
          description: organization.description || "",
        };
      }

      await UsersService.usersControllerUpdate(user.id, payload);
      toast.success("Utilisateur modifié");
      onUpdate();
    } catch (error) {
      console.error(error);
      toast.error("Échec de la modification");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Token manquant");

    try {
      await UsersService.usersControllerRemove(user.id);
      toast.success("Utilisateur supprimé");
      onDelete();
    } catch (error) {
      console.error(error);
      toast.error("Échec de la suppression");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
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
            onValueChange={(value) =>
              setFormData({ ...formData, role: value as UserDto["role"] })
            }
          >
            {formData.role === "ORGANISATEUR" && (
              <>
                <Input
                  placeholder="Nom de l'organisation"
                  value={formData.organization?.name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organization: {
                        ...formData.organization,
                        name: e.target.value,
                      },
                    })
                  }
                />
                <Input
                  placeholder="Description de l'organisation"
                  value={formData.organization?.description || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organization: {
                        ...formData.organization,
                        description: e.target.value,
                      },
                    })
                  }
                />
              </>
            )}

            <SelectTrigger className="w-full">
              <SelectValue placeholder="Rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PARTICIPANT">Participant</SelectItem>
              <SelectItem value="ORGANISATEUR">Organisateur</SelectItem>
              <SelectItem value="SUPERADMIN">Super Admin</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex justify-between gap-2 pt-4">
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
            <div className="flex gap-2 ml-auto">
              <Button variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button onClick={handleSave}>Enregistrer</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
