import React from "react";
import { IonIcon } from "@ionic/react";
import { timeOutline, arrowForwardOutline } from "ionicons/icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface EventDateProps {
  startDate: string;
  endDate: string;
  name: string;
  venue: {
    name: string;
  };
}

const EventDate: React.FC<EventDateProps> = ({
  startDate,
  endDate,
  name,
  venue,
}) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const isSameDay =
    start.getDate() === end.getDate() &&
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card className="bg-card border border-gray-700 shadow-lg p-4 sm:p-5 md:p-6 rounded-lg flex items-center space-x-4 w-full max-w-lg mx-auto cursor-pointer">
          {/* Badge Date */}
          <div className="flex flex-col items-center justify-center">
            <Badge className="bg-gray-900/50 text-white p-2 rounded-md flex flex-col items-center w-16">
              <span className="text-xs uppercase">
                {start
                  .toLocaleDateString("fr-FR", { month: "short" })
                  .toUpperCase()}
              </span>
              <span className="text-lg font-bold">{start.getDate()}</span>
            </Badge>
          </div>

          {/* Infos Date */}
          <div className="flex flex-col flex-1">
            <p className="text-lg font-semibold">
              {start.toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
            <p className="text-muted-foreground flex items-center space-x-2">
              <span>
                {start.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <span>→</span>
              <span>
                {end.toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {!isSameDay && (
                <>
                  <IonIcon
                    icon={timeOutline}
                    className="text-primary w-4 h-4"
                  />
                  <span>
                    {end.toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </>
              )}
            </p>
          </div>
          <IonIcon
            icon={arrowForwardOutline}
            className="text-primary w-5 h-5 transform rotate-[-45deg]"
          />
        </Card>
      </DrawerTrigger>

      {/* 📌 DrawerContent pour afficher les options de calendrier */}
      <DrawerContent className="p-6 space-y-4">
        <VisuallyHidden>
          <DrawerTitle>Event Calendar Options</DrawerTitle>
        </VisuallyHidden>
        <h2 className="text-lg font-semibold">
          Ajouter cet événement à votre calendrier
        </h2>
        <p className="text-muted-foreground">
          Choisissez votre type de calendrier :
        </p>

        {/* Google Calendar */}
        <Button
          variant="default"
          onClick={() =>
            window.open(
              `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                name
              )}&dates=${start.toISOString().replace(/-|:|\.\d+/g, "")}/${end
                .toISOString()
                .replace(/-|:|\.\d+/g, "")}&location=${encodeURIComponent(
                venue.name
              )}`,
              "_blank"
            )
          }
        >
          Google Calendar
        </Button>

        {/* Yahoo Calendar */}
        <Button
          variant="default"
          onClick={() =>
            window.open(
              `https://calendar.yahoo.com/?v=60&title=${encodeURIComponent(
                name
              )}&st=${start
                .toISOString()
                .replace(/-|:|\.\d+/g, "")}&in_loc=${encodeURIComponent(
                venue.name
              )}`,
              "_blank"
            )
          }
        >
          Yahoo Calendar
        </Button>

        {/* Outlook Calendar */}
        <Button
          variant="default"
          onClick={() =>
            window.open(
              `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
                name
              )}&startdt=${start
                .toISOString()
                .replace(/-|:|\.\d+/g, "")}&location=${encodeURIComponent(
                venue.name
              )}`,
              "_blank"
            )
          }
        >
          Office 360 Calendar
        </Button>

        {/* iCal */}
        <Button
          variant="default"
          onClick={() => {
            const icsData = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${name}
DTSTART:${start.toISOString().replace(/-|:|\.\d+/g, "")}
DTEND:${end.toISOString().replace(/-|:|\.\d+/g, "")}
LOCATION:${venue.name}
END:VEVENT
END:VCALENDAR
`;
            const blob = new Blob([icsData], { type: "text/calendar" });
            const url = URL.createObjectURL(blob);
            window.open(url);
          }}
        >
          iCal
        </Button>
      </DrawerContent>
    </Drawer>
  );
};

export default EventDate;
