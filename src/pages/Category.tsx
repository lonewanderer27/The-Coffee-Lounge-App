import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  isPlatform,
} from "@ionic/react";
import { collection, getFirestore, query, where } from "firebase/firestore";

import CartBtn from "../components/CartBtn";
import { CategoryType } from "../types";
import ProductCard from "../components/ProductCard";
import { ProductConvert } from "../converters/products";
import { categoryAtom } from "../atoms/products";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useLocation } from "react-router";
import { useRecoilValue } from "recoil";
import { useRefresh } from "../hooks/page";

export default function CategoryPage() {
  const categoryState = useRecoilValue(categoryAtom);
  const db = getFirestore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const category: CategoryType = {
    id: queryParams.get("id") || categoryState.id,
    name: queryParams.get("name") || categoryState.name,
    description: queryParams.get("description") || categoryState.description,
  };

  const [productsData, productsLoading, snapshot, refresh] = useCollectionOnce(
    query(
      collection(db, "products").withConverter(ProductConvert),
      where("category", "==", category.id)
    ),
    {
      getOptions: {
        source: "cache",
      },
    }
  );

  const handleRefresh = useRefresh([refresh]);

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
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{category.name}</IonTitle>
            <IonButtons slot="end">
              <CartBtn />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <div className="ion-padding">
          <IonText>{category.description}</IonText>
        </div>
        {productsData !== undefined && (
          <IonGrid className="ion-padding">
            <IonRow>
              {productsData?.docs
                .filter((product) => product.data().name != "Loading")
                .map((product, index) => (
                  <ProductCard
                    key={product.get("id") ?? `product${index}`}
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
        )}
      </IonContent>
    </IonPage>
  );
}
