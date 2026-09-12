-- Migration: Ensure created_at and indexes exist on profiles for admin subscription management

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW());

-- Backfill created_at from updated_at if null
UPDATE public.profiles
SET created_at = COALESCE(updated_at, NOW())
WHERE created_at IS NULL;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_status ON public.profiles(subscription_status);
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_end_date ON public.profiles(subscription_end_date);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_payment_records_user_id ON public.payment_records(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_created_at ON public.payment_records(created_at);
