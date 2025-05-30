import React, { useEffect, useState, useRef } from "react";
import { Geolocation } from "@capacitor/geolocation";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fetchWithCache } from "@/lib/fetchWithCache";
import { Event } from "@/types/event"; // ✅ Assure-toi d'importer l'interface Event

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { fetchCombinedEvents } from "@/services/eventService";

// ✅ Fix pour Leaflet Icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ✅ Définition du type d'événement
interface MapEvent {
  name: string;
  venue: {
    name: string;
    formatted_address: string;
    latitude: number;
    longitude: number;
    rating?: number;
    address_components?: {
      types: string[];
      long_name: string;
      short_name: string;
    }[];
  };
}

interface MapComponentProps {
  event?: MapEvent;
}

const MapComponent: React.FC<MapComponentProps> = ({ event }) => {
  const [events, setEvents] = useState<MapEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<L.Map | null>(null); // ✅ Stocke l'instance de la carte
  const mapContainerRef = useRef<HTMLDivElement | null>(null); // ✅ Stocke le conteneur de la carte

  // ✅ Chargement des événements
  useEffect(() => {
    const fetchEvents = async () => {
      if (!event) {
        try {
          const combinedEvents = await fetchCombinedEvents();
          setEvents(
            combinedEvents
              .filter(
                (e: Event) => e.venue && e.venue.latitude && e.venue.longitude
              )
              .map((e: Event) => ({
                name: e.name,
                venue: {
                  name: e.venue.name ?? "Lieu inconnu",
                  formatted_address:
                    e.venue.formatted_address ?? "Adresse inconnue",
                  latitude: e.venue.latitude,
                  longitude: e.venue.longitude,
                  rating: e.venue.rating ?? 0,
                  address_components: e.venue.address_components ?? [],
                },
              }))
          );
        } catch (error) {
          console.error("❌ Erreur chargement événements:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [event]);

  // ✅ Initialisation de la carte Leaflet
  useEffect(() => {
    const initMap = async () => {
      try {
        if (!mapContainerRef.current) return; // ✅ Vérifie que le conteneur est bien disponible
        if (mapRef.current) return; // ✅ Empêche d'initialiser plusieurs fois la carte

        // 📌 Récupération de la position de l'utilisateur
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;

        // 📌 Création de la carte
        mapRef.current = L.map(mapContainerRef.current).setView(
          [latitude, longitude],
          13
        );

        // 📌 Ajout de la couche OpenStreetMap
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(mapRef.current);

        // 📌 Marqueur pour la position actuelle
        L.marker([latitude, longitude])
          .addTo(mapRef.current)
          .bindPopup("📍 Votre position")
          .openPopup();

        // 📌 Ajout des marqueurs pour les événements
        // 📌 Ajout des marqueurs pour les événements
        if (event) {
          if (event.venue?.latitude && event.venue?.longitude) {
            L.marker([event.venue.latitude, event.venue.longitude])
              .addTo(mapRef.current)
              .bindPopup(
                `<b>${event.name}</b><br/>📍 ${
                  event.venue.formatted_address ?? "Adresse inconnue"
                }`
              )
              .openPopup();
          }
        } else {
          events
            .filter((e) => e.venue && e.venue.latitude && e.venue.longitude)
            .forEach((evt) => {
              L.marker([evt.venue.latitude, evt.venue.longitude])
                .addTo(mapRef.current!)
                .bindPopup(
                  `<b>${evt.name}</b><br/>📍 ${
                    evt.venue.formatted_address ?? "Adresse inconnue"
                  }`
                );
            });
        }
      } catch (error) {
        console.error("❌ Erreur lors de l'initialisation de la carte:", error);
      }
    };

    if (!loading) {
      initMap();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // ✅ Supprime la carte proprement lors du démontage
        mapRef.current = null;
      }
    };
  }, [event, events, loading]);

  return (
    <div
      ref={mapContainerRef} // ✅ Utilise `useRef` pour éviter de recréer le conteneur
      className="rounded-lg overflow-hidden mx-auto w-full max-w-2xl h-[40vh]"
    />
  );
};

export default MapComponent;
