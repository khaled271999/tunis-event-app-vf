import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIonRouter } from "@ionic/react";

import { EventsService } from "@/api-sdk-backend";
import { withAuth } from "@/hooks/withAuth";

const OrganizerDashboard = () => {
  const navigate = useIonRouter();

  // 🔁 Mock des événements
  const [events, setEvents] = useState<
    { id: string; name: string; status: string }[]
  >([]);

  useEffect(() => {
    withAuth(() => EventsService.eventsControllerGetMyEvents())
      .then((data) => {
        setEvents(data); // tu peux adapter si les noms de champs diffèrent
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des événements :", err)
      );
  }, []);

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
