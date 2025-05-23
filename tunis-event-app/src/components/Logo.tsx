import { useTheme } from "@/components/theme-provider";

const Logo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <img
      src={theme === "dark" ? "/assets/logodark.png" : "/assets/logolight.png"}
      alt="Logo"
      style={{ height: "30px", width: "auto" }}
    />
  );
};

export default Logo;
