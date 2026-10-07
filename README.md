# SauceDemo QA Assessment

## Overview
Risk-based exploratory testing and a small Playwright checkout test for SauceDemo.

## Prerequisites
- Node.js
- npm

## Install
```sh
npm install
npx playwright install chromium
```

## Run tests
```sh
npm test
```

## Run headed/debug mode
```sh
npm run test:headed
npm run test:debug
```

## Project structure
```text
pages/                 Page objects
tests/                 Independent checkout test
evidence/              Verified defect screenshot
ASSESSMENT.md          Findings, AI usage log, and QA strategy
CLAUDE.md              Repository instruction entry point
CLAUDE(5).md           Full assessment brief
playwright.config.ts   Playwright configuration
```

## Test flow
The test logs in as `standard_user`, adds the Backpack to the cart, checks out with valid information, verifies the item/tax/total, completes the order, and confirms the cart is empty.

## AI assistance
Copilot helped generate exploratory questions and the initial POM/test structure. Prompts, checked suggestions, and corrections are recorded in Task A and Task C of `ASSESSMENT.md`.

## Assessment deliverables
See `ASSESSMENT.md`; defect evidence is in `evidence/`.

## GitHub submission
Not published from this environment: Git/GitHub CLI are unavailable and GitHub is signed out in the browser. After authenticating and creating a public repository, initialize Git, add this project, and push the `main` branch.