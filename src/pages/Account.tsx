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
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { pencil, pencilOutline, pencilSharp } from "ionicons/icons";
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
  const { status, data } = useUser();

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

  if (status === "success" && userStatus === "success" && userData) {
    return (
      <IonPage>
        <IonHeader>
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
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Account</IonTitle>
              <IonButtons slot="end">
                <IonButton routerLink="/account/edit">
                  <IonIcon src={pencilSharp} />
                  <IonText className="ion-margin-start">Edit Profile</IonText>
                </IonButton>
              </IonButtons>
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
            <IonItem>
              <IonLabel>Pronouns</IonLabel>
              <IonLabel>{userData.pronouns}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Gender</IonLabel>
              <IonLabel>{userData.gender}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonLabel>{data?.email}</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar className="ion-padding">
            <IonButton
              expand="block"
              onClick={logout}
              className="ion-margin-top"
            >
              Logout
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    );
  }

  return <></>;
};

export default Account;
