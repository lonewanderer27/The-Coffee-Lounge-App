import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "The Coffee Lounge App",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.None,
    },
  },
};

export default config;
