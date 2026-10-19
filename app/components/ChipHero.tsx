"use client";

import { useEffect, useRef } from "react";

// ─── Palette (shared with page.tsx) ───────────────────────────────────────────
export const BG     = "#F7F3EC"; // page + silicon die
export const BOARD  = "#EEE8DD"; // PCB surface
export const TRACE  = "#D9D2C5";
export const ACCENT = "#C8522A";
export const INK    = "#0F0E0D";
export const MUTED  = "#7A756D";
export const MONO   = "var(--font-geist-mono)";

// ─── Chip geometry (SVG units, chip centered at 0,0) ──────────────────────────
const PKG      = 110;  // package half-size
const PIN_LEN  = 18;
const PINS     = 14;
const PITCH    = 13;
const DIE      = 60;   // die half-size — this is what fills the screen
const VIEW     = 1000; // viewBox half-size

const pinOffsets = Array.from({ length: PINS }, (_, i) => (i - (PINS - 1) / 2) * PITCH);
const PULSES: Record<number, number[]> = { 0: [3, 9], 1: [5, 12], 2: [1, 10], 3: [7] };

// Fan-out trace for a pin on the right side; other sides reuse it via rotation.
function tracePath(o: number, i: number, side: number) {
  const x0 = PKG + PIN_LEN;
  const x1 = 150;
  const y2 = o * 2.4;
  const xd = x1 + Math.abs(y2 - o);
  const xEnd = 480 + (((i + side * 3) * 7) % 5) * 95;
  return { d: `M ${x0} ${o} L ${x1} ${o} L ${xd} ${y2} L ${xEnd} ${y2}`, end: [xEnd, y2] as const };
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function Board() {
  const sides = [0, 1, 2, 3];
  const dieBlocks = [
    { x: -54, y: -54, w: 34, h: 22, label: "SRAM 0" },
    { x: 20,  y: -54, w: 34, h: 22, label: "SRAM 1" },
    { x: -54, y: 30,  w: 28, h: 24, label: "NPU" },
    { x: 28,  y: 34,  w: 26, h: 20, label: "I/O" },
    { x: -54, y: -26, w: 12, h: 50, label: "" },
    { x: 42,  y: -26, w: 12, h: 54, label: "" },
  ];

  return (
    <svg viewBox={`${-VIEW} ${-VIEW} ${VIEW * 2} ${VIEW * 2}`} width="100%" height="100%" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="lid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2A2825" />
          <stop offset="1" stopColor="#141312" />
        </linearGradient>
      </defs>

      {/* Silkscreen */}
      <g fill="#B5AEA1" style={{ fontFamily: MONO }} fontSize="9" letterSpacing="2">
        <text x={-PKG - 46} y={-PKG - 30}>U1</text>
        <text x={PKG + 46} y={PKG + 46} textAnchor="end">REV 3 · 2026</text>
        <text x={-PKG - 46} y={PKG + 46}>NAK-01</text>
      </g>
      <rect x={-PKG - 22} y={-PKG - 22} width={(PKG + 22) * 2} height={(PKG + 22) * 2} fill="none" stroke="#CFC8BB" strokeWidth="1" strokeDasharray="2 4" />

      {/* Traces + vias */}
      {sides.map((side) => (
        <g key={side} transform={`rotate(${side * 90})`}>
          {pinOffsets.map((o, i) => {
            const { d, end } = tracePath(o, i, side);
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={TRACE} strokeWidth="1.6" strokeLinejoin="round" />
                <circle cx={end[0]} cy={end[1]} r="4.5" fill={BOARD} stroke={TRACE} strokeWidth="1.6" />
              </g>
            );
          })}
          {(PULSES[side] ?? []).map((i, k) => (
            <path key={`p${i}`} d={tracePath(pinOffsets[i], i, side).d} pathLength={1000}
              className="pulse" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round"
              style={{ animationDelay: `${(side * 1.3 + k * 2.1) % 5}s`, animationDuration: `${3.2 + ((i + side) % 3) * 0.8}s` }}
            />
          ))}
          {/* Pins */}
          {pinOffsets.map((o, i) => (
            <rect key={`pin${i}`} x={PKG - 2} y={o - 3} width={PIN_LEN + 2} height={6} rx="1" fill="#CBC4B7" stroke="#A9A295" strokeWidth="0.6" />
          ))}
        </g>
      ))}

      {/* Decoupling caps */}
      {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy], i) => (
        <g key={i} transform={`translate(${sx * (PKG + 52)} ${sy * (PKG + 52)}) rotate(${i % 2 ? 90 : 0})`}>
          <rect x="-9" y="-4.5" width="18" height="9" rx="1" fill="#8E7A62" />
          <rect x="-9" y="-4.5" width="4.5" height="9" fill="#CBC4B7" />
          <rect x="4.5" y="-4.5" width="4.5" height="9" fill="#CBC4B7" />
        </g>
      ))}

      {/* Package substrate (under the lid) */}
      <rect x={-PKG} y={-PKG} width={PKG * 2} height={PKG * 2} rx="6" fill="#1D1C1A" />

      {/* Bond fingers + wires */}
      {sides.map((side) => (
        <g key={`b${side}`} transform={`rotate(${side * 90})`}>
          {Array.from({ length: 10 }, (_, i) => {
            const o = (i - 4.5) * 10;
            return (
              <g key={i}>
                <rect x={86} y={o * 1.45 - 2.5} width={10} height={5} fill="#B98A57" />
                <path d={`M ${DIE - 4} ${o} Q ${(DIE + 86) / 2} ${o * 1.2 - 4} 86 ${o * 1.45}`} fill="none" stroke="#C9A06A" strokeWidth="0.6" />
                <rect x={DIE - 6} y={o - 2} width={4} height={4} fill="#C9C1B3" />
              </g>
            );
          })}
        </g>
      ))}

      {/* Silicon die */}
      <rect x={-DIE} y={-DIE} width={DIE * 2} height={DIE * 2} fill={BG} />
      <g stroke="rgba(15,14,13,0.045)" strokeWidth="0.06">
        {Array.from({ length: 15 }, (_, i) => -DIE + (i + 1) * 7.5).map((v) => (
          <g key={v}>
            <line x1={v} y1={-DIE} x2={v} y2={DIE} />
            <line x1={-DIE} y1={v} x2={DIE} y2={v} />
          </g>
        ))}
      </g>
      {dieBlocks.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill="rgba(15,14,13,0.012)" stroke="rgba(15,14,13,0.07)" strokeWidth="0.1" />
          {b.label && (
            <text x={b.x + 1.2} y={b.y + 2.6} fontSize="1.5" letterSpacing="0.2" fill="rgba(15,14,13,0.2)" style={{ fontFamily: MONO }}>{b.label}</text>
          )}
        </g>
      ))}

      {/* Lid — fades away on zoom */}
      <g data-lid>
        <rect x={-PKG} y={-PKG} width={PKG * 2} height={PKG * 2} rx="6" fill="url(#lid)" />
        <rect x={-PKG + 4} y={-PKG + 4} width={PKG * 2 - 8} height={PKG * 2 - 8} rx="4" fill="none" stroke="rgba(255,255,255,0.05)" />
        <circle cx={-PKG + 20} cy={-PKG + 20} r="5" fill="#0C0B0A" stroke="rgba(255,255,255,0.06)" />
        <g fill="#8C867C" style={{ fontFamily: MONO }} textAnchor="middle">
          <text y="-34" fontSize="20" letterSpacing="5" fill="#B3ADA2">NAK-01</text>
          <text y="-14" fontSize="6.5" letterSpacing="1.6">NABEEL AHMED KABIR</text>
          <text y="-4" fontSize="5" letterSpacing="1.4" fill="#6D685F">COMPUTER ENG · YORK U</text>
        </g>
        <g data-hint style={{ fontFamily: MONO }} textAnchor="middle">
          <text y="46" fontSize="7" letterSpacing="4" fill="#CFC9BE">SCROLL</text>
          <path className="hint-chev" d="M -5 56 L 0 61 L 5 56" fill="none" stroke="#CFC9BE" strokeWidth="1.2" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}

