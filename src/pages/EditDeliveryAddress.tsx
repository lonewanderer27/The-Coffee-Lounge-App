import { DeliveryAddressConvert, UserConvert } from "../converters/user";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonAlert,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { memo, useState } from "react";
import {
  useDocument,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";

import DeliveryAddressMap from "../components/DeliveryAddressMap";
import { DeliveryAddressType } from "../types";
import { FirebaseError } from "firebase/app";
import { LocationDescription } from "../utils";
import { deliveryAddressAtom } from "../atoms/deliveryAddress";
import { getAuth } from "firebase/auth";
import { trash } from "ionicons/icons";
import { useDebounce } from "usehooks-ts"
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

const EditDeliveryAddress = () => {
  const { address_id } = useParams<{ address_id: string }>();

  const db = getFirestore();
  const { currentUser } = getAuth();
  const userRef = doc(db, "users", currentUser?.uid ?? "Loading").withConverter(
    UserConvert
  );
  const addressRef = doc(userRef, "addresses", address_id).withConverter(
    DeliveryAddressConvert
  );
  const deliveryAddressCache = useRecoilValue(deliveryAddressAtom);
  const [address, setAddress] = useState<DeliveryAddressType>();
  const [user, userLoading, userError] = useDocumentDataOnce(userRef);
  const [presentLoading, dismissLoading] = useIonLoading();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid, isValidating },
  } = useForm<DeliveryAddressType>({
    defaultValues: async () => {
      // // if the value of the atom matches our address_id
      // // then simply return this address
      // if (deliveryAddressCache?.id === address_id) {
      //   console.log("Cache: ", deliveryAddressCache);
      //   return deliveryAddressCache;
      // }

      // otherwise we fetch the latest address from the database
      presentLoading({ message: "Loading Address..." });
      const data = await getDoc(addressRef);
      setAddress(data.data()!);
      console.log("Address: ", data.data());
      await dismissLoading();
      return data.data()!;
    },
  });

  const [loading, setLoading] = useState(false);
  const [presentAlert] = useIonAlert();
  const onSubmit: SubmitHandler<DeliveryAddressType> = async (data) => {
    try {
      setLoading(true);
      await setDoc(addressRef, data);
      if (data.default) {
        await setDoc(
          userRef,
          { default_address: address?.id },
          { merge: true }
        );
      }
      setLoading(false);
      presentAlert("Address updated successfully!");
    } catch (err: unknown) {
      const error = err as FirebaseError;
      setLoading(false);
      presentAlert(error.message, [{ text: "Ok" }]);
      console.log(error);
    }
    setLoading(false);
  };

  const debouncedLocationDescription = useDebounce(
    LocationDescription(watch()),
    750
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/account/delivery-addresses"></IonBackButton>
          </IonButtons>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon src={trash}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Edit Address</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonList>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Contact</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonInput
                  label="Full Name"
                  labelPlacement="fixed"
                  placeholder="Full Name"
                  {...register("name", { required: true })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Phone No."
                  labelPlacement="fixed"
                  placeholder="Phone Number"
                  {...register("phone_number", {
                    required: true,
                    minLength: 11,
                  })}
                ></IonInput>
              </IonItem>
            </IonItemGroup>

            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Address</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonInput
                  label="Unit No."
                  labelPlacement="fixed"
                  placeholder="Unit No."
                  {...register("unit_number", { required: true })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Street"
                  labelPlacement="fixed"
                  placeholder="Street"
                  {...register("street_name", { required: true })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Barangay"
                  labelPlacement="fixed"
                  placeholder="Barangay"
                  {...register("barangay", { required: true })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="City"
                  labelPlacement="fixed"
                  placeholder="City"
                  {...register("city", { required: true })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Province"
                  labelPlacement="fixed"
                  placeholder="Province"
                  {...register("province", { required: true })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Region"
                  labelPlacement="fixed"
                  placeholder="Region"
                  {...register("region", { required: true })}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  label="Zip Code"
                  labelPlacement="fixed"
                  placeholder="Zip Code"
                  type="number"
                  {...register("postal_code", { required: true })}
                ></IonInput>
              </IonItem>
              <DeliveryAddressMap 
                addressString={debouncedLocationDescription}
              />
            </IonItemGroup>

            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>Settings</IonLabel>
              </IonItemDivider>
              <IonItem>
                <IonSelect
                  label="Label As"
                  labelPlacement="fixed"
                  {...register("type", { required: true })}
                  value={getValues("type")}
                >
                  <IonSelectOption value="home">Home</IonSelectOption>
                  <IonSelectOption value="work">Work</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonToggle {...register("default")}>
                  <IonLabel>Set as default address</IonLabel>
                </IonToggle>
              </IonItem>
            </IonItemGroup>
          </IonList>
          <div className="ion-padding">
            <IonButton
              expand="block"
              disabled={!isValid || isValidating}
              type="submit"
            >
              {loading ? <IonSpinner /> : "Update Address"}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default memo(EditDeliveryAddress);
