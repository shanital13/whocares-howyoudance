-- Allow anon to insert registrations (dev)
CREATE POLICY "Anon can insert registrations (dev)" ON public.registrations FOR INSERT TO anon WITH CHECK (true);

-- Allow anon to read profiles (dev)
CREATE POLICY "Anon can read profiles (dev)" ON public.profiles FOR SELECT TO anon USING (true);

-- Allow anon to insert profiles (dev)
CREATE POLICY "Anon can insert profiles (dev)" ON public.profiles FOR INSERT TO anon WITH CHECK (true);