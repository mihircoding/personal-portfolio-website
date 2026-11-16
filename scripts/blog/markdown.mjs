// Markdown -> HTML with build-time code highlighting (light + dark themes).
import fs from "node:fs";
import path from "node:path";
import MarkdownIt from "markdown-it";
import { createHighlighter } from "shiki";

const LANGS = [
  "cpp", "c", "bash", "python", "javascript", "typescript", "jsx", "tsx",
  "json", "asm", "makefile", "cmake", "rust", "sql", "yaml", "diff",
];

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// A diagram is written as a fenced block:
//
//   ```figure
//   fifo
//   Caption text, *Markdown* allowed.
//   ```
//
// The first line names posts/figures/<name>.svg, which is inlined so it can
// follow the light/dark theme. The rest is the caption.
const figureRule = (md, figuresDir) => {
  const fallback = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() !== "figure") {
      return fallback(tokens, idx, options, env, self);
    }
    const [name = "", ...rest] = token.content.trim().split("\n");
    if (!/^[a-z0-9-]+$/.test(name.trim())) {
      throw new Error(`figure name "${name}" must be lowercase letters, digits and dashes`);
    }
    const file = path.join(figuresDir, `${name.trim()}.svg`);
    if (!fs.existsSync(file)) {
      throw new Error(`figure "${name.trim()}" not found (looked for ${file})`);
    }
    const svg = fs.readFileSync(file, "utf8").replace(/<\?xml[^>]*>\s*/, "");
    const caption = rest.join(" ").trim();
    return `<figure class="diagram"><div class="diagram-frame">${svg}</div>${
      caption ? `<figcaption>${md.renderInline(caption)}</figcaption>` : ""
    }</figure>\n`;
  };
};

// Gives h2/h3 headings an id so a post can link to its own sections.
const headingIds = (md) => {
  md.core.ruler.push("heading_ids", (state) => {
    const used = new Set();
    state.tokens.forEach((token, i) => {
      if (token.type !== "heading_open" || !["h2", "h3"].includes(token.tag)) return;
      let id = slugify(state.tokens[i + 1].content) || "section";
      for (let n = 2; used.has(id); n += 1) id = `${slugify(state.tokens[i + 1].content)}-${n}`;
      used.add(id);
      token.attrSet("id", id);
    });
  });
};

export async function createMarkdown({ figuresDir = "posts/figures" } = {}) {
  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: LANGS,
  });
  const loaded = new Set(highlighter.getLoadedLanguages());

  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
    highlight: (code, lang) =>
      highlighter.codeToHtml(code, {
        lang: loaded.has(lang) ? lang : "text",
        themes: { light: "github-light", dark: "github-dark" },
        defaultColor: false,
      }),
  });
  figureRule(md, figuresDir);
  headingIds(md);
  return md;
}
