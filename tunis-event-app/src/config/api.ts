import { OpenAPI } from "@/api-sdk-backend";

// Choix dynamique selon l'environnement
const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000" // 👨‍💻 local dev
    : "https://api.monsite.com"; // 🌍 prod API

OpenAPI.BASE = baseURL;
