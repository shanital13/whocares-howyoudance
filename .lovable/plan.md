
## Changes

### 1. Unified Background Color
The Banner (Hero) uses `bg-background`, which maps to CSS variable `--background: 48 100% 94%` → `hsl(48, 100%, 94%)` ≈ `#fff3c2`. 

The About section uses `bg-white` and the Contact section uses a gradient. I'll:
- Change About section from `bg-white` to `bg-background`
- Change Contact section to use `bg-background` instead of its gradient
- Check all other sections and align them to `bg-background`

### 2. Contact Section Updates
- Change headline from "מוכנה להתחיל לרקוד?" to "מתרגשת לקראת התנועה החדשה שלך בעולם?"
- Apply `font-display` (Gladia CLM) to the headline
- Apply the `text-rainbow` gradient class (same as the banner) to the headline
- Change body text color from `text-white/90` and `text-white/70` to `text-muted-foreground` (the standard gray used across the site)
- Remove the decorative gradient background, watermarks, and SVG waves (since the section will now use `bg-background`)

### 3. "Talk to Me" Button
- Change button background from white (`bg-white`) to WhatsApp green (`#25D366`)
- Update text color to white for contrast
- Keep the prominent rounded-full styling

### 4. Layout Verification
- About section already has video on the left and text on the right in the current code (confirmed in RTL context)
- Font rules already applied: `font-display` for headlines, `font-sans` for body
- Services section pastel tones already in place

## Files to modify
- `src/components/landing/AboutSection.tsx` — change `bg-white` to `bg-background`
- `src/components/landing/ContactSection.tsx` — headline text/font/gradient, body text color, button color, background
- `src/components/landing/ServicesSection.tsx` — verify `bg-background` (already set)
- Any other section files that don't use `bg-background`
