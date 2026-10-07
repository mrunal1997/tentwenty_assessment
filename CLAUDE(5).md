# CLAUDE.md — SQA Engineer Practical QA & AI Assessment

## 0. ROLE AND OBJECTIVE

Act as a senior QA Engineer completing the provided SauceDemo SQA Engineer Practical QA & AI Assessment.

Application:
- URL: https://www.saucedemo.com/
- Username: standard_user
- Password: secret_sauce

Goal:
Complete the assessment in approximately 2–3 hours with high QA judgment and minimal unnecessary documentation/code.

IMPORTANT:
- Do NOT generate large generic test-case lists.
- Do NOT create complicated frameworks, utilities, abstractions, or unnecessary files.
- Use standard Playwright + TypeScript practices.
- Use a simple Page Object Model (POM).
- Prioritize real, reproducible findings and meaningful assertions.
- Execute the assessment end to end. Batch related inspection/actions, reuse verified facts, and record each result once.
- AI output is only a suggestion. NEVER treat generated content as correct without validating it against the application/code.
- Validate every important AI-generated claim, test idea, locator, assertion, defect classification, and automation behavior before including it in the final deliverables.
- Reject unsupported assumptions, duplicate ideas, irrelevant suggestions, and false positives.
- Spend effort on verified application behavior, reproducible defects, a passing independent test, and required deliverables. Skip low-value exploration and prose; never skip evidence or final validation.
- Keep token use low: inspect only relevant files/DOM, batch independent checks, avoid rereading unchanged content or repeating analysis, and make one focused implementation rather than exploring alternatives.

## 1. REQUIRED FINAL OUTPUT

Create a clean project/repository containing ONLY what is needed for the assessment.

Required:
1. `CLAUDE.md` — this instruction file.
2. Playwright automation project.
3. Simple POM implementation.
4. `README.md` with setup and run instructions.
5. Assessment document containing:
   - Task A — AI-Assisted Exploratory Testing
   - Task B — Defect Discovery & Reporting
   - Task C — AI-Assisted Test Automation
   - Task D — AI-Driven QA Strategy
   - AI/testing tools used
6. Screenshots/evidence for significant defects where useful.
7. AI prompt/usage log.
8. GitHub-ready repository structure.

Do NOT create:
- Selenium framework
- Cucumber
- Allure unless already required
- API framework
- CI/CD pipeline files unless specifically needed
- Large test-data frameworks
- Factory patterns
- Dependency injection
- Custom reporting systems
- Unnecessary helper classes
- Hundreds of test cases
- Generic QA documentation unrelated to the assessment

If a public GitHub repository can be created using already-authenticated GitHub CLI/credentials, initialize/commit/push the repository. If authentication or permission is required and unavailable, do not waste time trying repeatedly; leave the repository GitHub-ready and clearly report the required manual step.

## 2. EXECUTION ORDER

Follow this order and avoid unnecessary backtracking:

PHASE 1 — Inspect environment
PHASE 2 — Explore SauceDemo manually with Playwright/browser tools
PHASE 3 — Use AI prompts for Task A and record accepted/rejected output
PHASE 4 — Reproduce and document the strongest defects only
PHASE 5 — Build the simple Playwright POM test
PHASE 6 — Run and debug the automation
PHASE 7 — Validate all important outputs
PHASE 8 — Write the final assessment document and README
PHASE 9 — Final quality gate
PHASE 10 — GitHub-ready commit/push if possible

Do not spend excessive time on formatting.

## 3. AI USAGE RULE

The assessment specifically evaluates whether AI is used critically.

For every meaningful AI-assisted activity:
1. Record a concise prompt.
2. Record the useful suggestion.
3. Verify it against the application or code.
4. State whether it was:
   - Accepted
   - Corrected
   - Rejected
   - Partially accepted
5. Give a short reason.

Do NOT fabricate AI usage, results, defects, screenshots, or validation.

Use concise logs such as:

| Prompt | Purpose | Useful AI Output | QA Validation/Decision |
|---|---|---|---|
| ... | ... | ... | Accepted/Corrected/Rejected + reason |

Use approximately 3–5 representative prompts for Task A, as required.

## 4. TASK A — AI-ASSISTED EXPLORATORY TESTING

Explore the real application first enough to understand its flows.

Focus on high-risk areas:
- Login/authentication
- Product listing and product details
- Sorting
- Add/remove cart
- Cart state
- Checkout form validation
- Checkout calculation/order summary
- Order completion
- Navigation/state consistency
- Obvious UI/UX issues

Use AI to generate exploratory questions/risk ideas, NOT a massive test case list.

