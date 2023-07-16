import "swiper/css";
import "swiper/css/effect-cards";
import "./Explore.css";

import { Autoplay, Pagination, Thumbs } from "swiper/modules";
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  bagOutline,
  chevronUpCircle,
  colorPalette,
  globe,
  help,
  settings,
} from "ionicons/icons";
import { useEffect, useRef, useState } from "react";

import { EffectCards } from "swiper/modules";
import { warningOutline } from "ionicons/icons";

// import tlcBanner from "../assets/tlc_banner.webp";

const Explore: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement>(null);
  const scrollToTop = () => {
    contentRef.current && contentRef.current.scrollToTop(300);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Explore</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollEvents={true} ref={contentRef}>
        <IonHeader collapse="condense">
          <IonToolbar className="ion-padding">
            <IonTitle size="large">Explore</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <div style={{ marginBottom: "50px" }}>
            <img
              src="/outdoor/TCL - PICTURE 2 (OUTSIDE).webp"
              style={{ borderRadius: "10px" }}
            />
            <IonText>
              <p>
                The Coffee Lounge is a public, five-star coffee shop, located in
                the heart of Metro Manila.
              </p>
              <p>
                Serving exceptional coffee, partnered with our famous bread
                products, your experience in The Coffee Lounge will be nothing
                short of extravagant and relaxing.
              </p>
            </IonText>
          </div>
          <div style={{ marginBottom: "50px" }}>
            <IonText>
              <h1>About Us</h1>
            </IonText>
            <IonText>
              <p>
                Established in 2020, The Coffee Lounge first started as a simple
                experiment by its owner, Mr. Adriane James Puzon. Starting in a
                small apartment room hidden in the heart of Makati, the menu
                only consisted of 5 coffee drinks, and never consisted of any
                breakfast nor bread.
              </p>
            </IonText>
            <img
              src="/outdoor/the-coffee-lounge-2nd-floor-facing-from-the-outside-railing-day.webp"
              style={{ borderRadius: "10px" }}
            />
            <IonText>
              <p>
                However, with more customers coming back to The Coffee Lounge,
                extensions were needed, and in 2021, The Coffee Lounge finally
                opened its new and improved shop, which became a 2-storey shop,
                where its customers can bring their colleagues to relax, while
                giving enough workspace to work on group projects.
              </p>
            </IonText>
            <img
              src="/outdoor/TCL - Picture 1 (OUTSIDE).webp"
              style={{ borderRadius: "10px" }}
            />
          </div>
        </div>
        <Swiper
          autoplay={{
            delay: 2500,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, EffectCards]}
          effect={"cards"}
        >
          <SwiperSlide>
            <IonCard>
              <img src="3D View Placeholder.webp" />
              <IonCardHeader>
                <IonCardTitle>
                  <IonText>3D View</IonText>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonButton routerLink="/virtualVisit" expand="block">
                  Explore
                </IonButton>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 1 (1ST FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>Ground Floor Lounge</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Experience the luxurious and comfortable Ground Floor
                    Lounge, perfect for relaxation and socializing. Enjoy the
                    stylish decor and cozy ambiance.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 2 (1ST FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>Entrance</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Welcome to our stunning venue! Step through our magnificent
                    entrance and be greeted by a grand atmosphere that sets the
                    tone for an unforgettable experience.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 3 (1ST FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>Ground Floor VIP Area</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Indulge in the VIP treatment at our exquisite Ground Floor
                    VIP Area. Relax in utmost comfort while enjoying exclusive
                    services and amenities.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/the-coffee-lounge-ground-floor-realistic.webp" />
              <IonCardHeader>
                <IonCardTitle>Ground Floor VIP Area</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Our Ground Floor VIP Area offers a private and sophisticated
                    space for distinguished guests. Enjoy top-notch service and
                    a lavish environment.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 4 (1ST FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>Ground Floor Bar</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Quench your thirst and savor delicious beverages at our
                    vibrant Ground Floor Bar. Immerse yourself in the energetic
                    ambiance and enjoy a wide selection of drinks.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 1 (1ST FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>Ground Floor Bar</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Experience the lively atmosphere and socialize with friends
                    at our Ground Floor Bar. Enjoy crafted cocktails, fine
                    wines, and a memorable night out.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 1 (2ND FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>2nd Floor Balcony</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Step out onto our breathtaking 2nd Floor Balcony and enjoy
                    panoramic views of the surroundings. Take in the sights and
                    create lasting memories in this enchanting space.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 2 (2ND FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>2nd Floor Lounge</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Relax and unwind in our elegant 2nd Floor Lounge. Whether
                    you're seeking a cozy corner or a social setting, this space
                    offers comfort and style.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="indoor/TCL - PICTURE 3 (2ND FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>2nd Floor Bar</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Indulge in the finest beverages and enjoy a vibrant
                    atmosphere at our 2nd Floor Bar. Immerse yourself in the
                    energy and socialize with fellow patrons.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 4 (2ND FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>2nd Floor VIP Area</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Experience true luxury in our exclusive 2nd Floor VIP Area.
                    Indulge in personalized service, privacy, and an opulent
                    environment designed for VIP guests.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 5 (2ND FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>2nd Floor B Function Room</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Host your special events and gatherings in our versatile 2nd
                    Floor B Function Room. Enjoy a spacious setting with
                    customizable features for a memorable occasion.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
          <SwiperSlide>
            <IonCard>
              <img src="/indoor/TCL - PICTURE 6 (2ND FLOOR).webp" />
              <IonCardHeader>
                <IonCardTitle>2nd Floor Function Rooms</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <p>
                    Discover our well-appointed 2nd Floor Function Rooms,
                    designed to accommodate various events. Whether it's a
                    conference, wedding, or party, we have the ideal space for
                    you.
                  </p>
                </IonText>
              </IonCardContent>
            </IonCard>
          </SwiperSlide>
        </Swiper>
        {/* <IonCard>
          <img src="3D View Placeholder.webp" />
          <IonCardHeader>
            <IonCardTitle>
              <IonText>3D View</IonText>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonButton routerLink="/virtualVisit" expand="block">
              Explore
            </IonButton>
          </IonCardContent>
        </IonCard> */}
      </IonContent>
    </IonPage>
  );
};

export default Explore;
