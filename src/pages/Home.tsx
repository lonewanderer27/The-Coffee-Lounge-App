import "./Account.css";
import "swiper/css";

import { Autoplay, Pagination } from "swiper/modules";
import { CategoryConvert, ProductConvert } from "../converters/products";
import {
  IonButton,
  IonButtons,
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
import { collection, getFirestore } from "firebase/firestore";

import CartBtn from "../components/CartBtn";
import ProductCard from "../components/ProductCard";
import { chevronForwardOutline } from "ionicons/icons";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

const Home: React.FC = () => {
  const db = getFirestore();
  const [data, loading, error] = useCollectionOnce(
    collection(db, "categories").withConverter(CategoryConvert)
  );

  const [productsData, productsLoading, productsError] = useCollectionOnce(
    collection(db, "products").withConverter(ProductConvert)
  );

  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar className="ion-padding">
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
          <IonRow>
            {data?.docs?.map((category) => (
              <IonRow
                key={category.id + "ionrow"}
                className="ion-margin-bottom"
              >
                <IonList>
                  <IonItem
                    onClick={() =>
                      router.push(
                        `/category?name=${category.get("name")}&id=${
                          category.id
                        }&description=${category.get("description")}`
                      )
                    }
                  >
                    <IonLabel>
                      <IonText>{category.get("altName")}</IonText>
                    </IonLabel>
                    <IonIcon
                      src={chevronForwardOutline}
                      size="large"
                      className="left-0"
                    />
                  </IonItem>
                </IonList>
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
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
