-- Allow anon to update profiles (dev)
CREATE POLICY "Anon can update profiles (dev)" ON public.profiles FOR UPDATE TO anon USING (true);

-- Allow anon to read registrations (already exists via admin policy, but ensure anon can too)
CREATE POLICY "Anon can read registrations (dev)" ON public.registrations FOR SELECT TO anon USING (true);