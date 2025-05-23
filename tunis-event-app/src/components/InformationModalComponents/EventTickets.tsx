import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventTicketsProps {
  eventId: string; // ✅ ID de l'événement pour créer le lien dynamique
}

const EventTickets: React.FC<EventTicketsProps> = ({ eventId }) => {
  const eventUrl = `https://tunis.events/fr/events/${eventId}`;

  return (
    <Card className="bg-card border border-gray-700 shadow-lg p-6 rounded-2xl space-y-4 w-full max-w-lg mx-auto">
      <h2 className="text-lg font-bold px-2">Obtenir l'accès</h2>

      {/* 🎨 Bouton de redirection vers l'événement spécifique */}
      <Button
        className="w-full bg-black text-white hover:bg-gray-800 transition text-lg py-3"
        onClick={() => window.open(eventUrl, "_blank")}
      >
        Réservez en ligne
      </Button>
    </Card>
  );
};

export default EventTickets;
