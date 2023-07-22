import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLoading,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { collection, getFirestore, query, where } from "firebase/firestore";

import CartBtn from "../components/CartBtn";
import ProductCard from "../components/ProductCard";
import { ProductConvert } from "../converters/products";
import { ProductLoading } from "../constants";
import { memo } from "react";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import useFavorite from "../hooks/favorite";

function MyFavorites() {
  const db = getFirestore();
  const { favorites } = useFavorite();

  const productsRef = query(
    collection(db, "products").withConverter(ProductConvert),
    where("__name__", "in", favorites)
  );
  const [productsData, productsLoading] = useCollectionDataOnce(productsRef, {
    initialValue: [ProductLoading],
  });

  if (productsLoading) {
    return <IonLoading isOpen={true} message={"Loading..."}></IonLoading>;
  }

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
                  {productsData!.map((product) => (
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default memo(MyFavorites);