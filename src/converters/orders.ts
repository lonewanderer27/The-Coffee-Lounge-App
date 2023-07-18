import { CategoryType, OrderType, ProductType } from "../types";
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  serverTimestamp,
} from "firebase/firestore";

export const OrderConvert: FirestoreDataConverter<OrderType> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): OrderType {
    const data = snapshot.data(options);
    const {
      created_at,
      delivery_address_id,
      products,
      payment_status,
      total_price,
      user_uid,
      delivery_fee,
      delivery_option,
    } = data;
    return {
      id: snapshot.id,
      created_at,
      delivery_address_id,
      products,
      payment_status,
      total_price,
      user_uid,
      delivery_fee,
      delivery_option,
    };
  },
  toFirestore: (order: WithFieldValue<OrderType>) => ({
    ...order,
    updatedAt: serverTimestamp(),
  }),
};
