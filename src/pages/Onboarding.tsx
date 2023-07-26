import {
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export default function Onboarding() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="h-full">
          <IonInput label="Preferred Name" />
          <IonInput label="Gender" />
        </div>
      </IonContent>
    </IonPage>
  );
}
