import {
  arrayRemove,
  arrayUnion,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

import { UserConvert } from "../converters/user";
import { db } from "../main";
import { getAuth } from "firebase/auth";
import { useDocument } from "react-firebase-hooks/firestore";

export default function useFavorite(product_id?: string) {
  const { currentUser } = getAuth();

  // "Loading" is a pseudo product id that exists in the database
  // so that on first render, where product_id is not yet determined
  // it will query the "Loading" product instead ;)
  const ref = doc(db, "users", currentUser?.uid ?? "Loading").withConverter(
    UserConvert
  );
  const [data] = useDocument(ref);

  const toggleFavorite = () => {
    if (isFavorite()) {
      updateDoc(doc(db, "users", currentUser!.uid), {
        favorites: arrayRemove(product_id),
      });
    } else {
      updateDoc(doc(db, "users", currentUser!.uid), {
        favorites: arrayUnion(product_id),
      });
    }
  };

  const isFavorite = () => {
    if (data?.get("favorites") != null && data?.get("favorites").length !== 0) {
      return data?.get("favorites").includes(product_id) || false;
    }
  };

  return {
    favorites: data?.get("favorites") ?? (["Loading"] as Array<string>),
    isFavorite: isFavorite(),
    toggleFavorite,
  };
}
