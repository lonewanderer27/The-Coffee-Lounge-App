import { Category, Product } from "../types";
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
  IonLabel,
  IonLoading,
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
  useIonToast,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addOutline,
  heartOutline,
  informationCircle,
  informationSharp,
  pulseOutline,
  removeOutline,
} from "ionicons/icons";
import { useFirestore, useFirestoreDocDataOnce } from "reactfire";

import { doc } from "firebase/firestore";
import { useEffect } from "react";
import { useLocation } from "react-router";

enum Size {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface IFormInput {
  size: Size;
  quantity: number;
}

export default function ProductPage() {
  const firestore = useFirestore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const productId = queryParams.get("id") || "-1";

  const ref = doc(firestore, "products", productId);
  const { status, data } = useFirestoreDocDataOnce(ref);

  const coffeeTypeRef = doc(
    firestore,
    "coffee_types",
    data?.coffee_type_id ?? "AEO5P7edEO7cLVizxiOZ"
  );
  const { data: coffeeTypeData } = useFirestoreDocDataOnce(coffeeTypeRef);

  const [presentToast] = useIonToast();
  const [presentLoading, dismiss] = useIonLoading();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<IFormInput>({
    defaultValues: {
      quantity: 1,
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    presentLoading("Adding to cart...");
  };

  useEffect(() => {
    if (status === "success") {
      console.log("Product");
      console.log(data);
    }
  }, []);

  const qty = watch("quantity");

  if (productId != "-1" && data != undefined) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{data.name}</IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar className="ion-padding">
              <IonTitle>{data.name}</IonTitle>
              <IonButtons slot="end">
                <IonIcon
                  src={heartOutline}
                  size="large"
                  className="ion-margin-right"
                ></IonIcon>
                <IonBackButton></IonBackButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <div className="ion-padding">
            <IonRow className="ion-justify-content-center ">
              <img src={data.image} alt={data.name} width="50%" />
            </IonRow>
            <IonRow className="ion-margin-bottom">
              <IonText>{data.description}</IonText>
            </IonRow>
            {coffeeTypeData && (
              <div
                className="ion-justify-content-center flex"
                style={{ width: "100%" }}
              >
                <IonBadge>{coffeeTypeData.name}</IonBadge>
              </div>
            )}
          </div>
          <form className="ion-padding">
            {data.coffee_type && (
              <IonRow>
                <IonSelect
                  label="Size"
                  fill="outline"
                  {...register("size", { required: true })}
                >
                  <IonSelectOption value="small">
                    <IonText>Small</IonText>
                  </IonSelectOption>
                  <IonSelectOption value="medium">
                    <IonText>Medium</IonText>
                  </IonSelectOption>
                  <IonSelectOption value="large">
                    <IonText>Large</IonText>
                  </IonSelectOption>
                </IonSelect>
              </IonRow>
            )}
            <IonRow className="ion-align-items-center">
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
                  onClick={() => setValue("quantity", qty + 1)}
                >
                  <IonIcon src={addOutline} />
                </IonButton>
                <IonButton
                  size="small"
                  onClick={() => {
                    if (qty > 1) setValue("quantity", qty - 1);
                  }}
                  disabled={qty <= 1}
                >
                  <IonIcon src={removeOutline} />
                </IonButton>
              </IonCol>
            </IonRow>
          </form>
        </IonContent>
        <IonFooter>
          <IonToolbar className="ion-padding-md">
            <IonRow className="ion-align-items-center">
              <IonCol
                size="7"
                className="ion-justify-content-center ion-align-items-center"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <IonText>Price</IonText>
                  <IonText>
                    <h3 className="ion-no-margin">Php {data.price}</h3>
                  </IonText>
                </div>
              </IonCol>
              <IonCol>
                <IonButton className="ion-margin-top" disabled={!isValid}>
                  Add To Cart
                </IonButton>
              </IonCol>
            </IonRow>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  }

  return <></>;
}
