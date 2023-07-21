import { OrderType } from "../types";
import { atom } from "recoil";

export const orderAtom = atom<OrderType | null>({
  key: "order",
  default: null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => console.log("order: ", newValue));
    },
  ],
});
