import { CategoryType } from "../types";
import { atom } from "recoil";

export const productIdAtom = atom<string>({
  key: "productId",
  default: "",
});

export const categoryAtom = atom<CategoryType>({
  key: "category",
});
