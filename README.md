# rdjverse — Portfolio

Personal portfolio built with React, Vite, Tailwind CSS v4, and GSAP. Dark-first editorial design with scroll-driven 3D scenes and interactive experiments.

## Sections

| #   | Section      | Answers                  |
| --- | ------------ | ------------------------ |
| 01  | Hero         | Who is this?             |
| 02  | Manifesto    | What does he believe?    |
| 03  | Selected Work| What has he actually built? |
| 04  | Capabilities | How does he approach problems? |
| 05  | Experience   | Has he done this professionally? |
| 06  | Contact      | Should I work with him?  |

Highlights:

- **Selected Work** — pinned 3D fly-through collage (ScrollTrigger + scrub): five project mockups plus an index main frame, single somersault flip revealing card backs, converge / re-scatter choreography, separate mobile scatter.
- **Capabilities** — draggable isometric play-wall of ten living micro-toys (orbit, wave, magnet, blob, marquee, tilt, pulse, grid, flip, spinner). Hover any toy for the skill it proves.
- Dark/light theme with `prefers-reduced-motion` fallbacks throughout.

## Scripts

```bash
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # oxlint
```

## Stack

React 19 · Vite 8 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger) · Framer Motion · TypeScript
