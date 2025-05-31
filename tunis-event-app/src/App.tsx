import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { compass, home, list, logIn, person, settings } from "ionicons/icons";
import Home from "./pages/Home";
import DiscoverPage from "./pages/DiscoverPage";
import Settings from "./pages/Settings";
import Ticket from "./pages/Ticket";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPages";
import AppBackground from "./theme/AppBackground";
import { useAuth } from "./hooks/useAuth";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import OrganizerPage from "./pages/OrganizerPage";
import ParticipantPage from "./pages/ParticipantPage";
import { Toaster } from "sonner";

setupIonicReact();

const App: React.FC = () => {
  const { user } = useAuth();
  console.log("USER DETECTED", user);

  // 🌀 Étape de chargement initial (token en cours de décodage)
  if (user === undefined) {
    return (
      <IonApp>
        <AppBackground blurhash="L-Cuh^nhV@jZ.ToyWEoJx@a$kDoL" />
        <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700">
          Chargement...
        </div>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <Toaster position="top-right" richColors />
      <AppBackground blurhash="L-Cuh^nhV@jZ.ToyWEoJx@a$kDoL" />
      <IonReactRouter>
        {!user ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/discoverPage" component={DiscoverPage} />
              <Route exact path="/loginsignup" component={LoginPage} />
              <Redirect exact from="/" to="/home" />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="discoverPage" href="/discoverPage">
                <IonIcon icon={compass} />
              </IonTabButton>
              <IonTabButton tab="loginsignup" href="/loginsignup">
                <IonIcon icon={logIn} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : user.role === "SUPERADMIN" ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/discoverPage" component={DiscoverPage} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/adminpage" component={AdminPage} />
              <Redirect exact from="/" to="/settings" />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="discoverPage" href="/discoverPage">
                <IonIcon icon={compass} />
              </IonTabButton>
              <IonTabButton tab="adminpage" href="/adminpage">
                <IonIcon icon={list} />
              </IonTabButton>
              <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={settings} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : user.role === "ORGANISATEUR" ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/discoverPage" component={DiscoverPage} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/OrganizerPage" component={OrganizerPage} />
              <Redirect exact from="/" to="/settings" />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="discoverPage" href="/discoverPage">
                <IonIcon icon={compass} />
              </IonTabButton>
              <IonTabButton tab="OrganizerPage" href="/OrganizerPage">
                <IonIcon icon={list} />
              </IonTabButton>
              <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={settings} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : user.role === "PARTICIPANT" ? (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/discoverPage" component={DiscoverPage} />
              <Route exact path="/settings" component={Settings} />
              <Route
                exact
                path="/ParticipantPage"
                component={ParticipantPage}
              />
              <Redirect exact from="/" to="/settings" />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
              </IonTabButton>
              <IonTabButton tab="discoverPage" href="/discoverPage">
                <IonIcon icon={compass} />
              </IonTabButton>
              <IonTabButton tab="ParticipantPage" href="/ParticipantPage">
                <IonIcon icon={list} />
              </IonTabButton>
              <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={settings} />
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        ) : (
          <div className="p-6 text-center text-lg text-gray-600">
            Rôle non géré pour le moment.
          </div>
        )}
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
