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
  "I'm a software engineer at IBM in Baton Rouge. I build ServiceNow apps and integrations for enterprise clients. I studied Computer Science at the University of Maryland, and before IBM I interned in insurance software, test automation and machine learning.",
  "On the side I build trading and market tools from scratch in Python: an order book simulator with a backtester, a few trading strategies with a system that decides how much money each gets, and a bot that looks for mispriced bets on prediction markets. Each one has a test suite and a write-up of what actually happened when I ran it, including the parts that did not work.",
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
      "Build and ship custom ServiceNow apps that IT teams use to manage their service requests.",
      "Automate ticket handling with Flow Designer, Business Rules and JavaScript so fewer tickets need a person to touch them.",
      "Connect ServiceNow to other company systems over REST APIs and IntegrationHub.",
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
      "Built a full-stack time tracking app that cut the admin work of allocating project hours by 20%.",
      "Automated project status updates and routine management tasks with Windsurf, saving the team about 30% of that time.",
      "Designed the PostgreSQL schema for employee logs and projects.",
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
      "Wrote automated browser tests in TypeScript and Playwright for filing claims and creating policies.",
      "Worked with the dev teams to run those tests in the CI/CD pipeline.",
      "Cut down the manual testing the claims team had to do by hand.",
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
      "Wrote Python scripts to process seafloor mapping data, cutting interpretation time by 25%.",
      "Trained and tuned XGBoost models that predicted unknown terrain with 90% accuracy.",
      "Made charts of the terrain predictions so the team could see how the datasets related.",
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
      "A bot that watches the same esports bets on two prediction markets, Kalshi and Polymarket, and looks for prices that don't match.",
    detail:
      "Before fees the two sites disagreed enough to lock in a profit 13% of the time. After fees it was 3%. Acting as the market maker instead earned about 3 cents a bet over 589 matches.",
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
      "A trading simulator that sends every order into a realistic fake exchange, so the cost of trading is measured instead of guessed.",
    detail:
      "The usual shortcut for trading costs was 5x too high for small orders and 14x too low for big ones. It also finds how much money a strategy can run before its own trades eat the profit: about $12 billion here.",
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
      "Three trading strategies and the system that decides how much money each one gets, tested only on data the models hadn't seen.",
    detail:
      "Once each strategy was sized to the same risk, splitting the money evenly beat every \"smart\" optimizer I tried. The write-up explains why, including the ideas that didn't work.",
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
