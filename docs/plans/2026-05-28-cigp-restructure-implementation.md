# teez.live CIGP Restructure — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure `teez.live` into a single-audience customer page following a strict Connect / Inspire / Guide / Persuade arc, and relocate all investor-facing content to a new footer-linked `vision.html`.

**Architecture:** Static HTML + CSS, no build step, hosted on GitHub Pages via `CNAME`. Two top-level pages: `index.html` (customer-only CIGP arc) and `vision.html` (investor content lifted from current `index.html` as-is). Shared chrome (nav + footer) across both pages. Existing mockup files (`mockups/agent-inbox.html`, `mockups/excel-pane-demo.html`) reused as-is via iframes.

**Tech Stack:** HTML5, CSS3 (custom properties already defined in `style.css`), vanilla JS for nav toggle / scroll observer.

**Reference:** Spec at `docs/specs/2026-05-28-cigp-restructure-design.md`. Copy used in this plan is *first-draft direction* drawn from the spec's candidate lines; a follow-up copy-refinement pass through Shay's voice is explicitly out of scope here.

---

## Pre-flight: working directory & dev server

Before starting any task, confirm you are in the worktree:
```bash
pwd
# expected: /Users/shay/teez-landing/.claude/worktrees/cigp-restructure-design
git branch --show-current
# expected: worktree-cigp-restructure-design
```

For visual verification between tasks, run a local server in a second terminal (leave it running):
```bash
cd /Users/shay/teez-landing/.claude/worktrees/cigp-restructure-design
python3 -m http.server 8000
```
Then open `http://localhost:8000` for `index.html` and `http://localhost:8000/vision.html` after Task 1.

---

### Task 1: Create `vision.html` with lifted investor content

**Files:**
- Create: `vision.html` (root of worktree)

The new `vision.html` lifts five investor-facing sections from the current `index.html` — Horizons (The Vision), Long Arc (inside Horizons), Market (Who We Serve), Why We Win, and the manifesto CTA (The Moment is Now) — and wraps them in the same chrome as `index.html` minus any conversion surface.

- [ ] **Step 1: Create the file**

