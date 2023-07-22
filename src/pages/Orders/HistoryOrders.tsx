import { IonContent, IonGrid, IonRow } from "@ionic/react";
import {
  collection,
  doc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import {
  useCollection,
  useCollectionData,
  useDocument,
} from "react-firebase-hooks/firestore";

import { DeliveryStatusType } from "../../types";
import { OrderConvert } from "../../converters/orders";
import OrderItem from "./OrderItem";
import { getAuth } from "firebase/auth";

export default function HistoryOrders() {
  const db = getFirestore();
  const { currentUser } = getAuth();
  const [orders, setOrders] = useCollectionData(
    query(
      collection(db, "orders").withConverter(OrderConvert),
      where("delivery_at", "==", DeliveryStatusType.Delivered)
    )
  );

  console.log("orders history:", orders);

  return (
    <IonContent>
      <IonGrid>
        <IonRow>
          {orders?.map((order) => (
            <OrderItem key={`orderItem:${order.id}`} {...order} />
          ))}
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}
