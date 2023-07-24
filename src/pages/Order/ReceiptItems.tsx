import { CartItemType, Ice, Milk, Size, Syrup } from "../../types";
import { IonCol, IonIcon, IonImg, IonRow, IonText } from "@ionic/react";

import OrderDescription from "../../utils";
import { memo } from "react";

function ReceiptItems(props: CartItemType) {
  return (
    <>
      <IonRow>
        <IonCol size="8" className="text-left font-bold">
          <IonText>{props.product_snapshot.name}</IonText>
        </IonCol>
        <IonCol size="4" className="text-right">
          <IonText className="ml-auto">x {props.quantity}</IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-text-start" size="12">
          <IonText>{OrderDescription(props)}</IonText>
        </IonCol>
      </IonRow>
    </>
  );
}

export default memo(ReceiptItems);
