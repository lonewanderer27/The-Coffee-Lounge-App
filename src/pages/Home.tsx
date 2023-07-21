import "./Account.css";
import "swiper/css";

import { Autoplay, Pagination } from "swiper/modules";
import { CategoryConvert, ProductConvert } from "../converters/products";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonRouter,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  collection,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";

import CartBtn from "../components/CartBtn";
import ProductCard from "../components/ProductCard";
import { chevronForwardOutline } from "ionicons/icons";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import useFavorite from "../hooks/favorite";

const Home: React.FC = () => {
  const db = getFirestore();
  const [data, loading, error] = useCollectionOnce(
    collection(db, "categories").withConverter(CategoryConvert)
  );

  const [productsData, productsLoading, productsError] = useCollectionOnce(
    query(
      collection(db, "products").withConverter(ProductConvert),
      where("name", "!=", "Loading")
    )
  );

  const { favorites } = useFavorite();

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          {!isPlatform("ios") && (
            <IonButtons slot="end">
              <CartBtn />
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
            <IonButtons slot="end">
              <CartBtn />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <Swiper
          autoplay={{
            delay: 2500,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
        >
          <SwiperSlide className="ion-padding">
            <img
              src="/slides/black_coffee.webp"
              style={{ borderRadius: "10px" }}
            />
          </SwiperSlide>
          <SwiperSlide className="ion-padding">
            <img
              src="/slides/definitely_not_macchiato.webp"
              style={{ borderRadius: "10px" }}
            />
          </SwiperSlide>
          <SwiperSlide className="ion-padding">
            <img
              src="/slides/hot_chocolate.webp"
              style={{ borderRadius: "10px" }}
            />
          </SwiperSlide>
        </Swiper>
        <IonGrid className="ion-padding-vertical">
          {data?.docs?.map((category) => (
            <IonRow key={category.id + "ionrow"} className="ion-margin-bottom">
              <IonButton
                fill="clear"
                className="w-full text-inherit ion-no-margin"
                color="default"
                size="large"
                routerLink={`/category?name=${category.get("name")}&id=${
                  category.id
                }&description=${category.get("description")}`}
              >
                <IonText className="mr-auto font-semibold" slot="start">
                  {category.get("altName")}
                </IonText>
                <IonIcon src={chevronForwardOutline} slot="end"></IonIcon>
              </IonButton>
              <IonCol size="12">
                <IonGrid>
                  <IonRow>
                    {productsData?.docs
                      ?.filter(
                        (product) => product.get("category") == category.id
                      )
                      .slice(0, 2)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          image={product.get("image")}
                          id={product.id}
                          category={product.get("category")}
                          name={product.get("name")}
                          price={product.get("price")}
                          sales={product.get("sales")}
                          description={product.get("description")}
                          coffee_type={product.get("coffee_type")}
                        />
                      ))}
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonRow>
          ))}
          {favorites.length > 0 && (
            <IonRow className="ion-margin-bottom">
              <IonButton
                fill="clear"
                className="w-full text-inherit ion-no-margin"
                color="default"
                size="large"
                routerLink="/my-favorites"
              >
                <IonText className="mr-auto font-semibold" slot="start">
                  Your Favorites
                </IonText>
                <IonIcon src={chevronForwardOutline} slot="end" />
              </IonButton>
              <IonCol size="12">
                <IonGrid>
                  <IonRow>
                    {productsData?.docs
                      ?.filter((product) =>
                        favorites?.includes(product.id) ? true : false
                      )
                      .slice(0, 2)
                      .map((product) => (
                        <ProductCard
                          key={product.id}
                          image={product.get("image")}
                          id={product.id}
                          category={product.get("category")}
                          name={product.get("name")}
                          price={product.get("price")}
                          sales={product.get("sales")}
                          description={product.get("description")}
                          coffee_type={product.get("coffee_type")}
                        />
                      ))}
                  </IonRow>
                </IonGrid>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
