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
import { doc, getFirestore } from "firebase/firestore";

import { CartItemType } from "../types";
import { ProductConvert } from "../converters/products";
import { db } from "../main";
import { phpString } from "../phpString";
import { useCart } from "../hooks/cart";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

export default function OrderItem(props: CartItemType) {
  const [data, status] = useDocumentOnce(
    doc(db, "products", props.product_id).withConverter(ProductConvert)
  );
  const { removeFromCart, addItem, removeItem } = useCart();

  if (data) {
    return (
      <IonItemSliding>
        <IonItemOptions side="end">
          <IonItemOption
            onClick={() => removeItem(props.index)}
            disabled={props.quantity === 1}
          >
            <IonIcon src={removeOutline} size="large"></IonIcon>
          </IonItemOption>
          <IonItemOption onClick={() => addItem(props.index)}>
            <IonIcon src={add} size="large"></IonIcon>
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
                  src={data.get("image")}
                  alt={data.get("name")}
                  width="50px"
                  height="auto"
                />
              </IonCol>
              <IonCol>
                <IonText>{data.get("name")}</IonText>
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
                  {phpString.format(data.get("price") * props.quantity)}
                </IonBadge>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonItem>
      </IonItemSliding>
    );
  }
}
