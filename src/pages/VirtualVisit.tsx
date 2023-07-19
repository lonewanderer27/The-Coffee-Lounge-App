import {
  IonAlert,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonPage,
} from "@ionic/react";
import {
  arrowBackOutline,
  chevronUpCircle,
  help,
  warningOutline,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

export default function VirtualVisit() {
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);

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

  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    if (!iframeRef) return;
    window.addEventListener("message", (event) => {
      if (event) {
        console.log(event.data);
      }
    });
  }, [iframeRef]);

  return (
    <IonPage>
      <IonContent>
        <iframe
          ref={setIframeRef}
          width={window.innerWidth - 1}
          height={window.innerHeight - 48}
          style={{
            backgroundColor: "#CCCCCC",
            border: "none",
            outline: "none",
            touchAction: "none",
          }}
          tabIndex={1}
          src={"/VirtualVisit/index.html"}
        ></iframe>
        <IonFab slot="fixed" horizontal="end" vertical="bottom">
          <IonFabButton>
            <IonIcon src={chevronUpCircle}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={() => setHelpOpen(true)}>
              <IonIcon icon={help}></IonIcon>
            </IonFabButton>
            <IonFabButton routerLink="/explore">
              <IonIcon src={arrowBackOutline}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
        <IonAlert
          isOpen={helpOpen}
          header={"3D View Help"}
          buttons={["OK"]}
          message="Pinch to move forward, pinch in to move backward. Tap and hold
          change direction."
          onDidDismiss={() => setHelpOpen(false)}
        ></IonAlert>
      </IonContent>
    </IonPage>
  );
}
