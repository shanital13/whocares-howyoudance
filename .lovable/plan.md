# Redesign: Serene Minimal + HOODIE Palette

A focused visual refresh of the landing page — keeps content/structure intact and updates colors, framing, typography, and section layouts to a calm, editorial aesthetic.

## 1. Design tokens (`src/index.css` + `tailwind.config.ts`)

- `--background`: warm cream (~`hsl(40, 60%, 96%)`, near `#FBF6EC`) — unified across all sections
- `--foreground`: deep neutral (`hsl(220, 15%, 18%)`)
- HOODIE palette tokens:
  - `--hoodie-magenta` `#833363`
  - `--hoodie-coral` `#F4525A` (primary accent — buttons, icons)
  - `--hoodie-orange` `#F27D52`
  - `--hoodie-yellow` `#F6BC59`
  - `--hoodie-teal` `#1D9D8A` (secondary accent)
- `--primary` → coral, `--accent` → teal
- New utility `.text-hoodie-gradient`: `linear-gradient(90deg,#833363,#F4525A,#F27D52,#F6BC59,#1D9D8A)` clipped to text via `-webkit-background-clip: text` + transparent fill. Replaces `.text-rainbow` on hero + contact headlines.
- New utility `.frame-thin`: white inner, 1px warm-neutral border, ~8px padding, soft shadow — for image/video framing
- Register `hoodie.*` colors in `tailwind.config.ts` so `bg-hoodie-coral/10` etc. work for soft pastel card backgrounds

## 2. Sections

**HeroSection** — `text-hoodie-gradient` on `<h1>`; replace neon blobs with two faint coral/teal organic blurs at low opacity; CTA button solid coral, pill, soft shadow.

**AboutSection** — keep video-left / text-right (RTL); wrap video in `.frame-thin`; remove neon halo, use a single soft cream glow; title `font-display` deep neutral (gradient reserved for hero/contact).

**ServicesSection** — vertical 3-col cards: image on top in a `.frame-thin` (aspect ~3/4), then title, then short description. Card backgrounds use very soft palette tints: `bg-hoodie-coral/10`, `bg-hoodie-teal/10`, `bg-hoodie-yellow/15`. Text becomes dark neutral (current white-on-pastel fails contrast). Services data gets an optional `image` field — if missing, render a soft gradient block in the frame.

**TestimonialsSection (NEW)** — inserted between Services and Contact. Centered minimal layout, up to 3 short quotes with name + role, thin divider, generous whitespace, placeholder copy.

**ContactSection** — headline keeps "מתרגשת לקראת התנועה החדשה שלך בעולם?" with `text-hoodie-gradient font-display`; WhatsApp button stays `#25D366`.

**Footer** — cream background, thin top divider, small muted text.

## 3. Typography
- Headlines: Gladia CLM (`font-display`), `leading-[1.1]`
- Body: Segoe UI Custom (`font-sans`), `leading-[1.7]`

## 4. Decorative details
- Replace neon blur blobs with 1–2 faint organic SVG shapes (low opacity, palette colors) and/or thin hairline dividers between sections

## Files
- `src/index.css`, `tailwind.config.ts`
- `src/components/landing/HeroSection.tsx`
- `src/components/landing/AboutSection.tsx`
- `src/components/landing/ServicesSection.tsx`
- `src/components/landing/ContactSection.tsx`
- `src/components/landing/Footer.tsx`
- New: `src/components/landing/TestimonialsSection.tsx`
- `src/pages/Index.tsx` (insert Testimonials)

## Note on service photos
No service images exist yet. The plan renders soft gradient placeholder blocks in the photo frames so the layout works immediately; you can upload real photos later and we'll swap them in.
