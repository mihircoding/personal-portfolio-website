import { ExternalLink } from "lucide-react";
import { certifications } from "@/data/site";

export const Certifications = () => {
  if (!certifications.length) return null;

  return (
    <section id="certifications" className="mb-12 scroll-mt-20">
      <h2 className="mb-3 text-lg font-bold text-foreground">Certifications</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-muted-foreground/40"
          >
            <img
              src={c.badge}
              alt={`${c.name} badge`}
              loading="lazy"
              className="size-16 flex-shrink-0 object-contain"
            />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-foreground">
                {c.name}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {c.issuer}
                {!c.earned && " · In progress"}
              </p>
              {c.blurb && (
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {c.blurb}
                </p>
              )}
              <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                <ExternalLink className="size-3" />
                Verify
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
