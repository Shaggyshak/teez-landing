# teez.live customer-page restructure — design spec

**Date:** 2026-05-28
**Branch:** `worktree-cigp-restructure-design`
**Status:** design approved by Shay; ready for implementation planning

## Problem

The current `teez.live` homepage mixes a customer pitch with an investor pitch on the same page.

- Sections 1–4 ground the reader in a credible product story (Excel-native, BYOS/BYOD, Parse/Fill/Verify).
- Sections 5–10 then pivot to roadmap: acquisitions-as-a-service, captive brokerage, $3B / $390B TAM, "team of four producing the throughput of thirty."

The investor framing actively undermines the customer pitch. The "we quietly make your workflow smarter" promise in current Section 4 contradicts the "we grow into captive brokerage and syndication" arc in current Section 6. A sub-scale sponsor reading both sections reasonably concludes that the tool is a wedge to move them onto a service they didn't ask for — distrust, not confusion.

Independent critique mapped the page against the **Connect / Inspire / Guide / Persuade** framework. Diagnosis:

- **Connect** (current Section 2): abstract four-bullet taxonomy describing the buyer from the outside; not in customer voice.
- **Inspire** (current Hero + Sections 1, 5, 7): hijacked — paints the founder's roadmap rather than the buyer's after-state.
- **Guide** (current Sections 3 + 4): strongest part of the page; methodological, concrete; minor tightening only.
- **Persuade** (current Sections 9 + 10): pointed at investors ("Service Economics, Software Margins"); ends on a manifesto closer rather than a customer next-action.

## Goal

Restructure `index.html` into a single-audience customer page that follows a strict CIGP linear arc. Move all investor-facing content to a second page `vision.html`, linked from the footer only.

## Scope decisions (locked during brainstorming)

- **Audience:** keep the current three personas (sub-scale sponsors, family offices, emerging GPs); they share the same workflow wound.
- **Proof posture:** no external pilots yet. Use a third-person hypothetical worked walkthrough as the proof analogue. Do not fabricate testimonials or firm names.
- **CTA:** book-a-call. Replaces the current waitlist form. CTA placeholder: `href="#book-a-call"` until a scheduler URL is wired in.
- **Vision page:** new file `vision.html`, linked only from the footer. No promotion in the main nav.
- **Page structure:** strict CIGP linear arc (Hero → Connect → Inspire → Guide → Persuade).

## Architecture

Existing stack: static HTML + CSS, no build step. Hosted on GitHub Pages via `CNAME` → `teez.live`.

Files touched:

| File | Action |
|------|--------|
| `index.html` | rewrite to customer-only CIGP page |
| `vision.html` | new — lift investor content from current `index.html` as-is; no rewrite in this pass |
| `style.css` | extend with new section classes as needed; no visual rebrand |
| `mockups/agent-inbox.html` | unchanged — embedded in Inspire |
| `mockups/excel-pane-demo.html` | unchanged — embedded in Guide |
| `images/` | unchanged |

## Nav & footer

**Top nav (new):**

- Left: `teez` logo
- Right, in order: `Demo` (anchor link to Inspire), `Log in`, `Book a call` (primary button)

The current nav has seven items (`Demo · Problem · Solution · Pipeline · Vision · Market · Why We Win`) — investor-deck shape. All are cut except `Demo` and `Log in`.

**Footer:**

```
hello@teez.live   ·   Vision & roadmap   ·   Log in
© 2026 Teez
```

The `Vision & roadmap` link points to `vision.html`.

## Page structure — `index.html`

### 1. Hero

Headline + subhead + two CTAs.

- **Headline** reframed as a single customer-facing value proposition. Drop the current dual-arc framing (*"AI underwriting inside Excel today. The AI-native acquisitions service that replaces an in-house team tomorrow."*) — the "tomorrow" clause is investor framing and doesn't belong above the fold of a customer page. Candidates for the new line: *"From spreadsheets to instant intelligence."* (keep, with the subhead simplified) / *"The underwriting agent that lives in your sheet."* / *"Underwrite every deal that hits your inbox."* Final choice happens in the copy pass.
- **Subhead** retains the "Built for sub-scale sponsors, family offices, and emerging GPs" qualifier — that's customer-pertinent positioning, not investor framing — but drops the AAS-service half of the current subhead.
- **Primary CTA:** `Book a call`. **Secondary:** `See how it works` (anchor to Guide).

### 2. Connect

**Job:** name one specific wound the buyer feels in their own week.

- **Headline** in customer voice. Candidates: *"IC is Monday and the model isn't done."* / *"You've passed on deals you couldn't underwrite in time."* Pick the line that lands hardest in CRE outreach conversations.
- **One short paragraph, 3–4 sentences.** Sketch the moment — Sunday-night OM stack, broken links in last quarter's template, the call where the broker needed a number you didn't have yet. Specific, sensory, no adjectives.
- **No category labels** ("sub-scale sponsor," "family office," "emerging GP") in this section. The wound is shared; let the reader recognize themselves in the moment instead of being categorized.
- **No statistics, no value props.** Promises go in Inspire.

Target length: ~80 words of body copy.

### 3. Inspire

**Job:** paint the after-state. *"Your week with teez."*

- **Headline anchored to time and place:** *"Your week with teez"* or *"Monday, 9:01 AM."* Not abstract ("Instant Intelligence"), not roadmap ("From Spreadsheet to Skyline").
- **Short narrative, 4–6 sentences.** Monday-morning vignette in buyer voice. Three new OMs came in over the weekend. The agent's already triaged them, drafted models in your template for the two worth a real look, pulled comps, and flagged a rent-roll inconsistency on the third. You're on the phone with the broker by 10. By Friday you've underwritten more deals than you used to look at in a month.
- **Embed `mockups/agent-inbox.html` directly under the narrative**, framed as *"this is what your Monday inbox looks like."* Repositioning the mockup from neat schematic to moment-in-your-week.
- **One closing line** that names the shift in one sentence. Candidate: *"Same templates. Same data. Same you. Different week."* Pays off both the narrative and the BYOS/BYOD promise about to follow in Guide.

