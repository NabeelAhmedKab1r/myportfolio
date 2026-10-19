"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import ChipHero, { BG, ACCENT, INK, MUTED, MONO } from "./components/ChipHero";

// ─── Theme ────────────────────────────────────────────────────────────────────
const BORDER  = "#DDD6CA";
const DISPLAY = "var(--font-display)";

// ─── Mobile hook ──────────────────────────────────────────────────────────────
function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return isMobile;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
type Project = {
  name: string;
  desc: string;
  domain: string;
  tech: string[];
  link?: string;
  github?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Distributed Task Queue",
    domain: "Systems",
    desc: "Fault-tolerant task queue in Go on Redis Streams — at-least-once delivery, atomic job claiming, crash recovery via XAUTOCLAIM, exponential-backoff retries, dead-lettering, and idempotency checks. Integration-tested against real Dockerized Redis/Postgres workers: high-priority jobs were claimed 2× faster (4.6s vs 11.7s avg wait).",
    tech: ["Go", "Redis", "PostgreSQL", "Docker"],
    link: "https://youtu.be/QtHd2Bimh4Q",
    github: "https://github.com/NabeelAhmedKab1r/distributed-task-queue",
  },
  {
    name: "EvoCars",
    domain: "AI Systems",
    desc: "Evolutionary AI racing simulator where neural-network-controlled agents learn to steer through a genetic algorithm (selection, crossover, mutation). Lap completion went from near 0% to 70%+ over 300 generations.",
    tech: ["Python", "Pygame", "Neural Networks", "Genetic Algorithms"],
    github: "https://github.com/NabeelAhmedKab1r/evocars",
  },
  {
    name: "FPGA VGA Snake",
    domain: "Hardware",
    desc: "Snake implemented entirely in hardware on a DE10-Lite FPGA — a multi-state FSM in Verilog with VGA signal generation and clock division for real-time rendering, plus wall/self collision, scoring, and debounced inputs.",
    tech: ["Verilog", "Quartus Prime", "DE10-Lite", "VGA"],
    link: "https://youtu.be/ExPmekK-cnw",
    github: "https://github.com/NabeelAhmedKab1r/SnakeGame-FPGA-Project",
  },
  {
    name: "ISS Tracker",
    domain: "Web & Tools",
    desc: "Real-time web app tracking the ISS using live satellite data — interactive world map, NASA night lights overlay, orbit trail, 5-second position updates.",
    tech: ["JavaScript", "Leaflet", "HTML/CSS"],
    github: "https://github.com/NabeelAhmedKab1r/iss-tracker",
  },
  {
    name: "Snake Neon",
    domain: "Games",
    desc: "Neon-themed Snake in Pygame with a shop system, unlockable skins, special food types, particle effects, and multiple difficulty modes.",
    tech: ["Python", "Pygame", "Particle Systems"],
    github: "https://github.com/NabeelAhmedKab1r/snake-neon",
  },
  {
    name: "CodeLens",
    domain: "Web & Tools",
    desc: "Code analysis tool that generates control-flow graphs (CFGs) for static inspection and visualization of program structure.",
    tech: ["Python", "Static Analysis", "CFG"],
    github: "https://github.com/NabeelAhmedKab1r/CodeLens",
  },
  {
    name: "Study Planner",
    domain: "Web & Tools",
    desc: "Desktop assignment tracker built with CustomTkinter and SQLite. Deadline highlighting, overdue alerts, search, and light/dark theme.",
    tech: ["Python", "CustomTkinter", "SQLite"],
    github: "https://github.com/NabeelAhmedKab1r/study-planner",
  },
  {
    name: "City Survival",
    domain: "Games",
    desc: "Pygame survival game with a modular engine — custom world generation, player systems, and UI.",
    tech: ["Python", "Pygame", "Procedural Gen"],
    github: "https://github.com/NabeelAhmedKab1r/city-survival",
  },
];

