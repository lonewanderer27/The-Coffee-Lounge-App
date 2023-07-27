import { IonContent, IonItem, IonList } from "@ionic/react";
import {
  and,
  collection,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { DeliveryStatusType } from "../../types";
import { OrderConvert } from "../../converters/orders";
import OrderItem from "./OrderItem";
import { getAuth } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

function OngoingOrders() {
  const db = getFirestore();
  const { currentUser } = getAuth();
  const [orders] = useCollectionData(
    query(
      collection(db, "orders").withConverter(OrderConvert),
      and(
        where("delivery_status", "in", [
          DeliveryStatusType.Pending,
          DeliveryStatusType.OnTheWay,
          DeliveryStatusType.Preparing,
        ]),
        where("user_uid", "==", currentUser?.uid)
      ),
      orderBy("created_at", "desc")
    )
  );

  console.log("ongoing orders:", orders);

  return (
    <IonContent className="ion-padding">
      <IonList className="ion-no-padding">
        {orders?.map((order) => (
          <IonItem key={`ionitem:${order.id}`}>
            <OrderItem key={`orderItem:${order.id}`} {...order} />
          </IonItem>
        ))}
      </IonList>
    </IonContent>
  );
}

export default OngoingOrders;
