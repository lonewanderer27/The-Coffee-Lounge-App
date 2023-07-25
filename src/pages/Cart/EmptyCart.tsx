import CoffeeMachine from "../../assets/lotties/coffee-machine.lottie";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { IonText } from "@ionic/react";

const EmptyCart = () => {
  return (
    <div id="notice" className="p-5">
      <DotLottiePlayer src={CoffeeMachine} autoplay loop className="-mt-40">
        <div className="mt-[-50px] z-10">
          <IonText>
            <h3 className="font-bold">Your cart is empty</h3>
          </IonText>
          <IonText>
            <h6 className="ion-no-margin">
              Load up that basket with our premium selection of goods
            </h6>
          </IonText>
        </div>
      </DotLottiePlayer>
    </div>
  );
};

export default EmptyCart;
