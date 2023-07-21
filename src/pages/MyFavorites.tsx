import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { collection, getFirestore, query, where } from "firebase/firestore";

import CartBtn from "../components/CartBtn";
import ProductCard from "../components/ProductCard";
import { UserConvert } from "../converters/user";
import { memo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import useFavorite from "../hooks/favorite";

function MyFavorites() {
  const db = getFirestore();
  const { favorites } = useFavorite();

  const productsRef = query(
    collection(db, "products").withConverter(UserConvert),
    where("__name__", "in", favorites)
  );
  const [productsData, productsLoading] = useCollection(productsRef);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>My Favorites</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
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
            <IonTitle size="large">My Favorites</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid className="ion-padding-vertical">
          <IonRow className="ion-margin-bottom">
            <IonCol size="12">
              <IonGrid>
                <IonRow>
                  {productsData?.docs?.map((product) => (
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default memo(MyFavorites);