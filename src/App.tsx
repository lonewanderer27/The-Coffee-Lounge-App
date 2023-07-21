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
} from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import {
  bagOutline,
  homeOutline,
  personCircleOutline,
  receiptOutline,
  starOutline,
} from "ionicons/icons";

import { IonReactRouter } from "@ionic/react-router";
import { getAuth } from "firebase/auth"; // Firebase v9+
import { setupIonicReact } from "@ionic/react";
import { useAuthState } from "react-firebase-hooks/auth";

const Home = lazy(() => import("./pages/Home"));

const Account = lazy(() => import("./pages/Account"));
const AccountEdit = lazy(() => import("./pages/AccountEdit"));
const ProfileAndSecurity = lazy(
  () => import("./pages/Account/ProfileAndSecurity")
);
const MyAddresses = lazy(() => import("./pages/Account/MyAddresses"));
const MyCards = lazy(() => import("./pages/Account/MyCards"));
const Card = lazy(() => import("./pages/Account/Cards/Card"));
const ChangePassword = lazy(
  () => import("./pages/Account/ProfileAndSecurity/ChangePassword")
);
const Checkout = lazy(() => import("./pages/Checkout"));
const PaymentMethods = lazy(() => import("./pages/Checkout/PaymentMethods"));
const DeliveryAddress = lazy(() => import("./pages/DeliveryAddresses"));
const Orders = lazy(() => import("./pages/Orders"));
const Order = lazy(() => import("./pages/Order/Order"));
const MyFavorites = lazy(() => import("./pages/MyFavorites"));
const ProcessPayment = lazy(() => import("./pages/Order/ProcessPayment"));
const Receipt = lazy(() => import("./pages/Order/Receipt"));
const VirtualVisit = lazy(() => import("./pages/VirtualVisit"));
const Explore = lazy(() => import("./pages/Explore"));
const Cart = lazy(() => import("./pages/Cart"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const CategoryPage = lazy(() => import("./pages/Category"));
const ProductPage = lazy(() => import("./pages/Product"));
const About = lazy(() => import("./pages/About"));

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Suspense fallback={<IonLoading isOpen={true} />}>
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
                <Route path="/account/cards/:card_id">
                  <Card />
                </Route>
                <Route exact path="/account/changepass">
                  <ChangePassword />
                </Route>
                <Route exact path="/checkout/">
                  <Checkout />
                </Route>
                <Route exact path="/checkout/choose-payoption">
                  <PaymentMethods />
                </Route>
                <Route exact path="/delivery-addresses">
                  <DeliveryAddress />
                </Route>
                <Route exact path="/delivery-addresses/choose">
                  <DeliveryAddress choose={true} />
                </Route>
                <Route exact path="/orders">
                  <Orders />
                </Route>
                <Route path="/orders/:order_id">
                  <Order />
                </Route>
                <Route exact path="/my-favorites">
                  <MyFavorites />
                </Route>
                <Route exact path="/order/:order_id/process-payment/">
                  <ProcessPayment />
                </Route>
                <Route exact path="/order/:order_id/receipt">
                  <Receipt />
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
              <Route path="/product/:product_id">
                <ProductPage />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
            </Suspense>
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
              <IonIcon aria-hidden="true" icon={receiptOutline} />
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
