# Enrich the Cloud Backdrop with Sunset Warmth

Single, focused change: re-render `src/assets/cloudscape.jpg` with deeper, diffused pink + nectarine glow in the cloud shadows. No code or layout changes — the existing fixed backdrop will display the new image automatically.

## What changes

Use `imagegen--edit_image` on the existing `src/assets/cloudscape.jpg` with this direction:

> Enhance this dreamy pastel cloudscape by infusing warm sunset tones — deep blush pink and soft nectarine orange — specifically into the **shadow areas** and undersides of the clouds, as if golden-hour light is grazing through the mist. Keep the highlights cream and airy. Bump saturation of the pink and peach hues only in select pockets to create rich warm "glow zones," while the rest stays pale and ethereal. The result must remain a 100% soft-focus, blurred, painterly atmosphere — no hard edges, no solid color blocks, no defined shapes. Slightly increase overall depth and contrast between shadow and highlight, but never make it heavy or dark. Light, breathable, soulful.

Output saved back to `src/assets/cloudscape.jpg` (overwrites). Aspect ratio: `9:16` (matches the current tall, viewport-cover usage).

## What does NOT change

- `CloudBackdrop.tsx` — keep static, fixed, `background-size: cover`.
- Section transparency, layout, padding — untouched.
- Cream overlay (`bg-background/30`) — untouched. The image lives behind it, so warmth shows through softly without bleeding into content.
- No new colors in the design tokens.
- No business logic, no copy.

## Verification

After regeneration:
- Visual check in preview at mobile + desktop: warm pink pockets visible in shadow zones, highlights still cream, content still readable.
- If the cream overlay mutes the warmth too much, lower it from `/30` to `/20`. Otherwise leave it.

## Files

**Edit (image only):** `src/assets/cloudscape.jpg`
**Possibly tweak (1 token):** `src/components/decor/CloudBackdrop.tsx` overlay opacity, only if warmth reads too faint.
