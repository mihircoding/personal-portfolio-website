import { ArrowUpRight, FileText, Github } from "lucide-react";
import { Tag } from "@/components/Tag";

// Where the title and thumbnail point: the project's own page if it has one,
// otherwise its repo.
const primaryHref = (p) => p.live || p.source || p.report || null;

const isExternal = (href) => /^https?:\/\//.test(href || "");

export const ProjectCard = ({ project, showDetail = false }) => {
  const href = primaryHref(project);
  const linkProps = isExternal(href)
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-muted-foreground/40">
      {project.image && (
        <a
          href={href}
          {...linkProps}
          aria-label={`Open ${project.title}`}
          className="block aspect-video overflow-hidden border-b border-border bg-white"
        >
          <img
            src={project.image}
            alt={project.imageAlt || project.title}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </a>
      )}

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-foreground">
          <a
            href={href}
            {...linkProps}
            className="inline-flex items-center gap-1 hover:underline hover:underline-offset-4"
          >
            {project.title}
            <ArrowUpRight className="size-3 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </h3>

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

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
          {project.live && project.live !== project.source && (
            <a
              href={project.live}
              {...(isExternal(project.live)
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowUpRight className="size-3" />
              {project.liveLabel || "Website"}
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
};
