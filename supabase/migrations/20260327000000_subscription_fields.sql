-- Migration: Add subscription tracking columns to profiles
--
-- subscription_end_date: The UTC timestamp when the current subscription period ends.
--   Used to enforce grace-period access — a subscriber whose status is cancelled but
--   whose end_date is still in the future continues to have premium access.
--   NULL for lifetime subscribers (no expiry) and free users who never subscribed.
--
-- paypal_subscription_id: The PayPal subscription ID (e.g. I-XXXXXXXXXX).
--   Stored so the application can look up or cancel the subscription via the PayPal API.
--   NULL for one-time / lifetime purchases and free users.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS paypal_subscription_id TEXT;
