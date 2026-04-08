
-- ========================================
-- 1. Remove all anon dev policies
-- ========================================

-- dance_classes anon write
DROP POLICY IF EXISTS "Anon can insert classes (dev)" ON public.dance_classes;
DROP POLICY IF EXISTS "Anon can update classes (dev)" ON public.dance_classes;
DROP POLICY IF EXISTS "Anon can delete classes (dev)" ON public.dance_classes;

-- profiles anon
DROP POLICY IF EXISTS "Anon can read profiles" ON public.profiles;
DROP POLICY IF EXISTS "Anon can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Anon can update profiles" ON public.profiles;

-- attendance anon
DROP POLICY IF EXISTS "Anon can insert attendance" ON public.attendance;
DROP POLICY IF EXISTS "Anon can update attendance" ON public.attendance;
DROP POLICY IF EXISTS "Anon can read attendance" ON public.attendance;
DROP POLICY IF EXISTS "Anon can delete attendance" ON public.attendance;

-- registrations anon
DROP POLICY IF EXISTS "Anon can insert registrations" ON public.registrations;
DROP POLICY IF EXISTS "Anon can read registrations" ON public.registrations;
DROP POLICY IF EXISTS "Anon can delete registrations" ON public.registrations;

-- payments anon
DROP POLICY IF EXISTS "Anon can insert payments" ON public.payments;
DROP POLICY IF EXISTS "Anon can read payments" ON public.payments;

-- punch_cards anon
DROP POLICY IF EXISTS "Anon can read punch_cards" ON public.punch_cards;
DROP POLICY IF EXISTS "Anon can insert punch_cards" ON public.punch_cards;
DROP POLICY IF EXISTS "Anon can update punch_cards" ON public.punch_cards;

-- site_content anon
DROP POLICY IF EXISTS "Anon can insert site_content" ON public.site_content;
DROP POLICY IF EXISTS "Anon can update site_content" ON public.site_content;

-- storage anon
DROP POLICY IF EXISTS "Anon can upload site-media" ON storage.objects;
DROP POLICY IF EXISTS "Anon can delete site-media" ON storage.objects;

-- ========================================
-- 2. Fix "Admin can view all" policies to use has_role
-- ========================================

DROP POLICY IF EXISTS "Admin can view all registrations" ON public.registrations;
CREATE POLICY "Admins can view all registrations" ON public.registrations
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admin can view all payments" ON public.payments;
CREATE POLICY "Admins can view all payments" ON public.payments
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- punch_cards: the existing "Users can view own punch cards" handles user access
-- Remove the overly broad anon read (already done above) and keep admin scoped
DROP POLICY IF EXISTS "Anon can read punch_cards" ON public.punch_cards;

-- ========================================
-- 3. Fix payments insert - admin only
-- ========================================

DROP POLICY IF EXISTS "Authenticated can insert payments" ON public.payments;
CREATE POLICY "Admins can insert payments" ON public.payments
  FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
