# Seamless Floating Site Overhaul

## 1. Global Cloud Canvas (fixed + parallax)

**`src/components/decor/CloudBackdrop.tsx`** — rebuild as a `fixed inset-0 -z-10` layer (covers viewport, never scrolls out). Use the existing `cloudscape.jpg` as the image.

- Outer wrapper: `fixed inset-0 -z-10 pointer-events-none overflow-hidden`
- Inner image layer: oversized (`h-[140%] w-full`), `bg-[url(cloudscape)]` with `bg-cover bg-center bg-no-repeat`, transformed via a scroll listener to translate ~30% of `window.scrollY` (subtle parallax — clouds move slower than content).
- A very light cream wash overlay (`bg-background/30`) for text legibility. No new colors.
- Mount once in `Index.tsx` (already done) — but move it OUT of the `relative` main wrapper so it stays fixed to the viewport, not absolute to the page.

**`src/pages/Index.tsx`** — render `<CloudBackdrop />` as a sibling before `<main>`, and drop `bg-background` from `<main>` so the body shows through.

## 2. Transparent, seamless sections

Audit and clean each landing section so nothing breaks the cloud flow:

- `HeroSection.tsx`, `AboutSection.tsx`, `ServicesSection.tsx`, `TestimonialsSection.tsx`, `ContactSection.tsx`, `Footer.tsx`:
  - Remove any `bg-*`, `border-t`, `border-b`, ring, or decorative divider strips on the section root.
  - Keep internal padding but normalize vertical rhythm (`py-20 md:py-28`) so sections breathe without hard gaps.
  - Testimonial cards keep their colored backgrounds (those are content, not section dividers).

## 3. Mobile horizontal carousels (Services + Testimonials)

Use the existing `@/components/ui/carousel` (embla) with `useIsMobile()` to switch layout.

**Behavior on mobile only (`< 768px`):**
- `opts={{ align: 'center', loop: false, containScroll: 'trimSnaps' }}`
- Each `CarouselItem` set to `basis-[85%]` so the next card peeks ~15%.
- Add `pl-4` gutter and a leading/trailing spacer so first/last cards center properly.
- Native scroll-snap is handled by embla.
- **Active scale (1.05x):** subscribe to embla `select` + `scroll` events; track selected index in state; apply `scale-105` class to the centered item, `scale-95 opacity-80` to others, with `transition-transform duration-300`.
- **Pagination dots:** small row of buttons under the carousel — `h-2 w-2 rounded-full bg-foreground/20`, active = `w-6 bg-hoodie-coral`. Click jumps via `api.scrollTo(i)`.

**Desktop (`md:` and up):** unchanged — keep current 3-column grid.

Implementation pattern (shared mini-component or inline in each section):

```text
isMobile
  ├─ <Carousel>
  │   ├─ items mapped → <CarouselItem basis-[85%]>
  │   └─ scale based on selectedIndex
  └─ <Dots count={n} active={selectedIndex} onSelect={api.scrollTo} />
desktop
  └─ existing grid
```

Files touched: `ServicesSection.tsx`, `TestimonialsSection.tsx`.

## 4. Instagram brand gradient button

In `ContactSection.tsx`, the Instagram link already has the radial gradient. Strengthen the "pop" against clouds:
- Add a thin white inner ring (`ring-2 ring-white/70`) and a stronger soft shadow.
- Confirm icon is pure white, size unchanged.

No new colors introduced; only adjusting depth.

## Files

**Edit:**
- `src/components/decor/CloudBackdrop.tsx` (fixed + parallax)
- `src/pages/Index.tsx` (mount cloud as fixed sibling, drop `bg-background`)
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/AboutSection.tsx`
- `src/components/landing/ServicesSection.tsx` (mobile carousel)
- `src/components/landing/TestimonialsSection.tsx` (mobile carousel)
- `src/components/landing/ContactSection.tsx` (IG ring/shadow)
- `src/components/landing/Footer.tsx` (transparent)

**No new files, no new colors, no business-logic changes.**

## Technical notes

- Parallax uses a passive `scroll` listener with `requestAnimationFrame` throttling and `prefers-reduced-motion` opt-out (no transform if user prefers reduced motion).
- `fixed` backdrop avoids the "background repeats and seams" problem entirely — image is rendered once, viewport-sized.
- Embla's `containScroll: 'trimSnaps'` + `align: 'center'` gives the peek + snap behavior natively; no custom scroll math.
