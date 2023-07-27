import {
  EmailAuthProvider,
  UserCredential,
  getAuth,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  IonAlert,
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { doc, getFirestore } from "firebase/firestore";
import { lazy, useState } from "react";

import { FirebaseError } from "firebase/app";
import { UserConvert } from "../../converters/user";
import { chevronForwardOutline } from "ionicons/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const Avatar = lazy(() => import("react-avatar"));

export default function ProfileAndSecurity() {
  const db = getFirestore();
  const auth = getAuth();
  const [data] = useAuthState(auth);
  const [present, dismiss] = useIonLoading();

  const [userData, userLoading] = useDocument(
    doc(db, "users", auth.currentUser!.uid).withConverter(UserConvert)
  );

  const [forgotPasswordSuccess, setforgotPasswordSuccess] = useState(false);
  const [forgotPasswordSuccessMsg, setforgotPasswordSuccessMsg] = useState("");
  const [forgotPasswordError, setforgotPasswordError] = useState(false);
  const [forgotPasswordErrorMsg, setforgotPasswordErrorMsg] = useState("");

  const handleForgotPassword = () => {
    present();
    sendPasswordResetEmail(auth, data?.email!)
      .then(() => {
        dismiss();
        setforgotPasswordSuccessMsg(
          "Password reset link has been sent to your email."
        );
        setforgotPasswordSuccess(true);
      })
      .catch((error: FirebaseError) => {
        dismiss();
        setforgotPasswordErrorMsg(error.message);
        setforgotPasswordError(true);
        console.log(error);
      });
  };

  console.log("userData", userData);

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, errors, touchedFields },
  } = useForm<{ currentPassword: string }>({});

  const router = useIonRouter();

  const [confirmPassOpen, setConfirmPassOpen] = useState(false);
  const [confirmPassError, setConfirmPassError] = useState(false);
  const [confirmPassMsg, setConfirmPassMsg] = useState("");

  const onSubmit: SubmitHandler<{ currentPassword: string }> = (data: {
    currentPassword: string;
  }) => {
    present();
    const credential = EmailAuthProvider.credential(
      auth.currentUser!.email!,
      watch("currentPassword")
    );

    reauthenticateWithCredential(auth.currentUser!, credential)
      .then((credential: UserCredential) => {
        dismiss();
        setConfirmPassOpen(false);
        setConfirmPassMsg("");
        router.push("/account/changepass");
      })
      .catch((error: FirebaseError) => {
        dismiss();
        setConfirmPassError(true);
        setConfirmPassMsg(error.message);
      });
  };

  if (!userLoading)
    return (
      <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle>Profile & Security</IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding-bottom">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Profile & Security</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div className="ion-padding flex justify-center">
            {data?.photoURL ? (
              <IonImg src={data?.photoURL} />
            ) : (
              <Avatar name={userData!.get("nickname")} round />
            )}
          </div>
          <IonList>
            <IonListHeader>
              <IonLabel>Basic Information</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Nickname</IonLabel>
              <IonLabel>{userData!.get("nickname")}</IonLabel>
            </IonItem>
            {userData?.get("pronouns") && (
              <IonItem>
                <IonLabel>Pronouns</IonLabel>
                <IonLabel>{userData!.get("pronouns")}</IonLabel>
              </IonItem>
            )}
            {userData?.get("gender") && (
              <IonItem>
                <IonLabel>Gender</IonLabel>
                <IonLabel>{userData!.get("gender")}</IonLabel>
              </IonItem>
            )}
          </IonList>
          <IonList>
            <IonListHeader>
              <IonLabel>Security</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonText>Email</IonText>
              <IonText className="ms-auto">{data?.email}</IonText>
            </IonItem>
            <IonItem id="last-signed-in">
              <IonLabel>Last Signed In</IonLabel>
              <IonIcon src={chevronForwardOutline} />
            </IonItem>
            <IonItem id="last-signed-up">
              <IonLabel>Signed Up</IonLabel>
              <IonIcon src={chevronForwardOutline} />
            </IonItem>
            <IonItem id="forgot-password">
              <IonLabel>Forgot Password</IonLabel>
              <IonIcon src={chevronForwardOutline} />
            </IonItem>
            <IonItem onClick={() => setConfirmPassOpen(true)}>
              <IonLabel>Change Password</IonLabel>
              <IonIcon src={chevronForwardOutline} />
            </IonItem>
          </IonList>
          <IonAlert
            trigger="last-signed-in"
            header="Last Signed In"
            message={data!.metadata.lastSignInTime}
            buttons={["OK"]}
          ></IonAlert>
          <IonAlert
            trigger="last-signed-up"
            header="Signed Up"
            message={data!.metadata.creationTime}
            buttons={["OK"]}
          />
          <IonAlert
            trigger="forgot-password"
            header="Forgot Password"
            message="Are you sure you want to reset your password?"
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
              },
              {
                text: "Confirm",
                handler: () => {
                  handleForgotPassword();
                },
              },
            ]}
          ></IonAlert>
          <IonAlert
            isOpen={forgotPasswordSuccess || forgotPasswordError}
            header="Alert"
            message={forgotPasswordErrorMsg || forgotPasswordSuccessMsg}
            buttons={["OK"]}
            onDidDismiss={() => {
              setforgotPasswordError(false);
              setforgotPasswordSuccess(false);
            }}
          ></IonAlert>
          <IonModal isOpen={confirmPassOpen}>
            <IonHeader translucent={true}>
              <IonToolbar>
                <IonTitle>Confirm Password</IonTitle>
                <IonButtons slot="start">
                  <IonButton
                    onClick={() => {
                      setConfirmPassOpen(false);
                      setConfirmPassMsg("");
                    }}
                  >
                    Cancel
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <form className="ion-padding" onSubmit={handleSubmit(onSubmit)}>
                <h4>Please enter your current password</h4>
                <IonInput
                  label="Current Password"
                  labelPlacement="floating"
                  type="password"
                  className={`${
                    errors.currentPassword?.type ? "ion-invalid" : "ion-valid"
                  } ion-margin-top ${
                    touchedFields.currentPassword ? "ion-touched" : ""
                  } ${confirmPassError && "ion-invalid"} `}
                  errorText={
                    errors.currentPassword?.message ||
                    (confirmPassError ? confirmPassMsg : "")
                  }
                  {...register("currentPassword", {
                    required: true,
                  })}
                />
                <IonButton
                  className="ion-margin-top"
                  expand="block"
                  type="submit"
                  disabled={!isValid}
                >
                  Confirm Password
                </IonButton>
              </form>
            </IonContent>
          </IonModal>
        </IonContent>
      </IonPage>
    );
}
