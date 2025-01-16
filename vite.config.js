import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Diskettes",
        short_name: "Diskettes",
        description: "Code editor and sharing platform",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [{ src: "avatar.png", sizes: "512x512", type: "image/png" }],
      },
    }),
  ],
});
