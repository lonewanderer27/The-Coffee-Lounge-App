import { CartItemType, Ice, Milk, Size, Syrup } from "../../types";
import { IonCol, IonIcon, IonImg, IonRow, IonText } from "@ionic/react";
import { doc, getFirestore } from "firebase/firestore";

import { ProductConvert } from "../../converters/products";
import { memo } from "react";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

function ReceiptItems(props: CartItemType) {
  const db = getFirestore();
  const [data, status] = useDocumentOnce(
    doc(db, "products", props.product_id).withConverter(ProductConvert)
  );

  if (data) {
    return (
      <>
        <IonRow>
          <IonCol size="6" className="text-left font-bold">
            <IonText>{data.get("name")}</IonText>
          </IonCol>
          <IonCol size="6" className="text-right">
            <IonText className="ml-auto">{props.quantity}x</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-start" size="12">
            <IonText>
              {props.ice !== Ice.None && <IonText>{props.ice} Ice, </IonText>}
              {props.size !== Size.None && <IonText>{props.size}, </IonText>}
              {props.milk !== Milk.None && <IonText>{props.milk}, </IonText>}
              {props.syrup !== Syrup.None && <IonText>{props.syrup}, </IonText>}
              {props.additives && props.additives.length != 0 && (
                <IonText>,{props.additives.join(", ")}</IonText>
              )}
            </IonText>
          </IonCol>
        </IonRow>
      </>
    );
  }
}

export default memo(ReceiptItems);
