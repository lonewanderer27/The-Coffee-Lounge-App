import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { addOutline } from "ionicons/icons";
import { useRef } from "react";

export default function Vouchers(props: { choose?: boolean }) {
  console.log("triggered to choose: ", props.choose);

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
          <IonToolbar>
            <IonSearchbar debounce={1000}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
}
