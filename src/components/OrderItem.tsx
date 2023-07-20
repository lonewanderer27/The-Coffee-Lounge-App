import { CartItemType, Ice, Milk, Syrup } from "../types";
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

import { ProductConvert } from "../converters/products";
import { db } from "../main";
import { doc } from "firebase/firestore";
import { phpString } from "../phpString";
import { useCart } from "../hooks/cart";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

export default function OrderItem(props: CartItemType) {
  const [data, status] = useDocumentOnce(
    doc(db, "products", props.product_id).withConverter(ProductConvert)
  );
  const { removeFromCart, addItem, removeItem } = useCart();

  const determineIfModified = () => {
    if (props.size !== "Tall") return true;
    if (props.milk !== Milk.None) return true;
    if (props.syrup !== Syrup.None) return true;
    if (props.additives.length !== 0) return true;
    if (props.ice !== Ice.Normal) return true;
    return false;
  };

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
                {determineIfModified() && (
                  <>
                    <br />
                    {/* <IonText id="modifications">Modified</IonText> */}
                  </>
                )}
                {props.size && (
                  <>
                    <br />
                    <IonText>Size: {props.size}</IonText>
                  </>
                )}
                {props.milk !== Milk.None && (
                  <>
                    <br />
                    <IonText>Milk: {props.milk}</IonText>
                  </>
                )}
                {props.syrup !== Syrup.None && (
                  <>
                    <br />
                    <IonText>Syrup: {props.syrup}</IonText>
                  </>
                )}
                {props.additives && props.additives.length != 0 && (
                  <>
                    <br />
                    <IonText>Additives: {props.additives.join(", ")}</IonText>
                  </>
                )}
                {props.ice && (
                  <>
                    <br />
                    <IonText>Ice: {props.ice}</IonText>
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