Create `vision.html` with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-F1ENM84PQE"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-F1ENM84PQE');
  </script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Teez &mdash; Vision &amp; Roadmap</title>
  <meta name="description" content="Where Teez is headed: AI-native underwriting today, an outsourced acquisitions service tomorrow, an AI-native CRE acquisitions stack long term." />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- Navigation -->
  <nav class="nav">
    <div class="container nav-inner">
      <a href="/" class="nav-brand">
        <img src="images/teez-icon.png" alt="Teez" class="nav-logo" />
        <span class="nav-brand-name">Teez</span>
      </a>
      <div class="nav-links">
        <a href="/">&larr; Back to product</a>
      </div>
      <div class="nav-cta">
        <a href="https://app.teez.live/login" class="btn btn-ghost btn-sm nav-login">Log in</a>
      </div>
      <button class="mobile-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

  <!-- Horizons -->
  <section class="section" id="horizons" style="padding-top: 160px;">
    <div class="container">
      <div class="section-header">
        <div class="badge">The Vision</div>
        <h2>From Spreadsheet to Skyline</h2>
        <p class="section-sub">We're democratizing real estate underwriting&mdash;making professional-grade investment analysis instant and accessible for everyone.</p>
      </div>
      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-marker">1</div>
          <div class="timeline-content">
            <div class="timeline-period">Year 0&ndash;1</div>
            <h3>AI Underwriting in Excel</h3>
            <p>The wedge. Excel-native AI for the sub-scale sponsors and family offices already living in spreadsheets. Solve the underwriting bottleneck where the work actually happens.</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-marker">2</div>
          <div class="timeline-content">
            <div class="timeline-period">Year 1&ndash;3</div>
            <h3>Acquisitions-as-a-Service</h3>
            <p>Sponsors who don't want to operate the software outsource the team entirely. Same engine; we run the underwriting and screening. AI-native economics&mdash;a team of four producing the throughput of thirty traditional analysts.</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-marker">3</div>
          <div class="timeline-content">
            <div class="timeline-period">Year 3+</div>
            <h3>The AI-Native CRE Acquisitions Stack</h3>
            <p>One engine powering underwriting, sourcing, captive investment-sales brokerage, and syndication. The Pipe Dreams archetype, applied to commercial real estate.</p>
          </div>
        </div>
      </div>

      <!-- Long Arc panel -->
      <div style="margin: 48px 0 32px; padding: 28px 32px; background: var(--bg-card); border: 1px solid var(--green); border-radius: var(--radius); box-shadow: 0 0 30px var(--green-glow);">
        <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--green); margin-bottom: 12px;">The Long Arc</div>
        <div style="font-size: 1.25rem; font-weight: 600; margin-bottom: 10px; line-height: 1.4;">
          <span class="text-green">From every deal to every investor.</span>
        </div>
        <p style="color: var(--text-dim); font-size: 1rem; line-height: 1.6;">Once institutional-grade underwriting is fast and cheap, every property investor in America gets it&mdash;from boutique funds to individual rental owners. TurboTax for property investing. The world we're building toward.</p>
      </div>

      <p class="timeline-footnote">Software is the wedge. The AI-native acquisitions service is the destination.</p>
    </div>
  </section>

  <!-- Beyond One Deal (relocated from index.html) -->
  <section class="section section-demo" id="pipeline">
    <div class="container">
      <div class="section-header">
        <div class="badge">Beyond One Deal</div>
        <h2>One inbox. Every deal. The agent does the work.</h2>
        <p class="section-sub">Sourcing, underwriting, IC prep, and live market intel&mdash;surfaced as a single inbox you actually have time to read. Click a row to see the comps, memos, or sensitivity behind any item. The agent triages; you keep the call.</p>
      </div>
    </div>
  </section>

  <!-- Market -->
  <section class="section section-dark" id="market">
    <div class="container">
      <div class="section-header">
        <div class="badge">Who We Serve</div>
        <h2>One Platform. Every Investor.</h2>
        <p class="section-sub">We start by replacing the in-house underwriting team at sub-scale sponsors. We grow into captive brokerage and syndication. The endgame: an AI-native acquisitions stack across CRE.</p>
      </div>
      <div class="grid-3">
        <div class="market-card">
          <div class="market-horizon">Horizon 1</div>
          <h3>Sub-Scale Sponsors</h3>
          <div class="market-stat">~10K</div>
          <p class="market-detail">family offices, emerging GPs, and boutique funds still underwriting manually</p>
        </div>
        <div class="market-card market-card-featured">
          <div class="market-horizon">Horizon 2</div>
          <h3>Outsourced Acquisitions</h3>
          <div class="market-stat">$3B+</div>
          <p class="market-detail">addressable spend on outsourced underwriting and acquisitions services</p>
        </div>
        <div class="market-card">
          <div class="market-horizon">Horizon 3</div>
          <h3>CRE Acquisitions Stack</h3>
          <div class="market-stat">$390B+</div>
          <p class="market-detail">annual CRE transaction volume reachable by an AI-native operator</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Why We Win -->
  <section class="section" id="advantage">
    <div class="container">
      <div class="section-header">
        <div class="badge">Competitive Advantage</div>
        <h2>Why We Win</h2>
      </div>
      <div class="grid-3">
        <div class="card">
          <div class="card-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <h3>Workflow-Native Wedge</h3>
          <p>We meet sponsors inside Excel, where they already work. No rip and replace, no migration, no training curve. The wedge that converts to a service.</p>
        </div>
        <div class="card">
          <div class="card-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <h3>Service Economics, Software Margins</h3>
          <p>AI-native pricing scales with deal outcomes, not seat count. A team of four producing the throughput of thirty&mdash;and the gross margins of software.</p>
        </div>
        <div class="card">
          <div class="card-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <h3>We Outgrow the Tool Category</h3>
          <p>At the model layer, AI commoditizes&mdash;fast. Service relationships don't. teez starts as a wedge inside Excel and graduates into the acquisitions team sponsors rely on. We win by exiting the LLM-tool race, not by pretending to be ahead in it.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Manifesto closer (no CTA on /vision) -->
  <section class="section section-cta">
    <div class="container">
      <div class="cta-content">
        <h2>The Moment is Now</h2>
        <p>Real estate is at an inflection point. Early adopters are already underwriting 10x faster. We have a once-in-a-generation opportunity to become the platform everyone in real estate finance relies on.</p>
        <p class="cta-bold">We're not just building a tool&mdash;we're building the future of real estate investment workflow.</p>
        <p class="waitlist-fallback" style="margin-top: 32px !important;">
          <a href="/">&larr; Back to product</a>
        </p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <img src="images/teez-icon.png" alt="Teez" class="footer-logo" />
        <span class="footer-brand-name">Teez</span>
        <p>The underwriting agent for Excel.</p>
      </div>
      <div class="footer-copy">&copy; 2026 Teez. All rights reserved.</div>
    </div>
  </footer>

  <script>
    // ── Mobile nav toggle ──
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        toggle.classList.toggle('active');
      });
    }

    // ── Nav background on scroll ──
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ── Fade-in on scroll ──
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.card, .step, .timeline-item, .market-card, .metric').forEach((el) => {
      el.classList.add('fade-in');
      const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('fade-in') || c === el);
      const i = siblings.indexOf(el);
      if (i > -1) el.style.setProperty('--stagger', `${i * 0.08}s`);
      observer.observe(el);
    });
  </script>
</body>
</html>
```

Note: the iframe for `mockups/agent-inbox.html` is intentionally *not* present on `vision.html` — the agent-inbox embed moves to `index.html` Inspire in Task 7. "Beyond One Deal" survives on `vision.html` as a header + copy block only.

- [ ] **Step 2: Verify in browser**

Refresh `http://localhost:8000/vision.html`. Expected:
- Page loads, dark theme, same fonts/colors as `index.html`.
- Nav shows `← Back to product` link and `Log in` button only.
- Four section blocks render in order: The Vision (with timeline + Long Arc panel), Beyond One Deal (header only, no iframe), Who We Serve (3 horizon cards), Why We Win (3 cards), The Moment is Now (manifesto + back link).
- No book-a-call CTA anywhere.
- Footer matches `index.html` footer.

