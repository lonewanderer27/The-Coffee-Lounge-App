import { SetterOrUpdater, useRecoilState } from "recoil";
import { collection, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { CartItemType } from "../types";
import { cartAtom } from "../atoms/cart";
import { useIonToast } from "@ionic/react";

export function useCart() {
  const [presentToast] = useIonToast();

  const toast = (position: "top" | "middle" | "bottom", message: string) => {
    presentToast({
      message,
      duration: 1500,
      position: position,
    });
  };

  const firestore = useFirestore();
  const [cart, setCart] = useRecoilState(cartAtom);
  const [totalPrice, setTotalPrice] = useState(0);

  const productsCollection = collection(firestore, "products");
  const productsQuery = query(productsCollection);
  const { data } = useFirestoreCollectionData(productsQuery, { idField: "id" });

  const addToCart = (CartItem: CartItemType) => {
    toast("bottom", `Added to cart!`);
    const updatedCart = [...cart, CartItem];
    setCart(updatedCart);
    return updatedCart;
  };

  const removeFromCart = (index: number) => {
    let updatedCart = structuredClone(cart);
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    return updatedCart;
  };

  const addItem = (index: number) => {
    let updatedCart = structuredClone(cart);
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    return updatedCart;
  };

  const removeItem = (index: number) => {
    const updatedCart = structuredClone(cart);
    updatedCart[index].quantity -= 1;
    setCart(updatedCart);
    return updatedCart;
  };

  useEffect(() => {
    const totalPrice = cart.reduce((acc, item) => {
      const product = data?.find((p) => p.id === item.product_id);
      if (product) {
        return acc + product.price * item.quantity;
      }
      return acc;
    }, 0);
    setTotalPrice(totalPrice);
  }, [data, cart]);

  return {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    addItem,
    removeItem,
    count: cart.length,
    totalPrice,
  };
}
