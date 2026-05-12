## Problem

The Services and Testimonials carousels are frozen on mobile and won't swipe. They use Embla Carousel (not native CSS scroll), so the user-suggested `overflow-x: auto` rules don't apply — but the underlying issue is real: Embla isn't picking up touch drags.

Two likely culprits identified from the code:

1. The site is rendered in RTL (`html { direction: rtl }` in `src/index.css`), but Embla is initialized without `direction: 'rtl'`. In RTL contexts Embla's drag handler can misbehave and feel "stuck", especially when combined with `containScroll: 'trimSnaps'`.
2. Embla's viewport sets `touch-action: pan-y pinch-zoom` by default, which is correct — but a wrapping element with restrictive `touch-action` (or the `-mx-6` overflow situation) can swallow the horizontal gesture. We'll set explicit `touch-action: pan-y` on the carousel root to be safe.

## Changes

### 1. `src/components/landing/ServicesSection.tsx`
- Add `direction: 'rtl'` to the Embla `opts`:
  ```ts
  opts={{ align: 'center', loop: false, containScroll: 'trimSnaps', direction: 'rtl' }}
  ```
- Add `touch-pan-y` Tailwind class to the `<Carousel>` so the root explicitly allows vertical page scroll while letting Embla capture horizontal drags.

### 2. `src/components/landing/TestimonialsSection.tsx`
- Same two changes as above.

### 3. `src/index.css` (safety net)
- Append a small mobile-only rule that guarantees touch gestures aren't blocked on the Embla viewport:
  ```css
  @media (max-width: 768px) {
    [aria-roledescription="carousel"],
    [aria-roledescription="carousel"] > div {
      touch-action: pan-y;
    }
  }
  ```

No changes to Embla version, no swap to native CSS scroll-snap (the existing Polaroid/Testimonial card layouts and the active-slide scaling logic depend on Embla's `selectedScrollSnap`).

## Verification

- Open the preview at mobile viewport (≤768px).
- Confirm finger/drag swipe moves both carousels and dots update.
- Confirm vertical page scroll still works when starting the gesture on a card.
- Desktop grid layout unchanged.

## Notes

- The user's request to use native `overflow-x: auto` + CSS scroll-snap would require ripping out Embla and rewriting both sections, losing the active-slide scaling and dot sync. The proposed fix achieves the same outcome (swipeable, snappy, no scrollbar) using the existing Embla integration.