- [ ] **Step 3: Commit**

```bash
git add vision.html
git commit -m "feat: add vision.html with lifted investor content"
```

---

### Task 2: Update top nav on both pages

**Files:**
- Modify: `index.html:23-46` (the `<nav class="nav">` block)
- Modify: `vision.html` nav block (created in Task 1; already simplified, but normalize the brand link target)

Goal: cut `index.html` nav from 7 links to 1 (`Demo`) plus `Log in` + `Book a call`. The 7-link investor-deck nav was the most visible "this is a pitch deck" tell on the page.

- [ ] **Step 1: Replace nav in `index.html`**

Replace lines 23–46 of `index.html` (the whole `<nav class="nav">...</nav>` block) with:

```html
  <!-- Navigation -->
  <nav class="nav">
    <div class="container nav-inner">
      <a href="#" class="nav-brand">
        <img src="images/teez-icon.png" alt="Teez" class="nav-logo" />
        <span class="nav-brand-name">Teez</span>
      </a>
      <div class="nav-links">
        <a href="#demo">Demo</a>
      </div>
      <div class="nav-cta">
        <a href="https://app.teez.live/login" class="btn btn-ghost btn-sm nav-login">Log in</a>
        <a href="#book-a-call" class="btn btn-primary btn-sm nav-primary">Book a call</a>
      </div>
      <button class="mobile-toggle" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
```

Note: `#demo` will point to the new Inspire section (gets `id="demo"` in Task 7). `#book-a-call` will point to the new Persuade section (gets `id="book-a-call"` in Task 9). Both anchors briefly land at the top of the page between tasks; resolved by Task 9.

- [ ] **Step 2: Verify visually**

Refresh `http://localhost:8000`. Expected:
- Nav shows only `Demo` link plus `Log in` and `Book a call` buttons.
- Clicking `Demo` scrolls to top of page (Inspire's id doesn't exist yet — fine for now).
- Clicking `Book a call` does the same — fine for now.
- Nav on `vision.html` unchanged (`← Back to product` + `Log in`).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: simplify index.html top nav to Demo + Log in + Book a call"
```

---

### Task 3: Update footers on both pages

**Files:**
- Modify: `index.html:341-351` (the `<footer class="footer">` block)
- Modify: `vision.html` footer (the matching block created in Task 1)

Goal: add `Vision & roadmap` link in the footer so `vision.html` is reachable from `index.html`, and add a back link to `vision.html`'s footer for symmetry. Footer is the *only* place the customer page surfaces the investor content.

- [ ] **Step 1: Replace footer in `index.html`**

Replace lines 341–351 of `index.html` (the entire `<footer class="footer">...</footer>` block) with:

```html
  <!-- Footer -->
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <img src="images/teez-icon.png" alt="Teez" class="footer-logo" />
        <span class="footer-brand-name">Teez</span>
        <p>The underwriting agent for Excel.</p>
      </div>
      <div class="footer-links">
        <a href="mailto:hello@teez.live">hello@teez.live</a>
        <span class="footer-divider">&middot;</span>
        <a href="/vision.html">Vision &amp; roadmap</a>
        <span class="footer-divider">&middot;</span>
        <a href="https://app.teez.live/login">Log in</a>
      </div>
      <div class="footer-copy">&copy; 2026 Teez. All rights reserved.</div>
    </div>
  </footer>
```

- [ ] **Step 2: Replace footer in `vision.html`**

Replace the `<footer class="footer">...</footer>` block in `vision.html` with the *exact same* footer as above. Both pages share footer markup verbatim.

- [ ] **Step 3: Add footer-links style to `style.css`**

Append to the `===== Footer =====` block in `style.css` (after the `.footer-copy` rule, around line 382):

```css
.footer-links {
  display: flex; align-items: center; gap: 12px;
  font-size: 13px; color: var(--text-muted);
}
.footer-links a { color: var(--text-muted); transition: color 0.2s; }
.footer-links a:hover { color: var(--green); }
.footer-divider { color: var(--text-muted); }
```

Also update the mobile rule at line ~421 so footer stacks gracefully on mobile (the `.footer-inner` already does `flex-direction: column` on mobile, so the new `.footer-links` will stack naturally with no extra rule needed — verify visually below).

- [ ] **Step 4: Verify visually**

Refresh both pages. Expected:
- `index.html` footer shows `hello@teez.live · Vision & roadmap` plus the existing brand and copyright.
- `vision.html` footer matches.
- Clicking `Vision & roadmap` from `index.html` navigates to `vision.html`.
- On mobile width (≤768px), footer items stack vertically.

- [ ] **Step 5: Commit**

```bash
git add index.html vision.html style.css
git commit -m "feat: add Vision & roadmap link to footers; share footer markup across pages"
```

---

### Task 4: Strip investor + redundant sections from `index.html`

**Files:**
- Modify: `index.html` — delete five sections and the waitlist JS handler

Goal: clear out everything from `index.html` that has either moved to `vision.html` (Pipeline / Horizons / Market / Why We Win / The Moment is Now) or is about to be replaced (the old `#demo` "See It Work" section, whose excel-pane iframe will be reembedded inside the new Guide in Task 8). After this task `index.html` is intentionally in a *partial* state — Hero + old Problem + old Solution + footer — which the next tasks rebuild.

