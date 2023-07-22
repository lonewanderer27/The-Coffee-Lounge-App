// import { Suspense, lazy } from "react";
import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

// const App = lazy(() => import("./App"));
import App from "./App";
// import { IonSpinner } from "@ionic/react";
// import App from "./App";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDpRsaLBzTnR1hN1YCkePRqI6BpVdq_NQw",
  authDomain: "the-coffee-lounge.firebaseapp.com",
  projectId: "the-coffee-lounge",
  storageBucket: "the-coffee-lounge.appspot.com",
  messagingSenderId: "929442369121",
  appId: "1:929442369121:web:862ca3b3cc78aed7192420",
  measurementId: "G-MENXM5XNW8",
};

export const app = initializeApp(firebaseConfig);
initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
