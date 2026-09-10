# Pactrail Launch Track Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: executing-plans. Execute inline in canonical checkout; no worktrees.

**Goal:** Deliver the real landing page, transparent product/privacy pages and offline application pack without implying functioning escrow.
**Architecture:** Server-rendered Next.js marketing routes with isolated canvas and privacy/brief client components. No customer state or payment execution. Full product and privacy proof have separate acceptance gates.
**Tech Stack:** Next.js, React, strict TypeScript, CSS tokens, self-hosted sans, Playwright, Node test runner.

## Global constraints
- Use Base Sepolia only for later proof. No funding UI before proof.
- Black canvas, violet CTA, amber annotation. Reduced motion, keyboard and mobile support.
- No persisted product mock data, invented traction or fake submissions.
- One canonical checkout; no remote publication or commits in this slice.

## Task 1: Landing and truthful routes
Files: package.json; tsconfig.json; next.config.ts; app/layout.tsx; app/globals.css; app/page.tsx; app/product/page.tsx; app/privacy/page.tsx; components/PaymentField.tsx; tests/site.test.ts; playwright.config.ts; tests/browser.spec.ts.
- [ ] Install pinned stable packages from official npm metadata; record versions in context/stack.md.
- [ ] Write a browser test `await expect(page.getByRole('heading',{name:'Start funded. Pay privately.'})).toBeVisible()` and assert primary CTA target plus product status. Run against absent implementation and observe failure.
- [ ] Implement semantic server-rendered routes and original payment-particle canvas, with resize/dispose and static reduced-motion handling.
- [ ] Run tests, typecheck and production build. Open desktop/mobile and inspect overflow, keyboard and console errors.

## Task 2: Participant visibility explorer
Files: lib/visibility.ts; components/VisibilityExplorer.tsx; tests/visibility.test.ts.
Interface: `type Role = 'client' | 'agency' | 'contractor' | 'public'; visibilityFor(role: Role): { visible: readonly string[]; hidden: readonly string[] }`.
- [ ] Test that contractor visible fields contain own allocation but not other contractors' rates; observe RED.
- [ ] Implement fixed policy explanation (not access enforcement), then GREEN.
- [ ] Wire accessible tabs with keyboard navigation and no payment values. Browser checks must confirm changing role updates description.

## Task 3: Pilot brief builder
Files: lib/pilot.ts; components/PilotBrief.tsx; tests/pilot.test.ts.
Interface: `buildPilotBrief(input: {agency: string; email: string; challenge: string}): string` returns plain text or throws validation error. Trim input, enforce agency 2-100 chars, email <=254 and basic syntax, challenge 10-2000 chars; reject control characters except newline in challenge. No browser storage, analytics, fetch or submit endpoint. Download via Blob only after validation, revoke object URL.
- [ ] Write minimal valid-input test, observe RED, implement GREEN.
- [ ] Add invalid-input tests and observe each relevant RED before validation.
- [ ] Add labelled form and explicit “Download only. This does not send an application.” feedback. Browser verify invalid form, successful download content and no network submission.

## Task 4: Application and delivery evidence
Files: docs/application/draft.md; docs/application/video-script.md; docs/application/submission-checklist.md; docs/verification/launch.md; README.md; context/stack.md; registry/pactrail/project.yaml in parent only after schema checks.
- [ ] Write honest concept-stage pitch, customer discovery script, pilot hypothesis and video script. Separate unconfirmed founder facts from submission-ready product copy.
- [ ] Run `pnpm test`, `pnpm typecheck`, `pnpm build`, `pnpm test:e2e`; capture desktop/mobile screenshots and inspect visually.
- [ ] Run independent bounded review of frozen code; fix reproduced important findings with tests.
- [ ] Register as explicitly local nonportable repo; validate exact manifest. No fake remote or deployed URL.
- [ ] Report real local URL and artifact paths, test results and unmet full-product/privacy/application gates.

## Separate downstream tracks
Confidential escrow proof must produce source-linked feasibility and actual Base Sepolia transactions with explicit signer approval. Until then product page remains documentation, not an operational dashboard. Full Go/Postgres/Clerk/storage/agreement implementation begins only after proof chooses the viable privacy interface. No simulated substitute is accepted as payment proof.