const LINKS = [
  { label: "GitHub",   href: "https://github.com/NabeelAhmedKab1r" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nabeelahmedkabir/" },
  { label: "Email",    href: "mailto:nabeelahmedkabir@gmail.com" },
];

const EDUCATION = [
  {
    degree: "Bachelor of Engineering",
    institution: "York University",
    period: "2023 – Apr 2028",
    details: [
      "Computer Engineering — expected graduation April 2028",
      "Coursework: Data Structures & Algorithms, Design & Analysis of Algorithms, Software Design, Operating Systems, Computer Networks, Computer Organization, Digital Logic Design",
    ],
  },
];

const WORK_EXPERIENCE = [
  {
    title: "AI Software Developer Intern",
    company: "Cotriply",
    period: "Apr 2026 – Jun 2026",
    tag: "Advance Ontario",
    bullets: [
      "Took an AI-powered group travel coordination platform from prototype to MVP",
      "Refactored 16+ monolithic files (some 6,000+ lines) into modular TypeScript components, cutting codebase size by 50% with zero errors",
      "Built an automated email notification system delivering real-time alerts across all core trip events, scaling to every member regardless of trip size",
      "Configured a Vercel staging environment integrated with GitHub, decoupling development from the live platform",
      "Resolved 10+ bugs across trip creation, UI overflow, poll logging, and itinerary auto-save via Postman API testing",
    ],
  },
];

const HACKATHONS = [
  {
    name: "Comms-Denied Autonomy Hackathon",
    org: "Red Team DefTech",
    result: "3rd Place · $1,000",
    tag: "3RD PLACE",
    bullets: [
      "Built a fully autonomous drone navigation system in Python and OpenCV that reads visual cues for real-time flight decisions — no human input, no GPS.",
      "Designed a computer vision pipeline using HSV color masking and contour analysis to detect and classify objects, replacing an unreliable LLM-based approach for better speed and reliability.",
      "Owned the vision pipeline and decision logic on a 5-person team under a 9-hour constraint; placed 3rd of 10 teams.",
    ],
  },
];

const SKILLS = [
  { label: "Languages",            items: ["Python", "JavaScript", "TypeScript", "Go", "Java", "C", "SQL", "HTML5/CSS3", "Bash", "Verilog"] },
  { label: "Developer Tools",      items: ["Git", "GitHub", "VS Code", "Docker", "Postman", "Microsoft Azure", "Vercel", "Linux/Unix", "Spring Boot", "Claude Code", "Quartus Prime"] },
  { label: "Libraries/Frameworks", items: ["React", "OpenCV", "pandas", "NumPy", "scikit-learn", "Leaflet.js", "Redis", "MySQL", "PostgreSQL", "MongoDB"] },
  { label: "Core Competencies",    items: ["OOP", "REST APIs", "JUnit", "CI/CD", "Agile/Scrum", "Prompt Engineering", "LLM Integration", "Agentic Workflows"] },
];

const NAV = [["Projects", "projects"], ["Experience", "experience"], ["About", "about"], ["Contact", "contact"]];

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHead({ num, title, note, isMobile }: { num: string; title: string; note?: React.ReactNode; isMobile: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ marginBottom: isMobile ? 36 : 56 }}
    >
      <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: MUTED, marginBottom: 14 }}>
        <span style={{ color: ACCENT }}>{num}</span> / {title.toUpperCase()}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: 24, flexDirection: isMobile ? "column" : "row" }}>
        <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: isMobile ? 56 : "clamp(72px, 8vw, 112px)", lineHeight: 0.9, letterSpacing: "-0.01em", margin: 0, color: INK, textTransform: "uppercase" }}>
          {title}
        </h2>
        {note && (
          <div style={{ fontSize: 14, lineHeight: 1.6, color: INK, maxWidth: 320, textAlign: isMobile ? "left" : "right", paddingBottom: 6 }}>{note}</div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Project row ──────────────────────────────────────────────────────────────
function ProjectRow({ project, index, open, onToggle, isMobile }: { project: Project; index: number; open: boolean; onToggle: () => void; isMobile: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.04, duration: 0.45 }}
      className={`row ${open ? "open" : ""}`}
      style={{ borderTop: `1px solid ${BORDER}` }}
    >
      <button onClick={onToggle} aria-expanded={open} style={{
        all: "unset", boxSizing: "border-box", width: "100%", cursor: "pointer",
        display: "grid", alignItems: "baseline", padding: isMobile ? "20px 0" : "26px 0",
        gridTemplateColumns: isMobile ? "36px 1fr 20px" : "64px 1fr 200px 32px",
      }}>
        <span className="row-idx" style={{ fontFamily: MONO, fontSize: 12, color: MUTED }}>{String(index + 1).padStart(2, "0")}</span>
        <span className="row-name" style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: isMobile ? 28 : 40, color: INK, textTransform: "uppercase", letterSpacing: "0.005em", lineHeight: 1 }}>
          {project.name}
        </span>
        {!isMobile && <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: MUTED }}>{project.domain.toUpperCase()}</span>}
        <span className="row-plus" style={{ fontFamily: MONO, fontSize: 18, color: MUTED, textAlign: "right" }}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingLeft: isMobile ? 36 : 64, paddingBottom: 28, display: "flex", gap: isMobile ? 18 : 48, flexDirection: isMobile ? "column" : "row", alignItems: "flex-start" }}>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.75, color: "#4A4640", maxWidth: 560, flex: 1 }}>{project.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 200 }}>
                <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, lineHeight: 1.9 }}>{project.tech.join(" · ")}</div>
                <div style={{ display: "flex", gap: 18 }}>
                  {project.github && <a className="ulink" href={project.github} target="_blank" rel="noopener noreferrer">Repo ↗</a>}
                  {project.link && <a className="ulink" href={project.link} target="_blank" rel="noopener noreferrer">Demo ↗</a>}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Timeline entry (work + hackathons) ───────────────────────────────────────
