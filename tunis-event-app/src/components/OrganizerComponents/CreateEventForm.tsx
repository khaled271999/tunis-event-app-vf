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

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    place: "",
    description: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = () => {
    const eventData = {
      ...formData,
      status: "pending",
    };
    console.log("🎯 Nouvel événement :", eventData);
    alert("Événement soumis !");
  };

  return (
    <div className="p-4 space-y-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold text-center">Créer un événement</h1>

      <div className="space-y-2">
        <Label>Titre</Label>
        <Input
          placeholder="Titre de l'événement"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              {formData.date
                ? format(formData.date, "dd MMMM yyyy")
                : "Choisir une date"}
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
          placeholder="Ex : Palais des congrès"
          value={formData.place}
          onChange={(e) => setFormData({ ...formData, place: e.target.value })}
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
