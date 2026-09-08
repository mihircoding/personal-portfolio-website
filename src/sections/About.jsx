import { Github, Linkedin, Mail } from "lucide-react";
import { about, profile } from "@/data/site";

export const About = () => (
  <section id="about" className="mb-12 scroll-mt-20">
    <h2 className="mb-3 text-lg font-bold text-foreground">About</h2>

    {about.map((p, i) => (
      <p
        key={i}
        className="max-w-2xl text-sm leading-7 text-muted-foreground [&:not(:first-child)]:mt-3"
      >
        {p}
      </p>
    ))}

    <div className="mt-5 flex items-center gap-3">
      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <Github className="size-5" />
      </a>
      <a
        href={profile.linkedin}
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <Linkedin className="size-5" />
      </a>
      <a
        href={`mailto:${profile.email}`}
        aria-label="Email"
        className="text-muted-foreground transition-colors hover:text-foreground"
      >
        <Mail className="size-5" />
      </a>
    </div>
  </section>
);
