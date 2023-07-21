import "./Product.css";

import {
  Additive,
  Additives,
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
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { addOutline, removeOutline } from "ionicons/icons";
import { computeProductPrice, useCart } from "../hooks/cart";
import { doc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

import Heart from "react-heart";
import { ProductConvert } from "../converters/products";
import { getAuth } from "firebase/auth";
import { phpString } from "../phpString";
import { productIdAtom } from "../atoms/products";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import useFavorite from "../hooks/favorite";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

export default function ProductPage() {
  const db = getFirestore();
  const { product_id } = useParams<{
    product_id: string;
  }>();
  const [currentUser] = useAuthState(getAuth());
  // console.log("product_id", product_id);
  const productId = useRecoilValue(productIdAtom);

  const [data, dataLoading] = useDocumentOnce(
    // "Loading" is a pseudo product id that exists in the database
    // so that on first render, where product_id is not yet determined
    // it will query the "Loading" product instead ;)
    doc(db, "products", product_id ?? productId).withConverter(ProductConvert)
  );

  const {
    control,
    register,
    setValue,
    watch,
    getValues,
    formState: { isValid, isDirty },
    handleSubmit,
  } = useForm<ProductConfig>({
    defaultValues: {
      quantity: 1,
      size: Size.Tall,
      milk: Milk.None,
      syrup: Syrup.None,
      additives: [],
      ice: Ice.Normal,
    },
    mode: "all",
  });

  const { addToCart, count } = useCart();

  const { isFavorite, toggleFavorite } = useFavorite(product_id ?? productId);

  const [presentAlert] = useIonAlert();

  const onSubmit: SubmitHandler<ProductConfig> = (data) => {
    console.log(data);
    if (data.additives.length > 2) {
      presentAlert({
        header: "Too many additives",
        message: "You can only select up to 2 additives",
        buttons: ["OK"],
      });
      return;
    } else {
      addToCart({
        product_id: product_id,
        index: count,
        ...getValues(),
      });
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);

  const computePrice = () => {
    if (!dataLoading) {
      setTotalPrice(computeProductPrice(data!.get("price"), getValues()));
    }
  };

  useEffect(() => {
    computePrice();
  }, [watch, data]);

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
                  className="absolute top-2 right-2"
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
                <IonBadge className="absolute top-2 left-2">
                  {data.get("coffee_type")}
                </IonBadge>
              )}
              <img
                className={`${data.get("description") ? "mb-5" : ""}`}
                src={data.get("image")}
                alt={data.get("name")}
                width="60%"
              />
              <IonText
                className={`absolute w-full text-xl font-semibold bottom-0 ${
                  !data.get("description") ? "text-center" : "text-left"
                }`}
              >
                {data.get("name")}
              </IonText>
            </IonRow>
            <IonRow>
              <IonText className="w-full text-justify">
                {data.get("description")}
              </IonText>
            </IonRow>
          </div>
          <form className="ion-padding">
            {data.get("coffee_type") && (
              <div className="ion-padding">
                <IonSegment
                  onIonChange={(event) => {
                    setValue("size", event.detail.value as Size);
                    computePrice();
                  }}
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
                    type="number"
                    readonly={true}
                  ></IonInput>
                </IonCol>
                <IonCol size="auto" className="ion ion-no-padding">
                  <IonButton
                    size="small"
                    onClick={() => {
                      if (watch("quantity") > 1)
                        setValue("quantity", watch("quantity") - 1);
                      computePrice();
                    }}
                    disabled={watch("quantity") <= 1}
                  >
                    <IonIcon src={removeOutline} />
                  </IonButton>
                  <IonButton
                    size="small"
                    onClick={() => {
                      setValue("quantity", watch("quantity") + 1);
                      computePrice();
                    }}
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
                      onIonChange={(e) => {
                        setValue("milk", e.detail.value);
                        computePrice();
                      }}
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
                      onIonChange={(e) => {
                        setValue("syrup", e.detail.value);
                        computePrice();
                      }}
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
                          label="Ice"
                          interface="action-sheet"
                          interfaceOptions={{
                            header: "Select the amount of your ice",
                          }}
                          {...register("ice", { required: true })}
                          onIonChange={(e) => {
                            setValue("ice", e.detail.value);
                            computePrice();
                          }}
                        >
                          {Object.values(Ice).map((ice) => (
                            <IonSelectOption value={ice}>
                              <IonText>{ice}</IonText>
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                      <IonItem>
                        <IonSelect
                          label="Additives"
                          multiple={true}
                          interfaceOptions={{
                            header: "Select up to 2 additives",
                          }}
                          {...register("additives", {
                            required: false,
                          })}
                          onIonChange={(e) => {
                            setValue("additives", e.detail.value);
                            computePrice();
                          }}
                        >
                          {Object.values(Additive).map((additive) => (
                            <IonSelectOption value={additive}>
                              {additive}
                            </IonSelectOption>
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
                      {phpString.format(totalPrice * watch("quantity"))}
                    </h3>
                  </IonText>
                </div>
              </IonCol>
              <IonCol>
                <IonButton onClick={() => handleSubmit(onSubmit)()}>
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
