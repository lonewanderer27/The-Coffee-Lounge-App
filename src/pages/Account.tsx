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
import { useUser } from "reactfire";

const Account: React.FC = () => {
  const history = useHistory();
  const auth = getAuth();
  const { status, data } = useUser();

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
          {data?.email}
          <IonButton expand="block" onClick={logout} className="ion-margin-top">
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Account;
