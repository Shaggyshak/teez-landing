# Teez weekly newsletter

Supabase holds the double opt-in and the issues. Resend holds the confirmed
contacts and sends each issue as a Broadcast (no 100/day cap; free to 1,000 contacts).

```
form (teez.ai/newsletter.html)
  -> newsletter-subscribe   row = pending, confirm email via Resend /emails
  -> newsletter-confirm     row = confirmed, contact added to the Resend segment
weekly: draft row in newsletter_issues -> you approve -> newsletter-send -> Resend Broadcast
Resend webhook -> newsletter-webhook   unsubscribes / bounces / complaints mirrored to the row
```

Confirmation emails use Resend's transactional API, which is capped at 100/day on the free plan.

## One-time setup (nothing here has been run yet)

1. **Resend**: create the account, add the domain `news.teez.live`, and add the DNS records it
   shows (SPF, DKIM, DMARC) at Spaceship. Create an API key. Create a **segment** (e.g. "Newsletter")
   and copy its id.
2. **Migration**: run `migrations/001_newsletter.sql` by hand against the teez project.
3. **Secrets** (Supabase edge function secrets, never the repo):
   `RESEND_API_KEY`, `RESEND_SEGMENT_ID`, `RESEND_WEBHOOK_SECRET`, `NEWSLETTER_ADMIN_SECRET`
   (any long random string). Optional: `NEWSLETTER_FROM`, `NEWSLETTER_REPLY_TO`.
4. **Deploy** each folder under `functions/` (keep `_shared/` beside them). `newsletter-subscribe`,
   `newsletter-confirm` and `newsletter-webhook` must deploy with JWT verification **off**: the site calls
   subscribe with the publishable key, and Resend/browsers call the other two with no Supabase JWT.
   `newsletter-send` is protected by `x-admin-secret`.
5. **Resend webhook**: point it at `<project>/functions/v1/newsletter-webhook`, events
   `contact.updated`, `email.bounced`, `email.complained`. Its signing secret is `RESEND_WEBHOOK_SECRET`.

## Weekly flow

1. Insert the draft: `insert into newsletter_issues (subject, body_md) values (...)` (status defaults to `draft`).
2. Test it: `POST newsletter-send` with header `x-admin-secret` and body `{"issue_id": "...", "test_to": "you@..."}`.
3. Approve: `update newsletter_issues set status = 'approved' where id = '...'`.
4. Send: `POST newsletter-send` with `{"issue_id": "..."}`. It claims the issue atomically
   (`approved -> sending -> sent`), so a repeat call cannot double send. On a Resend error it goes back
   to `approved` with `send_error` filled in.

The issue body is Markdown. The footer (unsubscribe link, postal address) is added automatically.

## Known limits

- A resubscribe after unsubscribing goes through the form and the confirm link again; the webhook does
  not mirror a Resend-side resubscribe back.
- Unsubscribing happens on Resend's hosted page and reaches Supabase through the webhook, so a missed
  webhook leaves a row `confirmed` that Resend will not mail.
- No rate limit on the signup endpoint beyond a honeypot and one confirmation email per address per 10 minutes.