Target length: ~100 words of body copy + embedded mockup.

### 4. Guide

**Job:** show the method. Principle first, mechanics second. Combines current Sections 3 + 4 into a single block (per locked structural decision: single Guide section, not split).

- **Headline frames method, not feature list.** Candidates: *"How it actually works in your sheet."* / *"Lives in your Excel. Never overwrites your formulas."*
- **Principle (2 sentences):** *"Keep your templates. Keep your data in your tenant. The agent lives inside Excel and Google Sheets — no migration, no new software, no tenant changes."* Trust beat for rip-and-replace-wary sponsors.
- **Mechanics (3 steps):** Parse → Fill → Verify. Keep current copy almost verbatim; it already works. Minor change: replace *"drop in a rent roll, T-12, or offering memo"* with *"drop in your deal docs"* — let the reader's own document types fill the blank.
- **Embed `mockups/excel-pane-demo.html` adjacent to or beneath the three steps**, framed as *"the agent at work on a real OM."*
- **Cut:** the three-feature recap card at the bottom of current Section 4 (`Multi-doc` / `BYOS+BYOD` / `Verified`) — redundant restatement of what was just said.

Target length: roughly 20% shorter than the combined current Sections 3 + 4.

### 5. Persuade

**Job:** prove the thing, name what they get, ask for the call. Three short blocks.

1. **Hypothetical worked walkthrough** (replaces a founder-voice note; Shay's explicit direction). Third-person, 4–6 sentences, one concrete deal. Format: *"An underwriter at a sub-scale sponsor has three OMs to clear before Friday's IC. She drops them into the agent. By the end of the morning, two have models drafted in her template, the agent has flagged a unit-mix discrepancy on the third, and she's on a call with the broker. The deal she'd have triaged last is the one she actually pursues."* No invented quote, no fake firm name, no testimonial framing. Doubles as a worked instance of Inspire's promise.
2. **Pilot terms** — tight, plain language. *"20 minutes. We'll run the agent on one of your live deals in front of you. You leave with the model, regardless. No commitment, no slide deck."* Make the asymmetry of their time vs. what they get obvious.
3. **CTA** — single primary action: `Book 20 minutes →` linked to scheduler placeholder. No "or email us" alternative directly under the CTA — that line moves into the footer next to `hello@teez.live`. The page should end on one ask, not three.

Target length: ~150 words across all three blocks. The reader should hit Persuade and have nowhere to go except Book a call.

## Page structure — `vision.html`

Lifts investor-facing content from current `index.html` essentially as-is. **No rewrite in this pass** — the goal is relocation, not redesign of the investor arc.

Sections, in order:

1. **The Vision** — *From Spreadsheet to Skyline* + the three-phase roadmap (Year 0–1, Year 1–3, Year 3+)
2. **The Long Arc** — *From every deal to every investor*
3. **Who We Serve** — H1 sub-scale sponsors, H2 outsourced acquisitions, H3 CRE acquisitions stack
4. **Why We Win** — Workflow-Native Wedge / Service Economics, Software Margins / We Outgrow the Tool Category
5. **The Moment is Now** — manifesto closer

Page chrome: same header (logo + cut-down nav) and same footer as `index.html`. Top of `vision.html`: a small back-to-home link. **No `Book a call` CTA on this page** — `/vision` is not a conversion surface; visitors who care about the product go back to `/`.

## Mapping: current `index.html` sections → new structure

| Current section | New location | Treatment |
|-----------------|--------------|-----------|
| Hero | `index.html` Hero | reframed, drop investor "tomorrow" clause |
| 1. See It Work | `index.html` Inspire | folded into the embedded inbox mockup |
| 2. The Underwriting Bottleneck | `index.html` Connect | replaced by a single-wound paragraph in customer voice |
| 3. How It Works (Parse/Fill/Verify) | `index.html` Guide (mechanics) | kept, lightly tightened |
| 4. Anti-Rip-and-Replace Promise | `index.html` Guide (principle) | merged into Guide; three-feature recap card cut |
| 5. Beyond One Deal | `vision.html` | moved as-is |
| 6. The Vision | `vision.html` | moved as-is |
| 7. The Long Arc | `vision.html` | moved as-is |
| 8. Who We Serve | `vision.html` | moved as-is |
| 9. Why We Win | `vision.html` | moved as-is |
| 10. The Moment is Now | `vision.html` | moved as-is |
| CTA + waitlist form | `index.html` Persuade | replaced with Book-a-call CTA + pilot terms |

## Out of scope

- Visual rebrand. Same colors, typography, spacing as today.
- New mockups. The existing `agent-inbox.html` and `excel-pane-demo.html` are reused as-is.
- Replacing the scheduler. The CTA points to a placeholder `#book-a-call` href; a real scheduler URL is wired in when available.
- Writing finished copy. This spec captures *direction* per section, not final lines. Final copy is a follow-up pass routed through Shay's voice (scrappy, first-time-founder, no "transform your workflow" verbs).
- SEO / OG tag updates. Existing Google Analytics stays. Meta and OG can be refreshed when copy is final.
- Mobile-specific layout changes beyond what naturally results from the simpler section structure.

## Open items for the implementation pass

- Pick the Connect headline (the wound-line) — Shay to choose from his outreach experience.
- Pick the scheduler URL for the Book-a-call CTA.
- Decide whether to convert the embedded mockups from external HTML files into iframed or directly-inlined content (likely keep as iframes for parity with the current site).
