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
import { Redirect, Route } from "react-router-dom";
import {
  bagOutline,
  ellipse,
  homeOutline,
  personCircleOutline,
  triangle,
} from "ionicons/icons";

import Account from "./pages/Account";
import Explore from "./pages/Explore";
import { IonReactRouter } from "@ionic/react-router";
import Order from "./pages/Order";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/explore">
            <Explore />
          </Route>
          <Route exact path="/order">
            <Order />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Route exact path="/">
            <Redirect to="/explore" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="explore" href="/explore">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Explore</IonLabel>
          </IonTabButton>
          <IonTabButton tab="order" href="/order">
            <IonIcon aria-hidden="true" icon={bagOutline} />
            <IonLabel>Order</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/account">
            <IonIcon aria-hidden="true" icon={personCircleOutline} />
            <IonLabel>Account</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
