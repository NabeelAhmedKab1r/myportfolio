"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DotGrid from "./components/DotGrid";

// ─── Word-cycle typewriter ────────────────────────────────────────────────────
const CYCLE_WORDS = ["SYSTEMS ENGINEER", "HARDWARE HACKER", "AI DEVELOPER", "FULL-STACK BUILDER"];

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

// ─── Data ─────────────────────────────────────────────────────────────────────
type Project = {
  name: string;
  desc: string;
  domain: string;
  domainColor: string;
  tech: string[];
  link?: string;
  github?: string;
};

const PROJECTS: Project[] = [
  {
    name: "EvoCars",
    domain: "AI Systems",
    domainColor: "#818CF8",
    desc: "Agents evolve to race autonomously via neural networks and genetic algorithms — fitness-based selection, mutation, and crossover over generations.",
    tech: ["Python", "Neural Networks", "Genetic Algorithms"],
    github: "https://github.com/NabeelAhmedKab1r/EvoCars",
  },
  {
    name: "FPGA VGA Snake",
    domain: "Hardware",
    domainColor: "#34D399",
    desc: "Snake game in Verilog on a DE10-Lite FPGA with VGA output at 640×480. Combinational and sequential logic for game state, rendering, and collision detection.",
    tech: ["Verilog", "FPGA", "VGA", "RTL"],
    link: "https://youtu.be/ExPmekK-cnw",
    github: "https://github.com/NabeelAhmedKab1r/SnakeGame-FPGA-Project",
  },
  {
    name: "ISS Tracker",
    domain: "Web & Tools",
    domainColor: "#38BDF8",
    desc: "Real-time web app tracking the ISS using live satellite data — interactive world map, NASA night lights overlay, orbit trail, 5-second position updates.",
    tech: ["JavaScript", "Leaflet", "HTML/CSS"],
    github: "https://github.com/NabeelAhmedKab1r/iss-tracker",
  },
  {
    name: "Snake Neon",
    domain: "Games",
    domainColor: "#F472B6",
    desc: "Neon-themed Snake in Pygame with a shop system, unlockable skins, special food types, particle effects, and multiple difficulty modes.",
    tech: ["Python", "Pygame", "Particle Systems"],
    github: "https://github.com/NabeelAhmedKab1r/snake-neon",
  },
  {
    name: "CodeLens",
    domain: "Web & Tools",
    domainColor: "#38BDF8",
    desc: "Code analysis tool that generates control-flow graphs (CFGs) for static inspection and visualization of program structure.",
    tech: ["Python", "Static Analysis", "CFG"],
    github: "https://github.com/NabeelAhmedKab1r/CodeLens",
  },
  {
    name: "Study Planner",
    domain: "Web & Tools",
    domainColor: "#38BDF8",
    desc: "Desktop assignment tracker built with CustomTkinter and SQLite. Deadline highlighting, overdue alerts, search, and light/dark theme.",
    tech: ["Python", "CustomTkinter", "SQLite"],
    github: "https://github.com/NabeelAhmedKab1r/study-planner",
  },
  {
    name: "City Survival",
    domain: "Games",
    domainColor: "#F472B6",
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

const SKILLS = [
  {
    label: "Languages",
    color: "#818CF8",
    items: ["JavaScript", "TypeScript", "Python", "Java", "C", "Bash", "SQL", "HTML/CSS"],
  },
  {
    label: "Frameworks & Tools",
    color: "#38BDF8",
    items: ["React", "Flask", "Leaflet.js", "REST APIs", "Git", "Linux/Unix", "Microsoft Azure"],
  },
  {
    label: "Hardware & Systems",
    color: "#34D399",
    items: ["Verilog", "FPGA", "Embedded Systems", "RTL Design"],
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        position: "fixed",
        left: 0, top: 0, bottom: 0,
        width: 64,
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 0",
        zIndex: 100,
        background: "rgba(6,10,16,0.75)",
        backdropFilter: "blur(14px)",
      }}
    >
      {/* Logo */}
      <div style={{ fontWeight: 900, fontSize: 13, color: "#818CF8", letterSpacing: "0.05em" }}>NA</div>

      {/* Nav */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
        {[["Work", "work"], ["Projects", "projects"], ["About", "about"], ["Skills", "skills"], ["Contact", "contact"]].map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            style={{
              fontSize: 9, letterSpacing: "0.2em", color: "#374151",
              textDecoration: "none", writingMode: "vertical-rl",
              transform: "rotate(180deg)", transition: "color 0.2s", userSelect: "none",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#818CF8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#374151")}
          >
            {label.toUpperCase()}
          </a>
        ))}
      </div>

      {/* Social */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            title={l.label}
            style={{
              fontSize: 9, letterSpacing: "0.1em", color: "#374151",
              textDecoration: "none", transition: "color 0.2s", writingMode: "vertical-rl",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#818CF8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#374151")}
          >
            {l.short}
          </a>
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: 300,
        background: hovered ? "rgba(129,140,248,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(129,140,248,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20,
        padding: "28px 24px",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 20,
        transition: "background 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.2s",
        boxShadow: hovered ? "0 16px 48px rgba(129,140,248,0.1)" : "none",
        transform: hovered ? "translateY(-4px)" : "none",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      {/* Domain color top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, ${project.domainColor}, transparent)`,
        opacity: hovered ? 1 : 0.35,
        transition: "opacity 0.25s",
      }} />

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{
            fontSize: 9, letterSpacing: "0.14em",
            color: project.domainColor,
            background: `${project.domainColor}18`,
            border: `1px solid ${project.domainColor}30`,
            padding: "3px 8px", borderRadius: 4,
          }}>
            {project.domain.toUpperCase()}
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, color: "#4B5563", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4B5563")}
              >↗ repo</a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 11, color: project.domainColor, opacity: 0.8, textDecoration: "none", transition: "opacity 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
              >↗ demo</a>
            )}
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 18, color: "#F1F5F9", letterSpacing: "-0.01em" }}>{project.name}</div>
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0D1117",
          border: `1px solid ${project.domainColor}40`,
          borderRadius: 24,
          padding: "40px 36px",
          maxWidth: 520,
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${project.domainColor}, transparent)`,
        }} />

        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 20,
            background: "none", border: "none", cursor: "pointer",
            color: "#4B5563", fontSize: 18, lineHeight: 1, padding: 4,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4B5563")}
        >✕</button>

        <span style={{
          fontSize: 9, letterSpacing: "0.14em",
          color: project.domainColor,
          background: `${project.domainColor}18`,
          border: `1px solid ${project.domainColor}30`,
          padding: "3px 8px", borderRadius: 4,
          display: "inline-block", marginBottom: 20,
        }}>
          {project.domain.toUpperCase()}
        </span>

        <div style={{ fontWeight: 700, fontSize: 28, color: "#F1F5F9", marginBottom: 16, letterSpacing: "-0.02em" }}>
          {project.name}
        </div>

        <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.85, marginBottom: 28 }}>
          {project.desc}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              fontSize: 11, padding: "5px 12px", borderRadius: 6,
              background: "rgba(255,255,255,0.04)", color: "#6B7280",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                fontSize: 13, color: "#9CA3AF",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "10px 20px", borderRadius: 10,
                textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.22)"; el.style.color = "#E5E7EB"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "#9CA3AF"; }}
            >↗ GitHub</a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              style={{
                fontSize: 13, color: "#08090F", fontWeight: 700,
                background: project.domainColor, padding: "10px 20px", borderRadius: 10,
                textDecoration: "none", transition: "opacity 0.2s",
              }}
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("nabeelahmedkabir@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Mouse-drag horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
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
      {!isMobile && <Sidebar />}

      {/* Mobile top bar */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, height: 52, zIndex: 100,
          background: "rgba(6,10,16,0.85)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px",
        }}>
          <span style={{ fontWeight: 900, fontSize: 13, color: "#818CF8" }}>NA</span>
          <div style={{ display: "flex", gap: 20 }}>
            {[["Projects", "projects"], ["About", "about"], ["Skills", "skills"], ["Contact", "contact"]].map(([l, id]) => (
              <a key={id} href={`#${id}`} style={{ fontSize: 11, color: "#6B7280", textDecoration: "none", letterSpacing: "0.06em" }}>{l}</a>
            ))}
          </div>
        </div>
      )}

      <div style={{
        marginLeft: SIDEBAR_W,
        background: "#060A10",
        minHeight: "100vh",
        position: "relative",
        backgroundImage: `
          linear-gradient(rgba(129,140,248,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(129,140,248,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
      }}>

        {/* Ambient blobs */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20%", left: "-5%", width: 700, height: 700, borderRadius: "50%", background: "rgba(99,102,241,0.09)", filter: "blur(140px)" }} />
          <div style={{ position: "absolute", bottom: "0%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "rgba(56,189,248,0.06)", filter: "blur(120px)" }} />
        </div>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          id="work"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: isMobile ? `${80 + 52}px 24px 60px` : `0 ${PAD}px`,
            position: "relative",
            zIndex: 1,
          }}
        >
          {!isMobile && (
            <div style={{ position: "absolute", right: PAD, top: "50%", transform: "translateY(-50%)", opacity: 0.6, pointerEvents: "auto" }}>
              <DotGrid />
            </div>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{ fontSize: 10, letterSpacing: "0.25em", color: "#818CF8", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}
          >
            <div style={{ width: 28, height: 1, background: "#818CF8" }} />
            01 — PORTFOLIO
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: isMobile ? "clamp(56px,14vw,72px)" : "clamp(64px,8.5vw,112px)",
              fontWeight: 900,
              lineHeight: 0.95,
              margin: "0 0 22px",
              background: "linear-gradient(140deg, #FFFFFF 0%, #C7D2FE 45%, #818CF8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
            }}
          >
            Nabeel<br />Ahmed Kabir
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            style={{ fontSize: 12, letterSpacing: "0.2em", color: "#818CF8", marginBottom: 24, height: 20 }}
          >
            {title}<span className="cursor-blink">|</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.85, maxWidth: 460, margin: "0 0 44px" }}
          >
            Building at the intersection of hardware and software —
            from RTL to production.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              style={{
                fontSize: 13, color: "#08090F", fontWeight: 700,
                background: "#818CF8", padding: "11px 26px", borderRadius: 10,
                textDecoration: "none", transition: "opacity 0.2s, transform 0.15s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.opacity = "0.88"; el.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.opacity = "1"; el.style.transform = "none"; }}
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              download
              style={{
                fontSize: 13, color: "#9CA3AF",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "11px 26px", borderRadius: 10,
                textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.22)"; el.style.color = "#E5E7EB"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.1)"; el.style.color = "#9CA3AF"; }}
            >
              Resume ↓
            </a>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 14px", borderRadius: 20,
              background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)",
            }}>
              <div className="badge-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399" }} />
              <span style={{ fontSize: 11, color: "#34D399", letterSpacing: "0.04em" }}>Available</span>
            </div>
          </motion.div>

          {!isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              style={{
                position: "absolute", bottom: 36, left: PAD,
                display: "flex", alignItems: "center", gap: 12,
                fontSize: 9, letterSpacing: "0.25em", color: "#374151",
              }}
            >
              <div style={{ width: 32, height: 1, background: "#374151" }} />
              SCROLL
            </motion.div>
          )}
        </section>

        {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
        <section id="projects" style={{ padding: "120px 0", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            style={{ padding: `0 ${PAD}px`, marginBottom: 44 }}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#818CF8", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 1, background: "#818CF8" }} />
              02 — PROJECTS
            </div>
            <div style={{ fontSize: isMobile ? 28 : 36, fontWeight: 900, color: "#F9FAFB", letterSpacing: "-0.02em" }}>Selected Work</div>
          </motion.div>

          <div
            ref={scrollRef}
            style={{
              display: "flex",
              gap: 16,
              overflowX: "auto",
              padding: `4px ${PAD}px 32px`,
              scrollSnapType: "x mandatory",
              cursor: "grab",
              scrollbarWidth: "none",
            }}
          >
            {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} onClick={() => setSelectedProject(p)} />)}
          </div>
          <div style={{ padding: `0 ${PAD}px`, marginTop: 8 }}>
            <span style={{ fontSize: 10, letterSpacing: "0.15em", color: "#374151" }}>← DRAG TO EXPLORE →</span>
          </div>
        </section>

        {/* ── ABOUT (big type) ─────────────────────────────────────────────── */}
        <section id="about" style={{ padding: `120px ${PAD}px`, position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#818CF8", marginBottom: 52, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 1, background: "#818CF8" }} />
              03 — ABOUT
            </div>

            <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: isMobile ? "clamp(28px,8vw,40px)" : "clamp(36px,5vw,68px)",
                  fontWeight: 900,
                  lineHeight: 1.15,
                  letterSpacing: "-0.025em",
                  marginBottom: 56,
                }}>
                  <span style={{ color: "#F9FAFB" }}>I build at the </span>
                  <span style={{
                    background: "linear-gradient(135deg, #818CF8, #38BDF8)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>boundaries.</span>
                  <br />
                  <span style={{ color: "#4B5563" }}>Where hardware meets software,<br />data meets inference.</span>
                </div>

                <div style={{ display: "flex", gap: isMobile ? 28 : 40, flexWrap: "wrap" }}>
                  {[
                    { label: "DEGREE", value: "Computer Engineering" },
                    { label: "UNIVERSITY", value: "York University" },
                    { label: "STATUS", value: "3rd year, 2023–Present" },
                    { label: "CURRENTLY", value: "Building EvoCars" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "#374151", marginBottom: 8 }}>{item.label}</div>
                      <div style={{ fontSize: 14, color: "#9CA3AF" }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {!isMobile && (
                <div style={{ flexShrink: 0, width: 320, borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/photo.jpg"
                    alt="Nabeel Ahmed Kabir"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* ── SKILLS ───────────────────────────────────────────────────────── */}
        <section id="skills" style={{ padding: `120px ${PAD}px`, position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#818CF8", marginBottom: 44, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 1, background: "#818CF8" }} />
              04 — SKILLS
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              {SKILLS.map((group, i) => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  style={{ display: "flex", gap: isMobile ? 16 : 32, alignItems: "flex-start", flexDirection: isMobile ? "column" : "row" }}
                >
                  <div style={{ width: isMobile ? "auto" : 160, flexShrink: 0 }}>
                    <span style={{
                      fontSize: 9, letterSpacing: "0.14em",
                      color: group.color,
                      background: `${group.color}18`,
                      border: `1px solid ${group.color}30`,
                      padding: "3px 8px", borderRadius: 4,
                    }}>
                      {group.label.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {group.items.map((item) => (
                      <span key={item} style={{
                        fontSize: 13, padding: "6px 14px", borderRadius: 8,
                        background: "rgba(255,255,255,0.03)",
                        color: "#9CA3AF",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── EDUCATION ────────────────────────────────────────────────────── */}
        <section id="education" style={{ padding: `80px ${PAD}px`, position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#818CF8", marginBottom: 44, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 1, background: "#818CF8" }} />
              05 — EDUCATION
            </div>
            {EDUCATION.map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 28, maxWidth: 660 }}>
                <div style={{ width: 2, flexShrink: 0, background: "linear-gradient(180deg, #818CF8, transparent)", borderRadius: 2, minHeight: 80 }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "#E5E7EB", marginBottom: 6, letterSpacing: "-0.01em" }}>{e.degree}</div>
                  <div style={{ fontSize: 13, color: "#4B5563", marginBottom: 16 }}>{e.institution} · {e.period}</div>
                  {e.details.map((d, j) => (
                    <div key={j} style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.8, marginBottom: 4 }}>· {d}</div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────────── */}
        <section id="contact" style={{ padding: `80px ${PAD}px 140px`, position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#818CF8", marginBottom: 44, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 1, background: "#818CF8" }} />
              06 — CONTACT
            </div>
            <div style={{
              fontSize: isMobile ? "clamp(28px,8vw,36px)" : "clamp(32px,4vw,52px)",
              fontWeight: 900, color: "#F9FAFB", letterSpacing: "-0.025em", marginBottom: 20,
            }}>
              Let&apos;s work<br />together.
            </div>
            <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.85, marginBottom: 40, maxWidth: 440 }}>
              Open to internships, collaborations, and interesting problems at the intersection of hardware and software.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={l.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  style={{
                    fontSize: 13, color: "#9CA3AF",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "11px 22px", borderRadius: 10,
                    textDecoration: "none", transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(129,140,248,0.4)"; el.style.color = "#818CF8"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.color = "#9CA3AF"; }}
                >
                  {l.label} ↗
                </a>
              ))}
              <button
                onClick={copyEmail}
                style={{
                  fontSize: 13, color: "#08090F", fontWeight: 700,
                  background: copied ? "#34D399" : "#818CF8",
                  padding: "11px 22px", borderRadius: 10,
                  border: "none", cursor: "pointer",
                  transition: "background 0.3s, opacity 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.85")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                {copied ? "Copied! ✓" : "Copy Email"}
              </button>
            </div>
          </motion.div>
        </section>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
        .cursor-blink { animation: blink 1.1s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .badge-dot { animation: badgePulse 2s ease-out infinite; }
        @keyframes badgePulse {
          0%   { box-shadow: 0 0 0 0 rgba(52,211,153,0.6), 0 0 8px #34D399; }
          60%  { box-shadow: 0 0 0 7px rgba(52,211,153,0), 0 0 8px #34D399; }
          100% { box-shadow: 0 0 0 0 rgba(52,211,153,0), 0 0 8px #34D399; }
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder, textarea::placeholder { color: #374151; }
      `}</style>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
