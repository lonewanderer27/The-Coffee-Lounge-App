import "./Account.css";

import {
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
import {
  chevronForwardOutline,
  pencil,
  pencilOutline,
  pencilSharp,
} from "ionicons/icons";
import { useFirestore, useFirestoreDocDataOnce, useUser } from "reactfire";

import Avatar from "react-avatar";
import { doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useHistory } from "react-router";

const Account: React.FC = () => {
  const firestore = useFirestore();
  const history = useHistory();
  const auth = getAuth();

  const ref = doc(firestore, "users", auth.currentUser!.uid);
  const { status: userStatus, data: userData } = useFirestoreDocDataOnce(ref, {
    idField: "id",
  });

  useEffect(() => {
    if (userStatus === "success" && userData) {
      console.log("userData");
      console.log(userData);
    }
  }, [userData]);

  const logout = () => auth.signOut().then(() => history.push("/login"));

  if (userStatus === "success" && userData) {
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
                {userData.profile_img && <img src={userData.profile_img} />}
                {!userData.profile_img && (
                  <Avatar name={userData.first_name} round />
                )}
              </IonCol>
              <IonCol className="ion-padding-start">
                <IonText>
                  <h2>
                    {userData.first_name} {userData.last_name}
                  </h2>
                </IonText>
                <IonText>
                  <h6>Nickname: {userData.nickname}</h6>
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
          <IonFooter className="ion-padding">
            <IonButton
              expand="block"
              onClick={logout}
              className="ion-margin-top"
            >
              Logout
            </IonButton>
          </IonFooter>
        </IonContent>
      </IonPage>
    );
  }
};

export default Account;
