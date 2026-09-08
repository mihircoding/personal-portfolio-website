import { Tag } from "@/components/Tag";
import { skills } from "@/data/site";

export const Skills = () => (
  <section id="skills" className="mb-12 scroll-mt-20">
    <h2 className="mb-3 text-lg font-bold text-foreground">Skills</h2>
    <div className="flex flex-wrap gap-1.5">
      {skills.map((s) => (
        <Tag key={s}>{s}</Tag>
      ))}
    </div>
  </section>
);
