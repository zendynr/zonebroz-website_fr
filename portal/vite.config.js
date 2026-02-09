import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  root: ".",
  base: "/portal/",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "index.html",
        client: "client.html",
      },
    },
  },
});
