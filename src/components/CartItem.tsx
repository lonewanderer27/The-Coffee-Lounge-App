import { CartItemType, Ice, Milk, Size, Syrup } from "../types";
import {
  IonBadge,
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
import { computeProductPrice, useCart } from "../hooks/cart";
import { memo, useEffect, useState } from "react";

import OrderDescription from "../utils";
import { phpString } from "../phpString";

function CartItem(props: CartItemType) {
  const { removeFromCart, addQty: addItem, removeQty: removeItem } = useCart();

  const determineIfModified = () => {
    if (props.size !== Size.None && props.size !== Size.Tall) return true;
    if (props.milk !== Milk.None) return true;
    if (props.syrup !== Syrup.None) return true;
    if (props.additives.length !== 0) return true;
    if (props.ice !== Ice.Normal && props.ice !== Ice.None) return true;
    return false;
  };

  const [productPrice, setProductPrice] = useState(0);
  useEffect(() => {
    if (!status) {
      setProductPrice(computeProductPrice(props.product_snapshot.price, props));
    }
  });

  console.log("CartItem props: ", props);

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
                src={props.product_snapshot.image}
                alt={props.product_snapshot.name}
                style={{
                  width: "50px",
                  height: "auto",
                }}
                className="my-auto"
              />
            </IonCol>
            <IonCol>
              <IonText>{props.product_snapshot.name}</IonText>
              {determineIfModified() == true && (
                <>
                  <br />
                  <br />
                </>
              )}
              {OrderDescription(props)}
            </IonCol>
            <IonCol size="2" className="ion-text-end">
              <IonText>x {props.quantity}</IonText>
            </IonCol>
            <IonCol size="3" className="ion-text-end">
              <IonBadge>
                {phpString.format(productPrice * props.quantity)}
              </IonBadge>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </IonItemSliding>
  );
}

export default memo(CartItem);