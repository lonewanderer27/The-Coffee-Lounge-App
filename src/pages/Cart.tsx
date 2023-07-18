import "./Cart.css";

import {
  FieldValue,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
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
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  SegmentChangeEventDetail,
  SegmentValue,
  useIonLoading,
} from "@ionic/react";
import { OrderProductType, OrderType } from "../types";

import CartBtn from "../components/CartBtn";
import ExploreContainer from "../components/ExploreContainer";
import OrderItem from "../components/OrderItem";
import { getAuth } from "firebase/auth";
import { phpString } from "../phpString";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCart } from "../hooks/cart";
import { useHistory } from "react-router-dom";
import { useState } from "react";

interface SegmentCustomEvent extends CustomEvent {
  target: HTMLIonSegmentElement;
  detail: SegmentChangeEventDetail;
}

const Cart: React.FC = () => {
  const db = getFirestore();
  const [data, loading, error] = useAuthState(getAuth());
  const history = useHistory();

  const { cart, setCart, totalPrice, count } = useCart();
  const [presentLoading, dismiss] = useIonLoading();

  function handleCheckout() {
    if (!data) {
      history.push("/login");
      return;
    }

    (async () => {
      // create the order document for the user
      presentLoading("Checking out...");

      const products = cart.map((item) => {
        let productObj: OrderProductType = {
          product_id: item.product_id,
          quantity: item.quantity,
        };
        if (item.size) {
          productObj["size"] = item.size;
        }
        return productObj;
      });

      const newOrder: OrderType = {
        user_uid: data!.uid,
        products: products,
        total_price: totalPrice,
        payment_status: "pending",
        created_at: serverTimestamp(),
      };

      const orderRef = await addDoc(collection(db, "orders"), newOrder);

      // empty cart
      setCart([]);

      // dismiss loading
      dismiss();

      // redirect to checkout page
      history.push("/checkout/" + orderRef.id);
    })();
  }

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="end"></IonButtons>
          <IonTitle>Cart</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cart</IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {cart.map((item, index) => (
            <OrderItem
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
                className="ion-padding"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <IonText>
                  <h3 className="ion-no-margin">
                    {phpString.format(totalPrice)}
                  </h3>
                </IonText>
              </div>
            </IonCol>
            <IonCol>
              <IonButton
                disabled={count === 0}
                onClick={() => handleCheckout()}
              >
                Checkout
              </IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Cart;
