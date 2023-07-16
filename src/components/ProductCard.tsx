import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonText,
  useIonRouter,
} from "@ionic/react";

import { Product } from "../types";
import { Size } from "../pages/Product";
import { bagAddOutline } from "ionicons/icons";
import { phpString } from "../phpString";
import { useCart } from "../hooks/cart";

export default function ProductCard(props: Product) {
  const { addToCart } = useCart();
  const router = useIonRouter();

  const handleAddToCartClick = (
    event: React.MouseEvent<HTMLIonIconElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (props.coffee_type) {
      addToCart({
        product_id: props.id,
        quantity: 1,
        size: Size.Medium,
      });
    } else {
      addToCart({
        product_id: props.id,
        quantity: 1,
      });
    }
  };

  return (
    <IonCol size="6">
      <IonCard
        className="ion-padding"
        onClick={() => router.push(`/product?id=${props.id}`)}
      >
        <div style={{ backgroundColor: "gray", borderRadius: "5px" }}>
          <img
            src={props.image}
            alt={props.name}
            style={{ height: "6rem", width: "100%" }}
          />
        </div>
        <IonCardTitle style={{ fontSize: "1rem" }} className="ion-margin-top">
          {props.name}
        </IonCardTitle>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IonText>{phpString.format(props.price)}</IonText>
          <IonIcon
            onClick={handleAddToCartClick}
            src={bagAddOutline}
            size="large"
          ></IonIcon>
        </div>
      </IonCard>
    </IonCol>
  );
}
