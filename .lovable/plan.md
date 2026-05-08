
## Plan

### 1. Global Gladia CLM font (strict enforcement)

- **tailwind.config.ts**: Set all font families (display, body, nehama) to `'Gladia CLM'` with sans-serif fallback. Remove Secular One and Rubik references.
- **index.css**: Update the `@import` to properly load Gladia CLM. Set `body` and `html` to use `font-body` (which now maps to Gladia CLM). Update `h1/h2/h3` base styles to use `font-body` instead of `font-display` (since they'll be the same font).
- **All components**: Remove all explicit `font-display`, `font-body`, `font-nehama`, `font-mono` class usages from every component — the font will inherit globally. This affects ~16 files.

### 2. "מי אני" (About) section redesign

- Change to a **2-column layout**: text on the right, vertical video on the left (desktop). Stack vertically on mobile (video on top).
- Keep the video in **portrait/vertical orientation** (`aspect-[9/16]`).
- Replace the current `about-bg.jpg` full-bleed background with a **subtle gradient + soft texture** approach: dark-to-purple gradient with soft neon glow blobs for visual depth, ensuring high text contrast.
- Remove the neon border frame around the video, use a cleaner subtle shadow instead.

### 3. "צרו איתי קשר" (Contact) section redesign

- Integrate the site **logo as a subtle watermark/pattern** in the background — faded, repeated or placed as a large centered element at low opacity.
- Replace the solid `bg-neon-coral` with a richer gradient background that feels more branded and inviting.
- Maintain strong CTA emphasis and readability.

### Technical details

Files to edit:
- `tailwind.config.ts` — font families
- `src/index.css` — font import, base styles
- `src/components/landing/AboutSection.tsx` — 2-col layout, vertical video, new background
- `src/components/landing/ContactSection.tsx` — logo watermark background
- `src/components/landing/HeroSection.tsx` — remove font classes
- `src/components/landing/ServicesSection.tsx` — remove font classes
- `src/components/landing/Footer.tsx` — remove font classes
- ~10 other component files — remove explicit font utility classes

No new dependencies needed.
