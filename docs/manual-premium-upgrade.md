# Manual Premium User Upgrade — Step-by-Step Guide

Use this when a PayPal payment arrives but the webhook didn't fire automatically, or when you need to manually grant someone premium access.

---

## How the System Works

User subscription data lives in the `profiles` table in Supabase:

| Column | Values |
|---|---|
| `subscription_status` | `free` / `monthly` / `lifetime` / `cancelled` |
| `paypal_subscription_id` | e.g. `I-3JR4PULJL80V` |
| `subscription_end_date` | Used only for `cancelled` grace period |

A user gets access to premium articles when `subscription_status` is `monthly` or `lifetime`.

**PayPal ID format:**
- Starts with `I-` → **monthly recurring subscription** → use `monthly`
- No prefix (looks like an order ID) → **one-time lifetime purchase** → use `lifetime`

---

## Step 1 — Find the User in Supabase

1. Go to [app.supabase.com](https://app.supabase.com) → your project
2. Click **Authentication → Users** in the left sidebar
3. Search by email

**User found →** Copy their UUID (the `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` string). Go to Step 2.

**User NOT found →** Click **Invite user**, enter their email. They'll receive a signup email. Once they create a password, their `profiles` row is created automatically. Then come back, copy their UUID, and go to Step 2.

---

## Step 2 — Run the SQL Update

1. Click **SQL Editor** in the left sidebar → **New query**
2. Paste the query below, fill in the three placeholders, then click **Run**

```sql
UPDATE public.profiles
SET 
  subscription_status = 'monthly',        -- or 'lifetime' for one-time purchase
  paypal_subscription_id = 'I-XXXXXXXX',  -- PayPal ID from the payment email
  updated_at = NOW()
WHERE id = 'PASTE-USER-UUID-HERE';
```

You should see **"1 row affected"** in the results panel.

---

## Step 3 — Verify

Run this in the SQL Editor to confirm:

```sql
SELECT email, subscription_status, paypal_subscription_id, updated_at
FROM public.profiles
WHERE id = 'PASTE-USER-UUID-HERE';
```

Expected result: `subscription_status = monthly` (or `lifetime`).

---

## Step 4 — Tell the User

Let the subscriber know they now have access. They should:
1. Log in to the site
2. Visit any premium article — they'll see content instead of the paywall
3. Their dashboard will show their subscription status

---

## Reference: All Subscription Status Values

| Status | Meaning |
|---|---|
| `free` | No premium access |
| `monthly` | Active monthly subscription (PayPal recurring) |
| `lifetime` | One-time purchase, permanent access |
| `cancelled` | Cancelled but access continues until `subscription_end_date` |
| `payment_failed` | Payment failed — no access |

---

## Quick Reference — Example from First Manual Upgrade (2026-07-01)

- **Name:** Andrey Platonov
- **Email:** apllb1@gmail.com
- **PayPal ID:** `I-3JR4PULJL80V` (monthly)
- **Status set:** `monthly`
