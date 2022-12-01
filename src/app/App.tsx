import { Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { bicycle, person, settings } from "ionicons/icons";
import BikesListPage from "../modules/settings/pages/SettingsPage";
import AccountPage from "../modules/account/pages/AccountPage";
import SettingsPage from "../modules/settings/pages/SettingsPage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { RouteEnum } from "../common/models/RouteEnum";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path={RouteEnum.BIKES}>
            <BikesListPage />
          </Route>
          <Route path={RouteEnum.ACCOUNT}>
            <AccountPage />
          </Route>
          <Route path={RouteEnum.SETTINGS}>
            <SettingsPage />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="bikes" href={RouteEnum.BIKES}>
            <IonIcon icon={bicycle} />
            <IonLabel>Bikes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href={RouteEnum.ACCOUNT}>
            <IonIcon icon={person} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href={RouteEnum.SETTINGS}>
            <IonIcon icon={settings} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
