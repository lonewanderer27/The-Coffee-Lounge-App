import "./Product.css";

import {
  Additive,
  Ice,
  Milk,
  ProductConfig,
  Size,
  Sizes,
  Syrup,
} from "../types";
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
import { IceSize } from "../components/IceSizes";
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
    getValues,
    formState: { isValid },
  } = useForm<ProductConfig>({
    defaultValues: {
      quantity: 1,
      size: Size.None,
      milk: Milk.None,
      syrup: Syrup.None,
      additives: [],
      ice: Ice.Normal,
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
            <IonTitle>View Product</IonTitle>
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
                <IonSegment
                  onIonChange={(event) => {
                    setValue("size", event.detail.value as Size);
                  }}
                  value={watch("size")}
                >
                  <IonSegmentButton value={Size.Tall}>S</IonSegmentButton>
                  <IonSegmentButton value={Size.Grande}>M</IonSegmentButton>
                  <IonSegmentButton value={Size.Venti}>L</IonSegmentButton>
                </IonSegment>
              </div>
            )}
            <IonList>
              <IonItem>
                <IonCol className="ion-no-padding ion-padding-end">
                  <IonInput
                    label="Quantity"
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
              {data.get("coffee_type") && (
                <>
                  <IonItem>
                    <IonSelect
                      label="Milk"
                      interface="action-sheet"
                      interfaceOptions={{
                        header: "Select your choice of milk",
                      }}
                      {...register("milk", { required: false })}
                    >
                      {Object.values(Milk).map((milk) => (
                        <IonSelectOption value={milk}>{milk}</IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                  <IonItem>
                    <IonSelect
                      label="Syrup"
                      interface="action-sheet"
                      interfaceOptions={{
                        header: "Select your choice of syrup",
                      }}
                      {...register("syrup", { required: false })}
                    >
                      {Object.values(Syrup).map((syrup) => (
                        <IonSelectOption value={syrup}>{syrup}</IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                  {data.get("coffee_type") === "Cold Coffee" && (
                    <>
                      <IonItem>
                        <IonSelect
                          label="Additives"
                          multiple
                          {...register("additives", { required: false })}
                          value={"None" && watch("additives")!.length == 0}
                        >
                          {Object.values(Additive).map((additive) => (
                            <IonSelectOption value={additive}>
                              {additive}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                      <IonItem>
                        <IonSelect
                          label="Ice"
                          interface="action-sheet"
                          interfaceOptions={{
                            header: "Select the amount of your ice",
                          }}
                          {...register("ice", { required: true })}
                        >
                          {Object.values(Ice).map((ice) => (
                            <IonSelectOption value={ice}>{ice}</IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                    </>
                  )}
                </>
              )}
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
                    addToCart({
                      product_id: product_id,
                      index: count,
                      ...getValues(),
                    });
                  }}
                >
                  Buy Now
                </IonButton>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  }
}
