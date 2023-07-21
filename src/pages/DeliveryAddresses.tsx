import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { addOutline } from "ionicons/icons";
import { useRef } from "react";

export default function DeliveryAddress(props: { choose?: boolean }) {
  const addModalRef = useRef<HTMLIonModalElement>(null);
  console.log("triggered to choose: ", props.choose);

  const confirmAdd = () => {
    addModalRef.current?.dismiss();
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle>
              {props.choose ? "Choose Address" : "Your Addresses"}
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton id="add-address">
                <IonIcon src={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonModal trigger="add-address" ref={addModalRef}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => addModalRef.current?.dismiss()}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonTitle>Add Address</IonTitle>
              <IonButtons slot="end"></IonButtons>
            </IonToolbar>
          </IonHeader>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
