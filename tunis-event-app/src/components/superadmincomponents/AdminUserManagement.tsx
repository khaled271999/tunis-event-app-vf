import { useEffect, useState } from "react";
import { UsersService } from "@/api-sdk-backend/services/UsersService";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UserDto } from "@/api-sdk-backend/models/UserDto";
import UserDetailModal from "./UserDetailModal";

interface Props {
  openAddUserModal: () => void;
}

export default function AdminUserManagement({ openAddUserModal }: Props) {
  const [usersDto, setUsersDto] = useState<UserDto[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>(""); // "" = tous

  const fetchUsers = async () => {
    try {
      const data = await UsersService.usersControllerFindAll();
      setUsersDto(data);
    } catch (e) {
      console.error(e);
      toast.error("Erreur lors du chargement des utilisateurs");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers =
    selectedRole === "ALL" || selectedRole === ""
      ? usersDto
      : usersDto.filter((user) => user.role === selectedRole);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-xl font-bold">Gestion des utilisateurs</h2>

      <div className="flex justify-between items-center">
        <Select onValueChange={(value) => setSelectedRole(value)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrer par rôle" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tous</SelectItem>
            <SelectItem value="SUPERADMIN">Superadmin</SelectItem>
            <SelectItem value="ORGANISATEUR">Organisateur</SelectItem>
            <SelectItem value="PARTICIPANT">Participant</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={openAddUserModal}>Ajouter un utilisateur</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Nom</TableCell>
            <TableCell>Rôle</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user.id}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedUser(user)}
            >
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={() => {
            setSelectedUser(null);
            fetchUsers();
          }}
          onDelete={() => {
            setSelectedUser(null);
            fetchUsers();
          }}
        />
      )}
    </div>
  );
}
