import { SetterOrUpdater, atom } from "recoil";
import { log, sessionStorageEffect } from ".";

import { CartItem } from "../types";

export const cartAtom = atom<CartItem[]>({
  key: "cart",
  default: [],
  effects_UNSTABLE: [
    sessionStorageEffect<CartItem[] | []>("cart"),
    ({ onSet }) => onSet((cart) => log("cart", cart)),
  ],
});