- [ ] **Step 1: Delete the `<section class="section section-demo" id="demo">` block**

Find and delete lines 79–91 of `index.html` (the entire `<!-- Demo -->` ... `</section>` block, currently rendering "One prompt. Done in your sheet." with the excel-pane iframe).

The excel-pane iframe gets reembedded into the new Guide in Task 8.

- [ ] **Step 2: Delete the `<section class="section section-demo" id="pipeline">` block**

Find and delete the entire `<!-- Pipeline ... -->` block (the "Beyond One Deal" section with the agent-inbox iframe). It corresponds to lines 186–198 of the original file, but line numbers will have shifted after Step 1 — find by the `id="pipeline"` attribute.

- [ ] **Step 3: Delete the Horizons, Market, Why We Win, and CTA sections**

Find and delete, in order:
- `<section class="section" id="horizons">` ... `</section>` (the Vision / timeline / Long Arc block)
- `<section class="section section-dark" id="market">` ... `</section>` (Who We Serve)
- `<section class="section" id="advantage">` ... `</section>` (Why We Win)
- `<section class="section section-cta" id="cta">` ... `</section>` (The Moment is Now + waitlist form)

All four have moved to `vision.html` (Task 1). The CTA section is replaced by new Persuade in Task 9.

- [ ] **Step 4: Remove the waitlist form JS handler**

In the `<script>` block at the bottom of `index.html`, delete the waitlist form handler — the entire block starting with `// ── Waitlist form ──` and ending at the closing brace of the `if (waitlistForm) { ... }` block (roughly lines 398–446 in the original).

Keep the other handlers (mobile nav toggle, smooth scroll, nav-on-scroll, fade-in observer, hero glow parallax).

- [ ] **Step 5: Verify visually**

Refresh `http://localhost:8000`. Expected:
- Nav (still simplified from Task 2), Hero, Problem (still 4 bullets — replaced in Task 6), Solution (How It Works + BYOS/BYOD + metrics-row), footer.
- No iframes embedded anywhere on the page right now.
- No `Vision`, `Market`, `Why We Win`, or `Moment is Now` sections.
- No JS errors in console.

- [ ] **Step 6: Structural sanity check**

```bash
grep -c '<section' index.html
# expected: 3  (hero is also a <section>, so: hero + problem + solution)
grep -c 'waitlist' index.html
# expected: 0
grep -c 'iframe' index.html
# expected: 0  (excel-pane iframe re-added in Task 8)
```

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "refactor: strip investor + redundant sections from index.html"
```

---

### Task 5: Rewrite Hero on `index.html`

**Files:**
- Modify: `index.html` — the `<section class="hero" id="hero">` block (originally lines 49–77)

Goal: drop the dual-arc framing ("today / tomorrow" subhead is investor speak) and shape Hero around a single customer-facing value proposition with two CTAs (`Book a call` primary, `See how it works` secondary anchored to Guide).

- [ ] **Step 1: Replace the Hero block**

Locate the `<!-- Hero -->` block and replace it with:

```html
  <!-- Hero -->
  <section class="hero" id="hero">
    <div class="hero-glow"></div>
    <div class="container hero-content">
      <div class="badge hero-anim" style="--d: 0s">For sub-scale CRE sponsors</div>
      <h1 class="hero-anim" style="--d: 0.1s">From Spreadsheets to<br><span class="text-green">Instant Intelligence</span></h1>
      <p class="hero-sub hero-anim" style="--d: 0.2s">An AI underwriting agent that lives inside your Excel. Built for sub-scale sponsors, family offices, and emerging GPs.</p>
      <p class="hero-sub-concrete hero-anim" style="--d: 0.3s">Drop in your deal docs. Get a full pro forma in your existing template&mdash;<span class="text-green">minutes, not hours.</span></p>
      <div class="hero-actions hero-anim" style="--d: 0.4s">
        <a href="#book-a-call" class="btn btn-primary">Book a call</a>
        <a href="#how-it-works" class="btn btn-outline">See how it works</a>
      </div>
      <div class="hero-stats hero-anim" style="--d: 0.5s">
        <div class="hero-stat">
          <span class="hero-stat-value">Excel-native</span>
          <span class="hero-stat-label">Inside the sheet you already use</span>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <span class="hero-stat-value">Multi-asset</span>
          <span class="hero-stat-label">MF, industrial, retail, mixed-use</span>
        </div>
        <div class="hero-stat-divider"></div>
        <div class="hero-stat">
          <span class="hero-stat-value">Live formulas</span>
          <span class="hero-stat-label">Change an input&mdash;returns recalc</span>
        </div>
      </div>
    </div>
  </section>
