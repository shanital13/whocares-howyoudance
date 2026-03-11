-- Create a public storage bucket for site media (video/images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-media', 'site-media', true);

-- Allow anyone to read files
CREATE POLICY "Anyone can read site-media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'site-media');

-- Allow admins to upload
CREATE POLICY "Admins can upload site-media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update
CREATE POLICY "Admins can update site-media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete
CREATE POLICY "Admins can delete site-media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-media' AND public.has_role(auth.uid(), 'admin'));

-- Allow anon to upload (dev)
CREATE POLICY "Anon can upload site-media"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'site-media');

-- Allow anon to delete site-media (dev)
CREATE POLICY "Anon can delete site-media"
ON storage.objects FOR DELETE
TO anon
USING (bucket_id = 'site-media');