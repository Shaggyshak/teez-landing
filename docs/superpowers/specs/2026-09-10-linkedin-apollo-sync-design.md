# LinkedIn → Apollo Activity Sync — Design

Status: draft, not yet built. Scoped 2026-09-10 for Shay to implement.

## Purpose

Apollo has no visibility into LinkedIn activity — no API access exists for any third
party to read LinkedIn connections or messages. Right now that means every LinkedIn
touch (new connection, new message) on the 548 CRE contacts imported into Apollo on
2026-09-08/09 is invisible in the CRM unless logged by hand.

Goal: a nightly job that pulls LinkedIn's own official data export (which *does*
include connections and messages), finds what's new since the last run, and logs it
into Apollo as activities on the matching contact — closing the gap the MCP tools
can't close directly (confirmed 2026-09-09: no generic "create activity" endpoint
exists; `apollo_tasks_create` with a `linkedin_step_connect`/`linkedin_step_message`
type is the closest native fit).

## Why the official export, not scraping

LinkedIn's inbox/connections have no read API for third parties, and continuous
scraping of rendered pages is both fragile (breaks on any layout change) and a
clearer ToS violation than using LinkedIn's own designated export mechanism
(Settings → Data privacy → Get a copy of your data). The export approach is what
Shay has used successfully before for this exact kind of job.

