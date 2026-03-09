
-- 1. Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  avatar_url TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles: anyone authenticated can read, users can update own
CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Dance classes table
CREATE TABLE public.dance_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level TEXT NOT NULL DEFAULT 'all',
  location TEXT NOT NULL DEFAULT '',
  date DATE NOT NULL,
  time TIME NOT NULL,
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  recurring_day SMALLINT,
  max_participants INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.dance_classes ENABLE ROW LEVEL SECURITY;

-- Classes: public read, admin write (for now allow authenticated to manage)
CREATE POLICY "Anyone can view classes" ON public.dance_classes FOR SELECT USING (true);
CREATE POLICY "Authenticated can manage classes" ON public.dance_classes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Registrations table
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.dance_classes(id) ON DELETE CASCADE,
  entry_type TEXT NOT NULL DEFAULT 'single' CHECK (entry_type IN ('single', 'punch_card')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own registrations" ON public.registrations FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own registrations" ON public.registrations FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin can view all registrations" ON public.registrations FOR SELECT TO authenticated USING (true);

-- 4. Punch cards table
CREATE TABLE public.punch_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entries_remaining INTEGER NOT NULL DEFAULT 4,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.punch_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own punch cards" ON public.punch_cards FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admin can view all punch cards" ON public.punch_cards FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can manage punch cards" ON public.punch_cards FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  payment_type TEXT NOT NULL DEFAULT 'single' CHECK (payment_type IN ('single', 'punch_card')),
  class_id UUID REFERENCES public.dance_classes(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments" ON public.payments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admin can view all payments" ON public.payments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can insert payments" ON public.payments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 6. Attendance table
CREATE TABLE public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.dance_classes(id) ON DELETE CASCADE,
  attended BOOLEAN NOT NULL DEFAULT false,
  marked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attendance" ON public.attendance FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admin can manage attendance" ON public.attendance FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 7. User roles (for admin access)
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
