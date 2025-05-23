import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Abonner() {
  return (
    <div className="text-center px-4 mt-8">
      <h2 className="text-lg font-bold text-black">S'abonner</h2>
      <p className="text-gray-600 text-sm mb-4">
        Découvrez les événements tendance à Tunis et soyez informé lors de la
        création de nouveaux événements.
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 bg-black text-white w-full rounded-full py-3 text-sm font-semibold">
            S'abonner
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <VisuallyHidden>
            <DialogTitle>S'inscrire à la newsletter</DialogTitle>
          </VisuallyHidden>
          <div className="flex justify-center">
            <img
              src="https://tunis.events/_next/image?url=%2Fillustrations%2Fchromed%2Fchromed-email-marketing-with-commercial-message.png&w=640&q=75"
              alt="Email marketing illustration"
              className="w-40 h-40 object-contain"
            />
          </div>
          <div className="grid gap-4 py-4">
            <p className="text-gray-600 text-sm mb-4">
              Découvrez les événements tendance à Tunis et soyez informé lors de
              la création de nouveaux événements.
            </p>
            <Input
              id="email"
              placeholder="Votre e-mail"
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-black text-white w-full rounded-full"
            >
              S'abonner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
