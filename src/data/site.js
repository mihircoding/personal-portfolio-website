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
  "Outside of work I build quantitative finance projects from scratch — pricing models, an event-driven backtester, a matching engine — because implementing a system is the fastest way to find out where your intuition about it is wrong. Most of these projects end with a result that disagrees with the textbook, and I write those up rather than hide them.",
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
    slug: "options-pricer",
    title: "Options Pricer",
    group: "quant",
    featured: true,
    blurb:
      "Black-Scholes implemented from scratch — prices, Greeks, dividend adjustment — cross-checked against a Monte Carlo simulator and against live S&P 500 option quotes, including the volatility smile backed out of real market prices.",
    detail:
      "Ten classic multi-leg strategies (spreads, collars, straddles, butterflies, iron condors) with payoff diagrams, interactive price and PnL heatmaps over a spot × volatility grid, and a sanity suite that checks textbook values, put-call parity, Greeks against numerical derivatives, and an implied-vol round trip.",
    image: "/proj-options.png",
    imageAlt:
      "Heatmap of Black-Scholes call value across spot price and volatility",
    tags: ["Python", "NumPy", "SciPy", "Plotly", "Streamlit"],
    live: "https://mihircoding.github.io/options-pricer/",
    source: "https://github.com/mihircoding/options-pricer",
  },
  {
    slug: "backtesting-engine",
    title: "Event-Driven Backtesting Engine",
    group: "quant",
    featured: true,
    blurb:
      "A backtester built the way production trading systems are: five components that talk only through a queue of events, one timestamp at a time. No component can see the future, because the future hasn't been pushed onto the queue yet.",
    detail:
      "Roughly 300 lines of source and 32 tests. Strategies emit opinions, the portfolio turns them into sized orders, and the execution handler models slippage and commission — which is what makes the lookahead bias a vectorised pandas backtest invites structurally impossible. Includes a same-bar-close vs next-bar-open fill-timing experiment on SPY.",
    image: "/proj-backtest.png",
    imageAlt: "SPY price and strategy equity curves versus buy and hold",
    tags: ["Python", "pandas", "pytest", "Event-driven design"],
    live: "https://mihircoding.github.io/backtestingEngine/",
    source: "https://github.com/mihircoding/backtestingEngine",
  },
  {
    slug: "limit-order-book",
    title: "Limit Order Book & Matching Engine",
    group: "quant",
    featured: true,
    blurb:
      "A price-time priority matching engine — the piece of infrastructure that is a modern exchange — plus a zero-intelligence order flow simulator to run through it.",
    detail:
      "The agents flip coins; they have no strategy at all. The book still produces a realistic spread distribution, concave price impact, and a mid price that mean-reverts at short horizons the way real equity data does. None of that was programmed in — it falls out of the matching rules. 42 tests, 50k simulated events.",
    image: "/proj-lob.png",
    imageAlt:
      "Simulated mid price path and the emergent spread distribution from the order book",
    tags: ["Python", "Market microstructure", "pytest"],
    live: "https://mihircoding.github.io/limitOrderBook/",
    source: "https://github.com/mihircoding/limitOrderBook",
  },
  {
    slug: "pairs-trading",
    title: "Pairs Trading",
    group: "quant",
    featured: true,
    blurb:
      "A statistical arbitrage study on the S&P 100: screen every pair for cointegration on a formation window, then trade the survivors out of sample and see whether the screen predicted anything. It didn't.",
    detail:
      "4,950 pairs tested, 930 passed at 5%, exactly one survived a Bonferroni correction, and the mean out-of-sample Sharpe across the survivors was indistinguishable from zero. The write-up leads with that rather than with the top of the leaderboard, and is explicit about survivorship bias in the universe.",
    image: "/proj-pairs.png",
    imageAlt:
      "Histogram of out-of-sample Sharpe ratios for 930 cointegrated pairs, centred on zero",
    tags: ["Python", "statsmodels", "Cointegration", "Streamlit"],
    live: "https://mihircoding.github.io/pairsTrading/",
    source: "https://github.com/mihircoding/pairsTrading",
  },
  {
    slug: "portfolio-optimization",
    title: "Portfolio Optimization",
    group: "quant",
    featured: false,
    blurb:
      "Markowitz mean-variance optimization, the efficient frontier, covariance shrinkage, risk parity and CVaR tail-risk optimization — then tested the only way that matters: out of sample.",
    detail:
      "In sample the max-Sharpe portfolio wins with a Sharpe of 0.90; it has to, it's defined as the in-sample argmax. Walked forward on a trailing estimation window it finishes fourth of six, behind equal weighting — which needs no estimation, no optimizer and no turnover. That result holds at every estimation window tested. 36 tests.",
    image: "/proj-portfolio.png",
    imageAlt:
      "Efficient frontier with the six candidate portfolios plotted against individual assets",
    tags: ["Python", "NumPy", "SciPy", "pytest"],
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