```

Changes from original:
- Subhead: dropped *"The AI-native acquisitions service that replaces an in-house team tomorrow."* — investor framing.
- Concrete subhead: *"rent roll"* → *"your deal docs"* (per spec: let the reader's own document types fill the blank).
- Primary CTA: `Get Early Access` → `Book a call`, `href="#cta"` → `href="#book-a-call"`.
- Secondary CTA: `href="#demo"` → `href="#how-it-works"` (anchors into Guide instead of the deleted demo section).
- Hero stats kept as-is — they're customer-pertinent.

The headline candidates from the spec (*"The underwriting agent that lives in your sheet."*, *"Underwrite every deal that hits your inbox."*) are alternatives Shay can swap in during the copy-refinement pass.

- [ ] **Step 2: Verify visually**

Refresh. Expected:
- Hero renders with same visual styling.
- Subhead reads: *"An AI underwriting agent that lives inside your Excel. Built for sub-scale sponsors, family offices, and emerging GPs."*
- Concrete subhead reads: *"Drop in your deal docs. Get a full pro forma..."* with the *"minutes, not hours."* phrase highlighted green.
- Two CTAs: `Book a call` (primary green), `See how it works` (outline).
- Both CTAs click → scroll to top of page (anchor targets don't exist yet — fixed by Task 7 / Task 9).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: reframe Hero around customer value prop; drop investor 'tomorrow' subhead"
```

---

### Task 6: Replace Problem section with new Connect

**Files:**
- Modify: `index.html` — the `<section class="section" id="problem">` block

Goal: replace the four-bullet taxonomy with a single-wound paragraph in customer voice. The new section names the moment the buyer feels in their own week — no category labels, no statistics.

- [ ] **Step 1: Replace the Problem section**

Locate the `<!-- Problem -->` block (still has the four cards: Spreadsheet Dependency / Costly Mistakes / Competitive Disadvantage / Accessibility Gap) and replace it with:

```html
  <!-- Connect -->
  <section class="section" id="connect">
    <div class="container">
      <div class="connect-inner">
        <h2>IC is Monday and the model isn't done.</h2>
        <p class="connect-body">
          Three OMs landed in your inbox over the weekend. The template from last quarter still has broken links from when you patched the rent-roll tab. A broker called Wednesday wanting a number you didn't have. The deal you passed on last month is the one your competitor just closed. Excel didn't get you here. Hand-rolling models won't get you out.
        </p>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Add Connect styles to `style.css`**

Append to `style.css` (anywhere after the existing `.section` rules; suggest after the `.section-header` block around line 199):

```css
/* ===== Connect ===== */
.connect-inner {
  max-width: 760px; margin: 0 auto; text-align: center;
}
.connect-inner h2 {
  font-size: clamp(2rem, 4vw, 3rem); font-weight: 800;
  margin-bottom: 24px; letter-spacing: -0.02em; line-height: 1.15;
}
.connect-body {
  font-size: clamp(1.05rem, 1.8vw, 1.2rem);
  color: var(--text-dim); line-height: 1.7;
}
```

The headline above (*"IC is Monday and the model isn't done."*) is the spec's first candidate. Shay's outreach experience determines the final line in the voice pass — alternatives: *"You've passed on deals you couldn't underwrite in time."* / *"The model that's costing you deals."* Same structure either way.

- [ ] **Step 3: Verify visually**

Refresh. Expected:
- Where the four-bullet Problem grid was, there is now a single centered headline + single paragraph.
- No icons, no cards, no grid.
- Paragraph reads as one block, not a list.
- Section is shorter than what it replaced.

- [ ] **Step 4: Structural check**

```bash
grep -c 'Spreadsheet Dependency\|Costly Mistakes\|Competitive Disadvantage\|Accessibility Gap' index.html
# expected: 0  (all four card titles removed)
grep -c 'id="connect"' index.html
# expected: 1
```

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: replace Problem taxonomy with single-wound Connect section"
```

---

### Task 7: Insert Inspire section between Connect and Solution

**Files:**
- Modify: `index.html` — insert new section after `#connect`, before the existing `#solution`

Goal: paint the buyer's after-state. "Your week with teez." Short narrative + embedded `agent-inbox` mockup + one closing line. This is the load-bearing section per the design spec — the visual centerpiece of the page.

- [ ] **Step 1: Insert the Inspire section**

Insert this block immediately after the closing `</section>` of `#connect` and before the `<!-- Solution -->` comment:

```html
  <!-- Inspire -->
  <section class="section section-dark" id="demo">
    <div class="container">
      <div class="section-header">
        <div class="badge">Your week with teez</div>
        <h2>Monday, 9:01 AM.</h2>
        <p class="section-sub">
          Three new OMs came in over the weekend. The agent's already triaged them, drafted models in your template for the two worth a real look, pulled comps, and flagged a rent-roll inconsistency on the third. You're on the phone with the broker by 10. By Friday you've underwritten more deals than you used to look at in a month.
        </p>
      </div>
      <div class="demo-frame">
        <iframe src="mockups/agent-inbox.html" title="Teez acquisitions inbox demo" loading="lazy"></iframe>
      </div>
      <p class="inspire-closer">Same templates. Same data. Same you. <span class="text-green">Different week.</span></p>
    </div>
  </section>
```