export default function ChipHero({ children, onProgress }: { children: React.ReactNode; onProgress?: (t: number) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressCb = useRef(onProgress);
  useEffect(() => { progressCb.current = onProgress; }, [onProgress]);

  useEffect(() => {
    const section = sectionRef.current;
    const stage   = stageRef.current;
    const overlay = overlayRef.current;
    if (!section || !stage || !overlay) return;
    const lid  = stage.querySelector<SVGGElement>("[data-lid]");
    const hint = stage.querySelector<SVGGElement>("[data-hint]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = -1;
    let vw = 0, vh = 0, size = 0, maxScale = 1;

    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      // Chip package spans ~34% of the short edge at rest.
      const unit0 = (Math.min(vw, vh) * (vw < 768 ? 0.5 : 0.36)) / (PKG * 2);
      size = VIEW * 2 * unit0;
      stage.style.width = stage.style.height = `${size}px`;
      stage.style.marginLeft = stage.style.marginTop = `${-size / 2}px`;
      // Final: die covers the viewport.
      maxScale = (Math.max(vw, vh) / (DIE * 2) * 1.04) / unit0;
      last = -1;
    };

    const tick = () => {
      const rect = section.getBoundingClientRect();
      const span = rect.height - vh;
      const t = reduced ? 1 : Math.min(1, Math.max(0, -rect.top / (span || 1)));
      if (t !== last) {
        last = t;
        const z = easeInOut(Math.min(1, t / 0.86));
        stage.style.transform = `scale(${Math.pow(maxScale, z)})`;
        if (lid)  lid.style.opacity  = String(1 - smooth(0.32, 0.68, z));
        if (hint) hint.style.opacity = String(1 - smooth(0, 0.06, t));
        const o = smooth(0.8, 0.96, t);
        overlay.style.opacity = String(o);
        overlay.style.transform = `translateY(${(1 - o) * 24}px)`;
        overlay.style.pointerEvents = o > 0.5 ? "auto" : "none";
        progressCb.current?.(t);
      }
      raf = requestAnimationFrame(tick);
    };

    measure();
    window.addEventListener("resize", measure);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", measure); };
  }, []);

  return (
    <section id="top" ref={sectionRef} className="chip-hero" style={{ position: "relative", height: "320vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: BOARD }}>
        <div ref={stageRef} style={{ position: "absolute", left: "50%", top: "50%", transformOrigin: "50% 50%" }}>
          <Board />
        </div>
        <div ref={overlayRef} style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none" }}>
          {children}
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 120, background: `linear-gradient(rgba(247,243,236,0), ${BG})`, pointerEvents: "none" }} />
        </div>
      </div>
    </section>
  );
}
