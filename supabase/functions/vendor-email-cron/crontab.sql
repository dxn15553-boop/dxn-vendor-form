-- Example of setting up a cron job using pg_cron to call the edge function daily
-- Run this in your Supabase SQL Editor

-- 1. Enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Define the cron job to run daily at 8:00 AM UTC
-- Make sure to replace YOUR_PROJECT_REF and YOUR_ANON_KEY with your actual project details
SELECT
  cron.schedule(
    'vendor-email-reminders', -- name of the cron job
    '0 8 * * *', -- cron expression (every day at 8am)
    $$
    SELECT
      net.http_post(
          url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/vendor-email-cron',
          headers:='{"Content-Type": "application/json", "Authorization": "Bearer YOUR_ANON_KEY"}'::jsonb
      ) as request_id;
    $$
  );

-- To unschedule:
-- SELECT cron.unschedule('vendor-email-reminders');
