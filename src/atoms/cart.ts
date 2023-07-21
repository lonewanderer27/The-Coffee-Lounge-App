import { log, sessionStorageEffect } from ".";

import { CartItemType } from "../types";
import { atom } from "recoil";

export const cartAtom = atom<CartItemType[]>({
  key: "cart",
  default: [],
  effects_UNSTABLE: [
    sessionStorageEffect<CartItemType[] | []>("cart"),
    ({ onSet }) => onSet((cart) => log("cart", cart)),
  ],
});
