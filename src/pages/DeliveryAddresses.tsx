import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonPopover,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonThumbnail,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { RefObject, memo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addOutline,
  call,
  callOutline,
  ellipsisHorizontal,
  location,
  locationOutline,
  person,
  personOutline,
} from "ionicons/icons";
import {
  useCollectionData,
  useCollectionDataOnce,
} from "react-firebase-hooks/firestore";

import { DeliveryAddressConvert } from "../converters/user";
import { DeliveryAddressType } from "../types";
import { FirebaseError } from "firebase/app";
import { LocationDescription } from "../utils";
import { getAuth } from "firebase/auth";
import { useMaskito } from "@maskito/react";

export default function DeliveryAddress(props: { choose?: boolean }) {
  const db = getFirestore();
  const { currentUser } = getAuth();
  const userRef = doc(db, "users", currentUser?.uid ?? "Loading");
  const addressesRef = collection(db, userRef.path, "addresses").withConverter(
    DeliveryAddressConvert
  );
  const [addresses] = useCollectionData(addressesRef);
  const addModalRef = useRef<HTMLIonModalElement>(null);
  console.log("Addresses: ", addresses);

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle>
              {props.choose ? "Choose Address" : "Your Addresses"}
            </IonTitle>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/checkout"></IonBackButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton id="add-address">
                <IonIcon src={addOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div>
          {addresses?.map((address, index) => (
            <AddressCard key={index} {...address} />
          ))}
          <IonCard
            className="cursor-pointer"
            onClick={() => addModalRef.current?.present()}
          >
            <div className="flex flex-col items-center ion-padding">
              <div>
                <IonIcon src={addOutline} size="large"></IonIcon>
              </div>
              <div>
                <IonText>
                  <h3 className="font-semibold">Add Address</h3>
                </IonText>
              </div>
            </div>
          </IonCard>
        </div>
        <NewAddressModal
          addModalRef={addModalRef}
          addresses={addresses}
          addressesRef={addressesRef}
        />
      </IonContent>
    </IonPage>
  );
}

const AddressCard = memo((props: DeliveryAddressType) => {
  const db = getFirestore();
  const { currentUser } = getAuth();
  const userRef = doc(db, "users", currentUser?.uid ?? "Loading");
  const addressesRef = collection(db, userRef.path, "addresses").withConverter(
    DeliveryAddressConvert
  );

  return (
    <IonCard>
      <div className="flex ion-padding py-0 justify-between">
        <IonText>
          <h3 className="font-semibold py-0">{props.type}</h3>
        </IonText>
        <IonButton id="trigger-address-options" fill="clear" color="medium">
          <IonIcon src={ellipsisHorizontal} />
        </IonButton>
        <IonPopover trigger="trigger-address-options" triggerAction="click">
          <IonList>
            <IonItem
              button
              onClick={() => console.log("Edit Address: ", props)}
            >
              <IonLabel>Edit</IonLabel>
            </IonItem>
            <IonItem
              button
              onClick={() => console.log("Delete Address: ", props)}
              color="danger"
            >
              <IonLabel>Delete</IonLabel>
            </IonItem>
          </IonList>
        </IonPopover>
      </div>
      <IonCardContent className="p-0">
        <IonList lines="none">
          <IonItem>
            <IonThumbnail
              slot="start"
              className="flex flex-col justify-center mr-0  my-0"
            >
              <IonIcon src={location} size="large"></IonIcon>
            </IonThumbnail>
            <IonLabel className=" whitespace-nowrap truncate overflow-hidden  my-0">
              {LocationDescription(props)}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonThumbnail
              slot="start"
              className="flex  flex-col justify-center mr-0  my-0"
            >
              <IonIcon src={person} size="large"></IonIcon>
            </IonThumbnail>
            <IonLabel className=" whitespace-nowrap truncate overflow-hidden my-0">
              {props.name}
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonThumbnail
              slot="start"
              className="flex flex-col justify-center mr-0  my-0"
            >
              <IonIcon src={call} size="large"></IonIcon>
            </IonThumbnail>
            <IonLabel className=" whitespace-nowrap truncate overflow-hidden  my-0">
              {props.phone_number}
            </IonLabel>
          </IonItem>
        </IonList>
      </IonCardContent>
    </IonCard>
  );
});

function NewAddressModal(props: {
  addModalRef: RefObject<HTMLIonModalElement>;
  addressesRef: CollectionReference<DeliveryAddressType, DocumentData>;
  addresses: DeliveryAddressType[] | undefined;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isValidating },
  } = useForm<DeliveryAddressType>();

  const phoneMask = useMaskito({
    options: {
      mask: [
        "+",
        "6",
        "3",
        " ",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
    },
  });
  const [loading, setLoading] = useState(false);
  const [presentAlert] = useIonAlert();

  const onSubmit: SubmitHandler<DeliveryAddressType> = async (data) => {
    try {
      setLoading(true);
      await addDoc(props.addressesRef, data);
      props.addModalRef.current?.dismiss();
      setLoading(false);
    } catch (err: unknown) {
      const error = err as FirebaseError;
      setLoading(false);
      presentAlert(error.message, [{ text: "Ok" }]);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <IonModal trigger="add-address" ref={props.addModalRef}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => props.addModalRef.current?.dismiss()}>
              Cancel
            </IonButton>
          </IonButtons>
          <IonTitle>Add New Address</IonTitle>
          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={true}>
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
                  ref={async (phoneRef) => {
                    if (phoneRef) {
                      const input = await phoneRef.getInputElement();
                      phoneMask(input);
                    }
                  }}
                  onIonChange={(e) => {
                    if (e.detail.value) {
                      setValue("phone_number", e.detail.value);
                    }
                  }}
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
                >
                  <IonSelectOption value="home">Home</IonSelectOption>
                  <IonSelectOption value="work">Work</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonToggle>
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
              {loading ? <IonSpinner /> : "Add Address"}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonModal>
  );
}
