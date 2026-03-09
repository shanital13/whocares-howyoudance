
-- Add unique constraint for attendance upsert
ALTER TABLE public.attendance ADD CONSTRAINT attendance_user_class_unique UNIQUE (user_id, class_id);
