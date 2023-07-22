import { CategoryType, ProductType } from "../types";
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  serverTimestamp,
} from "firebase/firestore";

export const CategoryConvert: FirestoreDataConverter<CategoryType> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): CategoryType {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as CategoryType;
  },
  toFirestore: (category: WithFieldValue<CategoryType>) => ({
    ...category,
    updatedAt: serverTimestamp(),
  }),
};

export const ProductConvert: FirestoreDataConverter<ProductType> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ProductType {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as ProductType;
  },
  toFirestore: (product: WithFieldValue<ProductType>) => ({
    ...product,
    updatedAt: serverTimestamp(),
  }),
};
