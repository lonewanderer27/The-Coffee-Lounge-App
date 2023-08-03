import {
  BranchType,
  DeliveryAddressType,
  DeliveryOptionType,
  PaymentOptionType,
} from "../types";
import { atom, selector } from "recoil";

import { cartAtom } from "./cart";

export const payOptionAtom = atom<PaymentOptionType | null>({
  key: "payOption",
  default: null,
  effects_UNSTABLE: [
    (q) => {
      q.onSet((newValue) => console.log("payOption: ", newValue));
    },
  ],
});

export const deliverAddressChoiceAtom = atom<DeliveryAddressType | null>({
  key: "deliverAddressOption",
  default: null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => console.log("deliveryAddress: ", newValue));
    },
  ],
});

export const deliverOptionAtom = atom<DeliveryOptionType | null>({
  key: "deliverOption",
  default: null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => console.log("deliverOption: ", newValue));
    },
  ],
});

export const branchAtom = atom<BranchType | null>({
  key: "branchOption",
  default: null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newValue) => console.log("branch: ", newValue));
    },
  ],
});

export const readyToPayAtom = selector<boolean>({
  key: "readyToPay",
  get: ({ get }) => {
    const deliverAddress = get(deliverAddressChoiceAtom);
    const deliverOption = get(deliverOptionAtom);
    const branchOption = get(branchAtom);

    if (get(payOptionAtom) === null) {
      return false;
    }

    if (get(cartAtom).length === 0) {
      return false;
    }

    if (deliverOption === null) {
      return false;
    }

    if (deliverOption === DeliveryOptionType.Delivery) {
      if (deliverAddress === null) {
        return false;
      }
      return true;
    } else if (deliverOption === DeliveryOptionType.Pickup) {
      if (branchOption === null) {
        return false;
      }
      return true;
    }

    return true;
  },
});
