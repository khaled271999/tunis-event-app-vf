import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "../api-sdk-backend";
import type { LoginDto } from "../api-sdk-backend";
import { OpenAPI } from "../api-sdk-backend";
import { API_BASE_URL } from "../config";

interface TokenPayload {
  sub: string;
  email: string;
  role: "SUPERADMIN" | "ORGANISATEUR" | "PARTICIPANT";
}

type User = {
  userId: string;
  email: string;
  role: TokenPayload["role"];
};

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (dto: LoginDto) => Promise<TokenPayload["role"] | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUser({
          userId: decoded.sub,
          email: decoded.email,
          role: decoded.role,
        });
      } catch (err) {
        console.error("Erreur de décodage du token :", err);
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);
  useEffect(() => {
    OpenAPI.BASE = API_BASE_URL;
    console.log("✅ OpenAPI.BASE =", OpenAPI.BASE);
  }, []);

  const login = async (dto: LoginDto): Promise<TokenPayload["role"] | null> => {
    try {
      const result = await AuthService.authControllerLogin({
        email: dto.email,
        password: dto.password,
      });

      const accessToken = result.access_token;
      localStorage.setItem("token", accessToken);
      setToken(accessToken);

      const decoded = jwtDecode<TokenPayload>(accessToken);
      setUser({
        userId: decoded.sub,
        email: decoded.email,
        role: decoded.role,
      });

      return decoded.role;
    } catch (error) {
      console.error("Erreur de connexion :", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
