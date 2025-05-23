import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "tunis-event-app",
  webDir: "dist",
  plugins: {
    SplashScreen: {
      launchAutoHide: true,
      splashFullScreen: true,
      splashImmersive: true,
      androidScaleType: "CENTER_CROP",
    },
  },
};

export default config;
