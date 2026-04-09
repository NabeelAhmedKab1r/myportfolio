# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

Single-page Next.js 16 portfolio site using the App Router. The entire UI lives in two files:

- **`app/page.tsx`** — the full page (`"use client"`). Contains all data constants (`PROJECTS`, `LINKS`, `EDUCATION`), custom hooks (`useWordCycle`, `useIsMobile`), and sub-components (`Sidebar`, `ProjectCard`). Sections are: Hero (`#work`), Projects (`#projects`), About (`#about`), Education (`#education`), Contact (`#contact`).
- **`app/components/ParticleBackground.tsx`** — canvas-based animated particle network, rendered as a fixed full-screen layer (`z-index: 0`, `pointer-events: none`). Currently imported/defined but not rendered in `page.tsx`.
- **`app/layout.tsx`** — sets metadata, loads Geist fonts via `next/font/google`.

### Styling approach

All component styles use **inline `style` props** (not Tailwind classes), with Tailwind only used in `globals.css` for the base import. Hover states are handled via `onMouseEnter`/`onMouseLeave` with direct DOM style mutations (`e.currentTarget.style.*`). Animations use **Framer Motion** (`motion.div`, `whileInView`, `initial`/`animate`).

### Layout system

- Desktop: fixed 64px sidebar (`Sidebar` component) + content area offset by `marginLeft: 64`.
- Mobile (≤768px): fixed top bar replaces the sidebar; `useIsMobile` hook drives conditional rendering.
- Padding (`PAD`) and font sizes are computed from `isMobile` inline throughout the page.

### Static assets

`public/resume.pdf` — linked for direct download from the hero section.

### Key constants to update

To add/modify projects, edit the `PROJECTS` array in `app/page.tsx:60`. Domain color is per-project (`domainColor` hex). To update personal links, edit `LINKS` at `app/page.tsx:128`.
