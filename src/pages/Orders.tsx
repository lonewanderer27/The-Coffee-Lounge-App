import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";

import HistoryOrders from "./Orders/HistoryOrders";
import OngoingOrders from "./Orders/OngoingOrders";
import { useState } from "react";

export default function Orders() {
  const [activeSegment, setActiveSegment] = useState<"ongoing" | "history">(
    "ongoing"
  );

  return (
    <IonPage>
      <IonToolbar>
        <IonSegment
          value={activeSegment}
          onIonChange={(e) => {
            setActiveSegment(e.detail.value as any);
          }}
        >
          <IonSegmentButton value="ongoing">Ongoing</IonSegmentButton>
          <IonSegmentButton value="history">History</IonSegmentButton>
        </IonSegment>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
      </IonToolbar>
      {activeSegment === "ongoing" && <OngoingOrders />}
      {activeSegment === "history" && <HistoryOrders />}
    </IonPage>
  );
}