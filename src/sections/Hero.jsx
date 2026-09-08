import { profile } from "@/data/site";

export const Hero = () => (
  <section className="mb-10 flex items-center justify-between gap-8">
    <div className="min-w-0">
      <h1 className="animate-enter text-3xl font-bold leading-none tracking-tighter sm:text-5xl">
        {profile.headline}
      </h1>
      <p className="animate-enter delay-75 mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
        {profile.tagline}
      </p>
    </div>

    <img
      src={profile.photo}
      alt={profile.name}
      className="animate-enter delay-150 size-24 flex-shrink-0 rounded-full border-2 border-border object-cover sm:size-28"
    />
  </section>
);
