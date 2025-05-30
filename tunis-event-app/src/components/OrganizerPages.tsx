import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const OrganizerPages = () => {
  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Mes événements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>OrganizerEvents</p>
          <p>MyEventDetailModal</p>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Créer un événement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>CreateEventForm</p>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Dashboard organisateur</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>OrganizerDashboard</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizerPages;
