import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonSelect,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  chevronDownCircleOutline,
  chevronUpCircleOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";

import { warningOutline } from "ionicons/icons";

const Explore: React.FC = () => {
  // Online state
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener("online", handleStatusChange);

    // Listen to the offline status
    window.addEventListener("offline", handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  return (
    <IonPage>
      {!isOnline && (
        <IonHeader>
          <IonToolbar>
            <IonTitle>Explore</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      {isOnline && (
        <IonContent fullscreen>
          <iframe
            width={window.innerWidth - 1}
            height={window.innerHeight}
            style={{
              backgroundColor: "#CCCCCC",
              border: "none",
              outline: "none",
              touchAction: "none",
            }}
            tabIndex={1}
            src="http://localhost:5173/"
          ></iframe>
          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton>
              <IonIcon src={chevronDownCircleOutline}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      )}
      {!isOnline && (
        <IonContent>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Explore</IonTitle>
            </IonToolbar>
          </IonHeader>
          <div className="ion-padding">
            <IonIcon src={warningOutline} size="large" />
            <h2>Please connect to the internet and try again</h2>
          </div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Explore;
