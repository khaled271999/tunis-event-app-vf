import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./components/theme-provider";
import { AuthProvider } from "./hooks/useAuth";
import { API_BASE_URL } from "./config";

const container = document.getElementById("root");
const root = createRoot(container!);

console.log("🌐 API_BASE_URL actif :", API_BASE_URL);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
