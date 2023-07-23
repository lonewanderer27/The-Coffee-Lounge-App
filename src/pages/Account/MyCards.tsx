import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";

import { CardImages } from "../../constants";
import { CardItemType } from "../../types";
import Payment from "payment";
import { chevronForwardOutline } from "ionicons/icons";

interface CardItemComponentType extends CardItemType {
  onClick?: React.MouseEventHandler<HTMLIonItemElement>;
}

export function CardItem(props: CardItemComponentType) {
  const additionalProps = () => {
    if (props.onClick) {
      return {
        onClick: props.onClick,
      };
    } else {
      return {
        routerLink: "/account/cards/" + props.id,
      };
    }
  };

  return (
    <IonItem {...additionalProps()}>
      <IonLabel
        style={{ display: "flex" }}
        className="ion-justify-content-between"
      >
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="ion-text-start ion-justify-content-center"
        >
          <h1>{Payment.fns.formatCardNumber(props.cardNumber)}</h1>
          <IonText>{props.cardHolder}</IonText>
        </div>
        <div>
          <IonImg
            style={{ width: "80px" }}
            src={
              CardImages.find((card) =>
                card.cardType.includes(Payment.fns.cardType(props.cardNumber))
              )?.image ?? CardImages.slice(-1)[0].image
            }
          />
        </div>
      </IonLabel>
    </IonItem>
  );
}

CardItem.defaultProps = {
  id: 54321,
  cardNumber: "5555444433331111",
  cardHolder: "John Smith",
  default: false,
};

export default function MyCards() {
  const [showChanger, setShowChanger] = useState(false);
  const modal = useRef<HTMLIonModalElement>(null);

  const close = () => {
    setShowChanger(false);
    modal.current?.dismiss();
  };

  const handleChange = () => {
    close();
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Cards</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cards</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonListHeader>
            <IonLabel>Default</IonLabel>
          </IonListHeader>
          <CardItem default={true} />
          <IonItem onClick={() => setShowChanger(true)}>
            <IonLabel className="ion-text-center">Change</IonLabel>
          </IonItem>
        </IonList>
        <IonList>
          <IonListHeader>
            <IonLabel>My Cards</IonLabel>
          </IonListHeader>
          <CardItem cardNumber="6250946000000016" cardHolder="Adriane James" />
          <CardItem cardNumber="3700111111111111" cardHolder="Adriane James" />
          <CardItem cardNumber="4111111111111111" cardHolder="Adriane James" />
          <CardItem cardNumber="5019717010103742" cardHolder="Adriane James" />
          <CardItem cardNumber="5066991111111118" cardHolder="Adriane James" />
        </IonList>
        <IonModal ref={modal} isOpen={showChanger}>
          <IonHeader translucent={true}>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={close}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Select Card</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonList>
              <CardItem default={true} onClick={handleChange} />
              <CardItem
                cardNumber="6250946000000016"
                cardHolder="Adriane James"
                onClick={handleChange}
              />
              <CardItem
                cardNumber="3700111111111111"
                cardHolder="Adriane James"
                onClick={handleChange}
              />
              <CardItem
                cardNumber="4111111111111111"
                cardHolder="Adriane James"
                onClick={handleChange}
              />
              <CardItem
                cardNumber="5019717010103742"
                cardHolder="Adriane James"
                onClick={handleChange}
              />
            </IonList>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
