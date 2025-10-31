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
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition
      ${active
                ? "bg-slate-900 text-white shadow"
                : "bg-white/70 text-slate-700 hover:bg-white shadow-sm border border-slate-200"
            }`}
    >
        {children}
    </button>
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
    "Trees",
    "Random Forest",
    "K-Means",
    "PCA",
    "MySQL",
    "SQLite",
];

const PROJECTS = [
    {
        id: "pbi_income",
        title: "Customer Income Prediction & Product Targeting",
        blurb:
            "Star-schema (Customer, Product, Date, State), reproducible Power Query, DAX regression (slope, intercept, R²) and predicted-income cards with cross-filtered visuals.",
        chips: ["Power BI", "DAX", "Power Query", "Predictive Analytics"],
        links: [{ label: "Read Blog", href: LINKS.medium_income }],
        cat: "Power BI",
    },
    {
        id: "pbi_ssbc",
        title: "Sales & Profitability Dashboard (SSBC)",
        blurb:
            "Customer & product analysis across currencies with drilldowns; unit sales, margins, quarterly profitability; flags loss-making lines and top contributors.",
        chips: ["Power BI", "DAX", "Executive Reporting"],
        links: [],
        cat: "Power BI",
    },
    {
        id: "tbl_youtube",
        title: "YouTube Trending Analysis",
        blurb:
            "Interactive Tableau story exploring drivers of video popularity and regional viewing patterns.",
        chips: ["Tableau", "Data Visualization"],
        links: [{ label: "Repo", href: LINKS.tableau_youtube }],
        cat: "Tableau",
    },
    {
        id: "tbl_ev",
        title: "Global Electric Vehicle Sales (Narrative)",
        blurb:
            "Story highlights EV adoption trends by country and year; sketches → wireframes → final storyboard.",
        chips: ["Tableau", "Data Storytelling"],
        links: [{ label: "Blog", href: LINKS.tableau_ev }],
        cat: "Tableau",
    },
    {
        id: "flr_gdpco2",
        title: "Interactive GDP vs CO₂ (1990–2014)",
        blurb: "Animated story exploring GDP and emissions over time with Flourish.",
        chips: ["Flourish", "Animated Viz"],
        links: [{ label: "Open Story", href: LINKS.flourish_gdp_co2 }],
        cat: "Flourish",
    },
    {
        id: "py_flights",
        title: "Flight Delay Trends USA",
        blurb:
            "2M-row airline on-time dataset: seasonal patterns, cascading delays, airport-specific spikes; histograms, scatter, heatmaps.",
        chips: ["Python", "Pandas", "Matplotlib", "Seaborn"],
        links: [{ label: "Repo", href: LINKS.py_flights }],
        cat: "Analysis",
    },
    {
        id: "py_noshow",
        title: "No-Show Appointments Analysis",
        blurb:
            "Wrangling, cleaning, demographics/behavior patterns; drivers include lead-time, extreme ages, SMS reminders, neighborhood risk.",
        chips: ["Python", "EDA", "Matplotlib"],
        links: [{ label: "Repo", href: LINKS.py_noshow }],
        cat: "Analysis",
    },
    {
        id: "py_spygdp",
        title: "SPY–GDP Wrangling & Correlation",
        blurb:
            "Merged SPY daily data with GDP growth; alignment & duplicate removal; correlation patterns across countries.",
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
        href: "https://coursera.org/verify/specialization/ETXWZ64AYNDF",
    },
    { src: certDL_NNDL, alt: "DeepLearning.AI: Neural Networks and Deep Learning", href: "https://coursera.org/verify/PWKKB8CSL4KA" },
    { src: certDL_IDNN, alt: "DeepLearning.AI: Improving Deep Neural Networks", href: "https://coursera.org/verify/S3WLSH3GPH2M" },
    { src: certDL_STRUCT, alt: "DeepLearning.AI: Structuring Machine Learning Projects", href: "https://coursera.org/verify/ZUAH3MSRPAF6" },
];

/* =============================== APP =============================== */
export default function App() {
    const [filter, setFilter] = useState("All");
    const [projectsOpen, setProjectsOpen] = useState(false);
    const [writingOpen, setWritingOpen] = useState(false);
    const [certsOpen, setCertsOpen] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // ✅ Use ids + labels; "certs" matches the section id below
    const SECTIONS = [
        { id: "about", label: "About" },
        { id: "skills", label: "Skills" },
        { id: "experience", label: "Experience" },
        { id: "education", label: "Education" },
        { id: "certs", label: "Certifications" },
        { id: "projects", label: "Projects" },
        { id: "writing", label: "Writing" },
        { id: "contact", label: "Contact" },
    ];
    const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

    const filtered = useMemo(
        () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter)),
        [filter]
    );

    /* Scroll spy */
    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY + 96; // header offset
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
                <div
                    className="fixed inset-0 z-30"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setSidebarOpen(false)}
                >
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
                                className={`block rounded-md px-3 py-2 text-sm transition ${activeSection === id
                                        ? "bg-slate-900 text-white"
                                        : "hover:bg-slate-100 text-slate-700"
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
                            <h1 className="gradient-text text-4xl sm:text-5xl font-extrabold tracking-tight">
                                Hi, I’m Daizy Asmani
                            </h1>
                            <p className="mt-4 max-w-3xl text-base sm:text-lg leading-7 sm:leading-8">
                                Data Analyst with 2+ years of prior software engineering experience (Xamarin.Forms).
                                I build end-to-end analytical workflows and interactive dashboards in Python/SQL and
                                Power BI/Tableau with DAX/Power Query for feature engineering and clear, model-aware visuals.
                                I care about narratives that turn messy, multi-source data into decisions.
                            </p>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {["Python", "SQL", "Power BI", "Tableau", "scikit-learn"].map((s) => (
                                    <Tag key={s}>{s}</Tag>
                                ))}
                            </div>

                            <div className="mt-5 flex gap-3">
                                <a
                                    href={LINKS.medium}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-md bg-white px-3 py-2 text-sm font-medium shadow-sm border border-slate-200 hover:bg-slate-50"
                                >
                                    Read My Blog
                                </a>
                                <a
                                    href={LINKS.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-md bg-white px-3 py-2 text-sm font-medium shadow-sm border border-slate-200 hover:bg-slate-50"
                                >
                                    View GitHub
                                </a>
                            </div>

                            {/* quick facts */}
                            <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-4 shadow-sm">
                                <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
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
                            I’m a Data Analyst with a prior software-engineering stint (Xamarin.Forms, MVVM) at Differenz Systems.
                            I hold an <strong>M.S. in IT (Gold Medalist)</strong>, am based in Milwaukee, WI, and have an active
                            <strong> H4 EAD (no sponsorship required)</strong>. I work end-to-end in <strong>Power BI</strong>
                            (DAX, Power Query), <strong>Python</strong> (Pandas, NumPy, scikit-learn), <strong>SQL</strong>,
                            <strong> Tableau</strong>, and <strong>Excel</strong> shaping raw data into star schemas and
                            model-aware visuals (regression/correlation cards, Predictive analytics) with solid Git/GitHub discipline.
                            I’m seeking Data Analyst/BI roles (including returnships) where dashboards and data stories directly
                            influence decisions; open to US-based hybrid or remote and ready to start.
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
                                <li>Built cross-platform Android and iOS apps using Xamarin.Forms, implementing MVVM architecture, SQLite offline
                                    storage, and dynamic JSON API integrations.</li>
                                <li>Designed responsive UIs with UI Kit, Auto Layout, Stack Views, and enhanced UX with Lottie animations, multilingual
                                    support, and advanced Syncfusion components.</li>
                                <li>Integrated camera functionality, file uploads, and popups for seamless user experiences; customized layouts using
                                    FlowDirection and Sharpnado.Shadows.</li>
                                <li>Delivered projects like Patient Diary, Bankiom, and ExpenseSOS on Agile sprints, collaborating directly with clients and
                                    managing version control with SourceTree.</li>
                                <li>Researched and implemented new Xamarin features during internship phase, contributing to full-stack mobile app
                                    development from prototyping to release.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Education */}
                <section id="education" className="mb-12 scroll-mt-24">
                    <h2 className="text-xl font-semibold h2-underline">Education</h2>
                    <div className="mt-3 rounded-2xl border border-slate-200 bg-white/75 backdrop-blur p-5 shadow-sm">
                        <p className="text-[15px]">
                            <span className="font-medium">M.S. in Information Technology (Gold Medalist)</span>, Auro University, India (2018–2022)
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
                <section id="projects" className="mb-14 mt-12 scroll-mt-24">
                    <div
                        className={`rounded-2xl transition shadow-sm border ${projectsOpen
                                ? "border-slate-200 bg-white/90 backdrop-blur ring-1 ring-slate-200/60"
                                : "border-transparent"
                            }`}
                    >
                        {/* ✅ Mobile-friendly pill row & Hide button */}
                        <div className="flex items-center justify-between flex-wrap gap-3 px-4 pt-4">
                            <h2 className="text-xl font-semibold h2-underline">Projects</h2>

                            <div className="flex w-full sm:w-auto sm:flex-none sm:items-center gap-2">
                                <div className="flex gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto [-webkit-overflow-scrolling:touch]">
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

                                {projectsOpen && (
                                    <button
                                        className="sm:ml-2 sm:self-auto sm:mt-0 mt-2 px-3 py-1.5 rounded-md text-sm border border-slate-200 bg-white hover:bg-slate-50 shadow-sm"
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
                        </div>

                        {!projectsOpen ? (
                            <div className="px-4 pb-4">
                                <div className="mt-3 text-sm text-slate-600">
                                    Project gallery is hidden. Click <span className="font-semibold">All</span> to show everything.
                                </div>
                                <button
                                    className="mt-3 rounded-md bg-slate-900 text-white px-3 py-2 text-sm font-medium shadow hover:bg-slate-800"
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
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {p.chips.map((c) => (
                                                <Tag key={c}>{c}</Tag>
                                            ))}
                                        </div>
                                        {p.links?.length ? (
                                            <div className="mt-4 flex gap-2">
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
                        className={`rounded-2xl transition shadow-sm border ${writingOpen
                                ? "border-slate-200 bg-white/90 backdrop-blur ring-1 ring-slate-200/60"
                                : "border-transparent"
                            }`}
                    >
                        <div className="flex items-center justify-between px-4 pt-4">
                            <h2 className="text-xl font-semibold h2-underline">Writing</h2>
                            <div className="flex items-center gap-2">
                                <a
                                    href={LINKS.medium}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-slate-600 hover:text-slate-900"
                                >
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
                                <div className="mt-3 text-sm text-slate-600">
                                    Blog cards are hidden. Click the button to show recent posts.
                                </div>
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
                                    <article
                                        key={idx}
                                        className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 shadow-sm"
                                    >
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
                </section>

                {/* Contact */}
                <section id="contact" className="mb-6 scroll-mt-24">
                    <h2 className="text-xl font-semibold h2-underline">Contact</h2>
                    <div className="mt-3 grid gap-3 sm:flex sm:items-center sm:gap-4">
                        <div className="text-[15px]">
                            <div className="font-medium">
                                <a className="underline" href="mailto:daizyasmani@gmail.com">
                                    daizyasmani@gmail.com
                                </a>
                            </div>
                            <div>
                                <a className="underline" href="tel:+13128894006">
                                    +1 (312) 889-4006
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <a
                                href={LINKS.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50"
                            >
                                LinkedIn
                            </a>
                            <a
                                href={LINKS.github}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50"
                            >
                                GitHub
                            </a>
                            <a
                                href={LINKS.medium}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm shadow-sm hover:bg-slate-50"
                            >
                                Medium
                            </a>
                        </div>
                    </div>
                    <p className="mt-4 text-[13px] text-slate-500">© {new Date().getFullYear()} Daizy Asmani</p>
                </section>
            </main>
        </div>
    );
}
