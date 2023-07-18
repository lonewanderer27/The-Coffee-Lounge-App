import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { doc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";

import { PaymentOptionType } from "../types";
import QRCode from "react-qr-code";
import { useDocument } from "react-firebase-hooks/firestore";

export default function Checkout() {
  const [showQR, setShowQR] = useState(false);
  const { order_id } = useParams<{ order_id: string }>();
  const history = useHistory();

  const [data, status] = useDocument(doc(getFirestore(), "orders", order_id));

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<{ payOption: PaymentOptionType }>();

  const onSubmit: SubmitHandler<{ payOption: PaymentOptionType }> = (data) => {
    console.log(data);
    if (data.payOption === PaymentOptionType.OverTheCounter) {
      setShowQR(true);
    }
  };

  useEffect(() => {
    if (data?.get("payment_status") === "paid") {
      setShowQR(false);
      history.replace("/orders/" + order_id);
    }
  }, [data, status]);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Checkout</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Checkout</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
          <IonSelect
            label="Payment Option"
            {...register("payOption", { required: true })}
          >
            {Object.entries(PaymentOptionType).map(([key, value]) => (
              <IonSelectOption key={key} value={value}>
                {value}
              </IonSelectOption>
            ))}
          </IonSelect>
          <IonButton expand="block" disabled={!isValid} type="submit">
            <IonLabel>Continue</IonLabel>
          </IonButton>
        </form>
        <IonModal isOpen={showQR}>
          <IonHeader translucent={true}>
            <IonToolbar>
              <IonTitle>
                <IonLabel>Over the Counter</IonLabel>
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-text-center">
            <div>
              <IonText>
                <h2>Scan QR Code</h2>
                <p className="ion-text-center">
                  Present this QR code to the cashier
                </p>
              </IonText>
              <QRCode value={order_id} />
              <IonText>
                <p className="ion-text-center">
                  Order ID: <strong>{order_id}</strong>
                </p>
              </IonText>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
