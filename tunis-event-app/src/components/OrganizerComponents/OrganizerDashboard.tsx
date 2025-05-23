import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIonRouter } from "@ionic/react";

const OrganizerDashboard = () => {
  const navigate = useIonRouter();

  // 🔁 Mock des événements
  const events = [
    { id: "1", name: "Salon des métiers", status: "approved" },
    { id: "2", name: "Atelier UX", status: "pending" },
    { id: "3", name: "Conférence IA", status: "rejected" },
    { id: "4", name: "Expo Tech", status: "approved" },
    { id: "5", name: "Hackathon Étudiant", status: "pending" },
    { id: "6", name: "Réseautage Startup", status: "approved" },
  ];

  // Calculs dynamiques
  const approved = events.filter((e) => e.status === "approved").length;
  const pending = events.filter((e) => e.status === "pending").length;
  const rejected = events.filter((e) => e.status === "rejected").length;

  // Modale
  const [filteredStatus, setFilteredStatus] = useState<
    "approved" | "pending" | "rejected" | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (status: "approved" | "pending" | "rejected") => {
    setFilteredStatus(status);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-bold">Tableau de bord</h1>

      {/* Résumé cliquable */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          onClick={() => handleCardClick("approved")}
          className="cursor-pointer hover:shadow-lg transition"
        >
          <CardHeader>
            <CardTitle>Validés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">{approved}</p>
          </CardContent>
        </Card>
        <Card
          onClick={() => handleCardClick("pending")}
          className="cursor-pointer hover:shadow-lg transition"
        >
          <CardHeader>
            <CardTitle>En attente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-yellow-600">{pending}</p>
          </CardContent>
        </Card>
        <Card
          onClick={() => handleCardClick("rejected")}
          className="cursor-pointer hover:shadow-lg transition"
        >
          <CardHeader>
            <CardTitle>Rejetés</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-red-600">{rejected}</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          className="w-full sm:w-auto"
          onClick={() => navigate.push("/organizer/events/create")}
        >
          ➕ Créer un événement
        </Button>
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => navigate.push("/organizer/events")}
        >
          👁️ Voir mes événements
        </Button>
      </div>

      {/* Modale filtrée */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Événements{" "}
              {filteredStatus === "approved"
                ? "validés"
                : filteredStatus === "pending"
                ? "en attente"
                : "rejetés"}
            </DialogTitle>
          </DialogHeader>
          <ul className="mt-4 space-y-2">
            {events
              .filter((e) => e.status === filteredStatus)
              .map((event) => (
                <li
                  key={event.id}
                  className="text-sm border p-2 rounded shadow-sm"
                >
                  {event.name}
                </li>
              ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizerDashboard;
