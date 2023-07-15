import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'The Coffee Lounge App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
