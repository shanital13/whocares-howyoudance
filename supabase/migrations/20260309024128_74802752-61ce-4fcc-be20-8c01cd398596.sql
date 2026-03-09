
-- Fix permissive RLS policies: restrict write access to admins

-- Dance classes: only admins can manage
DROP POLICY "Authenticated can manage classes" ON public.dance_classes;
CREATE POLICY "Admins can insert classes" ON public.dance_classes FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update classes" ON public.dance_classes FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete classes" ON public.dance_classes FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Punch cards: only admins can manage
DROP POLICY "Authenticated can manage punch cards" ON public.punch_cards;
CREATE POLICY "Admins can insert punch cards" ON public.punch_cards FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update punch cards" ON public.punch_cards FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete punch cards" ON public.punch_cards FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Attendance: only admins can manage
DROP POLICY "Admin can manage attendance" ON public.attendance;
CREATE POLICY "Admins can insert attendance" ON public.attendance FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update attendance" ON public.attendance FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete attendance" ON public.attendance FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
