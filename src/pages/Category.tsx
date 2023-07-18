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
import { collection, getFirestore, query, where } from "firebase/firestore";

import CartBtn from "../components/CartBtn";
import { CategoryType } from "../types";
import ProductCard from "../components/ProductCard";
import { ProductConvert } from "../converters/products";
import { useCollectionData } from "react-firebase-hooks/firestore";
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

  const productsCollection = collection(db, "products");
  const productsQuery = query(
    productsCollection,
    where("category", "==", category.id)
  );

  // const { status: productsStatus, data: productsData } =
  //   useFirestoreCollectionData(productsQuery, { idField: "id" });
  const [productsData, productsLoading] = useCollectionData(
    collection(db, "products").withConverter(ProductConvert)
  );

  if (productsLoading) {
    return <></>;
  }

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
            {productsData
              ?.filter((product) => product.category == category.id)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  id={product.id}
                  category={product.category}
                  name={product.name}
                  price={product.price}
                  sales={product.sales}
                />
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
