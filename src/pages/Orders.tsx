import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function Orders() {
  return (
    <IonPage>
      <IonToolbar>
        <IonSegment value="ongoing">
          <IonSegmentButton value="ongoing">Ongoing</IonSegmentButton>
          <IonSegmentButton value="history">History</IonSegmentButton>
        </IonSegment>
      </IonToolbar>
    </IonPage>
  );
}
