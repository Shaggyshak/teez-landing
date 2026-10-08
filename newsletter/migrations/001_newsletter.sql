-- Newsletter: subscribers (double opt-in) and issues (draft -> approved -> sent).
-- Manual SQL, run by hand against the teez project. NOT applied automatically.
-- RLS is on with no policies: only the edge functions (service role) touch these.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','unsubscribed','bounced','complained')),
  token uuid not null default gen_random_uuid(),   -- confirm link secret
  source text,
  confirm_sent_at timestamptz,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  resend_contact_id text,
  created_at timestamptz not null default now()
);
create unique index if not exists newsletter_subscribers_email_key
  on public.newsletter_subscribers (lower(email));
create unique index if not exists newsletter_subscribers_token_key
  on public.newsletter_subscribers (token);

create table if not exists public.newsletter_issues (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  body_md text not null,
  status text not null default 'draft'
    check (status in ('draft','approved','sending','sent')),
  resend_broadcast_id text,
  sent_at timestamptz,
  send_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
alter table public.newsletter_issues enable row level security;
