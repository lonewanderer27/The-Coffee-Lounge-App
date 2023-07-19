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

import Heart from "react-heart";
import { ProductConvert } from "../converters/products";
import { getAuth } from "firebase/auth";
import { phpString } from "../phpString";
import { productIdAtom } from "../atoms/products";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCart } from "../hooks/cart";
import { useDocument } from "react-firebase-hooks/firestore";
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
  const db = getFirestore();
  const { product_id } = useParams<{
    product_id: string;
  }>();
  const [currentUser] = useAuthState(getAuth());
  console.log("product_id", product_id);
  const productId = useRecoilValue(productIdAtom);

  const [data, dataLoading] = useDocument(
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
            <IonTitle>{data.get("name")}</IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle>{data.get("name")}</IonTitle>
              <IonButtons slot="end" className="pr-10">
                {currentUser && (
                  <Heart
                    style={{ width: "2rem" }}
                    isActive={isFavorite}
                    onClick={() => toggleFavorite()}
                    animationTrigger="click"
                    animationScale={1.2}
                    inactiveColor="white"
                    activeColor="red"
                  />
                )}
                <IonBackButton></IonBackButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <div className="ion-padding">
            <IonRow className="ion-justify-content-center ">
              <img src={data.get("image")} alt={data.get("name")} width="50%" />
            </IonRow>
            <IonRow className="ion-margin-bottom text-center">
              <IonText className="w-full">{data.get("description")}</IonText>
            </IonRow>
            {data.get("coffee_type") && (
              <div className="ion-justify-content-center flex w-full">
                <IonBadge>{data.get("coffee_type")}</IonBadge>
              </div>
            )}
          </div>
          <form className="ion-padding">
            {data.get("coffee_type") && (
              <IonSegment
                onIonChange={(event) => {
                  setValue("size", event.detail.value as Size);
                }}
                value={watch("size")}
              >
                <IonSegmentButton value={Size.Tall}>
                  {/* <SmallCup active /> */}
                  <Cup size={Size.Tall} active />
                  {/* <IonLabel className="ion-margin-bottom">Tall</IonLabel> */}
                </IonSegmentButton>
                <IonSegmentButton value={Size.Grande}>
                  <Cup size={Size.Grande} />
                  {/* <MediumCup /> */}
                  {/* <IonLabel className="ion-margin-bottom">Grande</IonLabel> */}
                </IonSegmentButton>
                <IonSegmentButton value={Size.Venti}>
                  <Cup size={Size.Venti} />
                  {/* <LargeCup /> */}
                  {/* <IonLabel className="ion-margin-bottom">Venti</IonLabel> */}
                </IonSegmentButton>
              </IonSegment>
            )}
            <IonList>
              <IonItem className="ion-align-items-center ion-margin-top">
                <IonCol className="ion-no-padding ion-padding-end">
                  <IonInput
                    label="Quantity"
                    fill="outline"
                    className="ion-text-right"
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
