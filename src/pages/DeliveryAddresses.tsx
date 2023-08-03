import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { RefObject, memo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addOutline,
  call,
  location,
  pencilOutline,
  person,
  trash,
} from "ionicons/icons";

import { DeliveryAddressConvert } from "../converters/user";
import DeliveryAddressMap from "../components/DeliveryAddressMap";
import { DeliveryAddressType } from "../types";
import { FirebaseError } from "firebase/app";
import { LocationDescription } from "../utils";
import { deliverAddressChoiceAtom } from "../atoms/checkout";
import { deliveryAddressAtom } from "../atoms/deliveryAddress";
import { getAuth } from "firebase/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDebounce } from "usehooks-ts";
import { useMaskito } from "@maskito/react";
import { useSetRecoilState } from "recoil";

function DeliveryAddresses(props: { choose?: boolean }) {
  const db = getFirestore();
  const { currentUser } = getAuth();
  const userRef = doc(db, "users", currentUser?.uid ?? "Loading");
  const addressesRef = collection(db, userRef.path, "addresses").withConverter(
    DeliveryAddressConvert
  );
  const [addresses] = useCollectionData(addressesRef);
  const addModalRef = useRef<HTMLIonModalElement>(null);
  console.log("Addresses: ", addresses);

  const setDeliverAddress = useSetRecoilState(deliverAddressChoiceAtom);
  const router = useIonRouter();

  const setCheckoutAddress = (id: string) => {
    if (props.choose) {
      const selectedAddress = addresses?.find((add) => add.id === id)!;
      console.log("Selected Address: ", selectedAddress);
      setDeliverAddress(selectedAddress);
      router.push("/checkout");
    }
  };

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
                <IonIcon src={pencilOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItemGroup>
            <IonItemDivider>
              <IonLabel>Addresses</IonLabel>
            </IonItemDivider>
            {addresses?.map((address, index) => (
              <AddressItem
                key={`address-${index}`}
                {...address}
                addressesRef={addressesRef}
                userRef={userRef}
                choose={props.choose!}
                setCheckoutAddress={setCheckoutAddress}
              />
            ))}
          </IonItemGroup>
        </IonList>
        <div>
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
          userRef={userRef}
        />
      </IonContent>
    </IonPage>
  );
}

export default memo(DeliveryAddresses);

interface IAddress extends DeliveryAddressType {
  addressesRef: CollectionReference<DeliveryAddressType, DocumentData>;
  userRef: DocumentReference<DocumentData>;
}

interface AddressItemProps extends IAddress {
  choose: boolean;
  setCheckoutAddress: (id: string) => void;
}

const AddressItem = memo((props: AddressItemProps) => {
  const setDeliveryAddress = useSetRecoilState(deliveryAddressAtom);
  const router = useIonRouter();

  const handleDelete = async () => {
    await deleteDoc(doc(props.addressesRef, props.id));
    await setDoc(props.userRef, { default_address: null }, { merge: true });
  };

  // const handleEdit = () => {
  //   setDeliveryAddress(props);
  //   router.push(`/account/delivery-addresses/edit/${props.id}`);
  // };

  return (
    <IonItemSliding
      onClick={() => {
        if (props.choose) {
          props.setCheckoutAddress(props.id!);
        }
      }}
    >
      <IonItemOptions side="start">
        <IonItemOption color="danger" id={`trigger-delete-address-${props.id}`}>
          Delete
          <IonIcon slot="start" src={trash}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
      <IonItemOptions side="end">
        <IonItemOption
          routerLink={`/account/delivery-addresses/edit/${props.id}`}
          color="primary"
        >
          Edit
          <IonIcon slot="start" src={pencilOutline}></IonIcon>
        </IonItemOption>
      </IonItemOptions>
      <IonAlert
        header="Warning"
        trigger={`trigger-delete-address-${props.id}`}
        message="Are you sure you want to delete this address?"
        buttons={[
          {
            text: "Cancel",
          },
          {
            text: "Confirm",
            handler: handleDelete,
          },
        ]}
      ></IonAlert>
      <IonItem>
        <IonGrid>
          <IonRow>
            <IonCol size="1">
              <IonIcon src={location}></IonIcon>
            </IonCol>
            <IonCol size="11">
              <IonText>{LocationDescription(props)}</IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1">
              <IonIcon src={person}></IonIcon>
            </IonCol>
            <IonCol size="11">
              <IonLabel>{props.name}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="1">
              <IonIcon src={call}></IonIcon>
            </IonCol>
            <IonCol size="11">
              <IonLabel>{props.phone_number}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonItem>
    </IonItemSliding>
  );
});

function NewAddressModal(props: {
  addModalRef: RefObject<HTMLIonModalElement>;
  addressesRef: CollectionReference<DeliveryAddressType, DocumentData>;
  userRef: DocumentReference<DocumentData>;
  addresses: DeliveryAddressType[] | undefined;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, isValidating },
  } = useForm<DeliveryAddressType>({
    mode: "all",
  });

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
      console.log("New Address: ", data);
      setLoading(true);
      const newAddressRef = await addDoc(props.addressesRef, data);
      if (data.default) {
        await setDoc(
          props.userRef,
          { default_address: newAddressRef.id },
          { merge: true }
        );
      }
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

  const debouncedLocationDescription = useDebounce(
    LocationDescription(watch()),
    750
  );

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
                  {...register("postal_code", { required: false })}
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
              {loading ? <IonSpinner /> : "Add Address"}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonModal>
  );
}
