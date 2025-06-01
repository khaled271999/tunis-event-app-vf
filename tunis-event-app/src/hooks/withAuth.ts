import { OpenAPI } from "@/api-sdk-backend";

// ✅ Fonction utilitaire sécurisée avec token pour les appels protégés
export const withAuth = async <T>(callback: () => Promise<T>): Promise<T> => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Utilisateur non connecté.");
  }

  // Injecte temporairement le token dans la configuration d'OpenAPI
  OpenAPI.TOKEN = token;

  return await callback();
};
