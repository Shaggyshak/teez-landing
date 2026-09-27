# Homepage hub-and-spoke content restructure — design spec

**Date:** 2026-09-27
**Branch:** `website-rebuild-hero-positioning` (continues PR #21)
**Status:** draft — pending Shay's review

## Problem

The current homepage (post the underwriting-positioning rebuild in PR #21) still mixes a hub-level page with spoke-level content:

- The router section presents Sponsors & GPs and Acquisition Teams as a 50/50 fork, implying both are equally shipped, equally ready products. They aren't: Sponsors is the actual near-term, sellable, consumer-like product. Acquisition Teams depends on reliably filling an arbitrary firm's existing Excel template — a real differentiator, but not built yet (waiting on a CTO hire). The site currently can't tell the difference between these two, which is a milder version of the exact customer/investor content-blur problem an earlier spec (`2026-05-28-cigp-restructure-design.md`) already diagnosed and fixed once, by moving investor-facing roadmap content off `index.html` into a separate `vision.html`. That separation didn't survive the later three-persona restructure (PR #9): `vision.html` ended up live in production, unlinked from any nav, still carrying full investor roadmap content (fixed this session — see PR #21 — by redirecting it to `/`). The underlying principle it was trying to protect, don't let non-customer material or false-parity claims sit on customer-facing pages, needs to be reasserted here.
- The homepage carries full spoke-level depth: a complete 3-step mechanism section, a "what it reads / what it writes" section, and a 12-question FAQ. None of that is hub content. It's why the page reads unfocused past the hero.
- The orbit animation (scattered documents sorting into deal folders) tries to explain the detailed mechanism at hub-page brevity and scale. It's abstract enough that a non-technical visitor can't tell what it's showing.

## Goal

Restructure the site into a **hub-and-spoke** content architecture (the standard B2B pattern for a product serving more than one buyer segment): the homepage is a lightweight hub that answers *what problem, what product, who for* in five seconds and routes; `sponsors.html` and `analysts.html` (positioned as Acquisition Teams) are full spoke pages, each with one persona, one CTA, and persona-specific depth.

## Scope decisions (locked during brainstorming)

- **Two persona pages, not one, not three.** Confirmed as genuinely distinct: Sponsors (near-term, sellable, consumer-like) vs. Acquisition Teams (real differentiator — arbitrary-template support — but pre-reliability). Brokers stays dropped from nav (prior decision, unchanged).
- **No "beta" / "in development" labeling anywhere on the Acquisition Teams page.** Shay's explicit call — he manages readiness expectations in the live demo conversation, not in public copy. The existing hands-on CTA format ("bring a live deal, we run it in front of you") already implies a supervised session rather than unsupervised self-serve, which does most of the honesty work without a label.
- **Router is asymmetric, not 50/50.** Sponsors gets the primary position and the primary CTA. Acquisition Teams stays live and visible (it's the differentiation signal for anyone, including investors, sizing up the company against shallow doc-to-model competitors like Slung), but as a smaller, secondary card/link, not equal billing.
- **One consistent core value proposition across both spokes.** Per positioning practice (differentiated value usually doesn't change across segments, only the "next-best-alternative" comparison does): "Professional underwriting, without the overhead" stays the shared spine on both pages. What differs is the comparison — a contractor's cost, vs. a new platform to learn — not the core claim.
- **Spoke-level depth moves off the homepage.** The full 3-step mechanism section, the reads/writes section, and the 12-question FAQ move to the two spoke pages, split by persona relevance, replaced on the homepage by brief teaser versions.
- **Orbit animation simplifies for the hub.** One clear before/after moment (a messy inbox → one filled, sourced model), not the full multi-document scatter. A fuller version, if wanted, belongs on a spoke page where there's room to explain it.
- **`vision.html` stays neutralized** (redirects to `/`, done this session) — consistent with the original 2026-05-28 spec's intent.

## Content architecture

| | **Homepage (hub)** | **Sponsors (spoke)** | **Acquisition Teams (spoke)** |
|---|---|---|---|
| Job | Answer what/who/problem in 5 sec, route | Convert one persona | Convert/signal one persona |
| Hero | Headline + subhead + eyebrow + primary CTA, Sponsors-weighted | Persona-specific headline, deeper subhead | Persona-specific headline, deeper subhead |
| Problem | One shared line (the "overhead" framing) — brief | Deep: no in-house analyst, currently a contractor or DIY | Deep: multi-analyst version chaos, IC volume, spot-checking instead of trusting |
| Mechanism | 3-step teaser, generic, brief | Full mechanism section, live demo embed, BYOS/BYOD | Full mechanism, framed around *your own* complex template |
| Proof | One light signal (design-partner mention) | Sponsor-specific FAQ, "who this is for" section | Acquisitions-specific FAQ; the hands-on session itself is the proof (no case studies yet) |
| Router | Two-card fork, asymmetric sizing | — | — |
| CTA | Routes to a page, isn't the conversion itself | Single: book a live deal | Single: book a live deal |
| Full FAQ | Doesn't belong here | Lives here | Lives here |

## Architecture

Existing stack: static HTML + CSS, no build step, GitHub Pages via `CNAME` → `teez.ai`.

| File | Action |
|---|---|
| `index.html` | Trim to hub content per the table above; resize router cards to asymmetric weighting; simplify orbit animation section |
| `sponsors.html` | Absorb the full mechanism/reads-writes/FAQ depth already mostly present; no persona change |
| `analysts.html` | Absorb the full mechanism/reads-writes/FAQ depth reframed for Acquisition Teams (continues the persona repurposing from PR #21) |
| `style.css` | Add asymmetric router-card sizing; no other visual rebrand |
| `mockups/` (orbit animation) | Needs a simplified variant for the hub; existing detailed version can move to a spoke page if wanted |

## Nav & footer

Unchanged from PR #21: Sponsors & GPs / Acquisition Teams / Pricing / Research / Log in. Already reflects the two real pages; no further change needed here.

## Open questions / risks

- **Router secondary-card copy** for Acquisition Teams needs Shay's tone check: honest and not overclaiming parity, but not reading as an apology either. A copy detail to resolve during implementation, not a blocking architectural question.
- **Orbit animation's simplified version** needs an actual visual design pass, not just a copy trim. The implementation plan should include a design step for it, not treat it as a text edit.
- **No traffic data exists yet** to validate any of this against; these decisions are argued from stated business reality (what's sellable now) plus general B2B positioning practice, not from teez's own analytics.
