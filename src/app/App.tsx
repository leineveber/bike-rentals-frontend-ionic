import { Redirect, Route } from "react-router-dom";
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
import BikesListPage from "../modules/bikes-list/pages/BikesListPage";
import UserPage from "../modules/user/pages/UserPage";
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
import { useMe } from "../common/hooks/useMe";
import { TabsEnum } from "../common/models/TabsEnum";

setupIonicReact();

const routes = [
  {
    path: RouteEnum.BIKES,
    Component: BikesListPage,
  },
  {
    path: RouteEnum.ACCOUNT,
    Component: UserPage,
  },
  {
    path: RouteEnum.SETTINGS,
    Component: SettingsPage,
  },
];

const tabs = [
  {
    name: TabsEnum.BIKES,
    href: RouteEnum.BIKES,
    icon: bicycle,
    label: "Bikes",
  },
  {
    name: TabsEnum.ACCOUNT,
    href: RouteEnum.ACCOUNT,
    icon: person,
    label: "Account",
  },
  {
    name: TabsEnum.SETTINGS,
    href: RouteEnum.SETTINGS,
    icon: settings,
    label: "Settings",
  },
];

const App: React.FC = () => {
  useMe();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path}>
                <Component />
              </Route>
            ))}
            <Route exact path="/">
              <Redirect to={RouteEnum.BIKES} />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {tabs.map((tab) => (
              <IonTabButton key={tab.name} tab={tab.name} href={tab.href}>
                <IonIcon icon={tab.icon} />
                <IonLabel>{tab.label}</IonLabel>
              </IonTabButton>
            ))}
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
