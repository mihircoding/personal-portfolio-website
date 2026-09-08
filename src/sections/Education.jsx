import { education } from "@/data/site";

export const Education = () => (
  <section id="education" className="mb-12 scroll-mt-20">
    <h2 className="text-lg font-bold text-foreground">Education</h2>
    <div className="mt-2">
      {education.map((e) => (
        <div
          key={e.school}
          className="flex items-start justify-between gap-4 border-b border-border py-4"
        >
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground">{e.school}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{e.degree}</p>
          </div>
          <span className="whitespace-nowrap font-mono text-xs tabular-nums text-muted-foreground">
            {e.period}
          </span>
        </div>
      ))}
    </div>
  </section>
);
