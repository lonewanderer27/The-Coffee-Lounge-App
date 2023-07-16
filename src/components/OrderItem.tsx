import {
  IonBadge,
  IonCard,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonRow,
  IonText,
} from "@ionic/react";
import { add, removeOutline, trashOutline } from "ionicons/icons";
import { useFirestore, useFirestoreDocDataOnce } from "reactfire";

import { CartItem } from "../types";
import { doc } from "firebase/firestore";
import { phpString } from "../phpString";
import { useCart } from "../hooks/cart";
import { useEffect } from "react";

export default function OrderItem(props: CartItem) {
  const firestore = useFirestore();
  const ref = doc(firestore, "products", props.product_id);
  const { status, data } = useFirestoreDocDataOnce(ref);

  const { removeFromCart, addItem, removeItem } = useCart();

  if (status === "success" && data) {
    return (
      <IonItemSliding>
        <IonItemOptions side="end">
          <IonItemOption onClick={() => addItem(props.index)}>
            <IonIcon src={add} size="large"></IonIcon>
          </IonItemOption>
          <IonItemOption
            onClick={() => removeItem(props.index)}
            disabled={props.quantity === 1}
          >
            <IonIcon src={removeOutline} size="large"></IonIcon>
          </IonItemOption>
        </IonItemOptions>

        <IonItemOptions side="start">
          <IonItemOption
            color="danger"
            onClick={() => removeFromCart(props.index)}
          >
            <IonIcon src={trashOutline} size="large"></IonIcon>
          </IonItemOption>
        </IonItemOptions>

        <IonItem>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size="auto">
                <img
                  src={data.image}
                  alt={data.name}
                  width="50px"
                  height="auto"
                />
              </IonCol>
              <IonCol>
                <IonText>{data.name}</IonText>
                {props.size && (
                  <>
                    <br />
                    <IonText>Size: {props.size}</IonText>
                  </>
                )}
              </IonCol>
              <IonCol size="2" className="ion-text-end">
                <IonText>x {props.quantity}</IonText>
              </IonCol>
              <IonCol size="3" className="ion-text-end">
                <IonBadge>
                  {phpString.format(data.price * props.quantity)}
                </IonBadge>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonItemSliding>
    );
  }
}
