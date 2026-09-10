# Initial local launch verification (historical)

Current consolidated state: [delivery.md](delivery.md). The open gates below describe the initial candidate, not later completed deployments/reviews.

## Verified locally
- Native production preview: http://127.0.0.1:4180. HTTP 200 with expected Pactrail content and security headers.
- Docker preview: http://127.0.0.1:4182. HTTP 200 with expected content; container pactrail-landing-1 healthy, non-root, read-only filesystem, no added capabilities, loopback-only published port.
- Image ID: sha256:5b523f4ec360c71daac1431c799c9fd972dd879e1a0cf08ba779503275590fc5.
- pnpm test: 10 passing tests.
- pnpm typecheck: pass.
- pnpm build: pass, marketing routes prerendered.
- pnpm test:e2e: 16 passing Playwright tests across desktop and mobile. Covers route errors, missing assets, overflow at 320/375/768/1024/1440, CTA visibility, reduced-motion canvas stability, keyboard tabs/skip link, local-only download and disabled pre-hydration/no-JavaScript form.
- Axe WCAG A/AA checks: no violations on /, /product or /privacy in tested desktop/mobile states. Audits wait for finite entry animation completion. Automated checks are not a complete accessibility audit.
- pnpm audit --prod: no known vulnerabilities reported.
- Prettier check: pass.
- CodeGraph synchronized. Affected-test selection identified pilot.test.ts but omitted browser tests, so explicit full browser suite was run.
- Lighthouse local mobile simulation: performance 97, accessibility 100, best practices 100, SEO 100. FCP 1.2s, LCP 2.3s, TBT 130ms, CLS 0. Laboratory metrics, not field performance/INP. Full report lighthouse.json.
- Desktop/mobile screenshots in docs/assets. Hero inspected visually; particle containment improved. No claim that screenshots prove money movement.
- Project manifest schema validated with lab ProjectConfig. Local nonportable repository, no approved remote claimed.

## Observed and repaired
- Pilot download handler absent: failing browser test then implemented.
- Native form could be enabled without JavaScript: failing no-JS test then disabled before hydration plus method=dialog to prevent native submission.
- Decorative scope ring extended outside 320px viewport: geometry showed right edge 335.81px; contained within its artwork region and verified full responsive suite.
- Axe initially sampled entry animation opacity mid-transition; wait for animation completion fixed the measurement race without weakening contrast rules.

## Open gates
- Independent launch review: pending. Candidate files bound to review-source-manifest.json.
- Container vulnerability scan: not completed. Dependency audit is not a container scan.
- Public deployment, remote repository and CI: not completed.
- Actual Kanban board: not created. Supported CLI rejected mutation with “delegate_task child contexts cannot mutate Kanban tasks via the CLI” in this runtime; no bypass attempted. Manifest declares intended board only.
- Application: offline product draft and video script prepared, not submitted. Founder facts and actual required video are not fabricated.
- Inco feasibility and actual Base Sepolia escrow execution: pending. No funding or payout transaction claimed.
- Full Go/Postgres/auth/storage/contracts product: not implemented. Blocked behind selecting and proving the confidential escrow interface.
