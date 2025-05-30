import { OpenAPI } from "@/api-sdk-backend/core/OpenAPI";
import { API_BASE_URL } from "@/config"; // 👈 chemin à adapter si besoin

import { AuthService } from "@/api-sdk-backend/services/AuthService";
import { EventsService } from "@/api-sdk-backend/services/EventsService";
import { OrganizationService } from "@/api-sdk-backend/services/OrganizationService";
import { ProfileService } from "@/api-sdk-backend/services/ProfileService";
import { SuperAdminService } from "@/api-sdk-backend/services/SuperAdminService";

// ✅ Définir dynamiquement selon plateforme (mobile vs navigateur)
OpenAPI.BASE = API_BASE_URL;

// ✅ Setter optionnel pour le token
export const setAuthToken = (token: string) => {
  OpenAPI.TOKEN = token;
};

// ✅ Export regroupé
export default {
  AuthService,
  EventsService,
  OrganizationService,
  ProfileService,
  SuperAdminService,
};

export {
  AuthService,
  EventsService,
  OrganizationService,
  ProfileService,
  SuperAdminService,
};
