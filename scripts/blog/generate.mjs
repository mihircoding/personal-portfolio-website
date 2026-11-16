// Writes blog/index.html and blog/<slug>/index.html from posts/*.md and
// returns the Vite input map for those pages. Called from vite.config.js,
// so it runs on every `vite` and `vite build`.
import fs from "node:fs";
import path from "node:path";
import { loadPosts } from "./posts.mjs";
import { createMarkdown } from "./markdown.mjs";
import { renderIndex, renderPost } from "./render.mjs";

export async function generateBlog({ root, includeDrafts = false }) {
  const outDir = path.join(root, "blog");
  const posts = loadPosts(path.join(root, "posts"), { includeDrafts });
  const md = await createMarkdown({ figuresDir: path.join(root, "posts", "figures") });

  try {
    fs.rmSync(outDir, { recursive: true, force: true });
  } catch {
    // Folder could not be cleared (locked files); pages are overwritten below.
  }

  const inputs = {};
  const write = (name, rel, html) => {
    const file = path.join(outDir, rel, "index.html");
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, html);
    inputs[name] = file;
  };

  write("blog", "", renderIndex(posts));
  posts.forEach((post, i) => {
    // posts are newest first
    const html = renderPost(post, md.render(post.body), {
      newer: posts[i - 1],
      older: posts[i + 1],
    });
    write(`blog-${post.slug}`, post.slug, html);
  });

  return inputs;
}
