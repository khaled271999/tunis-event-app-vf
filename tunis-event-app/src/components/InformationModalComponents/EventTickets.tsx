import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useIonRouter } from "@ionic/react";
import { withAuth } from "@/hooks/withAuth";
import { ParticipantService } from "@/api-sdk-backend";
import { toast } from "sonner";

interface EventTicketsProps {
  eventId: string;
}

const EventTickets: React.FC<EventTicketsProps> = ({ eventId }) => {
  const { user } = useAuth();
  const router = useIonRouter();
  const [isParticipating, setIsParticipating] = useState<boolean | null>(null); // null = en chargement

  useEffect(() => {
    if (!user) return;

    const fetchParticipation = async () => {
      try {
        const userEvents: { id: string }[] = await withAuth(() =>
          ParticipantService.participantControllerGetMyEvents()
        );

        const isEnrolled = userEvents.some((event) => event.id === eventId);
        setIsParticipating(isEnrolled);
      } catch (error) {
        console.error("Erreur lors du chargement des participations :", error);
        setIsParticipating(false);
      }
    };

    fetchParticipation();
  }, [eventId, user]);

  const handleParticipation = async () => {
    if (!user) {
      router.push("/loginsignup", "forward");
      return;
    }

    try {
      if (isParticipating) {
        await withAuth(() =>
          ParticipantService.participantControllerCancelParticipation(eventId)
        );
        toast.success("Désinscription réussie");
        setIsParticipating(false);
      } else {
        await withAuth(() =>
          ParticipantService.participantControllerCreateParticipation({
            eventId,
          })
        );
        toast.success("Inscription réussie");
        setIsParticipating(true);
      }
    } catch (error: any) {
      console.error("Erreur d’inscription/désinscription :", error);
      toast.error(
        error?.body?.message || "Échec de l’opération de participation"
      );
    }
  };

  if (user?.role === "SUPERADMIN" || user?.role === "ORGANISATEUR") return null;

  return (
    <Card className="bg-card border border-gray-700 shadow-lg p-6 rounded-2xl space-y-4 w-full max-w-lg mx-auto">
      <h2 className="text-lg font-bold px-2">Obtenir l'accès</h2>

      <Button
        className="w-full bg-primary text-white hover:bg-primary/90 transition text-lg py-3"
        onClick={handleParticipation}
        disabled={isParticipating === null}
      >
        {isParticipating === null
          ? "Chargement..."
          : isParticipating
          ? "Se désinscrire"
          : "S'inscrire"}
      </Button>
    </Card>
  );
};

export default EventTickets;
