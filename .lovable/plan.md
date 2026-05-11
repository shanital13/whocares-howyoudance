## Design Reset: Mature Editorial Layout with HOODIE Palette

A full strip-and-rebuild of the landing page. Remove the playful tropical decor (coconuts, suns, sparkles, squiggles, wavy frames, marquee strip) and replace with a structured rectangular grid, bold color blocks, and amorphous background blobs.

### 1. Cleanup (remove childish elements)

Delete imports and usage of these decor components across all landing sections:
- `Coconut`, `SunArc`, `Sparkle`, `Squiggle`, `TropicalLeaf`, `WaveLines`, `WavyFrame`, `MarqueeStrip`
- Remove `<MarqueeStrip />` from `Index.tsx`
- Remove `.pebble-1/2/3`, `.bubble-btn`, `.paper-grain`, `.dot-pattern`, `.hand-underline` utilities from `index.css`
- Files in `src/components/decor/` can be left on disk (unused) or deleted in a later pass

### 2. New shared primitives (`src/components/decor/`)

- **`Blob.tsx`** — single amorphous SVG `<path>` (organic blob shape) with `fill` prop and `className` for size/position/opacity. Full-strength HOODIE color, no blur. Used as decorative depth behind sections.
- **`GalleryFrame.tsx`** — wrapper with `border-2 border-[color] rounded-none` and sharp right-angle corners. Optional small offset shadow block behind for editorial feel.

### 3. Design tokens (`src/index.css`)

- Keep HOODIE palette tokens and `.text-hoodie-gradient` (5-color smear).
- Add `.btn-rect` — large rectangular button, `rounded-md` (slight only), bold, high-contrast variants.
- Background stays cream/off-white (already in theme).

### 4. Section-by-section rebuild

**HeroSection**
- Cream background, two amorphous `Blob`s positioned top-right (magenta @ ~40% opacity) and bottom-left (teal @ ~30%).
- Centered headline `text-hoodie-gradient` (the 5-color smear) — keep gladiaCLM display font.
- Subtitle in muted body text, segoeUI.
- Large rectangular CTA: solid `hoodie-coral` bg, white text, `rounded-md`.
- No coconuts, no suns, no sparkles, no wave divider.

**AboutSection** (Serene structure: Video LEFT, Text RIGHT)
- 2-column grid (`md:grid-cols-2`), generous gap, lots of vertical padding.
- Left: video in `GalleryFrame` — 1px/2px solid `hoodie-magenta` border, sharp corners, no blob mask.
- Right: section eyebrow ("ABOUT ME" or Hebrew equivalent), gladiaCLM headline in foreground, body paragraphs in muted-foreground, rectangular "more" CTA.
- One subtle background `Blob` (yellow) far right behind text, low z.

**ServicesSection** (3-column solid color blocks)
- Centered section title with thin underline rule (no squiggle).
- 3 cards in `grid-cols-1 md:grid-cols-3`, equal height, sharp corners (`rounded-none` or `rounded-sm`).
- Each card a solid HOODIE color background:
  - Card 1: `bg-hoodie-coral`
  - Card 2: `bg-hoodie-teal`
  - Card 3: `bg-hoodie-magenta`
- Layout inside each card: top vertical image frame (aspect-[3/4], 2px white border, sharp corners), bold gladiaCLM title in white, description text in white/90.
- Remove pebble shapes, leaf/sun/palm decor, hover wobble.
- Subtle hover: `-translate-y-1` only.

**TestimonialsSection** (colored rectangular cards, centered grid)
- Section heading + thin rule.
- 3 rectangular cards `grid-cols-1 md:grid-cols-3`, each with a different solid HOODIE color background (orange, yellow, teal — lighter trio for readability), white text inside, sharp corners.
- Remove paper grain, sun arc, sparkles, squiggles.

**ContactSection** (structured form over solid color block)
- Full-width section with solid `bg-hoodie-magenta` block (or coral) as background.
- Centered container: gradient headline (`text-hoodie-gradient` on cream card, OR white text — see open question below).
- Simple structured form: Name, Email/Phone, Message, Submit. Inputs styled with sharp corners, white bg, 1px border. Submit is a rectangular `hoodie-yellow` button with magenta text.
- Keep WhatsApp link as a secondary text link beneath the form.
- Remove sun/coconut/sparkle decor.

**Footer**
- Slim, cream background, simple two-column layout (brand left, links right). No wavy edges.

### 5. Layout & typography rules applied globally

- All section padding: `py-24 md:py-32 px-6` for generous whitespace.
- All image/video containers: `rounded-none` or `rounded-sm`, 2px HOODIE-color borders.
- Buttons: `rounded-md` (slight), large `px-10 py-4`, bold uppercase optional.
- Headlines: `font-display` (gladiaCLM); body: `font-sans` (segoeUI).

### Technical notes

- No new dependencies.
- Files edited: `src/index.css`, `tailwind.config.ts` (only if removing `marquee` keyframe — optional), `HeroSection.tsx`, `AboutSection.tsx`, `ServicesSection.tsx`, `TestimonialsSection.tsx`, `ContactSection.tsx`, `Footer.tsx`, `Index.tsx`.
- Files created: `src/components/decor/Blob.tsx`, `src/components/decor/GalleryFrame.tsx`.
- Files deprecated (kept on disk, unreferenced): all current decor components and `MarqueeStrip`.

### Open question

For the contact section's solid color block background: do you want the headline to use the **5-color smear gradient** (which requires a light/cream inner card so the gradient is visible against magenta), or plain **white text** directly on the colored block? The brief says "final contact headline" should keep the gradient — I'll default to wrapping it in a cream card so the gradient stays readable, unless you say otherwise.
