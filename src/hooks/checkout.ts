import {
  DeliveryOptionType,
  DeliveryStatusType,
  OrderType,
  PaymentOptionType,
  PaymentStatusType,
} from "../types";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import {
  branchAtom,
  deliverOptionAtom,
  payOptionAtom,
} from "../atoms/checkout";
import { useIonAlert, useIonLoading, useIonRouter } from "@ionic/react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { cartAtom } from "../atoms/cart";
import { getAuth } from "firebase/auth";
import { orderAtom } from "../atoms/order";

export const useCheckout = (totalPrice: number) => {
  const [cart, setCart] = useRecoilState(cartAtom);
  const [payOption, setPayOption] = useRecoilState(payOptionAtom);
  const [deliverOption, setDeliverOption] = useRecoilState(deliverOptionAtom);
  const [branchOption, setbranchOption] = useRecoilState(branchAtom);
  const setOrderAtom = useSetRecoilState(orderAtom);
  const router = useIonRouter();
  const db = getFirestore();
  const { currentUser } = getAuth();
  const [presentLoading, dismiss] = useIonLoading();

  const [showAlert, hideAlert] = useIonAlert();

  function addOrder() {
    if (!currentUser) {
      router.push("/login");
      return;
    }

    (async () => {
      // create the order document for the user
      presentLoading("Adding order...");

      const newOrder: OrderType = {
        user_uid: currentUser?.uid,
        products: cart,
        total_price: totalPrice,
        payment_option: payOption!,
        payment_status: PaymentStatusType.Pending,
        payment_at: serverTimestamp(),
        created_at: serverTimestamp(),
        delivery_option: deliverOption!,
        delivery_status: DeliveryStatusType.Pending,
        branch: branchOption!,
      };

      addDoc(collection(db, "orders"), newOrder)
        .then((order) => {
          console.log("Success adding order: ", order);

          // clear the cart
          setCart([]);
          setPayOption(null);
          setDeliverOption(null);
          setbranchOption(null);

          // set the current order in the atom
          setOrderAtom(newOrder);

          // dismiss loading
          dismiss();

          // redirect to processing payment page
          router.push(`/order/${order.id}/process-payment/`);
        })
        .catch((error) => {
          // dismiss loading
          dismiss();
          console.error("Error adding document: ", error);

          showAlert({
            header: "Error",
            message:
              "There was an error adding your order. Would you like to try again?",
            buttons: [
              "Cancel",
              { text: "Try Again", handler: () => addOrder() },
            ],
            onDidDismiss: () => hideAlert(),
          });
        });
    })();
  }

  return {
    handlePay: addOrder,
  };
};
