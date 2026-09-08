# Persona page consistency audit — Sponsors & GPs / Brokers / Analysts

Compiled from three parallel review passes (layout/structure, copy/voice, component/CSS)
over `sponsors.html`, `brokers.html`, `analysts.html`. Findings below are things that read
as unintentional drift — not deliberate persona-specific choices (e.g. Brokers' text-thread
vs. Excel-grid hero is intentional and excluded).

Line numbers are as of 2026-09-08 and will drift as the pages are edited.

## A. High-confidence oversights (fix first)

1. **`sponsors.html`'s hero is missing three elements every other persona page has**:
   no `.hero-cta`/`.btn-fill` button, no `.hero-stats` block, and no `.hero-note` caption
   under the `.mini` widget. Brokers and Analysts both have all three. Sponsors and
   Analysts share the *identical* `.mini` widget markup, so Analysts explaining it with a
   hero-note while Sponsors leaves it uncaptioned looks like a dropped element, not a choice.
   *(sponsors.html:60-78 vs. brokers.html:63-84, analysts.html:64-87)*

2. **The "Step 1/2/3" eyebrow uses two different CSS classes for the same visual job**:
   `.ey` (Sponsors, Analysts) vs. `.ref` (Brokers) — styled by two separate near-duplicate
   CSS rules (`.card3 .ey` is uppercase + letter-spaced; `.pcell .ref` is not), so identical
   copy renders with different typography depending on the page.
   *(sponsors.html:131, analysts.html:121, brokers.html:107; style.css:169 vs. :185)*

3. **Brokers' "HOW" section is a full component-family swap, not a content swap**:
   Sponsors and Analysts both build their 3-step explainer as `.cols3` > `.card3`, backed by
   an iframe demo + `.win`/`.feed` fallback. Brokers uses `.pipe` > `.pcell` instead, with no
   iframe and no `.win`/`.feed` anywhere on the page — meaning the feed-line-reveal
   `IntersectionObserver` in `app.js` silently never fires on Brokers. Worth a deliberate
   design gate-check even if the underlying choice (text thread instead of a grid) is right.
   *(brokers.html:105-124 vs. sponsors.html:118-134, analysts.html:108-124; app.js:76-87)*

4. **`analysts.html` has no equivalent to Sponsors' `#demo` section**, despite the two
   pages' `#how` sections otherwise being near-identical copy-paste. Sponsors' "Monday,
   9:01 AM" narrative + inbox-triage demo has no counterpart on Analysts — reads like a
   section that didn't get ported over.
   *(sponsors.html:91-108 has no analysts.html match)*

5. **`sponsors.html`'s mailto fallback is missing the `?subject=` param** that both other
   pages have (`?subject=Teez%20for%20brokers` / `...analysts`) — bare `mailto:hello@teez.live`.
   *(sponsors.html:162 vs. brokers.html:142, analysts.html:152)*

6. **A one-off widget exists only on `sponsors.html`**: `.inbox`/`.ibrow`/`.pill` (the
   "acquisitions inbox" UI inside the `#demo` fallback) is defined in the shared
   `style.css` but rendered nowhere else. Tied to finding A4 — likely leftover from
   Sponsors' own draft history rather than an adopted shared pattern.
   *(sponsors.html:96-104; style.css:128-137)*

## B. Terminology / voice drift

7. **"template" vs. "model" used interchangeably for the same object — including within
   a single page.** Worst on `analysts.html`: its own H1 says "your client's own
   **template**," the hero-sub two lines later says "fills your client's exact **model**,"
   and the meta description says "**template**" again — three word choices for one concept
   in ~50 words. Same drift across pages: Sponsors mostly says "template," Brokers uses
   "template," "model," "BOV template," and "BOV/OM model" — four nouns for one artifact.
   *(analysts.html:15/62/63; brokers.html:67/84/101/108)*

8. **The BYOS chip (identical UI element on all three pages) names three different
   nouns** for what the acronym stands for: "your **spreadsheet**" (Sponsors), "any
   client's **spreadsheet**" (Analysts), "your branded **models**" (Brokers — drops
   "spreadsheet" entirely).
   *(sponsors.html:114, analysts.html:104, brokers.html:101)*

9. **"sourced" — the core trust word on Sponsors and Analysts — never appears on
   Brokers.** Brokers substitutes "checking out," "cross-checking," "Verified" instead.
   Given "your own template, sourced" is the trust claim this whole redesign is built on,
   its absence from one of three pages is a real gap, not a style choice.
   *(sponsors.html:15/63/112, analysts.html:15/63/70/87/102 vs. brokers.html — no hits)*

