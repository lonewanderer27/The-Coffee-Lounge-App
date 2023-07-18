import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonLabel,
  IonText,
  useIonRouter,
} from "@ionic/react";

import { ProductType } from "../types";
import { Size } from "../pages/Product";
import { bagAddOutline } from "ionicons/icons";
import { phpString } from "../phpString";
import { useCart } from "../hooks/cart";

export default function ProductCard(props: ProductType) {
  const { addToCart, count } = useCart();
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
        index: count,
      });
    } else {
      addToCart({
        product_id: props.id,
        quantity: 1,
        index: count,
      });
    }
  };

  return (
    <IonCol size="6" className=" flex flex-column w-full">
      <IonCard
        className="ion-padding w-full m-0"
        onClick={() => router.push(`/product/${props.id}`)}
      >
        <div style={{ backgroundColor: "gray", borderRadius: "5px" }}>
          <img
            src={props.image}
            alt={props.name}
            style={{ height: "auto", width: "100%" }}
          />
        </div>
        <IonCardTitle style={{ fontSize: "1rem" }} className="ion-margin-top">
          {props.name}
        </IonCardTitle>

        <IonCardContent className="px-0 pb-0 h-30">
          <div className=" flex justify-between mt-auto">
            <IonText>{phpString.format(props.price)}</IonText>
            <IonIcon
              onClick={handleAddToCartClick}
              src={bagAddOutline}
              size="large"
              slot="end"
            ></IonIcon>
          </div>
        </IonCardContent>
      </IonCard>
    </IonCol>
  );
}