**Open question, must validate before building anything else:** LinkedIn's data
export is not instant — it's processed asynchronously and delivered via a
"your download is ready" email, historically anywhere from ~10 minutes to
~24 hours depending on which categories are requested. Neither of us has current,
verified numbers for how long *this* export (Connections + Messages) actually takes.
**First real step of this project, before any automation: manually request one
export today and time the actual turnaround.** That number determines whether a
same-night request→diff cycle is even possible, or whether the job has to run one
day behind (request tonight, process last night's export that just arrived).

## Architecture

```
[Trigger: request export]  -->  [Wait for "ready" email]  -->  [Download + unzip]
                                                                       |
                                                                       v
[Apollo activities]  <--  [Match to Apollo contact]  <--  [Filter to "new since last checkpoint"]
```

Because LinkedIn's own export files carry per-row dates (`Connected On` for
connections, `DATE` for messages), **"diffing" should be a high-water-mark filter,
not a file diff.** Store the last-processed date (or, better, the last-processed
row's unique key — profile URL for connections, message ID for messages) and on
each run only process rows newer than that checkpoint. This is simpler than
diffing two CSVs and more robust to a missed night (nothing gets silently skipped
just because yesterday's snapshot is stale or missing).

Checkpoint state needs a durable location outside any single job's temp
directory — e.g. a small JSON or SQLite file at a fixed path
(`~/linkedin-apollo-sync/state.json`), holding `last_connection_date` and
`last_message_id_per_conversation` (or similar).

### Matching to an Apollo contact

Two tiers, in order:
1. **Exact match on LinkedIn URL** — against the native `linkedin_url` field
   (populated for the ~60% Apollo's own enrichment matched) and the custom
   `LinkedIn` field (id `6aa1b6fa0bec650014450629`, populated for 223 contacts
   during the 2026-09-09 backfill). This is the reliable path and already covers
   a meaningful chunk of the CRE contact base.
2. **Fallback: name + company search** via `apollo_contacts_search` — fuzzier,
   real risk of false positives on common names. Worth a confidence threshold
   (e.g. only auto-match on an exact full-name + firm match; anything softer goes
   to the no-match path) rather than trusting it blindly.

### No-match handling (decided 2026-09-10)

Per Shay's call: **auto-create a minimal Apollo contact** (first/last name +
LinkedIn URL in the custom field) rather than only logging unmatched activity
separately. To keep this reviewable rather than silently inflating the CRM the
way the original bulk import risked doing, **tag every contact this job creates
with a dedicated label** (e.g. `LinkedIn Sync — New`) distinct from `CRE`/`AirOps`,
so they're easy to find, review, and re-label or delete in bulk later — don't
reuse the existing CRE label for these, since they haven't been vetted the way
the sourced import was.

### Writing the activity

For each new connection/message with a resolved contact_id, call
`apollo_tasks_create`:
- `type`: `linkedin_step_connect` (new connection) or `linkedin_step_message`
  (new message)
- `status`: `completed` (this already happened, it's not a pending task)
- `contact_id`: the matched or newly-created contact
- `note`: message content (for messages) or a short "connected on LinkedIn"
  note (for connections)
- `due_at`: the actual date from the export row, not the job's run time

**Idempotency:** before creating, check whether a task already exists for this
exact message ID / connection (the checkpoint state should prevent reprocessing,
but a job that's re-run manually after a partial failure shouldn't double-log —
worth a belt-and-suspenders check via `apollo_tasks_search` if the checkpoint
write didn't confirm success).

## Execution model — two options, undecided

Shay asked for both laid out rather than picked now.

### Option A — Scheduled Claude Code agent (lower build effort)

Use the `/schedule` skill to cron a Claude Code invocation that does the whole
pipeline in one session: `claude-in-chrome` tools drive the LinkedIn export
request/download (reusing the already-logged-in Chrome session, no separate
credential handling), the Gmail MCP checks for the ready-email, Bash handles
unzip/parsing/checkpoint state, and the Apollo MCP does the matching and
write-back.

- **Pros:** no custom code to write or maintain; reuses every connector already
  set up in this environment; fastest to stand up.
- **Cons:** real per-run cost (an LLM session, not free compute); browser
  automation via a general-purpose agent driving live LinkedIn UI is more
  fragile to LinkedIn layout changes than a purpose-built script; retry/error
  handling is whatever the agent improvises each run rather than deterministic
  code; checkpoint state still needs an explicit, fixed file path the agent is
  told to read/write every time (nothing enforces this automatically).

### Option B — Standalone script + cron/launchd (more control, more work)

A Playwright/Puppeteer script Shay writes and maintains himself, scheduled via
macOS `launchd` (more reliable than `cron` for a laptop that sleeps) or a small
always-on box. Calls Apollo's REST API directly rather than through this MCP.

- **Pros:** deterministic, cheap to run, real retry/logging/error-handling code,
  a proper local state store (SQLite), full control over matching logic.
- **Cons:** Shay owns all of it — LinkedIn session/cookie persistence, export
  polling, CSV parsing, Apollo API auth (needs a personal Apollo API key from
  Admin Settings → API, separate from this session's OAuth-based MCP access),
  and re-implementing anything the MCP currently does automatically (e.g. this
  MCP's contact dedup-by-email behavior). Also: this session found at least one
  real bug in the MCP layer during the 2026-09-08 import (bulk-create's
  `label_names` silently not attaching — fixed via a separate call) — a script
  against Apollo's raw REST API sidesteps *that specific* bug but is exposed to
  whatever Apollo's actual API does or doesn't guarantee, which should be
  checked against Apollo's own API docs rather than assumed from this session's
  MCP experience.

**Recommendation if forced to pick:** start with Option A to validate the whole
pipeline cheaply and see real data flow end-to-end (including getting a real
number for the export turnaround-time question above), then port to Option B
only if the per-run cost or reliability of A actually becomes a problem in
practice. Don't build B's full custom infrastructure speculatively.

## Risks / open questions (unresolved, flag before or during build)

1. **Export turnaround time** — unvalidated, see above. Blocks knowing whether
   same-night diff is possible at all.
2. **LinkedIn ToS / automation detection** — even the official export flow,
   automated via Chromium, could trip 2FA or bot-detection challenges that a
   human clicking through wouldn't hit. No workaround known yet; just a real risk.
3. **Fuzzy-match false positives** — name+company fallback matching could log an
   activity on the wrong contact. Keep the confidence bar high, prefer
   under-matching (more no-match auto-creates) over silently wrong matches.
4. **Messages export scope** — LinkedIn's message export includes full historical
   content, not just new messages; make sure the checkpoint filter is applied
   before any Apollo write, not just before "processing," so old messages never
   get re-logged.
5. **This is Shay's personal LinkedIn account** — the job authenticates as him;
   any automation-detection consequence (CAPTCHA, temporary restriction) affects
   his real account, not a throwaway one.

## Explicitly out of scope for v1

- Two-way sync (nothing writes back to LinkedIn)
- Sequences/outreach automation triggered by this data (this is activity
  *logging* only)
- HVAC/AirOps contacts — this is scoped to the CRE contact base and the labels
  built for it on 2026-09-08/09
