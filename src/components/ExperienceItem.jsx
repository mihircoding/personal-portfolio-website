import { useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { Tag } from "@/components/Tag";

export const ExperienceItem = ({ item, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-foreground">
              {item.company}
            </h3>
            <ChevronDown
              className={`size-3 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {item.role}
            {item.location ? ` · ${item.location}` : ""}
          </p>
        </div>
        <span className="whitespace-nowrap font-mono text-xs tabular-nums text-muted-foreground">
          {item.period}
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
          <ul className="mt-3 list-disc space-y-1.5 pl-4">
            {item.points.map((p, i) => (
              <li key={i} className="text-xs leading-relaxed text-muted-foreground">
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {item.tags?.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          {item.href && (
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ExternalLink className="size-3" />
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