The `id="demo"` reactivates the nav `Demo` anchor from Task 2. The agent-inbox iframe was previously inside the `#pipeline` section that was deleted in Task 4 — it's now reembedded here.

- [ ] **Step 2: Add `.inspire-closer` style to `style.css`**

Append to `style.css` (after the `.connect-body` rule from Task 6):

```css
/* ===== Inspire ===== */
.inspire-closer {
  text-align: center; margin-top: 48px;
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: var(--text); font-weight: 600;
  max-width: 700px; margin-left: auto; margin-right: auto;
}
```

- [ ] **Step 3: Verify visually**

Refresh. Expected:
- After the Connect single-wound paragraph, a new section with dark background appears.
- Badge: `Your week with teez`. Headline: *"Monday, 9:01 AM."*
- One paragraph below the headline describing the narrative.
- Embedded agent-inbox iframe (the multi-deal triaged inbox view).
- Below the iframe: one bold closing line *"Same templates. Same data. Same you. Different week."* — "Different week." rendered in green.
- Clicking the nav `Demo` link now scrolls to this section.

- [ ] **Step 4: Commit**

```bash
git add index.html style.css
git commit -m "feat: add Inspire section with 'Your week with teez' narrative + agent-inbox embed"
```

---

### Task 8: Consolidate Solution into Guide (principle + mechanics + excel-pane embed)

**Files:**
- Modify: `index.html` — the existing `<section class="section section-dark" id="solution">` block becomes Guide

