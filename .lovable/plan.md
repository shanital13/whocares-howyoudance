## Goal
Add a weekly schedule UI on the "שיעורי מחול פרונטליים - קופנגן" service card. Desktop: reveal on hover (transparent overlay over the polaroid image). Mobile: expand below the card on tap. Each schedule row gets a "שריינו מקום" button that opens the existing registration form. Confirmation message replaces the form on success.

## Data source
Use the existing `dance_classes` table (already has `is_recurring`, `recurring_day`, `time`, `name`, `level`, `description`, `location`, `arrival_instructions`). Seed the 5 weekly recurring rows so the user can manage them later from the admin CMS.

Initial seed (location: Copenhagen, is_recurring=true):
- Mon 09:30 — שיעור ביניים (level: intermediate)
- Tue 09:30 — שיעור מתקדמות (advanced)
- Tue 11:00 — שיעור מתקדמות (advanced)
- Thu 09:30 — שיעור מתחילות (beginner)
- Thu 11:00 — שיעור מתקדמות (advanced)

`recurring_day` uses 0=Sun … 6=Sat. Description left empty for the user to fill via admin.

## Current-week logic
A new helper `getWeeklySchedule()`:
- Reads recurring classes from `dance_classes` where `is_recurring = true` AND location matches Copenhagen.
- Computes the actual date for each `recurring_day` within the current week (Sun→Sat).
- Filters out days that already passed today (so on Wednesday only Thu+ remain).
- Resets automatically each Sunday.
- Returns `{ id, name, level, time, date (Date), dayLabel }[]` ordered chronologically.
- Each item is presented to `RegistrationDialog` as a `DanceClass` so the existing booking flow works unchanged.

## UI
New component `WeeklyScheduleOverlay.tsx`:
- Transparent panel (`bg-white/15 backdrop-blur-md`), Gladia/display font for headings, rounded, no heavy borders — "floating on the clouds".
- Rows: day + time on the right, class name center, "שריינו מקום" pill button on the left.
- Empty state: "השבוע הסתיים — נתראה ביום ראשון ✨".

Integration in `ServicesSection.tsx`:
- Desktop: replace the existing dark hover overlay on the Copenhagen card with the schedule overlay (same opacity-0 → group-hover:opacity-100 transition). Other two cards keep their current hover behavior.
- Mobile: tapping the Copenhagen card toggles an expanded panel rendered directly under the polaroid (no modal) instead of opening the description dialog. Other cards keep current dialog behavior.
- Card title/tagline still visible (mobile under the card, desktop in a small top strip of the overlay so it doesn't get hidden).

## Booking flow
Reuse `RegistrationDialog`:
- Clicking "שריינו מקום" sets the selected schedule item (mapped to a `DanceClass`) and opens the dialog.
- The dialog already handles Name / Phone / Email validation, insert into `registrations`, Make.com webhook, and shows a success state.
- Update the success copy to: "המקום שלך שמור! נתראה בסטודיו 💛 אישור נשלח למייל שלך." (Hebrew equivalent of the requested English line) only for these weekly bookings.

## Files
- New: `src/components/landing/WeeklyScheduleOverlay.tsx`
- New: `src/hooks/use-weekly-schedule.ts` (React Query fetch + week filtering)
- Edit: `src/components/landing/ServicesSection.tsx` (hover/tap behavior for Copenhagen card, mount overlay, wire booking)
- Edit: `src/components/landing/RegistrationDialog.tsx` (optional `successMessage` prop for the new copy)
- Migration: insert the 5 seed rows into `dance_classes` (one-time, idempotent on `name+recurring_day+time+location`).

## Out of scope
- Capacity / waitlist for recurring classes (can be added later via `max_participants`).
- Admin CMS edits — the existing admin classes page already manages `dance_classes`, so no new admin UI needed.