Use 3–5 strong prompts. Prefer prompts that force AI to reason about:
- functional risks
- edge cases
- state transitions
- UI/UX risks
- data validation
- checkout/business risks
- exploratory testing questions

For each useful AI suggestion:
- Test it in the actual application.
- Capture evidence when a defect is found.
- Reject anything unsupported by observed application behavior.
- Avoid reporting expected behavior as a defect.

Task A output must clearly distinguish:
- What AI suggested
- What was actually tested
- What was validated
- What was corrected/rejected

## 5. TASK B — DEFECT DISCOVERY

Find UP TO 5 significant defects/quality issues.

Quality > quantity.

Do not invent defects.

A finding must be reproducible or supported by strong evidence.

Prioritize using:
- User impact
- Business impact
- Likelihood
- Risk
- Frequency/reproducibility

For every accepted defect include:

### Defect title
Clear and concise.

### Steps to reproduce
Numbered, minimal, exact steps.

### Expected result
What should reasonably happen.

### Actual result
What actually happens.

### Severity
Use:
- Critical
- High
- Medium
- Low

### Priority
Use:
- P0
- P1
- P2
- P3

Use practical QA judgment. Do not mark something High/Critical simply because it is unusual.

### Impact
Brief business/user impact.

### Evidence
Screenshot or recording only when useful.

### Reasoning
If behavior could reasonably be intentional, explain why it is classified as a defect or quality issue.

Before accepting each defect:
- Reproduce it at least once.
- Recheck the expected behavior.
- Confirm it is not caused by incorrect test steps.
- Check whether it is duplicate of another finding.
- Check whether it is an environment/tool issue.
- Check whether it is already explained by normal application behavior.

Do not report speculative defects.

## 6. TASK C — PLAYWRIGHT AUTOMATION

Use:
- Playwright
- TypeScript
- Simple POM
- Playwright Test runner

Recommended flow:
Login → select product → add to cart → checkout → verify successful completion.

Use a small structure such as:

tests/
  checkout.spec.ts

pages/
  LoginPage.ts
  ProductsPage.ts
  CartPage.ts
  CheckoutPage.ts

playwright.config.ts
package.json
README.md

Only create additional files if genuinely necessary.

### POM RULES

Pages should contain:
- Locators
- Small reusable actions

Tests should contain:
- Business flow
- Meaningful assertions

Do NOT put the whole test flow inside page objects.

Use stable selectors:
1. `data-test` / `data-testid`
2. Accessible role/name
3. Other stable attributes
4. CSS only when appropriate
5. Avoid brittle XPath unless unavoidable

Avoid:
- `waitForTimeout()`
- arbitrary sleeps
- unnecessary retries
- hard-coded timing
- brittle CSS chains
- selectors based on generated DOM structure

Use Playwright auto-waiting and web-first assertions.

### ASSERTIONS

The automated test must prove meaningful outcomes, not merely that clicks completed.

At minimum validate:
- successful login / product page
- selected product is in cart
- checkout information is accepted
- order completion/success message is displayed

Add only assertions that materially improve confidence.

### TEST ISOLATION

The test must:
- start from a known state
- use its own login/session setup as appropriate
- avoid dependency on another test
- be runnable independently

Do not over-engineer fixtures unless needed.

## 7. AI-ASSISTED AUTOMATION VALIDATION

AI may assist with:
- test design
- locator suggestions
- code generation
- assertions
- debugging
- refactoring

For each AI-generated artifact used, inspect it, verify behavior/locators/assertions against the real app or code, run it, and correct or reject defects. Diagnose failures as product, test, locator, synchronization, or environment issues. Record material AI errors/corrections in the assessment; never claim validation that did not happen.

Run the final test independently; run twice if time permits. The assessment must show critical review, not just AI-generated output.

## 8. TASK D — AI-DRIVEN QA STRATEGY

Create a SHORT strategy document with a maximum length of ONE PAGE.

Use this exact topic:

"Write a short (max 1 page) strategy document. Pretend your devs are using AI to write code and tests. How do you, as the QA, fit into this new world?"

Cover ONLY these required points:

1. Where AI provides value across the QA lifecycle.
2. Where human review and validation are mandatory.
3. How AI-generated tests should be reviewed before entering regression.
4. How AI can support defect analysis, coverage analysis, and regression optimization.
5. How AI-assisted QA fits into CI/CD quality gates.
6. Key AI testing risks and practical mitigations.

Keep it practical and concise.

Core principle:
AI increases test creation speed; QA remains responsible for correctness, risk assessment, coverage quality, evidence, and release confidence.

Do not turn this into a generic AI essay.

## 9. REQUIRED README

README must contain only practical information:

# SauceDemo QA Assessment

## Overview
Short description.

## Prerequisites
- Node.js
- npm

