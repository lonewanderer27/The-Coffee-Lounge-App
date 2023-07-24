import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonList,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { doc, getFirestore } from "firebase/firestore";

import { OrderConvert } from "../../converters/orders";
import OrderDescription from "../../utils";
import { OrderType } from "../../types";
import { orderAtom } from "../../atoms/order";
import { phpString } from "../../phpString";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

const Data = (props: { order_id: string; orderDetails: OrderType | null }) => {
  const db = getFirestore();
  const [order, loading] = useDocumentData(
    doc(db, "orders", props.order_id ?? props.orderDetails?.id).withConverter(
      OrderConvert
    ),
    {
      initialValue: props.orderDetails,
    }
  );

  const totalCount = () => {
    let count = 0;
    order!.products.forEach((p) => {
      count += p.quantity;
    });

    console.log("Total Count: ", count);
    return count;
  };

  if (loading) {
    return <IonLoading isOpen={loading} />;
  }

  return (
    <IonGrid>
      <IonRow>
        <IonList className="ion-no-margin">
          {order!.products
            .filter((product) => product.product_snapshot)
            .map((product) => (
              <IonItem key={`ionitem:${product.name}`} className="m-0">
                <IonRow>
                  <IonCol size="2">
                    <div className="bg-slate-200 dark:bg-gray-700 p-2 rounded-xl">
                      <IonImg
                        src={product.product_snapshot.image}
                        alt={product.product_snapshot.name}
                      />
                    </div>
                  </IonCol>
                  <IonCol size="7" className="ion-padding-start">
                    <div className="flex flex-col">
                      <div>
                        <IonText className="font-semibold">
                          {product.product_snapshot.name}
                        </IonText>
                      </div>
                      <div className="pt-2">{OrderDescription(product)}</div>
                    </div>
                  </IonCol>
                  <IonCol size="3">
                    <div>
                      <IonText>
                        {phpString.format(
                          product.quantity * product.product_snapshot.price
                        )}
                      </IonText>
                    </div>
                    <div className="pt-2">
                      <IonText>x {product.quantity}</IonText>
                    </div>
                  </IonCol>
                </IonRow>
              </IonItem>
            ))}
        </IonList>
      </IonRow>
      <IonRow className="ion-margin-top w-full">
        <IonCol size="8" className="text-right">
          <IonText className="text-right w-full">Items</IonText>
        </IonCol>
        <IonCol size="4" className="text-center">
          {totalCount()}
        </IonCol>
      </IonRow>
      <IonRow className="m-0 w-full">
        <IonCol size="8" className="text-right">
          <IonText className="text-right w-full ">Total Price</IonText>
        </IonCol>
        <IonCol size="4" className="text-center font-bold text-lg">
          {phpString.format(order!.total_price)}
        </IonCol>
      </IonRow>
      <IonRow className="ion-margin-top w-full">
        <IonCol size="8" className="text-right">
          <IonText className="text-right w-full ">Payment Method</IonText>
        </IonCol>
        <IonCol size="4" className="text-center">
          {order!.payment_option}
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default function Order() {
  const { order_id } = useParams<{ order_id: string }>();
  const orderDetails = useRecoilValue(orderAtom);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Order Detail</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/orders"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton
              routerLink={`/orders/${order_id ?? orderDetails?.id}/receipt`}
            >
              Receipt
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding-vertical">
        <Data order_id={order_id} orderDetails={orderDetails} />
      </IonContent>
    </IonPage>
  );
}
