import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  serverTimestamp,
} from "firebase/firestore";

import { OrderType } from "../types";

export const OrderConvert: FirestoreDataConverter<OrderType> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): OrderType {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as OrderType;
  },
  toFirestore: (order: WithFieldValue<OrderType>) => ({
    ...order,
    updatedAt: serverTimestamp(),
  }),
};
