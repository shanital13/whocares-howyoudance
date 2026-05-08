
# Homepage Redesign Plan

## 1. Copy Uploaded Assets
- Copy the neon gradient PDF background image to `src/assets/about-bg.jpg` for the About section background.
- Copy the uploaded video to `public/about-video.mp4` (replace existing).

## 2. Rebuild About Section (`AboutSection.tsx`)
- Use the neon gradient image as a full-bleed background.
- Large centered video with a decorative neon glow/shadow frame around it.
- Hebrew title above the video, subtitle/text below.
- Remove the old side-by-side layout with small video.
- Keep CMS content integration (`useSiteContent`) for editable text.

## 3. Remove WhoAmISection
- Remove `WhoAmISection` from `Index.tsx` (it's currently not used there, but clean up any remaining references).
- The new AboutSection replaces it entirely.

## 4. Rebuild Services Section (`ServicesSection.tsx`)
- Keep the colorful service cards grid.
- Apply stronger neon brand colors to the cards.
- Remove the `ServiceDetailSection` components from `Index.tsx` — no more long text blocks below the cards.
- Each card opens a **modal/dialog** with the service description when clicked.
- Use the existing `Dialog` component from shadcn for the modals.

## 5. Refresh Hero Section (`HeroSection.tsx`)
- Keep the current structure but make it cleaner and softer.
- Reduce the number of decorative blobs; keep it more minimal.
- Ensure the rainbow headline and CTA remain prominent.

## 6. Update Index.tsx
- Remove all `ServiceDetailSection` instances.
- Page flow: Hero → About → Services → Contact → Footer.

## Technical Details
- The neon background image extracted from the PDF will be used as a CSS background-image on the About section.
- Service modals will use `Dialog` from `src/components/ui/dialog.tsx` with RTL-friendly styling.
- No new dependencies needed — framer-motion and radix dialog are already installed.
