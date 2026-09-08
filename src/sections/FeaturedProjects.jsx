import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/ProjectCard";
import { featuredProjects } from "@/data/site";

export const FeaturedProjects = () => (
  <section id="projects" className="mb-12 scroll-mt-20">
    <div className="mb-3 flex items-baseline justify-between">
      <h2 className="text-lg font-bold text-foreground">Projects</h2>
      <a
        href="/projects/"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        View all
        <ArrowRight className="size-3" />
      </a>
    </div>

    <div className="grid gap-4 sm:grid-cols-2">
      {featuredProjects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  </section>
);
