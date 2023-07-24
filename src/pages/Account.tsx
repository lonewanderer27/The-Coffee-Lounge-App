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
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonRouter,
} from "@ionic/react";
import { chevronForwardOutline, pencilSharp } from "ionicons/icons";
import { doc, getFirestore } from "firebase/firestore";
import { lazy, memo, useEffect } from "react";

import { UserConvert } from "../converters/user";
import { getAuth } from "firebase/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router";

const Avatar = lazy(() => import("react-avatar"))
// import Avatar from "react-avatar";





const Account = (props: {
  setIntro: React.Dispatch<React.SetStateAction<boolean | null>>;
}) => {
  const db = getFirestore();
  const router = useIonRouter();
  const { currentUser } = getAuth();
  const auth = getAuth();

  const ref = doc(db, "users", currentUser!.uid).withConverter(UserConvert);
  const [userData, userLoading, userError] = useDocument(ref);

  useEffect(() => {
    if (!userLoading && userData) {
      console.log("userData");
      console.log(userData);
    }
  }, [userData]);

  const logout = () => auth.signOut().then(() => router.push("/login"));

  if (!userLoading) {
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
                    <Avatar name={userData!.get("nickname")} round />
                  )}
                </IonCol>
                <IonCol className="ion-padding-start flex items-center">
                  <IonText>
                    <h2>{userData!.get("nickname")}</h2>
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
              <IonItem routerLink="/account/myaddresses">
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
  }
};

export default memo(Account);
