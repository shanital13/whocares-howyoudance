## Plan: Cloud-scape background + Instagram brand gradient

### 1. Add the uploaded cloud image as a site-wide background
- Copy `user-uploads://WhatsApp_Image_2026-05-12_at_08.54.21.jpeg` → `src/assets/cloudscape.jpg`.
- Replace `PageBlobs` with a new `CloudBackdrop` component (`src/components/decor/CloudBackdrop.tsx`):
  - `absolute inset-0 h-full w-full` so it stretches the full document.
  - Imports the cloud asset and renders it as a repeating/tiled vertical background using `background-image`, `background-size: 100% auto`, `background-repeat: repeat-y`, so the same cloud texture flows seamlessly from Hero down through Footer.
  - Soft top/bottom mask (`mask-image: linear-gradient`) on each tile seam so the repeat is invisible — just one continuous misty sky.
  - A very light cream-tinted overlay (`bg-background/35`) on top to keep readability without introducing new colors (only the cream already in the palette + the image's own pastel tones).
- `src/pages/Index.tsx`: swap `<PageBlobs />` for `<CloudBackdrop />`. Keep `relative z-10` wrapper for content.
- Delete `PageBlobs.tsx` (no longer used).

### 2. Remove remaining section dividers / solid color breaks
Audit and strip any per-section backgrounds, borders, or gradient washes so the cloud canvas shows through every section:
- `HeroSection.tsx`, `AboutSection.tsx`, `ServicesSection.tsx`, `TestimonialsSection.tsx`, `ContactSection.tsx`, `Footer.tsx` — remove `bg-*`, `border-t/b`, and any decorative gradient strips between sections. Keep only typography, spacing, and content cards.
- The teal-tinted Services background and any testimonials background get removed (replaced by the universal cloud canvas).

### 3. Instagram button — official brand gradient
In `ContactSection.tsx`, restyle the Instagram link:
- Circular button filled with the classic Instagram radial gradient (purple → red → orange → yellow), white icon, soft shadow.
- Implementation: inline `style={{ background: 'radial-gradient(circle at 30% 110%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%)' }}` with `text-white`.
- Keep size/spacing identical to current; remove the neutral border.

### 4. Readability check
- Confirm body text (`text-foreground`, `text-muted-foreground`) stays legible over the cloud image — the cream overlay + existing dark foreground tokens should be enough. No new color tokens added.

### Files touched
- create: `src/assets/cloudscape.jpg`, `src/components/decor/CloudBackdrop.tsx`
- edit: `src/pages/Index.tsx`, `src/components/landing/{Hero,About,Services,Testimonials,Contact}Section.tsx`, `src/components/landing/Footer.tsx`
- delete: `src/components/decor/PageBlobs.tsx`

No copy changes. No new color tokens. No business-logic changes.