import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path";
import { generateBlog } from "./scripts/blog/generate.mjs";

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  // Blog pages are generated from posts/*.md. Drafts show up in `npm run dev`
  // only, never in the deployed build.
  const blogPages = await generateBlog({
    root: __dirname,
    includeDrafts: command === "serve",
  });

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          // Multi-page build: /, /projects/, /blog/ and one page per post
          main: path.resolve(__dirname, "index.html"),
          projects: path.resolve(__dirname, "projects/index.html"),
          ...blogPages,
        },
      },
    },
  };
});