function Entry({ when, title, sub, tag, bullets, isMobile }: { when: string; title: string; sub: string; tag: string; bullets: string[]; isMobile: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5 }}
      style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "240px 1fr", gap: isMobile ? 10 : 40, padding: "32px 0", borderTop: `1px solid ${BORDER}` }}
    >
      <div style={{ fontFamily: MONO, fontSize: 12, color: MUTED, letterSpacing: "0.04em" }}>{when}</div>
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 4 }}>
          <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: isMobile ? 26 : 32, color: INK, textTransform: "uppercase", lineHeight: 1.05 }}>{title}</span>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", color: ACCENT }}>{tag.toUpperCase()}</span>
        </div>
        <div style={{ fontSize: 14, color: MUTED, marginBottom: 18 }}>{sub}</div>
        <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10, maxWidth: 680 }}>
          {bullets.map((b, j) => (
            <li key={j} style={{ fontSize: 14, lineHeight: 1.7, color: "#4A4640", display: "flex", gap: 12 }}>
              <span style={{ color: ACCENT, fontFamily: MONO }}>—</span>{b}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const isMobile = useIsMobile();
  const [openProject, setOpenProject] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenisRef.current = lenis;
    let rafId: number;
    const raf = (time: number) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(rafId); lenis.destroy(); lenisRef.current = null; };
  }, []);

  // Nav only appears once the zoom lands on the die
  const onHeroProgress = useCallback((t: number) => {
    const nav = navRef.current;
    if (!nav) return;
    const visible = t > 0.9;
    nav.style.opacity = visible ? "1" : "0";
    nav.style.transform = visible ? "translateY(0)" : "translateY(-8px)";
    nav.style.pointerEvents = visible ? "auto" : "none";
  }, []);

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: id === "top" ? 0 : -24 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("nabeelahmedkabir@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const PAD = isMobile ? 20 : 64;
  const section = (extra?: React.CSSProperties): React.CSSProperties => ({
    padding: `${isMobile ? 96 : 160}px ${PAD}px 0`, maxWidth: 1280, margin: "0 auto", ...extra,
  });

  return (
    <>
      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: isMobile ? "16px 20px" : "22px 64px",
        fontFamily: MONO, fontSize: 11, letterSpacing: "0.14em",
        opacity: 0, pointerEvents: "none", transition: "opacity 0.4s, transform 0.4s",
        background: `linear-gradient(${BG} 40%, rgba(247,243,236,0))`,
      }}>
        <a href="#top" onClick={goTo("top")} className="nav-link" style={{ color: INK }}>NAK-01</a>
        <div style={{ display: "flex", gap: isMobile ? 14 : 32 }}>
          {NAV.filter(([, id]) => !isMobile || id !== "experience").map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={goTo(id)} className="nav-link">{label.toUpperCase()}</a>
          ))}
        </div>
      </nav>

      {/* ── HERO: zoom into the chip ─────────────────────────────────────── */}
      <ChipHero onProgress={onHeroProgress}>
        <div style={{
          height: "100%", display: "flex", flexDirection: "column", justifyContent: "center",
          padding: `0 ${PAD}px`, maxWidth: 1280, margin: "0 auto",
        }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em", color: MUTED, marginBottom: 22 }}>
            <span style={{ color: ACCENT }}>●</span>&nbsp; COMPUTER ENGINEERING · TORONTO
          </div>
          <h1 style={{
            fontFamily: DISPLAY, fontWeight: 900, margin: 0, color: INK, textTransform: "uppercase",
            fontSize: isMobile ? "clamp(64px, 19vw, 96px)" : "clamp(96px, 12.5vw, 188px)",
            lineHeight: 0.86, letterSpacing: "-0.01em",
          }}>
            Nabeel<br />Ahmed Kabir
          </h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end", gap: 28, marginTop: isMobile ? 28 : 40, flexDirection: isMobile ? "column" : "row" }}>
            <p style={{ margin: 0, fontSize: isMobile ? 15 : 17, lineHeight: 1.6, color: "#4A4640", maxWidth: 440 }}>
              I build systems that think — from neural nets and agentic workflows
              down to the logic gates. Most recently an AI software developer intern at <span style={{ color: INK }}>Cotriply</span>.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#projects" onClick={goTo("projects")} className="btn btn-solid">View work</a>
              <a href="/resume.pdf" download className="btn">Resume ↓</a>
            </div>
          </div>
        </div>
      </ChipHero>

      <main style={{ background: BG, position: "relative", zIndex: 1 }}>

        {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
        <section id="projects" style={section({ paddingTop: isMobile ? 64 : 96 })}>
          <SectionHead num="01" title="Projects" isMobile={isMobile}
            note={<><span className="ulink-static">3rd place, Red Team DefTech</span>. I like building things that sit between hardware and software.</>}
          />
          <div style={{ borderBottom: `1px solid ${BORDER}` }}>
            {PROJECTS.map((p, i) => (
              <ProjectRow key={p.name} project={p} index={i} isMobile={isMobile}
                open={openProject === i} onToggle={() => setOpenProject(openProject === i ? null : i)}
              />
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
        <section id="experience" style={section()}>
          <SectionHead num="02" title="Experience" isMobile={isMobile}
            note="From taking an AI travel platform to MVP to flying drones with no GPS."
          />
          <div style={{ borderBottom: `1px solid ${BORDER}` }}>
            {WORK_EXPERIENCE.map((job) => (
              <Entry key={job.company} when={job.period} title={job.title} sub={job.company} tag={job.tag} bullets={job.bullets} isMobile={isMobile} />
            ))}
            {HACKATHONS.map((h) => (
              <Entry key={h.name} when="Hackathon" title={h.name} sub={`${h.org} · ${h.result}`} tag={h.tag} bullets={h.bullets} isMobile={isMobile} />
            ))}
            {EDUCATION.map((e) => (
              <Entry key={e.institution} when={e.period} title={e.degree} sub={e.institution} tag="Education" bullets={e.details} isMobile={isMobile} />
            ))}
          </div>
        </section>

        {/* ── ABOUT + SKILLS ───────────────────────────────────────────────── */}
        <section id="about" style={section()}>
          <SectionHead num="03" title="About" isMobile={isMobile} />
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 320px", gap: isMobile ? 32 : 80, alignItems: "start" }}
          >
            <div>
              <p style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: isMobile ? 30 : 44, lineHeight: 1.1, color: INK, margin: "0 0 56px", textTransform: "uppercase" }}>
                I build at the <span style={{ color: ACCENT }}>boundaries</span> — where hardware meets software, and data meets inference.
              </p>
              <div>
                {SKILLS.map((group) => (
                  <div key={group.label} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "180px 1fr", gap: isMobile ? 8 : 24, padding: "18px 0", borderTop: `1px solid ${BORDER}` }}>
                    <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: MUTED }}>{group.label.toUpperCase()}</div>
                    <div style={{ fontSize: 15, color: INK, lineHeight: 1.7 }}>{group.items.join(", ")}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photo.jpg" alt="Nabeel Ahmed Kabir"
                style={{ width: "100%", aspectRatio: "4 / 5", objectFit: "cover", objectPosition: "center top", display: "block", borderRadius: 2 }}
              />
              <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED, marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span>FIG. 1 — THE ENGINEER</span><span>TORONTO, CA</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────────── */}
        <section id="contact" style={section({ paddingBottom: isMobile ? 80 : 120 })}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6 }}
          >
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.18em", color: MUTED, marginBottom: 14 }}>
              <span style={{ color: ACCENT }}>04</span> / CONTACT
            </div>
            <h2 style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: isMobile ? 64 : "clamp(96px, 12vw, 180px)", lineHeight: 0.86, margin: "0 0 40px", color: INK, textTransform: "uppercase" }}>
              Let&apos;s build<br /><span style={{ color: ACCENT }}>something.</span>
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 16 : 32, flexWrap: "wrap" }}>
              <button onClick={copyEmail} className="btn btn-solid" style={{ cursor: "pointer", border: "none", font: "inherit" }}>
                {copied ? "Copied ✓" : "nabeelahmedkabir@gmail.com"}
              </button>
              {LINKS.filter((l) => l.label !== "Email").map((l) => (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="ulink">{l.label} ↗</a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer style={{
          maxWidth: 1280, margin: "0 auto", padding: `24px ${PAD}px 32px`,
          borderTop: `1px solid ${BORDER}`, display: "flex", justifyContent: "space-between",
          fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: MUTED,
        }}>
          <span>NAK-01 · REV 3</span>
          <span>© 2026 NABEEL AHMED KABIR</span>
        </footer>
      </main>

      <style>{`
        * { box-sizing: border-box; }
        html, body { margin: 0; background: ${BG}; }
        body { font-family: var(--font-geist-sans), system-ui, sans-serif; color: ${INK}; }
        ::selection { background: ${ACCENT}; color: #fff; }
        a { color: inherit; text-decoration: none; }

        .nav-link { color: ${MUTED}; transition: color 0.2s; }
        .nav-link:hover { color: ${ACCENT}; }

        .btn {
          display: inline-block; font-size: 14px; padding: 12px 22px; border-radius: 999px;
          border: 1px solid ${INK}; color: ${INK}; transition: background 0.2s, color 0.2s;
        }
        .btn:hover { background: ${INK}; color: ${BG}; }
        .btn-solid { background: ${INK}; color: ${BG}; }
        .btn-solid:hover { background: ${ACCENT}; border-color: ${ACCENT}; color: #fff; }

        .ulink, .ulink-static {
          font-size: 14px; color: ${INK};
          background: linear-gradient(${ACCENT}, ${ACCENT}) 0 100% / 100% 1px no-repeat;
          padding-bottom: 2px; transition: color 0.2s;
        }
        .ulink:hover { color: ${ACCENT}; }

        .row .row-name { display: inline-block; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), color 0.2s; }
        .row .row-plus { transition: transform 0.3s, color 0.2s; }
        .row:hover .row-name { transform: translateX(10px); }
        .row:hover .row-idx, .row.open .row-idx, .row:hover .row-plus { color: ${ACCENT} !important; }
        .row.open .row-plus { transform: rotate(45deg); color: ${ACCENT} !important; }

        .pulse { stroke-dasharray: 22 1000; stroke-dashoffset: 22; animation: pulse 3.6s linear infinite; }
        @keyframes pulse { from { stroke-dashoffset: 22; } to { stroke-dashoffset: -1000; } }
        .hint-chev { animation: chev 1.8s ease-in-out infinite; }
        @keyframes chev { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }

        @media (prefers-reduced-motion: reduce) {
          .chip-hero { height: 100vh !important; }
          .pulse, .hint-chev { animation: none; }
        }
      `}</style>
    </>
  );
}
