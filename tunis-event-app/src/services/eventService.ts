import axios from "axios";
import api from "@/lib/apiClient";
import { OpenAPI } from "@/api-sdk-backend/core/OpenAPI";
import { EventsService } from "@/api-sdk-backend/services/EventsService";
import { PublicEventsService } from "@/api-sdk-backend";
import { API_BASE_URL } from "../config";

OpenAPI.BASE = API_BASE_URL;
export const fetchCombinedEvents = async () => {
  try {
    // 🔹 Données publiques
    const responsePublic = await fetch(
      "https://api.tunis.events/public/events"
    );
    const publicEvents = await responsePublic.json();

    // 🔸 Données locales (via SDK)
    const localEvents =
      await PublicEventsService.publicEventsControllerGetApprovedEvents();

    // 🔄 Fusion
    return [...publicEvents, ...localEvents];
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des événements combinés",
      error
    );
    throw error;
  }
};
