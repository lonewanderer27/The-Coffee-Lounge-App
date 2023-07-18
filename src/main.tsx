import App from "./App";
import React from "react";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";

const firebaseConfig = {
  apiKey: "AIzaSyDpRsaLBzTnR1hN1YCkePRqI6BpVdq_NQw",
  authDomain: "the-coffee-lounge.firebaseapp.com",
  projectId: "the-coffee-lounge",
  storageBucket: "the-coffee-lounge.appspot.com",
  messagingSenderId: "929442369121",
  appId: "1:929442369121:web:862ca3b3cc78aed7192420",
  measurementId: "G-MENXM5XNW8",
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
