# Positioning refresh, 2026-10-07

Source: the ChatGPT positioning handoff and the Teez website/product review (Codex outputs, 2026-10-07), plus the founder conversation after it.

## What changed

- **Homepage hero:** "Turn your Excel models into your deal platform." The words "and texts / emails / SharePoint / operating history" slide in after "Excel models", then it returns to Excel only. Static h1 is complete without JS and under `prefers-reduced-motion`. Replaces "Professional underwriting, without the overhead."
- **Homepage body:** the "what it is" block now covers re-underwriting on new information. "One underwriter. Scales however you work." became "Built for how you work." The analyst card is "Keep your template" (the old "Skip the new platform" contradicted the headline).
- **Analysts page:** hero says the underwriting works the way the team already does, not "the underwriter". Step 3 mentions the change log, review/revert, and updates on new documents. The "How is this different from an AI assistant" question was removed: analysts compare Teez to deal management platforms, not to Claude for Excel. It is replaced by smaller questions (replace our deal management tools? use our deal history and capex data? is this capex software?).
- **Analysts page problem, steps and "what backs every input" sections** moved off the old research-first lever ("the research is the bottleneck", right for first-time underwriting with no data) to the new one: updates after the first pass, keeping the model connected to evidence, and your own history. Same six sections, same order; only the content inside the slots changed.
- **Sponsors page:** new FAQ "Why not just use ChatGPT or Claude?". The "re-running takes about the same" claim now says what the page already shows (text back a new price and the model updates).
- **Data page:** the "your deals make it sharper / checked against what your deals did" claims were removed. It now says only what is live (your deals stay yours, searchable for precedent).
- **Footer status bar** and the 404 description use the new tagline.

## Roadmap language lives on the analysts page only

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
