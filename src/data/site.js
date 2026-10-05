// Single source of truth for everything the site renders.
// Both the home page and /projects read from here.

export const profile = {
  name: "Mihir Konda",
  initials: "MK",
  headline: "Hi, I'm Mihir",
  tagline:
    "A software engineer at IBM interested in financial markets and tools surrounding them.",
  photo: "/4ed3a81b-167c-48a3-bfc3-db7311112182.jpg",
  location: "Baton Rouge, LA",
  email: "mihir.konda@gmail.com",
  phone: "(850) 273-2335",
  phoneHref: "tel:+18502732335",
  github: "https://github.com/mihircoding",
  linkedin: "https://www.linkedin.com/in/mihirkonda/",
  resume: "/resume.pdf",
};

export const about = [
  "I'm a software engineer at IBM in Baton Rouge, building ServiceNow applications and integrations for enterprise clients. I studied Computer Science at the University of Maryland, and before IBM I interned across insurance applications, automated testing, and machine learning.",
  "Outside of work I build quantitative finance systems from scratch — a matching engine with the backtester that routes orders into it, two alpha strategies with the risk allocator that sizes them, and an arbitrage and market-making system for prediction markets. All Python, each with a test suite and a write-up of what the backtests returned.",
];

export const experience = [
  {
    company: "IBM",
    role: "Software Engineer",
    location: "Baton Rouge, LA",
    period: "Jul 2026 — Present",
    href: "https://www.ibm.com",
    logo: "/logo-ibm.png",
    points: [
      "Developing and deploying custom ServiceNow applications on the Now Platform to streamline enterprise IT service management workflows for internal stakeholders.",
      "Automating business processes using Flow Designer, Business Rules and Script Includes in JavaScript, reducing manual ticket handling and turnaround time.",
      "Building integrations between ServiceNow and external enterprise systems using REST APIs and IntegrationHub, ensuring reliable data flow across platforms.",
    ],
    tags: ["ServiceNow", "JavaScript", "REST APIs", "IntegrationHub"],
  },
  {
    company: "FrontLine Insurance",
    role: "Software Engineering Intern",
    location: "Orlando, FL",
    period: "Jun 2025 — Aug 2025",
    href: "https://www.frontlineinsurance.com",
    logo: "/logo-frontline.png",
    points: [
      "Streamlined internal operations by engineering a full-stack time management application, cutting admin overhead for project hour allocation by 20%.",
      "Enhanced productivity 30% by integrating AI-driven automation workflows with Windsurf, automating project management tasks and status updates.",
      "Ensured data integrity for sensitive insurance workflows by designing a normalized relational schema in PostgreSQL to handle employee logs and projects.",
    ],
    tags: ["Node.js", "PostgreSQL", "Windsurf"],
  },
  {
    company: "FrontLine Insurance",
    role: "Quality Engineering Intern",
    location: "Orlando, FL",
    period: "May 2024 — Aug 2024",
    href: "https://www.frontlineinsurance.com",
    logo: "/logo-frontline.png",
    points: [
      "Developed automated test scripts in TypeScript using Playwright for insurance claim filing and policy creation.",
      "Collaborated with cross-functional teams to integrate automated testing into the CI/CD pipeline.",
      "Enhanced testing efficiency for claim systems, reducing manual testing effort.",
    ],
    tags: ["TypeScript", "Playwright", "CI/CD"],
  },
  {
    company: "Cognitive GeoInterpretation",
    role: "AI/ML Intern",
    location: "Tallahassee, FL",
    period: "May 2022 — Aug 2022",
    logo: "/logo-cgi.png",
    points: [
      "Optimized seafloor mapping by developing Python-based data processing scripts, reducing data interpretation time by 25%.",
      "Achieved 90% prediction accuracy analyzing unknown terrain by implementing and tuning XGBoost machine learning models.",
      "Developed data visualizations of seafloor terrain predictions to help others see correlations between datasets.",
    ],
    tags: ["Python", "XGBoost", "Machine Learning"],
  },
];

