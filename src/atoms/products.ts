import { atom } from "recoil";

export const productIdAtom = atom<string>({
  key: "productId",
  default: "",
});
