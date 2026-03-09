
-- Allow anon to manage attendance (dev)
CREATE POLICY "Anon can insert attendance" ON public.attendance FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update attendance" ON public.attendance FOR UPDATE TO anon USING (true);
CREATE POLICY "Anon can read attendance" ON public.attendance FOR SELECT TO anon USING (true);
CREATE POLICY "Anon can delete attendance" ON public.attendance FOR DELETE TO anon USING (true);

-- Allow anon to manage payments (dev)
CREATE POLICY "Anon can insert payments" ON public.payments FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can read payments" ON public.payments FOR SELECT TO anon USING (true);

-- Allow anon to manage punch cards (dev)
CREATE POLICY "Anon can read punch_cards" ON public.punch_cards FOR SELECT TO anon USING (true);
CREATE POLICY "Anon can insert punch_cards" ON public.punch_cards FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Anon can update punch_cards" ON public.punch_cards FOR UPDATE TO anon USING (true);
