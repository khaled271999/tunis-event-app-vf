import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertOffline() {
  return (
    <Alert className="bg-yellow-100 border-yellow-500 text-yellow-900">
      <AlertCircle className="h-4 w-4 text-yellow-500" />
      <AlertTitle>Mode hors ligne</AlertTitle>
      <AlertDescription>
        Vous êtes hors ligne. Les événements affichés pourraient ne pas être à
        jour.
      </AlertDescription>
    </Alert>
  );
}
