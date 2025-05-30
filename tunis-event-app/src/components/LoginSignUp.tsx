import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  AuthService,
  OpenAPI,
  RegisterOrganisateurDto,
} from "@/api-sdk-backend";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OfflineStatus from "./OfflineStatus";
import { API_BASE_URL } from "@/config";

OpenAPI.BASE = API_BASE_URL;
console.log("✅ OpenAPI.BASE =", OpenAPI.BASE);
export function LoginSignUp() {
  const { login } = useAuth();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupRole, setSignupRole] = useState<RegisterOrganisateurDto.role>(
    RegisterOrganisateurDto.role.PARTICIPANT
  );
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [signupOrgName, setSignupOrgName] = useState("");
  const [signupOrgDesc, setSignupOrgDesc] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const handleLogin = async () => {
    setLoginError("");
    try {
      const role = await login({ email, password });
      if (!role) {
        setLoginError("Identifiants invalides");
        return;
      }

      switch (role) {
        case "SUPERADMIN":
          history.push("/");
          break;
        case "ORGANISATEUR":
          history.push("/");
          break;
        case "PARTICIPANT":
          history.push("/");
          break;
        default:
          history.push("/");
      }
    } catch (err) {
      setLoginError("Erreur de connexion.");
      console.error(err);
    }
  };

  const handleSignup = async () => {
    setSignupError("");
    setSignupSuccess("");

    if (signupPassword !== signupConfirm) {
      setSignupError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      if (signupRole === RegisterOrganisateurDto.role.ORGANISATEUR) {
        await AuthService.authControllerRegisterOrganisateur({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          orgName: signupOrgName,
          orgDescription: signupOrgDesc,
          role: signupRole,
        });
      } else {
        await AuthService.authControllerRegister({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
          role: signupRole,
        });
      }

      setSignupSuccess("Inscription réussie !");
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setSignupConfirm("");
      setSignupOrgName("");
      setSignupOrgDesc("");
    } catch (error) {
      console.error(error);
      setSignupError("Erreur lors de l'inscription.");
    }
  };

  return (
    <>
      <OfflineStatus />
      <div className="flex justify-center px-4 pt-8 pb-16">
        <Tabs defaultValue="account" className="w-full max-w-sm space-y-6">
          <TabsList className="grid grid-cols-2 bg-white/70 backdrop-blur-lg rounded-full shadow p-1">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-full transition text-sm"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-full transition text-sm"
            >
              Sign up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="bg-white/70 backdrop-blur-lg rounded-2xl shadow border-none">
              <CardHeader>
                <CardTitle className="text-center text-lg">
                  Se connecter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="login-email">E-mail</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Mot de passe</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {loginError && (
                  <p className="text-red-500 text-sm">{loginError}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleLogin}>
                  Connexion
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card className="bg-white/70 backdrop-blur-lg rounded-2xl shadow border-none">
              <CardHeader>
                <CardTitle className="text-center text-lg">
                  Créer un compte
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="signup-role">Rôle</Label>
                  <select
                    value={signupRole}
                    onChange={(e) =>
                      setSignupRole(
                        e.target.value as RegisterOrganisateurDto.role
                      )
                    }
                    className="w-full rounded-lg p-2 border"
                  >
                    <option value="PARTICIPANT">Participant</option>
                    <option value="ORGANISATEUR">Organisateur</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label>Nom</Label>
                  <Input
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-1">
                    <Label>Mot de passe</Label>
                    <Input
                      type="password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Confirmation</Label>
                    <Input
                      type="password"
                      value={signupConfirm}
                      onChange={(e) => setSignupConfirm(e.target.value)}
                    />
                  </div>
                </div>

                {signupRole === RegisterOrganisateurDto.role.ORGANISATEUR && (
                  <>
                    <div className="space-y-1">
                      <Label>Nom de l'organisation</Label>
                      <Input
                        value={signupOrgName}
                        onChange={(e) => setSignupOrgName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Description</Label>
                      <Input
                        value={signupOrgDesc}
                        onChange={(e) => setSignupOrgDesc(e.target.value)}
                      />
                    </div>
                  </>
                )}

                {signupError && (
                  <p className="text-red-500 text-sm">{signupError}</p>
                )}
                {signupSuccess && (
                  <p className="text-green-600 text-sm">{signupSuccess}</p>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSignup}>
                  S'inscrire
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
