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
      "A bot that watches esports betting markets on Kalshi and Polymarket and looks for prices that don't line up. Tested against real order books, real trades and real match results.",
    detail:
      "About 13% of the time the two sites disagreed enough that you could lock in a profit before fees. After fees that fell to 3%, and usually only for a single contract. Posting my own prices instead of taking theirs made about 3 cents a contract over 589 matches, but lost 6 cents a contract in the first two hours of a match, when the people trading know something you don't. Most price gaps closed within a minute. I also found a $92 basket of bets on a best-of-three that paid the same no matter who won. My own model for the map and total-maps markets did not beat the market price, so I say so. 83 tests.",
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
      "A backtester that sends its orders into a simulated order book instead of guessing what a trade would cost. Most backtesters charge a flat fee for slippage. This one looks at what is actually resting in the book.",
    detail:
      "I built a matching engine (the part of an exchange that pairs buyers with sellers) and a backtester, then wired them together so every trade gets filled by the book. The usual flat slippage charge turned out to be wrong both ways: about 5x too expensive for small orders and 14x too cheap for big ones. Then I made the book more realistic one step at a time. Thin near the best price and thicker behind it. Shallower on volatile days, which matters because the strategy I tested trades on exactly those days and pays 19% more than a fixed book would say. Emptier far from the price. And a memory of what you traded yesterday, so a big order pays for its own earlier pieces. That last one caught a flaw in the standard formula: it charges by the size of each day's slice, so a position that takes a month to build costs the same per share as one that takes a day. The real impact law says the big one costs more, and a book that keeps a third of what each slice moved reproduces that law almost exactly. So I fixed the formula to charge by the whole order, and it landed on that book at a billion dollars, 0.57 Sharpe against 0.57. But the reason was not the slicing: at that size every order fits in a day, and the only difference was that the formula's constant was twice what the research says. Above that the two come apart, because an order takes a month to fill. I had been reading that as most of the book sitting in cash, and when I checked the column that said so, it was measuring the last order of the sample, a sell that was two days old when the data ran out. Averaged properly, a $100bn book was in the market as much as a $100m one. It was stuck, not idle: 161 days to build a position and 161 to sell it, which turns the strategy into a slow buy-and-hold. So I gave the portfolio a liquidity budget, hold only what you can fill in five days, and capacity became a real number: about $12bn at a week's patience, $2.4bn at a day's, with the Sharpe holding above that and the return falling as the money grows. That budget only applied on the way in, though, so I made it bind on the way out too: every day the book sells down anything it could no longer get out of in five days. At $20bn that fires 48 times in ten years, because SPY's share volume fell as its price tripled, and it costs a third of the return for the same Sharpe while shortening the worst exit from 16 days to 13, not to 5, since a trim is an order into the same thin tape. I also ran the long/short version of the rule, where a reversal is two positions in one order: it takes twice as long to fill, and it has no capacity to measure because on an equity index the short leg has no edge to scale. All of that ran at 10% participation because 10% is a round number, so most recently I swept it from 2% to 50%. The worst exit is 13 days at every rate, exactly, because the budget and the fill both scale with participation and their ratio is what the exit takes. Taking more of the tape buys a bigger position, not a faster exit, and the bill is impact: 7 basis points a trade at 2%, 44 at 50%, and the Sharpe falls from 0.60 to 0.43. Set beside the patience sweep, that is two different bills for the same bigger book. Doubling it by waiting ten days instead of five costs nothing per trade and seven days on the worst exit; doubling it by taking 20% of each day instead of 10% costs ten basis points a trade and a tenth of Sharpe. The capacity number's Sharpe is the participation it was run at. I also bootstrapped the trim's +0.03 at $5bn and got an interval that straddles zero, which is the noise I had called it. So most recently I ran the whole surface, seven AUMs against six rates, after writing down what I expected: at each rate the Sharpe should fall with AUM only until the budget binds, and be flat past that, because from there the position is five days of your share of the volume whatever the account says, and the rest is cash. It held to the dollar. Past that knee every cell at a rate makes the same ten-year P&L, $1.7bn at 2% whether the account says $5bn or $100bn, $7.2bn at 10%, $27bn at 50%, and the knee sits at the same place in every column because a point of participation and a week buys $0.68bn of 2015 SPY. Capacity was never an AUM. It is one number per rate, and the rate is a trade between the Sharpe column and the P&L column: the patient desk has the best Sharpe and the smallest P&L, which is the thing a ratio never tells you. If the desk is paid in the numerator, I wanted to know what the manager is paid in, so most recently I put two-and-twenty on every cell of that surface, no new runs, just arithmetic. Charged on the AUM, the way the fee is written, the manager and the investor part ways at the knee: past it the P&L is flat and the fee keeps growing, so the investor's best size is the knee and the manager's is as big as the account will go, and the fee has eaten the whole profit at three to four times the knee. At $100bn the patient desk made $1.7bn and the manager took $20bn, all of it management fee, and the take is the same $20bn in five of the six columns even though their P&L differs by $16bn. The fee never reads the numerator. Charge it on the position the budget actually let the desk hold and it stops growing where the position does, and both sides stop at the knee. The one axis they already agree on is the rate: at every size the rate the investor nets most at is the rate the manager takes most at, and it is never the Sharpe's pick, which at $10bn leaves the investor $311m down net of fees against $5.7bn up. A ratio is for choosing between two desks of the same size, not for choosing how big one should be. I had called that lump fee a floor, since a real incentive fee is paid in the up years and never refunded in the down ones, so most recently I paid it the real way: yearly, against a high-water mark, on the equity curve of every cell. The floor turned out to be the number. In 36 cells of 42 the yearly fee matched the lump to the million, because the difference between them is exactly a fifth of how far under its own mark the fund finishes, and 2024 was an up year, so 30 of the 42 curves ended at a new high and the mark cost the investor nothing. The six cells where it did were the ones where one year set the mark: at $100bn and 50% the fund spent six years under water, 2021 cleared the mark by $9bn and paid $2.2bn of incentive in a single year, 2022 gave $15bn back, and the decade finished $4bn under a mark the investor had already paid for. And the extra past the knee was a hump, not a plateau, $0, $21m, $130m, $0 going up a column whose P&L is the same in every cell, because the management fee on the AUM decides whether the P&L ever crosses the mark. Every step changed what a trade costs. None of them changed how much money the strategy could run, because that limit comes from how much of the day's volume you are allowed to be, not from cost. That was the real lesson: knowing which of your numbers depend on your assumptions and which don't. 393 tests.",
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
      "Three trading strategies and the system that decides how much money each one gets. Pairs trading on 930 pairs of stocks, selling options and hedging them, and momentum. Then six ways of splitting money between them, all tested on data the models had not seen.",
    detail:
      "Textbooks say a smart optimizer should beat splitting money evenly. On normal assets like ETFs and stocks it did not, at any setting I tried. Even splits won every time. On trading strategies it finally did, but not for the textbook reason: one strategy was losing money, and only the optimizer that looks at returns could tell. The risk-based methods only look at how bumpy a strategy is, and the losing one was the calmest, so they put more money into it. Adding a momentum strategy showed my pairs strategy was quietly a bet against momentum, about a fifth of its ups and downs. And the momentum strategy, which was built to be market-neutral, was really half a dollar short the market. That is where all of its losses came from. Hedging that out, with a ratio estimated only on past data, turned it from a losing strategy into a modestly winning one, and the optimizer still did not want it, because a small edge next to a big one earns no weight. Even splits also lost for the first time, because one strategy was ten times bigger than the others, and equal only works when the pieces are the same size. So I sized all three to the same risk, using only past data, and even splits went from fourth to first. Part of that was the hedge between the pairs and momentum strategies finally counting at equal size. The bigger part was that the sizing rule itself hurt the best strategy: it levers up a short-volatility trade after quiet years and de-levers it after a crash, which is backwards, and it had that strategy at its maximum leverage going into the worst month. Capping leverage at 5x helped every allocator, which is a cap doing the forecast's job better than the forecast. So I sized that strategy on the volatility it actually sells each month, which is known the morning the trade goes on, and over fifteen years that got the half point of Sharpe back. Nearly all of it came from one month, March 2020, where the rule read a VIX of 33 and sat at 2.5x while the trailing rule sat at 6x. It still cannot see a spike coming from a quiet market, and neither can anything else known on day one. All of that ran the leverage for free, so last I charged for it the way a prime broker would. I expected the pairs strategy at 6x to be the one that hurt. It was not: it is half in cash, so 6x is 2.6x gross and its borrow is small change. The short-volatility strategy was the one with the bill, because its hedge is a stock position bought on margin, and in 2023 and 2024 that loan cost 8.8% a year at a 5.2% rate, taking the strategy from a 2.2 Sharpe to 0.9. Even splits went from 2.7 to 1.4 and still won, now by half a point over the best single strategy rather than a tenth, because a third of the book sits in the two strategies that cost almost nothing to run. The optimizer still held 92% of the strategy with the loan, and it was estimating on a window that was half zero-rate months, so the textbook fix was to re-charge the window at the rate it was about to pay before the optimizer looked. That was worth a hundredth. After the loan the short-vol strategy was still the only thing in the window that had made money, and no cost of funding changes which strategy earned. I had to charge the window 10%, double the 2023 peak, before the optimizer held less than half, and 12% before it beat even splits, by being told the loan cost more than twice what it did. That is not a funding forecast, it is a haircut on the winning strategy's mean, which is what shrinkage is. Or so I wrote, so most recently I did the shrinkage on purpose: pulled the window's forecast toward a prior before the optimizer saw it, toward the textbook minimum-variance target and toward the forecast under which even splits are the answer. Toward min variance there was nothing, and the estimator that picks its own strength from the data did worse than not shrinking at all. Toward even splits there was a strength that finally beat them, 1.62 against 1.42, holding a tilted version of the even book. But it sat at the far end of a dial nothing calibrates in advance, and I found it by looking at the answer. And the 12% loan had never been shrinkage: its book was two thirds in momentum and nothing in pairs, which no amount of shrinking produces. Charging one strategy more was a view against that strategy, not a prior over the book, and it won by landing in the strategy that was about to earn for a reason the window did not contain. A prior pulls every forecast toward a centre; a view moves one. The optimizer was right about the strategy and wrong about the book, and the only thing that fixes that honestly is a strength you could have set before you knew the answer. So most recently I set it that way: each month, trade whichever strength had the best record over the previous twelve, after six months of record, with nothing chosen in those six. On the sample the sweep ran on, the chooser found the same strength by its second month, held it for eight, and lost to even splits by half a point, because the whole of that strength's lead had been in the six months that built the record. On a shorter estimation window with 25 months to choose in, it beat even splits by five hundredths, which is noise, and did it by switching between the two ends of the dial rather than holding anything in the middle: trust the window through 2023, when one strategy was the only one paying and the window knew it; stop in 2024, when momentum turned and the window did not. And the dial itself was the finding. The prior's size was the window's even-split return, which nearly vanishes in a window where the strategies cancel, so the same number on the dial meant 16% of the vote in one window and 94% in another. Put the prior at the forecast's own size, so the number means the same thing every month, and no strength between the two ends beats the better end. It was never a strength. It was the window changing regime under a number quoted in the wrong units. If it was a regime, I wanted the allocator that just tests for the regime, so most recently I built it from the one test this project already had: each month, can the strategies' average returns be told apart on the window the optimizer is about to use? If yes, trust the window; if no, split evenly. At the line that test had always drawn it was worse than both, and on the shorter window it was the worst book in the project, 0.22 against 0.76 for even splits. Flip it, trust the window only when the strategies cannot be told apart, and it reads 1.34. That is a diagnosis, not a rule, and what it says is that a t-statistic on a trailing window counts how long the current run has lasted: it is highest at the end of a run, and on this sample every strategy's trailing average is negatively correlated with its next month. It also pointed the wrong way at both dates the earlier chooser had switched. An allocator that knew the regime each month would double even splits, which is the size of the prize for a regime test that works, and I do not have one. 353 tests.",
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
