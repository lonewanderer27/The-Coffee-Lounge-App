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
import "./theme/index.css";
import "./global.styles.css";

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
  useIonLoading,
} from "@ionic/react";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  bagOutline,
  homeOutline,
  personCircleOutline,
  starOutline,
} from "ionicons/icons";

import About from "./pages/About";
import Account from "./pages/Account";
import AccountEdit from "./pages/AccountEdit";
import Card from "./pages/Account/Cards/Card";
import Cart from "./pages/Cart";
import CategoryPage from "./pages/Category";
import ChangePassword from "./pages/Account/ProfileAndSecurity/ChangePassword";
import Checkout from "./pages/Checkout";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import MyAddresses from "./pages/Account/MyAddresses";
import MyCards from "./pages/Account/MyCards";
import MyFavorites from "./pages/MyFavorites";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import ProductPage from "./pages/Product";
import ProfileAndSecurity from "./pages/Account/ProfileAndSecurity";
import Register from "./pages/Register";
import VirtualVisit from "./pages/VirtualVisit";
import { bagHandleOutline } from "ionicons/icons";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase v9+
import { getFirestore } from "firebase/firestore"; // Firebase v9+
import { useAuthState } from "react-firebase-hooks/auth";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/virtualVisit/index.html" />
            <AuthWrapper fallback={<Login />}>
              <Route exact path="/account">
                <Account />
              </Route>
              <Route exact path="/account/edit">
                <AccountEdit />
              </Route>
              <Route exact path="/account/accountandsecurity">
                <ProfileAndSecurity />
              </Route>
              <Route exact path="/account/myaddresses">
                <MyAddresses />
              </Route>
              <Route exact path="/account/bankaccountscards">
                <MyCards />
              </Route>
              <Route exact path="/account/cards/:card_id">
                <Card />
              </Route>
              <Route exact path="/account/changepass">
                <ChangePassword />
              </Route>
              <Route exact path="/checkout/:order_id">
                <Checkout />
              </Route>
              <Route exact path="/orders">
                <Orders />
              </Route>
              <Route exact path="/orders/:order_id">
                <Order />
              </Route>
              <Route exact path="/my-favorites">
                <MyFavorites />
              </Route>
            </AuthWrapper>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/virtualVisit">
              <VirtualVisit />
            </Route>
            <Route exact path="/explore">
              <Explore />
            </Route>
            <Route exact path="/cart">
              <Cart />
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
            <Route exact path="/product/:product_id">
              <ProductPage />
            </Route>
            <Route exact path="/about">
              <About />
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
            <IonTabButton tab="cart" href="/cart">
              <IonIcon aria-hidden="true" icon={bagOutline} />
              <IonLabel>Cart</IonLabel>
            </IonTabButton>
            <IonTabButton tab="order" href="/orders">
              <IonIcon aria-hidden="true" icon={bagHandleOutline} />
              <IonLabel>Orders</IonLabel>
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
}

export const AuthWrapper = ({
  children,
  fallback,
}: React.PropsWithChildren<{ fallback?: React.ReactElement }>): JSX.Element => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  console.log(user)

  if (user) {
    return children as JSX.Element;
  }

  if (!loading) {
    return fallback as React.ReactElement;
  }

  return <></>;
};

export default App;
