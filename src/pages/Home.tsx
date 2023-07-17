import "./Account.css";
import "swiper/css";

import { Autoplay, Pagination } from "swiper/modules";
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
import { collection, query } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { Action } from "../components/Action";
import CartBtn from "../components/CartBtn";
import ProductCard from "../components/ProductCard";
import { chevronForwardOutline } from "ionicons/icons";

const Home: React.FC = () => {
  const firestore = useFirestore();
  const categoriesCollection = collection(firestore, "categories");
  const categoriesQuery = query(categoriesCollection);

  const { data } = useFirestoreCollectionData(categoriesQuery, {
    idField: "id",
  });

  const productsCollection = collection(firestore, "products");
  const productsQuery = query(productsCollection);

  const { status: productsStatus, data: productsData } =
    useFirestoreCollectionData(productsQuery, { idField: "id" });

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
            {data?.map((category) => (
              <IonRow
                key={category.id + "ionrow"}
                className="ion-margin-bottom"
              >
                <IonList>
                  <IonItem
                    onClick={() =>
                      router.push(
                        `/category?name=${category.name}&id=${category.id}&description=${category.description}`
                      )
                    }
                  >
                    <IonLabel>
                      <IonText>{category.altName}</IonText>
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
                      {productsData
                        ?.filter((product) => product.category == category.id)
                        .slice(0, 2)
                        .map((product) => (
                          <ProductCard
                            key={product.id}
                            image={product.image}
                            id={product.id}
                            category={product.category}
                            name={product.name}
                            price={product.price}
                            sales={product.sales}
                            description={product.description}
                            coffee_type={product.coffee_type}
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
