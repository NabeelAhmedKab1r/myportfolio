"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./components/ParticleBackground";

// ─── Typewriter hook ──────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 70, startDelay = 900) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(iv);
      }, speed);
      return () => clearInterval(iv);
    }, startDelay);
    return () => clearTimeout(t);
  }, [text, speed, startDelay]);
  return displayed;
}

// ─── Mobile hook ──────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 680) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar() {
  const [err, setErr] = useState(false);
  return !err ? (
    <img src="/profile.jpg" alt="Nabeel Ahmed" onError={() => setErr(true)}
      style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
  ) : (
    <div style={{ width: 42, height: 42, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg, #818CF8 0%, #38BDF8 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#fff", letterSpacing: "0.02em" }}>NA</div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
type Project = {
  name: string;
  desc: string;
  tech?: string[];
  link?: string;
  github?: string;
};

type Domain = {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: string[];
  projects: Project[];
};

const DOMAINS: Domain[] = [
  {
    id: "ai",
    label: "AI Systems",
    icon: "⬡",
    color: "#818CF8",
    skills: ["Neural Networks", "Genetic Algorithms", "Static Analysis", "FastAPI", "Tree-Sitter", "Python"],
    projects: [
      {
        name: "EvoCars",
        desc: "Agents evolve to race autonomously via neural networks and genetic algorithms — fitness-based selection, mutation, and crossover over generations.",
        tech: ["Python", "Neural Networks", "Genetic Algorithms"],
        github: "https://github.com/NabeelAhmedKab1r/EvoCars",
      },
      {
        name: "AI Debugger",
        desc: "Prototype AI-powered debugging tool using Tree-Sitter for static code parsing, issue detection, and report generation. FastAPI backend.",
        tech: ["Python", "FastAPI", "Tree-Sitter"],
        github: "https://github.com/NabeelAhmedKab1r/ai-debugger",
      },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    icon: "⬢",
    color: "#34D399",
    skills: ["Verilog", "FPGA", "VGA", "RTL", "DE10-Lite"],
    projects: [
      {
        name: "FPGA VGA Snake",
        desc: "Snake game implemented in Verilog on a DE10-Lite FPGA with VGA output at 640×480. Combinational and sequential logic for game state, rendering, and collision detection.",
        tech: ["Verilog", "FPGA", "VGA", "RTL"],
        link: "https://youtu.be/ExPmekK-cnw",
        github: "https://github.com/NabeelAhmedKab1r/fpga-vga-snake",
      },
    ],
  },
  {
    id: "web",
    label: "Web & Tools",
    icon: "◎",
    color: "#38BDF8",
    skills: ["JavaScript", "Leaflet", "SQLite", "Python", "CustomTkinter"],
    projects: [
      {
        name: "ISS Tracker",
        desc: "Real-time web app tracking the ISS using live satellite data — interactive world map, NASA night lights overlay, orbit trail, and 5-second position updates.",
        tech: ["JavaScript", "Leaflet", "HTML/CSS"],
        github: "https://github.com/NabeelAhmedKab1r/iss-tracker",
      },
      {
        name: "Study Planner",
        desc: "Desktop assignment tracker built with CustomTkinter and SQLite. Deadline highlighting, overdue alerts, search, and light/dark theme.",
        tech: ["Python", "CustomTkinter", "SQLite"],
        github: "https://github.com/NabeelAhmedKab1r/study-planner",
      },
      {
        name: "CodeLens",
        desc: "Python-based code analysis tool that generates control-flow graphs (CFGs) for static inspection and visualization of program structure.",
        tech: ["Python", "Static Analysis", "CFG"],
        github: "https://github.com/NabeelAhmedKab1r/CodeLens",
      },
    ],
  },
  {
    id: "games",
    label: "Games",
    icon: "◆",
    color: "#F472B6",
    skills: ["Pygame", "Particle Systems", "Procedural Gen", "Game Physics", "Python"],
    projects: [
      {
        name: "Snake Neon",
        desc: "Modern neon-themed Snake in Pygame with a shop system, unlockable skins, special food types, smooth particle effects, and multiple difficulty modes.",
        tech: ["Python", "Pygame", "Particle Systems"],
        github: "https://github.com/NabeelAhmedKab1r/snake-neon",
      },
      {
        name: "City Survival",
        desc: "Pygame survival game with a modular engine — custom world generation, player systems, and UI.",
        tech: ["Python", "Pygame", "Procedural Gen"],
        github: "https://github.com/NabeelAhmedKab1r/city-survival",
      },
    ],
  },
];

const LINKS = [
  { label: "GitHub",   href: "https://github.com/NabeelAhmedKab1r" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nabeelahmedkabir/" },
  { label: "Email",    href: "mailto:nabeelahmedkabir@gmail.com" },
];

// ── UPDATE these with your actual details ─────────────────────────────────────
const EDUCATION = [
  {
    degree: "Bachelor of Engineering",
    institution: "York University",
    period: "2022 – Present",
    details: [
      "Third year — Computer Engineering",
      "Relevant coursework: Digital Systems, Computer Architecture, Machine Learning, Data Structures",
    ],
  },
];

const EXPERIENCE: { role: string; company: string; period: string; bullets: string[] }[] = [];

const CURRENTLY_BUILDING = {
  name: "ai-debugger",
  desc: "AI-powered static analysis and debugging toolchain",
  lang: "Python",
  langColor: "#3572A5",
  href: "https://github.com/NabeelAhmedKab1r",
};

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "0 32px",
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(6, 10, 16, 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
      }}
    >
      <span style={{ fontWeight: 800, fontSize: 14, color: "#6B7280", letterSpacing: "0.06em" }}>NA</span>
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {(["Work", "Education", "Contact"] as const).map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            style={{ fontSize: 12, color: "#374151", textDecoration: "none", letterSpacing: "0.07em", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#374151")}
          >
            {label}
          </a>
        ))}
        <a
          href="/resume.pdf"
          download
          style={{
            fontSize: 11,
            color: "#6B7280",
            textDecoration: "none",
            padding: "5px 13px",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            letterSpacing: "0.06em",
            transition: "border-color 0.2s, color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(255,255,255,0.18)";
            el.style.background = "rgba(255,255,255,0.07)";
            el.style.color = "#E5E7EB";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "rgba(255,255,255,0.08)";
            el.style.background = "rgba(255,255,255,0.03)";
            el.style.color = "#6B7280";
          }}
        >
          Resume ↓
        </a>
      </div>
    </motion.nav>
  );
}

// ─── Detail panel ─────────────────────────────────────────────────────────────
function DetailPanel({
  domain, onClose, onSkillClick, activeSkill, isMobile,
}: {
  domain: Domain;
  onClose: () => void;
  onSkillClick: (skill: string) => void;
  activeSkill: string | null;
  isMobile: boolean;
}) {
  const panelStyle: React.CSSProperties = isMobile
    ? { position: "fixed", bottom: 0, left: 0, right: 0, top: "auto", width: "100%", maxHeight: "72vh", background: "rgba(11,18,32,0.97)", backdropFilter: "blur(20px)", border: `1px solid ${domain.color}25`, borderRadius: "20px 20px 0 0", padding: "16px 20px 36px", overflowY: "auto", zIndex: 50, display: "flex", flexDirection: "column", gap: 20 }
    : { position: "fixed", top: 20, right: 20, bottom: 20, width: 340, background: "rgba(11,18,32,0.92)", backdropFilter: "blur(20px)", border: `1px solid ${domain.color}25`, borderRadius: 18, padding: "26px 22px", overflowY: "auto", zIndex: 50, display: "flex", flexDirection: "column", gap: 22 };

  return (
    <motion.div
      key={domain.id}
      initial={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, x: 24 }}
      animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
      exit={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, x: 24 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={panelStyle}
    >
      {isMobile && <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", margin: "0 auto 4px" }} />}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, color: domain.color }}>{domain.icon}</span>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#F9FAFB" }}>{domain.label}</span>
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", color: "#6B7280", fontSize: 18, cursor: "pointer", padding: 4, lineHeight: 1 }}
        >
          ✕
        </button>
      </div>

      <div>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#4B5563", marginBottom: 10 }}>
          SKILLS — click to filter
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {domain.skills.map((s) => (
            <span
              key={s}
              onClick={() => onSkillClick(s)}
              style={{
                fontSize: 12, padding: "4px 10px", borderRadius: 20,
                background: activeSkill === s ? `${domain.color}28` : `${domain.color}12`,
                color: domain.color,
                border: `1px solid ${activeSkill === s ? domain.color + "55" : domain.color + "28"}`,
                cursor: "pointer",
                transition: "background 0.15s, border-color 0.15s",
                boxShadow: activeSkill === s ? `0 0 8px ${domain.color}25` : "none",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#4B5563", marginBottom: 10 }}>PROJECTS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {domain.projects.map((p) => (
            <div
              key={p.name}
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                padding: "14px 15px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#E5E7EB" }}>{p.name}</div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0, marginLeft: 8 }}>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 11, color: "#6B7280", opacity: 0.8, textDecoration: "none" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.8")}
                    >↗ repo</a>
                  )}
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 11, color: domain.color, opacity: 0.7, textDecoration: "none" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
                    >↗ demo</a>
                  )}
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.65, marginBottom: p.tech ? 10 : 0 }}>
                {p.desc}
              </div>
              {p.tech && p.tech.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 10, padding: "2px 7px", borderRadius: 4,
                        background: "rgba(255,255,255,0.04)",
                        color: "#4B5563",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Domain card ──────────────────────────────────────────────────────────────
function DomainCard({
  domain, index, onClick, dimmed, highlighted, cardRef,
}: {
  domain: Domain;
  index: number;
  onClick: () => void;
  dimmed: boolean;
  highlighted: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: dimmed ? 0.3 : 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: highlighted
          ? `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, ${domain.color}10 100%)`
          : hovered
          ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, ${domain.color}08 100%)`
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${highlighted ? domain.color + "55" : hovered ? domain.color + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16,
        padding: "22px 22px",
        cursor: "pointer",
        transition: "background 0.25s, border-color 0.25s, transform 0.2s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <div style={{
        position: "absolute",
        top: -40, right: -40,
        width: 120, height: 120,
        borderRadius: "50%",
        background: `${domain.color}${highlighted ? "14" : hovered ? "10" : "06"}`,
        filter: "blur(30px)",
        transition: "background 0.3s",
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <span style={{ fontSize: 26, color: domain.color, lineHeight: 1 }}>{domain.icon}</span>
        <span style={{ fontSize: 16, color: hovered ? "#6B7280" : "#374151", transition: "color 0.2s", lineHeight: 1 }}>↗</span>
      </div>

      <div>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#F1F5F9", marginBottom: 6 }}>{domain.label}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {domain.skills.slice(0, 3).map((s) => (
            <span key={s} style={{
              fontSize: 11, padding: "3px 8px", borderRadius: 6,
              background: "rgba(255,255,255,0.04)", color: "#6B7280",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              {s}
            </span>
          ))}
          {domain.skills.length > 3 && (
            <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, color: "#4B5563" }}>
              +{domain.skills.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Education section ────────────────────────────────────────────────────────
function EducationSection() {
  const hasContent = EDUCATION.length > 0 || EXPERIENCE.length > 0;

  return (
    <section
      id="education"
      style={{
        padding: "80px 0",
        maxWidth: 900,
        margin: "0 auto",
        width: "min(900px, calc(100vw - 48px))",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#374151", marginBottom: 32 }}>
          EDUCATION & EXPERIENCE
        </div>

        {!hasContent && (
          <div style={{ fontSize: 12, color: "#374151" }}>
            Add your details to the EDUCATION / EXPERIENCE arrays in page.tsx.
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {EDUCATION.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "24px 28px",
                display: "flex",
                gap: 22,
              }}
            >
              <div style={{
                width: 3, flexShrink: 0,
                background: "linear-gradient(180deg, #818CF8, #38BDF8)",
                borderRadius: 2,
              }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#E5E7EB", marginBottom: 4 }}>{e.degree}</div>
                <div style={{ fontSize: 12, color: "#4B5563", marginBottom: 12 }}>
                  {e.institution} · {e.period}
                </div>
                {e.details.map((d, j) => (
                  <div key={j} style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.7, marginBottom: 2 }}>
                    · {d}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {EXPERIENCE.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (EDUCATION.length + i) * 0.08, duration: 0.4 }}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "24px 28px",
                display: "flex",
                gap: 22,
              }}
            >
              <div style={{
                width: 3, flexShrink: 0,
                background: "linear-gradient(180deg, #34D399, #38BDF8)",
                borderRadius: 2,
              }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#E5E7EB", marginBottom: 4 }}>{e.role}</div>
                <div style={{ fontSize: 12, color: "#4B5563", marginBottom: 12 }}>
                  {e.company} · {e.period}
                </div>
                {e.bullets.map((b, j) => (
                  <div key={j} style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.7, marginBottom: 2 }}>
                    · {b}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Contact section ──────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:nabeelahmedkabir@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 13,
    color: "#E5E7EB",
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        padding: "80px 0 140px",
        maxWidth: 900,
        margin: "0 auto",
        width: "min(900px, calc(100vw - 48px))",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#374151", marginBottom: 32 }}>CONTACT</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          {/* Left */}
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#F9FAFB", lineHeight: 1.25, marginBottom: 16 }}>
              Let&apos;s work<br />together.
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.8, marginBottom: 28 }}>
              Open to internships, collaborations, and interesting problems at the intersection of hardware and software.
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 2 }} />
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 12, color: "#4B5563", textDecoration: "none",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    transition: "color 0.2s", maxWidth: 220,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4B5563")}
                >
                  {l.label}
                  <span style={{ fontSize: 10, opacity: 0.4 }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              style={inputBase}
              onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)")}
              onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              style={inputBase}
              onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)")}
              onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <textarea
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              rows={5}
              style={{ ...inputBase, resize: "none" }}
              onFocus={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)")}
              onBlur={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button
              type="submit"
              style={{
                padding: "11px 20px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                color: sent ? "#34D399" : "#9CA3AF",
                fontSize: 13,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { if (!sent) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.09)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
            >
              {sent ? "✓ Opened in mail client" : "Send Message →"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const activeDomain = DOMAINS.find((d) => d.id === selected) ?? null;
  const panelOpen = !!activeDomain;

  const title = useTypewriter("SYSTEMS ENGINEER");
  const isMobile = useIsMobile();

  // Graph edge refs
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [edges, setEdges] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  useEffect(() => {
    const compute = () => {
      if (!heroRef.current || !gridRef.current) return;
      const gridRect = gridRef.current.getBoundingClientRect();
      const heroRect = heroRef.current.getBoundingClientRect();
      const result = cardRefs.current
        .map((ref) => {
          if (!ref) return null;
          const r = ref.getBoundingClientRect();
          return {
            x1: heroRect.right - gridRect.left,
            y1: heroRect.top + heroRect.height / 2 - gridRect.top,
            x2: r.left - gridRect.left,
            y2: r.top + r.height / 2 - gridRect.top,
          };
        })
        .filter(Boolean) as { x1: number; y1: number; x2: number; y2: number }[];
      setEdges(result);
    };

    // Delay slightly so Framer Motion entrance animations settle
    const t = setTimeout(compute, 700);
    window.addEventListener("resize", compute);
    return () => { clearTimeout(t); window.removeEventListener("resize", compute); };
  }, []);

  // ESC closes everything
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSelected(null); setActiveSkill(null); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSkillClick = (skill: string) =>
    setActiveSkill((prev) => (prev === skill ? null : skill));

  const handleCardClick = (id: string) => {
    setSelected((prev) => (prev === id ? null : id));
    setActiveSkill(null);
  };

  return (
    <>
      <Nav />

      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          overflowX: "hidden",
          background: "radial-gradient(ellipse at 40% 50%, #0D1829 0%, #060A10 100%)",
          position: "relative",
        }}
      >
        <ParticleBackground />

        {/* ── Hero / Work section ──────────────────────────────────────── */}
        <section
          id="work"
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Active skill filter badge */}
          <AnimatePresence>
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{
                  position: "absolute", top: 72, left: "50%", transform: "translateX(-50%)",
                  background: "rgba(11,18,32,0.92)", backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
                  padding: "5px 14px", fontSize: 12, color: "#9CA3AF",
                  display: "flex", alignItems: "center", gap: 8,
                  zIndex: 10, whiteSpace: "nowrap",
                }}
              >
                Filtering: <span style={{ color: "#E5E7EB" }}>{activeSkill}</span>
                <button
                  onClick={() => setActiveSkill(null)}
                  style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", fontSize: 16, padding: 0, lineHeight: 1 }}
                >
                  ×
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            ref={gridRef}
            animate={{ x: isMobile ? 0 : panelOpen ? -185 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            initial={false}
            style={{
              position: "relative",
              zIndex: 1,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
              gridTemplateRows: isMobile ? "auto auto auto" : "1fr 1fr",
              gap: 14,
              width: "min(900px, calc(100vw - 24px))",
              height: isMobile ? "auto" : "min(520px, calc(100vh - 96px))",
              padding: isMobile ? "80px 0 24px" : undefined,
            }}
          >
            {/* SVG graph edges */}
            <svg
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                pointerEvents: "none", zIndex: 0, overflow: "visible",
              }}
            >
              <defs>
                <marker id="edgeDot" markerWidth="4" markerHeight="4" refX="2" refY="2">
                  <circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.15)" />
                </marker>
              </defs>
              {edges.map((e, i) => {
                const domain = DOMAINS[i];
                const isHighlighted = activeSkill ? domain?.skills.includes(activeSkill) : false;
                const mx = (e.x1 + e.x2) / 2;
                return (
                  <path
                    key={i}
                    d={`M ${e.x1} ${e.y1} C ${mx} ${e.y1}, ${mx} ${e.y2}, ${e.x2} ${e.y2}`}
                    stroke={
                      isHighlighted && domain
                        ? domain.color + "55"
                        : "rgba(255,255,255,0.06)"
                    }
                    strokeWidth={isHighlighted ? 1.5 : 0.8}
                    fill="none"
                    strokeDasharray={isHighlighted ? undefined : "3 5"}
                    className={isHighlighted ? "edge-flow" : undefined}
                    markerEnd="url(#edgeDot)"
                  />
                );
              })}
            </svg>

            {/* Hero card */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{
                gridColumn: isMobile ? "1 / -1" : "1",
                gridRow: isMobile ? "1" : "1 / 3",
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 20,
                padding: "26px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                zIndex: 1,
              }}
            >
              {/* Ambient glow */}
              <div style={{
                position: "absolute", bottom: -60, left: -60,
                width: 200, height: 200, borderRadius: "50%",
                background: "rgba(60, 100, 200, 0.08)",
                filter: "blur(50px)", pointerEvents: "none",
              }} />

              <div>
                {/* Avatar + status */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <Avatar />
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "4px 10px", borderRadius: 20,
                    background: "rgba(52, 211, 153, 0.08)",
                    border: "1px solid rgba(52, 211, 153, 0.2)",
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 6px #34D399" }} />
                    <span style={{ fontSize: 11, color: "#34D399", letterSpacing: "0.04em" }}>Available</span>
                  </div>
                </div>

                <div style={{ fontWeight: 800, fontSize: 26, color: "#F9FAFB", lineHeight: 1.15, marginBottom: 5 }}>
                  Nabeel<br />Ahmed
                </div>
                <div style={{ fontSize: 11, letterSpacing: "0.1em", color: "#4B5563", marginBottom: 14, height: 16 }}>
                  {title}
                  <span className="cursor-blink" style={{ opacity: 0.35 }}>|</span>
                </div>

                <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.75, margin: "0 0 14px" }}>
                  I build at the boundaries — where hardware meets software, data meets inference, and security meets usability.
                </p>

                {/* Currently building card */}
                <a
                  href={CURRENTLY_BUILDING.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 10,
                      padding: "10px 12px",
                      transition: "border-color 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)")}
                  >
                    <div style={{ fontSize: 9, letterSpacing: "0.12em", color: "#374151", marginBottom: 5 }}>
                      CURRENTLY BUILDING
                    </div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", fontWeight: 600, marginBottom: 3 }}>
                      📦 {CURRENTLY_BUILDING.name}
                    </div>
                    <div style={{ fontSize: 11, color: "#4B5563", lineHeight: 1.5, marginBottom: 7 }}>
                      {CURRENTLY_BUILDING.desc}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: CURRENTLY_BUILDING.langColor }} />
                      <span style={{ fontSize: 10, color: "#374151" }}>{CURRENTLY_BUILDING.lang}</span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Links + resume */}
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 2 }} />
                {LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 12, color: "#4B5563", textDecoration: "none",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4B5563")}
                  >
                    {l.label}
                    <span style={{ fontSize: 10, opacity: 0.4 }}>↗</span>
                  </a>
                ))}
                <a
                  href="/resume.pdf"
                  download
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    color: "#6B7280",
                    textDecoration: "none",
                    padding: "7px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)",
                    textAlign: "center",
                    transition: "border-color 0.2s, color 0.2s, background 0.2s",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.18)";
                    el.style.background = "rgba(255,255,255,0.06)";
                    el.style.color = "#E5E7EB";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.08)";
                    el.style.background = "rgba(255,255,255,0.03)";
                    el.style.color = "#6B7280";
                  }}
                >
                  Download Resume ↓
                </a>
              </div>
            </motion.div>

            {/* Domain cards */}
            {DOMAINS.map((d, i) => {
              const matches = activeSkill ? d.skills.includes(activeSkill) : false;
              return (
                <DomainCard
                  key={d.id}
                  domain={d}
                  index={i}
                  onClick={() => handleCardClick(d.id)}
                  dimmed={activeSkill !== null && !matches}
                  highlighted={matches}
                  cardRef={(el) => { cardRefs.current[i] = el; }}
                />
              );
            })}
          </motion.div>

          <AnimatePresence>
            {activeDomain && (
              <DetailPanel
                domain={activeDomain}
                onClose={() => { setSelected(null); setActiveSkill(null); }}
                onSkillClick={handleSkillClick}
                activeSkill={activeSkill}
                isMobile={isMobile}
              />
            )}
          </AnimatePresence>
        </section>

        {/* ── Education ──────────────────────────────────────────────────── */}
        <EducationSection />

        {/* ── Contact ────────────────────────────────────────────────────── */}
        <ContactSection />
      </div>

      <style>{`
        .cursor-blink { animation: blink 1.1s step-end infinite; }
        @keyframes blink { 0%, 100% { opacity: 0.35; } 50% { opacity: 0; } }
        .edge-flow { animation: dashMove 1.2s linear infinite; }
        @keyframes dashMove { to { stroke-dashoffset: -20; } }
        html { scroll-behavior: smooth; }
        input::placeholder, textarea::placeholder { color: #374151; }
      `}</style>
    </>
  );
}
