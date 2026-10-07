# SQA Engineer Practical QA & AI Assessment

## Application
SauceDemo: https://www.saucedemo.com/

## Tools Used
- VS Code GitHub Copilot for candidate exploratory ideas and initial automation code
- Playwright browser tools for live exploration
- Playwright Test with TypeScript for automation
- Node.js and npm

## Task A — AI-Assisted Exploratory Testing

The prompt entries below are concise summaries, not a verbatim chat transcript.

### Prompt 1
- **Prompt:** Identify high-value state and validation checks for a single-item SauceDemo purchase. Keep it to a few checks, not a test matrix.
- **Useful AI output:** Check required checkout information, price/tax arithmetic, and cart state after order completion.
- **What was tested:** Empty checkout submission; valid details; Backpack summary ($29.99 + $2.40 = $32.39); successful completion; cart empty afterward; checkout after removing the cart's only item.
- **QA decision:** Accepted, with one additional defect found during follow-up. Empty submission reported “First Name is required”; the normal order totals/state matched expectations. After removing the only item, checkout still completed with a $0.00 total, recorded below as DEF-004.

### Prompt 2
- **Prompt:** Suggest a quick way to validate price low-to-high sorting, including product identity and ties.
- **Useful AI output:** Compare each displayed name and price in order, rather than checking only the first item.
- **What was tested:** Selected “Price (low to high)” and inspected all six products.
- **QA decision:** Accepted as a check; no defect. Prices appeared as $7.99, $9.99, $15.99, $15.99, $29.99, and $49.99 in ascending order.

### Prompt 3
- **Prompt:** For the publicly listed `problem_user`, suggest focused catalog and navigation checks that could expose customer-visible mismatches.
- **Useful AI output:** Compare product identity text with rendered images and verify the About destination.
- **What was tested:** Compared all six catalog images with their names/alt text; clicked About.
- **QA decision:** Accepted. Each item rendered the same pug photo; About opened Sauce Labs’ explicit “404 - Page Not Found” page. Both are reported below, scoped only to `problem_user`.

### Exploratory Summary
The standard-user purchase path and sort order behaved as expected. Repeated imagery and the broken About destination were reproduced only for `problem_user`; incorrect pricing and the pre-populated cart were reproduced only for `visual_user`. Empty-cart checkout completion was reproduced with `standard_user`. Empty-field validation was observed for the first-name field only. The initial browser session logged unrelated 401 resource errors, but they did not block the tested flow and are not reported as product defects.

### Coverage Cross-Check
- **Login/authentication:** Successful standard-user login and the documented public-account behaviors were exercised; invalid credentials and the locked-out account were not exhaustively tested.
- **Catalog, details, and sorting:** Product cards and the Backpack detail page were inspected; all six standard-user products were checked in price-low-to-high order. The `problem_user` image mismatch was checked across all six cards.
- **Cart and state:** Adding the Backpack, removing it in the cart, verifying the empty-cart state, and completing normal checkout were checked. The `visual_user` pre-populated cart was also reproduced.
- **Checkout:** Empty submission showed the first-name-required message; valid details completed a normal order. After removing the only item, the empty cart still advanced through checkout and completed at $0.00. Other individual required-field errors were not tested.
- **Navigation and UI/UX:** The `problem_user` About destination and Dynamic Catalog lazy-load behavior were checked. The red T-shirt presentation concern is supported only by the supplied screenshot and was not independently reproduced, so it is not treated as a confirmed defect.


## Task B — Defect Discovery & Reporting

### DEF-001 — `problem_user` sees the same unrelated image for every product
- **Steps:** Log in as `problem_user` / `secret_sauce`; inspect product cards.
- **Expected:** Each product card displays an image matching its named item.
- **Actual:** All six cards display the same pug-with-ball photo while names and alt text differ.
- **Severity:** Medium
- **Priority:** P2
- **Impact:** Customers cannot visually confirm products; this can mislead selection and reduce confidence.
- **Evidence:** [Catalog screenshot](evidence/problem-user-catalog.png)
- **QA reasoning:** Reproduced across all six cards; DOM image sources were identical and the rendered screenshot confirms the mismatch. Scoped to `problem_user`.

### DEF-002 — `problem_user` About link leads to a 404 page
- **Steps:** Log in as `problem_user` / `secret_sauce`; open the menu; select About.
- **Expected:** The About link opens the Sauce Labs company page.
- **Actual:** It navigates to `https://saucelabs.com/error/404`, which displays “404 - Page Not Found”.
- **Severity:** Low
- **Priority:** P3
- **Impact:** Users following the company link reach a dead end.
- **Evidence:** Reproduced by clicking the link; the destination and 404 heading were observed.
- **QA reasoning:** The `problem_user` About link directly targets the 404 path. In the standard-user menu, the observed link target was `https://saucelabs.com/`; that destination was not opened in this session. The finding is limited to the reproduced `problem_user` behavior.

