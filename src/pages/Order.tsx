import "./Order.css";

import {
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
} from "@ionic/react";

import CartBtn from "../components/CartBtn";
import ExploreContainer from "../components/ExploreContainer";
import OrderItem from "../components/OrderItem";
import { phpString } from "../phpString";
import { useCart } from "../hooks/cart";
import { useState } from "react";

interface SegmentCustomEvent extends CustomEvent {
  target: HTMLIonSegmentElement;
  detail: SegmentChangeEventDetail;
}

const Order: React.FC = () => {
  const { cart, setCart, totalPrice, count } = useCart();
  const [segment, setSegment] = useState<SegmentValue | undefined>("Cart");

  const handleSegmentChange = (e: SegmentCustomEvent) => {
    setSegment(e.detail.value);
    console.log(e.detail.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end"></IonButtons>
          <IonSegment value={segment} onIonChange={handleSegmentChange}>
            <IonSegmentButton value="Cart">
              <IonLabel>Cart</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Orders">
              <IonLabel>Orders</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {segment === "Orders" && (
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Order</IonTitle>
              <IonButtons slot="start">
                <IonBackButton></IonBackButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
        </IonContent>
      )}
      {segment === "Cart" && (
        <>
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
                  <IonButton disabled={count === 0}>Checkout</IonButton>
                </IonCol>
              </IonRow>
            </IonToolbar>
          </IonFooter>
        </>
      )}
    </IonPage>
  );
};

export default Order;
