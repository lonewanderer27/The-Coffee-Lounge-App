import "./Account.css";

import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonRouter,
} from "@ionic/react";
import { Suspense, lazy, memo, useEffect } from "react";
import { chevronForwardOutline, pencilSharp } from "ionicons/icons";
import { doc, getFirestore } from "firebase/firestore";

import { UserConvert } from "../converters/user";
import { getAuth } from "firebase/auth";
import { useDocument } from "react-firebase-hooks/firestore";

const Avatar = lazy(() => import("react-avatar"));

const Account = (props: {
  setIntro: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
  const db = getFirestore();
  const router = useIonRouter();
  const { currentUser } = getAuth();
  const auth = getAuth();

  const ref = doc(db, "users", currentUser!.uid).withConverter(UserConvert);
  const [userData, userLoading, userError] = useDocument(ref);

  const logout = () => auth.signOut().then(() => router.push("/signin"));

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding-vertical">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Account</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonGrid className="ion-padding-horizontal">
            <IonRow>
              <IonCol size="auto">
                {currentUser?.photoURL ? (
                  <IonImg src={currentUser.photoURL} />
                ) : (
                  <Suspense>
                    <Avatar name={userData?.get("nickname")} round />
                  </Suspense>
                )}
              </IonCol>
              <IonCol className="ion-padding-start flex items-center">
                <IonText>
                  <h2>{userData?.get("nickname")}</h2>
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
          <IonList>
            <IonListHeader>
              <IonLabel>My Account</IonLabel>
            </IonListHeader>
            <IonItem routerLink="/account/accountandsecurity">
              <IonLabel>Profile & Security</IonLabel>
            </IonItem>
            <IonItem routerLink="/account/delivery-addresses">
              <IonLabel>My Addresses</IonLabel>
            </IonItem>
            <IonItem routerLink="/account/bankaccountscards">
              <IonLabel>Bank Accounts / Cards</IonLabel>
            </IonItem>
          </IonList>
          <IonList>
            <IonListHeader>
              <IonLabel>Settings</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Chat Settings</IonLabel>
              <IonIcon src={chevronForwardOutline}></IonIcon>
            </IonItem>
            <IonItem>
              <IonLabel>Notification Settings</IonLabel>
              <IonIcon src={chevronForwardOutline}></IonIcon>
            </IonItem>
          </IonList>
          <IonList>
            <IonListHeader>
              <IonLabel>Support</IonLabel>
            </IonListHeader>
            <IonItem onClick={() => props.setIntro(null)}>
              <IonLabel>About</IonLabel>
              <IonIcon src={chevronForwardOutline}></IonIcon>
            </IonItem>
            <IonItem>
              <IonLabel>Delete my Account</IonLabel>
              <IonIcon src={chevronForwardOutline}></IonIcon>
            </IonItem>
          </IonList>
          <div className="ion-padding">
            <IonButton expand="block" id="logout" className="ion-margin-top">
              Logout
            </IonButton>
            <IonAlert
              trigger="logout"
              header="Logout"
              message="Are you sure you want to log out?"
              buttons={[
                {
                  text: "Cancel",
                  role: "cancel",
                },
                {
                  text: "Logout",
                  handler: logout,
                },
              ]}
            ></IonAlert>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Account;
