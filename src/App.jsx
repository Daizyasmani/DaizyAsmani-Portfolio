import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

/* =============================== ASSETS =============================== */
import heroImg from "./assets/Image.jpeg";

import certUdPBI from "./assets/udacity_powerbi.png";
import certUdViz from "./assets/udacity_dataviz.png";
import certUdDA from "./assets/udacity_data_analyst.png";

import certCourseraML from "./assets/ml_specialization.png";
import certCourseraMath from "./assets/ml_math_specialization.png";

import certDL_NNDL from "./assets/nn_dl.png";
import certDL_IDNN from "./assets/improving_dl.png";
import certDL_STRUCT from "./assets/structuring_ml.png";

/* ================================ UI ================================ */
const Tag = ({ children }) => (
    <span className="inline-flex items-center rounded-full border border-slate-300/60 px-2 py-0.5 text-[11px] font-medium text-slate-600 bg-white/60 backdrop-blur">
        {children}
    </span>
);

const Pill = ({ active, children, onClick, ariaLabel }) => (
    <button
        onClick={onClick}
        aria-pressed={active}
        aria-label={ariaLabel ?? String(children)}
        className={`shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition ${active
                ? "bg-slate-900 text-white shadow"
                : "bg-white/70 text-slate-700 hover:bg-white shadow-sm border border-slate-200"
            }`}
    >
        {children}
    </button>
);


/* --- Social icons --- */
const IconBtn = ({
    href,
    label,
    children,
    className = "",
    shapeClass = "rounded-full", // circle
}) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        title={label}
        className={`inline-flex h-10 w-10 items-center justify-center ${shapeClass} border border-slate-200 bg-white shadow-sm hover:bg-slate-50 ${className}`}
    >
        {children}
    </a>
);

const LinkedInIcon = (props) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zM8 8h3.8v2.05h.06c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V23h-4v-6.62c0-1.58-.03-3.62-2.21-3.62-2.21 0-2.55 1.73-2.55 3.52V23h-4V8z" />
    </svg>
);

const GitHubIcon = (props) => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
        <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.93c.58.11.79-.25.79-.56v-2.08c-3.2.7-3.88-1.37-3.88-1.37-.53-1.35-1.28-1.71-1.28-1.71-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.11-.75.4-1.26.72-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.3 1.2-3.11-.12-.3-.52-1.51.11-3.14 0 0 .98-.31 3.2 1.19a10.9 10.9 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.63.23 2.84.11 3.14.75.81 1.2 1.85 1.2 3.11 0 4.43-2.7 5.4-5.27 5.69.41.35.77 1.05.77 2.12v3.14c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
);

/* Medium icon (white button like others, crisp centered "M") */
const MediumIcon = ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
        <text
            x="12"
            y="12"
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="Georgia, 'Times New Roman', Times, serif"
            fontWeight="700"
            fontSize={size * 0.9}
            fill="currentColor"
        >
            M
        </text>
    </svg>
);

/* ============================== CONTENT ============================= */
const LINKS = {
    linkedin: "https://www.linkedin.com/in/daizy-asmani",
    github: "https://github.com/Daizyasmani",
    medium: "https://medium.com/@daizyasmani",
    medium_income:
        "https://medium.com/@daizyasmani/predicting-customer-income-smarter-product-targeting-with-power-bi-62e33dcf8e6a",
    tableau_ev:
        "https://medium.com/@daizyasmani/visualizing-global-ev-sales-trends-a439e1741847",
    tableau_youtube:
        "https://github.com/Daizyasmani/Youtube-Trending-Analysis/blob/main/README.md",
    flourish_gdp_co2: "https://public.flourish.studio/story/3017268/",
    py_flights: "https://github.com/Daizyasmani/Flight-Delay-Trends-USA/tree/main",
    py_noshow:
        "https://github.com/Daizyasmani/NoShow-Appointments-Project/blob/main/README.md",
    py_spy_gdp:
        "https://github.com/Daizyasmani/SPY-GDP-Data-Wrangling-Pipeline-Project/tree/main",
};

