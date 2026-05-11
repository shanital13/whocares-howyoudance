## Fix background blobs + restore contact headline gradient

### Problem
- `PageBlobs` uses `fixed inset-0` with blobs placed at `top-[120%]`, `top-[200%]` etc. Fixed positioning is relative to the viewport, so those off-screen blobs never render — only the first 2 hero blobs are visible, making the rest of the page look like a flat cream canvas.
- Opacities (20–35%) are too soft to read as "ink clouds bleeding into cream".
- Contact section headline is solid `text-foreground` (black) instead of the HOODIE smear gradient used by the hero.

### Changes

**1. `src/components/decor/PageBlobs.tsx` — rebuild as a full-page absolute layer**
- Replace `fixed inset-0` with `absolute inset-0 h-full w-full` so the layer stretches the entire scroll height, not just the viewport.
- Add ~12 large, irregularly placed blobs distributed across hero → about → services → testimonials → contact regions, using top values within `0%–100%` of the layer (not viewport).
- Bump opacity range to **35–55%** (`bg-hoodie-magenta/45`, `bg-hoodie-coral/50`, `bg-hoodie-orange/40`, `bg-hoodie-yellow/45`, `bg-hoodie-teal/35`).
- Keep heavy `blur-[120px]` to `blur-[160px]` for the soft-focus ink-cloud look.
- Vary sizes (480px–760px), use negative offsets so blobs bleed off both edges, and overlap section boundaries (e.g. one straddling about↔services, one straddling services↔testimonials).
- Add a couple of mix-blend or subtle off-axis ovals (`rounded-[60%_40%_50%_50%]`) for the organic watercolor feel.

**2. `src/pages/Index.tsx` — host the layer correctly**
- The `<main>` already has `overflow-hidden` and `relative`. Confirm `PageBlobs` is the first child inside `<main>` so the absolute layer covers the full document height of the page.
- No structural change beyond ensuring positioning works (PageBlobs becomes absolute, parent stays relative).

**3. `src/components/landing/ContactSection.tsx` — restore gradient headline**
- Replace the headline class:
  - From: `className="text-3xl md:text-5xl text-foreground font-display leading-[1.15]"`
  - To: `className="text-3xl md:text-5xl text-hoodie-gradient font-display leading-[1.15]"`
- `text-hoodie-gradient` already exists in `index.css` and is the same multi-color HOODIE smear used by the hero, so visual parity is automatic.

### Out of scope
- No copy changes, no layout changes to sections, no new tokens, no changes to ServicesSection / AboutSection / TestimonialsSection content. Blob colors use existing `hoodie-*` tokens.
