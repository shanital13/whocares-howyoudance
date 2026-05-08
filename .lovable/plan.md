
## Plan

Note: Your project is built with React + Vite + Tailwind (not Laravel), so changes will be applied to the existing React components and CSS files.

### 1. Install custom fonts

Copy the uploaded `Gladia_CLM_Bold.ttf` and `segoeuithibd.ttf` to `public/fonts/`, then update `@font-face` rules in `src/index.css`.

- **Headlines font** (`Gladia CLM`): Used for "למי איכפת איך את רוקדת", "מי אני?", "אז מה מחכה לך כאן?"
- **Body font** (`Segoe UI`): Used for all other text site-wide

Update `tailwind.config.ts` font families: `font-display` → Gladia CLM, `font-sans`/`font-body` → Segoe UI.

Update `index.css` base styles so `body` uses Segoe UI and headings use Gladia CLM.

### 2. About section changes

In `AboutSection.tsx`:
- **Background**: Replace the dark purple gradient with a plain white background (matching the hero/banner section).
- **Layout swap**: Move video to the left and text to the right (currently reversed via `md:flex-row-reverse` — change to `md:flex-row`). Adjust text colors for readability on white.

### 3. Services section — softer colors

In `ServicesSection.tsx`:
- Replace the current bold/vivid gradient backgrounds on the service cards with softer, pastel-toned gradients (e.g., soft lavender, gentle coral, light mint).

### Files to edit
- `public/fonts/` — add 2 font files
- `src/index.css` — `@font-face` rules, base typography
- `tailwind.config.ts` — font family mappings
- `src/components/landing/AboutSection.tsx` — white bg, layout swap, text colors
- `src/components/landing/ServicesSection.tsx` — pastel card colors
- `src/components/landing/HeroSection.tsx` — ensure headline uses display font
