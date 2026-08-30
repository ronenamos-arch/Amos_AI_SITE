CREATE TABLE IF NOT EXISTS bundle_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  access_token TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  paypal_order_id TEXT UNIQUE,
  amount NUMERIC(10,2),
  currency TEXT DEFAULT 'ILS',
  status TEXT NOT NULL DEFAULT 'pending',  -- 'pending' | 'paid' | 'refunded'
  created_at TIMESTAMPTZ DEFAULT now(),
  paid_at TIMESTAMPTZ,
  email_sent BOOLEAN DEFAULT false
);

CREATE INDEX idx_bundle_purchases_token ON bundle_purchases(access_token);
CREATE INDEX idx_bundle_purchases_email ON bundle_purchases(email);

ALTER TABLE bundle_purchases ENABLE ROW LEVEL SECURITY;
