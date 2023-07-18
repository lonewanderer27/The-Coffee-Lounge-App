import { Controller, SubmitHandler, set, useForm } from "react-hook-form";
import {
  InputChangeEventDetail,
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { getAuth, updatePassword } from "firebase/auth";

import { FirebaseError } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { useState } from "react";

interface IFormInput {
  newPassword: string;
  confirmNewPassword: string;
}

export default function ChangePassword() {
  const [userData] = useAuthState(getAuth());

  const history = useHistory();
  const router = useIonRouter();

  const [success, setSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMesg, setAlertMesg] = useState("");

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
  } = useForm<IFormInput>({});

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    updatePassword(userData!, data.newPassword)
      .then(() => {
        setSuccess(true);
        setAlertMesg("Password successfully changed!");
        setShowAlert(true);
      })
      .catch((error: FirebaseError) => {
        setSuccess(false);
        setAlertMesg(error.message);
        setShowAlert(true);
        console.log(error);
      });
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Change Password</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonAlert
          isOpen={showAlert}
          header="Alert"
          message={alertMesg}
          buttons={["OK"]}
          onDidDismiss={() => {
            setShowAlert(false);
            setAlertMesg("");
            if (success) {
              history.replace("/account/accountandsecurity");
            }
            setSuccess(false);
          }}
        ></IonAlert>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Change Password</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
          <IonInput
            label="New Password"
            labelPlacement="floating"
            type="password"
            className={`ion-margin-top ${isValid === false && "ion-invalid"} ${
              touchedFields.newPassword === true && "ion-touched"
            }`}
            errorText={errors.newPassword?.message}
            {...register("newPassword", {
              required: true,
            })}
          />
          <IonInput
            label="Confirm New Password"
            labelPlacement="floating"
            type="password"
            className={`ion-margin-top ${
              errors.confirmNewPassword?.type && "ion-invalid"
            } ${touchedFields.confirmNewPassword === true && "ion-touched"}`}
            {...register("confirmNewPassword", {
              required: true,
              validate: (val: string) => {
                if (watch("newPassword") != val) {
                  return "New password fields do not match!";
                }
              },
            })}
            errorText={errors.confirmNewPassword?.message}
          />
          <IonButton
            className="ion-margin-top"
            expand="block"
            type="submit"
            disabled={!isValid}
          >
            Change Password
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