const SKILLS = [
    "Python",
    "SQL",
    "Excel",
    "Power BI",
    "Tableau",
    "Flourish",
    "Jupyter",
    "VS Code",
    "GitHub",
    ".NET",
    "C++",
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "scikit-learn",
    "Data Wrangling",
    "EDA",
    "Data Visualization",
    "Dashboard Design",
    "Data Storytelling",
    "Power Query",
    "DAX",
    "Linear/Logistic Regression",
    "SVM",
    "Decision Trees",
    "Random Forest",
    "XGBoost",
    "Neural Networks",
    "K-Means",
    "PCA",
    "MySQL",
    "SQLite",
];

/* ========= Updated with resume-style details ========= */
const PROJECTS = [
    {
        id: "pbi_income",
        title: "Customer Income Prediction & Product Targeting",
        blurb:
            "Star-schema modeling with predictive DAX to quantify Sales ↔ Income and surface product recommendations.",
        details: [
            "Built a star-schema (Customer, Product, Date, State) and reproducible Power Query pipeline from multi-source data.",
            "Implemented DAX regression (Slope, Intercept, R²) to quantify Sales → Income and exposed predicted-income measures/cards.",
            "Designed interactive visuals (histogram, scatter, map) with cross-filters for Income Bands, state trends, and customer segments.",
            "Added 3- & 6-month moving averages, variance and StdDev to explain seasonality and volatility.",
            "Authored “Recommended Product” logic that ranks SKUs by Target Price Band × Rating × Returns for marketing actions.",
        ],
        chips: ["Power BI", "DAX", "Power Query", "Predictive Analytics"],
        links: [{ label: "Read Blog", href: LINKS.medium_income }],
        cat: "Power BI",
    },
    {
        id: "pbi_ssbc",
        title: "Sales & Profitability Dashboard (SSBC)",
        blurb:
            "Executive Power BI reporting across currencies with drilldowns and profitability flags.",
        details: [
            "Built an end-to-end model analyzing customer- and product-level sales across USD/CAD.",
            "Created DAX measures for unit sales, gross profit margins, and profitability by fiscal quarter and product type.",
            "Enabled hierarchical drilldowns (Customer Type → Customer) and seasonal trends (year/month).",
            "Integrated multiple sources (Excel, CSV, PDFs); applied relationships, transformations, and narrative visuals.",
            "Flagged loss-making product lines and identified top contributors by average gross profit per serving.",
        ],
        chips: ["Power BI", "DAX", "Data Modeling", "Executive Reporting"],
        links: [],
        cat: "Power BI",
    },
    {
        id: "tbl_youtube",
        title: "YouTube Trending Analysis",
        blurb:
            "Tableau story exploring drivers of video popularity and regional viewing patterns.",
        details: [
            "Performed exploratory analysis on trending videos to uncover cross-region behavior and content drivers.",
            "Built interactive Tableau dashboards with filters and highlights to compare categories, engagement, and timing.",
            "Documented methodology and findings for reproducibility and stakeholder walkthroughs.",
        ],
        chips: ["Tableau", "Data Visualization"],
        links: [{ label: "Repo", href: LINKS.tableau_youtube }],
        cat: "Tableau",
    },
    {
        id: "tbl_ev",
        title: "Global Electric Vehicle Sales (Narrative)",
        blurb:
            "End-to-end narrative on EV adoption trends with sketches → wireframes → final storyboard.",
        details: [
            "Crafted a Tableau story narrating country-wise EV adoption over time with context on policies and market shifts.",
            "Iterated from hand sketches to wireframes to polished story for crisp executive consumption.",
            "Annotated highlights and year-over-year changes; delivered takeaways for non-technical readers.",
        ],
        chips: ["Tableau", "Data Storytelling"],
        links: [{ label: "Blog", href: LINKS.tableau_ev }],
        cat: "Tableau",
    },
    {
        id: "flr_gdpco2",
        title: "Interactive GDP vs CO₂ (1990–2014)",
        blurb:
            "Animated Flourish story to explore GDP growth vs emissions trajectories.",
        details: [
            "Prepared long-format data for animated bubble timelines across countries and years.",
            "Exposed tooltips, playhead, and annotations to spotlight diverging economic-emissions paths.",
            "Published for web-embedding and portfolio storytelling.",
        ],
        chips: ["Flourish", "Animated Viz"],
        links: [{ label: "Open Story", href: LINKS.flourish_gdp_co2 }],
        cat: "Flourish",
    },
    {
        id: "py_flights",
        title: "Flight Delay Trends USA",
        blurb:
            "2M-row airline on-time dataset — seasonal patterns, cascading delays, airport spikes.",
        details: [
            "Ran EDA/explanatory analysis on ~2M airline on-time records across carriers, seasons, airports, and time-of-day.",
            "Explored univariate, bivariate, and multivariate relationships to isolate recurring bottlenecks.",
            "Built visual narratives (histograms, bar charts, scatter, heatmaps) to reveal cascading delay effects and seasonal cancellation spikes.",
            "Summarized insights into an analyst-ready report aligning findings with operational levers.",
        ],
        chips: ["Python", "Pandas", "Matplotlib", "Seaborn"],
        links: [{ label: "Repo", href: LINKS.py_flights }],
        cat: "Analysis",
    },
    {
        id: "py_noshow",
        title: "No-Show Appointments Analysis",
        blurb:
            "Wrangling + visual analytics to explain demographic/behavioral drivers of no-shows.",
        details: [
            "Cleaned data: fixed invalid ages, corrected booking-after-appointment errors, converted timestamps, handled missing/duplicates.",
            "Built modular Matplotlib visuals (histograms, bars, pies, correlation heatmaps).",
            "Identified drivers: longer lead-time (>15 days), extreme ages (<20, >70), SMS reminders (~15% reduction when sent), high-risk neighborhoods (>30% no-shows).",
            "Delivered an insight deck outlining interventions (reminder cadence, scheduling windows, neighborhood-specific outreach).",
        ],
        chips: ["Python", "EDA", "Matplotlib"],
        links: [{ label: "Repo", href: LINKS.py_noshow }],
        cat: "Analysis",
    },
    {
        id: "py_spygdp",
        title: "SPY–GDP Wrangling & Correlation",
        blurb:
            "Pipeline to merge SPY (Yahoo Finance) with GDP (World Bank) and probe macro-market links.",
        details: [
            "Engineered full pipeline combining SPY daily data with GDP growth (1994–2024).",
            "Performed date alignment, duplicate removal, column standardization, and year-based merging.",
            "Ran correlation analysis (Matplotlib/Seaborn) to surface country-specific relationships with SPY volatility (both positive and negative).",
            "Packaged code and charts for reproducible, parameterized refresh.",
        ],
        chips: ["Python", "Pandas", "Seaborn"],
        links: [{ label: "Repo", href: LINKS.py_spy_gdp }],
        cat: "Analysis",
    },
];

