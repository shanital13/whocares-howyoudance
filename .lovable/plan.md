## Goal
Change the Weekly Schedule reset day from Sunday to Friday so users see next week's classes from Friday morning onward.

## Change (single file)
`src/hooks/use-weekly-schedule.ts` — replace `startOfWeekSunday` + filtering logic.

New rule:
- If today is Sun–Thu (0–4): show the current week's remaining upcoming classes (Mon/Tue/Thu of this week that haven't passed yet).
- If today is Fri or Sat (5–6): show **next week's** classes (the upcoming Mon/Tue/Thu).

Implementation:
```ts
function getScheduleWeekStart(now: Date) {
  const d = new Date(now);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay(); // 0=Sun..6=Sat
  if (dow >= 5) {
    // Friday or Saturday → jump to next Sunday (start of next week)
    d.setDate(d.getDate() + (7 - dow));
  } else {
    // Sun–Thu → current week's Sunday
    d.setDate(d.getDate() - dow);
  }
  return d;
}
```

Then keep the existing loop, but only skip past-dated items when we are showing the **current** week (Sun–Thu). For Fri/Sat we are already on next week, so no `date < now` filter is needed (all dates are in the future anyway, but the guard becomes harmless).

## Out of scope
No changes to CSS, layout, z-index, padding, hover/click behavior, carousel, RegistrationDialog, or the `registrations` table write path.