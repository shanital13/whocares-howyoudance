
## Goal
Transform the landing page into a continuous cream canvas with soft-focus colored "ink cloud" blobs flowing behind every section, a Polaroid-style services gallery using the 3 uploaded studio photos, a floating-glow About frame, and a stripped-down contact block with WhatsApp + Instagram buttons.

## 1. Seamless background system

- Wrap the entire homepage in a single `<main>` with one continuous `bg-hoodie-cream` (very light cream, almost white).
- Remove per-section background colors (`bg-background`, `bg-hoodie-magenta`, etc.) from Hero, About, Services, Testimonials, Contact, Footer. Each section becomes transparent.
- Remove visible horizontal dividers / borders between sections.
- New component `src/components/decor/PageBlobs.tsx`: fixed/absolute layer behind all content (`-z-10`) holding 6–8 large blurred radial blobs positioned down the page using HOODIE colors at 25–40% opacity, `blur-[120px]`, scattered asymmetrically (top-left magenta, upper-right coral, mid-left teal, mid-right orange, lower-left yellow, bottom-right magenta).
- Testimonials section gets an additional very-light teal tint band (#1E9D8A at ~6% opacity) as a soft wash, no hard edges.

## 2. Services — Polaroid gallery

- Copy the 3 uploaded studio photos to `src/assets/studio-1.jpg`, `studio-2.jpg`, `studio-3.jpg` and import them in `ServicesSection.tsx`.
  - studio-1 → Copenhagen classes
  - studio-2 → Online
  - studio-3 → Workshops
- Replace the current 3 solid color cards with Polaroid frames:
  - White card, `p-3 pb-12` (wider bottom area), subtle drop shadow, very slight rotation per card (`-rotate-2`, `rotate-1`, `-rotate-1`).
  - Inside: square/4:5 photo.
  - Tape accent: small translucent rectangle at the top center of each Polaroid.
- Desktop hover: card lifts and straightens (`hover:rotate-0 hover:-translate-y-2 hover:scale-[1.03]`), and a dark gradient overlay fades in over the photo with the title + tagline in white.
- Mobile (`<md`): no hover layer — show photo in Polaroid, then title + tagline rendered in plain text directly below each frame in foreground color.
- Section background: lightened teal wash (`bg-hoodie-teal/5`) over the page cream, no hard edges (use soft gradient mask top/bottom to cream).
- Clicking the card still opens the existing detail dialog.

## 3. About section — floating glow frame

- In `AboutSection.tsx`, replace the `GalleryFrame` 2px border around the video with a "floating" treatment:
  - Container: `rounded-md`, no border.
  - Apply layered shadows for depth: a soft gray drop shadow + an outer colored glow (very subtle magenta/teal at low opacity) — e.g. `shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25),0_0_80px_-20px_hsl(var(--hoodie-magenta)/0.25)]`.
  - Slight rounded corners only, sophisticated modern feel.
- Remove section background color; sits on the global cream + blobs.

## 4. Contact — WhatsApp + Instagram

- In `ContactSection.tsx`, delete the entire form (name/contact/message inputs + submit).
- Keep the gradient headline + intro paragraph (drop the magenta block background; sit on cream).
- New CTA block centered:
  - **WhatsApp button**: large rectangular pill, background `#25D366`, white text + WhatsApp icon, links to `https://wa.me/972526398428`. Use `btn-rect` style, generous padding.
  - **Instagram link**: minimalist outlined icon button next to WhatsApp, links to the provided Instagram URL. Just an Instagram glyph (from `lucide-react`) in foreground color, no fill, hover tints to magenta.
- Below buttons: small line "או מצאי אותי בוואצאפ ובאינסטגרם".

## 5. Footer & dividers

- Footer: transparent background, slim, sits on cream + blobs. No top border line.
- Remove any `border-t`, `border-b` or `bg-*` lines between sections globally.

## 6. Tokens / typography

- Add `--hoodie-cream` token in `index.css` (e.g. `40 38% 97%`) and Tailwind extension `bg-hoodie-cream`.
- Keep `gladiaCLM` (`font-display`) for headlines, `segoeUI` (`font-sans`) for body.
- Smear gradient stays only on Hero headline (remove from Contact headline since the magenta block goes away — Contact headline becomes solid `text-foreground` with optional gradient accent on one word, or keep gradient on cream — final: keep solid for editorial calm, gradient is Hero-only per request).

## Technical files touched

**Create**
- `src/components/decor/PageBlobs.tsx`
- `src/assets/studio-1.jpg`, `studio-2.jpg`, `studio-3.jpg` (copied from uploads)

**Edit**
- `src/index.css` — add `--hoodie-cream`, remove leftover decorative utilities not used.
- `tailwind.config.ts` — register `hoodie-cream`.
- `src/pages/Index.tsx` — wrap in cream `<main>` with `<PageBlobs />` fixed behind content.
- `src/components/landing/HeroSection.tsx` — transparent bg.
- `src/components/landing/AboutSection.tsx` — floating-glow video frame, transparent bg.
- `src/components/landing/ServicesSection.tsx` — Polaroid layout, hover overlay desktop, always-visible text mobile, teal wash bg, 3 imported studio photos.
- `src/components/landing/TestimonialsSection.tsx` — transparent bg, keep colored cards.
- `src/components/landing/ContactSection.tsx` — remove form, add WhatsApp (#25D366) + Instagram buttons, transparent cream bg.
- `src/components/landing/Footer.tsx` — transparent, no top border.

## Out of scope
- Classes section, registration dialog, admin pages — untouched.
- Copy/Hebrew content — unchanged except contact form removal.
