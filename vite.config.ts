import { VitePWA } from "vite-plugin-pwa";
import { compression } from "vite-plugin-compression2";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    react(),
    legacy(),
    compression({
      deleteOriginalAssets: true,
      skipIfLargerOrEqual: true,
    }),
    VitePWA({
      registerType: "prompt",
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000,
      },
    }),
  ],
  assetsInclude: ["**/*.lottie"],
});
