import { DeliveryAddressType } from "../types";
import { atom } from "recoil";

// only serves as the initial value for the delivery address
export const deliveryAddressAtom = atom<DeliveryAddressType | null>({
  key: "deliveryAddress",
  default: null,
});
