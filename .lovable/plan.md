Implement a focused CSS/layout fix to make the site read as one continuous fixed cloud canvas.

1. Lock the background layer
- Update `src/components/decor/CloudBackdrop.tsx` to remove all scroll/parallax logic: no `useEffect`, `useRef`, scroll listeners, transforms, `requestAnimationFrame`, oversized height, or negative top offset.
- Render the cloud image on a single fixed full-viewport layer with:
  - `background-attachment: fixed`
  - `background-size: cover`
  - `background-position: center center`
  - `background-repeat: no-repeat`
- Keep the soft readability wash, but it will also be fixed and non-animated.

2. Make the page canvas transparent
- Update `src/index.css` so `html`, `body`, and `#root` do not paint an opaque background over the cloud layer.
- Add a landing-page transparency guard so section-level containers render with `background: transparent !important`.

3. Remove visible section divisions on the public homepage
- Update `src/pages/Index.tsx` to mark the public landing page for the transparency guard.
- Add explicit transparent backgrounds to Hero, About, Services, Testimonials, Contact, and Footer roots.
- Remove decorative divider lines between sections, specifically the small horizontal section title rules in Services and Testimonials.
- Remove section-level overflow styling only where it contributes to clipping or visual fragmentation; keep required internal carousel layout intact.

4. Preserve content styling without changing business logic
- Do not change registration, admin, CMS, webhook, or Supabase logic.
- Keep existing cards, buttons, carousel behavior, text, and imagery unless they directly create page-wide seams.

Verification after implementation
- Confirm `CloudBackdrop` has no scroll/animation code left.
- Confirm the cloud layer uses fixed attachment, cover sizing, and centered positioning.
- Confirm public homepage section roots are transparent and no divider lines remain between Hero through Footer.