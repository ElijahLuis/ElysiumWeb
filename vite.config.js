import { defineConfig } from "vite";
export default defineConfig({
  root: "client",
  server: { port: 5173, open: true },
  build: { outDir: "../dist" }
});
