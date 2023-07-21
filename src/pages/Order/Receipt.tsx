import { CardItemType, CartItemType } from "../../types";
import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Timestamp, doc, getFirestore } from "firebase/firestore";

import Barcode from "react-barcode";
import { OrderConvert } from "../../converters/orders";
import ReceiptItems from "./ReceiptItems";
import { orderAtom } from "../../atoms/order";
import { phpString } from "../../phpString";
import { shieldCheckmarkOutline } from "ionicons/icons";
import { useDocument } from "react-firebase-hooks/firestore";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

export default function Receipt() {
  const orderDetails = useRecoilValue(orderAtom);
  const { order_id } = useParams<{ order_id: string }>();
  console.log("order_id: ", order_id);

  const db = getFirestore();
  const orderRef = doc(
    db,
    "orders",
    order_id ?? orderDetails?.id
  ).withConverter(OrderConvert);
  const [order, loading] = useDocument(orderRef);

  console.log("order", order);

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Order Receipt</IonTitle>
            <IonButtons slot="start">
              <IonBackButton
                defaultHref={`/order/${order?.id}`}
              ></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="flex h-100 justify-center items-center w-100">
          <div
            id="receipt"
            className="rounded-tl-lg rounded-tr-lg border-4 border-slate-700 w-full text-center ion-padding"
          >
            <IonRow className="text-center">
              <IonCol size="12">
                <IonIcon src={shieldCheckmarkOutline} className="text-5xl" />
              </IonCol>
            </IonRow>
            <IonText className="font-bold">
              <span>Thank You!</span>
            </IonText>
            <br />
            <IonText color="#555555">
              <span>Your transaction was successful</span>
            </IonText>
            <IonGrid className="ion-margin-vertical">
              <IonRow>
                <IonCol className="ion-text-start">
                  <IonText color="#555555">
                    <span>ID Transaction</span>
                  </IonText>
                </IonCol>
                <IonCol>
                  <IonText color="#555555">
                    <span>{order?.id}</span>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-start">
                  <IonText color="#555555">
                    <span>Date</span>
                  </IonText>
                </IonCol>
                <IonCol className="ion-text-end">
                  <IonText color="#555555">
                    <span>
                      {new Date(
                        order?.get("payment_at").toDate()
                      ).toDateString()}
                    </span>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-start">
                  <IonText color="#555555">
                    <span>Time</span>
                  </IonText>
                </IonCol>
                <IonCol className="ion-text-end">
                  <IonText color="#555555">
                    <span>
                      {new Date(
                        order?.get("payment_at").toDate()
                      ).toLocaleTimeString()}
                    </span>
                  </IonText>
                </IonCol>
              </IonRow>

              <IonRow className="ion-margin-vertical">
                <IonCol className="ion-text-start">
                  <IonText color="#555555" className="font-bold">
                    <span>Order Details</span>
                  </IonText>
                </IonCol>
              </IonRow>
              {order
                ?.get("products")
                .map((product: CartItemType, index: number) => (
                  <ReceiptItems
                    key={"order:" + product.product_id + index}
                    {...product}
                  />
                ))}

              <IonRow className="ion-margin-top">
                <IonCol className="ion-text-start" size="12">
                  <IonText color="#555555" className="font-bold">
                    Payment Summary
                  </IonText>
                </IonCol>
                <IonCol className="ion-text-start">
                  <IonText color="#555555">Total</IonText>
                </IonCol>
                <IonCol className="ion-text-end">
                  <IonText color="#555555">
                    {phpString.format(order?.get("total_price"))}
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="ion-text-start">
                  <IonText color="#555555">
                    <span>Payment Method</span>
                  </IonText>
                </IonCol>
                <IonCol className="ion-text-end">
                  <IonText color="#555555">
                    <span>{order?.get("payment_option")}</span>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <Barcode value={order?.id!} width={1} height={50} />
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
