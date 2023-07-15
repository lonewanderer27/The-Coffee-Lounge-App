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
  AuthProvider,
  FirestoreProvider,
  useFirebaseApp,
  useSigninCheck,
} from "reactfire";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import {
  bagOutline,
  homeOutline,
  personCircleOutline,
  starOutline,
} from "ionicons/icons";

import Account from "./pages/Account";
import CategoryPage from "./pages/Category";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import Order from "./pages/Order";
import ProductPage from "./pages/Product";
import React from "react";
import Register from "./pages/Register";
import { getAuth } from "firebase/auth"; // Firebase v9+
import { getFirestore } from "firebase/firestore"; // Firebase v9+

setupIonicReact();

function App() {
  const app = useFirebaseApp();

  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <IonApp>
          <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <AuthWrapper fallback={<Login />}>
                  <Route exact path="/account">
                    <Account />
                  </Route>
                </AuthWrapper>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route exact path="/explore">
                  <Explore />
                </Route>
                <Route exact path="/order">
                  <Order />
                </Route>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route path="/category">
                  <CategoryPage />
                </Route>
                <Route path="/product">
                  <ProductPage />
                </Route>
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon aria-hidden="true" icon={homeOutline} />
                  <IonLabel>Home</IonLabel>
                </IonTabButton>
                <IonTabButton tab="explore" href="/explore">
                  <IonIcon aria-hidden="true" icon={starOutline} />
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
      </FirestoreProvider>
    </AuthProvider>
  );
}

export const AuthWrapper = ({
  children,
  fallback,
}: React.PropsWithChildren<{ fallback: React.ReactElement }>): JSX.Element => {
  const { status, data } = useSigninCheck();

  console.log("status", status);
  console.log("data", data);

  if (!children) {
    return fallback;
  }

  if (status === "success" && data.signedIn === true) {
    return children as JSX.Element;
  }

  return fallback;
};

export default App;
