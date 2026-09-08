import { ArrowUpRight, FileText, Github } from "lucide-react";
import { Tag } from "@/components/Tag";

export const ProjectCard = ({ project, showDetail = false }) => (
  <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-muted-foreground/40">
    {project.image && (
      <div className="aspect-video overflow-hidden border-b border-border bg-white">
        <img
          src={project.image}
          alt={project.imageAlt || project.title}
          loading="lazy"
          className="size-full object-cover object-top"
        />
      </div>
    )}

    <div className="flex flex-1 flex-col p-4">
      <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>

      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {project.blurb}
      </p>

      {showDetail && project.detail && (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {project.detail}
        </p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 pt-1">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowUpRight className="size-3" />
            {project.liveLabel || "Live"}
          </a>
        )}
        {project.source && (
          <a
            href={project.source}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-3" />
            Source
          </a>
        )}
        {project.report && (
          <a
            href={project.report}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <FileText className="size-3" />
            {project.reportLabel || "Report"}
          </a>
        )}
      </div>
    </div>
  </article>
);
