import { ExperienceItem } from "@/components/ExperienceItem";
import { experience } from "@/data/site";

export const Experience = () => (
  <section id="experience" className="mb-12 scroll-mt-20">
    <h2 className="text-lg font-bold text-foreground">Experience</h2>
    <div className="mt-2">
      {experience.map((item, i) => (
        <ExperienceItem key={`${item.company}-${i}`} item={item} defaultOpen={i === 0} />
      ))}
    </div>
  </section>
);