export const education = [
  {
    school: "University of Maryland",
    degree: "B.S. in Computer Science",
    location: "College Park, MD",
    period: "Graduated 2026",
    logo: "/logo-umd.png",
    href: "https://www.umd.edu",
  },
];

export const certifications = [
  {
    name: "Claude Certified Developer — Foundations",
    issuer: "Anthropic",
    badge: "/badge-claude-foundations.png",
    href: "https://www.credly.com/org/anthropic/badge/claude-certified-developer-foundations",
    // Flip to false to render an "In progress" label instead.
    earned: true,
    blurb:
      "Anthropic's developer credential covering the Claude API, prompt engineering, tool use, agents, MCP and Claude Code integration.",
  },
];

export const skills = [
  "Python",
  "C++",
  "NumPy",
  "pandas",
  "SciPy",
  "statsmodels",
  "scikit-learn",
  "Matplotlib",
  "Plotly",
  "Streamlit",
  "pytest",
  "Jupyter",
  "SQL",
  "PostgreSQL",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "OpenCV",
  "Playwright",
  "ServiceNow",
  "Git",
  "GitHub Actions",
  "Jenkins",
  "Linux",
];

// ---------------------------------------------------------------------------
// Projects. `featured` controls what shows on the home page.
// `live` is what the card title and thumbnail link to.
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: "esports-arb",
    title: "Prediction Market Arbitrage",
    group: "quant",
    featured: true,
    blurb:
      "Cross-venue arbitrage, market making and series pricing across Kalshi and Polymarket esports markets, tested against real order books, the public trade tape and actual settlements.",
    detail:
      "12.9% of snapshots showed an arbitrage before fees and 2.8% after, almost always one contract deep. Quoting instead of taking earned 2.8c per contract out of sample across 589 matches, and lost 6.2c per contract inside two hours of the start, where the flow is informed. Streaming both venues over websockets, 97% of arbitrages were gone within a minute. A linear program over best-of-three outcomes found a $92 basket that pays the same whoever wins. Pricing Kalshi\u2019s map and totals markets off the match price found no edge \u2014 the model is calibrated but noisier than the market, and where they disagree the market is closer to the outcome. 83 tests.",
    image: "/proj-esports.png",
    imageAlt:
      "Cumulative market-making profit across 1,177 esports matches, with the out-of-sample half marked",
    tags: ["Python", "WebSockets", "Market making", "SciPy", "pytest"],
    live: "https://mihircoding.github.io/esports-arb/",
    source: "https://github.com/mihircoding/esports-arb",
  },
  {
    slug: "market-simulation-stack",
    title: "Market Simulation Stack",
    group: "quant",
    featured: true,
    blurb:
      "An event-driven backtester wired to a price-time priority matching engine, so a fill price is something the book prints rather than something a formula assumes. Every backtester charges you basis points for slippage; this one can walk a real order book instead.",
    detail:
      "The two halves were separate projects with the same hole in them. Routing orders into the engine showed the standard flat 2bp charge is wrong in both directions — five times too expensive for an order the touch absorbs, fourteen times too cheap for one that walks 151 price levels. Giving the book a realistic depth profile, thin at the touch and thicker behind it, then moved the crossover five times earlier — $409M of SPY down to $80M — and did not move the capacity answer at all, because what strands capital above $5bn is the participation cap rather than the cost of the fill. Knowing which of your numbers are load-bearing is most of what a fill model is for. 282 tests across the matching engine, the backtester and the bridge.",
    image: "/proj-backtest.png",
    imageAlt:
      "SPY equity curves against buy and hold, and the emergent spread distribution from the order book",
    tags: ["Python", "Market microstructure", "Event-driven design", "pytest"],
    live: "https://mihircoding.github.io/backtestingEngine/",
    source: "https://github.com/mihircoding/backtestingEngine",
  },
  {
    slug: "alpha-to-allocation",
    title: "Alpha to Allocation",
    group: "quant",
    featured: true,
    blurb:
      "Two alpha sleeves — 930 cointegrated equity pairs, and the variance risk premium harvested by delta-hedging short options — plus the full risk-allocation stack that decides how much of each to hold. Mean-variance, shrinkage, risk parity, CVaR, a factor model and hierarchical risk parity, all tested out of sample.",
    detail:
      "The allocator had only ever been tested on assets, where equal weighting beat it at every estimation window. Pointed at two strategies that correlate +0.03, mean-variance finally wins — by more than a full unit of Sharpe, and not for the reason the textbook predicts. It wins because one sleeve loses money and only mean-variance can see it: risk parity, inverse vol, HRP and min variance never read an expected return, and the losing sleeve is the quieter one, so all four allocate 37–43% toward it. Charging the option sleeve the bid-ask it had been selling through sharpens that: the weights of all four sit unchanged at every spread, including the ones where the other sleeve loses 6.5% a year. A method that never reads a return cannot notice that what it funds has stopped working. 256 tests.",
    image: "/proj-portfolio.png",
    imageAlt:
      "Efficient frontier with the candidate portfolios plotted against individual assets",
    tags: ["Python", "NumPy", "SciPy", "statsmodels", "Streamlit", "pytest"],
    live: "https://mihircoding.github.io/portfolioOptimization/",
    source: "https://github.com/mihircoding/portfolioOptimization",
  },
  {
    slug: "sign-language-detection",
    title: "Sign Language Detection",
    group: "earlier",
    featured: false,
    blurb:
      "A real-time ASL recognition tool driven by webcam input, using OpenCV and MediaPipe for hand landmark extraction.",
    detail:
      "Trained a multi-class model on 2,000+ labelled images, optimised for low-latency webcam input, and raised precision 15% by comparing Random Forest and neural network architectures to find the most robust classifier for varying lighting. Presented at a hackathon.",
    image: "/signLanguageProjectPicture.png",
    imageAlt: "Sign language detection running on a webcam frame",
    tags: ["Python", "OpenCV", "MediaPipe", "scikit-learn"],
    live: "https://github.com/mihircoding/sign-language-detector-python",
    source: "https://github.com/mihircoding/sign-language-detector-python",
  },
  {
    slug: "animal-detection",
    title: "Animal Detection Model",
    group: "earlier",
    featured: false,
    blurb:
      "A write-up of retraining YOLOv3 into an animal detector using a hand-tagged dataset of backyard wildlife.",
    detail: "",
    image: "/cowSitting.webp",
    imageAlt: "A cow sitting in a field",
    tags: ["Python", "OpenCV", "YOLOv3"],
    report: "/CS project report.pdf",
    reportLabel: "Report (PDF)",
  },
  {
    slug: "nutrivision",
    title: "NutriVision",
    group: "earlier",
    featured: false,
    blurb:
      "A nutrition tracking app that uses AI-powered computer vision through Meta glasses to identify food items in real time.",
    detail:
      "Machine learning models estimate calories and nutritional information straight from the video feed. Built out to 100+ people to accommodate differing medical needs and let them share their tracking with their doctor.",
    tags: ["Claude", "iOS", "Computer Vision", "Machine Learning"],
  },
  {
    slug: "clinical-billing",
    title: "Clinical Billing Management System",
    group: "earlier",
    featured: false,
    blurb:
      "A clinical billing application that uses optical character recognition to read data off documents and feed it into a centralised healthcare management system.",
    detail:
      "Includes an interface for doctors to review, edit and manage patient records with accurate date tracking. Automating the data entry cut billing processing time by 20%.",
    tags: ["Python", "Node.js", "SQL", "OCR"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const quantProjects = projects.filter((p) => p.group === "quant");
export const earlierProjects = projects.filter((p) => p.group === "earlier");
