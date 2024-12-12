import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// import { crx } from "vite-plugin-chrome-extension";
// import { fileURLToPath } from "url";
// import path from "path";
import { chromeExtension } from "vite-plugin-chrome-extension";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

import manifest from "./src/manifest.json"; // Adjust path if necessary

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: "src/manifest.json",
    },
  },
  plugins: [react(), chromeExtension({ manifest })],
});

//     staticCopy({
//       targets: [
//         {
//           src: "src/assets/*",
//           dest: "dist/assets",
//         },
//       ],
//     }),
