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
    const { name, description, altName } = data;
    return {
      id: snapshot.id,
      name,
      description,
      altName,
    };
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
    const { name, description, price, image, category, sales } = data;
    return {
      id: snapshot.id,
      name,
      description,
      price,
      image,
      sales,
      category,
    };
  },
  toFirestore: (product: WithFieldValue<ProductType>) => ({
    ...product,
    updatedAt: serverTimestamp(),
  }),
};
