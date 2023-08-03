import {
  CACHE_SIZE_UNLIMITED,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";

const queryClient = new QueryClient();

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
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
    cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  }),
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
