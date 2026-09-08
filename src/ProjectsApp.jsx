import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/layout/Navbar";
import { Footer } from "@/layout/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { earlierProjects, quantProjects } from "@/data/site";

function ProjectsApp() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar active="projects" />

      <main className="mx-auto max-w-4xl px-6 py-12 sm:py-20">
        <section className="mb-10">
          <h1 className="animate-enter text-3xl font-bold leading-none tracking-tighter sm:text-5xl">
            Projects
          </h1>
          <p className="animate-enter delay-75 mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Quantitative finance tools built from scratch — pricing models, an
            event-driven backtester, a matching engine, portfolio optimizers and
            a stat-arb study. Each one is tested, and each one reports what the
            data actually said rather than the result I was hoping for.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="mb-3 text-lg font-bold text-foreground">
            Quantitative finance
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {quantProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} showDetail />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-3 text-lg font-bold text-foreground">
            Earlier work
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {earlierProjects.map((p) => (
              <ProjectCard key={p.slug} project={p} showDetail />
            ))}
          </div>
        </section>

        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3" />
          Back home
        </a>
      </main>

      <Footer />
    </div>
  );
}

export default ProjectsApp;
