import { Capacitor } from "@capacitor/core";

const isNative = Capacitor.isNativePlatform();
const platform = Capacitor.getPlatform();
const isDev = import.meta.env.MODE === "development";

// ✅ IP locale dynamique selon la plateforme
const HOSTNAME = typeof window !== "undefined" ? window.location.hostname : "";

// Détection simple de l’émulateur
const isEmulator = HOSTNAME === "10.0.2.2";

// 🧠 API_BASE_URL intelligent
export const API_BASE_URL =
  isNative && platform === "android"
    ? isEmulator
      ? "http://10.0.2.2:3000" // 🎯 Android émulateur
      : `http://${HOSTNAME}:3000` // 📱 Android réel (IP PC détectée dynamiquement)
    : isDev
    ? "http://localhost:3000" // 💻 Dev en local
    : "https://api.tunis.events"; // 🌍 Prod

console.log("Platform:", platform);
console.log("Native:", isNative);
console.log("API:", API_BASE_URL);
