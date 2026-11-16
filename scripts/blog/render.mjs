// HTML templates for /blog/ and /blog/<slug>/. Post text is written straight
// into the page so search engines and link previews can read it; React only
// mounts the shared Navbar and Footer (src/blog-main.jsx).
import { TAGS, formatDate } from "./posts.mjs";

const SITE = "https://www.mihirkondaportfolio.com";
const AUTHOR = "Mihir Konda";
const AVATAR = "/avatar.jpg";

export const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const page = ({ title, description, url, body }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${esc(description)}" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${SITE}${url}" />
    <link rel="canonical" href="${SITE}${url}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&family=Geist+Mono:wght@400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap"
      rel="stylesheet"
    />
    <title>${esc(title)}</title>
    <script>
      (function () {
        try {
          var t = localStorage.getItem("theme");
          if (!t) {
            t = window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light";
          }
          if (t === "dark") document.documentElement.classList.add("dark");
        } catch (e) {}
      })();
    </script>
  </head>
  <body>
    <div class="flex min-h-screen flex-col overflow-x-hidden">
      <div id="nav-root" class="h-14"></div>
${body}
      <div id="footer-root" class="mt-auto"></div>
    </div>
    <script type="module" src="/src/blog-main.jsx"></script>
  </body>
</html>
`;

const tagPills = (tags) =>
  tags
    .map(
      (t) =>
        `<a href="/blog/?tag=${t}" class="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground transition-colors hover:text-foreground">${esc(TAGS[t])}</a>`
    )
    .join("");

const meta = (post) =>
  post.date
    ? `Day ${post.day} · ${formatDate(post.date)} · ${post.minutes} min read`
    : `Earlier notes · ${post.minutes} min read`;

const indexItem = (post) => `
          <li data-tags="${post.tags.join(" ")}" class="border-b border-border/60 py-7">
            <p class="text-xs text-muted-foreground">${meta(post)}</p>
            <a href="/blog/${post.slug}/" class="group mt-2 block">
              <h2 class="text-xl font-bold leading-snug tracking-tight text-foreground group-hover:underline sm:text-2xl">${esc(post.title)}</h2>
              ${post.summary ? `<p class="mt-1.5 font-serif text-base leading-7 text-muted-foreground">${esc(post.summary)}</p>` : ""}
            </a>
            <div class="mt-3 flex flex-wrap gap-2">${tagPills(post.tags)}</div>
          </li>`;

const chip = (key, label) =>
  `<button type="button" data-filter="${key}" aria-pressed="${key === "all"}" class="filter-chip border-b-2 border-transparent pb-3 text-sm text-muted-foreground transition-colors hover:text-foreground">${esc(label)}</button>`;

export function renderIndex(posts) {
  const list = posts.length
    ? `<ul id="post-list">${posts.map(indexItem).join("")}
        </ul>
        <p id="no-posts" hidden class="py-10 text-sm text-muted-foreground">Nothing under this topic yet.</p>`
    : `<p class="py-10 text-sm text-muted-foreground">No entries yet.</p>`;

  return page({
    title: `Blog — ${AUTHOR}`,
    description:
      "A daily log of what Mihir Konda is learning in C++ and operating systems.",
    url: "/blog/",
    body: `      <main class="mx-auto w-full max-w-[680px] px-6 py-12 sm:py-16">
        <h1 class="text-3xl font-bold leading-none tracking-tighter sm:text-5xl">Blog</h1>
        <p class="mt-3 text-sm leading-7 text-muted-foreground">One page a day on what I'm learning in C++ and operating systems.</p>
        <div class="mt-8 flex gap-6 overflow-x-auto border-b border-border/60">
          ${[chip("all", "All"), ...Object.entries(TAGS).map(([k, v]) => chip(k, v))].join("\n          ")}
        </div>
        ${list}
      </main>`,
  });
}

const neighbor = (post, label, align) =>
  post
    ? `<a href="/blog/${post.slug}/" class="group block ${align}">
            <span class="text-xs text-muted-foreground">${label}</span>
            <span class="mt-1 block text-sm font-medium text-foreground group-hover:underline">${esc(post.title)}</span>
          </a>`
    : `<span></span>`;

export function renderPost(post, html, { older, newer } = {}) {
  return page({
    title: `${post.title} — ${AUTHOR}`,
    description:
      post.summary ||
      (post.date ? `Day ${post.day} of a daily learning log.` : "Notes from a learning log."),
    url: `/blog/${post.slug}/`,
    body: `      <main class="mx-auto w-full max-w-[680px] px-6 py-12 sm:py-16">
        <article>
          <h1 class="text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">${esc(post.title)}</h1>
          ${post.summary ? `<p class="mt-3 font-serif text-xl leading-8 text-muted-foreground">${esc(post.summary)}</p>` : ""}
          <div class="mt-7 flex items-center gap-3 border-y border-border/60 py-4">
            <img src="${AVATAR}" alt="" class="size-10 rounded-full object-cover" />
            <div>
              <p class="text-sm font-medium text-foreground">${AUTHOR}</p>
              <p class="text-xs text-muted-foreground">${meta(post)}</p>
            </div>
          </div>
          <div class="post-body mt-9">
${html}
          </div>
          <div class="mt-10 flex flex-wrap gap-2">${tagPills(post.tags)}</div>
        </article>
        <nav class="mt-10 grid grid-cols-2 gap-6 border-t border-border/60 pt-6">
          ${neighbor(older, older?.date ? "← Previous day" : "← Earlier notes", "text-left")}
          ${neighbor(newer, newer?.date ? "Next day →" : "Next →", "text-right")}
        </nav>
        <a href="/blog/" class="mt-10 inline-block text-xs text-muted-foreground transition-colors hover:text-foreground">← All entries</a>
      </main>`,
  });
}
