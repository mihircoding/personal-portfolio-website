import { Button } from "@/components/Button";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Download,
  TrendingUp,
} from "lucide-react";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";

const skills = [
  "Python",
  "C++",
  "AI / LLMs",
  "Node.js",
  "TypeScript",
  "JavaScript",
  "React",
  "SQL",
  "Sci-kit Learn",
  "Pandas",
  "NumPy",
  "OpenCV",
  "Git",
  "Jenkins",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/85 to-background" />
      </div>

      {/* Faint upward "market" chart line */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-1/2 pointer-events-none opacity-[0.15]"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,260 L120,240 L240,250 L360,210 L480,220 L600,170 L720,180 L840,120 L960,130 L1080,70 L1200,40"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
        />
        <path
          d="M0,260 L120,240 L240,250 L360,210 L480,220 L600,170 L720,180 L840,120 L960,130 L1080,70 L1200,40 L1200,300 L0,300 Z"
          fill="url(#chartFill)"
        />
      </svg>

      {/* Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Software Engineer • AI &amp; Tooling
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Developing tools
                <br />
                that I{" "}
                <span className="font-serif font-normal glow-text">love</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Hi, I'm Mihir Konda - a new graduate from the University of Maryland with projects and experience in Python, C++, and AI driven development. I like to build, break and learn.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button
                size="lg"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Me <ArrowRight className="w-5 h-5" />
              </Button>
              <AnimatedBorderButton href="/resume.pdf" download>
                <Download className="w-5 h-5" />
                Download Resume
              </AnimatedBorderButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">Follow me: </span>
              {[
                { icon: Github, href: "https://github.com/mihircoding" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/mihirkonda/" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="p-2 rounded-full glass hover:text-highlight hover:border-highlight/40 transition-all duration-300"
                >
                  {<social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="animate-fade-in animation-delay-300">
            <div className="relative max-w-md mx-auto">
              <div className="photo-frame">
                <img
                  src="/me-hongkong.jpg"
                  alt="Mihir Konda"
                  className="w-full aspect-[3/4] object-cover rounded-xl"
                />
              </div>

              {/* Floating finance-style badge */}
              <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 animate-float">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills ticker */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 text-center">
            The stack I trade in
          </p>
          <div className="relative overflow-hidden border-y border-border/60 py-4">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            <div className="flex animate-marquee">
              {[...skills, ...skills].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 px-6 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animation-delay-800">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
