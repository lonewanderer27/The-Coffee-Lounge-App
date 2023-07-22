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
  IonImg,
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
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addOutline, removeOutline } from "ionicons/icons";
import { computeProductPrice, useCart } from "../hooks/cart";
import { doc, getFirestore } from "firebase/firestore";
import {
  useDocumentDataOnce,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";

import CartBtn from "../components/CartBtn";
import Heart from "react-heart";
import { ProductConvert } from "../converters/products";
import { ProductLoading } from "../constants";
import { getAuth } from "firebase/auth";
import { phpString } from "../phpString";
import { productIdAtom } from "../atoms/products";
import { useAuthState } from "react-firebase-hooks/auth";
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

  const [productData, productLoading, dataError, dataSnapshot, productReload] =
    useDocumentDataOnce(
      // "Loading" is a pseudo product id that exists in the database
      // so that on first render, where product_id is not yet determined
      // it will query the "Loading" product instead ;)
      doc(db, "products", product_id ?? productId).withConverter(
        ProductConvert
      ),
      {
        getOptions: {
          source: "cache",
        },
        initialValue: ProductLoading,
      }
    );

  const {
    control,
    register,
    setValue,
    watch,
    getValues,
    formState: { isValid, isDirty },
    reset,
    handleSubmit,
  } = useForm<ProductConfig>({
    defaultValues: {
      quantity: 1,
      size: productData!.coffee_type ? Size.Tall : Size.None,
      milk: Milk.None,
      syrup: Syrup.None,
      additives: [],
      ice: productData!.coffee_type === "Cold Coffee" ? Ice.Normal : Ice.None,
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
        product_id: product_id ?? productId,
        product_snapshot: productData!,
        index: count,
        ...watch(),
      });
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);

  const computePrice = () => {
    if (!productLoading) {
      setTotalPrice(computeProductPrice(productData!.price, getValues()));
    }
  };

  useEffect(() => {
    computePrice();

    return () => {
      reset();
    };
  }, [watch, productData]);

  useEffect(() => {
    if (productData != undefined) {
      if (productData.coffee_type === "Cold Coffee") {
        // setValue("size", Size.Tall);
        setValue("ice", Ice.Normal);
      }
      if (productData.coffee_type) {
        setValue("size", Size.Tall);
      }
    }
  }, [productData]);

  console.log(productData);

  if (productData != undefined) {
    return (
      <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle>View Product</IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonButtons slot="end">
              <CartBtn />
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
                  isActive={isFavorite ? true : false}
                  onClick={() => {
                    toggleFavorite();
                    productReload();
                  }}
                  animationTrigger="click"
                  animationScale={1.2}
                  inactiveColor="gray"
                  activeColor="red"
                />
              )}
              {productData.coffee_type && (
                <IonBadge className="absolute top-2 left-2">
                  {productData.coffee_type}
                </IonBadge>
              )}
              <IonImg
                className={`${
                  productData.description ? "mb-5" : ""
                } w-[60%] h-auto`}
                src={productData.image}
                alt={productData.name}
              />
              <IonText
                className={`absolute w-full text-2xl font-semibold bottom-0 ${
                  !productData.description ? "text-center" : "text-left"
                }`}
              >
                {productData.name}
              </IonText>
            </IonRow>
            <IonRow>
              <IonText className="w-full text-justify">
                {productData.description}
              </IonText>
            </IonRow>
          </div>
          <form className="ion-padding">
            {productData.coffee_type && (
              <div className="ion-padding">
                <IonSegment
                  onIonChange={(event) => {
                    setValue("size", event.detail.value as Size);
                    computePrice();
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
                    readonly={true}
                    value={watch("quantity") + ""}
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
              {productData.coffee_type && (
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
                      value={watch("milk")}
                    >
                      {Object.values(Milk).map((milk) => (
                        <IonSelectOption
                          key={"ionselectoption:" + milk}
                          value={milk}
                        >
                          {milk}
                        </IonSelectOption>
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
                      value={watch("syrup")}
                    >
                      {Object.values(Syrup).map((syrup) => (
                        <IonSelectOption
                          key={`ionselectoption${syrup}`}
                          value={syrup}
                        >
                          {syrup}
                        </IonSelectOption>
                      ))}
                    </IonSelect>
                  </IonItem>
                  {productData.coffee_type === "Cold Coffee" && (
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
                          value={watch("ice")}
                        >
                          {Object.values(Ice).map((ice) => (
                            <IonSelectOption
                              key={`ionselectoption:${ice}`}
                              value={ice}
                            >
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
                          value={watch("additives")}
                        >
                          {Object.values(Additive).map((additive) => (
                            <IonSelectOption
                              key={`ionselectoption:${additive}`}
                              value={additive}
                            >
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
