import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression()],
  build: {
    minify: true,
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 80,
  },
  resolve: {
    alias: {
      "@types": path.resolve(__dirname, "./src/types"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@worker": path.resolve(__dirname, "./src/workers/photoWorker.ts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
