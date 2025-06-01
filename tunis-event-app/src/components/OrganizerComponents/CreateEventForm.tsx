import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { EventsService } from "@/api-sdk-backend";
import { toast } from "sonner";
import { withAuth } from "@/hooks/withAuth"; // ✅ bonne intégration ici

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    date: new Date(),
    place: "",
    description: "",
    tags: "",
    type: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = async () => {
    try {
      const eventPayload = {
        name: formData.name,
        description: formData.description,
        startDate: formData.date.toISOString(),
        endDate: formData.date.toISOString(),
        venue: { place: formData.place },
        tags: formData.tags,
        type: formData.type,
      };

      await withAuth(() =>
        EventsService.eventsControllerCreateEvent(eventPayload)
      );

      toast.success("✅ Événement soumis pour validation !");
      setFormData({
        name: "",
        date: new Date(),
        place: "",
        description: "",
        tags: "",
        type: "",
      });
    } catch (error) {
      console.error("Erreur création événement :", error);
      toast.error("❌ Erreur lors de la création de l'événement");
    }
  };

  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold text-center">Créer un événement</h1>

      <div className="space-y-2">
        <Label>Nom</Label>
        <Input
          placeholder="Nom de l'événement"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Date</Label>
        <Popover open={showCalendar} onOpenChange={setShowCalendar}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(formData.date, "dd MMMM yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => {
                setFormData({ ...formData, date: date ?? new Date() });
                setShowCalendar(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Lieu</Label>
        <Input
          placeholder="Ex : Palais des Congrès"
          value={formData.place}
          onChange={(e) => setFormData({ ...formData, place: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <Input
          placeholder="Ex : Conférence, Atelier..."
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <Input
          placeholder="Ex : technologie, jeunesse"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Décrivez votre événement..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        Soumettre pour validation
      </Button>
    </div>
  );
};

export default CreateEventForm;
