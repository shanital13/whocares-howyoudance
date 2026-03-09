
SELECT cron.schedule(
  'class-reminder-daily',
  '0 6 * * *',
  $$
  SELECT net.http_post(
    url:='https://isghpsxcyfakccbubqyk.supabase.co/functions/v1/class-reminder-webhook',
    headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzZ2hwc3hjeWZha2NjYnVicXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMTQxOTUsImV4cCI6MjA4ODU5MDE5NX0.L484iP1lD0au49wU0h3cUOaH9kuAIN8i2ba323GGqUY"}'::jsonb,
    body:='{"source": "cron"}'::jsonb
  ) AS request_id;
  $$
);
