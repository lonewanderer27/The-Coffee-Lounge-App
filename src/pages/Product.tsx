import { Category, Product } from "../types";
import {
  IonBackButton,
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
import { bagOutline, heart, heartOutline } from "ionicons/icons";
import { collection, doc, query, where } from "firebase/firestore";
import {
  useFirestore,
  useFirestoreDocData,
  useFirestoreDocDataOnce,
} from "reactfire";

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

  const [presentToast] = useIonToast();
  const [presentLoading, dismiss] = useIonLoading();

  const {
    register,
    handleSubmit,
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

  if (status === "loading" && data === undefined) {
    return <IonLoading isOpen={true} />;
  } else if (productId != "-1" && data != undefined) {
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
          <form className="ion-padding">
            <IonRow>
              <IonCol>
                <img
                  src={data.image}
                  alt={data.name}
                  style={{ marginTop: -50, marginBottom: -50 }}
                />
              </IonCol>
              {data.description && (
                <IonCol>
                  <h4>Description</h4>
                  <IonText>{data.description}</IonText>
                </IonCol>
              )}
            </IonRow>
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
                <IonInput
                  label="Quantity"
                  fill="outline"
                  className="ion-text-right"
                  {...register("quantity", { required: true })}
                ></IonInput>
              </IonRow>
            )}
            <IonRow></IonRow>
          </form>
        </IonContent>
        <IonFooter>
          <IonToolbar className="ion-padding-md">
            <IonRow>
              {/* <IonText>
                <h2>Php {data.price}</h2>
              </IonText> */}
              <IonCol size="7" className="ion-justify-content-center">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    flexDirection: "column",
                    width: "100%",
                    marginTop: "auto",
                    marginBottom: "auto",
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
}
