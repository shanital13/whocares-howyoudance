DELETE FROM registrations WHERE user_id IN (SELECT id FROM profiles WHERE email = 'test-e2e@test.com');
DELETE FROM profiles WHERE email = 'test-e2e@test.com';