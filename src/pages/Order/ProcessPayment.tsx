import { DeliveryOptionType, PaymentStatusType } from "../../types";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonText,
  useIonViewDidEnter,
} from "@ionic/react";
import {
  doc,
  getFirestore,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { Action } from "../../components/Action";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { OrderConvert } from "../../converters/orders";
import { bagCheckOutline } from "ionicons/icons";
import { getAuth } from "firebase/auth";
import { orderAtom } from "../../atoms/order";
import { useDocument } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

export default function ProcessPayment() {
  const { currentUser } = getAuth();

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

  console.log("order: ", order);

  const payMyself = () => {
    updateDoc(doc(db, "orders", order_id ?? orderDetails?.id), {
      payment_status: PaymentStatusType.Paid,
      payment_at: serverTimestamp(),
    })
      .then(() => {
        console.log("Payment Success!");
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (orderDetails?.payment_status === PaymentStatusType.Pending) {
      payMyself();
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        {orderDetails?.payment_status === "pending" ||
          (order?.get("payment_status") === "pending" && (
            <div
              className="flex w-100 h-full p-16"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DotLottiePlayer
                autoplay
                loop
                src="/lotties/animation_coffee_load.lottie"
                style={{
                  height: "150px",
                }}
              >
                <div>
                  <IonText className="font-bold">Processing Payment</IonText>
                </div>
              </DotLottiePlayer>
            </div>
          ))}
        {order?.get("payment_status") === PaymentStatusType.Paid && (
          <div
            className="flex w-100 h-full ion-padding text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <IonIcon src={bagCheckOutline} className="text-9xl" />
            <IonText className="font-bold text-xl ion-margin-vertical">
              Ordered
            </IonText>
            <IonText className="ion-margin-vertical" color="medium">
              {currentUser?.displayName}, your order has been successfully
              placed.
            </IonText>
            {order.get("delivery_option") === DeliveryOptionType.Pickup && (
              <IonText className="ion-margin-vertical text-center">
                You will receive a notification once your order is ready for
                pick up at The Coffee Lounge - {order.get("branch")}
              </IonText>
            )}
            {order.get("delivery_option") === DeliveryOptionType.Delivery && (
              <IonText className="ion-margin-vertical text-center">
                You will receive a notification once your order is on the way.
              </IonText>
            )}
            <IonText className="ion-margin-vertical" color="medium">
              Show your personal QR Code at the counter to claim your order.
            </IonText>
            <Action
              message="Show"
              link={`/orders/${order?.id}/receipt`}
              text="Receipt"
            />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
