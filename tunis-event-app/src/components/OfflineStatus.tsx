import React, { useEffect, useState } from "react";
import { Network } from "@capacitor/network";
import { AlertOffline } from "./AlertOffline";

const OfflineStatus: React.FC = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      const status = await Network.getStatus();
      setIsOffline(!status.connected);
    };

    checkNetworkStatus();

    const handleOnline = () => {
      console.log("Back online!");
      setIsOffline(false);
    };

    const handleOffline = () => {
      console.log("You are offline.");
      setIsOffline(true);
    };

    Network.addListener("networkStatusChange", (status) => {
      setIsOffline(!status.connected);
    });

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      Network.removeAllListeners();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return <AlertOffline />;
};

export default OfflineStatus;