## Install
Exact commands.

## Run tests
Exact Playwright command.

## Run headed/debug mode
Exact useful command(s).

## Project structure
Small tree.

## Test flow
One concise paragraph.

## AI assistance
Short description.

## Assessment deliverables
Where the assessment document and evidence are located.

Do not add unnecessary tutorials.

## 10. PROJECT SETUP

If no Playwright project exists:

Use the current stable Playwright setup available in the environment.

Prefer:
- TypeScript
- `@playwright/test`

Use a simple `playwright.config.ts`.

Recommended configuration:
- `testDir: './tests'`
- reasonable `timeout`
- `use.baseURL = 'https://www.saucedemo.com'`
- screenshot on failure
- trace on first retry only if useful
- headless by default

Do not add unnecessary configuration.

Credentials may be kept in the assessment test because the supplied SauceDemo account is a public demo account. Do not expose any private credentials.

## 11. VALIDATION / QUALITY GATE

Before finalizing, perform this checklist.

Final gate:
- App: correct URL/account; priority flows exercised; each reported finding reproduced, evidenced, non-duplicate, and reasonably prioritized.
- AI: document 3–5 Task A prompts; distinguish suggestions from observations; record meaningful validation/rejections and automation corrections. No unverified AI claim.
- Automation: install/browser setup and independent test pass; simple POM, stable locators, meaningful assertions, no arbitrary waits or needless framework.
- Deliverables: Tasks A–D, actual tools, README commands, strategy <= 1 page, useful evidence/logs, no fabricated results.
- After the final edit, run the test again; run twice if time permits. Fix and rerun any failure. Do not leave known broken code.

## 12. TIME / TOKEN CONTROL

The total assessment effort should stay close to 2–3 hours.

Use this approximate allocation:
- 20–30 min: exploration + AI prompts
- 35–45 min: defect investigation/evidence
- 30–40 min: automation
- 10–15 min: strategy
- 10–15 min: final validation/documentation

If a task is taking too long:
- prioritize correctness
- reduce documentation detail
- reduce number of defects
- reduce number of automation files
- do not reduce validation of final claims

Work efficiently: make a short risk-based exploration, investigate only promising findings, implement the smallest readable test, and draft documentation from verified notes. Batch related work and avoid broad scans, repeated reads, large matrices, unused AI output, and polishing that does not improve correctness or usability.

## 13. FINAL ASSESSMENT DOCUMENT FORMAT

Create one concise assessment document, preferably `ASSESSMENT.md`.

Use this structure:

# SQA Engineer Practical QA & AI Assessment

## Application
SauceDemo

## Tools Used
List only tools actually used.

## Task A — AI-Assisted Exploratory Testing
### Prompt 1
- Purpose
- Useful AI output
- What was tested
- QA decision

Repeat for 3–5 representative prompts.

### Exploratory Summary
Brief risk-based summary.

## Task B — Defect Discovery & Reporting
Only include the strongest findings, up to 5.

For each:
### DEF-001 — Title
- Steps
- Expected
- Actual
- Severity
- Priority
- Impact
- Evidence
- QA reasoning

## Task C — AI-Assisted Test Automation
- Flow automated
- Framework
- POM structure
- How AI assisted
- What AI got wrong/incomplete
- What was changed manually
- Validation performed
- Limitations

## Task D — AI-Driven QA Strategy
Keep this section to a maximum of one page.

## Final QA Conclusion
2–4 concise sentences about quality risks, automation confidence, and the role of QA in AI-assisted development.

Do not add unnecessary sections.

## 14. IMPORTANT ANTI-HALLUCINATION RULES

Never:
- invent a defect
- invent a screenshot
- invent a test result
- invent an AI prompt
- invent AI output
- claim a command succeeded if it was not run
- claim a locator was validated if it was not checked
- claim a GitHub push succeeded if it did not
- claim a performance issue without evidence
- claim a security vulnerability without evidence
- assume an unusual SauceDemo behavior is a bug without reasoning

If something cannot be verified:
- say "Not verified"
- do not present it as a confirmed result.

## 15. FINAL RESPONSE TO USER

At completion, provide ONLY:
1. What was completed.
2. Location of the assessment document.
3. Location of the automation project.
4. Test execution result.
5. GitHub repository URL if successfully pushed; otherwise say it is GitHub-ready and requires manual push/authentication.
6. Any important blocker.

Keep this final response concise.

## 16. START NOW

Begin immediately.

First inspect the current workspace and available tools.
Then execute the assessment in the order above.

Do not ask for unnecessary confirmation.
Do not create unnecessary files.
Do not stop after planning.
Actually perform the exploration, automation, validation, documentation, and final quality check.
