-- Google Search Console OAuth tokens
create table if not exists gsc_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  access_token text not null,
  refresh_token text not null,
  expires_at timestamp with time zone not null,
  site_url text not null, -- www.ronenamoscpa.co.il
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- RLS policy: users can only see their own tokens
alter table gsc_tokens enable row level security;

create policy "Users can view their own GSC tokens"
  on gsc_tokens
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own GSC tokens"
  on gsc_tokens
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own GSC tokens"
  on gsc_tokens
  for update
  using (auth.uid() = user_id);
