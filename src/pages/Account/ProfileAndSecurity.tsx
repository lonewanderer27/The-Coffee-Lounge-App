import {
  EmailAuthProvider,
  UserCredential,
  getAuth,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useFirestore, useFirestoreDocDataOnce, useUser } from "reactfire";

import Avatar from "react-avatar";
import { FirebaseError } from "firebase/app";
import { chevronForwardOutline } from "ionicons/icons";
import { doc } from "firebase/firestore";
import { useHistory } from "react-router";
import { useState } from "react";

export default function ProfileAndSecurity() {
  const firestore = useFirestore();
  const history = useHistory();
  const auth = getAuth();
  const { status, data } = useUser();

  const ref = doc(firestore, "users", auth.currentUser!.uid);
  const { status: userStatus, data: userData } = useFirestoreDocDataOnce(ref, {
    idField: "id",
  });

  const [forgotPasswordSuccess, setforgotPasswordSuccess] = useState(false);
  const [forgotPasswordSuccessMsg, setforgotPasswordSuccessMsg] = useState("");
  const [forgotPasswordError, setforgotPasswordError] = useState(false);
  const [forgotPasswordErrorMsg, setforgotPasswordErrorMsg] = useState("");

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, data?.email!)
      .then(() => {
        setforgotPasswordSuccessMsg(
          "Password reset link has been sent to your email."
        );
        setforgotPasswordSuccess(true);
      })
      .catch((error: FirebaseError) => {
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
    const credential = EmailAuthProvider.credential(
      auth.currentUser!.email!,
      watch("currentPassword")
    );

    reauthenticateWithCredential(auth.currentUser!, credential)
      .then((credential: UserCredential) => {
        setConfirmPassOpen(false);
        setConfirmPassMsg("");
        router.push("/account/changepass");
      })
      .catch((error: FirebaseError) => {
        setConfirmPassError(true);
        setConfirmPassMsg(error.message);
      });
  };

  if (userStatus === "success")
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
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol size="auto">
                {userData.profile_img && <img src={userData.profile_img} />}
                {!userData.profile_img && (
                  <Avatar name={userData.first_name} round />
                )}
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonList>
            <IonListHeader>
              <IonLabel>Basic Information</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>First Name</IonLabel>
              <IonLabel>{userData.first_name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Last Name</IonLabel>
              <IonLabel>{userData.last_name}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Nickname</IonLabel>
              <IonLabel>{userData.nickname}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Pronouns</IonLabel>
              <IonLabel>{userData.pronouns}</IonLabel>
              {/* <IonLabel>He / Him</IonLabel> */}
            </IonItem>
            <IonItem>
              <IonLabel>Gender</IonLabel>
              <IonLabel>{userData.gender}</IonLabel>
              {/* <IonLabel>Male</IonLabel> */}
            </IonItem>
          </IonList>
          <IonList>
            <IonListHeader>
              <IonLabel>Security</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonText>Email</IonText>
              <IonText className="ms-auto">{data?.email}</IonText>
              {/* <IonLabel>adrianejames27@gmail.com</IonLabel> */}
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
            message={data?.metadata.lastSignInTime}
            buttons={["OK"]}
          ></IonAlert>
          <IonAlert
            trigger="last-signed-up"
            header="Signed Up"
            message={data?.metadata.creationTime}
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
