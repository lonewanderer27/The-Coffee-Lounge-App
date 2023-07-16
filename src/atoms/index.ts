import { AtomEffect } from "recoil";

export function log(name: string, data: unknown) {
  console.log(name);
  console.table(data);
}

export const sessionStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedSession = sessionStorage.getItem(key);
    if (
      savedSession !== null &&
      savedSession !== "null" &&
      savedSession !== undefined &&
      savedSession !== "undefined"
    ) {
      setSelf(JSON.parse(savedSession));
    }
    onSet((newValue) => {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };
