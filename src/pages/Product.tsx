import { Cup, LargeCup, MediumCup, SmallCup } from "../components/CupSizes";
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import { addOutline, heart, heartOutline, removeOutline } from "ionicons/icons";
import { doc, getFirestore } from "firebase/firestore";
import { useDocument, useDocumentOnce } from "react-firebase-hooks/firestore";

import Heart from "react-heart";
import { ProductConvert } from "../converters/products";
import { db } from "../main";
import { getAuth } from "firebase/auth";
import { phpString } from "../phpString";
import { productIdAtom } from "../atoms/products";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCart } from "../hooks/cart";
import useFavorite from "../hooks/favorite";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

export enum Size {
  Tall = "tall",
  Grande = "grande",
  Venti = "venti",
  None = "none",
}

interface IFormInput {
  size: Size;
  quantity: number;
}

export default function ProductPage() {
  const { product_id } = useParams<{
    product_id: string;
  }>();
  const [currentUser] = useAuthState(getAuth());
  console.log("product_id", product_id);
  const productId = useRecoilValue(productIdAtom);

  const [data, dataLoading] = useDocumentOnce(
    // "Loading" is a pseudo product id that exists in the database
    // so that on first render, where product_id is not yet determined
    // it will query the "Loading" product instead ;)
    doc(db, "products", product_id ?? productId).withConverter(ProductConvert)
  );

  const {
    register,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      quantity: 1,
    },
  });

  const qty = watch("quantity");
  const size = watch("size");

  console.log("Product");
  console.log(data);
  console.log("size", size);

  const { addToCart, count } = useCart();

  const { isFavorite, toggleFavorite } = useFavorite(product_id ?? productId);

  if (data != undefined) {
    return (
      <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle>Product</IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div className="ion-padding bg-slate-200 dark:bg-slate-800">
            <IonRow className="ion-justify-content-center relative">
              {currentUser && (
                <Heart
                  className="absolute top-5 right-5"
                  style={{ width: "2rem" }}
                  isActive={isFavorite}
                  onClick={() => toggleFavorite()}
                  animationTrigger="click"
                  animationScale={1.2}
                  inactiveColor="gray"
                  activeColor="red"
                />
              )}
              {data.get("coffee_type") && (
                <IonBadge className="absolute top-5 left-5">
                  {data.get("coffee_type")}
                </IonBadge>
              )}
              <img src={data.get("image")} alt={data.get("name")} width="60%" />
              <IonText className="w-full text-xl font-semibold bottom-0 text-center">
                {data.get("name")}
              </IonText>
            </IonRow>
            <IonRow className="ion-margin-bottom text-center">
              <IonText className="w-full">{data.get("description")}</IonText>
            </IonRow>
          </div>
          <form className="ion-padding">
            {data.get("coffee_type") && (
              <div className="ion-padding">
                <IonText className="text-xl">Sizes</IonText>
                <IonSegment
                  onIonChange={(event) => {
                    setValue("size", event.detail.value as Size);
                  }}
                  value={watch("size")}
                  className=" ion-margin-top"
                >
                  <IonSegmentButton value={Size.Tall}>
                    <Cup
                      size={Size.Tall}
                      active={watch("size") === Size.Tall}
                    />
                  </IonSegmentButton>
                  <IonSegmentButton value={Size.Grande}>
                    <Cup
                      size={Size.Grande}
                      active={watch("size") === Size.Grande}
                    />
                  </IonSegmentButton>
                  <IonSegmentButton value={Size.Venti}>
                    <Cup
                      size={Size.Venti}
                      active={watch("size") === Size.Venti}
                    />
                  </IonSegmentButton>
                </IonSegment>
              </div>
            )}
            <IonList>
              <IonItem className="ion-align-items-center ion-margin-top">
                <IonCol className="ion-no-padding ion-padding-end">
                  <IonInput
                    label="Quantity"
                    className="ion-text-right text-xl"
                    {...register("quantity", { required: true })}
                  ></IonInput>
                </IonCol>
                <IonCol size="auto" className="ion ion-no-padding">
                  <IonButton
                    size="small"
                    onClick={() => {
                      if (qty > 1) setValue("quantity", qty - 1);
                    }}
                    disabled={qty <= 1}
                  >
                    <IonIcon src={removeOutline} />
                  </IonButton>
                  <IonButton
                    size="small"
                    onClick={() => setValue("quantity", qty + 1)}
                  >
                    <IonIcon src={addOutline} />
                  </IonButton>
                </IonCol>
              </IonItem>
            </IonList>
          </form>
        </IonContent>
        <IonFooter>
          <IonToolbar className="ion-padding-md">
            <IonRow className="ion-align-items-center">
              <IonCol
                size="7"
                className="ion-justify-content-center ion-align-items-center"
              >
                <div className="flex justify-center align-center flex-col w-full text-center">
                  <IonText>Price</IonText>
                  <IonText>
                    <h3 className="ion-no-margin">
                      {phpString.format(data.get("price"))}
                    </h3>
                  </IonText>
                </div>
              </IonCol>
              <IonCol>
                <IonButton
                  disabled={!isValid || data.id === "Loading"}
                  onClick={() => {
                    if (size === Size.None) {
                      addToCart({
                        product_id: product_id,
                        quantity: qty,
                        index: count,
                      });
                    } else {
                      addToCart({
                        product_id: product_id,
                        quantity: qty,
                        size: size,
                        index: count,
                      });
                    }
                  }}
                >
                  Add To Cart
                </IonButton>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  }
}
