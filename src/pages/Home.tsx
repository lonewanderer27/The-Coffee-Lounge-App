import "./Account.css";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { collection, limit, query, where } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { Action } from "../components/Action";
import ProductCard from "../components/ProductCard";
import { bagOutline } from "ionicons/icons";
import { useEffect } from "react";

const Home: React.FC = () => {
  const firestore = useFirestore();
  const categoriesCollection = collection(firestore, "categories");
  const categoriesQuery = query(categoriesCollection);

  const { status, data } = useFirestoreCollectionData(categoriesQuery, {
    idField: "id",
  });

  const productsCollection = collection(firestore, "products");
  const productsQuery = query(productsCollection);

  const { status: productsStatus, data: productsData } =
    useFirestoreCollectionData(productsQuery, { idField: "id" });

  useEffect(() => {
    if (status === "success") {
      console.log("Categories");
      console.log(data);
    }

    if (productsStatus === "success") {
      console.log("Products");
      console.log(productsData);
    }
  }, [data, productsData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar className="ion-padding">
            <IonTitle size="large">Home</IonTitle>
            <IonButtons slot="end">
              <IonIcon
                src={bagOutline}
                size="large"
                className="ion-margin-right"
              ></IonIcon>
            </IonButtons>
          </IonToolbar>
          {/* <h3 className="ion-padding">Find your best combination!</h3> */}
        </IonHeader>
        <IonGrid className="ion-padding-vertical">
          <IonRow>
            {data?.map((category) => (
              <IonRow>
                <div style={{ display: "flex", alignContent: "center" }}>
                  <h2 className="ion-padding-horizontal">{category.altName}</h2>
                  <Action
                    text="See All"
                    link={`/category?name=${category.name}&id=${category.id}`}
                    align="right"
                  />
                </div>
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
                      />
                    ))}
                </IonRow>
              </IonRow>
            ))}
          </IonRow>
        </IonGrid>
        {/* <IonGrid className="ion-padding-vertical">
          <IonRow>
            <div style={{ display: "flex", alignContent: "center" }}>
              <h2 className="ion-padding-horizontal">Premium Coffees</h2>
              <Action text="See All" link="/category" align="right" />
            </div>
            <IonRow>
              {productsData
                ?.filter(
                  (product) => product.category == " 5TdIbkyXPcr3oCZPM0Xy"
                )
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
                  />
                ))}
            </IonRow>
          </IonRow>
          <IonRow>
            <div style={{ display: "flex", alignContent: "center" }}>
              <h2 className="ion-padding-horizontal">Appetizing Snacks</h2>
              <Action text="See All" link="/category" align="right" />
            </div>
            <IonRow>
              {productsData
                ?.filter(
                  (product) => product.category == "uf5GSdoXmCwkdDgLwRBN"
                )
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
                  />
                ))}
            </IonRow>
          </IonRow>
          <IonRow>
            <div style={{ display: "flex", alignContent: "center" }}>
              <h2 className="ion-padding-horizontal">Mouth Watering Meals</h2>
              <Action text="See All" link="/category" align="right" />
            </div>
            <IonRow>
              {productsData
                ?.filter(
                  (product) => product.category == "NiuCbd1mbeD5rKlf0xfl"
                )
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
                  />
                ))}
            </IonRow>
          </IonRow>
        </IonGrid> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
