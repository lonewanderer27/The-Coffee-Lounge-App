import { IonContent, IonGrid, IonItem, IonList, IonRow } from "@ionic/react";
import {
  and,
  collection,
  doc,
  getFirestore,
  orderBy,
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
import { memo } from "react";

function OngoingOrders() {
  const db = getFirestore();
  const [orders, setOrders] = useCollectionData(
    query(
      collection(db, "orders").withConverter(OrderConvert),
      and(
        where("delivery_status", "in", [
          DeliveryStatusType.Pending,
          DeliveryStatusType.OnTheWay,
          DeliveryStatusType.Preparing,
        ])
      ),
      orderBy("created_at", "desc")
    )
  );

  console.log("ongoing orders:", orders);

  return (
    <IonContent className="ion-padding">
      <IonList className="ion-no-padding">
        {orders
          ?.filter((o) => o.products[0].product_snapshot)
          .map((order) => (
            <IonItem>
              <OrderItem key={`orderItem:${order.id}`} {...order} />
            </IonItem>
          ))}
      </IonList>
    </IonContent>
  );
}

export default memo(OngoingOrders);