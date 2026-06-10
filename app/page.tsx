"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Theme ────────────────────────────────────────────────────────────────────
const ACCENT  = "#C8522A";
const BG      = "#F5F0E8";
const TEXT    = "#0A0A0A";
const MUTED   = "#7A7A7A";
const BORDER  = "#D4CFC4";
const CARD_BG = "#FFFFFF";
const DISPLAY = "var(--font-display)";

// ─── Word-cycle typewriter ────────────────────────────────────────────────────
const CYCLE_WORDS = ["SOFTWARE DEVELOPER", "AI DEVELOPER", "FULL-STACK BUILDER", "SYSTEMS ENGINEER"];

function useWordCycle(words: string[], typingSpeed = 55, deleteSpeed = 35, pauseMs = 2200) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    const word = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseMs);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deleteSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex, words, typingSpeed, deleteSpeed, pauseMs]);

  return displayed;
}

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

// ─── Scroll progress & active section ────────────────────────────────────────
const SECTION_IDS = ["work", "projects", "experience", "about", "skills", "education", "contact"];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollTop / (scrollHeight - clientHeight));
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState("work");
  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.offsetTop <= scrollY) { setActive(SECTION_IDS[i]); break; }
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  return active;
}

// ─── Custom cursor (desktop only, no React re-renders) ────────────────────────
function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const move = (e: MouseEvent) => {
      dot.style.transform  = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      ring.style.transform = `translate(${e.clientX - 14}px, ${e.clientY - 14}px)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position: "fixed", left: 0, top: 0, pointerEvents: "none", zIndex: 9999,
        width: 6, height: 6, borderRadius: "50%", background: ACCENT,
      }}/>
      <div ref={ringRef} style={{
        position: "fixed", left: 0, top: 0, pointerEvents: "none", zIndex: 9998,
        width: 28, height: 28, borderRadius: "50%",
        border: `1.5px solid ${ACCENT}`, opacity: 0.6,
        transition: "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
      }}/>
    </>
  );
}

// ─── Marquee ticker ───────────────────────────────────────────────────────────
const TICKER = [
  "AI DEVELOPER", "PYTHON", "NEURAL NETWORKS", "FPGA HARDWARE",
  "REACT", "REST APIs", "YORK UNIVERSITY", "TORONTO CA",
  "SYSTEMS THAT THINK", "CLAUDE CODE", "FULL-STACK BUILDER",
];

function MarqueeTicker() {
  const doubled = [...TICKER, ...TICKER];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "13px 0", background: BG }}>
      <div className="marquee-track" style={{ display: "flex", width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span style={{ fontSize: 10, letterSpacing: "0.22em", color: MUTED, whiteSpace: "nowrap", padding: "0 20px" }}>
              {item}
            </span>
            <span style={{ color: ACCENT, fontSize: 8, opacity: 0.5 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
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
    name: "EvoCars",
    domain: "AI Systems",
    desc: "Agents evolve to race autonomously via neural networks and genetic algorithms — fitness-based selection, mutation, and crossover over generations.",
    tech: ["Python", "Neural Networks", "Genetic Algorithms"],
    github: "https://github.com/NabeelAhmedKab1r/EvoCars",
  },
  {
    name: "FPGA VGA Snake",
    domain: "Hardware",
    desc: "Snake game in Verilog on a DE10-Lite FPGA with VGA output at 640×480. Combinational and sequential logic for game state, rendering, and collision detection.",
    tech: ["Verilog", "FPGA", "VGA", "RTL"],
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
  { label: "GitHub",   short: "GH", href: "https://github.com/NabeelAhmedKab1r" },
  { label: "LinkedIn", short: "LI", href: "https://www.linkedin.com/in/nabeelahmedkabir/" },
  { label: "Email",    short: "EM", href: "mailto:nabeelahmedkabir@gmail.com" },
];

const EDUCATION = [
  {
    degree: "Bachelor of Engineering",
    institution: "York University",
    period: "2023 – Present",
    details: [
      "Third year — Computer Engineering",
      "Relevant coursework: Data Structures & Algorithms, OOP, Operating Systems, Computer Networks",
    ],
  },
];

const WORK_EXPERIENCE = [
  {
    title: "AI Software Developer Intern",
    company: "Cotriply",
    period: "April 2026 – Present",
    tag: "Advance Ontario",
    bullets: [
      "Transitioning an AI-powered group travel coordination platform from prototype to MVP",
      "Testing and documenting REST APIs to validate existing platform functionality",
      "Implementing automation workflows to improve platform efficiency",
      "Improving data handling processes to support AI-driven travel planning features",
    ],
  },
];

const SKILLS = [
  { label: "Languages",         items: ["Python", "JavaScript", "TypeScript", "Java", "C", "Bash", "SQL", "HTML/CSS"] },
  { label: "Frameworks & Tools",items: ["React", "REST APIs", "Git", "Linux/Unix", "Microsoft Azure", "MongoDB", "MySQL", "pandas", "NumPy", "LLM APIs", "Claude Code"] },
  { label: "Testing",           items: ["Jest", "pytest", "Randoop", "JUnit"] },
  { label: "Hardware & Systems",items: ["Verilog", "FPGA", "Embedded Systems", "RTL Design"] },
];

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ num, label, light }: { num: string; label: string; light?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
      <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 11, letterSpacing: "0.25em", color: light ? "rgba(245,240,232,0.55)" : ACCENT }}>{num}</span>
      <div style={{ flex: 1, height: 1, background: light ? "rgba(245,240,232,0.2)" : BORDER }} />
      <span style={{ fontSize: 9, letterSpacing: "0.25em", color: light ? "rgba(245,240,232,0.45)" : MUTED }}>{label}</span>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ activeSection }: { activeSection: string }) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed", left: 0, top: 0, bottom: 0, width: 64,
        borderRight: `1px solid ${BORDER}`,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
        padding: "24px 0", zIndex: 100, background: BG,
      }}
    >
      <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 14, color: ACCENT, letterSpacing: "0.02em" }}>NA</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
        {[["Work", "work"], ["Projects", "projects"], ["Experience", "experience"], ["About", "about"], ["Skills", "skills"], ["Contact", "contact"]].map(([label, id]) => {
          const isActive = activeSection === id;
          return (
            <a key={id} href={`#${id}`} style={{
              fontSize: 9, letterSpacing: "0.2em",
              color: isActive ? ACCENT : MUTED,
              textDecoration: "none", writingMode: "vertical-rl",
              transform: "rotate(180deg)", transition: "color 0.2s", userSelect: "none",
              fontWeight: isActive ? 700 : 400,
            }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = TEXT; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = MUTED; }}
            >{label.toUpperCase()}</a>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" title={l.label}
            style={{ fontSize: 9, letterSpacing: "0.1em", color: MUTED, textDecoration: "none", transition: "color 0.2s", writingMode: "vertical-rl" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
          >{l.short}</a>
        ))}
      </div>
    </motion.aside>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        flexShrink: 0, width: 280,
        background: CARD_BG,
        border: `1px solid ${hovered ? TEXT : BORDER}`,
        borderTop: `2px solid ${hovered ? ACCENT : BORDER}`,
        borderRadius: 4, padding: "24px 20px",
        scrollSnapAlign: "start",
        display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 16,
        transition: "border-color 0.2s, border-top-color 0.2s",
        cursor: "none",
      }}
    >
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.14em", color: MUTED, border: `1px solid ${BORDER}`, padding: "3px 8px", borderRadius: 2 }}>
            {project.domain.toUpperCase()}
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ fontSize: 11, color: MUTED, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = ACCENT)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
              >↗ repo</a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{ fontSize: 11, color: ACCENT, textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >↗ demo</a>
            )}
          </div>
        </div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 22, color: TEXT, letterSpacing: "-0.01em" }}>
          {project.name}
        </div>
        <div style={{
          overflow: "hidden",
          maxHeight: hovered ? 72 : 0,
          opacity: hovered ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}>
          <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.65, paddingTop: 10 }}>
            {project.desc}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(10,10,10,0.45)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: CARD_BG, border: `1px solid ${BORDER}`, borderTop: `3px solid ${ACCENT}`,
          borderRadius: 4, padding: "40px 36px", maxWidth: 520, width: "100%", position: "relative",
        }}
      >
        <button onClick={onClose} style={{
          position: "absolute", top: 20, right: 20,
          background: "none", border: "none", color: MUTED, fontSize: 18, lineHeight: 1, padding: 4,
          transition: "color 0.2s", cursor: "none",
        }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = TEXT)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
        >✕</button>

        <span style={{
          fontSize: 9, letterSpacing: "0.14em", color: MUTED,
          border: `1px solid ${BORDER}`, padding: "3px 8px", borderRadius: 2,
          display: "inline-block", marginBottom: 20,
        }}>{project.domain.toUpperCase()}</span>

        <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 32, color: TEXT, marginBottom: 16, letterSpacing: "-0.02em" }}>
          {project.name}
        </div>
        <div style={{ fontSize: 14, color: MUTED, lineHeight: 1.85, marginBottom: 28 }}>{project.desc}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {project.tech.map((t) => (
            <span key={t} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 3, background: BG, color: MUTED, border: `1px solid ${BORDER}` }}>{t}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: MUTED, border: `1px solid ${BORDER}`, padding: "10px 20px", borderRadius: 4, textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = TEXT; el.style.color = TEXT; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER; el.style.color = MUTED; }}
            >↗ GitHub</a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 13, color: "#FFF", fontWeight: 700, background: ACCENT, padding: "10px 20px", borderRadius: 4, textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >↗ Demo</a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const isMobile = useIsMobile();
  const title = useWordCycle(CYCLE_WORDS);
  const progress = useScrollProgress();
  const activeSection = useActiveSection();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("nabeelahmedkabir@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;
    const onDown = (e: MouseEvent) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; el.style.cursor = "grabbing"; };
    const onUp = () => { isDown = false; el.style.cursor = "grab"; };
    const onMove = (e: MouseEvent) => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX); };
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove);
    return () => { el.removeEventListener("mousedown", onDown); window.removeEventListener("mouseup", onUp); el.removeEventListener("mousemove", onMove); };
  }, []);

  const SIDEBAR_W = isMobile ? 0 : 64;
  const PAD = isMobile ? 24 : 88;

  return (
    <>
      <CustomCursor />

      {/* Scroll progress bar */}
      <div style={{
        position: "fixed", top: 0, left: isMobile ? 0 : 64, right: 0,
        height: 2, background: ACCENT, zIndex: 9996, pointerEvents: "none",
        transform: `scaleX(${progress})`, transformOrigin: "left",
      }}/>

      {/* Film grain */}
      <div className="grain" style={{
        position: "fixed", inset: "-50%", width: "200%", height: "200%",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: 0.045, pointerEvents: "none", zIndex: 997,
      }}/>

      {!isMobile && <Sidebar activeSection={activeSection} />}

      {isMobile && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, height: 52, zIndex: 100,
          background: BG, borderBottom: `1px solid ${BORDER}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px",
        }}>
          <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 14, color: ACCENT }}>NA</span>
          <div style={{ display: "flex", gap: 20 }}>
            {[["Projects", "projects"], ["Experience", "experience"], ["About", "about"], ["Skills", "skills"], ["Contact", "contact"]].map(([l, id]) => (
              <a key={id} href={`#${id}`} style={{ fontSize: 11, color: MUTED, textDecoration: "none", letterSpacing: "0.06em" }}>{l}</a>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginLeft: SIDEBAR_W, background: BG, minHeight: "100vh" }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section id="work" style={{
          minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
          padding: isMobile ? `${80 + 52}px 24px 60px` : `0 ${PAD}px`,
          position: "relative", overflow: "hidden",
        }}>

          {/* Decorative ghost initials */}
          {!isMobile && (
            <div style={{
              position: "absolute", right: -24, top: "50%", transform: "translateY(-50%)",
              fontFamily: DISPLAY, fontWeight: 900,
              fontSize: "clamp(260px, 36vw, 480px)",
              color: BORDER, letterSpacing: "-0.05em", lineHeight: 1,
              userSelect: "none", pointerEvents: "none", opacity: 0.55, zIndex: 0,
            }}>NA</div>
          )}

          <div style={{ position: "relative", zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{ fontSize: 10, letterSpacing: "0.3em", color: ACCENT, marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}
            >
              01 — PORTFOLIO
              <div style={{ width: 48, height: 1, background: BORDER }} />
            </motion.div>

            {/* Bold opening statement */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              style={{
                fontFamily: DISPLAY, fontWeight: 700,
                fontSize: isMobile ? 18 : 22,
                color: MUTED, letterSpacing: "0.01em", marginBottom: 12,
                fontStyle: "italic",
              }}
            >
              I build systems that think.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: DISPLAY,
                fontSize: isMobile ? "clamp(72px,18vw,96px)" : "clamp(100px,13vw,172px)",
                fontWeight: 900, lineHeight: 0.92, margin: 0,
                color: TEXT, letterSpacing: "-0.025em",
              }}
            >
              Nabeel<br />Ahmed Kabir
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              style={{ height: 1, background: BORDER, margin: "32px 0", transformOrigin: "left" }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              style={{ display: "flex", gap: isMobile ? 28 : 72, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, letterSpacing: "0.2em", color: ACCENT, marginBottom: 18, height: 18 }}>
                  {title}<span className="cursor-blink">_</span>
                </div>
                <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.85, maxWidth: 400, margin: "0 0 36px" }}>
                  Software developer and AI enthusiast — building intelligent
                  systems from agentic workflows to the web.
                </p>
                <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                  <a href="#projects" style={{
                    fontSize: 13, color: "#FFF", fontWeight: 700,
                    background: ACCENT, padding: "11px 26px", borderRadius: 4,
                    textDecoration: "none", transition: "opacity 0.2s", letterSpacing: "0.01em",
                  }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  >View Projects</a>
                  <a href="/resume.pdf" download style={{
                    fontSize: 13, color: MUTED, border: `1px solid ${BORDER}`,
                    padding: "11px 26px", borderRadius: 4, textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
                  }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = TEXT; el.style.color = TEXT; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER; el.style.color = MUTED; }}
                  >Resume ↓</a>
                </div>
              </div>

              {!isMobile && (
                <div style={{ flexShrink: 0, display: "flex", flexDirection: "column" }}>
                  {[
                    { label: "LOCATION",   value: "Toronto, CA" },
                    { label: "DEGREE",     value: "Computer Engineering" },
                    { label: "UNIVERSITY", value: "York University" },
                    { label: "STATUS",     value: "Year 3 · 2023–Present" },
                  ].map((item) => (
                    <div key={item.label} style={{ borderBottom: `1px solid ${BORDER}`, padding: "16px 0", minWidth: 200 }}>
                      <div style={{ fontSize: 9, letterSpacing: "0.2em", color: MUTED, marginBottom: 6 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: TEXT }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {!isMobile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.5 }}
              style={{ position: "absolute", bottom: 36, left: PAD, display: "flex", alignItems: "center", gap: 12, fontSize: 9, letterSpacing: "0.25em", color: MUTED }}
            >
              <div style={{ width: 32, height: 1, background: BORDER }} />SCROLL
            </motion.div>
          )}
        </section>

        {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
        <MarqueeTicker />

        {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
        <section id="projects" style={{ padding: "120px 0", position: "relative", borderTop: `1px solid ${BORDER}` }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}
            style={{ padding: `0 ${PAD}px`, marginBottom: 44 }}
          >
            <SectionLabel num="02" label="PROJECTS" />
            <div style={{ fontFamily: DISPLAY, fontSize: isMobile ? 40 : 60, fontWeight: 900, color: TEXT, letterSpacing: "-0.02em" }}>Selected Work</div>
          </motion.div>

          <div ref={scrollRef} style={{
            display: "flex", gap: 12, overflowX: "auto",
            padding: `4px ${PAD}px 32px`, scrollSnapType: "x mandatory",
            cursor: "grab", scrollbarWidth: "none",
          }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} onClick={() => setSelectedProject(p)} />)}
            <div style={{ flexShrink: 0, width: PAD }} />
          </div>
          <div style={{ padding: `0 ${PAD}px`, marginTop: 8 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.15em", color: MUTED }}>← DRAG TO EXPLORE →</span>
          </div>
        </section>

        {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
        <section id="experience" style={{ padding: `120px ${PAD}px`, position: "relative", borderTop: `1px solid ${BORDER}` }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
            <SectionLabel num="03" label="EXPERIENCE" />
            <div style={{ fontFamily: DISPLAY, fontSize: isMobile ? 40 : 60, fontWeight: 900, color: TEXT, letterSpacing: "-0.02em", marginBottom: 56 }}>Work</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {WORK_EXPERIENCE.map((job, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}
                  style={{ display: "flex", gap: 28, maxWidth: 720 }}
                >
                  <div style={{ width: 2, flexShrink: 0, background: `linear-gradient(180deg, ${ACCENT}, transparent)`, borderRadius: 2, minHeight: 100 }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                      <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 22, color: TEXT, letterSpacing: "-0.01em" }}>{job.title}</div>
                      <span style={{ fontSize: 9, letterSpacing: "0.14em", color: ACCENT, border: `1px solid ${ACCENT}`, opacity: 0.7, padding: "3px 8px", borderRadius: 2, whiteSpace: "nowrap" }}>{job.tag}</span>
                    </div>
                    <div style={{ fontSize: 13, color: MUTED, marginBottom: 20 }}>{job.company} · {job.period}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {job.bullets.map((b, j) => (
                        <div key={j} style={{ fontSize: 13, color: MUTED, lineHeight: 1.8 }}>· {b}</div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────────────────── */}
        <section id="about" style={{ padding: `120px ${PAD}px`, position: "relative", borderTop: `1px solid ${BORDER}` }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}>
            <SectionLabel num="04" label="ABOUT" />
            <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: DISPLAY,
                  fontSize: isMobile ? "clamp(36px,9vw,52px)" : "clamp(44px,5.5vw,76px)",
                  fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.025em", marginBottom: 52,
                }}>
                  <span style={{ color: TEXT }}>I build at the </span>
                  <span style={{ color: ACCENT }}>boundaries.</span>
                  <br />
                  <span style={{ color: MUTED, fontSize: "0.6em", fontWeight: 700 }}>
                    Where hardware meets software,<br />data meets inference.
                  </span>
                </div>

                <div style={{ display: "flex", borderTop: `1px solid ${BORDER}`, flexWrap: "wrap" }}>
                  {[
                    { label: "DEGREE",     value: "Computer Engineering" },
                    { label: "UNIVERSITY", value: "York University" },
                    { label: "STATUS",     value: "3rd year, 2023–Present" },
                    { label: "CURRENTLY",  value: "AI Dev Intern @ Cotriply" },
                  ].map((item, idx) => (
                    <div key={item.label} style={{
                      flex: "1 1 45%", padding: "20px 0",
                      paddingRight: idx % 2 === 0 && !isMobile ? 32 : 0,
                      borderBottom: `1px solid ${BORDER}`,
                      borderRight: idx % 2 === 0 && !isMobile ? `1px solid ${BORDER}` : "none",
                      paddingLeft: idx % 2 === 1 && !isMobile ? 32 : 0,
                    }}>
                      <div style={{ fontSize: 9, letterSpacing: "0.2em", color: MUTED, marginBottom: 8 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: TEXT }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {!isMobile && (
                <div style={{ flexShrink: 0, width: 300, borderRadius: 4, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/photo.jpg" alt="Nabeel Ahmed Kabir"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────────────────── */}
        <section id="skills" style={{ padding: `120px ${PAD}px`, position: "relative", borderTop: `1px solid ${BORDER}` }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
            <SectionLabel num="05" label="SKILLS" />
            <div style={{ fontFamily: DISPLAY, fontSize: isMobile ? 40 : 60, fontWeight: 900, color: TEXT, letterSpacing: "-0.02em", marginBottom: 48 }}>Capabilities</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {SKILLS.map((group, i) => (
                <motion.div key={group.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                  style={{ display: "flex", gap: isMobile ? 16 : 40, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row", padding: "24px 0", borderBottom: `1px solid ${BORDER}` }}
                >
                  <div style={{ width: isMobile ? "auto" : 180, flexShrink: 0 }}>
                    <span style={{ fontSize: 9, letterSpacing: "0.14em", color: MUTED }}>{group.label.toUpperCase()}</span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.map((item) => (
                      <span key={item} style={{ fontSize: 13, padding: "6px 14px", borderRadius: 3, color: TEXT, border: `1px solid ${BORDER}` }}>{item}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── EDUCATION ────────────────────────────────────────────────────── */}
        <section id="education" style={{ padding: `80px ${PAD}px`, position: "relative", borderTop: `1px solid ${BORDER}` }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4 }}>
            <SectionLabel num="06" label="EDUCATION" />
            {EDUCATION.map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 28, maxWidth: 660 }}>
                <div style={{ width: 2, flexShrink: 0, background: `linear-gradient(180deg, ${ACCENT}, transparent)`, borderRadius: 2, minHeight: 80 }}/>
                <div>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 22, color: TEXT, marginBottom: 6, letterSpacing: "-0.01em" }}>{e.degree}</div>
                  <div style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>{e.institution} · {e.period}</div>
                  {e.details.map((d, j) => (
                    <div key={j} style={{ fontSize: 13, color: MUTED, lineHeight: 1.8, marginBottom: 4 }}>· {d}</div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────────── */}
        <section id="contact" style={{ padding: `80px ${PAD}px 140px`, position: "relative", background: ACCENT }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4 }}>
            <SectionLabel num="07" label="CONTACT" light />
            <div style={{
              fontFamily: DISPLAY,
              fontSize: isMobile ? "clamp(44px,11vw,64px)" : "clamp(60px,7vw,96px)",
              fontWeight: 900, color: "#FFFFFF", letterSpacing: "-0.025em", marginBottom: 20, lineHeight: 1,
            }}>
              Let&apos;s work<br /><span style={{ color: BG }}>together.</span>
            </div>
            <div style={{ fontSize: 14, color: "rgba(245,240,232,0.65)", lineHeight: 1.85, marginBottom: 40, maxWidth: 440 }}>
              Open to collaborations, new opportunities, and interesting problems in AI and software engineering.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {LINKS.map((l) => (
                <a key={l.label} href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  style={{ fontSize: 13, color: "rgba(245,240,232,0.8)", border: "1px solid rgba(245,240,232,0.3)", padding: "11px 22px", borderRadius: 4, textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(245,240,232,0.9)"; el.style.color = "#FFFFFF"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(245,240,232,0.3)"; el.style.color = "rgba(245,240,232,0.8)"; }}
                >{l.label} ↗</a>
              ))}
              <button onClick={copyEmail} style={{
                fontSize: 13, color: copied ? "#FFF" : ACCENT, fontWeight: 700,
                background: copied ? "#16A34A" : BG,
                padding: "11px 22px", borderRadius: 4, border: "none",
                transition: "background 0.3s, color 0.3s", cursor: "none",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.9")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >{copied ? "Copied! ✓" : "Copy Email"}</button>
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ───────────────────────────────────────────────────────── */}
        <footer style={{
          borderTop: `1px solid ${BORDER}`,
          padding: `20px ${PAD}px`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: BG,
        }}>
          <span style={{ fontFamily: DISPLAY, fontWeight: 900, fontSize: 12, color: MUTED, letterSpacing: "0.05em" }}>
            Nabeel Ahmed Kabir
          </span>
          <span style={{ fontSize: 10, letterSpacing: "0.15em", color: MUTED }}>© 2026</span>
        </footer>

      </div>

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: ${BG}; }
        @media (pointer: fine) { * { cursor: none !important; } }
        .cursor-blink { animation: blink 1.1s step-end infinite; color: ${ACCENT}; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { display: none; }
        .grain { animation: grain 0.45s steps(1) infinite; }
        @keyframes grain {
          0%   { transform: translate(0, 0); }
          10%  { transform: translate(-5%, -10%); }
          20%  { transform: translate(-15%, 5%); }
          30%  { transform: translate(7%, -25%); }
          40%  { transform: translate(-5%, 25%); }
          50%  { transform: translate(-15%, 10%); }
          60%  { transform: translate(15%, 0%); }
          70%  { transform: translate(0%, 15%); }
          80%  { transform: translate(3%, 35%); }
          90%  { transform: translate(-10%, 10%); }
          100% { transform: translate(0, 0); }
        }
        .marquee-track { animation: marquee 32s linear infinite; }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>

      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </>
  );
}
