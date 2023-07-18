import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { collection, getFirestore, or, query, where } from "firebase/firestore";

import CartBtn from "../components/CartBtn";
import { CategoryType } from "../types";
import ProductCard from "../components/ProductCard";
import { ProductConvert } from "../converters/products";
import { useCollection } from "react-firebase-hooks/firestore";
import { useLocation } from "react-router";

// import { useFirestore, useFirestoreCollectionData } from "reactfire";

export default function CategoryPage() {
  const db = getFirestore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const category: CategoryType = {
    id: queryParams.get("id") || "",
    name: queryParams.get("name") || "",
    description: queryParams.get("description") || "",
  };

  console.log("Category", category);

  const [productsData, productsLoading] = useCollection(
    query(
      collection(db, "products").withConverter(ProductConvert),
      where("category", "==", category.id)
    )
  );

  console.log("productsData", productsData?.docs);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle>{category.name}</IonTitle>
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
          <IonToolbar className="ion-padding">
            <IonTitle size="large">{category.name}</IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonButtons slot="end">
              <CartBtn />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <IonText>{category.description}</IonText>
        </div>
        <IonGrid className="ion-padding">
          <IonRow>
            {productsData?.docs
              .filter((product) => product.data().name != "Loading")
              .map((product) => (
                <ProductCard
                  key={product.get("id")}
                  image={product.get("image")}
                  id={product.id}
                  category={product.get("category")}
                  name={product.get("name")}
                  price={product.get("price")}
                  sales={product.get("sales")}
                />
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
