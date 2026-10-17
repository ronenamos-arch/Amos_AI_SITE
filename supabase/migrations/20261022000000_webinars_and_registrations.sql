-- Migration: create webinars and webinar_registrations tables
-- Date: 2026-10-22

CREATE TABLE IF NOT EXISTS public.webinars (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL,
    price NUMERIC NOT NULL DEFAULT 50,
    smartbee_page_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.webinar_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    webinar_id UUID REFERENCES public.webinars(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    amount NUMERIC,
    currency TEXT DEFAULT 'ILS',
    smartbee_transaction_id TEXT UNIQUE,
    payment_status TEXT DEFAULT 'completed',
    raw_payload JSONB
);

-- Enable RLS
ALTER TABLE public.webinars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;

-- No public policies -> Service Role access only by default

-- Seed the Excel to Presentation Webinar
INSERT INTO public.webinars (
    slug,
    title,
    category,
    starts_at,
    price,
    smartbee_page_id
)
VALUES (
    'excel-to-deck-2026-10-22',
    'מ-Excel למצגת הנהלה בשעה אחת – עם Claude',
    'וובינר Excel למצגת – 22.10',
    '2026-10-22T20:00:00+03:00',
    50,
    '6ad2c5a7df60761d6682562f'
)
ON CONFLICT (slug) DO UPDATE
SET
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    starts_at = EXCLUDED.starts_at,
    price = EXCLUDED.price,
    smartbee_page_id = EXCLUDED.smartbee_page_id;
