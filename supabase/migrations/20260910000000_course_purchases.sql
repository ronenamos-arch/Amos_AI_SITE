CREATE TABLE IF NOT EXISTS course_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  access_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  paypal_order_id TEXT UNIQUE,
  amount NUMERIC(10,2) DEFAULT 599.00,
  currency TEXT DEFAULT 'ILS',
  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending' | 'paid' | 'refunded'
  created_at TIMESTAMPTZ DEFAULT now(),
  paid_at TIMESTAMPTZ,
  email_sent BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_course_purchases_token ON course_purchases(access_token);
CREATE INDEX IF NOT EXISTS idx_course_purchases_email ON course_purchases(email);

ALTER TABLE course_purchases ENABLE ROW LEVEL SECURITY;
