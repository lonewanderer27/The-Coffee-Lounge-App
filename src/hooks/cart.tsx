import {
  Additive,
  Additives,
  CartItemType,
  Ice,
  Milk,
  Milks,
  ProductConfig,
  ProductType,
  Size,
  Sizes,
  Syrup,
  Syrups,
} from "../types";
import { collection, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

import { ProductConvert } from "../converters/products";
import { cartAtom } from "../atoms/cart";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { useIonToast } from "@ionic/react";
import { useRecoilState } from "recoil";

export const computeProductPrice = (
  basePrice: number,
  cartItem: CartItemType | ProductConfig
) => {
  let price = basePrice;

  if (cartItem.size !== Size.None) {
    price += Sizes.find((s) => s.name === cartItem.size)?.price!;
  }

  if (cartItem.milk !== Milk.None) {
    price += Milks.find((m) => m.name === cartItem.milk)?.price!;
  }

  if (cartItem.syrup !== Syrup.None) {
    price += Syrups.find((s) => s.name === cartItem.syrup)?.price!;
  }

  if (cartItem.additives.length !== 0) {
    cartItem.additives.forEach((a) => {
      price += Additives.find((ad) => ad.name === a)?.price!;
    });
  }

  return price;
};

export function useCart() {
  const db = getFirestore();
  const [presentToast] = useIonToast();

  const toast = (position: "top" | "middle" | "bottom", message: string) => {
    presentToast({
      message,
      duration: 1500,
      position: position,
    });
  };

  const [cart, setCart] = useRecoilState(cartAtom);
  const [totalPrice, setTotalPrice] = useState(0);
  const [data] = useCollectionOnce(
    collection(db, "products").withConverter(ProductConvert)
  );

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

  const addQty = (index: number) => {
    let updatedCart = structuredClone(cart);
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    return updatedCart;
  };

  const removeQty = (index: number) => {
    const updatedCart = structuredClone(cart);
    updatedCart[index].quantity -= 1;
    setCart(updatedCart);
    return updatedCart;
  };

  useEffect(() => {
    const totalPrice = cart.reduce((acc, cartItem) => {
      const product = data?.docs?.find((p) => p.id === cartItem.product_id);
      if (product) {
        return (
          acc +
          computeProductPrice(product.get("price"), cartItem) *
            cartItem.quantity
        );
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
    addQty: addQty,
    removeQty: removeQty,
    count: cart.length,
    totalPrice,
  };
}
