import "./Cart.css";

import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import CartItem from "../components/CartItem";
import { memo } from "react";
import { phpString } from "../phpString";
import { useCart } from "../hooks/cart";

const Cart: React.FC = () => {
  const { cart, setCart, totalPrice, count } = useCart();

  console.table(cart);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {count !== 0 && (
          <IonList>
            {cart.map((item, index) => (
              <CartItem
                key={"order:" + item.product_id + index}
                {...item}
                index={index}
              />
            ))}
            {count !== 0 && (
              <IonItem>
                <IonLabel
                  className="ion-text-center"
                  color="danger"
                  onClick={() => setCart([])}
                >
                  Remove All Items
                </IonLabel>
              </IonItem>
            )}
          </IonList>
        )}
        {count === 0 && (
          <div id="notice">
            <IonText>
              <h4 className="ion-no-margin">No items in cart</h4>
            </IonText>
          </div>
        )}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonRow className="ion-align-items-center">
            <IonCol
              size="7"
              className="ion-justify-content-center ion-align-items-center"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <IonText>Total Price</IonText>
                <IonText>
                  <h3 className="ion-no-margin">
                    {phpString.format(totalPrice)}
                  </h3>
                </IonText>
              </div>
            </IonCol>
            <IonCol>
              <IonButton disabled={count === 0} routerLink="/checkout">
                Checkout
              </IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default memo(Cart);
