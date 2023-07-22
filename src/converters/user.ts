import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  serverTimestamp,
} from "firebase/firestore";

import { UserType } from "../types";

export const UserConvert: FirestoreDataConverter<UserType> = {
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): UserType {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      ...data,
    } as UserType;
  },
  toFirestore: (user: WithFieldValue<UserType>) => ({
    ...user,
    updatedAt: serverTimestamp(),
  }),
};
