-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL UNIQUE,
    source text NOT NULL DEFAULT 'footer',
    status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
    subscribed_at timestamptz NOT NULL DEFAULT now(),
    unsubscribed_at timestamptz
);

-- Index for fast lookups by status
CREATE INDEX IF NOT EXISTS newsletter_subscribers_status_idx ON newsletter_subscribers(status);

-- RLS: only service role / admin can read/write (no public access)
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
