// Markdown -> HTML with build-time code highlighting (light + dark themes).
import MarkdownIt from "markdown-it";
import { createHighlighter } from "shiki";

const LANGS = [
  "cpp", "c", "bash", "python", "javascript", "typescript", "jsx", "tsx",
  "json", "asm", "makefile", "cmake", "rust", "sql", "yaml", "diff",
];

export async function createMarkdown() {
  const highlighter = await createHighlighter({
    themes: ["github-light", "github-dark"],
    langs: LANGS,
  });
  const loaded = new Set(highlighter.getLoadedLanguages());

  return new MarkdownIt({
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
}
