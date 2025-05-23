import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import UserDetailModal from "./UserDetailModal";
import { useToast } from "@/hooks/use-toast";
import UserAddModal from "./UserAddModal";

const users = [
  { id: 1, name: "Jean Dupont", email: "jean@email.com", role: "Organisateur" },
  {
    id: 2,
    name: "Sophie Martin",
    email: "sophie@email.com",
    role: "Participant",
  },
];

export default function AdminUserManagement() {
  const [userList, setUserList] = useState(users);
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleUserSave = (updatedUser: (typeof users)[0]) => {
    const updatedList = userList.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUserList(updatedList);

    toast({
      title: "Utilisateur modifié",
      description: `${updatedUser.name} a été mis à jour.`,
    });
  };
  const handleAddUser = (user: {
    name: string;
    email: string;
    role: string;
  }) => {
    const newUser = {
      id: Date.now(), // simple ID unique
      ...user,
    };
    setUserList((prev) => [...prev, newUser]);
    toast({
      title: "Utilisateur ajouté",
      description: `${user.name} a été ajouté avec succès.`,
    });
  };

  const handleUserDelete = (id: number) => {
    const updatedList = userList.filter((user) => user.id !== id);
    setUserList(updatedList);

    toast({
      title: "Utilisateur supprimé",
      description: `L'utilisateur a été supprimé avec succès.`,
    });
  };

  return (
    <div className="w-full p-4 space-y-4">
      <h1 className="text-xl font-bold">Gestion des utilisateurs</h1>

      <div className="flex justify-end">
        <Button onClick={() => setIsAddModalOpen(true)}>
          Ajouter un utilisateur
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Rôle</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user) => (
            <TableRow
              key={user.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => {
                setSelectedUser(user);
                setIsModalOpen(true);
              }}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <UserDetailModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleUserSave}
        onDelete={handleUserDelete}
      />
      <UserAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddUser}
      />
    </div>
  );
}
