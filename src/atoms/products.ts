import { CategoryLoading, ProductLoading } from "../constants";

import { CategoryType } from "../types";
import { atom } from "recoil";

export const productIdAtom = atom<string>({
  key: "productId",
  default: ProductLoading.id,
});

export const categoryAtom = atom<CategoryType>({
  key: "category",
  default: CategoryLoading,
});
