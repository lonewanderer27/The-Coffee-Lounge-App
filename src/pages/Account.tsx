import "./Account.css";

import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { getAuth } from "firebase/auth";
import { useHistory } from "react-router";

const Account: React.FC = () => {
  const history = useHistory();
  const auth = getAuth();
  const { currentUser } = getAuth();

  const logout = () => auth.signOut().then(() => history.push("/login"));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          {currentUser?.email}
          <IonButton expand="block" onClick={logout}>
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Account;
