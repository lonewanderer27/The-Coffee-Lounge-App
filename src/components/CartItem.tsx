import { CartItemType, Ice, Milk, Size, Syrup } from "../types";
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
import { add, removeOutline, trashOutline, watch } from "ionicons/icons";
import { computeProductPrice, useCart } from "../hooks/cart";
import { doc, getFirestore } from "firebase/firestore";
import { memo, useEffect, useState } from "react";

import { ProductConvert } from "../converters/products";
import { phpString } from "../phpString";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

function CartItem(props: CartItemType) {
  const db = getFirestore();
  const [data, status] = useDocumentOnce(
    doc(db, "products", props.product_id).withConverter(ProductConvert)
  );
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
      setProductPrice(computeProductPrice(data!.get("price"), props));
    }
  });

  console.log("CartItem props: ", props);

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
                  className="my-auto"
                />
              </IonCol>
              <IonCol>
                <IonText>{data.get("name")}</IonText>
                {determineIfModified() == true && (
                  <>
                    <br />
                    <br />
                  </>
                )}
                {props.ice !== Ice.None && <IonText>{props.ice} Ice, </IonText>}
                {props.size !== Size.None && props.size !== Size.Tall && (
                  <IonText>{props.size}, </IonText>
                )}
                {props.milk !== Milk.None && <IonText>{props.milk}, </IonText>}
                {props.syrup !== Syrup.None && (
                  <IonText>{props.syrup}, </IonText>
                )}
                {props.additives && props.additives.length != 0 && (
                  <IonText>{props.additives.join(", ")}</IonText>
                )}
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
}

export default memo(CartItem);