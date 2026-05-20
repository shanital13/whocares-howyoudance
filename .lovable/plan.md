# Final Polish: Body Font, Mobile Spacing, A11y Widget

Three scoped CSS/asset changes. No database, layout, hover, or carousel logic touched.

## 1. Body font → Rubik (headings untouched)

- Copy uploaded `Rubik.ttf` to `public/fonts/Rubik.ttf`.
- In `src/index.css`:
  - Add `@font-face` for `'Rubik'`.
  - Change `html`, `body`, and `button/input/textarea/select` `font-family` to `'Rubik', sans-serif`.
  - Leave the existing `h1–h6` rule alone (still `'Segoe UI Custom'`) so headings are unchanged.
- In `tailwind.config.ts`:
  - Update `fontFamily.sans` and `fontFamily.body` to `['Rubik', 'sans-serif']`.
  - Leave `fontFamily.display` and the heading-specific families as-is.

## 2. Reduce mobile vertical spacing by ~30%

Scoped, CSS-only — no layout/markup changes.

Add a mobile-only block in `src/index.css` under `@layer utilities` (or base):

```text
@media (max-width: 767px) {
  main > section { padding-top: 70%; padding-bottom: 70%; }  /* of original */
  /* applied via calc on common Tailwind py-* values used by sections */
}
```

Concretely: target `main > section` and reduce its vertical padding and margin to 70% using CSS custom overrides (e.g. `padding-block: clamp(...)` or direct `padding-top/bottom` overrides matching the existing `py-*` scale). Margins between sections shrunk the same way. No horizontal padding, no layout structure, no hover or carousel rules touched.

## 3. Lightweight accessibility widget

Add a self-contained floating widget — no third-party script, fully in-app, keyboard accessible.

- New `src/components/a11y/AccessibilityWidget.tsx`:
  - Floating button bottom-left (RTL site → bottom-left avoids covering existing bottom-right elements; confirm no conflict).
  - Opens a small panel (shadcn `Popover`) with controls:
    - Increase / decrease / reset text size (toggles `html` class `a11y-text-lg` / `a11y-text-xl` that scales `font-size` on `html`).
    - High contrast toggle (adds `a11y-contrast` class on `html` — defined in `index.css` with token overrides).
    - Highlight focus toggle (adds `a11y-focus` class → strong `:focus-visible` outline globally).
  - All buttons have `aria-label`s; panel has `role="dialog"` via Popover; trigger has `aria-label="נגישות"`.
  - Persists settings in `localStorage`.
- Mount once in `src/App.tsx` so it appears on every route.
- Add the matching CSS classes in `src/index.css` (uses semantic tokens, no hardcoded colors except the high-contrast override).

## Carousel verification

After CSS changes, visually verify the homepage carousels still swipe (testimonials/gallery). The existing mobile rule `[aria-roledescription="carousel"] { touch-action: pan-y }` stays untouched.

## Files

- `public/fonts/Rubik.ttf` (new, copied from upload)
- `src/index.css` (font-face, body font, mobile spacing, a11y classes)
- `tailwind.config.ts` (sans/body → Rubik)
- `src/components/a11y/AccessibilityWidget.tsx` (new)
- `src/App.tsx` (mount widget)

## Out of scope (frozen)

Database, RLS, admin logic, hover animations, carousel scroll behavior, heading fonts, layouts.
