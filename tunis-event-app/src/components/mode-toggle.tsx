import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useIonToast } from "@ionic/react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [present] = useIonToast();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="transition-all"
    >
      {theme === "dark" ? (
        <Moon className="h-[1.5rem] w-[1.5rem] text-yellow-400 transition-all" />
      ) : (
        <Sun className="h-[1.5rem] w-[1.5rem] text-gray-800 transition-all" />
      )}
    </Button>
  );
}
