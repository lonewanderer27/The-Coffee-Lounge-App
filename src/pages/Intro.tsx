import "@dotlottie/react-player/dist/index.css";
import "swiper/css";
import "swiper/css/pagination";

import {
  DotLottiePlayer,
  DotLottieRefProps,
  PlayerEvents,
} from "@dotlottie/react-player";
import {
  IonApp,
  IonButton,
  IonContent,
  IonPage,
  IonText,
  useIonLoading,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";

import { INTRO_KEY } from "../App";
import { Pagination } from "swiper/modules";
import { Preferences } from "@capacitor/preferences";
import Slogan from "../assets/The Coffee Lounge - Logo 2.svg";
import { useRef } from "react";

export default function Intro(props: {
  setIntro: React.Dispatch<React.SetStateAction<boolean | null>>;
}) {
  const doneIntro = () => {
    Preferences.set({ key: INTRO_KEY, value: "true" });
    props.setIntro(true);
    window.history.replaceState({}, "", "/signin");
  };

  return (
    <IonApp>
      <IonPage>
        <IonContent fullscreen>
          <Swiper modules={[Pagination]} pagination={true} className="h-[90%]">
            <SwiperSlide>
              {({ isVisible }) => (
                <DotLottiePlayer
                  src="/lotties/coffee-1-NJVoiHpml6.lottie"
                  autoplay
                  loop
                  className="p-5 pt-[25%]"
                  renderer="canvas"
                >
                  <IonText>
                    <h1 className="ion-text-center font-bold">
                      Create Perfect Beverage
                    </h1>
                  </IonText>
                  <IonText>
                    <p className="text-center font-bold p-5">
                      Customize your coffee exactly the way you like it - size,
                      milk, syrup, ice, and more.
                    </p>
                  </IonText>
                </DotLottiePlayer>
              )}
            </SwiperSlide>
            <SwiperSlide className="pt-[20%]">
              <DotLottiePlayer
                src="/lotties/delivery-girl-cycling-city-g4Hj3urOHo.lottie"
                autoplay
                loop
                renderer="canvas"
                className="p-5"
              >
                <IonText>
                  <h1 className="ion-text-center font-bold">
                    Flexible Pickup & Delivery
                  </h1>
                </IonText>
                <IonText>
                  <p className="text-center font-bold  p-5">
                    Get your coffee delivered to your doorstep or pick it up
                    in-store.
                  </p>
                </IonText>
              </DotLottiePlayer>
            </SwiperSlide>
            <SwiperSlide className="pt-[20%]">
              <DotLottiePlayer
                src="/lotties/futuristic-virtual-reality-glasses-helmet-t8rqMmyk1s.lottie"
                autoplay
                loop
                renderer="canvas"
                className=""
              >
                <IonText>
                  <h1 className="ion-text-center font-bold">
                    Explore Cafe Virtually
                  </h1>
                </IonText>
                <IonText>
                  <p className="text-center font-bold  p-5">
                    Experience our cafe in stunning 3D view.
                  </p>
                </IonText>
              </DotLottiePlayer>
            </SwiperSlide>
            <SwiperSlide className="pt-[20%]">
              <div className="text-center flex flex-col items-center justify-center h-full">
                <img src={Slogan} className="w-[35%]"></img>
                <IonText>
                  <h1 className="font-bold">The Coffee Lounge</h1>
                </IonText>
                <IonText>
                  <p className="text-center font-bold">
                    Experience a new way of ordering coffee
                  </p>
                </IonText>
                <IonButton onClick={doneIntro}>
                  <IonText>Get Started</IonText>
                </IonButton>
              </div>
            </SwiperSlide>
          </Swiper>
        </IonContent>
      </IonPage>
    </IonApp>
  );
}
