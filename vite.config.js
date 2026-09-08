import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        // Multi-page build: /  and  /projects/
        main: path.resolve(__dirname, "index.html"),
        projects: path.resolve(__dirname, "projects/index.html"),
      },
    },
  },
});
