"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./components/ParticleBackground";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Domain = {
  id: string;
  label: string;
  icon: string;
  color: string;
  skills: string[];
  projects: { name: string; desc: string; link?: string }[];
};

const DOMAINS: Domain[] = [
  {
    id: "ai",
    label: "AI Systems",
    icon: "⬡",
    color: "#818CF8",
    skills: ["Neural Networks", "Genetic Algorithms", "Static Analysis", "FastAPI", "Tree-Sitter"],
    projects: [
      { name: "EvoCars", desc: "Agents evolve to race autonomously via neural networks and genetic algorithms — fitness-based selection, mutation, and crossover over generations." },
      { name: "AI Debugger", desc: "Prototype AI-powered debugging tool using Tree-Sitter for static code parsing, issue detection, and report generation. FastAPI backend." },
    ],
  },
  {
    id: "hardware",
    label: "Hardware",
    icon: "⬢",
    color: "#34D399",
    skills: ["Verilog", "FPGA", "VGA", "RTL", "DE10-Lite"],
    projects: [
      { name: "FPGA VGA Snake", desc: "Snake game implemented in Verilog on a DE10-Lite FPGA with VGA output at 640×480. Combinational and sequential logic for game state, rendering, and collision detection.", link: "https://youtu.be/ExPmekK-cnw" },
    ],
  },
  {
    id: "web",
    label: "Web & Tools",
    icon: "◎",
    color: "#38BDF8",
    skills: ["JavaScript", "Leaflet", "SQLite", "Python", "CustomTkinter"],
    projects: [
      { name: "ISS Tracker", desc: "Real-time web app tracking the ISS using live satellite data — interactive world map, NASA night lights overlay, orbit trail, and 5-second position updates." },
      { name: "Study Planner", desc: "Desktop assignment tracker built with CustomTkinter and SQLite. Deadline highlighting, overdue alerts, search, and light/dark theme." },
      { name: "CodeLens", desc: "Python-based code analysis tool that generates control-flow graphs (CFGs) for static inspection and visualization of program structure." },
    ],
  },
  {
    id: "games",
    label: "Games",
    icon: "◆",
    color: "#F472B6",
    skills: ["Pygame", "Particle Systems", "Procedural Gen", "Game Physics", "Python"],
    projects: [
      { name: "Snake Neon", desc: "Modern neon-themed Snake in Pygame with a shop system, unlockable skins, special food types, smooth particle effects, and multiple difficulty modes." },
      { name: "City Survival", desc: "Pygame survival game with a modular engine — custom world generation, player systems, and UI." },
    ],
  },
];

const LINKS = [
  { label: "GitHub",   href: "https://github.com/NabeelAhmedKab1r" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nabeelahmedkabir/" },
  { label: "Email",    href: "mailto:nabeelahmedkabir@gmail.com" },
];

// ─── Detail panel ─────────────────────────────────────────────────────────────

function DetailPanel({ domain, onClose }: { domain: Domain; onClose: () => void }) {
  return (
    <motion.div
      key={domain.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{    opacity: 0, x: 24 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{
        position: "fixed",
        top: 20, right: 20, bottom: 20,
        width: 340,
        background: "rgba(11, 18, 32, 0.92)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${domain.color}25`,
        borderRadius: 18,
        padding: "26px 22px",
        overflowY: "auto",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, color: domain.color }}>{domain.icon}</span>
          <span style={{ fontWeight: 700, fontSize: 17, color: "#F9FAFB" }}>{domain.label}</span>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#6B7280", fontSize: 18, cursor: "pointer", padding: 4, lineHeight: 1 }}>✕</button>
      </div>

      <div>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#4B5563", marginBottom: 10 }}>SKILLS</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {domain.skills.map((s) => (
            <span key={s} style={{ fontSize: 12, padding: "4px 10px", borderRadius: 20, background: `${domain.color}12`, color: domain.color, border: `1px solid ${domain.color}28` }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 10, letterSpacing: "0.12em", color: "#4B5563", marginBottom: 10 }}>PROJECTS</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {domain.projects.map((p) => (
            <div key={p.name} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "13px 15px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#E5E7EB" }}>{p.name}</div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: domain.color, opacity: 0.7, textDecoration: "none", flexShrink: 0, marginLeft: 8 }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}>
                    ↗ demo
                  </a>
                )}
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Domain card ──────────────────────────────────────────────────────────────

function DomainCard({ domain, index, onClick }: { domain: Domain; index: number; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.5, ease: "easeOut" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, ${domain.color}08 100%)`
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? domain.color + "40" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16,
        padding: "22px 22px",
        cursor: "pointer",
        transition: "background 0.25s, border 0.25s, transform 0.2s",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        overflow: "hidden",
      }}
    >
      {/* Subtle glow in corner */}
      <div style={{
        position: "absolute",
        top: -40, right: -40,
        width: 120, height: 120,
        borderRadius: "50%",
        background: `${domain.color}${hovered ? "10" : "06"}`,
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
            <span key={s} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "rgba(255,255,255,0.04)", color: "#6B7280", border: "1px solid rgba(255,255,255,0.06)" }}>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [selected, setSelected] = useState<string | null>(null);
  const activeDomain = DOMAINS.find((d) => d.id === selected) ?? null;
  const panelOpen = !!activeDomain;

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 40% 50%, #0D1829 0%, #060A10 100%)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ParticleBackground />

      <motion.div
        animate={{ x: panelOpen ? -185 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        initial={false}
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: 14,
          width: "min(900px, calc(100vw - 48px))",
          height: "min(520px, calc(100vh - 48px))",
        }}
      >
        {/* Hero card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            gridColumn: "1",
            gridRow: "1 / 3",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20,
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ambient glow */}
          <div style={{
            position: "absolute",
            bottom: -60, left: -60,
            width: 200, height: 200,
            borderRadius: "50%",
            background: "rgba(60, 100, 200, 0.08)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }} />

          <div>
            {/* Status pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, padding: "4px 10px", borderRadius: 20, background: "rgba(52, 211, 153, 0.08)", border: "1px solid rgba(52, 211, 153, 0.2)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34D399", boxShadow: "0 0 6px #34D399" }} />
              <span style={{ fontSize: 11, color: "#34D399", letterSpacing: "0.04em" }}>Available</span>
            </div>

            <div style={{ fontWeight: 800, fontSize: 28, color: "#F9FAFB", lineHeight: 1.15, marginBottom: 8 }}>
              Nabeel<br />Ahmed
            </div>
            <div style={{ fontSize: 11, letterSpacing: "0.1em", color: "#4B5563", marginBottom: 18 }}>
              SYSTEMS ENGINEER
            </div>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.75, margin: "0 0 16px" }}>
              I build at the boundaries — where hardware meets software, data meets inference, and security meets usability.
            </p>
            <div style={{ fontSize: 12, color: "#374151", borderLeft: "2px solid #1F2A3C", paddingLeft: 10, lineHeight: 1.6 }}>
              Currently building AI infrastructure tools.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 4 }} />
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, color: "#4B5563", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#9CA3AF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4B5563")}
              >
                {l.label}
                <span style={{ fontSize: 10, opacity: 0.5 }}>↗</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Domain cards */}
        {DOMAINS.map((d, i) => (
          <DomainCard
            key={d.id}
            domain={d}
            index={i}
            onClick={() => setSelected(selected === d.id ? null : d.id)}
          />
        ))}
      </motion.div>

      <AnimatePresence>
        {activeDomain && (
          <DetailPanel domain={activeDomain} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
