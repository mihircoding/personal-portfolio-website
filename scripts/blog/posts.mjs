// Reads posts/*.md and turns them into plain post objects.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export const BLOG_START = "2026-11-12";

export const TAGS = {
  cpp: "C++",
  os: "Operating Systems",
};

const DAY_MS = 24 * 60 * 60 * 1000;

const toIsoDate = (value, file) => {
  const iso =
    value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso) || Number.isNaN(Date.parse(iso))) {
    throw new Error(`${file}: "date" must look like 2026-11-12`);
  }
  return iso;
};

export const dayNumber = (isoDate) =>
  Math.round((Date.parse(isoDate) - Date.parse(BLOG_START)) / DAY_MS) + 1;

export const formatDate = (isoDate) =>
  new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

export const readMinutes = (text) =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

const slugFromFile = (file) => {
  const base = path.basename(file, ".md").toLowerCase();
  const rest = base.replace(/^\d{4}-\d{2}-\d{2}-?/, "");
  return (rest || base).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
};

export function loadPosts(dir, { includeDrafts = false } = {}) {
  if (!fs.existsSync(dir)) return [];
  const posts = [];
  const seen = new Map();

  for (const file of fs.readdirSync(dir).sort()) {
    if (!file.endsWith(".md") || file.startsWith("_")) continue;
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
    if (data.draft && !includeDrafts) continue;

    if (!data.title) throw new Error(`${file}: missing "title"`);
    // No date = notes from before the daily log; listed after every day.
    const date = data.date == null ? null : toIsoDate(data.date, file);
    const tags = [].concat(data.tags ?? []).map(String);
    for (const t of tags) {
      if (!TAGS[t]) {
        throw new Error(
          `${file}: unknown tag "${t}" (use ${Object.keys(TAGS).join(", ")})`
        );
      }
    }

    const slug = slugFromFile(file);
    if (seen.has(slug)) {
      throw new Error(`${file}: same URL as ${seen.get(slug)} (/blog/${slug}/)`);
    }
    seen.set(slug, file);

    posts.push({
      slug,
      title: String(data.title),
      date,
      tags,
      summary: data.summary ? String(data.summary) : "",
      day: date ? dayNumber(date) : null,
      minutes: readMinutes(content),
      body: content,
    });
  }

  return posts.sort(
    (a, b) =>
      (b.date ?? "").localeCompare(a.date ?? "") || a.slug.localeCompare(b.slug)
  );
}
