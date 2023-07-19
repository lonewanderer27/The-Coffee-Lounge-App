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
} from "@ionic/react";
import {
  collection,
  doc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

import ProductCard from "../components/ProductCard";
import { UserConvert } from "../converters/user";
import useFavorite from "../hooks/favorite";

export default function MyFavorites() {
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
          <IonButtons>
            <IonBackButton></IonBackButton>
          </IonButtons>
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