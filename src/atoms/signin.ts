import { log, sessionStorageEffect } from ".";

import { LoginProvider } from "../types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  storage: localStorage,
});

export const emailForSignin = atom({
  key: "emailForSignin",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const loginProviderAtom = atom<LoginProvider | null>({
  key: "loginProvider",
  default: null,
  effects: [({ onSet }) => onSet((newCred) => log("loginProvider", newCred))],
});
