# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at http://localhost:3000
npm run build    # Production build
npx eslint app   # Lint (plain `npm run lint` also scans .next build output)
```

No test suite is configured.

## Architecture

Single-page Next.js 16 portfolio site using the App Router.

- **`app/components/ChipHero.tsx`** — the scroll-driven hero. An SVG circuit board with a chip (`NAK-01`) in a 320vh section with a sticky 100vh stage. Scrolling zooms into the chip, fades the lid to reveal the silicon die, and the die grows until it covers the viewport and becomes the page background; the hero content (`children`) then fades in. Scroll progress is read in a `requestAnimationFrame` loop and applied directly to DOM styles via refs (no React re-renders). It also exports the shared palette (`BG`, `ACCENT`, `INK`, `MUTED`, `MONO`). `prefers-reduced-motion` skips the zoom.
- **`app/page.tsx`** — everything else (`"use client"`): the data constants, the nav, the hero content passed into `ChipHero`, and the sections Projects (`#projects`), Experience (`#experience`, covering work, hackathons and education), About (`#about`, including skills) and Contact (`#contact`). Smooth scrolling uses Lenis; nav links scroll with `lenis.scrollTo`.
- **`app/layout.tsx`** — metadata and fonts: Geist (body), Geist Mono (labels, `--font-geist-mono`), Barlow Condensed (display headings, `--font-display`).
- **`app/icon.svg`** — the browser tab icon (a small chip).

### Styling approach

Component styles are **inline `style` props**. Hover states and keyframe animations live in the `<style>` block at the bottom of `page.tsx` as plain CSS classes (`.btn`, `.ulink`, `.row`, `.nav-link`, `.pulse`). Scroll-in animations use **Framer Motion** (`whileInView`). Tailwind is only imported in `globals.css`.

### Layout

- `useIsMobile` (≤768px) switches padding (`PAD`), font sizes and grid columns inline.
- The nav is hidden during the zoom and appears once hero progress passes 0.9 (`onHeroProgress`).
- The hero die colour and the page background are both `BG`, so the hand-off from the hero to the content is seamless. Change them together.

### Key constants to update

In `app/page.tsx`: `PROJECTS`, `WORK_EXPERIENCE`, `HACKATHONS`, `EDUCATION`, `SKILLS`, `LINKS`. The first project row is open by default.

### Static assets

- `public/resume.pdf` — downloaded from the hero "Resume" button.
- `public/photo.jpg` — the About section photo.
