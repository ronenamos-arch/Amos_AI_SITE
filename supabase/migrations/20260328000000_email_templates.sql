create table if not exists email_templates (
  key text primary key,
  html text not null,
  updated_at timestamptz not null default now()
);
