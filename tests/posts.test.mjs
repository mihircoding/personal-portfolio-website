import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { loadPosts, dayNumber } from "../scripts/blog/posts.mjs";
import { generateBlog } from "../scripts/blog/generate.mjs";

const dirWith = (files) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "blog-"));
  fs.mkdirSync(path.join(root, "posts"));
  for (const [name, text] of Object.entries(files)) {
    fs.writeFileSync(path.join(root, "posts", name), text);
  }
  return root;
};
const post = (fm, body = "hello") => `---\n${fm}\n---\n${body}\n`;

test("day numbers count from Nov 12", () => {
  assert.equal(dayNumber("2026-11-12"), 1);
  assert.equal(dayNumber("2026-11-14"), 3);
  assert.equal(dayNumber("2027-03-15"), 124); // across a DST change
});

test("posts sort newest first, drafts and _files are skipped", () => {
  const root = dirWith({
    "2026-11-12-first.md": post("title: A\ndate: 2026-11-12\ntags: [cpp]"),
    "2026-11-13-second.md": post("title: B\ndate: 2026-11-13\ntags: os"),
    "2026-11-14-wip.md": post("title: C\ndate: 2026-11-14\ndraft: true"),
    "_template.md": post("title: T\ndate: 2026-11-15"),
  });
  const posts = loadPosts(path.join(root, "posts"));
  assert.deepEqual(posts.map((p) => p.slug), ["second", "first"]);
  assert.deepEqual(posts[0].tags, ["os"]);
  assert.equal(posts[1].date, "2026-11-12");
  assert.equal(loadPosts(path.join(root, "posts"), { includeDrafts: true }).length, 3);
});

test("bad front matter names the file", () => {
  const bad = (fm) => () => loadPosts(path.join(dirWith({ "2026-11-12-x.md": post(fm) }), "posts"));
  assert.throws(bad("date: 2026-11-12"), /2026-11-12-x\.md: missing "title"/);
  assert.throws(bad("title: A\ndate: yesterday"), /"date" must look like/);
  assert.throws(bad("title: A\ndate: 2026-11-12\ntags: [rust]"), /unknown tag "rust"/);
});

test("two files with the same URL are rejected", () => {
  const root = dirWith({
    "2026-11-12-notes.md": post("title: A\ndate: 2026-11-12"),
    "2026-11-13-notes.md": post("title: B\ndate: 2026-11-13"),
  });
  assert.throws(() => loadPosts(path.join(root, "posts")), /same URL/);
});

test("generates an index and one page per post, escaping titles", async () => {
  const root = dirWith({
    "2026-11-12-first.md": post("title: \"vector<int> & friends\"\ndate: 2026-11-12\ntags: [cpp]", "```cpp\nint x = 1;\n```\n<script>alert(1)</script>"),
    "2026-11-13-second.md": post("title: B\ndate: 2026-11-13"),
  });
  const inputs = await generateBlog({ root });
  assert.deepEqual(Object.keys(inputs).sort(), ["blog", "blog-first", "blog-second"]);
  const page = fs.readFileSync(path.join(root, "blog/first/index.html"), "utf8");
  assert.match(page, /vector&lt;int&gt; &amp; friends/);
  assert.match(page, /--shiki-dark/);
  assert.doesNotMatch(page, /<script>alert/);
  assert.match(page, /Next day →/);
  assert.match(page, /href="\/blog\/second\/"/);
  const index = fs.readFileSync(path.join(root, "blog/index.html"), "utf8");
  assert.ok(index.indexOf("/blog/second/") < index.indexOf("/blog/first/"));
});

test("no posts folder still produces an index", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "blog-"));
  const inputs = await generateBlog({ root });
  assert.deepEqual(Object.keys(inputs), ["blog"]);
  assert.match(fs.readFileSync(inputs.blog, "utf8"), /No entries yet/);
});

test("posts without a date are listed after every day", () => {
  const root = dirWith({
    "2026-11-12-first.md": post("title: A\ndate: 2026-11-12\ntags: [cpp]"),
    "old-notes.md": post("title: Notes\ntags: [os]"),
  });
  const posts = loadPosts(path.join(root, "posts"));
  assert.deepEqual(posts.map((p) => p.slug), ["first", "old-notes"]);
  assert.equal(posts[1].date, null);
  assert.equal(posts[1].day, null);
});

test("the apps topic is gone", () => {
  const bad = dirWith({ "2026-11-12-x.md": post("title: A\ndate: 2026-11-12\ntags: [apps]") });
  assert.throws(() => loadPosts(path.join(bad, "posts")), /unknown tag "apps"/);
});

test("undated posts and figures render", async () => {
  const root = dirWith({
    "2026-11-12-first.md": post("title: A\ndate: 2026-11-12"),
    "old-notes.md": post("title: Notes", "## Chapter 7: Scheduling\n\n```figure\nfifo\nFIFO, *based on* Figure 7.2.\n```"),
  });
  fs.mkdirSync(path.join(root, "posts", "figures"));
  fs.writeFileSync(path.join(root, "posts", "figures", "fifo.svg"), '<?xml version="1.0"?>\n<svg viewBox="0 0 1 1"><rect class="ja"/></svg>');
  await generateBlog({ root });
  const page = fs.readFileSync(path.join(root, "blog/old-notes/index.html"), "utf8");
  assert.match(page, /Earlier notes · 1 min read/);
  assert.match(page, /<figure class="diagram">.*<svg viewBox="0 0 1 1">/s);
  assert.doesNotMatch(page, /<\?xml/);
  assert.match(page, /<figcaption>FIFO, <em>based on<\/em> Figure 7.2.<\/figcaption>/);
  assert.match(page, /<h2 id="chapter-7-scheduling">/);
  assert.match(page, /Next day →/);
  const day1 = fs.readFileSync(path.join(root, "blog/first/index.html"), "utf8");
  assert.match(day1, /← Earlier notes/);
});

test("a missing figure fails the build with its name", async () => {
  const root = dirWith({ "notes.md": post("title: N", "```figure\nnope\n```") });
  await assert.rejects(generateBlog({ root }), /figure "nope" not found/);
});
