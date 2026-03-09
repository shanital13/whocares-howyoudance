
-- Drop the restrictive dev policies
DROP POLICY IF EXISTS "Anon can insert profiles (dev)" ON public.profiles;
DROP POLICY IF EXISTS "Anon can read profiles (dev)" ON public.profiles;
DROP POLICY IF EXISTS "Anon can update profiles (dev)" ON public.profiles;
DROP POLICY IF EXISTS "Anon can insert registrations (dev)" ON public.registrations;
DROP POLICY IF EXISTS "Anon can read registrations (dev)" ON public.registrations;

-- Recreate as PERMISSIVE policies (default)
CREATE POLICY "Anon can insert profiles" ON public.profiles FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can read profiles" ON public.profiles FOR SELECT TO anon USING (true);
CREATE POLICY "Anon can update profiles" ON public.profiles FOR UPDATE TO anon USING (true);
CREATE POLICY "Anon can insert registrations" ON public.registrations FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can read registrations" ON public.registrations FOR SELECT TO anon USING (true);
