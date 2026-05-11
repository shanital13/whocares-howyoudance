
# Tropical / Koh Phangan Redesign — Reference-Driven

Inspired by the two uploaded references:
- **Mayday** — clean cream background, paper-like, soft pastel sun/wave abstract blocks, hand-drawn squiggle accents, marquee strip between sections.
- **Spark & Marnee** — wavy "blob" frames around photos, asymmetric overlap, bold pill buttons, decorative star sparkles, layered text-over-image.

Goal: keep current copy and structure, layer in tropical illustration + wavy frames + depth. All decoration is inline SVG using the HOODIE palette tokens already in `index.css` — no external assets, no copy changes.

## 1. New decorative primitives (`src/components/decor/`)

- `WavyFrame.tsx` — wraps an image/video in a Spark-&-Marnee-style wavy blob outline (SVG path with offset duplicate behind, palette-tinted). Props: `color`, `offset`, `rotate`.
- `Coconut.tsx` — minimalist line-art coconut tree (trunk + 5 fronds). Stroke only, ~1.5px, palette color prop.
- `TropicalLeaf.tsx` — monstera / palm frond line-art variants.
- `SunArc.tsx` — half-sun with rays (Mayday-style abstract sun block + optional outline circle).
- `WaveLines.tsx` — 2-3 stacked wavy lines (Mayday beach-wave motif), color prop.
- `Sparkle.tsx` — small 4-point star, Spark-&-Marnee accent.
- `MarqueeStrip.tsx` — horizontal scrolling text band (Hebrew tagline repeated) with a palette background, separates major sections like the Mayday cream/orange strip.
- `Squiggle.tsx` — hand-drawn underline SVG used inline beneath keywords.

All decor: `aria-hidden`, `pointer-events-none`, absolute-positioned, low/medium opacity.

## 2. Section-by-section

**HeroSection** — clean & airy, illustrations peek from edges.
- Background stays cream; remove the two big blurred blobs.
- Bottom-left: line-art `Coconut` in `hoodie-teal` peeking up from below the fold.
- Bottom-right: `Coconut` smaller, `hoodie-orange`.
- Top-left: small `SunArc` in `hoodie-yellow`.
- Floating `Sparkle`s (3-4) scattered around the headline.
- Headline keeps `text-hoodie-gradient`.
- CTA: bubbly pill — `rounded-[2rem]`, larger padding, soft shadow, hover slight rotate.
- Bottom: thin `WaveLines` divider transitioning to About.

**MarqueeStrip** (NEW, between Hero & About) — `hoodie-yellow` background band, looping Hebrew phrase like "תנועה · חופש · שמחה · ריקוד · " in `font-display` cream text. Pure CSS marquee animation.

**AboutSection** — Spark-&-Marnee style asymmetric video.
- Wrap video in `<WavyFrame color="hoodie-coral">` — wavy SVG blob outline behind (slight offset, fills with `hoodie-coral/20`) with the video clipped to a matching wavy path on top. This gives the layered "sticker" effect.
- Floating `TropicalLeaf` peeking from behind the video's top-right corner (`hoodie-teal` stroke).
- One keyword in `who_am_i_highlight` underlined with `<Squiggle color="hoodie-orange">`.
- Background: faint dot-pattern (CSS radial-gradient) at ~5% opacity.

**ServicesSection** — irregular cards with overlap depth.
- Each of the 3 cards: organic `border-radius` (`60% 40% 55% 45% / 50% 50% 50% 50%` per card with varied values) — pebble shapes.
- Inner photo block wrapped in mini `WavyFrame` of the matching palette tint.
- A `TropicalLeaf` or `SunArc` icon absolutely positioned overlapping the top edge of the photo (Spark-&-Marnee layering).
- Card hover: subtle wobble (`hover:rotate-[0.5deg] hover:-translate-y-1`).
- Section background: large faint `Coconut` silhouette in the corner at ~6% opacity.
- Section title gets a small `Squiggle` underline.

**TestimonialsSection** — Mayday-quiet treatment.
- Background: paper-grain SVG noise overlay at ~4%.
- Replace dividers with `Squiggle` lines in `hoodie-coral`.
- Large translucent `SunArc` behind the row in `hoodie-yellow/15`.
- Scattered `Sparkle`s.

**ContactSection** — gradient headline + tropical layer.
- Switch headline class from `.text-rainbow` to `.text-hoodie-gradient font-display` (consistent with hero).
- Behind headline: large faint `SunArc` in `hoodie-teal/15`.
- Bottom-left: line-art `Coconut` peeking from the edge.
- WhatsApp button: same bubbly pill treatment as hero CTA.
- Top: `WaveLines` divider.

**Footer** — narrow `WaveLines` top edge, tiny line-art palm motif centered.

## 3. Tokens & utilities (`src/index.css`)

- `.bubble-btn` — `rounded-[2rem] shadow-[0_10px_28px_-10px_rgba(0,0,0,0.2)] transition-transform hover:-translate-y-0.5 hover:rotate-[-1deg]`.
- `.pebble-1`, `.pebble-2`, `.pebble-3` — three organic `border-radius` presets for service cards.
- `.paper-grain` — SVG noise data URI background, ~4% opacity, blend mode multiply.
- `.hand-underline` — inline `background-image` with a wavy SVG under the text.
- `.marquee` — keyframes for the horizontal scrolling band.
- Keep all existing HOODIE tokens, `.text-hoodie-gradient`, and `.frame-thin` untouched.

## 4. Files

- New: `src/components/decor/{WavyFrame,Coconut,TropicalLeaf,SunArc,WaveLines,Sparkle,MarqueeStrip,Squiggle}.tsx`
- Edited: `src/index.css`, `HeroSection.tsx`, `AboutSection.tsx`, `ServicesSection.tsx`, `TestimonialsSection.tsx`, `ContactSection.tsx`, `Footer.tsx`, `src/pages/Index.tsx` (insert `MarqueeStrip` after hero)

## Out of scope

- No copy changes, no new sections beyond `MarqueeStrip`, no font changes, no raster illustrations.
- Service photos remain placeholder soft gradients inside their wavy frames until real photos are provided.

## Open call

Illustration intensity: the plan currently lands **medium** — clearly visible coconut trees + leaves peeking in, but not maximalist. If you want the Spark-&-Marnee maximalism (bold orange backgrounds on full sections, big checker patterns), I can dial up — just say "go bolder."
