import { Capacitor } from "@capacitor/core";

const isNative = Capacitor.isNativePlatform();
const isDev = import.meta.env.MODE === "development";

// Adresse IP de ton PC (pour téléphone Android réel)
const LOCAL_IP = "192.168.100.4";

export const API_BASE_URL = isNative
  ? Capacitor.getPlatform() === "android"
    ? "http://10.0.2.2:3000" // 🎯 Pour ÉMULATEUR Android
    : `http://${LOCAL_IP}:3000` // 📱 Pour téléphone Android réel
  : isDev
  ? "http://localhost:3000" // 💻 Pour navigateur local
  : "https://api.tunis.events"; // 🌍 Pour production
console.log("Platform:", Capacitor.getPlatform());
console.log("Is Native:", isNative);
console.log("API URL:", API_BASE_URL);
