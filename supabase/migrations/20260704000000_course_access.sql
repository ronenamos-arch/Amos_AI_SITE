create table if not exists public.course_access (
    user_id uuid primary key references auth.users(id) on delete cascade,
    email text not null,
    has_access boolean not null default false,
    updated_at timestamptz not null default now()
);

alter table public.course_access enable row level security;

create policy "Users can read own access row"
    on public.course_access for select
    using (auth.uid() = user_id);

-- No insert/update/delete policy for authenticated/anon roles.
-- Default-deny means only service_role (dashboard/backend) can write.

-- Seed access for the 11 users from the spreadsheet
insert into public.course_access (user_id, email, has_access)
select id, email, true from auth.users
where email in (
  'snir570@walla.com','nahume@carbyne.com','ran.gilhar@gmail.com','ortalmb@gmail.com',
  'avitalratner@gmail.com','cpaisrael2@gmail.com','Tirza.israeli@gmail.com',
  'Tirza@comax.co.il','orlybsolomon@gmail.com','eransjoke@gmail.com','tsachi.branitzky@gmail.com'
)
on conflict (user_id) do update set has_access = true, updated_at = now();