### DEF-003 — `visual_user` catalog shows incorrect product prices and a pre-populated cart
- **Steps:** Log in as `visual_user` / `secret_sauce` and inspect the product list.
- **Expected:** Product prices reflect the normal catalog and the cart begins empty until the user adds an item.
- **Actual:** The cart shows 1 item immediately after login and prices are visibly inconsistent (for example, Backpack $14.73, Bike Light $57.34, Fleece Jacket $9.3, Onesie $22.94, Red T-Shirt $39.32).
- **Severity:** High
- **Priority:** P1
- **Impact:** Users see corrupted pricing and an unexpected cart state, which can affect purchasing decisions and trust in the checkout flow.
- **Evidence:** Observed in the live UI after login to `visual_user`.
- **QA reasoning:** This was reproduced directly and is not a test artifact; it is a customer-visible state issue scoped to the `visual_user` account.

### DEF-004 — Checkout completes an order with an empty cart
- **Steps:** Log in as `standard_user`; add the Backpack and open the cart; remove the Backpack; select Checkout; enter valid checkout information; select Continue, then Finish.
- **Expected:** Checkout should prevent order completion when the cart has no items and provide a clear message or return the user to the cart.
- **Actual:** Checkout proceeds with no line items, shows an item total and tax of $0.00, and completes with “Thank you for your order!”.
- **Severity:** Medium
- **Priority:** P2
- **Impact:** Users can receive a success confirmation for an order containing no products, making checkout status misleading.
- **Evidence:** Reproduced live in the standard-user flow; the empty overview and completion page were observed.
- **QA reasoning:** This is distinct from the expected empty cart after a completed non-empty order: the cart was emptied before checkout began, yet the application accepted and completed a new order.

### DEF-005 — Dynamic Catalog lazy-load repeats the same products when scrolled
- **Steps:** Log in to SauceDemo, open the side menu, select `Dynamic Catalog`, choose `Lazy Load`, and scroll down until additional content loads.
- **Expected:** The catalog should append unique new products progressively or stop when the catalog is exhausted.
- **Actual:** After repeated scrolling, the page loads duplicate items, including repeated `Test.allTheThings() T-Shirt (Red) (L)` entries and other repeated sizes/items; the list does not stay unique or exhausted.
- **Severity:** High
- **Priority:** P1
- **Impact:** Users can see duplicate products and a broken pagination/lazy-load flow, which degrades trust and makes product discovery unreliable.
- **Evidence:** Reproduced live on `https://www.saucedemo.com/dynamic-catalog-lazy-load.html` by scrolling and observing repeated entries.
- **QA reasoning:** This is a genuine end-user issue because the repeated items are visible in the app and are not caused by a test artifact or mock data.

## Task C — AI-Assisted Test Automation
- **Flow:** Standard login → add Backpack → cart → checkout information → verify price summary → finish → verify confirmation and empty cart.
- **Framework/POM:** Playwright Test + TypeScript; `LoginPage`, `ProductsPage`, `CartPage`, and `CheckoutPage` hold locators/actions, while the test owns business assertions.
- **AI assistance and corrections:** Copilot proposed the initial POM and accessible role/name locators. I checked them against the live UI and ran the test. The selected product is scoped to its inventory item; the test asserts the exact cart count, line item, item price, tax, total, completion heading, and empty cart. No arbitrary waits or unsupported assertions were retained.
- **Validation performed:** `npm install` succeeded; `npm test` passed on the first run. A final rerun is recorded after the last edit.
- **Limitations:** One browser project and one happy-path automation test; exploratory checks covered only the documented flows/accounts. The assessment is published in the public repository: https://github.com/mrunal1997/tentwenty_assessment.

## Task D — AI-Driven QA Strategy

AI can accelerate risk brainstorming, test drafts, data variations, failure clustering, and regression selection. QA remains accountable for choosing meaningful risks, checking requirements and actual product behavior, judging severity, and supplying evidence. Before AI-generated tests enter regression, review the intended behavior, fixture isolation, locator stability, assertions, determinism, and maintenance cost; run them against the product and reject duplicates or unsupported expectations. Use AI to summarize failures and identify coverage gaps, but confirm root cause and risk with logs, code, and reproducible behavior. In CI/CD, require deterministic tests, reviewed changes, and agreed critical-flow gates; keep flaky or exploratory checks from silently blocking releases without triage. Mitigate hallucinated expectations, biased/incomplete coverage, brittle selectors, sensitive-data exposure, and overfitting by limiting data, reviewing generated changes, measuring coverage by risk, and retaining human release judgment. AI increases throughput; it does not own quality or release confidence.

## Final QA Conclusion
The standard-user purchase and sorting checks passed, and the independent checkout test passed. Five observed issues were recorded: repeated product imagery and a broken About destination for `problem_user`, incorrect pricing and a pre-populated cart for `visual_user`, empty-cart checkout completion, and a lazy-load bug in Dynamic Catalog that duplicates products as the page scrolls. The red T-shirt presentation concern was not independently reproduced and is not counted as a confirmed defect. Coverage is intentionally narrow; findings and confidence apply only to the reproduced flows and accounts.