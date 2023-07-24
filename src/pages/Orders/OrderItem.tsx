import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonChip,
  IonCol,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import { OrderType, ProductType } from "../../types";
import {
  collection,
  getDocs,
  getDocsFromCache,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { memo, useEffect, useState } from "react";

import { ProductConvert } from "../../converters/products";
import { chevronForwardOutline } from "ionicons/icons";
import { orderAtom } from "../../atoms/order";
import { phpString } from "../../phpString";
import { useSetRecoilState } from "recoil";

function OrderItem(props: OrderType) {
  const setOrder = useSetRecoilState(orderAtom);
  const [hasProductsSnapshot, setHasProductsSnapshot] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);

  const totalCount = () => {
    let count = 0;
    props.products.forEach((p) => {
      count += p.quantity;
    });

    console.log("Total Count: ", count);
    return count;
  };

  useEffect(() => {
    // check if we have the product snapshot
    // if not, fetch it from the database
    console.log(typeof props.products[0].product_snapshot);

    if (typeof props.products[0].product_snapshot === "object") {
      console.log("Product Snapshot already exists");
      setHasProductsSnapshot(true);
      return;
    } else {
      setHasProductsSnapshot(false);
      const db = getFirestore();
      getDocs(
        query(
          collection(db, "products"),
          where(
            "id",
            "in",
            props.products.map((p) => p.product_id)
          )
        ).withConverter(ProductConvert)
      ).then((querySnapshot) => {
        setProducts(querySnapshot.docs.map((doc) => doc.data()));
      });
    }

    // set the product snapshot
  }, []);

  console.log("products Snapshots: ", products);

  const viewOrderDetail = () => {
    setOrder(props);
  };

  return (
    <div className="w-full my-5">
      <IonRow className="flex items-center">
        <IonCol size="8">
          <IonCard className="mx-0 bg-transparent my-0 shadow-none">
            <IonCardSubtitle>
              {new Date(props!.payment_at!.toDate()).toDateString()}
              {" | "}
              {new Date(props!.payment_at!.toDate()).toLocaleTimeString()}
            </IonCardSubtitle>
          </IonCard>
        </IonCol>
        <IonCol size="4">
          <IonCard className="bg-transparent text-right mx-0 my-0 shadow-none">
            <IonText className="text-xl">
              {phpString.format(props.total_price)}
            </IonText>
          </IonCard>
        </IonCol>
      </IonRow>
      <IonRow className="my-0 mx-2">
        {hasProductsSnapshot &&
          props.products
            .filter((product) => product.product_snapshot)
            .map((product) => (
              <>
                <IonCol size="2">
                  <IonImg
                    src={product.product_snapshot?.image}
                    className="h-7 w-full"
                  />
                </IonCol>
                <IonCol size="9" className="flex items-center">
                  {`${product.product_snapshot.name}`}
                </IonCol>
                <IonCol size="1" className="flex items-center">
                  x{`${product.quantity}`}
                </IonCol>
              </>
            ))}
        {products.length != 0 &&
          products.map((p) => (
            <>
              <IonCol size="2">
                <IonAvatar className="w-8 h-8">
                  <IonImg src={p.image} />
                </IonAvatar>
              </IonCol>
              <IonCol size="9" className="flex items-center">
                {`${p.name}`}
              </IonCol>
              <IonCol size="1" className="flex items-center">
                x
                {`${
                  props.products.find((pr) => pr.product_id == p.id)?.quantity
                }`}
              </IonCol>
            </>
          ))}
      </IonRow>
      <IonRow className="my-0 mx-2">
        <IonCol size="10" className="flex">
          <IonText className="text-right w-full">Total Items</IonText>
        </IonCol>
        <IonCol size="2" className="flex">
          <IonText className="text-right w-full">{totalCount()}</IonText>
        </IonCol>
      </IonRow>
      <IonButton
        fill="clear"
        className="w-full text-inherit ion-no-margin ion-no-padding"
        color="default"
        size="default"
        routerLink={`/orders/${props.id}`}
      >
        <IonText className="ml-auto font-semibold">Order Details</IonText>
        <IonIcon src={chevronForwardOutline} slot="end" />
      </IonButton>
    </div>
  );
}

export default memo(OrderItem);