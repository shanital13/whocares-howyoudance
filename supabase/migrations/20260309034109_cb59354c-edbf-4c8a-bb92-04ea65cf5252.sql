
-- Drop auth.users FKs and point to profiles instead
ALTER TABLE public.attendance DROP CONSTRAINT attendance_user_id_fkey;
ALTER TABLE public.attendance ADD CONSTRAINT attendance_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.payments DROP CONSTRAINT payments_user_id_fkey;
ALTER TABLE public.payments ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;

ALTER TABLE public.punch_cards DROP CONSTRAINT punch_cards_user_id_fkey;
ALTER TABLE public.punch_cards ADD CONSTRAINT punch_cards_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
