# Positioning refresh, 2026-10-07

Source: the ChatGPT positioning handoff and the Teez website/product review (Codex outputs, 2026-10-07), plus the founder conversation after it.

## What changed

- **Homepage hero:** "Turn your Excel models into your deal platform." The words "and texts / emails / SharePoint / operating history" slide in after "Excel models", then it returns to Excel only. Static h1 is complete without JS and under `prefers-reduced-motion`. Replaces "Professional underwriting, without the overhead."
- **Homepage body:** the "what it is" block now covers re-underwriting on new information. "One underwriter. Scales however you work." became "Built for how you work." The analyst card is "Keep your template" (the old "Skip the new platform" contradicted the headline).
- **Analysts page:** hero says the underwriting works the way the team already does, not "the underwriter". Step 3 mentions the change log, review/revert, and updates on new documents. The "How is this different from an AI assistant" question was removed: analysts compare Teez to deal management platforms, not to Claude for Excel. It is replaced by smaller questions (replace our deal management tools? use our deal history and capex data? is this capex software?).
- **Analysts page problem, steps and "what backs every input" sections** moved off the old research-first lever ("the research is the bottleneck", right for first-time underwriting with no data) to the new one: updates after the first pass, keeping the model connected to evidence, and your own history. The old "what Teez knows about the building" data cards were removed from the analysts page (they live on the Data page); the slot is now "What your analysts keep control of" (template, sources, change log, updates, conflicts, deal history). Same six sections, same order; only the content inside the slots changed.
- **Sponsors page:** new FAQ "Why not just use ChatGPT or Claude?". The "re-running takes about the same" claim now says what the page already shows (text back a new price and the model updates).
- **Data page:** the "your deals make it sharper / checked against what your deals did" claims were removed. It now says only what is live (your deals stay yours, searchable for precedent).
- **Footer status bar** and the 404 description use the new tagline.

## What the underlying research says, and how it is used

Full research (228 tasks, 49 sources, written by ChatGPT, 2026-10-07): [`docs/research/2026-10-07-analyst-underwriting-workflow.md`](research/2026-10-07-analyst-underwriting-workflow.md) (also `.html`). Read it before changing analyst-facing copy. Its forum sources are anecdotes, and its dollar figures are illustrations, not market benchmarks.

- The analyst's work changes as evidence improves: screen, preliminary, bid/LOI, PSA, diligence, financing/closing, handoff. Assumptions get replaced with verified facts (sections 1, 8). Analysts "update underwriting continuously" (task 148) and must explain "why the economics changed" (section 12).
- Snapshots at screen, pre-LOI, pre-PSA, pre-hard-money and closing, and a bid-to-current bridge (tasks 123, 192).
- Handoff: actual-versus-underwritten reporting, and "preserve learning from the acquisition" so future screens and templates change (tasks 214, 215). This is the data flywheel.
- Completeness test: someone else can trace a conclusion from source evidence through the model to a decision and a named next action.
- First-pass market research (section 2.2) is one stage of a long process, not the whole job. The analysts page no longer leads with it.
- Automation limits it states: it does not establish a lease's legal meaning, an engineer's conclusion, the credibility of a rent premium, or permission to commit capital.

Used on the analysts page: problem section ("The model you bid on isn't the model you close on"), the conflicts card, the closing "From first screen to the next deal" roadmap card (stage snapshots, what moved between them, actual versus underwritten), and the capex wording in the FAQ.

## Analysts page now describes the product direction, not the shipped MVP (decision 2026-10-07)

The founder directed that the analysts page lead with where the product is going: one connected record from source document to approved assumption to actual result, on the customer's own Excel models. Copy is written in present tense with no per-line "building toward" hedges. **Lines that describe capability the 2026-10-07 code review did not find built:** "Approved cases ... saved separately from the live forecast" with a bridge between them; "Underwritten vs actual" comparison of operating results; "Your history, in the next deal" calibration; step 2's "reconciles them to what you already believed"; step 3 as a whole; the "Can Teez use our own deal history and capex data?" answer. Each must be true, or reworded, before this ships to customers or outreach links to it. Live today per the review: template mapping and input-only writes, citations, change ledger with review/revert, conflict flagging, past-deal search.

## Roadmap language lives on the analysts page only (superseded for the analysts page by the section above; still true for homepage, sponsors, Data and pricing)

All "we're building toward" copy (deal-history card and the FAQ's capex/operating-data answer) is on `analysts.html`. Do not add it to the homepage, sponsors, Data or pricing pages.

## Claims that need product verification before this ships

- **SharePoint** in the rotator: no evidence in either source doc that it is supported.
- **"Re-underwrite existing models as new information arrives" / "shows what changed ... NOI, debt and returns"**: the review found the update workflow is the main product gap (repeated-update testing not done).
- **"Review and revert every update"**: the default agent path applies writes live and offers review afterward. The copy says "review and revert", not "approve first".
- **"Our property records" coverage** (building facts for "every multifamily building in the market"): not verified in either doc.
- **Timing:** the homepage "in just a few minutes, not hours or days" line was removed. The analysts demo still shows 4m 12s and the sponsors FAQ still says "Minutes, not days"; keep both bounded as typical examples.

- **Analysts FAQ "Can Teez use our own deal history and capex data?"**: the "building toward" part (capex and operating data connected to underwriting, approved case compared with actuals) is roadmap, labeled as such. Do not move it into present tense until operating-actuals import and approved cases ship. "Search your past deals for precedent" is live (deal-library tool).

## Not done

- `images/og/teez-og.png` still carries the old tagline.
- The Excel pane demo (`mockups/excel-pane-demo.html`) still shows only first-pass filling. An update scene (new rent roll, insurance quote and lender terms) is the next demo to build, once the product does it.
- Pricing "Teez for teams" is unchanged. Do not imply shared review or access until team ownership exists in the product.
