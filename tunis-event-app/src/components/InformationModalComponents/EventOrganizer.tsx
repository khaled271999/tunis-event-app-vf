import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrganizerEventList from "../OrganizerEventList";
import { extractFormattedText } from "@/lib/extractFormattedText";

// ✅ Fonction pour calculer "Since X days / Since X months"
const formatSinceDate = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - createdDate.getTime();
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths > 0) {
    return `Since ${diffInMonths} month${diffInMonths > 1 ? "s" : ""}`;
  }
  return `Since ${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
};

interface EventOrganizerProps {
  organization: {
    id: string;
    name: string;
    description: string | null;
    image?: { filename: string };
    createdAt: string;
  };
}

const EventOrganizer: React.FC<EventOrganizerProps> = ({ organization }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setModalOpen(true)}
        className="w-full max-w-2xl mx-auto p-4 cursor-pointer shadow-sm rounded-xl"
      >
        {/* ✅ Ligne horizontale avec image + texte */}
        <div className="flex items-center space-x-4">
          {/* Image */}
          {organization.image ? (
            <img
              src={`https://api.tunis.events/storage/${organization.image.filename}`}
              alt={organization.name}
              className="w-12 h-12 rounded-full object-cover border border-gray-300 shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">?</span>
            </div>
          )}

          {/* Nom + Since */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-black">
              {organization.name}
            </span>
            <span className="text-xs text-gray-500">
              {formatSinceDate(organization.createdAt)}
            </span>
          </div>
        </div>

        {/* ✅ Description en dessous */}
        <div className="mt-3 text-left text-sm text-gray-700 leading-relaxed">
          {organization.description ? (
            extractFormattedText(
              organization.description,
              "Cet organisateur n’a pas encore ajouté de description."
            )
          ) : (
            <p className="italic text-gray-500">
              Cet organisateur n’a pas encore ajouté de description.
            </p>
          )}
        </div>

        {/* ✅ Modal si besoin */}
        <OrganizerEventList
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          organizerId={organization.id}
        />
      </Card>

      {/* ✅ Modal pour afficher les événements */}
      <OrganizerEventList
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        organizerId={organization.id}
      />
    </>
  );
};

export default EventOrganizer;
