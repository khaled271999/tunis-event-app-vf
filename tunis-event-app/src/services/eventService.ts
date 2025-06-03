import axios from "axios";
import api from "@/lib/apiClient";
import { OpenAPI } from "@/api-sdk-backend/core/OpenAPI";
import { EventsService } from "@/api-sdk-backend/services/EventsService";
import { PublicEventsService } from "@/api-sdk-backend";
import { API_BASE_URL } from "../config";

OpenAPI.BASE = API_BASE_URL;
console.log("📡 API_BASE_URL utilisé par OpenAPI:", API_BASE_URL);

export const fetchCombinedEvents = async () => {
  try {
    const responsePublic = await fetch(
      "https://api.tunis.events/public/events"
    );
    const publicEvents = await responsePublic.json();

    const localEvents =
      await PublicEventsService.publicEventsControllerGetApprovedEvents();

    const allEvents = [...publicEvents, ...localEvents];

    // ✅ Tri par date de début
    allEvents.sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    return allEvents;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des événements combinés",
      error
    );
    throw error;
  }
};