const WRITING = [
    {
        title: "Predicting Customer Income & Smarter Product Targeting with Power BI",
        chips: ["Power BI", "DAX", "Case study"],
        blurb:
            "End-to-end: data shaping → star schema → DAX regression & correlation → cross-filters → product targeting.",
        href: LINKS.medium_income,
    },
    {
        title: "The Dashboard Diaries: What the Superstore Data Really Says",
        chips: ["Tableau", "Data Viz"],
        blurb:
            "Targeted retail questions with sketches → wireframes → final dashboard for crisp insights.",
        href: LINKS.tableau_ev,
    },
    {
        title: "From Zero to Charging Hero: Exploring Global EV Sales with Interactive Dashboards",
        chips: ["Tableau", "Storytelling"],
        blurb:
            "Narrative exploration of EV adoption trends by country, year, and policy context; highlights and takeaways.",
        href: LINKS.tableau_ev,
    },
];

const CERTS = [
    {
        src: certUdPBI,
        alt: "Udacity: Data Analysis & Visualization with Microsoft Power BI (Nanodegree, 2025)",
        href: "https://www.udacity.com/certificate/e/e02ab110-46eb-11f0-b3ea-5f2a54e90891",
    },
    {
        src: certUdViz,
        alt: "Udacity: Data Visualization (Nanodegree, 2025)",
        href: "https://www.udacity.com/certificate/e/58303094-fdd2-11ef-ab81-8f8dee4ad0a9",
    },
    {
        src: certUdDA,
        alt: "Udacity: Data Analyst (Nanodegree, 2025)",
        href: "https://www.udacity.com/certificate/e/d9e6f41e-e8ac-11ef-ac40-738ef4037dc6",
    },
    {
        src: certCourseraML,
        alt: "DeepLearning.AI & Stanford: Machine Learning Specialization (2023)",
        href: "https://coursera.org/verify/specialization/GHPRC6AGX9N4",
    },
    {
        src: certCourseraMath,
        alt: "DeepLearning.AI: Mathematics for Machine Learning & Data Science (2023)",
        href: "https://coursera.org/verify/specialization/EKTWZ64AYNDF",
    },
    { src: certDL_NNDL, alt: "DeepLearning.AI: Neural Networks and Deep Learning", href: "https://coursera.org/verify/PWKKB8CSL4KA" },
    { src: certDL_IDNN, alt: "DeepLearning.AI: Improving Deep Neural Networks", href: "https://coursera.org/verify/S3WLSH3GPH2M" },
    { src: certDL_STRUCT, alt: "DeepLearning.AI: Structuring Machine Learning Projects", href: "https://coursera.org/verify/ZUAH3MSRPAF6" },
];

