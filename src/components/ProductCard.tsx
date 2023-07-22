import { Ice, Milk, ProductType, Syrup } from "../types";
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCol,
  IonIcon,
  IonImg,
  IonText,
  useIonRouter,
} from "@ionic/react";

import { Size } from "../types";
import { bagAddOutline } from "ionicons/icons";
import { memo } from "react";
import { phpString } from "../phpString";
import { productIdAtom } from "../atoms/products";
import { useCart } from "../hooks/cart";
import { useSetRecoilState } from "recoil";

function ProductCard(props: ProductType) {
  const { addToCart, count } = useCart();
  const router = useIonRouter();
  const setProductId = useSetRecoilState(productIdAtom);

  const handleAddToCartClick = (
    event: React.MouseEvent<HTMLIonIconElement, MouseEvent>
  ) => {
    event.stopPropagation();
    addToCart({
      product_id: props.id,
      product_snapshot: props,
      quantity: 1,
      size: props.coffee_type ? Size.Tall : Size.None,
      milk: Milk.None,
      syrup: Syrup.None,
      additives: [],
      ice: props.coffee_type === "Cold Coffee" ? Ice.Normal : Ice.None,
      index: count,
    });
  };

  return (
    <IonCol size="6" className=" flex flex-column w-full">
      <IonCard
        className="ion-padding w-full m-0"
        onClick={() => {
          setProductId(props.id);
          router.push(`/product/${props.id}`);
        }}
      >
        <div className="bg-slate-200 dark:bg-gray-700 rounded-md p-[5px]">
          <IonImg
            className="h-[148px] w-full"
            src={props.image}
            alt={props.name}
          />
        </div>
        <IonCardTitle className="ion-margin-top whitespace-nowrap truncate overflow-hidden text-base">
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

export default memo(ProductCard);