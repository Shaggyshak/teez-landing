# Positioning refresh, 2026-10-07

Source: the ChatGPT positioning handoff and the Teez website/product review (Codex outputs, 2026-10-07), plus the founder conversation after it.

## What changed

- **Homepage hero:** "Turn your Excel models into your deal platform." The words "and texts / emails / SharePoint / operating history" slide in after "Excel models", then it returns to Excel only. Static h1 is complete without JS and under `prefers-reduced-motion`. Replaces "Professional underwriting, without the overhead."
- **Homepage body:** the "what it is" block now covers re-underwriting on new information. "One underwriter. Scales however you work." became "Built for how you work." The analyst card is "Keep your template" (the old "Skip the new platform" contradicted the headline).
- **Analysts page:** hero says the underwriting works the way the team already does, not "the underwriter". Step 3 mentions the change log, review/revert, and updates on new documents. The "How is this different from an AI assistant" answer was sharpened to lead with the research and link to Data.
- **Sponsors page:** new FAQ "Why not just use ChatGPT or Claude?". The "re-running takes about the same" claim now says what the page already shows (text back a new price and the model updates).
- **Data page:** "your deals make it sharper" claims are now written as "we're building toward", not as shipped.
- **Footer status bar** and the 404 description use the new tagline.

## Claims that need product verification before this ships

- **SharePoint** in the rotator: no evidence in either source doc that it is supported.
- **"Re-underwrite existing models as new information arrives" / "shows what changed ... NOI, debt and returns"**: the review found the update workflow is the main product gap (repeated-update testing not done).
- **"Review and revert every update"**: the default agent path applies writes live and offers review afterward. The copy says "review and revert", not "approve first".
- **"Our property records" coverage** (building facts for "every multifamily building in the market"): not verified in either doc.
- **Timing:** the homepage "in just a few minutes, not hours or days" line was removed. The analysts demo still shows 4m 12s and the sponsors FAQ still says "Minutes, not days"; keep both bounded as typical examples.

## Not done

- `images/og/teez-og.png` still carries the old tagline.
- The Excel pane demo (`mockups/excel-pane-demo.html`) still shows only first-pass filling. An update scene (new rent roll, insurance quote and lender terms) is the next demo to build, once the product does it.
- Pricing "Teez for teams" is unchanged. Do not imply shared review or access until team ownership exists in the product.
