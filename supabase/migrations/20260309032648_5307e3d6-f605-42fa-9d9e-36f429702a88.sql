
-- Drop FK from registrations.user_id to auth.users
ALTER TABLE public.registrations DROP CONSTRAINT registrations_user_id_fkey;

-- Add FK from registrations.user_id to profiles.id instead
ALTER TABLE public.registrations ADD CONSTRAINT registrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;
