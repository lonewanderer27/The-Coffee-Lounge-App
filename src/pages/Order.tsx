import "./Order.css";

import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import ExploreContainer from "../components/ExploreContainer";
import OrderItem from "../components/OrderItem";
import { phpString } from "../phpString";
import { useCart } from "../hooks/cart";

const Order: React.FC = () => {
  const { cart, totalPrice } = useCart();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Order</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Order</IonTitle>
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
        </IonList>
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
              <IonButton>Checkout</IonButton>
            </IonCol>
          </IonRow>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Order;
