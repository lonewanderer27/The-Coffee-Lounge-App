import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import { PaymentOptionType } from "../../types";
import { payOptionAtom } from "../../atoms/checkout";
import { useRecoilState } from "recoil";
import { useState } from "react";

export default function PaymentMethods() {
  const [payOption, setPayOption] = useRecoilState(payOptionAtom);
  const router = useIonRouter();

  const payOptionsArray = Object.values(PaymentOptionType);
  let [results, setResults] = useState(payOptionsArray);

  const handleInput = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLocaleLowerCase();

    setResults(
      payOptionsArray.filter((p) => p.toLocaleLowerCase().indexOf(query) > -1)
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Payment Method</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            debounce={250}
            onIonInput={(ev) => handleInput(ev)}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader>
          <IonList>
            <IonRadioGroup
              onIonChange={(e) => {
                setPayOption(e.detail.value);
                router.push("/checkout");
              }}
              value={payOption}
            >
              {results.map((value) => (
                <IonItem>
                  <IonRadio key={value} value={value}>
                    {value}
                  </IonRadio>
                  <br />
                </IonItem>
              ))}
            </IonRadioGroup>
          </IonList>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
}
