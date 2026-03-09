-- Drop existing restrictive SELECT policies and replace with permissive ones
DROP POLICY IF EXISTS "Users can view own punch cards" ON public.punch_cards;
DROP POLICY IF EXISTS "Admin can view all punch cards" ON public.punch_cards;
DROP POLICY IF EXISTS "Anon can read punch_cards" ON public.punch_cards;
DROP POLICY IF EXISTS "Admins can insert punch cards" ON public.punch_cards;
DROP POLICY IF EXISTS "Admins can update punch cards" ON public.punch_cards;
DROP POLICY IF EXISTS "Admins can delete punch cards" ON public.punch_cards;
DROP POLICY IF EXISTS "Anon can insert punch_cards" ON public.punch_cards;
DROP POLICY IF EXISTS "Anon can update punch_cards" ON public.punch_cards;

-- Re-create as PERMISSIVE (default) so any matching policy allows access
CREATE POLICY "Users can view own punch cards"
  ON public.punch_cards FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anon can read punch_cards"
  ON public.punch_cards FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert punch cards"
  ON public.punch_cards FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update punch cards"
  ON public.punch_cards FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete punch cards"
  ON public.punch_cards FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Anon can insert punch_cards"
  ON public.punch_cards FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anon can update punch_cards"
  ON public.punch_cards FOR UPDATE
  USING (true);