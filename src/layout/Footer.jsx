import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/site";

export const Footer = () => (
  <footer className="border-t border-border/60">
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}. Built with React, Vite and
        Tailwind.
      </p>
      <div className="flex items-center gap-3">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="size-4" />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Linkedin className="size-4" />
        </a>
        <a
          href={`mailto:${profile.email}`}
          aria-label="Email"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          <Mail className="size-4" />
        </a>
      </div>
    </div>
  </footer>
);