Goal: tighten the existing Solution section into Guide. Principle (BYOS/BYOD) is already there as the styled callout — restructure so it leads. Mechanics (Parse / Fill / Verify) already exist — keep almost verbatim. Embed `excel-pane-demo` adjacent to the three steps (this is the iframe that was deleted from the old #demo section in Task 4). Drop the metrics-row at the bottom (redundant restatement of BYOS/BYOD).

- [ ] **Step 1: Replace the entire Solution block**

Find the `<!-- Solution -->` block and replace it with:

```html
  <!-- Guide -->
  <section class="section" id="how-it-works">
    <div class="container">
      <div class="section-header">
        <div class="badge">How it actually works</div>
        <h2>Lives in your Excel. Never overwrites your formulas.</h2>
        <p class="section-sub">Keep your templates. Keep your data in your tenant. The agent lives inside Excel and Google Sheets&mdash;no migration, no new software, no tenant changes.</p>
      </div>

      <div class="steps">
        <div class="step">
          <div class="step-number">01</div>
          <h3>Parse your documents</h3>
          <p>Drop in your deal docs. The agent reads them in parallel and pulls live market context from public data.</p>
        </div>
        <div class="step">
          <div class="step-number">02</div>
          <h3>Fill your template</h3>
          <p>Bring your firm's existing Excel model. The agent scans it, fills the right input cells, and never overwrites your formulas.</p>
        </div>
        <div class="step">
          <div class="step-number">03</div>
          <h3>Verified output</h3>
          <p>A separate verifier checks cap rate, DSCR, and cross-doc consistency&mdash;then flags anything worth a second look before IC.</p>
        </div>
      </div>

      <div class="demo-frame">
        <iframe src="mockups/excel-pane-demo.html" title="Teez agent at work in Excel" loading="lazy"></iframe>
      </div>
    </div>
  </section>
```

Changes from original:
- `id="solution"` → `id="how-it-works"` (matches the Hero's secondary CTA anchor from Task 5).
- Section is no longer `.section-dark` — Inspire above it is dark, so Guide is light by contrast.
- New headline: *"Lives in your Excel. Never overwrites your formulas."* (spec candidate).
- New `section-sub` is the BYOS/BYOD principle as plain prose (replacing the styled callout div that previously sat below the steps).
- Mechanics step copy: *"Drop in a rent roll, T-12, or offering memo"* → *"Drop in your deal docs"* (per spec).
- The styled callout div (lines 161–167 in the original — `<div style="margin: 0 0 64px; padding: 28px 32px; ...">BYOS · Bring Your Own Sheet...`) is *removed*; its content is folded into the section sub.
- The `metrics-row` (Multi-doc / BYOS+BYOD / Verified — lines 169–182 in the original) is *removed*. Redundant restatement.
- The `excel-pane-demo.html` iframe is added below the three steps (it was deleted from the old `#demo` section in Task 4).

- [ ] **Step 2: Verify visually**

Refresh. Expected:
- After Inspire, a new section (light background, since Inspire was dark).
- Badge: `How it actually works`.
- Headline: *"Lives in your Excel. Never overwrites your formulas."*
- One subhead paragraph (the BYOS/BYOD principle).
- Three numbered step cards (Parse / Fill / Verify).
- Below the steps: the `excel-pane-demo` iframe.
- No "Anti-Rip-and-Replace Promise" styled box.
- No three-metric row (Multi-doc / BYOS+BYOD / Verified).
- Clicking Hero's `See how it works` CTA now scrolls here.

- [ ] **Step 3: Structural check**

```bash
grep -c 'iframe' index.html
# expected: 1  (excel-pane only on index; agent-inbox is in Inspire... wait — both iframes are there)
```

Adjust expected count: index.html should have **2** iframes after this task (Inspire's `agent-inbox` from Task 7, plus this Guide's `excel-pane-demo`). Re-run:

```bash
grep -c 'iframe' index.html
# expected: 2
grep -c 'Anti-Rip-and-Replace' index.html
# expected: 0
grep -c 'Multi-doc\|BYOS + BYOD\|metric-value' index.html
# expected: 0
```

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: consolidate Solution into Guide; drop redundant recap; embed excel-pane"
```

---

### Task 9: Add Persuade section after Guide

**Files:**
- Modify: `index.html` — insert new section after `#how-it-works`, before the footer

Goal: the close. Three short blocks — hypothetical worked walkthrough → pilot terms → book-a-call CTA. Replaces the deleted manifesto + waitlist form section. Single CTA, no alternative actions below it.

- [ ] **Step 1: Insert the Persuade section**

Insert immediately after the closing `</section>` of `#how-it-works` and before the `<!-- Footer -->` comment:

```html
  <!-- Persuade -->
  <section class="section section-cta" id="book-a-call">
    <div class="container">
      <div class="persuade-content">
        <div class="badge">See it on your deal</div>
        <h2>What a Friday IC looks like with the agent in the loop.</h2>
        <p class="persuade-walkthrough">
          An underwriter at a sub-scale sponsor has three OMs to clear before Friday's IC. She drops them into the agent. By the end of the morning, two have models drafted in her template, the agent has flagged a unit-mix discrepancy on the third, and she's on a call with the broker. The deal she'd have triaged last is the one she actually pursues.
        </p>
        <div class="pilot-terms">
          <p><strong>20 minutes.</strong> We'll run the agent on one of your live deals in front of you. You leave with the model, regardless. No commitment, no slide deck.</p>
        </div>
        <div class="persuade-cta">
          <a href="#book-a-call" class="btn btn-primary btn-lg">Book 20 minutes &rarr;</a>
        </div>
      </div>
    </div>
  </section>
```

Note: the CTA link is `href="#book-a-call"` as a placeholder. Per the spec, Shay swaps in his scheduler URL (Calendly / cal.com / SavvyCal) before launch. The `id="book-a-call"` on the section means clicking the CTA today scrolls to the section header — visibly inert, but not broken. The Hero `Book a call` and the nav `Book a call` buttons both anchor to this section successfully now.

- [ ] **Step 2: Add Persuade styles to `style.css`**

Append to `style.css` (after the existing `.section-cta` and `.cta-content` rules, around line 330):

```css
/* ===== Persuade ===== */
.persuade-content {
  text-align: center; position: relative; z-index: 1;
  max-width: 720px; margin: 0 auto;
}
.persuade-content h2 {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800;
  margin: 20px 0 32px; letter-spacing: -0.01em; line-height: 1.2;
}
.persuade-walkthrough {
  font-size: 1.1rem; color: var(--text-dim); line-height: 1.7;
  text-align: left; margin-bottom: 40px;
}
.pilot-terms {
  background: var(--bg-card); border: 1px solid var(--border);
  border-left: 3px solid var(--green);
  border-radius: var(--radius);
  padding: 24px 28px; margin-bottom: 40px; text-align: left;
}
.pilot-terms p {
  color: var(--text); font-size: 1rem; line-height: 1.65; margin: 0;
}
.pilot-terms strong { color: var(--green); }
.persuade-cta { margin-top: 8px; }
```

- [ ] **Step 3: Verify visually**

Refresh. Expected:
- After Guide, the closing section appears with the CTA-style gradient background.
- Badge: `See it on your deal`.
- Headline: *"What a Friday IC looks like with the agent in the loop."*
- Walkthrough paragraph (left-aligned within the centered max-width container).
- Pilot-terms callout box (left green border, dark card background, "20 minutes" in green).
- Single CTA button below: `Book 20 minutes →`.
- No email-fallback line, no secondary action below the CTA.
- Footer immediately after (with `Vision & roadmap` link from Task 3).
- Clicking `Book a call` in the nav scrolls to this section now.

- [ ] **Step 4: Structural check**

```bash
grep -c 'id="book-a-call"' index.html
# expected: 1
grep -c 'Get Early Access\|waitlist\|We have a once-in-a-generation' index.html
# expected: 0
```

- [ ] **Step 5: Commit**

```bash
git add index.html style.css
git commit -m "feat: add Persuade closer with hypothetical walkthrough + pilot terms + book-a-call"
```

---

### Task 10: Final cross-page review

**Files:**
- Verify only — no edits expected. If you find issues, fix them inline and commit separately.

Goal: read both pages end-to-end as a customer would, then as an investor-curious visitor would. Confirm the spec's mapping table holds.

- [ ] **Step 1: Walk through `index.html` top to bottom**

Refresh `http://localhost:8000/`. Verify in order:

1. **Nav:** `Demo` link + `Log in` + `Book a call` button. Three items only.
2. **Hero:** badge, headline (`From Spreadsheets to Instant Intelligence`), simplified subhead (no "tomorrow" clause), concrete subhead, two CTAs (`Book a call`, `See how it works`), three hero-stats.
3. **Connect:** single centered headline (*"IC is Monday and the model isn't done."*) + single paragraph. No bullets.
4. **Inspire:** dark section, `Your week with teez` badge, `Monday, 9:01 AM.` headline, narrative paragraph, agent-inbox iframe, green-accented closing line.
5. **Guide:** light section, `How it actually works` badge, principle headline, three numbered step cards, excel-pane iframe below.
6. **Persuade:** gradient section, `See it on your deal` badge, walkthrough paragraph, pilot-terms callout with green left border, single `Book 20 minutes →` CTA.
7. **Footer:** brand + `hello@teez.live · Vision & roadmap` + copyright.

Click every link:
- Nav `Demo` → scrolls to Inspire section. ✓
- Hero `Book a call` → scrolls to Persuade. ✓
- Hero `See how it works` → scrolls to Guide. ✓
- Nav `Book a call` → scrolls to Persuade. ✓
- Persuade `Book 20 minutes →` → scrolls to Persuade (self-anchor; placeholder for real scheduler URL).
- Footer `hello@teez.live` → opens mail composer.
- Footer `Vision & roadmap` → navigates to `vision.html`.

- [ ] **Step 2: Walk through `vision.html` top to bottom**

Open `http://localhost:8000/vision.html`. Verify:

1. **Nav:** `← Back to product` link + `Log in`.
2. **The Vision:** badge, headline `From Spreadsheet to Skyline`, three-item timeline, Long Arc callout, italic footnote.
3. **Beyond One Deal:** badge + headline + subhead only (no iframe — that moved to `index.html` Inspire).
4. **Who We Serve:** three horizon cards (Horizon 1 / 2 / 3 with $ TAM numbers).
5. **Why We Win:** three competitive-advantage cards.
6. **The Moment is Now:** manifesto + back-to-product link (no waitlist form).
7. **Footer:** same as `index.html`.

Click `← Back to product` and the in-page back link — both return to `/`. ✓

- [ ] **Step 3: Mobile-width sanity check**

Resize the browser window to 600px wide (or use DevTools device toolbar). Verify:
- Hamburger menu appears on both pages; clicking it opens the nav links.
- Hero stats stack vertically.
- Step cards / market cards / advantage cards stack to a single column.
- Footer items stack vertically.
- No horizontal scrolling.

- [ ] **Step 4: Cross-check against spec mapping table**

Open `docs/specs/2026-05-28-cigp-restructure-design.md` and walk through the mapping table at the bottom. For each row:
- Current Hero → reframed (✓ Task 5)
- Current 1. See It Work → folded into Inspire (✓ excel-pane reembedded in Guide via Task 8; "See It Work" copy not retained — Inspire owns the embedded-mockup slot now)
- Current 2. The Underwriting Bottleneck → Connect (✓ Task 6)
- Current 3. How It Works → Guide mechanics (✓ Task 8)
- Current 4. Anti-Rip-and-Replace Promise → Guide principle (✓ Task 8)
- Current 5. Beyond One Deal → vision.html (✓ Task 1, header + copy only — iframe stays on index.html Inspire)
- Current 6. The Vision → vision.html (✓ Task 1)
- Current 7. The Long Arc → vision.html (✓ Task 1, inside Horizons)
- Current 8. Who We Serve → vision.html (✓ Task 1)
- Current 9. Why We Win → vision.html (✓ Task 1)
- Current 10. The Moment is Now → vision.html (✓ Task 1)
- CTA + waitlist form → Persuade book-a-call (✓ Tasks 4 + 9)

- [ ] **Step 5: Final commit (only if any fixes were made in Steps 1–4)**

If you adjusted anything during the walkthrough:

```bash
git add -p   # review hunks
git commit -m "polish: review-pass fixes from cross-page walkthrough"
```

If nothing needed fixing, no commit is needed.

---

## Out of scope (do not do during this plan)

- **Final copy.** First-draft copy from the spec's candidate lines is in place. Shay does a voice-pass rewrite as a separate exercise.
- **Real scheduler URL.** `#book-a-call` stays as the placeholder href until a real Calendly / cal.com / SavvyCal URL is wired in.
- **Visual rebrand.** No new colors, fonts, or spacing language.
- **Meta tags, OG cards, SEO.** Existing `<title>` and `<meta description>` on `index.html` stay as-is.
- **New mockups.** `agent-inbox.html` and `excel-pane-demo.html` are reused unchanged.
- **Analytics changes.** Existing Google Analytics tag stays untouched on both pages.

## Handoff after implementation

After Task 10:
- All commits live on branch `worktree-cigp-restructure-design`.
- The worktree at `/Users/shay/teez-landing/.claude/worktrees/cigp-restructure-design` is ready for review.
- Shay can either preview locally, push the branch for a draft PR, or merge to `main` for GitHub Pages deploy.
