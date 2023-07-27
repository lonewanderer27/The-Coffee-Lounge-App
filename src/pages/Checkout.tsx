import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  branchAtom,
  deliverAddressAtom,
  deliverOptionAtom,
  payOptionAtom,
  readyToPayAtom,
} from "../atoms/checkout";
import { useRecoilState, useRecoilValue } from "recoil";

import { Branches } from "../constants";
import { DeliveryOptionType } from "../types";
import { LocationDescription } from "../utils";
import { memo } from "react";
import { phpString } from "../phpString";
import { useCart } from "../hooks/cart";
import { useCheckout } from "../hooks/checkout";

function Checkout() {
  const { totalPrice, count } = useCart();
  const { handlePay } = useCheckout(totalPrice);
  const router = useIonRouter();

  const payOption = useRecoilValue(payOptionAtom);
  const [deliverOption, setDeliverOption] = useRecoilState(deliverOptionAtom);
  const [deliveryAddress, setDeliveryAddress] =
    useRecoilState(deliverAddressAtom);
  const [branch, setBranch] = useRecoilState(branchAtom);
  const readyToPay = useRecoilValue(readyToPayAtom);

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
        <IonList className="ion-margin-top">
          <IonItem>
            <IonText className="font-semibold">
              How do you want to get your order?
              <h6 className="my-2">* We are open from 8:00AM - 10:00PM</h6>
            </IonText>
          </IonItem>
          <IonRadioGroup
            value={deliverOption}
            onIonChange={(e) => setDeliverOption(e.detail.value)}
          >
            {Object.values(DeliveryOptionType).map((deliveryOption) => (
              <IonItem key={`IonItem${deliveryOption}`}>
                <IonRadio
                  key={`IonRadio${deliveryOption}`}
                  value={deliveryOption}
                >
                  {deliveryOption}
                </IonRadio>
              </IonItem>
            ))}
          </IonRadioGroup>
          {deliverOption === DeliveryOptionType.Delivery && (
            <IonItem routerLink="/account/delivery-addresses/choose">
              <IonLabel>Choose Address</IonLabel>
              <IonLabel className="ion-text-end">
                {deliveryAddress
                  ? LocationDescription(deliveryAddress)
                  : "No Address Selected"}
              </IonLabel>
            </IonItem>
          )}
          {deliverOption === DeliveryOptionType.Pickup && (
            <IonItem>
              <IonSelect
                label="Choose Branch"
                interface="action-sheet"
                onIonChange={(e) => setBranch(e.detail.value)}
                value={branch}
              >
                {Object.values(Branches).map((branch) => (
                  <IonSelectOption key={`IonSelectOption${branch.name}`}>
                    {branch.address.city} Branch
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          )}
        </IonList>
        <IonList className="ion-margin-top">
          <IonItem routerLink="/checkout/choose-payoption">
            <IonText>Choose Payment Method</IonText>
            <IonLabel className="ion-text-end">{payOption}</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>
            <IonLabel>Payment Summary</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>Total Price</IonLabel>
            <IonLabel>{phpString.format(totalPrice)}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar className="ion-padding">
          <IonButton
            expand="block"
            disabled={!readyToPay}
            onClick={() => handlePay()}
          >
            <IonLabel>Pay</IonLabel>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}

export default memo(Checkout);