10. **The product itself is named differently in the identical topic sentence**: "**the
    teez add-in** lives in..." (Sponsors, Analysts) vs. "**the agent** lives inside..."
    (Brokers).
    *(sponsors.html:112, analysts.html:102, brokers.html:99)*

11. **Step-1 and Step-2 headings break an otherwise-shared pattern for no reason**:
    "Drop in the docs" (Sponsors, Analysts, verbatim) vs. "Drop **the deal** docs" (Brokers).
    "It fills **your/their** template" (Sponsors, Analysts) vs. "Fills your firm's **BOV/OM
    model**" (Brokers) — breaks the "It fills X template" parallel.
    *(sponsors.html:131-132, analysts.html:121-122, brokers.html:107-108)*

12. **Brokers' own hero-stat contradicts itself**: bold label "**Your templates**" paired
    with the description "your branded BOV / OM **models**" — template/model drift inside
    one stat card.
    *(brokers.html:67)*

13. **CTA headline pattern breaks on Brokers**: Sponsors and Analysts both follow "Bring a
    [thing]. Leave with the model." — Brokers uses an unrelated shape ("One pitch, in front
    of you, in 20 minutes.").
    *(sponsors.html:149, analysts.html:139 vs. brokers.html:129)*

14. **The "you keep it regardless" reassurance is worded differently for no reason**: "You
    keep the **model regardless**" (Sponsors, Analysts) vs. "you keep **it either way**"
    (Brokers).
    *(sponsors.html:151, analysts.html:141, brokers.html:131)*

15. **Green-span (`.g`) emphasis placement differs**: Sponsors and Analysts both highlight
    only the trailing phrase of one flowing H1 sentence; Brokers highlights the *entire
    second sentence* of a two-sentence H1 — a different emphasis rule for the same slot.
    *(sponsors.html:62, analysts.html:62 vs. brokers.html:61)*

16. **Formula-bar argument count is inconsistent**: `=UNDERWRITE("file.pdf")` (Sponsors,
    Analysts — one arg) vs. `=PITCH("rent roll.xlsx", "text")` (Brokers — two args). The
    verb swap is arguably deliberate (pitch vs. underwrite); the extra argument reads
    arbitrary rather than designed.
    *(sponsors.html:43, analysts.html:43, brokers.html:42)*

17. **Sponsors is the most verbose page, Brokers the most rhythmically inconsistent.**
    Sponsors runs 5 major sections and a 6-sentence problem paragraph vs. Analysts' 4 and
    Brokers' 3. Brokers' hero-sub closes tersely ("You never open the file.") but its
    problem-section punchline is 17 words vs. Analysts' 3-word and Sponsors' 6-word
    equivalents in the identical "It isn't X. It's Y." slot.
    *(sponsors.html generally; brokers.html:62/91 vs. analysts.html:94, sponsors.html:85)*

## C. Component / dead-code cleanup

18. **`.book` (filled-green nav button class) is defined in `style.css` but unused by all
    three pages** — all three use `.login` for "Log in" instead. Dead relative to this page
    set (may still be used on `index.html`/`pricing.html`/`vision.html` — worth checking
    before removing).

19. **`.fx-name` and its responsive override are dead weight** — no page in this set
    renders a `.fx-name` element anymore (removed earlier this session); only `.fx-val` is
    used. Same for the generic `.eyebrow` class — unused by any of the three, superseded by
    the `.ey`/`.ref` split in finding B2.

20. **Orphaned `id="noi"`** on the NOI cell in both Sponsors' and Analysts' `.mini` widget —
    `app.js` never references it. Consistent across both pages that have it, but dead.

21. **The same inline `style="..."` values are copy-pasted verbatim across all three
    pages** instead of being a class — e.g. `style="flex:1"` on the entry-head span,
    `style="margin:14px 0 0;max-width:60ch"` on the HOW section's lead paragraph, and
    `style="margin-top:30px"` on `.cols3`. Low risk today, but a class edited on one page
    won't propagate to the others since the override lives inline in three separate places.

## Suggested order of attack

Fix A1–A6 first (they're unambiguous gaps, not judgment calls). B7–B17 are a copy pass —
worth doing in one sweep since fixing "template vs. model" properly means picking one word
and applying it everywhere, not patching each instance in isolation. C18–C21 are cheap
cleanup, safe to batch with either pass.
