
INSERT INTO public.dance_classes (name, level, location, time, date, is_recurring, recurring_day, description, arrival_instructions, max_participants)
SELECT v.name, v.level, 'קופנהגן', v.time::time, CURRENT_DATE, true, v.recurring_day, '', '', NULL
FROM (VALUES
  ('שיעור ביניים',     'intermediate', '09:30', 1),
  ('שיעור מתקדמות',   'advanced',     '09:30', 2),
  ('שיעור מתקדמות',   'advanced',     '11:00', 2),
  ('שיעור מתחילות',   'beginner',     '09:30', 4),
  ('שיעור מתקדמות',   'advanced',     '11:00', 4)
) AS v(name, level, time, recurring_day)
WHERE NOT EXISTS (
  SELECT 1 FROM public.dance_classes dc
  WHERE dc.is_recurring = true
    AND dc.location = 'קופנהגן'
    AND dc.name = v.name
    AND dc.time = v.time::time
    AND dc.recurring_day = v.recurring_day
);
