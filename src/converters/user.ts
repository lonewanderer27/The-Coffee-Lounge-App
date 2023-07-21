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
    const { default_address, nickname, gender, favorites } = data;
    return {
      id: snapshot.id,
      default_address,
      nickname,
      gender,
      favorites,
    };
  },
  toFirestore: (user: WithFieldValue<UserType>) => ({
    ...user,
    updatedAt: serverTimestamp(),
  }),
};
