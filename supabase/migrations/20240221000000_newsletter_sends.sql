CREATE TABLE IF NOT EXISTS newsletter_sends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  sent_at timestamptz NOT NULL DEFAULT now(),
  recipient_count int NOT NULL DEFAULT 0,
  failed_count int NOT NULL DEFAULT 0,
  sources text[]  -- null = all sources
);
