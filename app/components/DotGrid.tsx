"use client";

import { useEffect, useRef } from "react";

const COLS = 18;
const ROWS = 22;
const GAP = 24;
const W = COLS * GAP;
const H = ROWS * GAP;

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = W;
    canvas.height = H;

    let mouseX = -9999;
    let mouseY = -9999;
    let rafId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.025;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = col * GAP + GAP / 2;
          const y = row * GAP + GAP / 2;

          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const ripple = Math.max(0, 1 - dist / 130);
          const wave = (Math.sin(t + col * 0.45 + row * 0.3) * 0.5 + 0.5);

          const intensity = ripple * 0.85 + wave * 0.15;
          const size = 1.2 + intensity * 2.8;
          const alpha = 0.1 + intensity * 0.75;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(129, 140, 248, ${alpha})`;
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (W / rect.width);
      mouseY = (e.clientY - rect.top) * (H / rect.height);
    };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", () => { mouseX = -9999; mouseY = -9999; });

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", maxWidth: W, height: "auto", display: "block", opacity: 0.85 }}
    />
  );
}
