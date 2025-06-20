// utilisation du Capacitor Storage pour le cache
import { Preferences } from "@capacitor/preferences";
// SDK
import api from "@/lib/apiClient";

const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 heure

export const fetchWithCache = async (key: string) => {
  const cachedData = await Preferences.get({ key });

  if (cachedData.value) {
    const { data, timestamp } = JSON.parse(cachedData.value);
    if (Date.now() - timestamp < CACHE_EXPIRATION) {
      console.log("✅ Données chargées depuis le cache !");
      return data;
    }
  }

  console.log("♻️ Récupération des données depuis l'API via SDK...");

  try {
    const response = await fetch("https://api.tunis.events/public/events");
    const data = await response.json();
    await Preferences.set({
      key,
      value: JSON.stringify({ data, timestamp: Date.now() }),
    });

    return data;
  } catch (error) {
    console.error("❌ Erreur lors de l'appel API:", error);
    throw error;
  }
};
