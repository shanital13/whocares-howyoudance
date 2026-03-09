
-- Temporarily allow anon to manage dance_classes for development
CREATE POLICY "Anon can insert classes (dev)" ON public.dance_classes FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update classes (dev)" ON public.dance_classes FOR UPDATE TO anon USING (true);
CREATE POLICY "Anon can delete classes (dev)" ON public.dance_classes FOR DELETE TO anon USING (true);
