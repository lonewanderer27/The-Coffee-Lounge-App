import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import logo from "/logo.png";

export default function Help() {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="end"></IonButtons>
          <IonTitle>Help</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div id="notice">
          <IonImg src={logo} className="h-[15em]" />
          <IonText>
            <h2 className="ion-no-margin font-bold">The Coffee Lounge</h2>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
}
