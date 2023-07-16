import "./CartBtn.css";

import { IonBadge, IonButton, IonIcon } from "@ionic/react";
import { bag, bagOutline } from "ionicons/icons";

import { useCart } from "../hooks/cart";

export default function CartBtn() {
  const { count } = useCart();

  return (
    <IonButton routerLink="/order">
      <IonIcon
        id="cartIcon"
        src={bagOutline}
        size="large"
        className="ion-margin-right"
      ></IonIcon>
      <IonBadge id="cartCount" color="danger" mode="ios">
        {count}
      </IonBadge>
    </IonButton>
  );
}
