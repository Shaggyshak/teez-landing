# Marketing site domain migration — teez.live → teez.ai

The teez-landing marketing site's canonical domain is now **teez.ai**, shipped in
[#18](https://github.com/Shaggyshak/teez-landing/pull/18) (merged 2026-09-22,
`022e5b5`), which followed [#19](https://github.com/Shaggyshak/teez-landing/pull/19)
(the back-office-costs research post) by one commit.

## What changed

Every site URL across `index.html`, `brokers.html`, `analysts.html`, `pricing.html`,
`sponsors.html`, `support.html`, `privacy.html`, `terms.html`, `research.html`, and
`research/*.html` — canonical tags, `og:url`/`twitter:image`, JSON-LD `@id`/`url`
values, article share links, the privacy page's domain references, `sitemap.xml`,
`robots.txt` — moved from `teez.live` to `teez.ai`. `CNAME` was set to `teez.ai`.

## What was deliberately left on teez.live

- `hello@`, `support@`, `security@teez.live` — the mailboxes haven't moved, and
  shouldn't be swapped in code or copy until teez.ai mail (MX/SPF/DKIM/DMARC, plus a
  warm-up period) is set up. Moving cold-outreach sending to a fresh, unwarmed domain
  would tank deliverability.
- `app.teez.live` login links — that's the product's domain, not the marketing site's,
  and is out of scope for this migration.

## DNS setup

The two domains are at different registrars, so the setup differs:

- **teez.ai — GoDaddy.** Four `A` records on `@` to GitHub Pages
  (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`), `www` `CNAME` to
  `shaggyshak.github.io`. GitHub Pages custom domain is set to `teez.ai`, HTTPS is
  enforced, cert is live (Let's Encrypt).
- **teez.live — Spaceship.** Uses Spaceship's built-in "URL Redirect" feature
  (Advanced DNS → URL Redirect tab), not manual DNS records. Enabling it replaces the
  domain's own `A`/`CNAME` records (including on `www`) with Spaceship's
  redirect-service IP. Set to `301 (Permanent)` → `https://teez.ai`. Both the apex and
  `www` host correctly, over HTTP and HTTPS.

## Known, accepted limitation

Spaceship's URL Redirect **does not preserve the path or query string** — every
`teez.live/*` URL, including `teez.live/brokers.html` and any outreach
click-tracking link (`?r=<id>`, read by `app.js`), redirects to the bare
`https://teez.ai` homepage rather than the matching page. This means old outreach
links and any deep links or backlinks into specific pages land visitors on the
homepage, and click-attribution for links sent before the migration is lost.

The fix would be moving teez.live's nameservers to Cloudflare (free tier) and using a
Redirect Rule (`teez.live/*` → `https://teez.ai/$1`, preserving the query string)
instead of Spaceship's tool. **This has been evaluated and explicitly deprioritized —
Shay is living with the current behavior.** Revisit only if asked.

## Still open, not started

- Migrating `hello@`/`support@`/`security@` to `@teez.ai`, once mail is set up.
- Updating the AppSource listing and add-in manifest URLs (blocked on the current
  AppSource review clearing — changing these mid-review risks triggering a
  re-review).
- Updating LinkedIn, Apollo, and other external profile links that point at
  teez.live.
