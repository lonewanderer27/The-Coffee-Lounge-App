import "@dotlottie/react-player/dist/index.css";
import "swiper/css";
import "swiper/css/pagination";

import { IonApp, IonButton, IonContent, IonPage, IonText } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { INTRO_KEY } from "../App";
import { Pagination } from "swiper/modules";
import { Preferences } from "@capacitor/preferences";
import Slogan from "../assets/The Coffee Lounge - Logo 2.svg";

// import "./Intro.css";

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
          <Swiper modules={[Pagination]} pagination={true}>
            <SwiperSlide className="pt-[10%]">
              <DotLottiePlayer
                src="/coffee-1-NJVoiHpml6.lottie"
                autoplay
                loop
                className="p-5"
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
            </SwiperSlide>
            <SwiperSlide className="pt-[30%]">
              <DotLottiePlayer
                src="/delivery-girl-cycling-city-g4Hj3urOHo.lottie"
                autoplay
                loop
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
            <SwiperSlide className="pt-[30%]">
              <DotLottiePlayer
                src="/futuristic-virtual-reality-glasses-helmet-t8rqMmyk1s.lottie"
                autoplay
                loop
                className="p-5"
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
            <SwiperSlide className="pt-[40%]">
              <div className="text-center flex flex-col items-center justify-center h-full">
                <img src={Slogan} className="w-[35%]"></img>
                <IonText>
                  <h1 className="font-bold">The Coffee Lounge</h1>
                </IonText>
                <IonText>
                  <p className="text-center font-bold">
                    Ready to experience a next level coffee shopping?
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
