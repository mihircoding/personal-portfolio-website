import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/data/site";

const links = [
  { label: "Home", href: "/", match: "home" },
  { label: "Projects", href: "/projects/", match: "projects" },
  { label: "Experience", href: "/#experience", match: "experience" },
  { label: "Resume", href: profile.resume, match: "resume", external: true },
];

export const Navbar = ({ active = "home" }) => {
  const [open, setOpen] = useState(false);

  const linkClass = (l) =>
    `text-sm px-3 py-1.5 rounded-md transition-colors ${
      l.match === active
        ? "text-foreground font-medium"
        : "text-muted-foreground hover:text-foreground hover:bg-accent"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-6">
        <a
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground"
        >
          {profile.initials}.
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={linkClass(l)}
              {...(l.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground transition-opacity hover:opacity-60"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 px-6 py-2 md:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