/* =============================== APP =============================== */
export default function App() {
    const [filter, setFilter] = useState("All");
    const [projectsOpen, setProjectsOpen] = useState(true); // open by default so details show
    const [writingOpen, setWritingOpen] = useState(false);
    const [certsOpen, setCertsOpen] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const SECTIONS = [
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" },
        { id: "education", label: "Education" },
        { id: "certs", label: "Certifications" },
        { id: "projects", label: "Projects" },
        { id: "writing", label: "Writing" },
    ];
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

    const filtered = useMemo(
        () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter)),
        [filter]
    );

    /* Scroll spy */
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY + 96;
            let current = SECTIONS[0].id;
            for (const { id } of SECTIONS) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= y) current = id;
            }
            setActiveSection(current);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const onNavClick = (id) => (e) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: "smooth" });
        setSidebarOpen(false);
    };

    return (
        <div className="relative min-h-screen text-slate-800">
            {/* Background layers */}
            <div className="mesh-blobs" />
            <div className="bg-grid" />
            <div className="bg-noise" />

            {/* Top bar with hamburger */}
            <header className="sticky top-0 z-20 bg-white/75 backdrop-blur border-b border-slate-200">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                    <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm hover:bg-slate-50"
                        onClick={() => setSidebarOpen((v) => !v)}
                        aria-label="Open menu"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Menu</span>
                        <div className="space-y-1.5">
                            <span className="block h-0.5 w-5 bg-slate-800" />
                            <span className="block h-0.5 w-5 bg-slate-800" />
                            <span className="block h-0.5 w-5 bg-slate-800" />
                        </div>
                    </button>
                    <div className="text-sm font-semibold">Daizy Asmani</div>
                    <div className="w-9" />
                </div>
            </header>

            {/* Sidebar Drawer */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-30" role="dialog" aria-modal="true" onClick={() => setSidebarOpen(false)}>
                    <div className="absolute inset-0 bg-black/30" />
                    <nav
                        className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl border-r border-slate-200 p-4 space-y-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold">Navigate</span>
                            <button
                                className="h-8 w-8 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white hover:bg-slate-50"
                                onClick={() => setSidebarOpen(false)}
                                aria-label="Close menu"
                            >
                                ✕
                            </button>
                        </div>

                        {SECTIONS.map(({ id, label }) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                onClick={onNavClick(id)}
                                className={`block rounded-md px-3 py-2 text-sm transition ${activeSection === id ? "bg-slate-900 text-white" : "hover:bg-slate-100 text-slate-700"
                                    }`}
                            >
                                {label}
                            </a>
                        ))}

                        <div className="pt-4 flex gap-2">
                            <a
                                href={LINKS.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 text-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50"
                            >
                                LinkedIn
                            </a>
                            <a
                                href={LINKS.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 text-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50"
                            >
                                GitHub
                            </a>
                        </div>
                    </nav>
                </div>
            )}

            {/* Main content */}
            <main className="mx-auto max-w-6xl px-4 pb-24 pt-10">
                {/* Hero */}
                <section className="mb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-start gap-6">
                        <div>
                            <h1 className="gradient-text pr-1 text-5xl sm:text-6xl font-extrabold leading-[1.15] tracking-tight [text-wrap:balance]">
                                Hi, I’m Daizy Asmani
                            </h1>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {["Data Analyst", "Business Analyst", "Data Visualization", "Python", "SQL", "Power BI", "Tableau"].map((s) => (
                                    <Tag key={s}>{s}</Tag>
                                ))}
                            </div>

                            {/* Social icons row */}
                            <div className="mt-5 flex items-center gap-3">
                                <IconBtn href={LINKS.linkedin} label="LinkedIn">
                                    <LinkedInIcon />
                                </IconBtn>
                                <IconBtn href={LINKS.github} label="GitHub">
                                    <GitHubIcon />
                                </IconBtn>
                                <IconBtn href={LINKS.medium} label="Medium">
                                    <MediumIcon size={20} />
                                </IconBtn>
                            </div>

                            {/* Contact card */}
                            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4 shadow-sm">
                                <h2 className="text-base font-semibold">Contact</h2>

                                <dl className="mt-3 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                                    <div>
                                        <dt className="text-slate-500 uppercase tracking-wide text-[11px]">Email</dt>
                                        <dd>
                                            <a className="underline" href="mailto:daizyasmani@gmail.com">
                                                daizyasmani@gmail.com
                                            </a>
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-slate-500 uppercase tracking-wide text-[11px]">Phone</dt>
                                        <dd>
                                            <a className="underline" href="tel:+13128894006">
                                                +1 (312) 889-4006
                                            </a>
                                        </dd>
                                    </div>

                                    <div>
                                        <dt className="text-slate-500 uppercase tracking-wide text-[11px]">Location</dt>
                                        <dd>Milwaukee, WI</dd>
                                    </div>

                                    <div>
                                        <dt className="text-slate-500 uppercase tracking-wide text-[11px]">Visa Status</dt>
                                        <dd>H4 EAD (No sponsorship required)</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        {/* Profile image with glow ring */}
                        <div className="flex lg:justify-end">
                            <div className="ring-gradient h-56 w-56 sm:h-64 sm:w-64 mx-auto lg:mx-0">
                                <img src={heroImg} alt="Daizy Asmani" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* About */}
                <section id="about" className="mb-12 scroll-mt-24">
                    <h2 className="text-xl font-semibold h2-underline">About</h2>
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-5 shadow-sm">
                        <p className="leading-relaxed">
                            I’m a Data Analyst with a prior software-engineering stint at Differenz Systems, India. I hold an M.S. in IT
                            (Gold Medalist), am based in Milwaukee, WI, and moved to the U.S. in 2022; as an H4 spouse I wasn’t authorized
                            to work, so I used that career break to complete Udacity Nanodegrees and Coursera/DeepLearning.AI certifications.
                            I now have an active H4 EAD (fully work-authorized, no sponsorship required). I work end-to-end in Power BI
                            (DAX, Power Query), Python (Pandas, NumPy, scikit-learn), SQL, Tableau, and Excel. Shaping raw data into star
                            schemas and model-aware visuals (regression/correlation cards, predictive analytics) with solid Git/GitHub
                            discipline. I’m seeking Data Analyst/BI roles (including returnships) where dashboards and data stories
                            directly influence decisions; open to US-based hybrid or remote and ready to start.
                        </p>
                    </div>
                </section>

                {/* Skills */}
                <section id="skills" className="mb-12 scroll-mt-24">
                    <h2 className="text-xl font-semibold h2-underline">Skills</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {SKILLS.map((s) => (
                            <Tag key={s}>{s}</Tag>
                        ))}
                    </div>
                </section>

                {/* Experience */}
                <section id="experience" className="mb-12 scroll-mt-24">
                    <h2 className="text-xl font-semibold h2-underline">Experience</h2>
                    <div className="mt-4 space-y-4">
                        <div className="rounded-2xl border border-slate-200 bg-white/75 backdrop-blur p-5 shadow-sm">
                            <div className="flex flex-wrap items-baseline gap-2">
                                <h3 className="font-semibold">Software Engineer (Mobile – Xamarin.Forms)</h3>
                                <span className="text-slate-500">• Differenz Systems</span>
                            </div>
                            <div className="text-sm text-slate-500 mt-1">2019 – 2021 • India</div>
                            <ul className="mt-3 list-disc pl-5 space-y-1 text-[15px]">
                                <li>Built cross-platform Android and iOS apps using Xamarin.Forms, implementing MVVM architecture, SQLite offline storage, and dynamic JSON API integrations.</li>
                                <li>Designed responsive UIs with UI Kit, Auto Layout, Stack Views, and enhanced UX with Lottie animations, multilingual support, and advanced Syncfusion components.</li>
                                <li>Integrated camera functionality, file uploads, and popups for seamless user experiences; customized layouts using FlowDirection and Sharpnado.Shadows.</li>
                                <li>Delivered projects like Patient Diary, Bankiom, and ExpenseSOS on Agile sprints, collaborating directly with clients and managing version control with SourceTree.</li>
                                <li>Researched and implemented new Xamarin features during internship phase, contributing to full-stack mobile app development from prototyping to release.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section id="education" className="mb-12 scroll-mt-24">
                    <h2 className="text-xl font-semibold h2-underline">Education</h2>
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white/75 backdrop-blur p-5 shadow-sm">
                        <p className="text-[15px]">
                            <span className="font-medium">M.S. in Information Technology (Gold Medalist)</span>, Auro University, India (2018–2020)
                            <br />
                            <span className="font-medium">Udacity Nanodegrees (2025)</span> — Data Analyst, Data Visualization, Data Analysis & Visualization with Microsoft Power BI
                        </p>
                    </div>
                </section>

                {/* Certifications */}
                <section id="certs" className="mt-12 scroll-mt-24">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold h2-underline">Certifications</h2>
                        <button
                            onClick={() => setCertsOpen((v) => !v)}
                            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50"
                        >
                            {certsOpen ? "Hide Certificates" : "Show Certificates"}
                        </button>
                    </div>

                    {!certsOpen ? (
                        <p className="mt-3 text-sm text-slate-600">
                            Certificates are hidden. Click <span className="font-medium">Show Certificates</span> to display the gallery.
                        </p>
                    ) : (
                        <div className="mt-5 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {CERTS.map((c, i) => (
                                <a
                                    key={i}
                                    href={c.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group relative block rounded-2xl overflow-hidden border border-slate-200 bg-white/85 backdrop-blur shadow-sm hover:shadow-md ring-0 hover:ring-1 hover:ring-slate-200 transition"
                                    title={c.alt}
                                >
                                    <div className="h-56 md:h-60 lg:h-56 xl:h-52 w-full bg-slate-50">
                                        <img
                                            src={c.src}
                                            alt={c.alt}
                                            loading="lazy"
                                            className="h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                                        />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 to-transparent px-3 pt-6 pb-2">
                                        <p className="text-[12px] text-slate-600 line-clamp-1">{c.alt.replace(/ \(.+\)$/, "")}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </section>

                {/* Projects */}
                {/* Projects */}
                <section id="projects" className="mb-14 mt-12 scroll-mt-24">
                    <div
                        className={`rounded-2xl transition shadow-sm border ${projectsOpen
                                ? "border-slate-200 bg-white/90 backdrop-blur ring-1 ring-slate-200/60"
                                : "border-transparent"
                            }`}
                    >
                        {/* Header row + desktop Hide button */}
                        <div className="px-4 pt-4">
                            <div className="flex items-center justify-between gap-3">
                                <h2 className="text-xl font-semibold h2-underline">Projects</h2>

                                {/* Desktop-only Hide button (keeps header tidy on mobile) */}
                                {projectsOpen && (
                                    <button
                                        className="hidden sm:inline-flex px-3 py-1.5 rounded-md text-sm border border-slate-200 bg-white hover:bg-slate-50 shadow-sm"
                                        onClick={() => {
                                            setProjectsOpen(false);
                                            setFilter("All");
                                        }}
                                        title="Collapse projects"
                                    >
                                        Hide Projects
                                    </button>
                                )}
                            </div>

                            {/* Chip strip: edge-to-edge, single line, scrollable on mobile */}
                            <div className="mt-3 -mx-4 px-4">
                                <div className="flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
                                    {["All", "Power BI", "Tableau", "Flourish", "Analysis"].map((c) => (
                                        <Pill
                                            key={c}
                                            active={projectsOpen && filter === c}
                                            onClick={() => {
                                                if (c === "All") {
                                                    setProjectsOpen((prev) => !prev);
                                                    setFilter("All");
                                                } else if (projectsOpen) {
                                                    setFilter(c);
                                                }
                                            }}
                                            ariaLabel={`Filter by ${c}`}
                                        >
                                            {c}
                                        </Pill>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile-only Hide button below the chips so nothing wraps awkwardly */}
                            {projectsOpen && (
                                <button
                                    className="sm:hidden mt-3 w-full rounded-md text-sm border border-slate-200 bg-white hover:bg-slate-50 shadow-sm px-3 py-2"
                                    onClick={() => {
                                        setProjectsOpen(false);
                                        setFilter("All");
                                    }}
                                    title="Collapse projects"
                                >
                                    Hide Projects
                                </button>
                            )}
                        </div>

                        {!projectsOpen ? (
                            <div className="px-4 pb-4">
                                <div className="mt-3 text-sm text-slate-600">
                                    Project gallery is hidden. Click <span className="font-semibold">All</span> to show everything.
                                </div>
                                <button
                                    className="mt-3 rounded-md bg-slate-900 text-white px-3 py-2 text-sm font-medium shadow hover:bg-slate-800 w-full sm:w-auto"
                                    onClick={() => {
                                        setProjectsOpen(true);
                                        setFilter("All");
                                    }}
                                >
                                    Show All Projects
                                </button>
                            </div>
                        ) : (
                            <div className="mt-5 px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                                {filtered.map((p) => (
                                    <article
                                        key={p.id}
                                        className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-4 sm:p-5 shadow-sm"
                                    >
                                        <div className="flex items-center justify-between gap-3">
                                            <h3 className="font-semibold">{p.title}</h3>
                                            <Tag>{p.cat}</Tag>
                                        </div>
                                        <p className="mt-2 text-[15px] leading-relaxed">{p.blurb}</p>

                                        {/* tech chips */}
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {p.chips.map((c) => (
                                                <Tag key={c}>{c}</Tag>
                                            ))}
                                        </div>

                                        {/* resume-style bullets */}
                                        {p.details?.length ? (
                                            <ul className="mt-3 list-disc pl-5 space-y-1.5 text-[15px]">
                                                {p.details.map((d, i) => (
                                                    <li key={i}>{d}</li>
                                                ))}
                                            </ul>
                                        ) : null}

                                        {/* links */}
                                        {p.links?.length ? (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {p.links.map((l, i) => (
                                                    <a
                                                        key={i}
                                                        href={l.href}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50"
                                                    >
                                                        {l.label}
                                                    </a>
                                                ))}
                                            </div>
                                        ) : null}
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>


                {/* Writing */}
                <section id="writing" className="mb-16 scroll-mt-24">
                    <div
                        className={`rounded-2xl transition shadow-sm border ${writingOpen ? "border-slate-200 bg-white/90 backdrop-blur ring-1 ring-slate-200/60" : "border-transparent"
                            }`}
                    >
                        <div className="flex items-center justify-between px-4 pt-4">
                            <h2 className="text-xl font-semibold h2-underline">Writing</h2>
                            <div className="flex items-center gap-2">
                                <a href={LINKS.medium} target="_blank" rel="noreferrer" className="text-sm text-slate-600 hover:text-slate-900">
                                    View all on Medium
                                </a>
                                {writingOpen && (
                                    <button
                                        className="px-3 py-1.5 rounded-md text-sm border border-slate-200 bg-white hover:bg-slate-50 shadow-sm"
                                        onClick={() => setWritingOpen(false)}
                                        title="Collapse blogs"
                                    >
                                        Hide Blogs
                                    </button>
                                )}
                            </div>
                        </div>

                        {!writingOpen ? (
                            <div className="px-4 pb-4">
                                <div className="mt-3 text-sm text-slate-600">Blog cards are hidden. Click the button to show recent posts.</div>
                                <button
                                    className="mt-3 rounded-md bg-slate-900 text-white px-3 py-2 text-sm font-medium shadow hover:bg-slate-800"
                                    onClick={() => setWritingOpen(true)}
                                >
                                    Show All Blogs
                                </button>
                            </div>
                        ) : (
                            <div className="mt-5 px-4 pb-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                                {WRITING.map((w, idx) => (
                                    <article key={idx} className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 shadow-sm">
                                        <h3 className="font-semibold">{w.title}</h3>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {w.chips.map((c) => (
                                                <Tag key={c}>{c}</Tag>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-[15px] leading-relaxed">{w.blurb}</p>
                                        <div className="mt-4">
                                            <a
                                                href={w.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50"
                                            >
                                                Read
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                    <p className="mt-4 text-[13px] text-slate-500">© {new Date().getFullYear()} Daizy Asmani</p>
                </section>
            </main>
        </div>
    );
}
