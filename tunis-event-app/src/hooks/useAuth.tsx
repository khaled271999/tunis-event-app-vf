import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "../api-sdk-backend";
import type { LoginDto } from "../api-sdk-backend";
import { OpenAPI } from "../api-sdk-backend";

interface TokenPayload {
  sub: string;
  email: string;
  role: "SUPERADMIN" | "ORGANISATEUR" | "PARTICIPANT";
}

interface AuthContextType {
  token: string | null;
  role: TokenPayload["role"] | null;
  login: (dto: LoginDto) => Promise<TokenPayload["role"] | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [role, setRole] = useState<TokenPayload["role"] | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setRole(decoded.role);
      } catch (err) {
        console.error("Erreur de décodage du token :", err);
        logout(); // au cas où le token est invalide
      }
    } else {
      setRole(null);
    }
  }, [token]);

  const login = async (dto: LoginDto): Promise<TokenPayload["role"] | null> => {
    try {
      OpenAPI.BASE = "http://localhost:3000";
      const result = await AuthService.authControllerLogin({
        email: dto.email,
        password: dto.password,
      });
      const accessToken = result.access_token;
      localStorage.setItem("token", accessToken);
      setToken(accessToken);

      const decoded = jwtDecode<TokenPayload>(accessToken);
      return decoded.role;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
