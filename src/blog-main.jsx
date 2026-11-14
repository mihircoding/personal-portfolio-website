import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";

// Blog pages are static HTML (see scripts/blog). React only supplies the
// shared header and footer.
const nav = document.getElementById("nav-root");
nav.classList.remove("h-14");
nav.classList.add("sticky", "top-0", "z-50");
createRoot(nav).render(
  <StrictMode>
    <Navbar active="blog" />
  </StrictMode>
);
createRoot(document.getElementById("footer-root")).render(
  <StrictMode>
    <Footer />
  </StrictMode>
);

// Topic filter on /blog/
const chips = [...document.querySelectorAll("[data-filter]")];
const items = [...document.querySelectorAll("#post-list > li")];
const empty = document.getElementById("no-posts");

const applyFilter = (tag) => {
  const active = chips.some((c) => c.dataset.filter === tag) ? tag : "all";
  let shown = 0;
  for (const li of items) {
    const match = active === "all" || li.dataset.tags.split(" ").includes(active);
    li.hidden = !match;
    if (match) shown += 1;
  }
  for (const c of chips) {
    c.setAttribute("aria-pressed", String(c.dataset.filter === active));
  }
  if (empty) empty.hidden = shown > 0;
};

if (chips.length) {
  for (const c of chips) {
    c.addEventListener("click", () => {
      const tag = c.dataset.filter;
      history.replaceState(null, "", tag === "all" ? "/blog/" : `/blog/?tag=${tag}`);
      applyFilter(tag);
    });
  }
  applyFilter(new URLSearchParams(location.search).get("tag") ?? "all");
}
