-- Scheduled newsletters table
-- Allows admin to queue newsletters to be sent at a future date/time
-- Cron job at /api/cron/send-scheduled-newsletters processes pending rows every 15 min

CREATE TABLE scheduled_newsletters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  body_html text NOT NULL,
  sources text[],                  -- null = all sources
  scheduled_for timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'sending', 'sent', 'failed', 'cancelled')),
  created_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz,
  recipient_count int,
  failed_count int,
  error_message text
);

-- Index for efficient cron query
CREATE INDEX idx_scheduled_newsletters_status_time
  ON scheduled_newsletters (status, scheduled_for)
  WHERE status = 'pending';

-- RLS: admin/service role only
ALTER TABLE scheduled_newsletters ENABLE ROW LEVEL SECURITY;
