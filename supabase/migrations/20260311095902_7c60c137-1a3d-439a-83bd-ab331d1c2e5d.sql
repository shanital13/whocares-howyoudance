
-- Key-value table for editable site content
CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read site content
CREATE POLICY "Anyone can read site_content" ON public.site_content
  FOR SELECT TO public USING (true);

-- Only admins can update
CREATE POLICY "Admins can update site_content" ON public.site_content
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert
CREATE POLICY "Admins can insert site_content" ON public.site_content
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Anon can also insert/update for dev convenience
CREATE POLICY "Anon can insert site_content" ON public.site_content
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Anon can update site_content" ON public.site_content
  FOR UPDATE TO anon USING (true);

-- Seed with current "Who Am I" content
INSERT INTO public.site_content (key, value) VALUES
  ('who_am_i_intro', 'אני יוגב.'),
  ('who_am_i_paragraph_1', 'רקדן ומורה למחול מודרני, ואני מאמין שריקוד צריך להיות מקום שבו אפשר להשתחרר — לא מקום שבו שופטים אותך.'),
  ('who_am_i_paragraph_2', 'השיעורים שלי נועדו במיוחד למתחילות, עם קצב לימוד נעים, הרבה חזרות וכוראיגרפיות שמקשיבות לגוף.'),
  ('who_am_i_highlight', 'המטרה היא פשוטה: שתצאי מהשיעור עם חיוך ועם קצת יותר חופש בתנועה.');
