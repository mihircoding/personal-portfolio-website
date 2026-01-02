const experiences = [
  {
    period: "June 2025 — August 2025",
    role: "Full Stack SWE Intern",
    company: "FrontLine Insurance",
    location: "Orlando, FL",
    description:
      "• Developed a full-stack time-tracking web application for employees to log and allocate hours across projects, streamlining internal operations.\n• Built and integrated backend services with Node.js and PostgreSQL, ensuring secure and scalable data storage for sensitive insurance workflows.\n• Leveraged Windsurf to integrate AI-driven automation into the workflow and management system, improving team productivity by 30%.",
    technologies: ["Node.js", "PostgreSQL", "Windsurf"],
    current: false,
  },
  {
    period: "May 2024 — August 2024",
    role: "Quality Engineering Intern",
    company: "FrontLine Insurance",
    location: "Orlando, FL",
    description:
      "• Developed automated test scripts in TypeScript using Playwright for insurance claim filing and policy creation.\n• Collaborated with cross-functional teams to integrate automated testing into CI/CD pipeline.\n• Enhanced testing efficiency for claim systems reducing manual testing efforts.",
    technologies: ["TypeScript", "Playwright", "CI/CD"],
    current: false,
  },
  {
    period: "May 2022 — August 2022",
    role: "Software Development Intern",
    company: "Cognitive GeoInterpretation Inc.",
    location: "Tallahassee, FL",
    description:
      "• Collaborated with teams to streamline data processing and enhanced efficiency of seafloor mapping.\n• Played a pivotal role in interpreting complex data sets through generating graphs with Python.\n• Leveraged machine learning techniques (XGBoost) to analyze unknown terrain and ocean temperature data.",
    technologies: ["Python", "XGBoost", "Machine Learning"],
    current: false,
  },
  {
    period: "December 2023 — April 2024",
    role: "Sign Language Detection Application",
    company: "Project",
    location: "",
    description:
      "• Built a real-time ASL recognition tool via webcam input.\n• Evaluated multiple classifiers (Random Forest, Logistic Regression Neural Networks etc.) for performance.\n• Tagged and labeled 2000+ images using on-premise computing to enhance model accuracy.",
    technologies: ["scikit-learn", "NumPy", "OpenCV"],
    current: false,
  },
  {
    period: "May 2023 — August 2023",
    role: "Clinical Billing Application",
    company: "Project",
    location: "",
    description:
      "• Created a webpage with integrated frontend and backend solutions to ensure efficient billing processes.\n• Streamlined patient record management and procedure tracking for a local clinic.\n• Collaborated with clinic staff to understand their workflow requirements.",
    technologies: ["jQuery", "Node.js", "SQL"],
    current: false,
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/4 w-96
       h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span
            className="text-secondary-foreground text-sm
           font-medium tracking-wider uppercase animate-fade-in"
          >
            Career Journey
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold
           mt-4 mb-6 animate-fade-in animation-delay-100
            text-secondary-foreground"
          >
            Experience that{" "}
            <span className="font-serif italic font-normal text-white">
              {" "}
              speaks volumes.
            </span>
          </h2>

          <p
            className="text-muted-foreground
           animate-fade-in animation-delay-200"
          >
            A timeline of my professional growth, from curious beginner to
            senior engineer leading teams and building products at scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-glow absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/70 via-primary/30 to-transparent md:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative grid md:grid-cols-2 gap-8 animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 150}ms` }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={`pl-8 md:pl-0 ${
                    idx % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:col-start-2 md:pl-16"
                  }`}
                >
                  <div
                    className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}
                  >
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                    <p className="text-muted-foreground">
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                    <p className="text-sm text-muted-foreground mt-4 whitespace-pre-line">
                      {exp.description}
                    </p>
                    <div
                      className={`flex flex-wrap gap-2 mt-4 ${
                        idx % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      {exp.technologies.map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};