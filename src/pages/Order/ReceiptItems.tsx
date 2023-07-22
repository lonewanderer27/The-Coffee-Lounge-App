import { CartItemType, Ice, Milk, Size, Syrup } from "../../types";
import { IonCol, IonIcon, IonImg, IonRow, IonText } from "@ionic/react";

import { memo } from "react";

function ReceiptItems(props: CartItemType) {
  return (
    <>
      <IonRow>
        <IonCol size="6" className="text-left font-bold">
          <IonText>{props.product_snapshot.name}</IonText>
        </IonCol>
        <IonCol size="6" className="text-right">
          <IonText className="ml-auto">x {props.quantity}</IonText>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol className="ion-text-start" size="12">
          <IonText>
            {props.ice !== Ice.None && <IonText>{props.ice} Ice, </IonText>}
            {props.size !== Size.None && <IonText>Size {props.size}</IonText>}
            {props.milk !== Milk.None && <IonText>, {props.milk}</IonText>}
            {props.syrup !== Syrup.None && <IonText>, {props.syrup}</IonText>}
            {props.additives && props.additives.length != 0 && (
              <IonText>,{props.additives.join(", ")}</IonText>
            )}
          </IonText>
        </IonCol>
      </IonRow>
    </>
  );
}

export default memo(ReceiptItems);
