import "./Account.css";

import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
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
} from "@ionic/react";
import { chevronForwardOutline, pencilSharp } from "ionicons/icons";
import { doc, getFirestore } from "firebase/firestore";

import Avatar from "react-avatar";
import { UserConvert } from "../converters/user";
import { getAuth } from "firebase/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { useEffect } from "react";
import { useHistory } from "react-router";

const Account: React.FC = () => {
  const db = getFirestore();
  const history = useHistory();
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

  const logout = () => auth.signOut().then(() => history.push("/login"));

  if (!userLoading && userData) {
    return (
      <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle>Account</IonTitle>
            {!isPlatform("ios") && (
              <IonButtons slot="end">
                <IonButton routerLink="/account/edit">
                  <IonIcon src={pencilSharp} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding-bottom">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Account</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol size="auto">
                {currentUser?.photoURL && <img src={currentUser.photoURL} />}
                {!currentUser?.photoURL && (
                  <Avatar name={userData.get("first_name")} round />
                )}
              </IonCol>
              <IonCol className="ion-padding-start">
                <IonText>
                  <h2>
                    {userData.get("first_name")} {userData.get("last_name")}
                  </h2>
                </IonText>
                <IonText>
                  <h6>Nickname: {userData.get("nickname")}</h6>
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
            <IonItem>
              <IonLabel>About</IonLabel>
              <IonIcon src={chevronForwardOutline}></IonIcon>
            </IonItem>
            <IonItem>
              <IonLabel>Delete my Account</IonLabel>
              <IonIcon src={chevronForwardOutline}></IonIcon>
            </IonItem>
          </IonList>
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
          <IonFooter className="ion-padding">
            <IonButton expand="block" id="logout" className="ion-margin-top">
              Logout
            </IonButton>
          </IonFooter>
        </IonContent>
      </IonPage>
    );
  }
};

export default Account;
