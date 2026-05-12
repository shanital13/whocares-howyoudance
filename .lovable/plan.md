
Goal: make the cloud background rock-solid on mobile (Safari/Chrome) without changing the desktop look.

Background: `background-attachment: fixed` is known to be buggy on mobile (resizes/jumps when the URL bar shows/hides, sometimes ignored entirely). The fix is to render the cloud image on a `position: fixed` layer instead of relying on `background-attachment: fixed` on mobile.

Changes (CSS only, scoped to mobile via `@media (max-width: 768px)`):

1. `src/components/decor/CloudBackdrop.tsx`
   - Add a stable class name (e.g. `cloud-backdrop`) to the existing fixed wrapper div so we can target it from CSS.
   - Keep the current inline styles for desktop (background-attachment: fixed + cover + center) untouched.

2. `src/index.css` — append a mobile-only block:
   - `@media (max-width: 768px) { .cloud-backdrop { background-attachment: scroll !important; background-size: cover !important; background-position: center center !important; background-repeat: no-repeat !important; transform: translateZ(0); will-change: transform; -webkit-backface-visibility: hidden; backface-visibility: hidden; } }`
   - Because the wrapper is already `position: fixed; inset: 0`, switching `background-attachment` from `fixed` to `scroll` on mobile gives the stable "fixed pseudo-element" behavior the user described: the layer itself stays pinned to the viewport, and the image no longer fights the URL-bar resize.
   - `translateZ(0)` promotes the layer to its own compositor layer for smooth scrolling.
   - The cream wash overlay already covers it, no change needed.

3. Desktop untouched
   - No changes outside the `@media (max-width: 768px)` block.
   - No JS, no parallax, no business logic touched.

Verification
- Desktop preview: background still uses `background-attachment: fixed`, looks identical.
- Mobile (≤768px): the `.cloud-backdrop` layer stays pinned via `position: fixed` while `background-attachment: scroll` avoids the iOS Safari resize bug; clouds stay centered and cover the viewport during scroll and URL-bar transitions.
