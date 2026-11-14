# Blog design (2026-11-14)

**What:** a daily learning log at `/blog/`, one page per day, starting Nov 12, 2026 (Day 1). Topics: C++, operating systems, building apps. Medium-style reading layout: 680px column, serif body, large title, author line with day number, date and read time.

**Why:** a public record of daily work that recruiters and search engines can read, on the portfolio site itself.

**Approaches considered**
1. Markdown files in the repo, each built into a real page (chosen). Fits the existing multi-page Vite build and the S3/CloudFront hosting, which 404s on paths that are not real files.
2. One client-rendered page with `?post=` URLs. Rejected: no real URLs, weak link previews and indexing.
3. Hosted platform (Medium, Hashnode). Rejected: posts live off the site.

**How**
- `posts/YYYY-MM-DD-name.md` with front matter: `title`, `date`, `tags` (`cpp`, `os`, `apps`), `summary`, optional `draft: true`. Files starting with `_` are ignored.
- `scripts/blog/` generates `blog/index.html` and `blog/<name>/index.html` when `vite.config.js` loads, and adds them as build inputs. `blog/` is gitignored.
- Post text is written into the HTML at build time; code is highlighted with Shiki for light and dark themes. React mounts only the shared Navbar and Footer (`src/blog-main.jsx`), plus the topic filter on the index.
- Drafts appear in `npm run dev` only.
- `npm test` covers post loading, validation and page generation.

**Not included:** comments, search, RSS, editor UI, latest-posts section on the home page.
