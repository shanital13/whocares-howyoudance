
-- Delete duplicate profiles, keeping the oldest one per email
DELETE FROM profiles
WHERE id NOT IN (
  SELECT DISTINCT ON (email) id
  FROM profiles
  ORDER BY email, created_at ASC
);

-- Delete orphaned registrations (where user_id no longer exists in profiles)
DELETE FROM registrations
WHERE user_id NOT IN (SELECT id FROM profiles);

-- Add unique constraint on email
ALTER TABLE profiles ADD CONSTRAINT profiles_email_unique UNIQUE (email);
